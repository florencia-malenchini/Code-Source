//
//  NetworkUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 30/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import SystemConfiguration
import CoreTelephony
import SwiftSocket

open class NetworkUtils: NSObject {
    open static func networkStatus() -> String {
        var zeroAddress = sockaddr_in()
        zeroAddress.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
        zeroAddress.sin_family = sa_family_t(AF_INET)
        
        guard let defaultRouteReachability = withUnsafePointer(to: &zeroAddress, {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {SCNetworkReachabilityCreateWithAddress(nil, $0)}
        }) else {
            return "No network connection"
        }
        
        var flags: SCNetworkReachabilityFlags = []
        if !SCNetworkReachabilityGetFlags(defaultRouteReachability, &flags) {
            return "No network connection"
        }
        if flags.contains(.reachable) == false {
            return "No network connection"
        } else if flags.contains(.isWWAN) == true {
            let networkInfo = CTTelephonyNetworkInfo()
            let carrierType = networkInfo.currentRadioAccessTechnology
            switch carrierType{
            case CTRadioAccessTechnologyGPRS?,CTRadioAccessTechnologyEdge?,CTRadioAccessTechnologyCDMA1x?:
                return "Cell 2G connection"
            case CTRadioAccessTechnologyLTE?:
                return "Cell 4G connection"
            default:
                return "Cell 3G connection"
            }
        } else if flags.contains(.connectionRequired) == false {
            return "WiFi connection"
        } else if (flags.contains(.connectionOnDemand) == true || flags.contains(.connectionOnTraffic) == true) && flags.contains(.interventionRequired) == false {
            return "WiFi connection"
        } else {
            return "No network connection"
        }
    }
    
