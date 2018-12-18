//
//  Extension.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 22/09/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit

extension String {
    public func toJson() -> [String: Any] {
        if let data = self.data(using: .utf8) {
            do {
                let json = try JSONSerialization.jsonObject(with: data, options: [])
                if let dict = json as? [String: Any] {
                    return dict
                }
            } catch {
                print(error.localizedDescription)
            }
        }
        return [String: Any]()
    }
}

extension UIImage {
    public func resizeImage(_ newWidth: CGFloat, _ newHeight: CGFloat) -> UIImage {
        UIGraphicsBeginImageContext(CGSize(width: newWidth, height: newHeight))
        self.draw(in: CGRect(x: 0, y: 0,width: newWidth, height: newHeight))
        if let image = UIGraphicsGetImageFromCurrentImageContext() {
            UIGraphicsEndImageContext()
            return image
        }
        return self
    }
}


extension Double {
    func rounded(toPlaces places:Int) -> Double {
        let divisor = pow(10.0, Double(places))
        return (self * divisor).rounded() / divisor
    }
}
