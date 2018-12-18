//
//  AuthUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 11/08/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import FirebaseAuth
import FacebookCore
import FacebookLogin

public enum AuthType: Int {
    case sms
    case email
    case facebook
}

open class AuthUtils: NSObject {
    open var handle: AuthStateDidChangeListenerHandle?
    open var formGUID = ""
    open var success = ""
    open var successArgs = [Any]()
    open var error = ""
    open var errorArgs = [Any]()
    
    deinit {
        if let _ = handle { Auth.auth().removeStateDidChangeListener(handle!) }
    }
    
    open func auth(_ formGUID: String, success: String, successArgs: [Any], error: String, errorArgs: [Any], params: [String: String], type: AuthType) {
        self.formGUID = formGUID
        self.success = success
        self.successArgs = successArgs
        self.error = error
        self.errorArgs = errorArgs
        
        let auth = Auth.auth()
        auth.useAppLanguage()
        
        switch type {
        case .email:
            var jsonParams = [String: Any]()
            auth.signIn(withEmail: params["email"]!, password: params["password"]!) { (user, error) in
                if let error = error as NSError? {
                    if error.code == 17011 {
                        self.createUser(email: params["email"]!, password: params["password"]!)
                        return
                    }
                    else {
                        print(error.localizedDescription)
                        jsonParams["status"] = "ERROR"
                        jsonParams["UID"] = ""
                        jsonParams["mensagem"] = error.localizedDescription
                        if self.errorArgs.count == 0 {
                            self.errorArgs.insert(jsonParams, at: 0)
                        } else {
                            self.errorArgs[0] = jsonParams
                        }
                        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error , funArgs: self.errorArgs)}
                        return
                    }
                }
                 jsonParams["status"] = "OK"
                 jsonParams["UID"] =  auth.currentUser?.uid
                 jsonParams["mensagem"] = "startEmailValidate:success"
                if self.successArgs.count == 0 {
                    self.successArgs.insert(jsonParams, at: 0)
                } else {
                    self.successArgs[0] = jsonParams
                }
                 DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
            }
        case .sms:
            let provider = PhoneAuthProvider.provider()
            provider.verifyPhoneNumber(params["number"]!, uiDelegate: nil) {(verificationID, error) in
                if error != nil {
                    var array = [String]()
                    self.errorArgs.forEach({ $0 is NSNull ? array.append("") : array.append("\($0)") })
                    Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: array)
                }
                self.showTextInput(handler: {verificationCode in
                    let credential = provider.credential(withVerificationID: verificationID ?? "", verificationCode: verificationCode) as AuthCredential
                    self.login(credential)
                })
            }
        case .facebook:
            guard let _ = Bundle.main.object(forInfoDictionaryKey: "FacebookAppID") else { return }
            DispatchQueue.main.async {
                LoginManager().logIn(readPermissions: [.email, .publicProfile], viewController: Singleton.shared) {
                    switch $0 {
                    case .failed(let error):
                        print(error.localizedDescription)
                        var array = [String]()
                        self.errorArgs.forEach({ $0 is NSNull ? array.append("") : array.append("\($0)") })
                        Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: array)
                    case .cancelled:
                        var array = [String]()
                        self.errorArgs.forEach({ $0 is NSNull ? array.append("") : array.append("\($0)") })
                        Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: array)
                    case .success(_, _, _):
                        if let current = AccessToken.current {
                            let connection = GraphRequestConnection()
                            connection.add(GraphRequest(graphPath: "/me",  parameters: ["fields": params["fields"]])) { httpResponse, result in
                                switch result {
                                case .success(let response):
                                    if let dict = response.dictionaryValue {
                                        let userID = "\(dict["id"] ?? "")"
                                        let name = "\(dict["name"] ?? "")"
                                        let email = "\(dict["email"] ?? "")"
                                        let photo = "http://graph.facebook.com/\(userID)/picture?type=large"
                                        
                                        var json = [String: Any]()
                                        var array = [Any]()
                                        json["id"] = userID
                                        json["name"] = name
                                        json["photo"] = photo
                                        json["email"] = email
                                        json["token"] = "\(current.authenticationToken)"
                                        array.append(json)
                                        
                                        Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: array)
                                    }
                                case .failed(let error):
                                    self.errorArgs[0] = error.localizedDescription
                                    Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs)
                                }
                            }
                            connection.start()
                        }
                    }
                }
            }
        }
    }
    
    open func onLogout() {
        let auth = Auth.auth()
            do {
                try auth.signOut()
            } catch {
                print(error.localizedDescription)
            }
    }
    
    open func passwordReset(_ formGUID: String, success: String, successArgs: [Any], error: String, errorArgs: [Any], email: String) {
        self.formGUID = formGUID
        self.success = success
        self.successArgs = successArgs
        self.error = error
        self.errorArgs = errorArgs
        var jsonParams = [String: Any]()
        let auth = Auth.auth()
        auth.useAppLanguage()
        
        auth.sendPasswordReset(withEmail: email) { (error) in
            if let error = error as NSError? {
                jsonParams["status"] = "ERROR"
                jsonParams["mensagem"] = error.localizedDescription
                if self.errorArgs.count == 0 {
                    self.errorArgs.insert(jsonParams, at: 0)
                } else {
                    self.errorArgs[0] = jsonParams
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error , funArgs: self.errorArgs)}
            }
            else {
                jsonParams["status"] = "OK"
                jsonParams["mensagem"] = "Um link foi enviado ao seu email para redefinir a sua senha."
                if successArgs.count == 0 {
                    self.successArgs.insert(jsonParams, at: 0)
                } else {
                    self.successArgs[0] = jsonParams
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
            }
        }
    }

    open func emailVerification(_ formGUID: String, success: String, successArgs: [Any], error: String, errorArgs: [Any]) {
        self.formGUID = formGUID
        self.success = success
        self.successArgs = successArgs
        self.error = error
        self.errorArgs = errorArgs
        
        let auth = Auth.auth()
        auth.useAppLanguage()
        
        if (auth.currentUser?.isEmailVerified)! {
            if errorArgs.count == 0 {
                self.errorArgs.insert("Este usuário já possui o email verificado.", at: 0)
            } else {
                self.errorArgs[0] = "Este usuário já possui o email verificado."
            }
            DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error , funArgs: self.errorArgs)}
        }
        else {
            auth.currentUser?.sendEmailVerification { (error) in
                if let error = error as NSError? {
                    if errorArgs.count == 0 {
                        self.errorArgs.insert(error.localizedDescription, at: 0)
                    } else {
                        self.errorArgs[0] = error.localizedDescription
                    }
                    DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error , funArgs: self.errorArgs)}
                }
                else {
                     if errorArgs.count == 0 {
                        self.successArgs.insert("Um link para verificar o seu email foi enviado para " + (auth.currentUser?.email)!, at: 0)
                       } else {
                             self.successArgs[0] = "Um link para verificar o seu email foi enviado para " + (auth.currentUser?.email)!
                       }
                    DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
                }
            }
        }
    }
    
    open func isUserLoggedIn() -> Bool {
        let auth = Auth.auth()
        
        if auth.currentUser != nil {
            return true
        } else {
            return false
        }
    }
    open func tokenLogin(_ formGUID: String, success: String, successArgs: [Any], error: String, errorArgs: [Any], token: String?) {
        self.formGUID = formGUID
        self.success = success
        self.successArgs = successArgs
        self.error = error
        self.errorArgs = errorArgs
        
        let auth = Auth.auth()
        auth.useAppLanguage()
        
        auth.signIn(withCustomToken: token ?? "") { (user, error) in
            if let error = error as NSError? {
                if errorArgs.count == 0 {
                self.errorArgs.insert(error.localizedDescription, at: 0)
                } else {
                     self.errorArgs[0] = error.localizedDescription
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error , funArgs: self.errorArgs)}
            } else {
                self.successArgs[0] = true
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
            }
        }
    }

    // PRIVATE FUNCTIONS
    
    fileprivate func createUser(email: String, password: String) {
        var jsonParams = [String: Any]()
        Auth.auth().createUser(withEmail: email, password: password) { user, error in
            if let error = error {
                print(error.localizedDescription)
                jsonParams["status"] = "ERROR"
                jsonParams["UID"] = ""
                jsonParams["mensagem"] = error.localizedDescription
                if self.errorArgs.count == 0 {
                    self.errorArgs.insert(jsonParams, at: 0)
                } else {
                    self.errorArgs[0] = jsonParams
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs) }
            }
            else if let user = user {
                print(user)
                jsonParams["status"] = "OK"
                jsonParams["UID"] =  user.uid
                jsonParams["mensagem"] = "startEmailValidate:success"
                jsonParams["primeiroCadastro"] = true
                if self.successArgs.count == 0 {
                    self.successArgs.insert(jsonParams, at: 0)
                } else {
                    self.successArgs[0] = jsonParams
                }
                DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
            }
        }
    }
    
    fileprivate func showTextInput(handler:@escaping (_ code: String)->()) {
        DispatchQueue.main.async {
            let prompt = UIAlertController(title: "Código de confirmação", message: "Código recebido via SMS", preferredStyle: .alert)
            prompt.addTextField() { $0.keyboardType = .phonePad }
            prompt.addAction(UIAlertAction(title: "CANCELAR", style: .destructive, handler: nil))
            prompt.addAction(UIAlertAction(title: "OK", style: .default, handler: { [weak prompt] (_) in
                handler(prompt!.textFields![0].text ?? "")
            }))
            DispatchQueue.main.async { Singleton.shared.present(prompt, animated: true, completion: nil) }
        }
    }
    
    fileprivate func login(_ credential: AuthCredential) {
        var array = [String]()
        
        Auth.auth().signIn(with: credential) { (user, error) in
            if let _ = error {
                self.errorArgs.forEach({ $0 is NSNull ? array.append("") : array.append("\($0)") })
                Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: array)
            } else {
                self.successArgs.forEach({ $0 is NSNull ? array.append("") : array.append("\($0)") })
                Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: array)
            }
        }
    }
}
