//
//  FingerPrintUtils.swift
//  MakerMobile
//
//  Created by Softwell Solutions on 06/06/2018.
//  Copyright © 2018 SoftwellSolutions. All rights reserved.
//

import Foundation
import LocalAuthentication


open class FingerPrintUtils: NSObject {
    
    open var formGUID = ""
    open var sucess = ""
    open var sucessArgs = [Any]()
    open var errorRule = ""
    open var errorArgs = [Any]()
    
    var context = LAContext()
    var authError: NSError?
    let reasonString = " "
    
    open func fingerValidation(_ formGUID: String, sucess: String, sucessArgs: [Any], error: String, errorArgs: [Any]) {
        
        self.formGUID = formGUID
        self.sucess = sucess
        self.sucessArgs = sucessArgs
        self.errorRule = error
        self.errorArgs = errorArgs
        
        context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reasonString) { success, evaluateError in
            
            if success {
                //TODO: User authenticated successfully, take appropriate action
                self.sucessArgs.append(success.description)
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.sucess, funArgs: self.sucessArgs) }
            } else {
                //TODO: User did not authenticate successfully, look at error and take appropriate action
                let error = evaluateError as NSError?
                    if(error?.code == -8) {
                        self.context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: self.reasonString) { success, evaluateError in
                            
                            if success {
                                //TODO: User authenticated successfully, take appropriate action
                                self.sucessArgs.append(success.description)
                                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.sucess, funArgs: self.sucessArgs) }
                            } else {
                                self.errorArgs.append(error?.localizedDescription)
                                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.errorRule, funArgs: self.errorArgs)}
                            }
                        }
                    }
                    else {
                        self.errorArgs.append(error?.localizedDescription)
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.errorRule, funArgs: self.errorArgs)}
                        }
                    }
                }
            self.context = LAContext()
        }
}

