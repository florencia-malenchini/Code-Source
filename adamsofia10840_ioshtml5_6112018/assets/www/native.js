GROUPING_POINT = '.';
var DECIMAL_POINT = ',';
var IE = false;
var ENCODING = 'ISO-8859-1';
var Bridge;


Date.prototype.compareTo = function(value) {
   if (!(value instanceof Date)) {
      throw RuleException($mainform().getLocaleMessage("ERROR.IMCOMPATIBLE_TYPE"));
   }

   var compare;

   if (this.valueOf() > value.valueOf()) {
       compare = 1;
   } else if (this.valueOf() < value.valueOf()) {
       compare = -1;
   } else {
       compare = 0;
   }

   return compare;
}

Time.prototype.compareTo = function(value) {
  if (!value instanceof Time) {
     throw RuleException($mainform().getLocaleMessage("ERROR.IMCOMPATIBLE_TYPE"));
  }

  var compare;
  var actualTime = new Time(this.getHour(), this.getMinute(), this.getSecond(), this.getMillisecond());
  var compareTime = new Time(value.getHour(), value.getMinute(), value.getSecond(), value.getMillisecond());

  if (actualTime.getDate().valueOf() > compareTime.getDate().valueOf()) {
    compare = 1;
  } else if (actualTime.getDate().valueOf() < compareTime.getDate().valueOf()) {
    compare = -1;
  } else {
    compare = 0;
  }

  return compare;
}

if(top.platform == "ioshtml5"){
  //Sobrescreve o alerta do Windows para remover o ".html" do título
  window.alert = function(message) {top.getUtils().showAlert(" ",message);};
  top.alert = function(message) {top.getUtils().showAlert(" ",message);};
  window.Tracking = function () { top.getTracking();};
}

var EMPTY_MAP = new MakerMap();

function checkError(erro) {

  if(erro!=undefined)
  {
    var msg=erro+"";

    if( msg.indexOf("foreign key constraint") >= 0) {
      msg = "Erro ao tentar excluir o registro. Verifique se o registro possui dependências";
      throw msg;
    }
  }

  else if (window._runner_LastException) {

    var msg = window._runner_LastException.toString();
    if ( msg.indexOf("error code 19: constraint failed") >= 0 ||  erro.indexOf("error code 19: constraint failed") >= 0) {
      msg = "Erro ao tentar Incluir novo registro. Verifique se o registro não é duplicado.";
    }
    if ( msg.indexOf("foreign key constraint") >= 0 ||  erro.indexOf("error code 19: constraint failed") >= 0) {
      msg = "Erro ao tentar excluir o registro. Verifique se o registro não possui dependências.";
    }
    throw msg;
  }
};

function IsNumeric(input) {
  var x = ((input - 0) == input) && (input.length > 0 || input.length == undefined);
  return x;
}


var AudioUtils = function(){ };

AudioUtils.prototype.startRecord = function(format) {
 return Bridge.exec('AudioUtils', 'startRecord', parseJSON([format]));
}

AudioUtils.prototype.stopRecord = function() {
 return Bridge.exec('AudioUtils', 'stopRecord', parseJSON([]));
}

AudioUtils.prototype.startVoiceCapture = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams) {
  return Bridge.exec('AudioUtils', 'startVoiceCapture', parseJSON([formGUID, onSuccess, onSuccessParams? onSuccessParams : new Array(), onFail, onFailParams? onFailParams : new Array()]));
};

function getAudioUtils() {
  return new AudioUtils();
}


var A920Utils = function() { };

A920Utils.prototype.toggleLight = function() {
  Bridge.exec('A920Utils', 'toggleLight', parseJSON([]));
}

A920Utils.prototype.printText = function(text) {
  Bridge.exec('A920Utils', 'printText', parseJSON([text]));
}

A920Utils.prototype.printQrCode = function(dir) {
  Bridge.exec('A920Utils', 'printQrCode', parseJSON([dir]));
}

A920Utils.prototype.readIcc = function(onSuccess, onSuccessParams, onError, onErrorParams,formGUID) {
  Bridge.exec('A920Utils', 'readIcc', parseJSON([formGUID, onSuccess, onSuccessParams, onError, onErrorParams]));
}

A920Utils.prototype.readMag = function(onSuccess, onSuccessParams, onError, onErrorParams, formGUID) {
  Bridge.exec('A920Utils', 'readMag', parseJSON([formGUID, onSuccess, onSuccessParams, onError, onErrorParams]));
}

