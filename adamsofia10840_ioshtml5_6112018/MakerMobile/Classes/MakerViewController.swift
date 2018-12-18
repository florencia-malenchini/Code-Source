//
//  MakerViewController.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 29/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import SafariServices
import JavaScriptCore


final class Singleton {
    static var shared: MakerViewController! {
        get {
            guard let window = UIApplication.shared.keyWindow, let root = window.rootViewController as? MakerViewController else { return MakerViewController() }
            return root
        }
    }
}
open class MakerViewController: UIViewController {
    @IBOutlet weak var webView: UIWebView!
    
    let bridge = Bridge()
    
    // MARK: API
    
    override open func viewDidLoad() {
        let statusBar: UIView = UIApplication.shared.value(forKey: "statusBar") as! UIView
        var statusBarColorString = Bundle.main.object(forInfoDictionaryKey: "StatusBarColor") as! String
        
        if(statusBarColorString != ""){
            statusBarColorString = statusBarColorString.replacingOccurrences(of: "#", with: "")
            statusBar.backgroundColor = self.getMakerStatusBar(statusBarColorString);
        }
        
        webView.scrollView.bounces = false
        if #available(iOS 11.0, *) {
            webView.scrollView.contentInsetAdjustmentBehavior = .never;
        }
        //self._removeInputAccessoryView(webView)
        AppDelegate().configureFirebase()
    }
    
    open func shareContent(_ title: String, text: String){
        
        let textToShare = [ text ]
        let activityViewController = UIActivityViewController(activityItems: textToShare, applicationActivities: nil)
        activityViewController.popoverPresentationController?.sourceView = self.view
        
        activityViewController.excludedActivityTypes = [ UIActivityType.airDrop, UIActivityType.postToFacebook ]
        self.present(activityViewController, animated: true, completion: nil)
    }
    
    open override var prefersStatusBarHidden: Bool {
        return false
    }
    
    open func getMakerStatusBar(_ statusBarColorString: String) -> UIColor{
        var rgb: UInt32 = 0
        var r: CGFloat = 0.0, g: CGFloat = 0.0, b: CGFloat = 0.0, a: CGFloat = 1.0
        let length = statusBarColorString.count
        guard Scanner(string: statusBarColorString).scanHexInt32(&rgb) else {
            return UIColor.init(red: 0.0, green: 0.0, blue: 0.0, alpha: 1.0)
        }
        
        if length == 6 {
            r = CGFloat((rgb & 0xFF0000) >> 16) / 255.0
            g = CGFloat((rgb & 0x00FF00) >> 8) / 255.0
            b = CGFloat(rgb & 0x0000FF) / 255.0
        }
        
        return UIColor.init(red: r, green: g, blue: b, alpha: a)
    }
    
    // MARK: OPEN
    
    open func executeJS(_ js: String) {
        
        webView.stringByEvaluatingJavaScript(from: js)
    }
    
    open func ansycCallback(_ winTarget: String, funName: String, funArgs: [Any]) {
        var json = [String: Any]()
        json["funArgs"] = funArgs
        json["funName"] = funName
        json["winTarget"] = winTarget
        
        if let data = try? JSONSerialization.data(withJSONObject: json, options: []),
            let jsonstring = String(data: data, encoding: .utf8) {
            executeJS("javascript:execFuncOnTarget(\(jsonstring))")
        }
    }
    
    func _removeInputAccessoryView(_ webView: UIWebView) {
        var targetView: UIView? = nil
        
        for view in webView.scrollView.subviews {
            print(String(describing: type(of: view)))
            if String(describing: type(of: view)).hasPrefix("UIWebBrowserView") {
                targetView = view
            }
        }
        
        guard let target = targetView else { return }
        
        let noInputAccessoryViewClassName = "\(target.superclass!)_NoInputAccessoryView"
        var newClass: AnyClass? = NSClassFromString(noInputAccessoryViewClassName)
        if newClass == nil {
            let targetClass: AnyClass = object_getClass(target)
            newClass = objc_allocateClassPair(targetClass, noInputAccessoryViewClassName.cString(using: String.Encoding.ascii)!, 0)
        }
        
        let originalMethod = class_getInstanceMethod(FauxBarHelper.self, #selector(getter: FauxBarHelper.inputAccessoryView))
        class_addMethod(newClass!.self, #selector(getter: FauxBarHelper.inputAccessoryView), method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod))
        object_setClass(target, newClass)
    }
    
    open func openSafariWebView(_ path: String) {
        if path.contains("file://") {
            showInteractor(path: path.replacingOccurrences(of: "file://", with: ""))
        } else {
            if let url = URL(string: path) {
                UIApplication.shared.openURL(url)
            }
        }
    }

    open func openSafariViewController (url: String){
        let svc = SFSafariViewController(url: NSURL(string: url)! as URL)
        DispatchQueue.main.async {self.present(svc, animated: true, completion: nil)}
    }
    
    open func configureWebView() {
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "assets/www") else { return }
        let request = URLRequest(url: url, cachePolicy: URLRequest.CachePolicy.useProtocolCachePolicy, timeoutInterval: 20.0)
        webView.loadRequest(request)
        self.navigationController?.isNavigationBarHidden = false;
    }
    
    // MARK: PRIVATE
    
    fileprivate func showInteractor(path: String) {
        let document = UIDocumentInteractionController(url: URL(fileURLWithPath: path))
        document.delegate = self
        DispatchQueue.main.async { document.presentPreview(animated: true) }
    }
}

