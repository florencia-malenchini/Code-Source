//
//  DatabaseUtils.swift
//  MakerMobile
//
//  Created by Rafael Laurine Meira on 02/08/17.
//  Copyright © 2017 SoftwellSolutions. All rights reserved.
//

import UIKit

let SQLITE_STATIC = unsafeBitCast(0, to: sqlite3_destructor_type.self)
let SQLITE_TRANSIENT = unsafeBitCast(-1, to: sqlite3_destructor_type.self)
let MAX_OPEN_CURSORS = 1000

struct openCursor {
    var active = false
    var eof = false
    var stmt: OpaquePointer?
}

open class DatabaseUtils: NSObject {
    static var singleConnection: OpaquePointer?
    static var openCursors = [openCursor](repeating: openCursor(), count: MAX_OPEN_CURSORS)
    
    open static func openOrCreateDatabase(_ name: String) -> String {
        var db: OpaquePointer?
        let dir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        let path = (dir as NSString).appendingPathComponent("\(name).dbMaker")
        return (sqlite3_open(path, &db) == SQLITE_OK) ? register(db!) : "-1"
    }
    
    open static func register(_ ref: OpaquePointer) -> String {
        DatabaseUtils.singleConnection = ref
        return "0"
    }
    
    open static func retrieveDatabase(_ index: Int) -> OpaquePointer? {
        return DatabaseUtils.singleConnection
    }
    
    open static func update(_ sql: String, with params: [Any?], on index: Int) -> String {
        let ppStmt = prepare(sql, with: params, on: index)
        let result = sqlite3_step(ppStmt)
        sqlite3_finalize(ppStmt)
        return "\(Int(result))"
    }
    
    open static func query(_ sql: String, with params: [Any?], on index: Int) -> Int {
        let ppStmt = prepare(sql, with: params, on: index)
        let slotIndex = getFreeCursorSlot()
        
        DatabaseUtils.openCursors[slotIndex].stmt = ppStmt
        DatabaseUtils.openCursors[slotIndex].active = true
        DatabaseUtils.openCursors[slotIndex].eof = false
        
        return slotIndex
    }
    
    open static func field(_ fieldName: String, type: String, from index: Int) -> Any {
        let stmt = openCursors[index].stmt
        let fieldIndex = Int32(indexField(fieldName, stmt: stmt!))
        let colType = sqlite3_column_type(stmt, fieldIndex)
        
        switch colType {
        case SQLITE_INTEGER:
            return Int(sqlite3_column_int64(stmt, fieldIndex))
        case SQLITE_FLOAT:
            return sqlite3_column_double(stmt, fieldIndex)
        case SQLITE_TEXT:
            return String(cString: sqlite3_column_text(stmt, fieldIndex))
        case SQLITE_BLOB:
            let count = sqlite3_column_bytes(stmt, fieldIndex)
            let bytes = sqlite3_column_blob(stmt, fieldIndex)
            let data = NSData(bytes: bytes, length: Int(count))
            return (data as Data).base64EncodedString()
        default:
            return ""
        }
    }
    
    open static func next(_ index: Int) -> String {
        let cursor = openCursors[index]
        let eof = sqlite3_step(cursor.stmt!) != SQLITE_ROW
        
        var rowData = [String: Any]()
        var metadata = [String]()
        
        if (!eof) {
            let columnsCount = sqlite3_column_count(cursor.stmt!)
            for i in 0..<columnsCount {
                let fieldName = sqlite3_column_name(cursor.stmt!, i)
                let colName = String(cString: fieldName!)
                let colValue = field(colName, type: "string", from: index)
                rowData[colName] = colValue
                metadata.append(colName)
            }
        }
        openCursors[index].eof = eof
        rowData["__metadata"] = metadata
        rowData["__EoF"] = eof ? "true" : ""
        
        if let data = try? JSONSerialization.data(withJSONObject: rowData, options: []),
            let jsonstring = String(data: data, encoding: .utf8) {
            return jsonstring
        }
        return ""
    }
    
    open static func columnCount(_ index: Int) -> String  {
        let cursor = openCursors[index]
        let count = Int(sqlite3_column_count(cursor.stmt!))
        return "\(count)"
    }
    
    open static func previous(_ index: Int) {
        //TODO
    }
    
    open static func last(_ index: Int) {
        //TODO
    }
    
    open static func first(_ index: Int) {
        //TODO
    }
    
    open static func close(_ index: Int) {
        let stmt = openCursors[index].stmt!
        sqlite3_finalize(stmt)
        openCursors[index].active = false
    }
    
    open static func hasData(_ index: Int) -> String {
        return "\(!openCursors[index].eof)"
    }
    
    // PRIVATE FUNCTIONS
    
    fileprivate static func prepare(_ sql: String, with params: [Any?], on index: Int) -> OpaquePointer? {
        var stmt: OpaquePointer?
        guard let database = retrieveDatabase(index) else {
            var array = [String]()
            array.append("Não existe base de dados para o index informado.")
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: "handleException", funArgs: array)
            return nil
        }
        if sqlite3_prepare_v2(database, sql, -1, &stmt, nil) != SQLITE_OK {
            var array = [String]()
            array.append("Falha ao preparar o SQL")
            array.append(sql)
            Singleton.shared.ansycCallback("{00000000-0000-0000-0000-000000000000}", funName: "handleException", funArgs: array)
        }
        
        for i in 0..<params.count {
            let column = Int32(i+1)
            switch params[i] {
            case let value as String:
                sqlite3_bind_text(stmt, column, value, -1, SQLITE_TRANSIENT)
            case let value as Int64:
                sqlite3_bind_int64(stmt, column, value)
            case let value as Int:
                sqlite3_bind_int64(stmt, column, Int64(value))
            case let value as Int32:
                sqlite3_bind_int(stmt, column, value)
            case let value as Double:
                sqlite3_bind_double(stmt, column, value)
            case let value as Bool:
                sqlite3_bind_int(stmt, column, value ? 1 : 0)
            case let value as NSData:
                sqlite3_bind_blob(stmt, column, value.bytes, -1, SQLITE_TRANSIENT)
            case let value as NSDate:
                sqlite3_bind_double(stmt, column, value.timeIntervalSince1970)
            case nil:
                sqlite3_bind_null(stmt, column)
            default:
                sqlite3_bind_null(stmt, column)
            }
        }
        return stmt
    }
    
    fileprivate static func indexField(_ name: String, stmt: OpaquePointer) -> Int {
        for i in 0..<sqlite3_column_count(stmt) {
            let sql = sqlite3_column_name(stmt, i)
            if strcmp(sql, name) == 0 {
                return Int(i)
            }
        }
        return -1
    }
    
    fileprivate static func getFreeCursorSlot() -> Int {
        for i in 0..<MAX_OPEN_CURSORS {
            if !DatabaseUtils.openCursors[i].active {
                return i
            }
        }
        return -1
    }
}