    open static func postFile(_ files: [String: Any], with params: [String: Any], to address: String) -> String {
        var output = ""
        let boundary = "NET-POST-boundary-\(arc4random())-\(arc4random())"
        
        var body = Data()
        
        params.forEach() {(key,value) in
            body.append("--\(boundary)\r\n".data(using: String.Encoding.utf8)!)
            let strValue = value is NSNull ? "" : "\(value)"
            body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: String.Encoding.utf8)!)
            body.append(strValue.data(using: String.Encoding.utf8)!)
            body.append("\r\n".data(using: String.Encoding.utf8)!)
            
        }
        
        files.forEach(){(key, value) in
            
            if let data = FileUtils.getFileData((value as! String).replacingOccurrences(of: "file://", with: "")),
                let image = UIImage(data: data),
                let imageData = UIImageJPEGRepresentation(image, 20){
                
                let fileName = (value as! NSString).lastPathComponent
                body.append("--\(boundary)\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Disposition: form-data; name=\"\(key)\"; filename=\"\(fileName)\"\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Type: binary/x-octet-stream\r\n\r\n".data(using: String.Encoding.utf8)!)
                body.append(imageData)
                body.append("\r\n".data(using: String.Encoding.utf8)!)
            }
    
            if let data = FileUtils.getFileData((value as! String).replacingOccurrences(of: "file://", with: "")) {                
                let fileName = (value as! NSString).lastPathComponent
                body.append("--\(boundary)\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Disposition: form-data; name=\"\(key)\"; filename=\"\(fileName)\"\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Type: binary/x-octet-stream\r\n\r\n".data(using: String.Encoding.utf8)!)
                body.append(data)
                body.append("\r\n".data(using: String.Encoding.utf8)!)
            }
        }
        
        body.append("--\(boundary)--\r\n".data(using: String.Encoding.utf8)!)
        let url = URL(string: address)
        var request = URLRequest(url: url!)
        request.httpMethod = "POST"
        request.addValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        request.addValue("\(body.count)", forHTTPHeaderField: "Content-Length")
        request.httpBody = body
        output = syncRequest(URLSession.shared, with: request)
        
        return output
    }
    
    open static func postFileAsync(_ files: [String: Any], with params: [String: Any], to address: String, formGUID: String, successFlow: String, paramsSuccess: [Any], errorFlow: String, paramsError: [Any]) {

        let boundary = "NET-POST-boundary-\(arc4random())-\(arc4random())"
        
        var body = Data()
        
        params.forEach() {(key,value) in
            body.append("--\(boundary)\r\n".data(using: String.Encoding.utf8)!)
            let strValue = value is NSNull ? "" : "\(value)"
            body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: String.Encoding.utf8)!)
            body.append(strValue.data(using: String.Encoding.utf8)!)
            body.append("\r\n".data(using: String.Encoding.utf8)!)
        }
        
        files.forEach(){(key, value) in
            if let data = FileUtils.getFileData((value as! String).replacingOccurrences(of: "file://", with: "")) {
                let fileName = (value as! NSString).lastPathComponent
                body.append("--\(boundary)\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Disposition: form-data; name=\"\(key)\"; filename=\"\(fileName)\"\r\n".data(using: String.Encoding.utf8)!)
                body.append("Content-Type: binary/x-octet-stream\r\n\r\n".data(using: String.Encoding.utf8)!)
                body.append(data)
                body.append("\r\n".data(using: String.Encoding.utf8)!)
            }
        }
        
        body.append("--\(boundary)--\r\n".data(using: String.Encoding.utf8)!)
        let url = URL(string: address)
        var request = URLRequest(url: url!)
        request.httpMethod = "POST"
        request.addValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        request.addValue("\(body.count)", forHTTPHeaderField: "Content-Length")
        request.httpBody = body
        
        var array = [Any]()
            let task = URLSession.shared.dataTask(with: request) {(data, response, error) in
            guard let data = data, error == nil else {
                   array.append(error != nil ? error!.localizedDescription : "Houve uma falha na conexão")
                var i = 1;
                while i <= paramsError.count - 1 {
                    array.append(paramsError[i] is NSNull ? "" : paramsError[i]);
                    i = i + 1;
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(formGUID, funName: errorFlow, funArgs: array)}
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
               array.append("statusCode should be 200, but is \(httpStatus.statusCode)")
                var i = 1;
                while i <= paramsError.count - 1 {
                    array.append(paramsError[i] is NSNull ? "" : paramsError[i]);
                    i = i + 1;
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(formGUID, funName: errorFlow, funArgs: array)}
            }
            
            if let result = String(data: data, encoding: .isoLatin1) {
               array.append(result)
                var i = 1;
                while i <= paramsSuccess.count - 1 {
                    array.append(paramsSuccess[i] is NSNull ? "" : paramsSuccess[i]);
                    i = i + 1;
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(formGUID, funName: successFlow, funArgs: array)}
            }
        }
        task.resume()
    }
    
    open static func postData(_ data: String, to address: String, headers: [String: Any], type: String) -> String {
        var output = ""
        var _type = type
        if let url = URL(string: address) {
            var request = URLRequest(url: url)
            if _type == "SENDPOST" {
                _type = "POST"
            }
            headers.forEach{(key, value) in
                if let _value = value as? String {
                    request.addValue(_value, forHTTPHeaderField: key)
                }
            }
            request.httpMethod = _type
            if type == "POST" {
                if let dataEncoded = data.data(using: .isoLatin1) {
                    let msgLength = dataEncoded.count
                    request.addValue(String(msgLength), forHTTPHeaderField: "Content-Length")
                    request.httpBody = dataEncoded
                } else {
                    let _data = data.replacingOccurrences(of: "{\n", with: "")
                        .replacingOccurrences(of: " ", with: "")
                        .replacingOccurrences(of: "\n", with: "")
                        .replacingOccurrences(of: "\\", with: "")
                        .replacingOccurrences(of: ";}", with: "")
                        .replacingOccurrences(of: ";", with: "&")
                        .replacingOccurrences(of: "=\"", with: "=")
                        .replacingOccurrences(of: "\"&", with: "&")
                    if let dataEncoded = _data.data(using: .utf8) {
                        let msgLength = dataEncoded.count
                        request.addValue(String(msgLength), forHTTPHeaderField: "Content-Length")
                        request.httpBody = dataEncoded
                    }
                }
            }
            let configuration: URLSessionConfiguration = .default
            configuration.timeoutIntervalForRequest = 60
            configuration.timeoutIntervalForResource = 300
            output = syncRequest(URLSession(configuration: configuration), with: request)
        }
        return output
    }
    
    open static func postDataHTTPS(_ address: String, content: String, data: String)  -> String {
        var output = ""
        
        if let body = data.data(using: .utf8, allowLossyConversion: true),
            let url = URL(string: address) {
            let postLength = body.count
            
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue(String(postLength), forHTTPHeaderField: "Content-Length")
            request.setValue(content, forHTTPHeaderField: "Content-Type")
            request.httpBody = body
            output = syncRequest(URLSession.shared, with: request)
        }
        return output
    }
    
    open static func sendSoapMessage(_ address: String, content: String, action: String, with headers: [String : Any])  -> String {
        var output = ""
        
        if let body = content.data(using: .utf8),
            let url = URL(string: address) {
            let postLength = body.count
            
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue(action, forHTTPHeaderField: "SOAPAction")
            request.setValue(String(postLength), forHTTPHeaderField: "Content-Length")
            request.setValue("text/xml", forHTTPHeaderField: "Content-Type")
            request.httpBody = body
            output = syncRequest(URLSession.shared, with: request)
        }
        return output
    }
    
    open static func download(_ fileURL: String, name: String) -> Int {
        let _ = FileUtils.fileOpenWrite(name, append: false)
        let content = postData("", to: fileURL, headers: [ : ], type: "POST")
        let _ = FileUtils.fileAppend(name, content: content)
        let _ = FileUtils.fileClose(name)
        return 0
    }
    
    open static func downloadStart(_ address: String, name: String) -> String {
        if let url = URL(string: address),
            let data = try? Data(contentsOf: url) {
            let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
            let documentDirectory = paths[0]
            let filePath = "/\(documentDirectory)/\(name)"
            let urlPath = URL(fileURLWithPath: filePath)
            do {
                try data.write(to: urlPath, options: .atomic)
            } catch {
                assert(true, "ERROR: DOWNLOAD START")
            }
        }
        return ""
    }
    
    open static func sendImageInBody(_ address: String, with path: String) -> String {
        var output = ""
        
        if let url = URL(string: address),
            let body = FileUtils.getFileData(path) {
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
            request.httpBody = body
            output = syncRequest(URLSession.shared, with: request)
        }
        return output
    }

    public static func checkInternetConnection(success: String, successArgs: [Any], fail: String, failArgs: [Any]) -> Void {
        let client = TCPClient(address: "8.8.8.8", port: 53)
        switch client.connect(timeout: 1) {
        case .success:
            switch client.send(string: "GET / HTTP/1.0\n\n" ) {
            case .success:
                Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: success, funArgs: successArgs)
            case .failure( _):
                 Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: fail, funArgs: failArgs)
            }
        case .failure( _):
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: fail, funArgs: failArgs)
        }
    }
    
    // PRIVATE FUNCTIONS
    
    fileprivate static func syncRequest(_ session: URLSession, with request: URLRequest) -> String {
        var output = ""
        let semaphore = DispatchSemaphore(value: 0)
        let task = session.dataTask(with: request) {(data, response, error) in
            guard let data = data, error == nil else {
                output = error != nil ? error!.localizedDescription : "Houve uma falha na conexão"
                semaphore.signal()
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                output = "statusCode should be 200, but is \(httpStatus.statusCode)"
                semaphore.signal()
                return
            }
            
            if let result = String(data: data, encoding: .isoLatin1) {
                output = result
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return output
    }
}

open class MakerReachability{
    
    private var reachabilityInitialized = false
    private var reachability: Reachability!
    public private(set) var hasInternet: Bool!
    public var ruleOnConnect: String? = nil
    public var ruleOnConnectParams: [Any]?
    public var ruleOnDisconnect: String? = nil
    public var ruleOnDisconnectParams: [Any]?
    
    open func startReachability(){
        if !self.reachabilityInitialized {
            NotificationCenter.default.addObserver(self, selector: #selector(self.reachabilityChanged), name: ReachabilityChangedNotification, object: nil)
            self.reachability = Reachability.init()
            do {
                try self.reachability.startNotifier()
                self.reachabilityInitialized = true
            } catch {
                print("Reachability not started")
            }
        }
    }
    
    @objc func reachabilityChanged(notification: Notification) {
        let reachability = notification.object as! Reachability
        if reachability.isReachable {
            self.hasInternet = true
            if(self.ruleOnConnect != nil){
                DispatchQueue.main.async {Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: self.ruleOnConnect!, funArgs: self.ruleOnConnectParams!)}
                
            }
            if reachability.isReachableViaWiFi {
                print("WiFi")
            } else {
                print("Celular")
            }
        } else {
            self.hasInternet = false
            if(self.ruleOnDisconnect != nil){
                DispatchQueue.main.async {Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: self.ruleOnDisconnect!, funArgs: self.ruleOnDisconnectParams!)}
            }
            print("No internet")
        }
    }
}
