//
//  FirebaseUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 20/09/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import FirebaseDatabase

open class FirebaseDatabaseUtils: NSObject {
    open var ref: DatabaseReference?
    open var currentGUID = "{00000000-0000-0000-0000-000000000001}"
    open var success = ""
    open var successArgs = [Any]()
    open var error = ""
    open var errorArgs = [Any]()
    
    // OPEN FUNCTIONS
    
    open func connect() {
        ref = Database.database().reference()
    }
    
    open func onDisconnect(_ node: String, params: Any) -> String{
        guard let ref = ref else { return "" }
        var data = [String: Any]()
        var jsonString = "";
        
        if (params is NSString){
            jsonString = params as! String
            data = jsonString.toJson();
        }
        
        if data.count > 0 {
            ref.child(node).onDisconnectSetValue(data)
        }else{
            ref.child(node).onDisconnectSetValue(params);
        }
        return "";
    }
    
    open func write(_ node: String, identifier: String?, data: Any, async: Bool, success: String, successArgs: [Any], errorCallback: String, errorArgs: [Any] ) -> String {
        
        guard let ref = ref else { return "" }
        let udid = identifier ?? ref.child(node).childByAutoId().key
        var localErrorArgs = errorArgs
        var localSuccessArgs = successArgs
        var json = [String: Any]()
        var jsonString = ""
        
        if async {
            if (data is NSString){
                jsonString = data as! String
                json = jsonString.toJson()
            }
            if json.count > 0 {
                ref.child(node).child(udid).setValue(json, withCompletionBlock: {(error:Error?, ref: DatabaseReference) in
                    if let error = error {
                        if(localErrorArgs.count == 0){
                            localErrorArgs.insert(error.localizedDescription, at: 0)
                        }else{
                            localErrorArgs[0] = error.localizedDescription
                        }
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.currentGUID, funName: errorCallback, funArgs: localErrorArgs) }
                        print(error.localizedDescription)
                    }else {
                        if(localSuccessArgs.count == 0){
                            localSuccessArgs.insert(udid, at: 0)
                        }else{
                            localSuccessArgs[0] = udid
                        }
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.currentGUID, funName: success, funArgs: localSuccessArgs) }
                    }
                })
            } else {
                ref.child(node).child(udid).setValue(data,  withCompletionBlock: { (error:Error?, ref: DatabaseReference) in
                    if let error = error {
                        if(localErrorArgs.count == 0){
                            localErrorArgs.insert(error.localizedDescription, at: 0)
                        }else{
                            localErrorArgs[0] = error.localizedDescription
                        }
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.currentGUID, funName: errorCallback, funArgs: localErrorArgs)}
                        print(error.localizedDescription)
                    } else {
                        if(localSuccessArgs.count == 0){
                            localSuccessArgs.insert(udid, at: 0)
                        }else{
                            localSuccessArgs[0] = udid
                        }
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.currentGUID, funName: success, funArgs: localSuccessArgs)}
                    }
                })
            }
           
        } else {
            if (data is NSString){
                jsonString = data as! String
                json = jsonString.toJson();
            }
            if json.count > 0 {
                ref.child(node).child(udid).setValue(json);
            } else {
                ref.child(node).child(udid).setValue(data);
            }
        }
        return udid
    }
    
    open func readData(_ formGUID: String, success: String, successArgs: [Any], node: String, filter: [String: Any], orderType: String, orderData: String) {
        guard let ref = ref?.database.reference() else { return }
        var query: DatabaseQuery;
        
        query = ref.child(node);
        query = doOrder(query: query, orderType: orderType, orderNode: orderData)
        
        if(filter.count > 0){
            query = doFilter(query: query, with: filter)
        }
        
        query.observeSingleEvent(of: .value, with: { (snapshot) in
            var array = [Any]()
            var json = [String: Any]()
            
            if let dict = snapshot.value as? [String: Any] {
                for (key, value) in dict {
                    json[key] = value
                }
            }else if snapshot.exists(){
                json[snapshot.key] = snapshot.value
            }
            
            array.append(json);
            
            var i = 1;
            while i <= successArgs.count - 1 {
                array.append(successArgs[i] is NSNull ? "" : successArgs[i]);
                i = i + 1;
            }
            
            Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: array)
            
        }){ (error) in
            var array = [Any]()
            array.append(error.localizedDescription)
            array.append("FirebaseDatabaseUtils")
            array.append("readData")
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: "handleException", funArgs: array)
            print(error.localizedDescription)
        }
    }
    
    open func monitoring(_ formGUID: String, success: String, successArgs: [Any], node: String, filter: [String: Any],  orderType: String, orderData: String) {
        guard let ref = ref?.database.reference() else { return }
        var query: DatabaseQuery;
        
        query = ref.child(node);
        query = doOrder(query: query, orderType: orderType, orderNode: orderData);
        
        if(filter.count > 0){
            query = doFilter(query: query, with: filter);
        }
        
        query.observe(.childAdded, with: {(snapshot) -> Void in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "A", previous: snapshot.key)
        })
        
        query.observe(.childMoved, with: {(snapshot) -> Void in
            //observe(snapshot: snapshot, with: "", previous: previous)
        })
        
        query.observe(.childChanged, with: {(snapshot) -> Void in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "U", previous: snapshot.key)
        })
        
        query.observe(.childRemoved, with: {(snapshot) -> Void in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "D", previous: snapshot.key)
        })
    }
    
    open func stopMonitoring(node: String){
        guard let ref = ref else { return }
        let query = ref.child(node);
        query.removeAllObservers()
    }
    
    fileprivate func observe(_ formGUID: String, funName: String, funArgs: [Any], snapshot: DataSnapshot, with action: String, previous: String?) {
        var array = [Any]()
        var json = [String: Any]()
        
        if let dict = snapshot.value as? [String: Any] {
            for (key, value) in dict {
                json[key] = value
            }
        } else if snapshot.exists(){
                json[snapshot.key] = snapshot.value
        }
        
        array.append(action)
        array.append(json)
        
        if let _ = previous { array.append(previous!) }
        
        var i = 3;
        while i <= funArgs.count - 1 {
            array.append(funArgs[i] is NSNull ? "" : funArgs[i]);
            i = i + 1;
        }
        
        Singleton.shared.ansycCallback(formGUID, funName: funName, funArgs: array)
    }
    
    fileprivate func doFilter(query: DatabaseQuery, with filter: [String: Any]) -> DatabaseQuery{
        var queryReturn = query
        if(filter.count > 0){
            if let dict = filter as? [String: Any] {
                for (key, value) in dict {
                    switch key {
                    case "equalTo":
                        queryReturn = queryReturn.queryEqual(toValue: value)
                    case "first":
                        guard let value = value as? UInt else { break }
                        queryReturn = queryReturn.queryLimited(toFirst: value)
                    case "last":
                        guard let value = value as? UInt else { break }
                        queryReturn = queryReturn.queryLimited(toLast: value)
                    case "startWith", "startAt":
                        queryReturn = queryReturn.queryStarting(atValue: value)
                    case "endsWith", "endAt":
                        queryReturn = queryReturn.queryEnding(atValue: value)
                    default:
                        return query
                    }
                }
            }
        }
        return queryReturn;
    }
    
    fileprivate func doOrder(query: DatabaseQuery, orderType: String, orderNode: String) -> DatabaseQuery{
        
        if(orderType == "V") {
            return query.queryOrderedByValue();
        }else if(orderType == "F") {
            return query.queryOrdered(byChild: orderNode);
        }else if(orderType == "C"){
            return query.queryOrderedByKey();
        }
        return query
    }
    
}