var Cursor = function(cursor) {
  this.cursor = cursor;
  this.row = new Object();
};

Cursor.prototype.handleSuccess = function() {
}

Cursor.prototype.handleError = function(e) {
  // alert(e);
}

Cursor.prototype.next = function() {
  row = Bridge.exec('Database', 'next', parseJSON([this.cursor.toString()]));
  if (row) {
    this.row = MakerMap.prototype.getInstance(JSON.parse(row));
  } else {
    this.row = EMPTY_MAP;
  }
}

Cursor.prototype.field = function(name, type) {
  if (this.row) {
    if (typeof name == 'string') {
      return this.row.get(name.toUpperCase());
    } else {
      return this.row.get(this.row.get('_metadata')[parseInt(name)-1]);
    }
  } else {
    return null;
  }
}

Cursor.prototype.previous = function() {
  Bridge.exec('Database', 'previous', parseJSON([this.cursor.toString()]));
}

Cursor.prototype.last = function() {
  Bridge.exec('Database', 'last', parseJSON([this.cursor.toString()]));
}

Cursor.prototype.first = function() {
  Bridge.exec('Database', 'first', parseJSON([this.cursor.toString()]));
}

Cursor.prototype.close = function() {
  Bridge.exec('Database', 'close', parseJSON([this.cursor.toString()]));
}

Cursor.prototype.hasdata = function() {
  var result = Bridge.exec('Database', 'hasdata', parseJSON([this.cursor.toString()]));
  return result.toString() === "true";
}

Cursor.prototype.getColumnCount = function() {
  return Bridge.exec('Database', 'getColumnCount', parseJSON([this.cursor.toString()]));
}

var Database = function() {};

Database.prototype.fixParameters = function(p) {
  if (p != null) {
    for ( var i = 0; i < p.length; i++) {
      if (p[i] && ((p[i] instanceof Date) || (p[i].getTime))) {
        p[i] = p[i].getTime();
      };
    }
  }
  return p;
}

Database.prototype.openOrCreateDatabase = function(databaseName) {
  return Bridge.exec('Database', 'openOrCreateDatabase', parseJSON([databaseName]));
};

Database.prototype.execSQL = function(sql, bindParams) {
  var output = Bridge.exec('Database', 'execSQL', parseJSON([top.databaseInstance.toString(), sql, this.fixParameters(bindParams)]));
  return (output == "") ? null : output;
};

Database.prototype.rawQuery = function(sql, bindParams) {
  return new Cursor(Bridge.exec('Database', 'rawQuery',  parseJSON([top.databaseInstance.toString(), sql, this.fixParameters(bindParams)])));
};

Database.prototype.beginTransaction = function() {
  Bridge.exec('Database', 'beginTransaction', parseJSON([top.databaseInstance.toString()]));
};

Database.prototype.commitTransaction = function() {
  Bridge.exec('Database', 'commitTransaction', parseJSON([top.databaseInstance.toString()]));
};

Database.prototype.rollbackTransaction = function() {
  Bridge.exec('Database', 'rollbackTransaction', parseJSON([top.databaseInstance.toString()]));
};


var FirebaseDatabaseUtils = function() {};

FirebaseDatabaseUtils.prototype.connect = function() {
  Bridge.exec('FirebaseDatabaseUtils', 'connect', parseJSON([]));
}

FirebaseDatabaseUtils.prototype.onDisconnect = function(node, data) {
  Bridge.exec('FirebaseDatabaseUtils', 'onDisconnect', parseJSON([node, data]));
}

FirebaseDatabaseUtils.prototype.writeData = function(node, udid, data, async, onSuccess, onSuccessParams, errorRule, errorParams) {
  return Bridge.exec('FirebaseDatabaseUtils', 'writeData', parseJSON([node, udid, data,async ? async: false, onSuccess ? onSuccess : "", onSuccessParams ? onSuccessParams : new Array(), errorRule ? errorRule : "", errorParams ? errorParams : new Array() ]));
}

FirebaseDatabaseUtils.prototype.readData = function(formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData) {
  Bridge.exec('FirebaseDatabaseUtils', 'readData', parseJSON([formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData]));
}

FirebaseDatabaseUtils.prototype.monitoring = function(formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData) {
  Bridge.exec('FirebaseDatabaseUtils', 'monitoring', parseJSON([formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData]));
}

