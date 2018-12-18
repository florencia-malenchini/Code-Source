//
//  FilesUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 29/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit

open class FileUtils: NSObject {
    open static var dataDir = ""
    
    open static func fileOpenReadOnly(_ name: String) -> String {
        return name
    }
    
    open static func fileOpenWrite(_ name: String, append: Bool) -> String {
        let path = (absoluteFileName(name) as NSString).deletingLastPathComponent
        try? FileManager.default.createDirectory(atPath: path, withIntermediateDirectories: true, attributes: nil)
        return absoluteFileName(name)
    }
    
    open static func absoluteFileName(_ name: String) -> String {
        var _name = name
        if _name.hasPrefix("file://") {
            _name = (_name as NSString).substring(from: 7).replacingOccurrences(of: "//", with: "/").replacingOccurrences(of: "%20", with: " ")
        }
        if _name.hasPrefix("/") {
            let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
            if let documentsDirectory = paths.first {
                return (documentsDirectory as NSString).appendingPathComponent(_name)
            }
        }
        return _name
    }
    
    open static func fileDataDir() -> String {
        let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
        if let documentsDirectory = paths.first {
            dataDir = documentsDirectory
            return documentsDirectory
        }
        return ""
    }
    
    open static func getFileData(_ name: String) -> Data? {
        if let fileData = NSData(contentsOfFile: name) {
            return fileData as Data
        }
        return nil
    }
    
    open static func fileReadAllBytes(_ name: String) -> String {
        if let fileContent = try? String(contentsOfFile: name, encoding: .isoLatin1),
            let fileData = fileContent.data(using: .isoLatin1, allowLossyConversion: true) {
            return fileData.base64EncodedString()
        }
        return ""
    }
    
    open static func moveTo(_ path: String, to newPath: String) -> String {
        do {
            try FileManager.default.moveItem(at: URL(fileURLWithPath: path), to: URL(fileURLWithPath: newPath))
            return "1"
        } catch {
            return "0"
        }
    }
    
    open static func base64ToBinary(content: String, name: String) -> String {
        var filename = ""
        if name == "" {
            filename = "\(fileDataDir())/base64_\(RAND_MAX)"
        } else {
            filename = "\(fileDataDir())/\(name)"
        }
        let fileContents = Data(base64Encoded: content, options: .ignoreUnknownCharacters)
        if FileManager.default.createFile(atPath: filename, contents: fileContents, attributes: nil) {
            return filename
        }
        return "Error ao realizar a decodificaçao"
    }
    
    open static func binaryToBase64(_ path: String) -> String {
        if let content = NSData(contentsOfFile: path) {
            return content.base64EncodedString(options: .init(rawValue: 0))
        }
        return ""
    }
    
    open static func fileRename(_ path: String, to newPath: String) -> String {
        do {
            try FileManager.default.moveItem(at: URL(fileURLWithPath: path), to: URL(fileURLWithPath: newPath))
            return "1"
        } catch {
            return "0"
        }
    }
    
    open static func fileAppend(_ name: String, content: String) -> Bool {
        try? content.write(toFile: absoluteFileName(name), atomically: false, encoding: .isoLatin1)
        return true
    }
    
    open static func fileClose(_ name: String) -> Bool {
        return true
    }
}
