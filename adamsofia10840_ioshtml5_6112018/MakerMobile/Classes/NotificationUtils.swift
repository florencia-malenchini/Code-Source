//
//  NotificationUtils.swift
//  MakerMobile
//
//  Created by Ariel Reis on 22/11/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

class NotificationUtils {
    func createNofitication(notificationRule: String?, notificationParams: [Any]?, notificationTitle: String?, notificationText: String?) {
        let notification = UILocalNotification()
        let dict:NSDictionary = ["key" : "value"]
        notification.userInfo = dict as! [String : String]
        notification.alertTitle = notificationTitle ?? Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as! String
        notification.alertBody = notificationText ?? "Nova notificação!"
        notification.soundName = UILocalNotificationDefaultSoundName
        notification.alertAction = "OK"
        notification.fireDate = Date()
        UserDefaults.standard.set(notificationRule, forKey: "notificationRule")
        UserDefaults.standard.set(notificationParams ?? nil, forKey: "notificationParams")
        UIApplication.shared.scheduleLocalNotification(notification)
    }
    
    func returnNotification() {
        let rule = UserDefaults.standard.string(forKey: "notificationRule")
        if(rule != nil){
            let params = UserDefaults.standard.array(forKey: "notificationParams") ?? []
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: rule!, funArgs: params)
            UserDefaults.standard.removeObject(forKey: "notificationRule")
            UserDefaults.standard.removeObject(forKey: "notificationParams")
            print("Fluxo de notificação executado")
        }
    }
}