FirebaseDatabaseUtils.prototype.stopMonitoring = function(node) {
  Bridge.exec('FirebaseDatabaseUtils', 'stopMonitoring', parseJSON([node]));
}

function getFirebaseDatabaseUtils() {
  return new FirebaseDatabaseUtils();
}

var GeoFireUtils = function() {};

function getGeoFireUtils() {
  return new GeoFireUtils();
}

GeoFireUtils.prototype.setPosition = function(onSuccess, onSuccessParams, node, key, lat, lgt) {
  Bridge.exec("GeoFireUtils", "setPosition", parseJSON(["{00000000-0000-0000-0000-000000000001}",  onSuccess ? onSuccess : "", onSuccessParams ? onSuccessParams : new Array(), node, key, lat, lgt]));
};

GeoFireUtils.prototype.watch = function(onSuccess, onSuccessParams, node, lat, lgt, radius) {
    Bridge.exec("GeoFireUtils", "watch", parseJSON(["{00000000-0000-0000-0000-000000000001}", onSuccess ? onSuccess : "", onSuccessParams ? onSuccessParams : new Array(), node, lat, lgt, radius]));
};

GeoFireUtils.prototype.stopWatching = function() {
    Bridge.exec("GeoFireUtils", "stopWatching", parseJSON([]));
};


var NetworkUtils = function() { this.headers = new Object(); };


function getNetworkUtils() {
  return new NetworkUtils();
}

NetworkUtils.prototype.setRequestHeader = function (paramName, paramValue) {
  this.headers[paramName] = paramValue;
}

NetworkUtils.prototype.handleSuccess = function() {
  window._runner_LastException = false;
}

NetworkUtils.prototype.setRuleOnConnect = function(rule, ruleParams) {
 Bridge.exec('NetworkUtils', 'setRuleOnConnect', parseJSON([rule, ruleParams]));
}

NetworkUtils.prototype.setRuleOnDisconnect = function(rule, ruleParams) {
 Bridge.exec('NetworkUtils', 'setRuleOnDisconnect', parseJSON([rule, ruleParams]));
}

NetworkUtils.prototype.handleError = function(e) {
  var err = new Error(e);
  window._runner_LastException = err;
}

NetworkUtils.prototype.postData = function(url, reqType, data, files) {
    if (top.platform == "ioshtml5") {
      var postHeader = this.headers;
      this.headers = new Object();
      if (files) {
          return Bridge.exec('NetworkUtils', 'postFile', parseJSON([url, data, files]));
      } else {
          var code = parseInt(Math.random() * 99999).toString();
          return Bridge.exec('NetworkUtils', 'postData', parseJSON([url, reqType, this.headers, data, code]));
      }
    } else {
        return Bridge.exec('NetworkUtils', 'postData', parseJSON([url, reqType, this.headers, data, files]));
    }
};


NetworkUtils.prototype.postDataAsync = function(url, data, files, onSuccess, onSuccessParams, onError, onErrorParams, formGUID) {
  Bridge.exec('NetworkUtils', 'postFileAsync', parseJSON([url, data, files, formGUID, onSuccess, onSuccessParams? onSuccessParams : new Array(), onError, onErrorParams? onErrorParams : new Array()]));
	
};

NetworkUtils.prototype.checkInternetConnection = function(success, successParams, fail, failParams) {
  Bridge.exec('NetworkUtils', 'isOnline', parseJSON([success, successParams ? successParams:[], fail, failParams ? failParams : []]));
};

NetworkUtils.prototype.sendImageInBody = function(url, file) {
  return Bridge.exec('NetworkUtils', 'sendImageInBody', parseJSON([url, file]));
};

NetworkUtils.prototype.sendEmail = function(remetente,conteudo,assunto) {
  return Bridge.exec('NetworkUtils', 'sendEmail', parseJSON([conteudo,remetente,assunto]));
};

NetworkUtils.prototype.downloadStart = function(url,fileName) {
  return Bridge.exec('NetworkUtils', 'downloadStart', parseJSON([url,fileName]));
};

NetworkUtils.prototype.postFile = function(url, params, fileField, filePath) {
  return Bridge.exec('NetworkUtils', 'postFile', parseJSON([url, params, fileField, filePath]));

};

NetworkUtils.prototype.sendSoapMessage = function(urlVar, soapAction, content) {
  return Bridge.exec('NetworkUtils', 'sendSoapMessage', parseJSON([urlVar, soapAction, content, "UTF-8"]));

};


