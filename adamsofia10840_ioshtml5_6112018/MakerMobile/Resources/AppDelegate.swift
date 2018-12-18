//
//  AppDelegate.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 29/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import UserNotifications
import FacebookCore
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder {
    var window: UIWindow?
    static var notification: [String: Any]?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        AppDelegate.notification = nil
        UIApplication.shared.isIdleTimerDisabled = Bundle.main.object(forInfoDictionaryKey: "ManterTelaAtiva") as! Bool
        if let _ = Bundle.main.object(forInfoDictionaryKey: "FacebookAppID") { SDKApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions) }
        UserDefaults.standard.removeObject(forKey: "invokeString")
        if let options = launchOptions {
            if let url = options[.url] as? URL {
                UserDefaults.standard.set(url.absoluteString, forKey: "invokeString")
            }
            if let userInfo = options[.remoteNotification] as? [String: Any] {
                AppDelegate.notification = userInfo
            }
        }
        return true
    }
    
    func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
        if((Date().timeIntervalSince1970 - notification.fireDate!.timeIntervalSince1970) < 0.5){
            print("Notificação criada")
        }else{
            NotificationUtils().returnNotification()
        }
    }
    
    func configureFirebase() {
        FirebaseApp.configure()
        Messaging.messaging().delegate = self
        configureNotification(UIApplication.shared)
    }
    
    // PRIVATE FUNCTIONS
    
    fileprivate func configureNotification(_ application: UIApplication) {
        if #available(iOS 10, *) {
            UNUserNotificationCenter.current().delegate = self
            UNUserNotificationCenter.current().requestAuthorization(options:[.alert, .badge, .sound]){ _, _ in
                if let delegate = UIApplication.shared.delegate, let keyWindow = delegate.window, let root = keyWindow!.rootViewController as? MakerViewController {
                    root.configureWebView()
                }
            }
        } else {
            application.registerUserNotificationSettings(UIUserNotificationSettings(types: [.badge, .sound, .alert], categories: nil))
        }
        application.registerForRemoteNotifications()
    }
    
    fileprivate func showAlertPush(_ notification: [AnyHashable: Any]) {
        if let aps = notification["aps"] as? [String: Any] {
            var newElement = [String: Any]()
            var array = [Any]()
          
            if let body = aps["alert"] as? [String: Any] {
                newElement["título"] = "\(body["title"] ?? "ALERTA")"
                newElement["mensagem"] = "\(body["body"] ?? "")"
            }
            
            if let extra =  notification["params"] {
                newElement["título"] = notification["title"] ?? "ALERTA"
                newElement["mensagem"] = notification["body"] ?? ")"
                newElement["extras"] = notification["params"] ?? ")"
            }
            
            if let data = try? JSONSerialization.data(withJSONObject: newElement, options: []),
                let jsonString = String(data: data, encoding: .utf8) {
                array.append(jsonString)
                Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: "showPushMessage", funArgs: array)
            }
            //let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
            //alert.addAction(UIAlertAction(title: "OK", style: .default) {_ in })
            //DispatchQueue.main.async { Singleton.shared.present(alert, animated: true, completion: nil) }
        }
    }
}

// MARK: UIApplicationDelegate

extension AppDelegate: UIApplicationDelegate {
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        _ = application.beginBackgroundTask(withName: "Background WebView") {
            self.endBgTask()
        }
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        DispatchQueue.main.async {
            Singleton.shared.executeJS("javascript:onBecomeActive()")
        }
        
        let audioSession = AVAudioSession.sharedInstance()
        
        do {
            try audioSession.setCategory(AVAudioSessionCategoryPlayAndRecord, with: AVAudioSessionCategoryOptions.defaultToSpeaker)
            try audioSession.setActive(true)
        } catch let error as NSError {
            print("audioSession error: \(error.localizedDescription)")
        }
    }
    
    func endBgTask(){
        print("Background Mode Inactive")
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any]) {
        Messaging.messaging().appDidReceiveMessage(userInfo)
        switch application.applicationState {
        case .active:
            showAlertPush(userInfo)
        case .inactive:
            if let params = userInfo["params"] as? String {
                print(userInfo["params"])
                DispatchQueue.main.async {
                    Singleton.shared.executeJS("javascript:showPushMessage(\"\(params)\")")
                }
            } else {
                DispatchQueue.main.async {
                    Singleton.shared.executeJS("javascript:showPushMessage(null)")
                }
            }
        case .background:
            print("BACKGROUND")
        }
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
        UserDefaults.standard.set("\(url)", forKey: "handleOpen")
        if let _ = Bundle.main.object(forInfoDictionaryKey: "FacebookAppID") { return SDKApplicationDelegate.shared.application(app, open: url, options: options) }
        return true
    }
    
    func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        if let delegate = UIApplication.shared.delegate, let keyWindow = delegate.window, let root = keyWindow!.rootViewController as? MakerViewController {
            let fcmToken = "\(Messaging.messaging().fcmToken ?? "-403")"
            UserDefaults.standard.set(fcmToken, forKey: "deviceToken")
            print("Firebase registration token: \(fcmToken)")
            root.configureWebView()
        }
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        #if DEBUG
            Auth.auth().setAPNSToken(deviceToken, type: .sandbox)
        #else
            Auth.auth().setAPNSToken(deviceToken, type: .prod)
        #endif
        Messaging.messaging().apnsToken = deviceToken
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("APNs registration failed: \(error)")
    }
}

// MARK: UNUserNotificationCenterDelegate
@available(iOS 10, *)
extension AppDelegate: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        let userInfo = notification.request.content.userInfo
        Messaging.messaging().appDidReceiveMessage(userInfo)
        showAlertPush(userInfo)
        completionHandler([])
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        let userInfo = response.notification.request.content.userInfo
        
        var newElement = [String: Any]()
        var array = [Any]()
        if let extra =  userInfo["params"] {
            newElement["título"] = userInfo["title"] ?? "ALERTA"
            newElement["mensagem"] = userInfo["body"] ?? ")"
            newElement["extras"] = userInfo["params"] ?? ")"
        }
        
        if let data = try? JSONSerialization.data(withJSONObject: newElement, options: []),
            let jsonString = String(data: data, encoding: .utf8) {
            array.append(jsonString)
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: "showPushMessage", funArgs: array)
        }
        completionHandler()
    }
}

// MARK: MessagingDelegate

extension AppDelegate: MessagingDelegate {
    func messaging(_ messaging: Messaging, didRefreshRegistrationToken fcmToken: String) {
        UserDefaults.standard.set("\(fcmToken)", forKey: "deviceToken")
        print("Firebase registration token: \(fcmToken)")
    }
    
    func messaging(_ messaging: Messaging, didReceive remoteMessage: MessagingRemoteMessage) {
        print("Received data message: \(remoteMessage.appData)")
    }
}
