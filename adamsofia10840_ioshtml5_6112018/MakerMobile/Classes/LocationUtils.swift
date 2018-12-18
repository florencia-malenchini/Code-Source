//
//  LocationUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 11/08/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import CoreLocation

open class LocationUtils: NSObject {
    var location: CLLocationManager!
    var forceFinish = false
    var formLocation = ""
    var successLocation = ""
    var errorLocation = ""
    
    public override init() {
        super.init()
        
        location = CLLocationManager()
        location.delegate = self
        location.desiredAccuracy = kCLLocationAccuracyBest
 
        let keybackground =  Bundle.main.object(forInfoDictionaryKey: "UIBackgroundModes") as! [String]
        let backgroundLocationKey = keybackground.contains("location")
        
        if(backgroundLocationKey) {
            location.activityType = CLActivityType.automotiveNavigation
            location.allowsBackgroundLocationUpdates = true
            location.pausesLocationUpdatesAutomatically = false
        }

        if location.responds(to: #selector(CLLocationManager.requestWhenInUseAuthorization)) {
             location.requestAlwaysAuthorization()
        }
   }

    
    open func currentLocation(_ form: String, sucess: String, error: String) {
        formLocation = form
        successLocation = sucess
        errorLocation = error
        forceFinish = false
        location.startUpdatingLocation()
    }
}

// MARK: CLLocationManagerDelegate

extension LocationUtils: CLLocationManagerDelegate {
    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {

        print("Não foi possível obter o GPS erro: \(error)")

        let alertController = UIAlertController(
            title: "",
            message: "Para uma melhor experiência, ative a localização do do dispositivo",
            preferredStyle: .alert)
        
        let cancelAction = UIAlertAction(title: "Cancelar", style: .default){(action) in
            var array = [Any]()
            array.append("-303");
            Singleton.shared.ansycCallback(self.formLocation, funName: self.errorLocation, funArgs: array)
        }
        alertController.addAction(cancelAction)
        let openAction = UIAlertAction(title: "Configurações", style: .default) { (action) in
            if let url = NSURL(string:UIApplicationOpenSettingsURLString) {
                UIApplication.shared.openURL(url as URL)
            }
        }
        alertController.addAction(openAction)
        Singleton.shared.present(alertController, animated: true, completion: nil)
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        location.stopUpdatingLocation()
        guard let current = manager.location, !forceFinish else { return }
        forceFinish = true
        let longitude = current.coordinate.longitude
        let latitude = current.coordinate.latitude
        let altitude = current.altitude
        let accuracy = current.horizontalAccuracy
        let speed = current.speed
        let timestamp = current.timestamp
        let mapa = "latitude|\(latitude)|longitude|\(longitude)|altitude|\(altitude)|accuracy|\(accuracy)|speed|\(speed)|timestamp|\(timestamp)"
       
        var array = [Any]()
        array.append(self.formLocation)
        array.append(self.successLocation)
        array.append(mapa);
       
        DispatchQueue.main.async {
          Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: "onSuccessGPS", funArgs: array)
        }
    }
}

//
//  LocationService.swift
//  MakerMobile
//
//  Created by Ariel Reis on 16/11/17.
//  Copyright © 2017 Softwell Solutions. All rights reserved.
//

open class LocationService: NSObject, CLLocationManagerDelegate{
    private var location = CLLocationManager()
    private var currentLocation: CLLocation?
    private var locationService: Bool = true
    private var interval = 1000.0
    private var fastInterval = 1000.0
    private var toFastInterval = 0
    private var formGUID: String = "{00000000-0000-0000-0000-000000000001}"
    private var monitoringRule: String = "console.log"
    private var monitoringParams: [Any]? = []
    private var isMonitoring = true
    