NetworkUtils.prototype.postDataHttps = function(url, postData, contentType) {
  return Bridge.exec('NetworkUtils', 'postDataHttps', parseJSON([url, postData, contentType]));
};


NetworkUtils.prototype.networkstatus = function() {
  return Bridge.exec('NetworkUtils', 'networkstatus', parseJSON([]));
};

var FunctionsUtils = function() { this.headers = new Object(); };

function getFunctionsUtils() {
  return new FunctionsUtils();
}

FunctionsUtils.prototype.setRequestHeader = function (paramName, paramValue) {
  this.headers[paramName] = paramValue;
}

FunctionsUtils.prototype.handleSuccess = function() {
  window._runner_LastException = false;
}

FunctionsUtils.prototype.handleError = function(e) {
  var err = new Error(e);
  window._runner_LastException = err;
}


FunctionsUtils.prototype.startKeyBoard = function(e) {
  return Bridge.exec('FunctionsUtils','startKeyBoard', parseJSON([]));
}

FunctionsUtils.prototype.closeKeyBoard = function(x,y) {
  return Bridge.exec('FunctionsUtils', 'closeKeyBoard', parseJSON([x,y]));
}

var FileUtils = function() {
};

FileUtils.prototype.handleSuccess = function() {
  // Success
}

FileUtils.prototype.handleError = function(e) {
  alert(e);
}

FileUtils.prototype.openView = function (url) {
  return Bridge.exec('App', 'openOtherApp', parseJSON([url]));
}

FileUtils.prototype.fileCopy = function(pathFile,newFile) {
  return Bridge.exec('FileUtils','fileCopy', parseJSON([pathFile,newFile]));
}

FileUtils.prototype.fileMoveTo = function(pathFile,newFile) {
  return Bridge.exec('FileUtils','fileMoveTo', parseJSON([pathFile,newFile]));
}

FileUtils.prototype.getExternalStorage = function(e) {
  return Bridge.exec('FileUtils','getExternalStorage', parseJSON([]));
}

FileUtils.prototype.fileOpenReadOnly = function(fileName) {
  return Bridge.exec('FileUtils','fileOpenReadOnly', parseJSON([ fileName ]));
}

FileUtils.prototype.fileOpenWrite = function(fileName, append) {
  return Bridge.exec('FileUtils','fileOpenWrite', parseJSON([ fileName, append ]));
}

