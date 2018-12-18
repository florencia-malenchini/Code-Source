//
//  CameraUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 20/07/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit
import AVFoundation
import Photos

open class CameraUtils: NSObject {
    let picker = UIImagePickerController()
    
    var formGUID = ""
    var success = ""
    var successArgs = [Any]()
    var error = ""
    var errorArgs = [Any]()
    var quality: CGFloat = 0
    
    var scanLayer: AVCaptureVideoPreviewLayer!
    var scansquare: UIView!
    var scanline: UIView!
    var scanSession: AVCaptureSession!
    var scanButton: UIButton!
    var supportedCodeTypes = [String]()
    
    open func open(_ formGUID: String, success: String, error: String, quality: Int, options: String) {
        self.success = success
        self.error = error
        self.quality = CGFloat(quality)/100
        self.formGUID = formGUID
        
        if(options=="0" || options=="undefined" || options=="null"){
            
            
            let alert = UIAlertController(title: "Imagem", message: "Obter Imagem da:", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Galeria", style: .default) {_ in
                PHPhotoLibrary.requestAuthorization{permission in
                    if permission == .authorized {
                        guard UIImagePickerController.isSourceTypeAvailable(.photoLibrary) else { return }
                        self.picker.sourceType = .photoLibrary
                        self.picker.delegate = self
                        DispatchQueue.main.async { Singleton.shared.present(self.picker, animated: true) }
                    }
                }
            })
            alert.addAction(UIAlertAction(title: "Camera", style: .default) {_ in
                guard UIImagePickerController.isSourceTypeAvailable(.camera) else { return }
                self.picker.sourceType = .camera
                
                self.picker.cameraCaptureMode = .photo
                self.picker.mediaTypes = UIImagePickerController.availableMediaTypes(for:.camera)!
                self.picker.delegate = self
                DispatchQueue.main.async { Singleton.shared.present(self.picker, animated: true) }
            })
            DispatchQueue.main.async { Singleton.shared.present(alert, animated: true, completion: nil) }
            
            
        }else if(options=="1"){
            
            guard UIImagePickerController.isSourceTypeAvailable(.camera) else { return }
            self.picker.sourceType = .camera
            self.picker.cameraCaptureMode = .photo
            self.picker.mediaTypes = UIImagePickerController.availableMediaTypes(for:.camera)!
            self.picker.delegate = self
            DispatchQueue.main.async { Singleton.shared.present(self.picker, animated: true) }
        } else if(options=="2"){
            
            PHPhotoLibrary.requestAuthorization{permission in
                if permission == .authorized {
                    guard UIImagePickerController.isSourceTypeAvailable(.photoLibrary) else { return }
                    self.picker.sourceType = .photoLibrary
                    self.picker.delegate = self
                    DispatchQueue.main.async { Singleton.shared.present(self.picker, animated: true) }
                }
            }
            
        }
    }
    
    open func scanCard(_ form: String, success: String, params: [Any], error: String, paramsError: [Any]) {
        self.formGUID = form
        self.success = success
        self.successArgs = params
        self.error = error
        self.errorArgs = paramsError
        CardIOUtilities.preload()
        
        if let cardIOVC = CardIOPaymentViewController(paymentDelegate: self) {
            cardIOVC.collectCardholderName = true
            cardIOVC.hideCardIOLogo = true
            cardIOVC.collectCVV = true
            cardIOVC.restrictPostalCodeToNumericOnly = true
            DispatchQueue.main.async { Singleton.shared.present(cardIOVC, animated: true, completion: nil) }
        }
    }
    
    open func scanCode(_ form: String, success: String, params: [Any], error: String, paramsError: [Any]) {
        self.formGUID = form
        self.success = success
        self.successArgs = params
        self.error = error
        self.errorArgs = paramsError
        
        //scanType = .qrcode
        UIDevice.current.setValue(UIDeviceOrientation.portrait.rawValue, forKey: "orientation")
        supportedCodeTypes = [AVMetadataObjectTypeQRCode,
                              AVMetadataObjectTypeUPCECode,
                              AVMetadataObjectTypeCode39Code,
                              AVMetadataObjectTypeCode39Mod43Code,
                              AVMetadataObjectTypeCode93Code,
                              AVMetadataObjectTypeCode128Code,
                              AVMetadataObjectTypeEAN8Code,
                              AVMetadataObjectTypeEAN13Code,
                              AVMetadataObjectTypeAztecCode,
                              AVMetadataObjectTypePDF417Code,
                              AVMetadataObjectTypeInterleaved2of5Code]
        DispatchQueue.main.async { self.openScanner() }
    }
    
    open func qrCodeGenerate(_ txt: String) -> String {
        let data = txt.data(using: .ascii, allowLossyConversion: false)
        let filter = CIFilter(name: "CIQRCodeGenerator" )
        
        filter?.setValue(data, forKey: "inputMessage")
        filter?.setValue("L", forKey: "inputCorrectionLevel")
        
        let qrcodeCIImage = filter?.outputImage!
        
        let cgImage = CIContext(options:nil).createCGImage(qrcodeCIImage!, from: (qrcodeCIImage?.extent)!)
        
        UIGraphicsBeginImageContext(CGSize(width: 2000 * UIScreen.main.scale, height: 2000 * UIScreen.main.scale))
        let context = UIGraphicsGetCurrentContext()
        context!.interpolationQuality = .none
        
        context?.draw(cgImage!, in: CGRect(x: 0.0,y: 0.0,width: context!.boundingBoxOfClipPath.width,height: context!.boundingBoxOfClipPath.height))
        
        let preImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        let qrCodeImage = UIImage(cgImage: (preImage?.cgImage!)!, scale: 1.0/UIScreen.main.scale, orientation: .downMirrored)
        if let data = UIImageJPEGRepresentation(qrCodeImage, 0.8) {
            let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
            let filename = paths[0].appendingPathComponent("code_\(NSDate().timeIntervalSince1970 * 1000).png")
            try? data.write(to: filename)
            return filename.absoluteString
        }
        return ""
    }
    
    fileprivate func openScanner() {
        scanSession = AVCaptureSession()
        let device = AVCaptureDevice.defaultDevice(withMediaType: AVMediaTypeVideo)
        do {
            try scanSession.addInput(AVCaptureDeviceInput(device: device))
            scanSession.sessionPreset = AVCaptureSessionPresetHigh
            let captureMetadataOutput = AVCaptureMetadataOutput()
            scanSession.addOutput(captureMetadataOutput)
            captureMetadataOutput.setMetadataObjectsDelegate(self, queue: .main)
            captureMetadataOutput.metadataObjectTypes = supportedCodeTypes
            scanLayer = AVCaptureVideoPreviewLayer(session: scanSession)
            Singleton.shared.view.layer.addSublayer(scanLayer)
            scanLayer.frame = Singleton.shared.view.layer.bounds
            scanLayer.videoGravity = AVLayerVideoGravityResizeAspectFill
            scanLayer.connection.videoOrientation = .portrait

            scanline = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 2))
            scanline.center = Singleton.shared.view.center
            scanline.backgroundColor = .red
            Singleton.shared.view.addSubview(scanline)
 
            scansquare = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
            scansquare.center = Singleton.shared.view.center
            scansquare.layer.borderColor = UIColor.green.cgColor
            scansquare.layer.borderWidth = 2
            

            Singleton.shared.view.addSubview(scansquare)
            Singleton.shared.view.bringSubview(toFront: scansquare)
            
            scanButton = UIButton(type: .roundedRect)
            scanButton.frame = CGRect(x: Singleton.shared.view.frame.width-60, y: 20, width: 40, height: 40)
            scanButton.setTitle("X", for: .normal)
            scanButton.layer.cornerRadius = 20
            scanButton.layer.borderWidth = 1
            scanButton.layer.borderColor = UIColor.white.cgColor
            scanButton.backgroundColor = .black
            scanButton.alpha = 0.5
            scanButton.tintColor = .white
            scanButton.becomeFirstResponder()
            scanButton.addTarget(self, action: #selector(dismissScanner), for: .touchUpInside)
            UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification,  scanButton)
            Singleton.shared.view.addSubview(scanButton)
            
            scanSession.startRunning()
        } catch {
            print(error)
            return
        }
    }
    
    @objc fileprivate func dismissScanner(_ isCancel: Bool = true) {
        scanSession.stopRunning()
        UIDevice.current.setValue(UIDeviceOrientation.portrait.rawValue, forKey: "orientation")
        scansquare.removeFromSuperview()
        scanline.removeFromSuperview()
        scanButton.removeFromSuperview()
        scanLayer.removeFromSuperlayer()
    }
}

