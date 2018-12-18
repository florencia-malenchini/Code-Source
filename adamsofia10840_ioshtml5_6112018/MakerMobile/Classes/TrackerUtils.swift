//
//  TrackerUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 29/06/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit

open class TrackerUtils: NSObject {
    open static func setAnalyticsID(_ id: String) {
        guard let gai = GAI.sharedInstance() else {
            assert(false, "Google Analytics not configured correctly")
            return
        }
        gai.tracker(withTrackingId: id)
        gai.trackUncaughtExceptions = true
    }
    
    open static func sendView(_ name: String) {
        guard let tracker = GAI.sharedInstance().defaultTracker else { return }
        tracker.set(kGAIScreenName, value: name)
        guard let builder = GAIDictionaryBuilder.createScreenView() else { return }
        tracker.send(builder.build() as [NSObject : AnyObject])
    }
    
    open static func sendEvent(_ name: String, rule: String, component: String) {
        guard let tracker = GAI.sharedInstance().defaultTracker else { return }
        guard let event = GAIDictionaryBuilder.createEvent(withCategory: name, action: rule, label: component, value: nil) else { return }
        tracker.send(event.build() as [NSObject : AnyObject])
    }
    
    open static func sendException(_ exception: String) {
        guard let tracker = GAI.sharedInstance().defaultTracker else { return }
        guard let event = GAIDictionaryBuilder.createException(withDescription: exception, withFatal: 1) else { return }
        tracker.send(event.build() as [NSObject : AnyObject])
    }
}