FileUtils.prototype.fileReadAllBytes = function(fileRef) {
  return Bridge.exec('FileUtils','fileReadAllBytes', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileReadAllText = function(fileRef) {
  return Bridge.exec('FileUtils','fileReadAllText', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileReadLine = function(fileRef) {
  return Bridge.exec('FileUtils','fileReadLine', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileEoF = function(fileRef) {
  return Bridge.exec('FileUtils','fileEoF', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileAppend = function(fileRef, content) {
  return Bridge.exec('FileUtils','fileAppend', parseJSON([ fileRef, content ]));
};

FileUtils.prototype.fileReadLine = function(fileRef) {
  return Bridge.exec('FileUtils','fileReadLine', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileEoF = function(fileRef) {
  return Bridge.exec('FileUtils','fileEoF', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileClose = function(fileRef) {
  return Bridge.exec('FileUtils','fileClose', parseJSON([ fileRef ]));
};

FileUtils.prototype.fileDataDir = function() {
  return Bridge.exec('FileUtils', 'fileDataDir', parseJSON([]));
};

FileUtils.prototype.fileBase64ToBinary = function(content) {
  return Bridge.exec('FileUtils', 'Base64ToBinary', parseJSON([content]));
};

FileUtils.prototype.binaryToBase64 = function(content) {
  return Bridge.exec('FileUtils', 'binaryToBase64', parseJSON([content]));
};

FileUtils.prototype.fileRename = function(oldPath, newPath) {
  return Bridge.exec('FileUtils', 'fileRename', parseJSON([oldPath, newPath]));
};

FileUtils.prototype.showAlert = function(title, message) {
  Bridge.exec('Utils', 'showAlert', parseJSON([title,message]));
};

FileUtils.prototype.openfilechosser = function(Sucess,Fail,formGUID) {

  Bridge.exec('FileUtils', 'openfilechosser', parseJSON([Sucess,Fail,formGUID]));
};


FileUtils.prototype.confirmshow = function(orderOK, title, message, rule, args, formGUID) {
  Bridge.exec('FileUtils', 'confirmshow', parseJSON([orderOK,title, message, rule, args, formGUID]));
};

var PinpadUtils = function() {
};

function getPinpadUtils() {
  return new PinpadUtils();
}

PinpadUtils.prototype.handleSuccess = function() {
  window._runner_LastException = false;
}

PinpadUtils.prototype.handleError = function(e) {
  var err = new Error(e);
  window._runner_LastException = err;
}

PinpadUtils.prototype.connection = function(serverIP, serverPORT) {
  return Bridge.exec('PinpadUtils', 'connection', parseJSON([serverIP, serverPORT]));
};

PinpadUtils.prototype.verifyConnection = function() {
  return Bridge.exec('PinpadUtils', 'verifyConnection', parseJSON([]));
};

PinpadUtils.prototype.disConnect = function() {
  return Bridge.exec('PinpadUtils', 'disConnect', parseJSON([]));
};

PinpadUtils.prototype.sendMessage = function(message) {
  return Bridge.exec('PinpadUtils', 'sendMessage', parseJSON([message]));
};

PinpadUtils.prototype.awaitingResponse = function(onSuccess, onError) {
  return Bridge.exec('PinpadUtils', 'awaitingResponse',parseJSON([onSuccess, onError]));
};


var WirelessUtils = function() {
};

WirelessUtils.prototype.handleSuccess = function() {
  window._runner_LastException = false;
}

WirelessUtils.prototype.handleError = function(e) {
  var err = new Error(e);
  window._runner_LastException = err;
}



WirelessUtils.prototype.sendFile = function(fileName, mimeType) {
  return Bridge.exec('WirelessUtils', 'sendFile', parseJSON([fileName, mimeType]));
};

WirelessUtils.prototype.sendText = function(title, text) {
  return Bridge.exec('WirelessUtils', 'sendText', parseJSON([title, text]));
};

WirelessUtils.prototype.btExists = function() {
  return Bridge.exec('WirelessUtils', 'btExists', parseJSON([]));
};

WirelessUtils.prototype.btIsActive = function() {
  return Bridge.exec('WirelessUtils', 'btIsActive', parseJSON([]));
};

WirelessUtils.prototype.btActivate = function(force) {
  return Bridge.exec('WirelessUtils', 'btActivate', parseJSON([force]));
};

WirelessUtils.prototype.btDeactivate = function(force) {
  return Bridge.exec('WirelessUtils', 'btDeactivate', parseJSON([force]));
};

WirelessUtils.prototype.btMakeDiscoverable = function() {
  return Bridge.exec('WirelessUtils', 'btDiscoverable', parseJSON([]));
};

WirelessUtils.prototype.btGetPairedDevices = function() {
  return Bridge.exec('WirelessUtils', 'btPairedDevices', parseJSON([]));
};

WirelessUtils.prototype.btSetup = function() {
  return Bridge.exec('WirelessUtils', 'btSetup', parseJSON([]));
};

function getWirelessUtils() {
  return new WirelessUtils();
}

var BarcodeUtils = function() {
};

BarcodeUtils.prototype.handleSuccess = function() {
}

BarcodeUtils.prototype.handleError = function() {
}

BarcodeUtils.prototype.scan = function(onSuccess, onError, bTypes, formreference) {
  Bridge.exec('BarcodeUtils', 'scan', parseJSON([bTypes, onSuccess, onError, formreference]));
};

BarcodeUtils.prototype.generate = function(bTypes) {
 return Bridge.exec('BarcodeUtils', 'generate', parseJSON([bTypes]));
};

function getBarcodeUtils() {
  return new BarcodeUtils();
}

var CameraUtils = function() {
};

CameraUtils.prototype.handleSuccess = function() {
}

CameraUtils.prototype.handleError = function(e) {
  alert(e);
}

CameraUtils.prototype.open = function(sucess,fail,quality,form, options) {
  Bridge.exec('CameraUtils', 'open', parseJSON([sucess,fail,quality,form, options]));
};

CameraUtils.prototype.sendImage = function(obj, form) {
  Bridge.exec('CameraUtils', 'sendImage', parseJSON([obj.id, form]));
};

CameraUtils.prototype.scanCard = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams) {
  Bridge.exec('CameraUtils', 'scanCard', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams]));
};

CameraUtils.prototype.close = function() {
  Bridge.exec('CameraUtils', 'close', parseJSON([]));
};

function getCameraUtils() {
  return new CameraUtils();
}

var AppUtils = function() {
};

AppUtils.prototype.handleSuccess = function() {
}

AppUtils.prototype.handleError = function(e) {
  alert(e);
}

AppUtils.prototype.openMap = function(latitude, longitude) {
  document.location = 'geo:'+latitude+','+longitude+'?q=('+latitude+','+longitude+')';
};

AppUtils.prototype.openYouTube = function(code) {
  document.location = 'vnd.youtube://'+code;
};

function getAppUtils() {
  return new AppUtils();
}

var AuthUtils = function() {
};

AuthUtils.prototype.authSMS = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, phone) {
  Bridge.exec('AuthUtils', 'authSMS', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams, phone]));
};

AuthUtils.prototype.emailLogin = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, email, password) {
  Bridge.exec('AuthUtils', 'emailLogin', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams, email, password]));
};

AuthUtils.prototype.tokenLogin = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, token) {
  Bridge.exec('AuthUtils', 'tokenLogin', parseJSON([formGUID, onSuccess, onSuccessParams? onSuccessParams : new Array(), onFail, onFailParams? onFailParams :  new Array(), token]));
};


AuthUtils.prototype.isUserLoggedIn = function() {
  return Bridge.exec('AuthUtils', 'isUserLoggedIn', parseJSON([]));
};

AuthUtils.prototype.facebookLogin = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, facebookParams) {
  Bridge.exec('AuthUtils', 'facebookLogin', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams, facebookParams]));
};