// MARK: UIImagePickerControllerDelegate, UINavigationControllerDelegate

extension CameraUtils: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    public func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        defer { picker.dismiss(animated: true) }
        guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            Singleton.shared.executeJS("\(error)(\"\")")
            return
        }
        let name = "MakerMobile_\(NSDate().timeIntervalSince1970 * 1000).jpg"
        let dir = FileUtils.dataDir
        let photoURL = NSURL(fileURLWithPath: dir)
        guard let localPath = photoURL.appendingPathComponent(name) else {
            Singleton.shared.executeJS("\(error)(\"\")")
            return
        }
        
        if !FileManager.default.fileExists(atPath: localPath.path) {
            if let imageRef = UIImageJPEGRepresentation(image, self.quality), let _ = try? imageRef.write(to: localPath) {
                print("image size: \((UIImageJPEGRepresentation(image, self.quality)?.count)!)")
                let path = localPath.absoluteString.replacingOccurrences(of: "file://", with: "")
                Singleton.shared.executeJS("CameraImage(\"\(success),\(error),\(formGUID),\(path)\");")
            } else {
                Singleton.shared.executeJS("\(error)(\"\")")
            }
        } else {
            let path = localPath.absoluteString.replacingOccurrences(of: "file://", with: "")
            Singleton.shared.executeJS("CameraImage(\"\(success),\(error),\(formGUID),\(path)\");")
        }
    }
    
    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        defer { picker.dismiss(animated: true) }
        Singleton.shared.executeJS("\(error)(\"\")")
    }
}

