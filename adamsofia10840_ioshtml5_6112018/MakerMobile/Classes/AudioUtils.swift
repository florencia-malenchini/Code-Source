//
//  AudioUtils.swift
//  MakerMobile
//
//  Created by Imac on 22/03/18.
//  Copyright © 2018 SoftwellSolutions. All rights reserved.
//

import Foundation
import AVFoundation
import Speech
import SwiftyWave

open class AudioUtils: NSObject, AVAudioPlayerDelegate, AVAudioRecorderDelegate {
    
    open var formGUID = ""
    open var success = ""
    open var successArgs = [Any]()
    open var error = ""
    open var errorArgs = [Any]()
    open var speech = ""
    
    //Record Audio
    var audioRecorder: AVAudioRecorder?
    var audioFormat: String = ""
    var soundfileURL = "audioFile"
    var audioSession = AVAudioSession.sharedInstance()
    
    //Speech Recognizer
    var audioEngine = AVAudioEngine()
    var speechRecognizer: SFSpeechRecognizer? = SFSpeechRecognizer(locale: Locale.init(identifier: "pt-BR"))
    var request = SFSpeechAudioBufferRecognitionRequest()
    var recognitionTask: SFSpeechRecognitionTask?
    var waveView: SwiftyWaveView!
    var square: UIView!
    
    open func getAudioFileUrl() -> URL{
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        let docsDirect = paths[0]
        let audioUrl = docsDirect.appendingPathComponent(soundfileURL)
        return audioUrl
    }
    
    open func recordClick(_ format: String) -> String {
        var isRecording = "0"
        audioFormat = format
        switch AVAudioSession.sharedInstance().recordPermission() {
        case AVAudioSessionRecordPermission.granted:
            print("Permission granted")
            isRecording = self.startRecord()
        case AVAudioSessionRecordPermission.denied:
            print("Pemission denied")
        case AVAudioSessionRecordPermission.undetermined:
            AVAudioSession.sharedInstance().requestRecordPermission({ (allowed) in
                if allowed {
                    isRecording = self.startRecord()
                }
            })
        default:
            break
        }
        return isRecording
        
    }
    
    func startRecord() -> String {
        self.setupAudioSettings()
        do {
            try audioSession.setCategory(AVAudioSessionCategoryPlayAndRecord, with: AVAudioSessionCategoryOptions.defaultToSpeaker)
            try audioSession.setActive(true)
        } catch let error as NSError {
            print("audioSession error: \(error.localizedDescription)")
        }
        if audioRecorder?.isRecording == false {
            audioRecorder?.record()
            return "1"
        }
        return "0"
    }
    
    func setupAudioSettings() {
        do {
            try audioSession.setCategory(
                AVAudioSessionCategoryPlayAndRecord)
        } catch let error as NSError {
            print("audioSession error: \(error.localizedDescription)")
        }
        
        var recordSettings = [AVFormatIDKey : kAudioFormatMPEG4AAC,
                              AVEncoderAudioQualityKey : AVAudioQuality.max.rawValue,
                              AVEncoderBitRateKey : 320000,
                              AVNumberOfChannelsKey : 2,
                              AVSampleRateKey : 44100.0 ] as [String : Any]
        switch audioFormat {
        case  "mp4":
            audioFormat = "m4a"
            recordSettings.updateValue(kAudioFormatAppleLossless, forKey: AVFormatIDKey)
        case "aac":
            audioFormat = "aac"
            recordSettings.updateValue(kAudioFormatMPEG4AAC, forKey: AVFormatIDKey)
        case "0", "mp3":
            audioFormat = "mp4"
        default:
            audioFormat = "mp4"
        }
        soundfileURL += "\(NSDate().timeIntervalSince1970 * 1000).\(audioFormat)"
        do {
            try audioRecorder = AVAudioRecorder(url: getAudioFileUrl(),
                                                settings: recordSettings as [String : AnyObject])
            print(getAudioFileUrl())
            DispatchQueue.main.async { self.audioRecorder?.prepareToRecord()}
        } catch let error as NSError {
            print("audioSession error: \(error.localizedDescription)")
        }
    }
    
    func stopClick() -> String {
        if audioRecorder?.isRecording == true {
            audioRecorder?.stop()
        }
        
        return (audioRecorder?.url.absoluteString)!
    }
}

extension AudioUtils: SFSpeechRecognizerDelegate {
    