AuthUtils.prototype.googleLogin = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams) {
  Bridge.exec('AuthUtils', 'googleLogin', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams]));
};

AuthUtils.prototype.onLogout = function() {
  Bridge.exec('AuthUtils', 'onLogout', parseJSON([]));
};

AuthUtils.prototype.passwordReset = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, email) {
  Bridge.exec('AuthUtils', 'passwordReset', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams, email]));
};

AuthUtils.prototype.emailVerification = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams) {
    Bridge.exec('AuthUtils', 'emailVerification', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams]));
};

function getAuthUtils() {
  return new AuthUtils();
};

function capturePhoto(onPhotoDataSuccess, onFail, qualityValue) {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {destinationType: Camera.DestinationType.FILE_URI, quality: 25, targetWidth: 800, targetHeight: 600 });
};

var LocationUtils = function(){};

LocationUtils.prototype.statusGPS = function() {
  return parseBoolean(Bridge.exec('LocationUtils', 'statusGPS', parseJSON([])));
};

LocationUtils.prototype.enableGPS = function() {
  return parseBoolean(Bridge.exec('LocationUtils', 'enableGPS', parseJSON([])));
};

LocationUtils.prototype.startLocationService = function(formGUID, successRule, succesParams, errorRule, errorParams) {
  return Bridge.exec('LocationUtils', 'startLocationService', parseJSON([formGUID, successRule, succesParams, errorRule, errorParams]));
};

LocationUtils.prototype.getCurrentLocation = function() {
  var json = Bridge.exec('LocationUtils', 'getCurrentLocation', parseJSON([]));
  if(typeof json == 'string'){
    return JSON.parse(json);
  }else{
    return json;
  }
};

LocationUtils.prototype.getGPSLastCoords = function() {
  return Bridge.exec('LocationUtils', 'getGPSLastCoords', parseJSON([]));
};

LocationUtils.prototype.startMonitoringGPS = function(formGUID, monitoringRule, monitoringParams, priority, interval, fastestInterval) {
  return Bridge.exec('LocationUtils', 'startMonitoringGPS', parseJSON([priority, interval, fastestInterval, formGUID, monitoringRule, monitoringParams]));
};

LocationUtils.prototype.disconnect = function() {
  return Bridge.exec('LocationUtils', 'disconnect', parseJSON([]));
};

function getPosition(formGUID, onPositionSuccess, onFail){
    Bridge.exec('LocationUtils', 'currentLocation', parseJSON([formGUID, onPositionSuccess, onFail]));
};

function onSuccessGPS(winTarget, onPositionSuccess, result) {
  list = result.split("|");
  var map = new MakerMap();
  if(!isNullOrEmpty(result)&& result != "-303"){
    map.add(list[0],list[1]);
    map.add(list[2],list[3]);
    map.add(list[4],list[5]);
    map.add(list[6],list[7]);
    map.add(list[8],list[9]);
    map.add(list[10],list[11]);
    map.add(list[12],list[13]);
    getWindow(winTarget).eval(onPositionSuccess).apply(this, [map]);
  }
};