// MARK: AVCaptureMetadataOutputObjectsDelegate

extension CameraUtils: AVCaptureMetadataOutputObjectsDelegate {
    public func captureOutput(_ captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [Any]!, from connection: AVCaptureConnection!) {
        if let metadataObject = metadataObjects[0] as? AVMetadataMachineReadableCodeObject,
            supportedCodeTypes.contains(metadataObject.type),
            let code = metadataObject.stringValue {
            var args = [String]()
            args.append(code)
            Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: args)
        } else {
            var args = [String]()
            args.append("{}")
            args.append(self.errorArgs[1] as! String)
            Singleton.shared.ansycCallback(formGUID, funName: error, funArgs: args)
        }
        dismissScanner(false)
    }
}

// MARK: CardIOPaymentViewControllerDelegate

extension CameraUtils: CardIOPaymentViewControllerDelegate {
    public func userDidProvide(_ cardInfo: CardIOCreditCardInfo!, in paymentViewController: CardIOPaymentViewController!) {
        var json = [String: Any]()
        var array = [Any]()
        json["number"] = cardInfo.cardNumber
        json["numberMask"] = cardInfo.redactedCardNumber
        json["expiryDate"] = "\(cardInfo.expiryMonth)" + "/" + "\(cardInfo.expiryYear)"
        json["name"] = cardInfo.cardholderName
        json["cvv"] = cardInfo.cvv
        array.append(json)
        Singleton.shared.ansycCallback(formGUID, funName: success, funArgs: array)
        paymentViewController.dismiss(animated: true, completion: nil)
    }
    
    public func userDidCancel(_ paymentViewController: CardIOPaymentViewController!) {
        var args = [String]()
        args.append("{}")
        //args.append(self.errorArgs[1] as! String)
        Singleton.shared.ansycCallback(formGUID, funName: error, funArgs: args)
        paymentViewController.dismiss(animated: true, completion: nil)
    }
}