    func recordAndRecognizeSpeech(formGUID: String, success: String, successArgs: [Any], error: String, errorArgs: [Any]) {
        
        self.formGUID = formGUID
        self.success = success
        self.successArgs = successArgs
        self.error = error
        self.errorArgs = errorArgs
        
        speech = ""
        audioEngine = AVAudioEngine()
        request = SFSpeechAudioBufferRecognitionRequest()
        //audioEngine.inputNode?.removeTap(onBus: 0)
        guard let node = audioEngine.inputNode else { return }
        let recordingFormat = node.outputFormat(forBus: 0)
        node.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer , _ in
            self.request.append(buffer)
        }
        audioEngine.prepare()
        do {
            try audioEngine.start()
        } catch {
            if self.errorArgs.count == 0 {
                self.errorArgs.insert("There has been an audio engine error.", at: 0)
            } else {
                self.errorArgs[0] = "There has been an audio engine error."
            }
            DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs)}
            return print(error)
        }
        guard let myRecognizer = SFSpeechRecognizer() else {
            if self.errorArgs.count == 0 {
                self.errorArgs.insert("Speech recognition is not supported for your current locale.", at: 0)
            } else {
                self.errorArgs[0] = "Speech recognition is not supported for your current locale."
            }
            DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs)}
            return
        }
        if !myRecognizer.isAvailable {
            if self.errorArgs.count == 0 {
                self.errorArgs.insert("Speech recognition is not currently available. Check back at a later time.", at: 0)
            } else {
                self.errorArgs[0] = "Speech recognition is not currently available. Check back at a later time."
            }
            DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs)}
            return
        }
      
        DispatchQueue.main.async {
            self.square = UIView()
            self.square.center = CGPoint(x: Singleton.shared.view.center.x, y:  Singleton.shared.view.center.y+Singleton.shared.view.center.y/1.3)
            self.square.bounds.size = CGSize(width: Singleton.shared.view.frame.width, height: Singleton.shared.view.frame.height/3.5)
            self.square.backgroundColor = UIColor.darkGray
            self.waveView = SwiftyWaveView(frame: CGRect(x: 0, y: Singleton.shared.view.center.y+Singleton.shared.view.center.y/2, width: Singleton.shared.view.frame.width, height: Singleton.shared.view.frame.height/3.5))
            
            Singleton.shared.view.addSubview(self.square)
            Singleton.shared.view.bringSubview(toFront: self.square)
            Singleton.shared.view.addSubview(self.waveView)
            self.waveView.start()
        }
        
        var timer = Timer.scheduledTimer(timeInterval: 2, target: self, selector: #selector(AudioUtils.didFinishTalk), userInfo: nil, repeats: false)
        
        recognitionTask = speechRecognizer?.recognitionTask(with: request, resultHandler: { (result, error) in
            if result != nil { // check to see if result is empty (i.e. no speech found)
                if let result = result {
                    let bestString = result.bestTranscription.formattedString
                    self.speech = bestString
                    print("speech: " + self.speech)
                    timer.invalidate()
                    timer = Timer.scheduledTimer(timeInterval: 1.5, target: self, selector: #selector(AudioUtils.didFinishTalk), userInfo: nil, repeats: false)
                } else if let error = error {
                    print(error)
                    self.errorArgs.append(error.localizedDescription)
                    DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.error, funArgs: self.errorArgs)}
                }
            }
            
        })
    }
    
    func didFinishTalk() {
        audioEngine.stop()
        //     if let node = audioEngine.inputNode {
        audioEngine.inputNode?.removeTap(onBus: 0)
        //      }
        recognitionTask?.cancel()
        DispatchQueue.main.async {
            self.waveView.stop()
            self.waveView.removeFromSuperview()
            self.square.removeFromSuperview()
        }
        successArgs.append(self.speech)
        DispatchQueue.main.async { Singleton.shared.ansycCallback(self.formGUID, funName: self.success, funArgs: self.successArgs) }
    }
    
    func requestSpeechAuthorization() -> Bool {
        var result = Bool()
        SFSpeechRecognizer.requestAuthorization { authStatus in OperationQueue.main.addOperation {
            switch authStatus {
            case .authorized:
                result =  true
            case .denied:
                result = false
            case .restricted:
                result = false
            case .notDetermined:
                result = false
            }
            }
        }
        return result
    }
}

