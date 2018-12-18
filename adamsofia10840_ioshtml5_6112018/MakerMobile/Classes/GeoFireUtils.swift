//
//  GeoFireUtils.swift
//  MakerMobile
//
//  Created by Ronélio on 19/12/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import Foundation
import FirebaseDatabase
import GeoFire

open class GeoFireUtils: NSObject {
    fileprivate var mDatabase: DatabaseReference?
    fileprivate var geoFire: GeoFire?
    
    fileprivate var watchDatabase: DatabaseReference?
    fileprivate var watchGeoFire: GeoFire?
    fileprivate var watchGeoQuery: GFCircleQuery?

    
    open func setPosition(_ formGUID: String, success: String, successArgs: [Any], node: String!, key: String!, lat: Double!, lng: Double!) {
        
        if (lat == nil || lng == nil){
            return
        }
        
        if mDatabase == nil{
           mDatabase = Database.database().reference().child(node)
        }
        
        if(geoFire == nil){
            geoFire = GeoFire(firebaseRef: mDatabase)
        }
        
        let location = CLLocation.init(latitude: lat, longitude: lng)

        geoFire!.setLocation(location, forKey: key!, withCompletionBlock: { (error) in
                if error == nil{
                    if(success != ""){
                        var array = [Any]()
                        array.append(true)
            
                        var i = 1;
                        while i <= successArgs.count - 1 {
                            array.append(successArgs[i] is NSNull ? "" : successArgs[i]);
                            i = i + 1;
                        }
                        Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: array)
                    }
                }})
    }


    open func watch(_ formGUID: String, success: String, successArgs: [Any], node: String, lat: Double, lng: Double, radius: Double) {
        if watchDatabase == nil{
            watchDatabase = Database.database().reference().child(node)
        }
        
        if(watchGeoFire == nil){
             watchGeoFire = GeoFire(firebaseRef: watchDatabase)
        }
        
        if(watchGeoQuery != nil){
          watchGeoQuery?.removeAllObservers();
        }
        
        let location = CLLocation.init(latitude: lat, longitude: lng);
        watchGeoQuery = watchGeoFire!.query(at: location, withRadius: radius);

        watchGeoQuery?.observe(.keyEntered, with: {(snapshot: DataSnapshot!, key: String!, location: CLLocation!) in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "enter", previous: snapshot.key)
        })
        
        watchGeoQuery?.observe(.keyExited, with: {(snapshot: DataSnapshot!, key: String!, location: CLLocation!) in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "exit", previous: snapshot.key)
        })
        
        watchGeoQuery?.observe(.keyMoved, with: {(snapshot: DataSnapshot!, key: String!, location: CLLocation!) in
            self.observe(formGUID, funName: success, funArgs: successArgs, snapshot: snapshot, with: "moved", previous: snapshot.key)
        })
       
    }
    
    open func stopWatching(){
        watchGeoQuery?.removeAllObservers()
    }
    
    fileprivate func observe(_ formGUID: String, funName: String, funArgs: [Any], snapshot: DataSnapshot, with action: String, previous: String?) {
        var array = [Any]()
        var json = [String: Any]()
        
        if let dict = snapshot.value as? [String: Any] {
            for (key, value) in dict {
                json[key] = value
            }
        }
        
        array.append(action)
        array.append(json)
        
        if let _ = previous { array.append(previous!) }
        
        var i = 1;
        while i <= funArgs.count - 1 {
            array.append(funArgs[i] is NSNull ? "" : funArgs[i]);
            i = i + 1;
        }
        
        
        Singleton.shared.ansycCallback(formGUID, funName: funName, funArgs: array)
    }
    
    
}
