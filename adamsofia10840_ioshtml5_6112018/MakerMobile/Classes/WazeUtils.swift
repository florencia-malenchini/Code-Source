//
//  WazeUtils.swift
//  MakerMobile
//
//  Created by Softwell Solutions on 06/09/2018.
//  Copyright © 2018 SoftwellSolutions. All rights reserved.
//

import Foundation
import WazeTransport
import CoreLocation




open class WazeUtils: Wazetransport{
    

     func startSDK (endereco:String,lat: Double,lng: Double){
        
        var url = URL(string:"mytransport://")
        let location = CLLocation.init(latitude: lat, longitude: lng)
        WazeTransport.sharedInstance().start(with: location, delegate: self, return: url)
    

    }
    
     func driveRequest(lat:Double, lng:Double){
        let location = CLLocation.init(latitude: lat, longitude: lng)
        WazeTransport.sharedInstance().setLocation(location);
    }
    
     func stopNavigationRequest(){
        
        WazeTransport.sharedInstance().stopNavigation();
    }
    
     func terminateSDK(){
        
        WazeTransport.sharedInstance().terminate();
    }
    
    func getWazebuildNumber() ->Int{
        
       return WazeTransport.version();
    }
    
    
}
