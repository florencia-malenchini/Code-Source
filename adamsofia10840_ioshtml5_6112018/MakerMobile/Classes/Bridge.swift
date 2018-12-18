//
//  Bridge.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 30/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import JavaScriptCore

@objc
public protocol CommunicationProtocol: JSExport {
    func exec(_ className: String, _ funcName: String, _ value: String) -> Any?
}

class Bridge: NSObject {
    var cameraUtils = CameraUtils()
    var authUtils = AuthUtils()
    var makerReachability = MakerReachability()
    var locationUtils = LocationUtils()
    var firebaseDatabaseUtils = FirebaseDatabaseUtils()
    var locationService = LocationService()
    var notificationUtils = NotificationUtils()
    var geoFireUtils = GeoFireUtils()
    var audioUtils = AudioUtils()
    var fingerPrintUtils = FingerPrintUtils()
    var params = [Any]()
    var output: Any?
    
    open func isDuplicatedRequest(_ code: String) -> Bool {
        if let requestCode = UserDefaults.standard.object(forKey: "resquestCode") as? String, code == requestCode {
            return true
        }
        UserDefaults.standard.set(code, forKey: "resquestCode")
        UserDefaults.standard.set("", forKey: "lastResult")
        return false
    }
}

extension Bridge: CommunicationProtocol {
    public func exec(_ className: String, _ funcName: String, _ value: String) -> Any? {
        let name = "\(className).\(funcName)"
        print(name)
        
        guard let data = value.data(using: .utf8), let json = try? JSONSerialization.jsonObject(with: data, options: []), let params = json as? [Any] else {
            var array = [String]()
            array.append("Não foi possível mapear os parametros")
            array.append(name)
            array.append(value)
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: "handleException", funArgs: array)
            return nil
        }
        switch name {
           
            // AUTH
            
        case "AuthUtils.authSMS":
            let successArgs = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let errorArgs = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            var args = [String: String]()
            args["number"] = "\(params[5])"
            authUtils.auth("\(params[0])", success: "\(params[1])", successArgs: successArgs, error: "\(params[3])", errorArgs: errorArgs, params: args, type: .sms)
        case "AuthUtils.emailLogin":
            let successArgs = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let errorArgs = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            var args = [String: String]()
            args["email"] = "\(params[5])"
            args["password"] = "\(params[6])"
            authUtils.auth("\(params[0])", success: "\(params[1])", successArgs: successArgs, error: "\(params[3])", errorArgs: errorArgs, params: args, type: .email)
        case "AuthUtils.facebookLogin":
            let successArgs = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let errorArgs = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            let fields = params[5] is NSNull ? [String]() : params[5] as! [String]
            var args = [String: String]()
            args["fields"] = fields.joined(separator: ",")
            
            authUtils.auth("\(params[0])", success: "\(params[1])", successArgs: successArgs, error: "\(params[3])", errorArgs: errorArgs, params: args, type: .facebook)
        case "AuthUtils.onLogout":
            authUtils.onLogout()
        case "AuthUtils.passwordReset":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            authUtils.passwordReset("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, error: "\(params[3])", errorArgs: paramsError, email: "\(params[5])")
        case "AuthUtils.emailVerification":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            authUtils.emailVerification("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, error: "\(params[3])", errorArgs: paramsError)
        case "AuthUtils.isUserLoggedIn":
            output = authUtils.isUserLoggedIn()
        case "AuthUtils.tokenLogin":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            authUtils.tokenLogin("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, error: "\(params[3])", errorArgs: paramsError, token: "\(params[5])")
            
            // FIREBASE
            
        case "FirebaseDatabaseUtils.connect":
            firebaseDatabaseUtils.connect()
        case "FirebaseDatabaseUtils.onDisconnect":
            return firebaseDatabaseUtils.onDisconnect(params[0] as! String, params: params[1])
        case "FirebaseDatabaseUtils.readData":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let filter = params[4] is NSNull ? [String: Any]() : params[4] as! [String: Any]
            firebaseDatabaseUtils.readData("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, node: "\(params[3])", filter: filter, orderType: "\(params[5])", orderData: "\(params[6])")
        case "FirebaseDatabaseUtils.monitoring":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let filter = params[4] is NSNull ? [String: Any]() : params[4] as! [String: Any]
            firebaseDatabaseUtils.monitoring("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, node: "\(params[3])", filter: filter, orderType: "\(params[5])", orderData: "\(params[6])")
        case "FirebaseDatabaseUtils.writeData":
            let identifier = params[1] is NSNull ? nil : "\(params[1])"
            let successArgs = params[5] is NSNull ? [Any]() : params[5] as! [Any]
            let errorArgs = params[7] is NSNull ? [Any]() : params[7] as! [Any]
            return firebaseDatabaseUtils.write(params[0] as! String, identifier: identifier, data: params[2], async: params[3] as! Bool, success: params[4] as! String, successArgs: successArgs, errorCallback: params[6] as! String, errorArgs: errorArgs)
        case "FirebaseDatabaseUtils.stopMonitoring":
            firebaseDatabaseUtils.stopMonitoring(node: "\(params[0])")
            
            //GEOFIRE

        case "GeoFireUtils.setPosition":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            geoFireUtils.setPosition("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, node: "\(params[3])", key:  "\(params[4])", lat:  Double("\(params[5])"), lng: Double("\(params[6])"))
        case "GeoFireUtils.watch":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            geoFireUtils.watch("\(params[0])", success: "\(params[1])", successArgs: paramsSuccess, node: "\(params[3])", lat:  Double("\(params[4])")!, lng: Double("\(params[5])")!, radius: Double("\(params[6])")!)
        case "GeoFireUtils.stopWatching":
            geoFireUtils.stopWatching()
            
            // CAMERA
            
        case "CameraUtils.open":
            let formGUID = params[3] as! String
            let success = params[0] is NSNull ? "" : "\(params[0])"
            let error = params[1] is NSNull ? "" : "\(params[1])"
            let quality = params[2] as! Int
            let options = params[4] is NSNull ? "null" : "\(params[4] as! String)"
            cameraUtils.open(formGUID, success: success, error: error, quality: quality, options: options)
        case "CameraUtils.scanCard":
            let paramsSuccess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            cameraUtils.scanCard("\(params[0])", success: "\(params[1])", params: paramsSuccess, error: "\(params[3])", paramsError: paramsError)
        case "BarcodeUtils.scan":
            cameraUtils.scanCode("\(params[3])", success: "\(params[1])", params: [], error: "\(params[2])", paramsError: [])
        case "BarcodeUtils.generate":
            output = cameraUtils.qrCodeGenerate("\(params[0])")
    
            // PUSH
            
        case "PushPlugin.register":
            let formGUID = params[0] as! String
            let funName = params[1] as! String
            var funArgs = [String]()
            funArgs.append(UserDefaults.standard.string(forKey: "deviceToken") ?? "-403")
            Singleton.shared.ansycCallback(formGUID, funName: funName, funArgs: funArgs)
        case "PushPlugin.unRegister":
            output = UserDefaults.standard.string(forKey: "deviceToken") ?? "-403"
            
            // DATABASE
            
        case "Database.openOrCreateDatabase":
            if let name = params[0] as? String {
                output = DatabaseUtils.openOrCreateDatabase(name)
            }
        case "Database.execSQL":
            if let sql = params[1] as? String, let index = Int(params[0] as! String) {
                let body = params[2] is NSNull || !(params[2] is [Any]) ? [Any]() : params[2] as! [Any]
                output = DatabaseUtils.update(sql, with: body, on: index)
            }
        case "Database.rawQuery":
            if let sql = params[1] as? String, let index = Int(params[0] as! String) {
                let body = params[2] is NSNull || !(params[2] is [Any]) ? [Any]() : params[2] as! [Any]
                output = String(DatabaseUtils.query(sql, with: body, on: index))
            }
        case "Database.field":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                output = "\(DatabaseUtils.field(params[0] as! String, type: params[1] as! String, from: index))"
            }
        case "Database.next":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                output = String(DatabaseUtils.next(index))
            }
        case "Database.previous":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                DatabaseUtils.previous(index)
            }
        case "Database.last":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                DatabaseUtils.last(index)
            }
        case "Database.first":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                DatabaseUtils.first(index)
            }
        case "Database.close":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                DatabaseUtils.close(index)
            }
        case "Database.hasdata":
            if let _ = params[0] as? String, let index = Int(params[0] as! String) {
                output = DatabaseUtils.hasData(index)
            }
        case "Database.getColumnCount":
            if let index = Int(params[0] as! String) {
                output = DatabaseUtils.columnCount(index)
            }
            
            // NETWORK
            
        case "NetworkUtils.setRuleOnConnect":
            makerReachability.startReachability()
            makerReachability.ruleOnConnect = "\(params[0])"
            makerReachability.ruleOnConnectParams = params[1] is NSNull ? [] : params[1] as! [Any]
        case "NetworkUtils.setRuleOnDisconnect":
            makerReachability.startReachability()
            makerReachability.ruleOnDisconnect = "\(params[0])"
            makerReachability.ruleOnDisconnectParams = params[1] is NSNull ? [] : params[1] as! [Any]
        case "NetworkUtils.sendImageInBody":
            break
        case "NetworkUtils.networkstatus":
            output = NetworkUtils.networkStatus()
        case "NetworkUtils.postData":
            if !(params[4] is NSNull), isDuplicatedRequest(params[4] as! String),
                let result = UserDefaults.standard.object(forKey: "lastResult") as? String {
                output = result
            } else {
                let data = params[3] is NSNull ? "" : params[3] as! String
                let address = params[0] is NSNull ? "" : params[0] as! String
                let headers = params[2] is NSNull ? [String: Any]() : params[2] as! [String: Any]
                let type = params[1] is NSNull ? "" : params[1] as! String
                output = NetworkUtils.postData(data, to: address, headers: headers, type: type)
                UserDefaults.standard.set(output, forKey: "lastResult")
            }
        case "NetworkUtils.sendImageInBody":
            if isDuplicatedRequest(params[2] as! String),
                let result = UserDefaults.standard.object(forKey: "lastResult") as? String {
                output = result
            } else {
                output = NetworkUtils.sendImageInBody(params[0] as! String, with: params[1] as! String)
                UserDefaults.standard.set(output, forKey: "lastResult")
            }
        case "NetworkUtils.consumeWsBase64ToBinary":
            if isDuplicatedRequest(params[5] as! String),
                let result = UserDefaults.standard.object(forKey: "lastResult") as? String {
                output = result
            } else {
                let result = NetworkUtils.postData("", to: params[0] as! String, headers: params[4] as! [String : Any], type: params[3] as! String)
                if let data = result.data(using: .utf8),
                    let json = try? JSONSerialization.jsonObject(with: data, options: []),
                    let dict = json as? [String: Any] {
                    if let base64 = dict[params[1] as! String] as? String,
                        let name = dict[params[2] as! String] as? String {
                        output = FileUtils.base64ToBinary(content: base64 , name: name)
                        UserDefaults.standard.set(output, forKey: "lastResult")
                    }
                }
            }
        case "NetworkUtils.postDataHttps":
            if isDuplicatedRequest(params[4] as! String),
                let result = UserDefaults.standard.object(forKey: "lastResult") as? String {
                output = result
            } else {
                output = NetworkUtils.postDataHTTPS(params[0] as! String, content: params[1] as! String, data: params[2] as! String)
                UserDefaults.standard.set(output, forKey: "lastResult")
            }
        case "NetworkUtils.postFile":
            let address = params[0] as! String
            let parameters = params[1] is NSNull ? [String: Any]() : params[1] as! [String: Any]
            let files = params[2] is NSNull ? [String: Any]() : params[2] as! [String: Any]
            output = NetworkUtils.postFile(files, with: parameters, to: address)
        case "NetworkUtils.postFileAsync":
            let address = params[0] as! String
            let parameters = params[1] is NSNull ? [String: Any]() : params[1] as! [String: Any]
            let files = params[2] is NSNull ? [String: Any]() : params[2] as! [String: Any]
            let paramsSuccess = params[5] is NSNull ? [Any]() : params[5] as! [Any]
            let paramsError = params[7] is NSNull ? [Any]() : params[7] as! [Any]
            NetworkUtils.postFileAsync(files, with: parameters, to: address, formGUID: "\(params[3])", successFlow: "\(params[4])", paramsSuccess: paramsSuccess, errorFlow: "\(params[6])", paramsError: paramsError)
        case "NetworkUtils.downloadFile":
            let _ = NetworkUtils.download(params[0] as! String, name: params[1] as! String)
        case "NetworkUtils.downloadStart":
            output = NetworkUtils.downloadStart(params[0] as! String, name: params[1] as! String)
        case "NetworkUtils.getUserDefaultWithString":
            if let result = UserDefaults.standard.object(forKey: params[0] as! String) as? String {
                output = result
            }
        case "NetworkUtils.sendSoapMessage":
            if isDuplicatedRequest(params[4] as! String),
                let result = UserDefaults.standard.object(forKey: "lastResult") as? String {
                output = result
            } else {
                output = NetworkUtils.sendSoapMessage(params[0] as! String, content: params[2] as! String, action: params[1] as! String, with: params[3] as! [String : Any])
                UserDefaults.standard.set(output, forKey: "lastResult")
            }
        case "NetworkUtils.isOnline":
           NetworkUtils.checkInternetConnection(success: params[0] as! String, successArgs: params[1] as! [Any], fail: params[2] as! String, failArgs: params[3] as! [Any])            
            
            // FILE
            
        case "FileUtils.fileOpenReadOnly":
            output = FileUtils.fileOpenReadOnly(params[0] as! String)
        case "FileUtils.moveTo":
            output = FileUtils.moveTo(params[0] as! String, to: params[1] as! String)
        case "FileUtils.fileOpenWrite":
            output = FileUtils.fileOpenWrite(params[0] as! String, append: (params[1] is Int))
        case "FileUtils.fileReadAllBytes":
            output = FileUtils.fileReadAllBytes(params[0] as! String)
        case "FileUtils.fileAppend":
            let _ = FileUtils.fileAppend(params[0] as! String, content: params[1] as! String)
        case "FileUtils.fileClose":
            output = FileUtils.fileClose(params[0] as! String) ? "true" : "false"
        case "FileUtils.fileDataDir":
            output = FileUtils.fileDataDir()
        case "FileUtils.fileRename":
            output = FileUtils.fileRename(params[0] as! String, to: params[1] as! String)
        case "FileUtils.base64ToBinary":
            output = FileUtils.base64ToBinary(content: params[0] as! String, name: "")
            
            // UTILS
            
        case "Utils.configureFirebase":
            break
        case "Utils.createsharedpreferences":
            let name = params[0] as! String
            if let value = params[1] as? String {
                if let str = UserDefaults.standard.object(forKey: name) {
                    UserDefaults.standard.set("\(str)@@@@\(value)", forKey: name)
                } else {
                    UserDefaults.standard.set(value, forKey: name)
                }
            } else {
                if let array = params[1] as? [String: Any] {
                    array.forEach() {(key, value) in
                        if let str = UserDefaults.standard.object(forKey: key) {
                            UserDefaults.standard.set("\(str)@@@@\((value is NSNull ? "" : value))", forKey: key)
                        } else {
                            UserDefaults.standard.set((value is NSNull ? "" : value), forKey: key)
                        }
                    }
                }
            }
        case "Utils.getallpreferences":
            output = UserDefaults.standard.string(forKey: params[0] as! String) ?? ""
        case "Utils.clearpreferences":
            UserDefaults.standard.removeObject(forKey: params[0] as! String)
        case "Utils.showAlert":
            let title: String = params[0] as? String ?? ""
            let message: String = params[1] as? String ?? ""
            let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default) {_ in })
            DispatchQueue.main.async { Singleton.shared.present(alert, animated: true, completion: nil) }
        case "FileUtils.confirmshow":
            let cancelPosition: String = params[0] as? String ?? "E"
            let title: String = params[1] as? String ?? ""
            let message: String = params[2] as? String ?? ""
            let success: String = params[3] as! String
            var successArgs: [Any] = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            let formGUID: String = params[5] as? String ?? ""
            let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
            
            alert.addAction(UIAlertAction(title: cancelPosition == "E" ? "Cancelar" : "OK", style: .default, handler: { (action: UIAlertAction!) in
                let option = cancelPosition == "E" ? 0 : 1
                successArgs [0] = option
                Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: successArgs)
            }))
            
            alert.addAction(UIAlertAction(title: cancelPosition == "E" ? "OK" : "Cancelar", style: .default, handler: { (action: UIAlertAction!) in
                let option = cancelPosition == "E" ? 1 : 0
                successArgs [0] = option
                Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: successArgs)
            }))
            
            DispatchQueue.main.async { Singleton.shared.present(alert, animated: true, completion: nil) }
        case "Utils.systemExit":
            exit(0)
        case "Util.Sleep":
            usleep(1000 * 3000)
        case "Utils.returnNotification":
            notificationUtils.returnNotification()
        case "Utils.createNotification":
            notificationUtils.createNofitication(notificationRule: params[0] as? String, notificationParams: params[1] as? [Any], notificationTitle: "\(params[2])", notificationText: "\(params[3])")
        case "Utils.isInBackground":
            let state: UIApplicationState = UIApplication.shared.applicationState
            switch state {
            case .active:
                output = "false"
            case .background:
                output = "true"
            case .inactive:
                output = "true"
            }
        case "Utils.getAppVersion":
            let build : Any! = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion")
            return build
        case "Utils.getDeviceInfo":
            var jsonInfo = [String: Any]()
            jsonInfo["OS Type"] = "iOS"
            jsonInfo["OS Version"] = UIDevice.current.systemVersion
            jsonInfo["Device Manufacturer"] = "Apple inc."
            jsonInfo["Device Model"] = UIDevice.current.localizedModel
            jsonInfo["Battery Level"] = UIDevice.current.batteryLevel * 100
            jsonInfo["App Version"] = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion")
            return jsonInfo
            
            // LOCATIONS
            
        case "LocationUtils.currentLocation": //Deprecated
            locationUtils.currentLocation("\(params[0])", sucess: "\(params[1])", error: "\(params[2])")
        case "LocationUtils.startLocationService":
            locationService.startLocationService("\(params[0])", successRule: "\(params[1])", succesParams: params[2] as! [String?], errorRule: "\(params[3])", errorParams: params[4] as! [String?])
        case "LocationUtils.getCurrentLocation":
            output = locationService.getLastCoords()
        case "LocationUtils.startMonitoringGPS":
            locationService.startMonitoringGPS(Int("\(params[0])")!, interval: Double("\(params[1])")!, fastestInterval: Double("\(params[2])")!, formGUID: "\(params[3])", monitoringRule: "\(params[4])", monitoringParams: params[5] as? [Any])
        case "LocationUtils.disconnect":
            locationService.stopMonitoringGPS()
            
            // TRACKER
            
        case "Tracking.setID":
            TrackerUtils.setAnalyticsID(params[0] as! String)
            output = "1"
        case "Tracking.sendView":
            TrackerUtils.sendView(params[0] as! String)
            output = "1"
        case "Tracking.sendEvent":
            TrackerUtils.sendEvent(params[0] as! String, rule: params[1] as! String, component: params[2] as! String)
            output = "1"
        case "Tracking.sendException":
            TrackerUtils.sendException(params[0] as! String)
            output = "1"
            
            // APP
            
        case "Utils.OpenUrlOnNewTab":
            Singleton.shared.openSafariViewController(url: params[0] as! String)
        case "App.openOtherApp":
            Singleton.shared.openSafariWebView(params[0] as! String)
        case "WirelessUtils.sendText":
            Singleton.shared.shareContent(params[0] as! String, text: params[1] as! String)
            
            // AUDIO
        case "AudioUtils.startRecord":
            output = audioUtils.recordClick("\(params[0])")
        case "AudioUtils.stopRecord":
            output = audioUtils.stopClick()
        case "AudioUtils.startVoiceCapture":
            let formGUID = params[0] as! String
            let paramsSucess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            audioUtils.recordAndRecognizeSpeech(formGUID: formGUID, success: "\(params[1])", successArgs: paramsSucess, error: "\(params[3])", errorArgs: paramsError)
        case "FingerprintUtils.fingerprintValidation":
            let formGUID = params[0] as! String
            let paramsSucess = params[2] is NSNull ? [Any]() : params[2] as! [Any]
            let paramsError = params[4] is NSNull ? [Any]() : params[4] as! [Any]
            fingerPrintUtils.fingerValidation(formGUID, sucess: "\(params[1])", sucessArgs: paramsSucess, error: "\(params[3])", errorArgs: paramsError)
        default:
            break
        }
        return output
    }
    
}