function updateViews(e) {
  for (var i=0;i<views.length;i++) {
    var viewFrame = views[i].getElementsByTagName("iframe")[0];

    if (viewFrame.contentWindow.doResize) {
      viewFrame.contentWindow.doResize(e);
    }
  }
};

var supportsOrientationChange = "onorientationchange" in window;
var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
  if (Math.abs(window.orientation) == 90 && currentOrientation != 90) {
    currentOrientation = 90;
    updateViews();
  }

  if ((Math.abs(window.orientation) == 0 || Math.abs(window.orientation) == 180) && currentOrientation != 0) {
    currentOrientation = 0;
    updateViews();
  }

}, false);

function init(mainView) {
  if (window.innerWidth > window.innerHeight) {
    currentOrientation = 90;
  }
  openView(mainView);
}

var PushNotification = function() {
};

PushNotification.prototype.handleSuccess = function() {
};

PushNotification.prototype.handleError = function(e) {
  alert(e);
}

PushNotification.prototype.register = function(cod, appId, formGUID) {
    if (top.platform == "ioshtml5") {
        return Bridge.exec('PushPlugin', 'register', parseJSON([formGUID, cod, appId]));
    } else {
        return Bridge.exec('PushPlugin', 'register', parseJSON([cod, appId]));
    }
};

PushNotification.prototype.unregister = function(cod) {
  Bridge.exec('PushPlugin', 'unregister', parseJSON([cod]));
};

PushNotification.prototype.getPushId = function() {
  return Bridge.exec('PushPlugin', 'getPushId', parseJSON([]));
};

function getPushNotification() {
  return new PushNotification();
};

if(!window.plugins) {
  window.plugins = {};
}

var Utils = function() {
};

Utils.prototype.OpenUrlOnNewTab = function(winURL) {
    Bridge.exec('Utils', 'OpenUrlOnNewTab', top.parseJSON([winURL]));
};

Utils.prototype.returnNotification = function() {
   Bridge.exec('Utils', 'returnNotification', parseJSON([]));
};

Utils.prototype.createNotification = function(notificationRule, notificationParams, notificationTitle, notificationText, autocancel, ongoing, notificationID) {
  Bridge.exec('Utils', 'createNotification', parseJSON([notificationRule, notificationParams, notificationTitle, notificationText, autocancel, ongoing, notificationID]));
};

Utils.prototype.isInBackground = function() {
  return parseBoolean(Bridge.exec('Utils', 'isInBackground', parseJSON([])));
};

Utils.prototype.handleSuccess = function() {
};

Utils.prototype.handleError = function(e) {
  alert(e);
};

Utils.prototype.configureFirebase = function(path) {
  Bridge.exec('Utils', 'configureFirebase', parseJSON([path]));
};

Utils.prototype.showAlert = function(title,message) {
  Bridge.exec('Utils', 'showAlert', parseJSON([title,message]));
};

Utils.prototype.showConfirm = function(title,message) {
  Bridge.exec('Utils', 'showConfirm', parseJSON([title,message,buttons]));
};

Utils.prototype.printTextBT = function(printerName,content) {
  return Bridge.exec('Utils', 'printTextBT', parseJSON([printerName,content]));
};

Utils.prototype.createsharedpreferences = function(name,valor) {
  return Bridge.exec('Utils', 'createsharedpreferences', parseJSON([name,valor]));
};

Utils.prototype.SetHardwareAccelerated = function(status) {
  return Bridge.exec('Utils', 'SetHardwareAccelerated', parseJSON([status]));
};

Utils.prototype.getallpreferences = function(name) {
  return Bridge.exec('Utils', 'getallpreferences', parseJSON([name]));
};

Utils.prototype.clearpreferences = function(name) {
  return Bridge.exec('Utils', 'clearpreferences', parseJSON([name]));
};

Utils.prototype.startPlaying = function(media) {
  return Bridge.exec('Utils', 'startPlaying', parseJSON([media.src]));
};

Utils.prototype.systemExit = function() {
  if(navigator.app){
    return navigator.app.exitApp();
  } else {
    return Bridge.exec('Utils', 'systemExit', parseJSON([]));
  }
};

Utils.prototype.appBringToFront = function() {
  return Bridge.exec('Utils', 'appBringToFront', parseJSON([]));
};

Utils.prototype.getAppVersion = function() {
  return Bridge.exec('Utils', 'getAppVersion', parseJSON([]));
};