    public override init() {
        super.init()
        location.delegate = self
        location.desiredAccuracy = kCLLocationAccuracyBest
        location.requestWhenInUseAuthorization()
       
        let keybackground =  Bundle.main.object(forInfoDictionaryKey: "UIBackgroundModes") as! [String]
        let backgroundLocationKey = keybackground.contains("location")
        
        if(backgroundLocationKey) {
            location.activityType = CLActivityType.automotiveNavigation
            location.allowsBackgroundLocationUpdates = true
            location.pausesLocationUpdatesAutomatically = false
            if #available(iOS 11.0, *) {
                location.showsBackgroundLocationIndicator = true
            }
            location.requestAlwaysAuthorization()
        }
        location.distanceFilter = 0
        location.startUpdatingLocation()
    }
    
    public func startLocationService(_ formGUID: String, successRule: String, succesParams: [Any?], errorRule: String?, errorParams: [Any?]){
        if(!CLLocationManager.locationServicesEnabled()){
            if location.responds(to: #selector(CLLocationManager.requestWhenInUseAuthorization)) {
                location.requestWhenInUseAuthorization()
            } else {
                Singleton.shared.ansycCallback(formGUID, funName: errorRule ?? "console.log", funArgs: errorParams ?? [nil])
            }
        } else {
            Singleton.shared.ansycCallback(formGUID, funName: successRule, funArgs: succesParams ?? [nil])
        }
        
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        location.stopUpdatingLocation()
        currentLocation = manager.location
        if(isMonitoring) {
            var paramsReturn: [Any]? = []
            let json = self.getLastCoords()
            paramsReturn!.append(json)
            if(monitoringParams != nil){
              for i in 0 ..< monitoringParams!.count {
                  paramsReturn!.append(monitoringParams![i])
              }
            }
            Singleton.shared.ansycCallback(self.formGUID, funName: monitoringRule, funArgs: paramsReturn!)
        }
        
        DispatchQueue.main.async {
            _ = Timer.scheduledTimer(timeInterval: self.interval, target: self, selector: #selector(self.startLocationAgain), userInfo: nil, repeats: false)
        }
        print("GPS - Localização obtida")
    }
    
    func convertToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }


    public func getLastCoords() -> Any {
        var jsonLocation = [String: Any]()
        if(currentLocation != nil){
            jsonLocation["longitude"] = Double(currentLocation!.coordinate.longitude).rounded(toPlaces: 6)
            jsonLocation["latitude"]  = Double(currentLocation!.coordinate.latitude).rounded(toPlaces: 6)
            jsonLocation["altitude"]  = currentLocation!.altitude
            jsonLocation["accuracy"] = currentLocation!.horizontalAccuracy
            jsonLocation["speed"]     = currentLocation!.speed
            jsonLocation["timestamp"] = "\(currentLocation!.timestamp)"
        }
        return jsonLocation
    }
    
    public func getCoords() -> Any {
        var jsonLocation = [String: Any]()
        if(currentLocation != nil){
            jsonLocation["longitude"] = Double(currentLocation!.coordinate.longitude).rounded(toPlaces: 6)
            jsonLocation["latitude"]  = Double(currentLocation!.coordinate.latitude).rounded(toPlaces: 6)
            jsonLocation["altitude"]  = currentLocation!.altitude
            jsonLocation["accuracy"] = currentLocation!.horizontalAccuracy
            jsonLocation["speed"]     = currentLocation!.speed
            jsonLocation["timestamp"] = "\(currentLocation!.timestamp)"
        }
        return jsonLocation
    }
    
    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Erro ao obter a localização:\n", error.localizedDescription)
     // self.startLocationAgain()
    }
    public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        self.startLocationAgain()
    }
    
    public func startMonitoringGPS(_ priority: Int, interval: Double, fastestInterval: Double, formGUID: String, monitoringRule: String, monitoringParams: [Any]?){
        switch priority {
        case 100:
            location.desiredAccuracy = kCLLocationAccuracyBest
            location.distanceFilter = 10.0
        case 102:
            location.desiredAccuracy = kCLLocationAccuracyHundredMeters
            location.distanceFilter = 100.0
        case 104:
            location.desiredAccuracy = kCLLocationAccuracyKilometer
            location.distanceFilter = 500.0
        case 105:
            location.desiredAccuracy = kCLLocationAccuracyThreeKilometers
            location.distanceFilter = 1000.0
        default:
            location.desiredAccuracy = kCLLocationAccuracyHundredMeters
            location.distanceFilter = 10.0
        }


        self.interval = interval / 1000
        self.monitoringRule = monitoringRule
        self.monitoringParams = monitoringParams
        
        location.startUpdatingLocation()
        print("GPS - Monitoramento iniciado")
    }
    
    func startLocationAgain(){
        if(self.locationService){
            location.startUpdatingLocation()
        }
    }
    
    public func stopMonitoringGPS(){
        self.locationService = false
        location.stopUpdatingLocation()
    }
}