// MARK: UIWebViewDelegate

extension MakerViewController: UIWebViewDelegate {
    public func webViewDidStartLoad(_ webView: UIWebView) {
        webView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        if let context = webView.value(forKeyPath: "documentView.webView.mainFrame.javaScriptContext") as? JSContext {
            context.setObject(bridge, forKeyedSubscript: "Bridge" as (NSCopying & NSObjectProtocol)!)
        }
    }
    
    public func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        guard let url = request.url, let _ = url.scheme else { return false }
        return true
    }
    
    public func webViewDidFinishLoad(_ webView: UIWebView) {
        if let invokeString = UserDefaults.standard.object(forKey: "invokeString") {
            webView.stringByEvaluatingJavaScript(from: "var invokeString = \"\(invokeString)\";")
        }
        webView.backgroundColor = .white
        
        if let userInfo = AppDelegate.notification {
            if let params = userInfo["params"] as? String {
                var newElement = [String: Any]()
                var array = [Any]()
                
                newElement["título"] = userInfo["title"] ?? "ALERTA"
                newElement["mensagem"] = userInfo["body"] ?? ")"
                newElement["extras"] = userInfo["params"] ?? ")"
                if let data = try? JSONSerialization.data(withJSONObject: newElement, options: []),
                    let jsonString = String(data: data, encoding: .utf8) {
                    array.append(jsonString)
                    Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000001}", funName: "showPushMessage", funArgs: array)
                }
            }
        }
    }
}

// MARK: SFSafariViewControllerDelegate

extension MakerViewController: SFSafariViewControllerDelegate {
    public func safariViewController(_ controller: SFSafariViewController, didCompleteInitialLoad didLoadSuccessfully: Bool) {
        print("COMPLETE")
    }
    
    public func safariViewControllerDidFinish(_ controller: SFSafariViewController) {
        dismiss(animated: true, completion: nil)
    }
}

// MARK: UIDocumentInteractionControllerDelegate

extension MakerViewController: UIDocumentInteractionControllerDelegate {
    public func documentInteractionControllerViewControllerForPreview(_ controller: UIDocumentInteractionController) -> UIViewController {
        return self
    }
    public func documentInteractionControllerViewForPreview(_ controller: UIDocumentInteractionController) -> UIView? {
        return view
    }
    public func documentInteractionControllerRectForPreview(_ controller: UIDocumentInteractionController) -> CGRect {
        return view.frame
    }
}

final class FauxBarHelper: NSObject {
    var inputAccessoryView: AnyObject? { return nil }
}