Utils.prototype.getDeviceInfo = function() {
  if (top.platform === "ioshtml5"){
    return Bridge.exec('Utils', 'getDeviceInfo', parseJSON([]))
  }else{
    return JSON.parse(Bridge.exec('Utils', 'getDeviceInfo', parseJSON([])));
  }
};

function getUtils() {
  return new Utils();
};

var Tracking = function() {
};

Tracking.prototype.setid = function(id) {
  return Bridge.exec('Tracking', 'setID', parseJSON([id]));
};

Tracking.prototype.sendView = function(id) {
  return Bridge.exec('Tracking', 'sendView', parseJSON([id]));
};

Tracking.prototype.sendEvent = function(id,rule,component) {
  return Bridge.exec('Tracking', 'sendEvent', parseJSON([id,rule,component]));
};

Tracking.prototype.sendException = function(id) {
  return Bridge.exec('Tracking', 'sendException', parseJSON([id]));
};

function getTracking() {
  return new Tracking();
};

var FingerprintUtils = function() {
};

function getFingerprintUtils() {
    return new FingerprintUtils();
};

FingerprintUtils.prototype.fingerprintValidation = function(formGUID, onSuccess, onSuccessParams, onFail, onFailParams) {
    return Bridge.exec('FingerprintUtils', 'fingerprintValidation', parseJSON([formGUID, onSuccess, onSuccessParams, onFail, onFailParams]));
};

var WazeUtils = function(){ };

WazeUtils.prototype.startSDK = function(endereco, latitude, longitude) {
  Bridge.exec('WazeUtils', 'startSDK', parseJSON([endereco ? endereco:"", latitude, longitude]));
}

WazeUtils.prototype.searchRequestWithNavigation = function(endereco, latitude, longitude) {
  Bridge.exec('WazeUtils', 'searchRequestWithNavigation', parseJSON([endereco ? endereco:"",latitude,longitude]));
}

WazeUtils.prototype.openWaze = function() {
  Bridge.exec('WazeUtils', 'openWaze', parseJSON([]));
}

WazeUtils.prototype.terminateSDK = function() {
  Bridge.exec('WazeUtils', 'terminateSDK', parseJSON([]));
}

WazeUtils.prototype.getWazebuildnumber = function() {
 return Bridge.exec('WazeUtils', 'getWazebuildnumber', parseJSON([]));
}

WazeUtils.prototype.stopNavigationRequest = function() {
  Bridge.exec('WazeUtils', 'stopNavigationRequest', parseJSON([]));
}

function getWazeUtils() {
  return new WazeUtils();
}


function parseJSON(args) {
  if (typeof JSON === "undefined") {
    var s = "[";
    var i, type, start, name, nameType, a;
    for (i = 0; i < args.length; i++) {
      if (args[i] !== null) {
        if (i > 0) {
          s = s + ",";
        }
        type = typeof args[i];
        if ((type === "number") || (type === "boolean")) {
          s = s + args[i];
        } else if (args[i] instanceof Array) {
          s = s + "[" + args[i] + "]";
        } else if (args[i] instanceof Object) {
          start = true;
          s = s + '{';
          for (name in args[i]) {
            if (args[i][name] !== null) {
              if (!start) {
                s = s + ',';
              }
              s = s + '"' + name + '":';
              nameType = typeof args[i][name];
              if ((nameType === "number") || (nameType === "boolean")) {
                s = s + args[i][name];
              } else if ((typeof args[i][name]) === 'function') {
                // don't copy the functions
                s = s + '""';
              } else if (args[i][name] instanceof Object) {
                s = s + Bridge.stringify(args[i][name]);
              } else {
                s = s + '"' + args[i][name] + '"';
              }
              start = false;
            }
          }
          s = s + '}';
        } else {
          a = args[i].replace(/\\/g, '\\\\');
          a = a.replace(/"/g, '\\"');
          s = s + '"' + a + '"';
        }
      }
    }
    s = s + "]";
    return s;
  } else {
    return JSON.stringify(args);
  }
};

function systemExit() {
  navigator.app.exitApp();
}

function init(mainView) {
  if (window.innerWidth > window.innerHeight) {
    currentOrientation = 90;
  }
  document.addEventListener("orientationChanged", function(e) {
    currentOrientation = e.orientation;
    updateViews(e);
  });
  setSession("metadata", GetSystemProperties(), true);
  openView(mainView);
}
