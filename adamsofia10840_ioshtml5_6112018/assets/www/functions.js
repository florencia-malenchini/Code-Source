if(top.platform == "ioshtml5"){
  //Sobrescreve o alerta do Windows para remover o ".html" do tÌtulo
  window.alert = function(message) {top.getUtils().showAlert(" ", message);};
  top.alert = function(message) {top.getUtils().showAlert(" ", message);};
  window.Tracking = function () { top.getTracking();};

}

function ebfstartVoiceCapture(onSuccess,onSucessParams,onError,onErrorParams){
  top.getAudioUtils().startVoiceCapture(formGUID,onSuccess,onSucessParams,onError,onErrorParams);
}

function ebfStartWaze(endereco,latitude, longitude){
  top.getWazeUtils().startSDK(endereco, latitude, longitude);
}

function ebfWazeSearchRequestWithNavigation(endereco, latitude, longitude){
  top.getWazeUtils().searchRequestWithNavigation(endereco, latitude, longitude);
}

function ebfOpenWaze(){
  top.getWazeUtils().openWaze();
}

function ebfCloseWaze(){
  top.getWazeUtils().terminateSDK();
}

function ebfGetWazeBuilderNumber(){
  return top.getWazeUtils().getWazebuildnumber();
}

function ebfStopNavigationRequest(){
  top.getWazeUtils().stopNavigationRequest();
}

function ebfMarkerAddEventListener (obj, evt, flow, params, eventObject){
  //params = params || [];
  eventObject = parseBoolean(eventObject);
  if(eventObject){
    params.unshift(this);
    obj.addListener(evt, function(){
      ebfSetRuleExecutionTime(flow, params, 0);
    });
  } else {
      obj.addListener(evt, function(){
        ebfSetRuleExecutionTime(flow, params, 0);
      });
  }
}

function ebfDisconnectWebSocket(websocketRef){
  websocketRef.close();
}

function ebfSendMessageWebsocket(websocketRef, message, destination) {
  if(websocketRef != null){
    var i;
    var jsonDestination;
    if(destination.length > 0){
      for(i = 0; i < destination.length; i++){
        jsonDestination = {"message":message, "destination":destination[i]};
        websocketRef.send(JSON.stringify(jsonDestination));
      }
    }else{
      jsonDestination = {"message":message, "destination":""};
      websocketRef.send(JSON.stringify(jsonDestination));
    }
  }
}

function ebfOpenConnectionWebSocket(endPoint, ruleOnMessage) {
  var websocket = null;
  websocket = new WebSocket(endPoint);
  websocket.onmessage = function (event) {
    ebfSetRuleExecutionTime(ruleOnMessage, [event.data], 0);
  };
  return websocket;
}



function ebfCloseMasterForm() {
    var view = top.viewsByGuid[formGUID];
    var listaview = top.views;
    for (i = 0; i < listaview.length; i++) {
        if (top.views[i].guid == "{00000000-0000-0000-0000-000000000000}") {} else
            top.closeView(top.views[i].guid);
        i = 0;
    }
}

function ebfSystemExit() {
  top.getUtils().systemExit();
}

function ebfAppBringToFront() {
  top.getUtils().appBringToFront();
}

function ebfMediaPlay(media) {
  if (media instanceof HTMLDivElement) {
    media = media.getElementsByTagName("video")[0] || media.getElementsByTagName("audio")[0];
  }
  if (media instanceof HTMLVideoElement || media instanceof HTMLAudioElement) {
    top.getUtils().startPlaying(media);
  }
}

function ebfExecuteCustomJSFunction(obj, fun, params){
  if(typeof(fun) === "string"){
    if(typeof(obj) !== "object" || obj === null)
    obj = window;
    return obj[fun].apply(obj, params);
  }
}


function ebfHtmlGetAttribute(element, attributeName) {
  if (element && attributeName) {
    return element.getAttribute(attributeName);
  }
}

function ebfHtmlGetElementByAttrName(ref, attrName) {
  ref = ref || document;
  return ref.querySelectorAll('[' + attrName + ']') 
}

function ebfDateDayDifference() {
  var result = 0;
  if (existArgs(arguments)) {
    var data1 = toDate(arguments[0]);
    var data2 = toDate(arguments[1]);
    if (data1 != null && data2 != null) {
      var diff = data1.getTime() - data2.getTime();
      /**
      * 86400000 ms = 1 dia em ms
      */
      result = diff / 86400000;
    }
  }
  return result;
}

function ebfCreateDate(year,month,day,hour,minute,second){
  // Cria uma nova data
  var date = new Date();
  // Altera os valores da data
  date.setYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);
  // Retorna a data
  return date;
}

function ebfDateDiffTime(date1, date2) {
  var time = date2.getTime() - date1.getTime();
  var horas = time / 3600000;

  return parseInt(horas, 10) + ":" + ((time % 3600000) / 60000);
}


function ebfIntegracaoGetElementById(comp, id) {
  var component = $c(comp);
  var element = null;
  if (component) {
    var iframe = component.children;
    for (i = 0; i < iframe.length; i++) {
      doc = iframe[i].contentDocument;
      element = doc.getElementById(id.toString());
      if (element) {
        return element;
      }
    }
  } else {
    throw "O componente " + comp + " n„o existe.";
  }
}


function ebfCreateSharedPreferences(name,valor) {
  top.getUtils().createsharedpreferences(name,valor);
}

function ebfClearPreferences(name) {
  top.getUtils().clearpreferences(name);
}

function ebfGetAllPreferences(name) {
  return top.getUtils().getallpreferences(name);
}


function ebfSetFlowOnPushMessage(flowName) {
  ebfClearPreferences("pushFlowPreferences");
   ebfCreateSharedPreferences("pushFlowPreferences", flowName);
}

function ebfSetFlowOnBecomeActive(flowName) {
  ebfClearPreferences("onBecomeActive");
  ebfCreateSharedPreferences("onBecomeActive", flowName);
}

function ebfGetValueObjectJson(objectJSON, key){
  if(objectJSON){
    return objectJSON[key];
  }else{
    return null;
  }
}

function ebfGetJSONText(object, space) {
  return JSON.stringify(object, null, space);
}

function ebfGetListKeysObjectJson(objetoJSON){
  if(objetoJSON){
    var listKeys = new Array;
    for(i=0; i<Object.keys(objetoJSON).length; i++){
      listKeys.push(Object.keys(objetoJSON)[i]);
    }
    return listKeys;
  }
}

function ebfCreateObjectJSON(json) {
  try {
    return JSON.parse(json);
  } catch (ex) {
    throw "Texto JSON n„o est· em um formato v·lido";
  }
}

function ebfUpdateValueObjectJson(objectJSON, key, value){
  objectJSON[key] = value;
  return objectJSON;
}

function ebfShowLoad(message) {
  top.showLoad(message);
  return;
}

function ebfHideLoad() {
  top.hideLoad();
  return;
}

function ebfHtmlGetDOMAttribute(elem, attr){
  return elem[attr];
}

function ebfObjectKeys(object){
  return Object.keys(object);
}

function ebfHtmlInnerHtml(elementVar, elementContent) {
  if (elementVar) {
    elementVar.innerHTML = elementContent;
  }
}


function ebfHtmlCssDefineStyle(element, propertyName, propertyValue) {
  if (element && propertyName) {
    eval("element.style." + propertyName + " = \"" + propertyValue + "\"");
  }
}

function ebfHtmlCssGetStyle(element, propertyName, propertyValue) {
  if (element && propertyName) {
    return eval("element.style." + propertyName);
  }
}

function ebfHtmlCssRemoveStyle(element, propertyName) {
  if (element && propertyName) {
    eval("element.style.removeProperty(\"" + propertyName + "\")");
  }
}

function ebfHtmlRemoveEvent(elementVar, eventName) {
  if (elementVar && eventName){
    // Remove o 'on' do nome do evento
    if(eventName.indexOf("on") === 0){
      eventName = eventName.substr(2);
    }
    if(elementVar[eventName]){
      removeEvent(elementVar, eventName, elementVar[eventName], false);
      elementVar[eventName] = '';
    }
  }
}


function ebfHtmlRemoveChild(element, child) {
  if (element && child) {
    element.removeChild(child);
  }
}

function ebfDeleteObject(object, attribute){
  return delete object[attribute];
}

function ebfHtmlRemoveAttribute(element, attributeName) {
  if (element && attributeName) {
    element.removeAttribute(attributeName);
  }
}

function ebfGetTabDivByName(tabName) {
  var tab = $mainform().d.t.getTabByName(tabName);
  if (tab) {
    return tab.div;
  }
}

function ebfHtmlGetParent(elementVar) {
  if (elementVar)
  return elementVar.parentElement;
}

function ebfHtmlChildNodes(element) {
  if (element) {
    return element.children;
  }
}

function ebfHtmlGetElementByClassName(classe, ref) {
  ref = ref || document;
  return ref.getElementsByClassName(classe);
}

function ebfHtmlGetElementsByTagName(tagName, element) {
  element = element || document;
  return element.getElementsByTagName(tagName);
}

function ebfHtmlGetElementById(id) {
  try {
    return document.getElementById(id);
  } catch(e) {
    return null;
  }
}


function ebfHtmlGetInnerHtml(elementVar) {
  if (elementVar) {
    return elementVar.innerHTML;
  }
}


function ebfHtmlSetAttribute(element, attributeName, attributeValue) {
  if (element && attributeName) {
    element.setAttribute(attributeName, attributeValue);
  }
}


function ebfHtmlSetDOMAttribute(elem, attr, value){
  return elem[attr] = value;
}


function ebfHtmlCreateHtmlElement(elementVar, attributeListVar, elementAtt) {
  if (elementVar) {
    var element = document.createElement(elementVar);
    if (attributeListVar) {
      for (var i=0; i<attributeListVar.length; i++) {
        var currentAttribute = attributeListVar[i];
        element.setAttribute(currentAttribute[0], currentAttribute[1]);
      }
    }

    if (elementAtt){
      elementAtt.appendChild(element);
    }
    return element;
  }
}

function ebfHtmlGetDocumentElement() {
  return $mainform().document;
}

function ebfHtmlCloneHtmlNode(element){
  return element.cloneNode(true);
}


function ebfHtmlAttachFlowEvent(elementVar, eventName, flowName, ruleParams, eventObject) {
  if (elementVar && eventName && flowName) {
    // Testa se o par‚metro do fluxo a ser executado È nulo
    if (typeof(ruleParams) == 'undefined' || ruleParams == null) {
      ruleParams = [];
    }

    // Remove o 'on' do nome do evento
    if(eventName.indexOf("on") === 0){
      eventName = eventName.substr(2);
    }

    var totalParams = ruleParams.length;

    var func = function(event) {
      event = event || window.event;
      if(eventObject){
        if(totalParams === ruleParams.length){
          ruleParams.unshift(event); // Adiciona evento no primeiro par‚metro
        }else{
          ruleParams[0] = event; // Substitui o objeto do evento anterior
        }
      }
      var stopEvent = executeRuleFromJS(flowName, ruleParams);

      // Se o fluxo retornar o valor LÛgico Falso, ent„o ser· interrompido a propagaÁ„o do evento
      // para os elementos pais e o evento padr„o do navegador
      if(stopEvent === false) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    elementVar.addEventListener(eventName, func);
  }
}


function ebfHtmlAppendElementAt(element, child){
  if (element && child) {
    element.appendChild(child);
  }
}

function ebfHtmlAppendElementAtPosition(element, child, position){
  position = position - 1;
  if (element !== null && child !== null && position !== null && position >= 0) {
    element.insertBefore(child, element.childNodes[position])
  }
}

function getImageFromCamera(obj) {
  top.getCameraUtils().sendImage(obj, formGUID);
}

function HTTPPool() {}

HTTPPool.prototype.get = function() {
  return getHTTPObject();
};

HTTPPool.prototype.leave = function (http) {
  if (http != null) {
    try {
      window.lastReceivedContent = convertNonUnicodeChars(http.responseText);
    } catch (e) {
    }
  }
};

HTTPPool.prototype.processAsyncGet = function (url) {
  var http = httpPool.get();
  var pool = this;
  http.open('GET', url, true);
  http.send(null);

  http.onreadystatechange = function () {
    if (http.readyState == 4) {


      pool.leave(http);
    }
  }
};

var httpPool = new HTTPPool();


function convertNonUnicodeChars(value) {
  if (top.IE && !isNullable(value) && value.length > 0) {
    return value.replace(/\x80/g, String.fromCharCode(8364));
  }
  return value;
}

function postURLAsync(url, postData, throwsException, async, ruleCallback, ruleCallbackError) {
  var http = httpPool.get();
  http.overrideMimeType('text/plain; charset=ISO-8859-1');
  try {
    var contentType = "application/x-www-form-urlencoded";

    http.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
        if (async) {
          if(ruleCallback){
            var content = convertNonUnicodeChars(this.responseText);
            top.callFunction(formGUID,ruleCallback,[content]);
          }
        }
        httpPool.leave(this);
      }
      else if ((this.status != 200)&&(this.readyState == 4)){
        if(ruleCallbackError){
          var content = convertNonUnicodeChars('Error ' + this.status);
          top.callFunction(formGUID,ruleCallbackError,[content]);
        }
        httpPool.leave(this);
      }
    };

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", contentType);

    http.send(postData);
  } catch(e) {
    if (throwsException)
    throw e;
    else
    return postURLAsync(url, postData, true, ruleCallback);
  }
}

[].indexOf || (Array.prototype.indexOf = function(v,n){
  n = (n==null)?0:n; var m = this.length;
  for(var i = n; i < m; i++)
  if(this[i] == v)
  return i;
  return -1;
});

function isNullable() {
  var variableIsEmpty = false;
  if(arguments[0] == null || typeof arguments[0] == 'undefined'){
    variableIsEmpty = true;
  }else if((arguments[0] instanceof MakerMap) || (typeof arguments[0] == 'Map') || (arguments[0].size)){
    variableIsEmpty = (arguments[0].size() < 1);
  }else if(arguments[0].toString() == '' || arguments[0] === '' || (arguments[0].toString && arguments[0].toString() == 'NaN')){
    variableIsEmpty = true;
  }
  return variableIsEmpty;
}
/*
function isNullable() {
return (arguments[0] == null || typeof arguments[0] == 'undefined' || arguments[0] === '' || (arguments[0].toString && arguments[0].toString() == 'NaN'));
}
*/

function parseNumeric(value) {
  if (isNullable(value)) {
    return 0.0;
  }

  if (typeof value == "number") {
    return parseFloat(value);
  }

  if (typeof value == "boolean") {
    if (value) {
      return 1.0;
    } else {
      return 0.0;
    }
  }

  if (!ebfToString(value)) {
    return 0.0;
  }

  var groupingPointRegExp = new RegExp(("\\" + top.GROUPING_POINT), "g");
  value = new String(value).replace(groupingPointRegExp, "").replace(top.DECIMAL_POINT, ".");

  return parseFloat(value);
}

function getLocalDataBase() {
  return top.getLocalDataBase(GetSystemProperties().get("syscode"), CreateSystemDatabase);
}

function formatGridItemAsMetadata(item, metadata) {
  //formata os dados exibidos na grade
  var formatItem;

  if (!metadata) {
    metadata = {};
  }

  if (metadata.type == "date" || metadata.content == 2 && !isNullable(item)){
    formatItem = ebfFormatDateTime(toDate(item), 'dd/MM/yyyy');
    return formatItem;
  }

  if (metadata.type == "datetime" && !isNullable(item)){
    formatItem = ebfFormatDateTime(toDate(item), 'dd/MM/yyyy hh:mm:ss');
    return formatItem;
  }

  if (metadata.type == "time" && !isNullable(item)){
    formatItem = ebfFormatDateTime(toDate(item), 'hh:mm:ss');
    return formatItem;
  }

  if(metadata.type == "float" && metadata.componentmask.indexOf('$') > -1){
    return preencheCampoMascara(item, metadata.componentmask);
  }

  if (metadata.type == "float" && !isNullable(item)){
    formatItem = ebfFormatNumber(item, '###,###,##0.00');
    return formatItem;
  }

  if (isImage(item, metadata)) {
    return createImage(item);
  }
  return ebfReplaceAll(ebfStringToHTMLString(ebfToString(item)), '&lt;br/&gt;', ' ');
}

function ebfFormatNumber(value, mask) {
  var money,
  zeroMatcher,
  number,
  beginCents,
  output,
  i,
  opts,
  decimalPrecision,
  signal;
  decimalPrecision = mask.split('.') [mask.split('.').length - 1].length;
  value += "";
  if (value[0] === '-'){
    signal = '-';
    value.slice(1, value.length);
  } else {
    signal = '';
  }
  if(value.indexOf('.') > 0){
    if(value.split('.')[1].length === 1){
      value += '0';
    }
  } else if(value.indexOf(',') > 0){
    if(value.split(',')[1].length === 1){
      value += '0';
    }
  } else {
    for(i = 0; i < decimalPrecision; i++){
      value += '0';
    }
  }
  opts = {
    'precision': decimalPrecision
  }
  opts = mergeMoneyOptions(opts);
  if (opts.zeroCents) {
    opts.lastOutput = opts.lastOutput || "";
    zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
    zeroRegExp = new RegExp(zeroMatcher, "g"),
    digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
    lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0;
    value = value.toString().replace(zeroRegExp, "");
    if (digitsLength < lastDigitLength) {
      value = value.slice(0, value.length - 1);
    }
  }
  number = value.toString().replace(/[\D]/g, ""),
  clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
  clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
  money = number.substr(0, number.length - opts.moneyPrecision),
  masked = money.substr(0, money.length % 3),
  cents = new Array(opts.precision + 1).join("0")
  ;
  money = money.substr(money.length % 3, money.length);
  for (i = 0, len = money.length; i < len; i++) {
    if (i % 3 === 0) {
      masked += opts.delimiter;
    }
    masked += money[i];
  }
  masked = masked.replace(clearDelimiter, "");
  masked = masked.length ? masked : "0";
  if (!opts.zeroCents) {
    beginCents = number.length - opts.precision,
    centsValue = number.substr(beginCents, opts.precision),
    centsLength = centsValue.length,
    centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
    ;
    cents = (cents + centsValue).slice(-centsSliced);
  }
  output = signal + opts.unit + masked + opts.separator + cents + opts.suffixUnit;
  return output.replace(clearSeparator, "");
};

mergeMoneyOptions = function(opts) {
  opts = opts || {};
  opts = {
    precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
    separator: opts.separator || ",",
    delimiter: opts.delimiter || ".",
    unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
    suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
    zeroCents: opts.zeroCents,
    lastOutput: opts.lastOutput
  };
  opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
  return opts;
}

function isImage(value, metadata){
  return  (typeof value == 'string') && ((metadata && metadata.componenttype == "I") || (value.indexOf('.jpg')!= -1 || value.indexOf('.jpeg')!= -1 || value.indexOf('.png')!= -1 || value.indexOf('.bmp')!= -1 || value.indexOf('.gif')!= -1) && (value.indexOf('http://') == 0 || value.indexOf('file://') == 0 || value.indexOf('file:///') == 0 || value.indexOf('media://') == 0 || value.indexOf('content://') == 0 || value.indexOf('res/image') >= 0));
}

function createImage(value) {
  if(isNullable(value)) {
    return '<td class="gridImage" ><img style="border: 1px solid #DCDDCF;" src="res/image/empty.gif"></td>';
  } else {
    return '<td class="gridImage"><img src="'+value+'"></td>';
  }
}

function addGridItem(grid, elem, idx, total) {
  var value = '';
  var image = '';
  var css = '';
  var icon = 'indicator.png';
  var row = elem.row;
  var keys = elem.keys;

  if (isNullable(elem.metadata)) {
    elem.metadata = new Array(row.length);
    for (var i=0;i<row.length;i++) {
      elem.metadata[i] = {};
    }
  }

  var title = null;

  if (elem.onclick) {
    if (elem.icon) {
      icon = elem.icon;
    }
  }

  for (var i=0;i<row.length;i++) {
    if (row[i]) {
      if (isImage(row[i], elem.metadata[i])) {
        image += createImage(row[i]);
      } else {
        var resultado = getLookupDescription(elem.metadata[i],row[i]);
        if (!title) {
          //title = formatGridItemAsMetadata(row[i], elem.metadata[i]);
          title = formatGridItemAsMetadata(resultado, elem.metadata[i]);
        } else {
          //value += isNullable(elem.metadata[i].description) ? formatGridItemAsMetadata(row[i], elem.metadata[i]) + ' ' : "<b>"+ elem.metadata[i].description +": </b>" +formatGridItemAsMetadata(row[i], elem.metadata[i]) + ' ';
          value += isNullable(elem.metadata[i].description) ? formatGridItemAsMetadata(resultado, elem.metadata[i]) + ' ' : "<b>"+ elem.metadata[i].description +": </b>" +formatGridItemAsMetadata(resultado, elem.metadata[i]) + ' ';
        }
      }
    }
  }

  value = trim(value);

  var li = document.createElement('li');
  li.role = 'listitem';
  if (elem.name) {
    li.id = elem.name;
  }
  if (total == 1) {
    li.id = 'uniquechild';
  }

  var text;

  if (typeof elem.subform !== 'undefined' && typeof elem.editable !== 'undefined' && !elem.isFrmSearch)
  if (elem.subform || elem.editable)
  text = '<table class="gridResume gridArrow '+elem.css+'"><tbody><tr>';
  else
  text = '<table class="gridResume '+elem.css+'"><tbody><tr>';
  else
  text = '<table class="gridResume gridArrow '+elem.css+'"><tbody><tr>';

  if (image) {
    text += image;
  }

  text += '<td class="gridText">';
  text += '<p class="gridTitle '+((value && value != 'null')?'gridTwoLines':'')+' '+css+'" style="vertical-align:middle">'+title;
  text += (value && (value != 'null')) ? ('<br/><span class="gridSecondTitle">'+value+'</span>') : "";
  text += '</p></td>';
  if (!elem.onclick &&  (elem.editable || elem.subform) && !grid.getAttribute('onrowclick')) {
    var filter = elem.filter;
    var sourceForm = elem.sourceForm;
    elem.onclick = function() {
      ebfFormOpenFilterAndMode(sourceForm, filter, 2, function() {
        grid.refresh();
      });
    }
  }

  if ((grid.getAttribute('onrowclick') && grid.getAttribute('onrowclick') != '//') || elem.onclick) {
    var func = elem.onclick || eval(grid.getAttribute('onrowclick'));
    li.addEventListener('click', function() {
      if (grid.getAttribute("disabled") != 'disabled') {
        if (!grid.disabled) {
          grid.disabled = true;
          var currentContent = this.innerHTML;
          var currentWidth = this.firstChild.offsetWidth;
          var currentHeight = this.firstChild.offsetHeight;
          this.innerHTML = '<table class="gridLoading"><tr><td>Aguarde...</td></tr></table>';
          this.firstChild.style.width = currentWidth + 'px'
          this.firstChild.style.height = currentHeight + 'px'
          var self = this;
          setTimeout(function() {
            try {
              func(idx+1, idx+1, keys, row);
            } catch(e) {
              alert(e);
            } finally {
              self.innerHTML = currentContent;
              grid.disabled = false;
              try { window.focus(); } catch(e) {}
            }
          }, 0);
        }
      }
    }, false);
  }

  text += '</tr></tbody></table>';
  li.innerHTML = text;
  grid.appendChild(li);
}

function cleanGrid(grid) {
  grid.innerHTML = '';
}

function fillGrid(gridName, values, cancelClean) {
  var grid = document.querySelector('#'+gridName);
  if (!cancelClean) {
    cleanGrid(grid);
  }
  var gridCom = $(gridName);
  for (var i=0;i<values.length;i++) {
    addGridItem(grid, values[i], gridCom.idx, values.length);
    gridCom.idx +=1;
  }
}

function loadGrid(gridName, cursor, columnsStr, keyNamesStr, editable, metadata, pageSize) {
  var gridCom = $(gridName);
  gridCom.idx = 0;
  if (!pageSize || pageSize < 0) {
    pageSize = 15;
  }

  gridCom.___pageSize = pageSize;
  if (!gridCom.___loaded) {
    gridCom.___loaded = 1;
  }

  var data = [];
  var keys = [];
  var columns = columnsStr.split(';');
  var keyNames = keyNamesStr.split(';');

  var sourceForm = GetComponentProperty(formGUID, gridName, "CodigoForm");
  var params = '';

  if (editable  && gridCom.caninclude) {

    var params = GetComponentProperty(formGUID, gridName, "Parametros");

    if (params) {
      params = ParseParameters(params);
    }


    var elemNew = {};

    elemNew.css = 'gridNew';
    elemNew.icon = 'plus.png';
    elemNew.row = ['Novo...'];
    elemNew.keys = [];
    elemNew.onclick = function() {
      if (ebfRequestGetParameter('mode') == '1') {
        alert('VocÍ deve concluir a inserÁ„o primeiro!')
      } else {
        ebfFormOpenFilterAndMode(sourceForm, params, 1, function() {
          $(gridName).refresh();
        });
      }
    };

    data.push(elemNew);
  }

  pageSize = pageSize*gridCom.___loaded;
  function loadGridPage(appendData) {
    var idx = 0;
    while (cursor.hasdata()) {
      idx++;
      if (idx > pageSize) {
        break;
      }

      var total = cursor.getColumnCount();
      var row = [];
      var keysRow = [];
      var elem = {};
      if (!columnsStr) {
        var count = cursor.getColumnCount();
        for (var i=1;i<=count;i++) {
          row.push(cursor.field(i, 'string'));
        }
      } else {
        for (var i=0;i<columns.length;i++) {
          if (columns[i]) {
            row.push(cursor.field(columns[i], 'string'));
          }
        }
      }
      elem.row = row;
      elem.metadata = metadata;

      var filter = '';
      for (var j=0;j<keyNames.length;j++) {
        if (keyNames[j]) {
          keysRow.push(cursor.field(keyNames[j], 'string'));
          if (filter != '') {
            filter+= ';';
          }
          filter += keyNames[j]+'='+cursor.field(keyNames[j], 'string');
        }
      }

      if (!editable)
      filter += ';disabled';

      elem.keys = keysRow;
      elem.filter = filter;
      elem.editable = editable;
      elem.subform = gridCom.subform;
      elem.sourceForm = sourceForm;
      elem.isFrmSearch = (gridName === 'CRUDGrid') ? true : false;
      data.push(elem);
      cursor.next();
    }

    if (cursor.hasdata()) {
      var elemNext = {};

      var name = gridName+'Next'+parseInt(Math.abs(Math.random()*1000));
      elemNext.css = 'gridNext';
      elemNext.icon = 'empty.gif';
      elemNext.name = name
      elemNext.row = ['Pr??os...'];
      elemNext.keys = [];
      elemNext.onclick = function() {
        gridCom.idx -= 1;
        gridCom.___loaded++;
        rememberComponentsBelow(gridCom)
        var nextNode = $(name);
        loadGridPage(true);
        nextNode.parentNode.removeChild(nextNode);
        updateComponentsBelow(gridCom);
      };

      data.push(elemNext);
    }

    fillGrid(gridName, data, appendData);
    data = [];
  }

  loadGridPage(false);
  pageSize = gridCom.___pageSize;
}

function rememberComponentsBelow(comp) {
  if (!comp.offsetHeight) {
    return;
  }

  var y = comp.offsetTop;
  var h = comp.clientHeight;
  var base = y + h;
  var neighbor = new Array();
  var compList = new Array();
  if (comp.parentElement) {
    neighbor = comp.parentElement.children;
  }

  for(var i = 0; i < neighbor.length; i++) {
    if((neighbor[i] != comp) && (base <= neighbor[i].offsetTop)) {
      compList.push(neighbor[i]);
    }
  }
  comp.__moveComps = compList;
  comp.__originalHeight = h;
  comp.style.height = 'auto';
}

function updateComponentsBelow(comp) {
  if (!comp.offsetHeight) {
    return;
  }

  var y = comp.offsetTop;
  var h = comp.clientHeight - comp.__originalHeight;
  var compList = comp.__moveComps;
  for(var i = 0; i < compList.length; i++) {
    var newY = compList[i].offsetTop + h;
    compList[i].style.top = newY + 'px';
  }

  resizeInternal();
}

JGQueryString = {
  getVars: function() {
    if (window.___queryStrings) {
      return window.___queryStrings;
    } else {
      var URLParameter = top.getURLParameter(formGUID);
      var queryString = URLParameter?URLParameter: "";
      var queryStrings = new Array();
      var tempArray = queryString.split("&");
      for(var i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i].split("=");
        queryStrings['__' + tempArray[i][0]] = unescape(tempArray[i][1]);
      }
      window.___queryStrings = queryStrings;
      return queryStrings;
    }
  },
  getVar: function(varName) {
    return this.getVars()['__' + varName];
  }
}

function MakerMap() {
  this.length = 0;
  this.items = {};
  this.keys = new Array();
}

MakerMap.prototype.getInstanceFromArray = function(arr) {
  var list = new Array();
  for (var i = 0; i < arr.length; i++) {
    if (Object.prototype.toString.apply(arr[i]) === "[object Object]") {
      list.push(MakerMap.prototype.getInstance(arr[i]));
    } else if (Object.prototype.toString.apply(arr[i]) === "[object Array]") {
      list.push(MakerMap.prototype.getInstanceFromArray(arr[i]));
    } else {
      list.push(arr[i]);
    }
  }
  return list;
}

MakerMap.prototype.getInstance = function(json) {
  var newMap = new MakerMap();
  for (var key in json) {
    if (typeof key == "function") {
      continue;
    }
    if (Object.prototype.toString.apply(json[key]) === "[object Object]") {
      newMap.add(key, MakerMap.prototype.getInstance(json[key]));
    } else if (Object.prototype.toString.apply(json[key]) === "[object Array]") {
      newMap.add(key, MakerMap.prototype.getInstanceFromArray(json[key]));
    } else {
      newMap.add(key, json[key]);
    }
  }
  return newMap;
}

MakerMap.prototype.getKeys = function() {
  return this.cloneArray(this.keys);
}

MakerMap.prototype.getValues = function() {
  var arr = [];

  for (var item in this.items) {
    if (typeof item == "function") {
      continue;
    }

    arr.push(this.items[item].value);
  }

  return arr;
}

MakerMap.prototype.size = function() {
  return this.length;
}

MakerMap.prototype.hash = function(value) {
  if (typeof value == 'string') {
    value = value.toUpperCase();
  }
  return (typeof value) + ' ' + (value instanceof Object ? (value.__hash || (value.__hash = ++arguments.callee.current)) : value+"");
};

MakerMap.prototype.add = function(key, value) {
  var hash = this.hash(key);

  if(this.items[hash] === undefined) {
    var item = { key : key, value : value };
    this.items[hash] = item;
    this.keys.push(key);

    ++this.length;
  } else {
    this.items[hash].value = value;
  }

  return this;

}

MakerMap.prototype.get = function(key) {
  var item = this.items[this.hash(key)];
  return item === undefined ? undefined : item.value;
}

MakerMap.prototype.remove = function(key) {
  var hash = this.hash(key);
  var item = this.items[hash];

  if(item !== undefined) {
    this.length -= 1;
    delete this.items[hash];

    for (var i=0;i<this.keys.length;i++) {
      if (this.hash(this.keys[i]) == hash) {
        this.keys.splice(i, 1);
        break;
      }
    }
  }
  return this;
}

MakerMap.prototype.getObject = function() {
  var obj = new Object();

  if (this.length > 0) {
    var keys = this.getKeys();
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key) {
        var value = this.get(key);
        obj[key] = value;
      }
    }
  }
  return obj;
}

MakerMap.prototype.toString = function() {
  var result = "{";
  if (this.length > 0) {
    var keys = this.getKeys();
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key) {
        var value = this.get(key);
        result += ((i > 0 ? ", " : "") + key + ": " + value);
      }
    }
  }
  result += "}";
  return result;
}

MakerMap.prototype.cloneArray = function(arr) {
  var cloneArr = new Array();
  for (var i=0;i<arr.length;i++) {
    cloneArr.push(arr[i]);
  }
  return cloneArr;
}

function $(c) {
  return document.querySelector('#'+c);
}

function $c(c) {
  return document.querySelector('#'+c);
}

function existArgs(args) {
  return (args.length > 0);
}

function reduceVariable(texto, notClassName) {
  var value = "";

  if (texto) {
    var regexp = /^\d+|\W/g;
    texto = ebfToString(texto);

    if (notClassName) {
      value = trim(translateAcentos(texto.toUpperCase())).replace(/\s/g, "_");

      if (regexp.test(value)) {
        value = value.replace(regexp, "_");
      }
    } else {
      var specialChar = /\W/g;
      var startsNumeric = /^\d+/g;

      value = translateAcentos(texto);

      if (specialChar.test(value)) {
        value = value.replace(specialChar, " ");
      }

      if (startsNumeric.test(value)) {
        value = value.replace(startsNumeric, " ");
      }

      value = firstToUpper(trim(value.replace(/\s{2,}/g, " ").replace(/_/g, " ")));

      var spacePosition;
      while ((spacePosition = value.indexOf(" ")) != -1) {
        var aux = value.substring(spacePosition + 1);

        value = value.substring(0, spacePosition) + firstToUpper(aux);
      }
    }
  }

  return value;
}

function trim(str) {
  var result = "";
  if (str) {
    result = ebfToString(str).replace(/^\s+|\s+$/g, '');
  }
  return result;
}

function firstToUpper(texto) {
  if (texto) {
    if (texto.length == 1) {
      return texto.toUpperCase();
    } else if (texto.length > 1) {
      return texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();
    } else {
      return "";
    }
  }
}

function translateAcentos(aValue) {
  var CHR_ACENTUADA = "‡ËÏÚ˘·ÈÌÛ˙‚ÍÓÙ˚„ıÁÒ‰ÎÔˆ¸¿»Ã“Ÿ¡…Õ”⁄¬ Œ‘€√’«—ƒÀœ÷‹";
  var CHR_NAO_ACENTUADA = "aeiouaeiouaeiouaocnaeiouAEIOUAEIOUAEIOUAOCNAEIOU";

  var idx, idxpos;
  var result = "";

  for (idx = 0; idx < aValue.length; idx++) {
    idxpos = CHR_ACENTUADA.indexOf(aValue.charAt(idx));
    if (idxpos != -1) {
      result += CHR_NAO_ACENTUADA.charAt(idxpos);
    }
    else {
      result += aValue.charAt(idx);
    }
  }

  return result;
}

function fixXMLDocument(doc) {
  if (!top.IE)
  fixXMLNode(doc.documentElement);
}

function fixXMLNode(node) {
  var children = node.childNodes;
  for(var i = 0; i < children.length; i++) {
    var child = children[i];
    if( (trim(child.nodeValue) == '') && (!child.tagName)) {
      child.parentNode.removeChild(child);
    }
    else
    fixXMLNode(child);
  }
}

function loadXML(xml) {
  // code for IE
  if (window.ActiveXObject) {
    var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.loadXML(xml);
    return xmlDoc;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    return (new DOMParser()).parseFromString(xml, "text/xml");;
  } else {
    alert('Your browser cannot handle this script');
  }
}

function Time(hour, minute) {
  this.hour = hour;
  this.minute = minute;
  this.second = 0;
  this.millisecond = 0;

  if (arguments.length == 4) {
    this.second = arguments[2];
    this.millisecond = arguments[3];
  } else if (arguments.length == 3) {
    this.second = arguments[2];
  }

  if(arguments[0] && arguments[1])
  this.date = new Date(1980, 0, 1, this.hour, this.minute, this.second, this.millisecond);
}

Time.prototype.fromDate = function(date) {
  this.date = date;

  this.hour = date.getHours();
  this.minute = date.getMinutes();
  this.second = date.getSeconds();

  return this;
}

Time.prototype.getDate = function() {
  return this.date;
}

Time.prototype.getHour = function() {
  return this.hour;
}

Time.prototype.getMinute = function() {
  return this.minute;
}

Time.prototype.getSecond = function() {
  return this.second;
}

Time.prototype.getMillisecond = function() {
  return this.millisecond;
}

Time.prototype.incHour = function(value) {
  var actualHour = this.getDate().getHours();

  this.getDate().setHours(actualHour + value);

  this.hour = this.getDate().getHours();
}

Time.prototype.incMinute = function(value) {
  var actualMinute = this.getDate().getMinutes();

  this.getDate().setMinutes(actualMinute + value);

  this.minute = this.getDate().getMinutes();
}

Time.prototype.incSecond = function(value) {
  var actualSecond = this.getDate().getSeconds();

  this.getDate().setSeconds(actualSecond + value);

  this.second = this.getDate().getSeconds();
}

Time.prototype.incMillisecond = function(value) {
  var actualMillisecond = this.getDate().getMilliseconds();

  this.getDate().setMilliseconds(actualMillisecond + value);

  this.millisecond = this.getDate().getMilliseconds();
}

Time.prototype.subtractHour = function(value) {
  var actualHour = this.getDate().getHours();

  this.getDate().setHours(actualHour - value);

  this.hour = this.getDate().getHours();
}

Time.prototype.subtractMinute = function(value) {
  var actualMinute = this.getDate().getMinutes();

  this.getDate().setMinutes(actualMinute - value);

  this.minute = this.getDate().getMinutes();
}

Time.prototype.subtractSecond = function(value) {
  var actualSecond = this.getDate().getSeconds();

  this.getDate().setSeconds(actualSecond - value);

  this.second = this.getDate().getSeconds();
}

Time.prototype.subtractMillisecond = function(value) {
  var actualMillisecond = this.getDate().getMilliseconds();

  this.getDate().setMilliseconds(actualMillisecond - value);

  this.millisecond = this.getDate().getMilliseconds();
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

Time.prototype.toString = function() {
  var hour = ebfToString(this.hour);
  if (hour.length == 1) {
    hour = '0' + hour;
  }

  var result = hour;

  var minute = ebfToString(this.minute);
  if (minute.length == 1) {
    minute = '0' + minute;
  }

  result += ":" + minute;

  if (this.second != null && ebfToString(this.second) != "") {
    var second = ebfToString(this.second);
    if (second.length == 1) {
      second = '0' + second;
    }

    result += ":" + second;
  }

  if (this.millisecond != null && ebfToString(this.millisecond) != "") {
    result += "." + ebfToString(this.millisecond);
  }

  return result;
}

function parseTime(value) {
  var toTime = null;

  if (value instanceof Time) {
    toTime = value;
  } else {
    if (value != null && (typeof value != "undefined")) {
      var dtExpReg = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})(\.(\d+))?\s*$/;
      var dataArr = dtExpReg.exec(value);
      if (dataArr != null) {
        var hora = retirarZerosIniciais(dataArr[1]);
        var minuto = retirarZerosIniciais(dataArr[2]);
        var segundo = retirarZerosIniciais(dataArr[3]);
        var milisegundo = retirarZerosIniciais(dataArr[5]);

        if (milisegundo != null && (typeof milisegundo != "undefined")) {
          toTime = new Time(hora, minuto, segundo, milisegundo);
        } else {
          toTime = new Time(hora, minuto, segundo);
        }
      }
    }
  }

  return toTime;
}

function loadLookup(componentName, keyNamesStr, columnsStr, keyType, columnsType) {
  var columns = columnsStr.split(';');
  var keyNames = keyNamesStr.split(';');
  var cursor = GetComponentDataset(componentName);
  var lkp = $(componentName);
  var oldValue = lkp.value;
  hasOldValue = false;
  lkp.innerHTML = '<option value=""></option>';
  while (cursor.hasdata()) {
    var opt = document.createElement('option');
    if (columnsType == 'date') {
      opt.innerHTML = ebfFormatDateTime(cursor.field(columns[0]), "dd/MM/yyyy");
    } else if (columnsType == 'datetime') {
      opt.innerHTML = ebfFormatDateTime(cursor.field(columns[0]), "dd/MM/yyyy hh:mm:ss ");
    } else if (columnsType == 'time') {
      opt.innerHTML = ebfFormatDateTime(cursor.field(columns[0]), "hh:mm:ss");
    } else {
      opt.innerHTML = cursor.field(columns[0]);
    }
    opt.value = cursor.field(keyNames[0]);
    if(opt.value == oldValue) {
      hasOldValue = true;
    }
    lkp.appendChild(opt)
    cursor.next();
  }
  lkp.value = hasOldValue ? oldValue : null;
}

function openCalendarDate(component, dateValue){
  top.openView('Date.html'+'?componentName='+component+'&dateValue='+dateValue+'&formparentguid='+formGUID, '{87881794-F5A8-452B-96FD-52B38AAB5090}');
}

function openCalendarDateTime(component, dateValue){
  top.openView('Datetime.html'+'?componentName='+component+'&dateValue='+dateValue+'&formparentguid='+formGUID, '{1609DF3A-979D-4061-8878-CC6393962FED}');
}

function openCalendarTime(component, dateValue){
  top.openView('Time.html'+'?componentName='+component+'&dateValue='+dateValue+'&formparentguid='+formGUID, '{1A77636B-89C7-4D37-A3DD-1FA8FA8018E7}');
}

function completeZero(value) {
  return (value < 10)?('0'+value):value;
}

function isNumeric(sText) {

  if (typeof sText == 'number')
  return true;

  sText = "" + sText;

  var ValidChars = "0123456789.,-";
  var IsNumber = true;
  var Char;

  for (i = 0; i < sText.length && IsNumber == true; i++) {
    Char = sText.charAt(i);
    if (ValidChars.indexOf(Char) == -1) {
      IsNumber = false;
    }
  }
  return IsNumber;
}

function isTypeOf(obj, clazz) {
  var classCompare = false;
  try {
    classCompare = (classCompare || (obj instanceof eval(clazz)));
    classCompare = (classCompare || (obj.constructor === eval(clazz)));
  } catch (e) {}
  return (typeof obj == clazz || classCompare) || (obj.constructor && obj.constructor.toString && obj.constructor.toString().indexOf('function '+clazz) != -1);
}

function parseBoolean(value) {
  if (value == null || typeof value == "undefined") {
    return false;
  }

  if (typeof value == "boolean") {
    return value;
  }

  if (!value.toString) {
    return false;
  }

  value = trim(value.toString().toUpperCase());

  return value == "1" || value == "S" || value == "V" || value == "T" || value == "Y" || value == "TRUE" || value == "VERDADE" || value == "VERDADEIRO" || value == "YES" || value == "SIM";
}

function clickAction(input, func) {
  setTimeout(function(){ebfHiddenKeyboard();},10);
  if (top.platform=='androidhtml5' ){
    ebfCloseKeyBoard(ebfHeightWindow(),top.ebfHeightWindow());
  }
  setTimeout(function(){clickAction2(input, func);},0);
}
function clickAction2(input, func) {
  if (!input.___using && input.getAttribute('disabled') != 'disabled' && input.getAttribute('disabled') != 'true') {
    input.___using = true;

    var coverDiv;

    function addInternalWait() {

      coverDiv = document.createElement("div");
      coverDiv.style.left = input.offsetLeft+'px';
      coverDiv.style.top = input.offsetTop+'px';
      coverDiv.style.width = input.offsetWidth+'px';
      coverDiv.style.left = input.offsetLeft+'px';

      coverDiv.style.position = 'absolute';
      coverDiv.style.zIndex = 999999999;
      coverDiv.style.display = 'block';
      document.body.appendChild(coverDiv);

      var div = document.createElement("div");
      //  div.className = 'wait';
      coverDiv.appendChild(div);
    }

    addInternalWait();

    var originalTop = input.offsetTop;
    var originalLeft = input.offsetLeft;
    var originalStyleTop = input.style.top;
    var originalStyleLeft = input.style.left;

    //input.style.left = (originalLeft+2)+'px';
    //input.style.top = (originalTop+2)+'px';

    /*setTimeout(function() {
      input.style.left = originalStyleLeft;
      input.style.top = originalStyleTop;
    },10);*/

    var resize = function() {
      coverDiv.parentNode.removeChild(coverDiv);
      addInternalWait();
    }

    addResizeListener(resize);

    setTimeout(function() {
      try {
        func();
        refresh();
      } catch(e) {
        notifyError(e);
      } finally {
        input.___using = false;
        coverDiv.parentNode.removeChild(coverDiv);
        removeResizeListener(resize);
      }
    },10);
  }
}

function changeAction(component, func){
  if(component.type.indexOf('select') >= 0){
    if(component.selectedIndex != component.optselected) {
      component.optselected = component.selectedIndex;
      setTimeout(function() {
        try {
          func();
          refresh();
        } catch(e) {
          notifyError(e);
        }
      }, 10);

    }
  } else if(func){
    setTimeout(function() {
      try{
        func();
        refresh();
      }catch(e){
        notifyError(e);
      }
    },10)
  };
}

function getDiv(id, x, y, w, h, zindex, visibility) {
  var div = document.createElement("div");
  if (w > 0) div.style.width = w;
  if (h > 0) div.style.height = h;
  div.style.left = x+'px';
  div.style.top = y+'px';
  div.style.position = 'absolute';
  div.style.zIndex = zindex;
  div.name = id;

  if (visibility != null && (visibility==false || visibility=='hide')) {
    div.style.display = 'none';
  } else {
    div.style.display = 'block';
  }
  return div;
}

function convertWebmaskToDateMask(mask){
  var masktype = isDateMask(mask);
  if(masktype == 'datetime'){
    mask = mask.indexOf('DD') != -1 ? ebfReplace(mask, 'DD','dd') : ebfReplace(mask, '##','dd');
    mask = mask.indexOf('MM') != -1 ? mask : ebfReplace(mask, '##','MM');
    mask = mask.indexOf('YYYY') != -1 ? ebfReplace(mask, 'YYYY','yyyy') : ebfReplace(mask, '####','yyyy');
    mask = ebfReplace(mask, '##','hh');
    mask = ebfReplace(mask, '##','mm');
    mask = ebfReplace(mask, '##','ss');
    return mask;
  } else if (masktype == 'date'){
    mask = mask.indexOf('DD') != -1 ? ebfReplace(mask, 'DD','dd') : ebfReplace(mask, '##','dd');
    mask = mask.indexOf('MM') != -1 ? mask : ebfReplace(mask, '##','MM');
    mask = mask.indexOf('YYYY') != -1 ? ebfReplace(mask, 'YYYY','yyyy') : ebfReplace(mask, '####','yyyy');
    return mask;
  } else if (masktype == 'time'){
    mask = ebfReplace(mask, '##','hh');
    mask = ebfReplace(mask, '##','mm');
    mask = ebfReplace(mask, '##','ss');
    return mask;
  }
}

function isDateMask(mask){
  if(mask.indexOf('/') == 2 && mask.indexOf(':') != -1){
    return 'datetime';
  } else if (mask.indexOf('/') == 2) {
    return 'date';
  } else if (mask.indexOf(':') != -1){
    return 'time';
  } else {
    return null;
  }
}

function notifyError(e){
  var message = e.message ? e.message : e;
  if(!message) message = '';
  if(message.indexOf("Unable to resolve") != -1 || message.indexOf("Connection to") != -1){
    if(confirm("AusÍncia de conex„o de rede. \n\n Deseja visualizar o erro ?")){
      alert(e.message);
    }
  } else {
    alert(e)
  }
}

var ___resizeListener = new Array();

function addResizeListener(func) {
  ___resizeListener.push(func);
}

function removeResizeListener(func) {
  for (var i=0;i<___resizeListener.length;i++) {
    if (___resizeListener[i] == func) {
      ___resizeListener.splice(i, 1);
    }
  }
}

function resizeInternal() {
  if (((navigator.userAgent+"").indexOf('Android 3') != -1) || ((navigator.userAgent+"").indexOf('Android 4') != -1)) {
    setTimeout(function() {
      var d = document.documentElement;
      var b = document.body;
      var who = d.offsetHeight? d: b ;
      var height = Math.max(Math.max(who.scrollHeight,who.offsetHeight), top.document.body.clientHeight);
      if (top.viewsByGuid[formGUID]) {
        top.viewsByGuid[formGUID].getElementsByTagName("iframe")[0].style.height = height+'px';
      }
    }, 100);
  }

  for (var i=0;i<___resizeListener.length;i++) {
    try { ___resizeListener[i](); } catch(e) {}
  }
}

var before;
var slider;
function addtouchMove() {
  var lay = document.getElementById("layout");
  slider = ((navigator.userAgent.indexOf("Android 4.0.3") > 0) || (navigator.userAgent.indexOf("Android 3.2") > 0));
  function ebftouchStart(e) {

    xStart = e.changedTouches[0].screenX;
    yStart = e.changedTouches[0].screenY;

  }


  function ebftouchEnd(e) {
    if (slider) lay.removeEventListener('touchmove',ebftouchEnd);
    var after = new Date().getTime();
    before = before + 100;
    //alert( xStart +"/" + e.changedTouches[0].screenX)
    if ((before < after) || (!before)) {
      var m = e.changedTouches[0].screenX - xStart;
      // X = MARGEM PARA INICIAR EVENTO
      var x = 40;
      if ((m > x) || (m < (x*-1)) ) {
        //if (e.touches[0].screenX > xStart ) {
        if (e.changedTouches[0].screenX > xStart ) {
          //DIREITA

          ebfFormGoTab(-1);
          if (slider) lay.addEventListener('touchmove',ebftouchEnd);
        } else {
          //ESQUERDA

          ebfFormGoTab(1);
          if (slider) lay.addEventListener('touchmove',ebftouchEnd);
        }
      }
      before = new Date().getTime();
      if (slider) lay.addEventListener('touchmove',ebftouchEnd);
    } else {
      if (slider) lay.addEventListener('touchmove',ebftouchEnd);
    }
  }

  function ebfmousemoveStart(e) {
    xMouseStart = e.clientX;
    yMouseStart = e.clientY;
  }

  function ebfmousemoveEnd(e) {
    var m =  e.clientX - xMouseStart ;
    // X = MARGEM PARA INICIAR EVENTO
    var x = 30;
    if ((m > x) || (m < (x*-1)) ) {
      if (e.clientX  > xMouseStart ) {
        //DIREITA
        ebfFormGoTab(-1);
      } else {
        //ESQUERDA
        ebfFormGoTab(1);
      }
    }
  }

  // EVENTO BROWSER (SIMULADOR)
  lay.addEventListener('mousedown',ebfmousemoveStart);
  lay.addEventListener('mouseup',ebfmousemoveEnd);
  // EVENTO HTML 5 MOBILE  (MOBILE)
  lay.addEventListener('touchstart',ebftouchStart);

  if (slider) {
    //alert(1)
    lay.addEventListener('touchmove',ebftouchEnd);
  } else {
    //alert(2)
    lay.addEventListener('touchend',ebftouchEnd);
  }

}


function ebfFormGoTab(element){
  if (isNullOrEmpty(element))
  return;

  var tabListItems = document.getElementById("tabs").childNodes;
  for ( var i = 0; i < tabListItems.length; i++ ) {
    if ( tabListItems[i].nodeName == "LI" ) {
      className = tabListItems[i].getAttribute("class");
      if (className == "selected")  {
        var current = i;
      }
    }
  }
  var next = parseInt(current) + parseInt(element);
  try {
    if (tabListItems[next].getAttribute("name")) {
      // EFEITO
      // ebfFormNextPage(element);
      var name = tabListItems[next].innerHTML;
      //TROCAR ABA
      ebfFormOpenTab(name);
    }
  } catch(e) {
    //ERROR
  }
}

function tabToNextComponent(e,component,typeComponent){
  if(navigator.userAgent.indexOf("Android") > 0){
    var unicode=e.keyCode? e.keyCode : e.charCode;
    if(typeComponent != null && typeComponent != 'undefined' && typeComponent != undefined){
      if(unicode == 13 && (typeComponent != 'memo')){
        ebfStartKeyBoard(component);
      }
    }
  }
}


function ebfStartKeyBoard(component){
  //ebfFormSetFocus(component);
  setTimeout(function(){ebfFormSetFocus(component)},5);
  return top.getFunctionsUtils().startKeyBoard();
}

function ebfAnalyticsSendEvent(eventType, ruleName, component){
  return window.Tracking.sendEvent(eventType, ruleName, component);
}

function ebfAnalyticsSendException(contentexception){
  return window.Tracking.sendException(contentexception);
}

function ebfAnalyticsSendView(NameWindow){
  return window.Tracking.sendView(NameWindow);
}

function ebfBluetoothActivate(force) {
  return top.getWirelessUtils().btActivate(force);
}

function ebfBluetoothDeactivate(force) {
  return top.getWirelessUtils().btDeactivate(force);
}

function ebfBluetoothExists() {
  return top.getWirelessUtils().btExists();
}

function ebfBluetoothGetPairedList() {
  return top.getWirelessUtils().btGetPairedDevices();
}

function ebfBluetoothIsActive() {
  return top.getWirelessUtils().btIsActive();
}

function ebfClearWatchCompass(watchID) {
  if (top.platform == "ioshtml5"){
    parent.getLocationUtils().stopHeading();
  }else{
    top.navigator.compass.clearWatch(watchID);
  }
}

function ebfClearWatchGPS(watchID) {
  if (top.platform == "ioshtml5"){
    parent.getLocationUtils().stopPosition();
  }else {
    if (top.GPSFUNCTIONS) {
      top.GPSFUNCTIONS[watchID] = null;
    }
  }
}

function ebfClearWatchHeading(watchID) {
  top.navigator.compass.clearWatch(watchID);
}

function ebfCloseKeyBoard(x,y){
  return top.getFunctionsUtils().closeKeyBoard(x,y);
}

function ebfDonwloadStart(url, fileName){
  return top.getNetworkUtils().downloadStart(url, fileName);
}

function ebfFormSetLookupName(form, com, newValue){
  setTimeout(
    function() {
      var lk = $c(com);
      var newOption = document.createElement('option');
      newOption.value = newValue;
      newOption.innerHTML = newValue;
      lk.appendChild(newOption);
      lk.value = newOption.value;
    }, 20
  );
}

function ebfGetExternalStorage(){
  return top.getFileManager().getExternalStorage();
}

function ebfPinPadAwaitingResponse(onsucess, onerror) {
  return top.getPinpadUtils().awaitingResponse(reduceVariable(onsucess), reduceVariable(onerror));
}

function ebfPinPadConnect(serverIP, serverPORT) {
  return top.getPinpadUtils().connection(serverIP, serverPORT);
}

function ebfPinPadDisConnect() {
  return top.getPinpadUtils().disConnect();
}

function ebfPinPadSendMessage(message) {
  return top.getPinpadUtils().sendMessage(message);
}

function ebfPinPadVerifyConnection() {
  return top.getPinpadUtils().verifyConnection();
}

function ebfPushRegister(onsucess, senderid){
  if (top.platform == "ioshtml5") {
      top.getPushNotification().register(onsucess, senderid, formGUID);
  } else {
      var request = top.createRequest(onsucess, "none", formGUID);
      top.getPushNotification().register(request, senderid);
  }
}

function ebfPushUnregister(onsucess){
  var request = top.createRequest(onsucess, "none", formGUID);
  top.getPushNotification().unregister(request);
}

function ebfPushID(){
  return top.getPushNotification().getPushId();
}

function ebfRegisterAnalytics(IdApp){
  window.Tracking.setid(IdApp);
}

function ebfWatchHeading(onSuccessRule, onErrorRule, time) {
  var options = { frequency: time };
  var onSuccess = eval(onSuccessRule);
  var onError = onErrorRule?eval(onErrorRule):null;

  var onSuccessFunc = function(heading) {
    var value = heading && heading.magneticHeading ? heading.magneticHeading : heading;
    window.setTimeout(function() { onSuccess(value); }, 10);
  };

  var onErrorFunc = function(error) {
    if (onError) {
      onError(error.code);
    } else {
      alert('ERROR:'+ error.code);
    }
  };

  var watchID = null;

  if (top.platform == "ioshtml5"){
    watchID = top.getLocationUtils().watchHeading(onSuccessFunc, onErrorFunc);
  }else{
    watchID = top.navigator.compass.watchHeading(onSuccessFunc, onErrorFunc, options);
  }
  return watchID;
}

function ebfWatchPosition(onSuccessRule, onErrorRule, time) {
  var options = { frequency: time, enableHighAccuracy: true };
  var onSuccess = function(lat, long) {
    window.setTimeout(function() {
      var f = eval(onSuccessRule);
      f(lat, long);
    }, 10);

  }

  var onError = null;
  if(onErrorRule) {
    onError = function(lat, long) {
      window.setTimeout(function(e) {
        var f = eval(onErrorRule);
        f(e);
      }, 10);
    };
  }

  if (!top.GPSFUNCTIONS) {
    top.GPSID = -1;
    top.GPSFUNCTIONS = new Array();
  }

  top.GPSID = top.GPSID + 1;
  top.GPSFUNCTIONS.push({success: onSuccess, error: onError})

  var onSuccessFunc = function(position) {
    top.GPSCORDS = position.coords;
    for (var i=0;i<top.GPSFUNCTIONS.length;i++) {
      if (top.GPSFUNCTIONS[i]) {
        top.GPSFUNCTIONS[i].success(position.coords.latitude, position.coords.longitude);
      }
    }
  };

  var onErrorFunc = function(error) {
    for (var i=0;i<top.GPSFUNCTIONS.length;i++) {
      if (top.GPSFUNCTIONS[i] && top.GPSFUNCTIONS[i].error) {
        top.GPSFUNCTIONS[i].error('GPS ERROR: '+error.code);
      }
    }
  };

  if (!top.GPSWATCH) {
    top.GPSWATCH = top.navigator.geolocation.watchPosition(onSuccessFunc, onErrorFunc, options);
  } else {
    if (top.GPSCORDS) {
      setTimeout(function() {
        onSuccess(top.GPSCORDS.latitude, top.GPSCORDS.longitude);
      },100);
    }
  }

  return top.GPSID;
}

function ebfWirelessSendFile(fileName, mimeType) {
  return top.getWirelessUtils().sendFile(fileName, mimeType);
}

function ebfWirelessSendText(subject, content) {
  return top.getWirelessUtils().sendText(subject, content);
}

function ebfWirelessPrintBT(printerName,content) {
  top.getUtils().printTextBT(printerName,content);
}

function ebfAppend() {
  var value = "";

  if (existArgs(arguments)) {
    for (var i = 0; i < arguments.length; i++) {
      if(arguments[i] == null) arguments[i] = '';
      var temp = arguments[i].toString();
      value += temp;
    }
  }

  return value;
}

function ebfArredondaDecimal(value, decimalQtt) {
  value = parseNumeric(value);
  var factor = Math.pow(10, parseNumeric(decimalQtt));
  // Multiplica pelo fator
  value *= factor;
  // Arredonda o valor
  value = Math.round(value);
  // Divide pelo fator
  value /= factor;
  return value;
}

function ebfBinaryToAscii(text) {

  if (text.length % 8 != 0) {
    alert(text + " N„o È um Bin·rio")
    return false;
    last;
  }
  var letasc = ""
  lettot = text.length / 8
  j = 0
  for (i = 0; i < lettot; i++) {

    let = text.substr(j, 8);



    if (let == "01000001") {
      letasc = letasc + 'A'
    }
    if (let == "01000010") {
      letasc = letasc + 'B'
    }
    if (let == "01000011") {
      letasc = letasc + 'C'
    }
    if (let == "01000100") {
      letasc = letasc + 'D'
    }
    if (let == "01000101") {
      letasc = letasc + 'E'
    }
    if (let == "01000110") {
      letasc = letasc + 'F'
    }
    if (let == "01000111") {
      letasc = letasc + 'G'
    }
    if (let == "01001000") {
      letasc = letasc + 'H'
    }
    if (let == "01001001") {
      letasc = letasc + 'I'
    }
    if (let == "01001010") {
      letasc = letasc + 'J'
    }
    if (let == "01001011") {
      letasc = letasc + 'K'
    }
    if (let == "01001100") {
      letasc = letasc + 'L'
    }
    if (let == "01001101") {
      letasc = letasc + 'M'
    }
    if (let == "01001110") {
      letasc = letasc + 'N'
    }
    if (let == "01001111") {
      letasc = letasc + 'O'
    }
    if (let == "01010000") {
      letasc = letasc + 'P'
    }
    if (let == "01010001") {
      letasc = letasc + 'Q'
    }
    if (let == "01010010") {
      letasc = letasc + 'R'
    }
    if (let == "01010011") {
      letasc = letasc + 'S'
    }
    if (let == "01010100") {
      letasc = letasc + 'T'
    }
    if (let == "01010101") {
      letasc = letasc + 'U'
    }
    if (let == "01010110") {
      letasc = letasc + 'V'
    }
    if (let == "01010111") {
      letasc = letasc + 'W'
    }
    if (let == "01011000") {
      letasc = letasc + 'X'
    }
    if (let == "01011001") {
      letasc = letasc + 'Y'
    }
    if (let == "01011010") {
      letasc = letasc + 'Z'
    }
    if (let == "01100001") {
      letasc = letasc + 'a'
    }
    if (let == "01100010") {
      letasc = letasc + 'b'
    }
    if (let == "01100011") {
      letasc = letasc + 'c'
    }
    if (let == "01100100") {
      letasc = letasc + 'd'
    }
    if (let == "01100101") {
      letasc = letasc + 'e'
    }
    if (let == "01100110") {
      letasc = letasc + 'f'
    }
    if (let == "01100111") {
      letasc = letasc + 'g'
    }
    if (let == "01101000") {
      letasc = letasc + 'h'
    }
    if (let == "01101001") {
      letasc = letasc + 'i'
    }
    if (let == "01101010") {
      letasc = letasc + 'j'
    }
    if (let == "01101011") {
      letasc = letasc + 'k'
    }
    if (let == "01101100") {
      letasc = letasc + 'l'
    }
    if (let == "01101101") {
      letasc = letasc + 'm'
    }
    if (let == "01101110") {
      letasc = letasc + 'n'
    }
    if (let == "01101111") {
      letasc = letasc + 'o'
    }
    if (let == "01110000") {
      letasc = letasc + 'p'
    }
    if (let == "01110001") {
      letasc = letasc + 'q'
    }
    if (let == "01110010") {
      letasc = letasc + 'r'
    }
    if (let == "01110011") {
      letasc = letasc + 's'
    }
    if (let == "01110100") {
      letasc = letasc + 't'
    }
    if (let == "01110101") {
      letasc = letasc + 'u'
    }
    if (let == "01110110") {
      letasc = letasc + 'v'
    }
    if (let == "01110111") {
      letasc = letasc + 'w'
    }
    if (let == "01111000") {
      letasc = letasc + 'x'
    }
    if (let == "01111001") {
      letasc = letasc + 'y'
    }
    if (let == "01111010") {
      letasc = letasc + 'z'
    }
    if (let == "00100000") {
      letasc = letasc + ' '
    }

    //Numbers:
    if (let == "00110000") {
      letasc = letasc + '0'
    }
    if (let == "00110001") {
      letasc = letasc + '1'
    }
    if (let == "00110010") {
      letasc = letasc + '2'
    }
    if (let == "00110011") {
      letasc = letasc + '3'
    }
    if (let == "00110100") {
      letasc = letasc + '4'
    }
    if (let == "00110101") {
      letasc = letasc + '5'
    }
    if (let == "00110110") {
      letasc = letasc + '6'
    }
    if (let == "00110111") {
      letasc = letasc + '7'
    }
    if (let == "00111000") {
      letasc = letasc + '8'
    }
    if (let == "00111001") {
      letasc = letasc + '9'
    }

    //Special Characters:
    if (let == "00100001") {
      letasc = letasc + '!'
    }
    if (let == "00100010") {
      letasc = letasc + '\"'
    }
    if (let == "00100011") {
      letasc = letasc + '#'
    }
    if (let == "00100100") {
      letasc = letasc + '$'
    }
    if (let == "00100101") {
      letasc = letasc + '%'
    }
    if (let == "00100110") {
      letasc = letasc + '&'
    }
    if (let == "00100111") {
      letasc = letasc + '\''
    }
    if (let == "00101000") {
      letasc = letasc + '('
    }
    if (let == "00101001") {
      letasc = letasc + ')'
    }
    if (let == "00101010") {
      letasc = letasc + '*'
    }
    if (let == "00101011") {
      letasc = letasc + '+'
    }
    if (let == "00101100") {
      letasc = letasc + ','
    }
    if (let == "00101101") {
      letasc = letasc + '-'
    }
    if (let == "00101110") {
      letasc = letasc + '.'
    }
    if (let == "00101111") {
      letasc = letasc + '/'
    }
    if (let == "00111010") {
      letasc = letasc + ':'
    }
    if (let == "00111011") {
      letasc = letasc + ';'
    }
    if (let == "00111100") {
      letasc = letasc + '<'
    }
    if (let == "00111101") {
      letasc = letasc + '='
    }
    if (let == "00111110") {
      letasc = letasc + '>'
    }
    if (let == "00111111") {
      letasc = letasc + '?'
    }
    if (let == "01000000") {
      letasc = letasc + '@'
    }
    if (let == "01011011") {
      letasc = letasc + '['
    }
    if (let == "01011100") {
      letasc = letasc + '\\'
    }
    if (let == "01011101") {
      letasc = letasc + ']'
    }
    if (let == "01011110") {
      letasc = letasc + '^'
    }
    if (let == "01011111") {
      letasc = letasc + '_'
    }
    if (let == "01100000") {
      letasc = letasc + '`'
    }
    if (let == "01111011") {
      letasc = letasc + '{'
    }
    if (let == "01111100") {
      letasc = letasc + '|'
    }
    if (let == "01111101") {
      letasc = letasc + '}'
    }
    if (let == "01111110") {
      letasc = letasc + '~'
    }
    if (let == "10000000") {
      letasc = letasc + '?'
    }
    if (let == "10100001") {
      letasc = letasc + '°'
    }
    if (let == "10100010") {
      letasc = letasc + '¢'
    }
    if (let == "10100011") {
      letasc = letasc + '£'
    }
    if (let == "10100100") {
      letasc = letasc + '§'
    }
    if (let == "10100101") {
      letasc = letasc + '•'
    }
    if (let == "10100110") {
      letasc = letasc + '¶'
    }
    if (let == "10100111") {
      letasc = letasc + 'ß'
    }
    if (let == "10100111") {
      letasc = letasc + '®'
    }
    if (let == "10101001") {
      letasc = letasc + '©'
    }
    if (let == "10101010") {
      letasc = letasc + '™'
    }
    if (let == "10101011") {
      letasc = letasc + '´'
    }
    if (let == "10101100") {
      letasc = letasc + '¨'
    }
    if (let == "10101101") {
      letasc = letasc + '≠'
    }
    if (let == "10101110") {
      letasc = letasc + 'Æ'
    }
    if (let == "10101111") {
      letasc = letasc + 'Ø'
    }
    if (let == "10110000") {
      letasc = letasc + '∞'
    }
    if (let == "10110001") {
      letasc = letasc + '±'
    }
    if (let == "10110010") {
      letasc = letasc + '≤'
    }
    if (let == "10110011") {
      letasc = letasc + '≥'
    }
    if (let == "10110100") {
      letasc = letasc + '¥'
    }
    if (let == "10110101") {
      letasc = letasc + 'µ'
    }
    if (let == "10110110") {
      letasc = letasc + '∂'
    }
    if (let == "10110111") {
      letasc = letasc + '∑'
    }
    if (let == "10111000") {
      letasc = letasc + '∏'
    }
    if (let == "10111001") {
      letasc = letasc + 'π'
    }
    if (let == "10111010") {
      letasc = letasc + '∫'
    }
    if (let == "10111011") {
      letasc = letasc + 'ª'
    }
    if (let == "10111100") {
      letasc = letasc + 'º'
    }
    if (let == "10111101") {
      letasc = letasc + 'Ω'
    }
    if (let == "10111110") {
      letasc = letasc + 'æ'
    }
    if (let == "10111111") {
      letasc = letasc + 'ø'
    }
    if (let == "11000000") {
      letasc = letasc + '¿'
    }
    if (let == "11000001") {
      letasc = letasc + '¡'
    }
    if (let == "11000010") {
      letasc = letasc + '¬'
    }
    if (let == "11000011") {
      letasc = letasc + '√'
    }
    if (let == "11000100") {
      letasc = letasc + 'ƒ'
    }
    if (let == "11000101") {
      letasc = letasc + '≈'
    }
    if (let == "11000110") {
      letasc = letasc + '∆'
    }
    if (let == "11000111") {
      letasc = letasc + '«'
    }
    if (let == "11001000") {
      letasc = letasc + '»'
    }
    if (let == "11001001") {
      letasc = letasc + '…'
    }
    if (let == "11001010") {
      letasc = letasc + ' '
    }
    if (let == "11001011") {
      letasc = letasc + 'À'
    }
    if (let == "11001100") {
      letasc = letasc + 'Ã'
    }
    if (let == "11001101") {
      letasc = letasc + 'Õ'
    }
    if (let == "11001110") {
      letasc = letasc + 'Œ'
    }
    if (let == "11001111") {
      letasc = letasc + 'œ'
    }
    if (let == "11010000") {
      letasc = letasc + '–'
    }
    if (let == "11010001") {
      letasc = letasc + '—'
    }
    if (let == "11010010") {
      letasc = letasc + '“'
    }
    if (let == "11010011") {
      letasc = letasc + '”'
    }
    if (let == "11010100") {
      letasc = letasc + '‘'
    }
    if (let == "11010101") {
      letasc = letasc + '’'
    }
    if (let == "11010110") {
      letasc = letasc + '÷'
    }
    if (let == "11010111") {
      letasc = letasc + '◊'
    }
    if (let == "11011000") {
      letasc = letasc + 'ÿ'
    }
    if (let == "11011001") {
      letasc = letasc + 'Ÿ'
    }
    if (let == "11011010") {
      letasc = letasc + '⁄'
    }
    if (let == "11011011") {
      letasc = letasc + '€'
    }
    if (let == "11011100") {
      letasc = letasc + '‹'
    }
    if (let == "11011101") {
      letasc = letasc + '›'
    }
    if (let == "11011110") {
      letasc = letasc + 'ﬁ'
    }
    if (let == "11011111") {
      letasc = letasc + 'ﬂ'
    }
    if (let == "11100000") {
      letasc = letasc + '‡'
    }
    if (let == "11100001") {
      letasc = letasc + '·'
    }
    if (let == "11100010") {
      letasc = letasc + '‚'
    }
    if (let == "11100011") {
      letasc = letasc + '„'
    }
    if (let == "11100100") {
      letasc = letasc + '‰'
    }
    if (let == "11100101") {
      letasc = letasc + 'Â'
    }
    if (let == "11100110") {
      letasc = letasc + 'Ê'
    }
    if (let == "11100111") {
      letasc = letasc + 'Á'
    }
    if (let == "11101000") {
      letasc = letasc + 'Ë'
    }
    if (let == "11101001") {
      letasc = letasc + 'È'
    }
    if (let == "11101010") {
      letasc = letasc + 'Í'
    }
    if (let == "11101011") {
      letasc = letasc + 'Î'
    }
    if (let == "11101100") {
      letasc = letasc + 'Ï'
    }
    if (let == "11101101") {
      letasc = letasc + 'Ì'
    }
    if (let == "11101110") {
      letasc = letasc + 'Ó'
    }
    if (let == "11101111") {
      letasc = letasc + 'Ô'
    }
    if (let == "11110000") {
      letasc = letasc + ''
    }
    if (let == "11110001") {
      letasc = letasc + 'Ò'
    }
    if (let == "11110010") {
      letasc = letasc + 'Ú'
    }
    if (let == "11110011") {
      letasc = letasc + 'Û'
    }
    if (let == "11110100") {
      letasc = letasc + 'Ù'
    }
    if (let == "11110101") {
      letasc = letasc + 'ı'
    }
    if (let == "11110110") {
      letasc = letasc + 'ˆ'
    }
    if (let == "11110111") {
      letasc = letasc + '˜'
    }
    if (let == "11111000") {
      letasc = letasc + '¯'
    }
    if (let == "11111001") {
      letasc = letasc + '˘'
    }
    if (let == "11111010") {
      letasc = letasc + '˙'
    }
    if (let == "11111011") {
      letasc = letasc + '˚'
    }
    if (let == "11111100") {
      letasc = letasc + '˚'
    }
    if (let == "11111101") {
      letasc = letasc + '˝'
    }
    if (let == "11111110") {
      letasc = letasc + '˛'
    }
    if (let == "11111111") {
      letasc = letasc + 'ˇ'
    }
    if (letasc == "") {
      alert("not found")
      break;
    }
    j = j + 8
  }
  return letasc;
}

function ebfCaptureMedia(onSuccessRule, onErrorRule, mediaType) {
  var onSuccess = eval(onSuccessRule);
  var onError = onErrorRule?eval(onErrorRule):null;

  var onSuccessFunc = function(mediaFiles) {
    if (mediaFiles.length > 0) {
      onSuccess(mediaFiles[0].fullPath);
    }
  };

  var onErrorFunc = function(error) {
    if (onError) {
      onError(error.code);
    } else {
      alert('ERROR:'+ error.code);
    }
  };

  if (mediaType == 'video' || mediaType == 'vÌdeo') {
    top.navigator.device.capture.captureVideo(onSuccessFunc, onErrorFunc, {limit: 1});
  } else if (mediaType == 'audio' || mediaType == '·udio') {
    top.navigator.device.capture.captureAudio(onSuccessFunc, onErrorFunc, {limit: 1});
  } else {
    top.navigator.device.capture.captureImage(onSuccessFunc, onErrorFunc, {limit: 1});
  }

}

function ebfChangeComponentValueOtherForm(frm, comName, value) {
  guid = ebfGetSessionAttribute(frm,false);
  if(guid) {
    formedit = ebfMapGetObject(guid,'edit');
    frm = formedit ? formedit : frm;
  }
  if (top.viewsByGuid[frm]) {
    top.callFunction(frm , 'ebfFormChangeComponentValue', [comName, value]);
  } else {
    alert('O componente "' + comName+ '" n„o est· em modo de alteraÁ„o.');
  }
}

function ebfCloneComponent(componentName, name) {
  var component = $c(componentName);
  var newComponent = component.cloneNode(true);
  newComponent.id = name;
  newComponent.className = newComponent.className + ' ' + componentName;
  components.push(name);
  component.parentNode.appendChild(newComponent);
}

function ebfCloseForm() {
  top.closeView(formGUID);
}

function ebfCloseProgressBar() {
  var div = document.getElementById("divProgressBar");
  div.parentNode.removeChild(div);
}

function ebfComboClean(com){
  $(com).innerHTML = '<option value=""></option>';
}

function ebfComboPut(objName, key, value) {
  var obj = $(objName);
  var opt = document.createElement('option');
  opt.innerHTML = value;
  opt.value = key;
  obj.appendChild(opt)
}

function ebfComponentEventAssociate(componentName, eventName, ruleName, ruleParams) {
  var comp = $(componentName);
  var _ruleName = ruleName;
  var _ruleParams = ruleParams;
  comp[eventName] = function() {
    eval(_ruleName).apply(window, _ruleParams);
  }
}

function ebfComponentExists(componentName) {
  if($c(componentName))
  return true;
  return false;
}

String.prototype.replaceAll = function(de, para){
  var str = this;
  var pos = str.indexOf(de);
  while (pos > -1){
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return (str);
}

function ebfReplaceMascara(mask){

  mask = (mask.indexOf('0.00') > -1) ? mask.replace("0.00", "#.##" ) : mask;
  mask = (mask.indexOf('.00') > -1) ? "###,###,###,###.##" : mask;
  if (mask.indexOf('$') > -1) {
    decimalLength = (mask.length > 1) ? parseInt(mask.replace("$", "")) : 2;
    mask = "###,###,###,###.";
    for (i = 0; i < decimalLength; i++)
    {
      mask += "#";
    }
  }
  if (mask.toUpperCase() == "IP") {
    mask = "###.###.###.###";
  }
  if ((mask.indexOf('.') > -1) && (mask.indexOf(',') > -1) && (mask.indexOf('.') > mask.indexOf(',')))  {
    mask = mask.replaceAll(",", "GROUPING_POINT" );
    mask = mask.replaceAll(".", "DECIMAL_POINT" );
    mask = mask.replaceAll("GROUPING_POINT", top.GROUPING_POINT );
    mask = mask.replaceAll("DECIMAL_POINT", top.DECIMAL_POINT );
  }

  return mask;
}

function ebfComponentSetMask(form,comp,mask,type) {
  if(mask=="(##) ####-####"){ mascaraTelefone(comp); return}
  if (typeof comp == 'string') { comp = $c(comp); }
  comp.onfocus = function (){comp._oldValue=comp.value;};
  comp.onblur = function () {if(comp._oldValue!=comp.value && comp.onchange) { comp.onchange(); }};
  if (comp.value.length > 0)
  comp.value = preencheCampoMascara(comp.value, mask);

  if (comp) {
    mask = ebfReplaceMascara(mask);
    if (type == "Inteiro") {
      $addEvent(comp, "onchange", "mascara(this,inteiro)", true);
    } else if ((type == "N˙mero") && (mask.length == 0)) {
      $addEvent(comp, "onchange", "mascara(this,numerico)", true);
      $addEvent(comp, "onkeyup", "if (BackSpace(event)){ mascara(this,numerico); } else { return false }", true);
    } else if (((mask.indexOf('.') > -1) && (mask.indexOf(',') > -1)) || (type == "N˙mero" )) {
      $addEvent(comp, "onchange", "mascaraPadrao(this, formataCampoInverso, '"+mask+"');", true);
      $addEvent(comp, "onkeyup", "if (BackSpace(event)){ mascaraPadrao(this, formataCampoInverso, '"+mask+"'); } else { return false }", true);
      comp.setAttribute('maxlength',mask.length);
    } else if (type == "Moeda") {
      comp.setAttribute('maxlength','30');
      $addEvent(comp, "onchange", "mascara(this,moeda)", true);
      $addEvent(comp, "onkeyup", "if (BackSpace(event)){ mascara(this,moeda); } else { return false }", true);
    } else if (mask.length > 0) {
      $addEvent(comp, "onchange", "mascaraPadrao(this, formataCampo, '"+mask+"');", true);
      if ((mask.indexOf("U>") == -1) && (mask.indexOf("l>") == -1))
      comp.setAttribute('maxlength',mask.length);
    }
  }
}

function ebfConcat() {
  var value = "";
  if (existArgs(arguments)) {
    for (var i = 0; i < arguments.length; i++) {
      if(arguments[i] == null) arguments[i] = '';
      var temp = arguments[i].toString();
      value += temp;
    }
  }
  return value;
}

function ebfConfirm (src) {
  if (top.platform == "ioshtml5") {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var isConfirm = window.frames[0].window.confirm(src);
    iframe.parentNode.removeChild(iframe);
    return isConfirm;
  } else {
    return window.confirm(src);
  }
}

function ebfConnectionType() {
  return (top.getNetworkUtils().networkstatus()).toString();
}

function ebfConsumeWsSsl(urlPost, postData, contentType){
  return top.getNetworkUtils().postDataHttps(urlPost, postData, contentType);
}

function ebfConvertJSONToVariant(value){
  if (typeof value == 'string') {
    var json = JSON.parse(value);
    return new MakerMap().getInstance(json);
  }
  if (typeof value == 'object') {
    return new MakerMap().getInstance(value);
  }
  return new MakerMap().getInstance(ebfToString(value));
}
function JSONInstance(value) {
  return value;
}

function findNode(node,name) {
  var r = null;
  var id = node.id || node.name;
  if(id == name)
  r = node;
  if(!r){
    for(var i = 0;i < node.childNodes.length;i++){
      r = findNode(node.childNodes.item(i),name);
      if(r) break;
    }
  }
  return r;
}

function ebfCreateProgressBar(message) {
  var div =  document.createElement("div");
  div.setAttribute('id', 'divProgressBar');
  div.className = 'progressBar';
  var sizeWidth = window.innerWidth * 0.8;

  div.innerHTML = '<table align="center" width="'+sizeWidth+'" height="40" bgColor="#FFFFFF" style="border:1px solid #666666" celspacing="0" cellpadding="0" id="progressBar">'
  +'    <tr>'
  +'       <td width="100%" align="center" valign="middle" bgcolor="#FFFFFF">'
  +'          <label id="Message" align="center">' + message + '</label>'
  +'       </td>'
  +'    </tr><tr>'
  +'       <td>'
  +'          <img src="res/image/progress.gif" name="Bar" width="0" height="10" id="Bar"/>'
  +'       </td>'
  +'    </tr>'
  +'</table>';

  this.progressBar = findNode(div, 'progressBar');
  this.progressBar_Bar = findNode(div, 'Bar');
  document.body.appendChild(div);
}

function ebfCSSImportContent(content) {
  var lnk = document.createElement('style');
  lnk.setAttribute('type', "text/css" );
  if (lnk.styleSheet) {
    lnk.styleSheet.cssText = content;
  } else {
    lnk.innerHTML = content;
  }
  document.getElementsByTagName('head')[0].appendChild(lnk);
}

function ebfDateDate() {
  var data = null;
  if (existArgs(arguments)) {
    var temp = toDate(arguments[0]);
    temp.setHours(0);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    data = temp;
  }
  return data;
}

function ebfDateDay() {
  var value = 0;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data) {
      value = data.getDate();
    }
  }
  return completeZero(value);
}

function ebfDateHour() {
  var hora = -1;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data) {
      hora = data.getHours();
    }
  }
  return completeZero(hora);
}

function ebfDateIncDay() {
  var data = null;
  if (existArgs(arguments)) {
    data = toDate(arguments[0]);
    var value = arguments[1];
    if (data) {
      data.setDate(parseInt(data.getDate()) + parseInt(value));
    }
  }
  return data;
}

function ebfDateMinute() {
  var minute = -1;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data != null) {
      minute = data.getMinutes();
    }
  }
  return completeZero(minute);
}

function ebfDateMonth() {
  var value = 0;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data) {
      value = data.getMonth() + 1;
    }
  }
  return completeZero(value);
}

function ebfDateSecond() {
  var second = -1;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data != null) {
      second = data.getSeconds();
    }
  }
  return completeZero(second);
}

function ebfDateToday() {
  return( new Date().setHours(new Date().getHours()-1));
}

function ebfDateYear() {
  var value = 0;
  if (existArgs(arguments)) {
    var data = toDate(arguments[0]);
    if (data) {
      value = data.getFullYear();
    }
  }
  return value;
}

function ebfDateYearDifference() {
  var diff = 0;
  if (existArgs(arguments)) {
    var data1 = toDate(arguments[0]);
    var data2 = toDate(arguments[1]);

    if (data1 != null && data2 != null) {
      diff = data1.getFullYear() - data2.getFullYear();
      if (data2 < data1) {
        if (data2.getMonth() > data1.getMonth()){
          diff--;
        } else if(data2.getMonth() == data1.getMonth){
          if(data2.getDate() > data1.getDate()){
            diff--;
          }
        }
      } else {
        if(data2.getMonth() < data1.getMonth()){
          diff++;
        } else if(data2.getMonth() == data1.getMonth()){
          if (data2.getDate() < data1.getDate()) {
            diff++;
          }
        }
      }
    }
  }
  return diff;
}

function ebfDeviceAlert(message, onSuccessRule, title, buttonName, params) {
  var onSuccess = eval(onSuccessRule);

  var onSuccessFunc = function() {
    onSuccess.apply(window, params);
  };

  top.navigator.notification.alert(
    message,
    onSuccessFunc,
    title,
    buttonName
  );

}

function ebfDeviceConfirm(message, onSuccessRule, title, buttonName, params) {
  var onSuccess = eval(onSuccessRule);

  var onSuccessFunc = function(button) {
    var newParams = new Array();
    newParams.push(button);
    if (params) {
      for (var i = 0;i<params.length;i++) {
        newParams.push(params[i]);
      }
    }
    onSuccess.apply(window, newParams);
  };

  top.navigator.notification.confirm(
    message,
    onSuccessFunc,
    title,
    buttonName
  );

}

function ebfDownloadURLContent(url, fileName) {
  var file = ebfFileOpenToWrite(fileName, false);
  var content = ebfGetURLContent(url);
  ebfFileAppend(file, content);
  ebfFileClose(file);
}

function ebfEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function ebfExecuteJS(content) {
  var func = new Function(content);
  return func.call(this);
}

function ebfFileAppend(fileRef, content) {
  return top.getFileManager().fileAppend(fileRef, content);
}

function ebfFileBase() {
  return top.getFileManager().fileDataDir();
}

function ebfFileClose(fileName) {
  return top.getFileManager().fileClose(fileName);
}

function ebfFileEoF(fileName) {
  return top.getFileManager().fileEoF(fileName);
}

function ebfFileMove(pathFile, newFile) {
  return top.getFileManager().fileMoveTo(pathFile, newFile);
}

function ebfFileOpenToRead(fileName) {
  return top.getFileManager().fileOpenReadOnly(fileName);
}

function ebfFileOpenToWrite(fileName, append) {
  return (top.getFileManager().fileOpenWrite(fileName, append)).toString();
}

function ebfFileReadAll(fileName) {
  return top.getFileManager().fileReadAllText(fileName);
}

function ebfFileReadAllToBytes(fileName) {
  return top.getFileManager().fileReadAllBytes(fileName);
}

function ebfFileReadLine(fileName) {
  return top.getFileManager().fileReadLine(fileName);
}

function ebfBase64ToBinary(content) {
  return top.getFileManager().fileBase64ToBinary(content);
}

function ebfFileRename(oldPath, newPath) {
  return top.getFileManager().fileRename(oldPath, newPath);
}

function ebfFlowExecute(ruleName, params) {
  ruleName = (ruleName.indexOf(" ") > -1) ? reduceVariable(ruleName) : ruleName;
  return eval(ruleName).apply(window, params);
}

function ebfFormatDateTime(value, mask){
  var date = toDate(value);
  var datemask;
  if (isNullable(mask)) {
    mask = "dd/MM/yyyy";
  }
  if(!isNullable(date)){
    datemask = ebfReplace(mask, 'yyyy', ebfDateYear(date));
    datemask = ebfReplace(datemask, 'MM',ebfDateMonth(date));
    datemask = ebfReplace(datemask, 'M', parseInt(ebfDateMonth(date)));
    datemask = ebfReplace(datemask, 'dd',ebfDateDay(date));
    datemask = ebfReplace(datemask, 'd', parseInt(ebfDateDay(date)));
    datemask = ebfReplace(datemask, 'a', parseInt(ebfDateHour(date)) < 12 ? 'AM' : 'PM');
    datemask = ebfReplace(datemask, 'hh',ebfDateHour(date));
    datemask = ebfReplace(datemask, 'H', parseInt(ebfDateHour(date)));
    datemask = ebfReplace(datemask, 'h', parseInt(ebfDateHour(date)) <= 12 ? ebfDateHour(date) : ebfDateHour(date) - 12);
    datemask = ebfReplace(datemask, 'K', parseInt(ebfDateHour(date)) <= 12 ? ebfDateHour(date) -1 : ebfDateHour(date) - 13);
    datemask = ebfReplace(datemask, 'k', parseInt(ebfDateHour(date))+1);
    datemask = ebfReplace(datemask, 'mm',ebfDateMinute(date));
    datemask = ebfReplace(datemask, 'm', parseInt(ebfDateMinute(date)));
    datemask = ebfReplace(datemask, 'ss',ebfDateSecond(date));
    datemask = ebfReplace(datemask, 's', parseInt(ebfDateSecond(date)));

    return datemask;
  }
}

function ebfFormChangeComponentValue(comName, value) {

  var com = $(comName);
  if (com && value != undefined) {
    var type = com.tagName;
    var webmask = com.getAttribute('webmask');
    var comType = com.getAttribute('type');

    if (webmask && (comType != 'date' && comType != 'datetime' && comType != 'time')) {
      if(webmask.indexOf('DD/MM/YYYY') != -1 || webmask.indexOf('##/##/####') != -1 ){
        value = ebfFormatDateTime(value, convertWebmaskToDateMask(webmask));
      }else{
        if(com.getAttribute('masktype') && (com.getAttribute('masktype') == "N˙mero") && (webmask.indexOf('.') > -1)) {
          var decimalLength = webmask.length - webmask.indexOf('.');
          value = parseFloat(value);
          value = value.toPrecision(ebfToString(value).indexOf('.') != -1 ? ebfToString(value).indexOf('.') + decimalLength : ebfToString(value).length);
        } else {
          value = ebfToString(value)
        }
        value = preencheCampoMascara(value, webmask);
      }
    } else if (com.getAttribute('masktype')) {
      if (com.getAttribute('masktype') == "N˙mero")
      value = numerico(ebfReplaceAll(value, ".", top.DECIMAL_POINT));
    }

    if (type && type.toUpperCase() == 'LABEL') {
      var labeltype = com.getAttribute("type");
      if(labeltype == 'date'){
        com.innerHTML = ebfFormatDateTime(value, 'dd/MM/yyyy');
        com.value = ebfFormatDateTime(value, 'dd/MM/yyyy');
      }else if(labeltype == 'datetime'){
        com.innerHTML = ebfFormatDateTime(value, 'dd/MM/yyyy hh:mm:ss');
        com.value = ebfFormatDateTime(value, 'dd/MM/yyyy hh:mm:ss');
      }else if(labeltype == 'time'){
        com.innerHTML = ebfFormatDateTime(value, 'hh:mm:ss');
        com.value = ebfFormatDateTime(value, 'hh:mm:ss');
      }else{
        com.innerHTML = ebfToString(value);
        com.value = ebfToString(value);
      }
    } else if(type && type.toUpperCase() == 'FIELDSET'){
      value = ebfToString(value);
      var option = com.getElementsByTagName('input');
      for(var i = 0; i < option.length ; i++){
        if(option[i].value.toUpperCase() == value.toUpperCase())
        option[i].checked = true;
      }
    } else if(com.type && com.type.toUpperCase() == 'CHECKBOX') {
      if (com.getAttribute('valuecheck') == ebfToString(value) || (ebfToString(value).toLowerCase() == 'true') || (ebfToString(value).toLowerCase() == '1'))
      com.checked = true;
      if (com.getAttribute('valueuncheck') == ebfToString(value) || (ebfToString(value).toLowerCase() == 'false') || (ebfToString(value).toLowerCase() == '0'))
      com.checked = false;
    } else if (comType && (comType == 'date' || comType == 'datetime' || comType == 'time' ) && !isNullable(value)) {
      if (webmask){
        var mask = ebfFormatDateTime(value, convertWebmaskToDateMask(webmask));
      }
      if (comType == 'date') {
        if(trim(value) != "" && value !="undefined"){
          com.value = ebfFormatDateTime(value, mask ? mask : 'dd/MM/yyyy');
          com.dateValue = toDate(value).getTime();
        }else{
          com.value = null;
          com.dateValue = null;
        }
      }
      if (comType == 'time') {
        if(trim(value) != "" && value !="undefined"){
          com.value = ebfFormatDateTime(value, mask ? mask : 'hh:mm:ss');
          com.dateValue = toDate(value).getTime();
        }else{
          com.value = null;
          com.dateValue = null;
        }
      }
      if (comType == 'datetime') {
        if(trim(value) != "" && value !="undefined"){
          com.value = ebfFormatDateTime(value, mask ? mask : 'dd/MM/yyyy hh:mm:ss');
          com.dateValue = toDate(value).getTime();
        }else{
          com.value = null;
          com.dateValue = null;
        }
      }
    } else if (com && type.toUpperCase() == 'IMG') {
      setTimeout(function() {
        if (value == "" || value == "undefined") {
          com.src = 'res/image/empty.gif';
        } else {
          com.src = value;
        }
      }, 0);
    } else if (value instanceof Date) {
      if (ebfDateHour(value)== '00' && ebfDateMinute(value) == '00' && ebfDateSecond(value) == '00') {
        com.value = ebfFormatDateTime(value, 'dd/MM/yyyy');
      } else {
        com.value = ebfFormatDateTime(value, 'dd/MM/yyyy hh:mm:ss');
      }

    }else if(type && type.toUpperCase() == 'SELECT' && trim(value) == ""){
      com.value = "";
      com.dateValue = null;

    } else {
      if(trim(value) != "" && value !="undefined"){
        value = ebfToString(value);
        com.value = value;
        com.setAttribute('value', value);
      }else{
        com.value = "";
        com.dateValue = null;
      }
    }
  }
}

function ebfFormGetComponentValue(comName) {
  var com = $(comName);
  var type = com ? com.tagName : "" ;
  if (com) {
    if(type && type.toUpperCase() == 'FIELDSET'){
      var option = com.getElementsByTagName('input');
      for(var i = 0; i < option.length ; i++){
        if(option[i].checked)
        return option[i].value;
      }
    }
    if(com.type && com.type.toUpperCase() == 'CHECKBOX'){
      if(com.checked)
      return com.getAttribute('valuecheck');
      if (!com.checked)
      return com.getAttribute('valueuncheck');
    }
    if(type && type.toUpperCase() == 'IMG') {
      if(com.src.indexOf('res/image/empty.gif') != -1) {
        return '';
      } else {
        return com.src;
      }
    }
    if (type && (com.type == 'date' || com.type == 'datetime' || com.type == 'time')) {
      return (isNullable(com.dateValue) ? "" : new Date(toLong(com.dateValue)));
    } else {
      if (com.getAttribute('recordMask') == "true") {
        return com.value;
      } else {
        if (com.getAttribute("masktype") == "N˙mero")
        return com.value;
        return com.value;
      }
    }
  }
}

function ebfFormGetHeight() {
  if (existArgs(arguments)) {
    var component = $c(arguments[0]);
    if (component) {
      return component.clientHeight;
    }
  }
}

function ebfFormGetWidth() {
  if (existArgs(arguments)) {
    var component = $c(arguments[0]);
    if (component) {
      return component.clientWidth;
    }
  }
}

function ebfFormIsInEditMode() {
  var FormMode =  ebfRequestGetParameter('mode');
  if (FormMode == 2 ) {
    return true;
  } else {
    return false;
  }
}

function ebfFormIsInInsertMode() {
  var FormMode =  ebfRequestGetParameter('mode');
  if (FormMode == 1 ) {
    return true;
  } else {
    return false;
  }
}

function ebfFormNextTab() {
  ebfFormGoTab(1);
}

function ebfFormOpacityComponent(component, nivel){
  if(component != null){
    var object = $(component);
    object.style.opacity = nivel;
  }
}

function ebfFormOpenFilterAndMode(frm, filter, mode, onclose) {
  try {
    mode = parseInt(mode);
  } catch(ex) {
    mode = -1
  }

  if (isNullable(mode)) {
    mode = -1
  }
  parent.openView(GetSystemProperties().get("forms").get(frm).get("name") + '.html'+'?filter='+(filter?escape(filter):'')+'&mode='+mode+'&disabled='+(filter?((filter.split(';').pop() === 'disabled')?'true':'false'):''), frm, onclose);
}

function ebfFormOpenFilteredForm(frm, filter, onclose) {
  top.openView(GetSystemProperties().get("forms").get(frm).get("name") + '.html'+'?filter='+(filter?escape(filter):''), frm, onclose);
}

function ebfFormOpenForm(guid, onclose){
  top.openView(GetSystemProperties().get("forms").get(guid).get("name") + '.html', guid, onclose);
}

function ebfFormOpenTab(element){
  if (isNullOrEmpty(element))
  return;
  var tabListItems = document.getElementById('tabs').childNodes;
  for ( var i = 0; i < tabListItems.length; i++ ) {
    if ( tabListItems[i].nodeName == "LI" ) {
      div = document.getElementById(tabListItems[i].getAttribute("name"));
      if(tabListItems[i].innerHTML == element){
        div.setAttribute("style", "display: block");
        tabListItems[i].setAttribute("class", "selected");
        iframes = div.getElementsByTagName("iframe");
        for(var j = 0; j < iframes.length; j++){
          iframes[j].contentWindow.document.body.style.display = "block";
        }
      }else{
        div.setAttribute("style", "display: none");
        tabListItems[i].setAttribute("class", "unselected");
        iframes = div.getElementsByTagName("iframe");
        for(var j = 0; j < iframes.length; j++){
          iframes[j].contentWindow.document.body.style.display = "none";
        }
      }
    }
  }
  setTimeout(function() {
    if (grids) {
      for (var i=0;i<grids.length;i++) {
        if (grids[i] && grids[i].clientHeight) {
          grids[i].refresh();
        }
      }
    }
  }, 0);
}

function ebfFormPreviousTab() {
  ebfFormGoTab(-1);
}

function ebfFormRefreshComponent(component) {
  if (document.querySelector('#'+component).refresh)
  document.querySelector('#'+component).refresh();
}

function ebfFormSetFocus(componentName) {
  var comp = $(componentName);
  comp.focus();
}

function ebfFormSetHeight() {
  if (existArgs(arguments)) {
    var component = $c(arguments[0]);
    if (component) {
      component.style.height = ebfToString(arguments[1]).indexOf('%') != -1 ? arguments[1] : arguments[1]+'px';
    }
  }
}

/*function ebfFormSetLookupName(form, com, newValue){
var lk = $c(com);
lk.value = newValue;
}*/

function ebfFormSetPosition(comp,x,y){
  var c;
  if(comp){
    c = $(comp);
    if (c){
      c.style.position="absolute";
      c.style.left=(x + 'px');
      c.style.top=(y + 'px');
    }
  }
}

function ebfFormSetVisible(com, visible){
  var labelcomponent;
  if(visible){
    $c(com).style.display  = "block";
    $c(com).style.visibility  = "visible";
    labelcomponent = $c('label'+com);
    if(labelcomponent){
      labelcomponent.style.display  = "block";
      $c(com).style.visibility  = "visible";
    }
      if($c(com).children.length && $c(com).children[0].toString() == "[object HTMLIFrameElement]"){
          $c(com).children[0].style.display = "block";
          $c(com).children[0].contentWindow.document.body.style.display = "block";
      }
  } else{
    $c(com).style.display  = "none";
    $c(com).style.visibility  = "hidden";
    var labelcomponent = $c('label'+com);
    if(labelcomponent){
      labelcomponent.style.display  = "none";
      $c(com).style.visibility  = "hidden";
    }
      if($c(com).children.length && $c(com).children[0].toString() == "[object HTMLIFrameElement]"){
          $c(com).children[0].style.display = "none";
          $c(com).children[0].contentWindow.document.body.style.display = "none";
      }
  }
}

function ebfFormSetWidth() {
  if (existArgs(arguments)) {
    var component = $c(arguments[0]);
    if (component) {
      component.style.width = ebfToString(arguments[1]).indexOf('%') != -1 ? arguments[1] : arguments[1]+'px';
    }
  }
}

function ebfFormZindex() {
  if (arguments != null || arguments != undefined || typeof arguments[0] != 'undefined') {
    var component = $(arguments[0]);
    if (component) {
      component.style.zIndex = arguments[1];
    }
  }
}

function ebfFrameOpenForm(form, componentName, formTarget, scrollbars){
  var url = GetSystemProperties().get("forms").get(formTarget).get("name") + '.html';
  ebfFrameOpenURL(form, componentName, url, scrollbars)
}

function ebfContainerOpenForm(form, componentName, formTarget, filter, mode, scrollbars){
  try {
    mode = parseInt(mode);
  } catch(ex) {
    mode = -1
  }

  if (isNullable(mode)) {
    mode = -1
  }

  var url = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/www/";

  if(typeof componentName === "string"){
    component = document.getElementById(componentName);
  }else{
    component = componentName;
  }

  url += GetSystemProperties().get("forms").get(formTarget).get("name") + '.html' + '?filter=' + (filter ? escape(filter) :'' ) + '&mode=' + mode;

  if (component) {
    var iframe = null;

    var iframes = component.getElementsByTagName("iframe");
    if (iframes.length > 0) {
      iframe = iframes[0];

      if (iframe.contentWindow.formOnUnLoadAction) {
        iframe.contentWindow.formOnUnLoadAction();
      }

    }else{
      var id = 'URLFrame' + parseInt((Math.random() * 9999999));
      iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.id = id;
      iframe.name = id;
      iframe.style.border = "none";
      iframe.width = '100%';
      iframe.height = '100%';
    }

    if (iframe.src != url) {
      iframe.src = url
    }

    iframe.style.scrollbars = scrollbars;
    component.appendChild(iframe);
  }
}

function ebfFrameOpenURL(formName, componentName, url, scroll) {
  var component = document.getElementById(componentName);
  if (component) {
    var id = 'URLFrame' + parseInt((Math.random() * 9999999));
    var iframe;
    iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.id = id;
    iframe.name = id;
    iframe.width = '100%';
    iframe.height = '100%';
    var moldura = 'moldura' + parseInt((Math.random() * 9999999));
    if(scroll){
      iframe.scrolling = 'yes';
    }else{   
      iframe.scrolling = 'no';
    }
	component.innerHTML = "";
    component.appendChild(iframe);
  }
  return null;
}

function ebfGenerateGUID_S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function ebfGenerateGUID() {
  var bloc1 = ebfGenerateGUID_S4() + ebfGenerateGUID_S4();
  var bloc2 = ebfGenerateGUID_S4();
  var bloc3 = ebfGenerateGUID_S4();
  var bloc4 = ebfGenerateGUID_S4();
  var bloc5 = ebfGenerateGUID_S4() + ebfGenerateGUID_S4() + ebfGenerateGUID_S4();

  return (bloc1 + "-" + bloc2 + "-" + bloc3 + "-" + bloc4 + "-" + bloc5 + "".toUpperCase());
}

function ebfGetBarCode(flowSucces, flowError, type){
}

function ebfGetElementFromList() {
  var value = null;
  if (existArgs(arguments)) {
    var position = parseInt(arguments[1]) - 1;
    position = Math.max(0, position);
    position = Math.min(position, (arguments[0].length - 1));
    value = arguments[0][position];
  }
  return value;
}

function ebfListCreate() {
  return new Array();
}

function ebfGetGPSCoords(success, fail){
  top.getPosition(formGUID, success, fail);
}

function ebfGetGUIDActualForm() {
  return $mainform().formGUID;
}

function ebfScanCard(onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getCameraUtils().scanCard(formGUID, onSuccess, onSuccessParams, onFail, onFailParams);
}

function ebfGetImageCam(success, fail, quality, options) {
  top.getCameraUtils().open(success, fail, quality, formGUID, options);
}

function getPictureFromGallery(compImg, sucessCallback, failCallback, quality) {
  var pictureSource;
  var destinationType;
  var imageURI;

  top.navigator.camera.compImg=compImg;
  pictureSource = top.navigator.camera.PictureSourceType;
  destinationType = top.navigator.camera.DestinationType;

  var sucess = function(imageData){
    if(isNullOrEmpty(compImg)){
      eval(sucessCallback).apply(this,[imageData]);
      return ;
    }

    if (imageData.substring(0,21)=="content://com.android") {
      photo_split = imageData.split("%3A");
      imageURI = "content://media/external/images/media/" + photo_split[1];
    }else{
      if(imageData.indexOf('%3A')!= -1){
        photo_split=imageData.split("%3A");
        imageURI="content://media/external/images/media/"+photo_split[1];
      }else{
        imageURI=imageData;
      }
    }

    var img = imageURI.replace("file://","");
    var lista = imageURI.split("/");
    var image = lista[lista.length - 1];
    var nomeImagem = "MakerMobile_" + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1)+ Math.floor((Math.random() * 10) + 1) + ".jpg";
    var destino = top.path + "/"+ nomeImagem;
    compImg.src = imageURI; compImg.value = imageURI;
    try {
      eval(compImg.getAttribute("onchange"));
    } catch (e) {
      notifyError(e);
    }
  }; //fim var sucess;

  var fail = function(e){
    if(failCallback){
      eval(failCallback).apply(this,[e]);
    }
  }; //fim var fail;

  top.navigator.camera.getPicture(sucess , fail, {quality: quality, destinationType: destinationType.FILE_URL, sourceType: pictureSource.PHOTOLIBRARY });
}

function getPictureFromCamera(compImg){
  var pictureSource;
  var destinationType;
  var imageURI;

  top.navigator.camera.compImg = compImg;
  pictureSource = top.navigator.camera.PictureSourceType;
  destinationType = top.navigator.camera.DestinationType;

  var success = function(imageData) {

    if (imageData.substring(0,21)=="content://com.android") {
      photo_split = imageData.split("%3A");
      imageURI = "content://media/external/images/media/" + photo_split[1];
    }else{
      if(imageData.indexOf('%3A')!= -1){
        photo_split = imageData.split("%3A");
        imageURI = "content://media/external/images/media/" + photo_split[1];
      }else{
        imageURI = imageData;
      }
    }

    var img = imageURI.replace("file://","");
    var lista = imageURI.split("/");
    var image = lista[lista.length - 1];
    var nomeImagem = "MakerMobile_" + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1)+ Math.floor((Math.random() * 10) + 1) + ".jpg";
    var destino = top.path + "/"+ nomeImagem;
    compImg.src = imageURI; compImg.value = imageURI;
    //setTimeout(function(){ebfFileMove(img, destino); compImg.src = "../../../Documents/" + nomeImagem; compImg.value = "../../../Documents/" + nomeImagem;},0);

    try {
      eval(compImg.getAttribute("onchange"));
    } catch (e) {
      notifyError(e);
    }
  }; //fim var sucess
  var fail = function(e){
    if(failCallback){
      eval(failCallback).apply(this,[e]);
    }
  }; //fim var fail;

  top.navigator.camera.getPicture(success, fail, {quality: 50, destinationType: destinationType.FILE_URL});

}

function ebfGetImageGallery(sucess) {

  getPictureFromGallery(null, sucess, null, 50);
  return;

}

function ebfGetQrCode(flowSucces, flowError, type){

}

function ebfGenerateQrCode(txt) {
 return top.getQrcodeUtils().generate(txt);
}

function ebfGetSessionAttribute(name, global) {
  return top.getSession(name);
}

function ebfGetTimeFromDataSince70(value){
  return toDate(value).getTime();
}

function ebfGetTimeSince70() {
  var date = new Date();
  return date.getTime();
}

function ebfGetTypePlatform(){
  var platform = top.platform;
  if(platform == "ioshtml5"){
    return "iOS";
  } else if(platform == "androidhtml5"){
    return "Android";
  }
}

function ebfGetURLContent(url) {
  /*var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
  return xmlHttp.responseText; */
  return top.getNetworkUtils().postData(url, "POST", "");
}

function ebfGetWebmask(comp){
  var com = $c(comp);
  if(com){
    var webmask = com.getAttribute('webmask');
    if(webmask){
      return webmask;
    }
  }
  return "";
}

function ebfGroupBoxAddScroll(component,scrollX,scrollY) {
  if($c(component)) {
    //var cdiv = $c(component).div;
    var cdiv = $c(component);
    if (cdiv) {
      cdiv.style.overflowY = ebfTrim(scrollY);
      cdiv.style.overflowX = ebfTrim(scrollX);
    }
  }
}

function ebfGroupBoxClean(formName, componentName) {
  var component = $c(componentName);
  if (component != null)  {
    component.innerHTML = '<label style="background: transparent;">&nbsp;</label>';
    component.innerHTML = "";
  }
}

function ebfHeightWindow(){
  return document.documentElement.clientHeight;
}

function ebfHiddenKeyboard(){
  top.document.activeElement.blur();
}

function ebfHTMLTableCreate(form, componentName, width, height, bgColor, border, borderColor, cellSpace, cellPad, style, scroll){

  //ObtÈm a moldura
  var component = $c(componentName);

  // Verifica se existe a moldura
  if(component){
    var div = component;
    div.innerHTML = "";

    // ObtÈm o id da tabela
    var id = 'table' + parseInt((Math.random() * 9999999));

    //Criar Elementos tbody e table
    var tbody;
    var table;
    tbody = document.createElement("tbody");
    table = document.createElement("table");

    //ObtÈm o tamanho da borda
    var tableBorder;
    if  (!(border) ||  (border < 0)){
      tableBorder = 0;
    } else {
      tableBorder = border;
    }

    //ObtÈm a largura da tabela
    var tableWidth;
    if (!(width) || (width <= 0)){
      tableWidth = component.width;
    } else {
      tableWidth = width;
    }

    //ObtÈm a altura da tabela
    var tableHeight;
    if (!(height) || (height <= 0)){
      tableHeight = component.height;
    } else {
      tableHeight = height;
    }


    //ObtÈm o espaÁamento entre as cÈlulas
    var tableCellSpace;
    if (!(cellSpace) ||  (cellSpace < 0)){
      tableCellSpace = 0;
    } else {
      tableCellSpace = cellSpace;
    }

    //ObtÈm o espaÁamento para as bordas
    var tableCellPad;
    if (!(cellPad) ||  (cellPad < 0)){
      tableCellPad= 0;
    } else {
      tableCellPad= cellPad;
    }

    //Altera os atributos da tabela
    table.setAttribute("id",id);
    table.setAttribute("name",id);
    if(tableWidth) {
      table.setAttribute("width",tableWidth);
    }
    if(tableHeight) {
      table.setAttribute("height",tableHeight);
    }
    table.setAttribute("border",tableBorder);
    table.setAttribute("cellpadding",tableCellSpace);
    table.setAttribute("cellspacing",tableCellPad);
    if (borderColor)
    table.setAttribute("borderColor",borderColor);

    if (bgColor)
    table.setAttribute("bgColor",bgColor);

    this._setStyle = function( object, styleText ) {
      if( object.style.setAttribute ) {
        object.style.setAttribute("cssText", styleText );
      } else {
        object.setAttribute("style", styleText );
      }
    }

    if (style) {
      if (style.indexOf(":") == -1) {
        table.className = style;
      } else {
        this._setStyle(table, style);
      }
    }

    table.appendChild(tbody);
    div.appendChild(table);
    if (scroll){
      div.style.overflow = "auto";
    } else {
      div.style.overflow = "hidden";
    }
    document.ebfHTMLTable = id;
    return id;
  }
}

function ebfHTMLTableCreateCell(form, row, width, align, bgColor, borderColor, rowspan, colspan, text, style){

  if (!row){
    if (document.ebfHTMLTableRow){
      row = document.ebfHTMLTableRow;
    }else{
      return;
    }
  }

  //ObtÈm a linha
  var component = $(row);

  // Verifica se existe a tabela
  if  (component){
    // ObtÈm o id da cÈlula
    var id = 'td' + parseInt((Math.random() * 9999999));

    //Criar Elemento td
    var td;
    if (top.IE) {
      td = document.createElement("<td>");
    }else{
      td = document.createElement("td");
    }

    //ObtÈm a largura da cÈlula
    var cellWidth;
    if ((width) && (width <= 0)){
      cellWidth= 1;
    } else {
      cellWidth= width;
    }

    //Altera os atributos da cÈlula
    td.setAttribute("id",id);
    td.setAttribute("width",cellWidth);

    if ((align == 'left') || (align == 'center') || (align == 'right'))
    td.setAttribute("align",align);

    if ((colspan) && (colspan > 1))
    td.setAttribute("colSpan",colspan);

    if ((rowspan) && (rowspan> 1))
    td.setAttribute("rowSpan",rowspan);

    if (borderColor)
    td.setAttribute("borderColor",borderColor);

    if (bgColor)
    td.setAttribute("bgColor",bgColor);

    /* if (style)
    td.className = style;
    */
    this._setStyle = function( object, styleText ) {
      if( object.style.setAttribute ) {
        object.style.setAttribute("cssText", styleText );
      } else {
        object.setAttribute("style", styleText );
      }
    }

    if (style) {
      if (style.indexOf(":") == -1) {
        td.className = style;
      } else {
        this._setStyle(td, style);
      }
    }
    //Cria um elemento texto;
    //var elementText = document.createTextNode(text);

    //Adiciona o texto na cÈlula
    //td.appendChild(elementText);
    td.innerHTML = text;

    //Adiciona a cÈlula na linha
    component.appendChild(td);

    return id;
  }
}

function ebfHTMLTableCreateRow(form, table, bgColor, borderColor, style){

  //ObtÈm a tabela
  if (!table)
  if (document.ebfHTMLTable){
    table = document.ebfHTMLTable;
  }else{
    return;
  }
  var component = $(table);

  // Verifica se existe a tabela
  if  (component){
    var tbody = component.firstChild;

    // ObtÈm o id da linha
    var id = 'tr' + parseInt((Math.random() * 9999999));

    //Criar Elemento tr
    var tr;
    if (top.IE) {
      tr = document.createElement("<tr>");
    }else{
      tr = document.createElement("tr");
    }

    //Altera os atributos da linha
    tr.setAttribute("id",id);

    if (borderColor)
    tr.setAttribute("borderColor",borderColor);

    if (bgColor)
    tr.setAttribute("bgColor",bgColor);

    /*if (style)
    tr.className = style;*/

    this._setStyle = function( object, styleText ) {
      if( object.style.setAttribute ) {
        object.style.setAttribute("cssText", styleText );
      } else {
        object.setAttribute("style", styleText );
      }
    }

    if (style) {
      if (style.indexOf(":") == -1) {
        tr.className = style;
      } else {
        this._setStyle(tr, style);
      }
    }

    //Adiciona a linha na tabela
    tbody.appendChild(tr);
    document.ebfHTMLTableRow = id;
    return id;
  }
}

function ebfHTMLTableCreate(form, componentName, width, height, bgColor, border, borderColor, cellSpace, cellPad, style, scroll){

  //ObtÈm a moldura
  var component = $c(componentName);

  // Verifica se existe a moldura
  if(component){
    var div = component;
    div.innerHTML = "";

    // ObtÈm o id da tabela
    var id = 'table' + parseInt((Math.random() * 9999999));

    //Criar Elementos tbody e table
    var tbody;
    var table;
    tbody = document.createElement("tbody");
    table = document.createElement("table");

    //ObtÈm o tamanho da borda
    var tableBorder;
    if  (!(border) ||  (border < 0)){
      tableBorder = 0;
    } else {
      tableBorder = border;
    }

    //ObtÈm a largura da tabela
    var tableWidth;
    if (!(width) || (width <= 0)){
      tableWidth = component.width;
    } else {
      tableWidth = width;
    }

    //ObtÈm a altura da tabela
    var tableHeight;
    if (!(height) || (height <= 0)){
      tableHeight = component.height;
    } else {
      tableHeight = height;
    }


    //ObtÈm o espaÁamento entre as cÈlulas
    var tableCellSpace;
    if (!(cellSpace) ||  (cellSpace < 0)){
      tableCellSpace = 0;
    } else {
      tableCellSpace = cellSpace;
    }

    //ObtÈm o espaÁamento para as bordas
    var tableCellPad;
    if (!(cellPad) ||  (cellPad < 0)){
      tableCellPad= 0;
    } else {
      tableCellPad= cellPad;
    }

    //Altera os atributos da tabela
    table.setAttribute("id",id);
    table.setAttribute("name",id);
    if(tableWidth) {
      table.setAttribute("width",tableWidth);
    }
    if(tableHeight) {
      table.setAttribute("height",tableHeight);
    }
    table.setAttribute("border",tableBorder);
    table.setAttribute("cellpadding",tableCellSpace);
    table.setAttribute("cellspacing",tableCellPad);
    if (borderColor)
    table.setAttribute("borderColor",borderColor);

    if (bgColor)
    table.setAttribute("bgColor",bgColor);

    this._setStyle = function( object, styleText ) {
      if( object.style.setAttribute ) {
        object.style.setAttribute("cssText", styleText );
      } else {
        object.setAttribute("style", styleText );
      }
    }

    if (style) {
      if (style.indexOf(":") == -1) {
        table.className = style;
      } else {
        this._setStyle(table, style);
      }
    }

    table.appendChild(tbody);
    div.appendChild(table);
    if (scroll){
      div.style.overflow = "auto";
    } else {
      div.style.overflow = "hidden";
    }
    document.ebfHTMLTable = id;
    return id;
  }
}

function ebfImageSetURL(componentName, url) {
  var component = $(componentName);
  if (component) {
    component.src = url;
  }
}

function ebfIndexOf() {
  var indice = 0;
  if (existArgs(arguments)) {
    var value = arguments[0].toString();
    var valueToFind = arguments[1].toString();
    indice = value.indexOf(valueToFind);
    indice = indice == -1 ? 0 : ++indice;
  }
  return indice;
}

function ebfIsCnpj(value) {
  value = trim(value);
  if (value == null || typeof value == "undefined" || value == "") {
    return false;
  }
  return CNPJ(value);
}


function CNPJ(v) {

  if (v==''){
    return true;
  }
  v = v.replace('.', '').replace('.', '');
  v = v.replace('-', '');
  v = v.replace('/', '');

  return validate_CGC(v);
}

function validate_CGC(s){
  if (isNaN(s)) {
    return false;
  }
  var i;
  var c = s.substr(0,12);
  var dv = s.substr(12,2);
  var d1 = 0;
  for (i = 0; i <12; i++){
    d1 += c.charAt(11-i)*(2+(i % 8));
  }
  if (d1 == 0){
    return false;
  }
  d1 = 11 - (d1 % 11);
  if (d1 > 9){
    d1 = 0;
  }
  if (dv.charAt(0) != d1){
    return false;
  }
  d1 *= 2;
  for (i = 0; i < 12; i++){
    d1 += c.charAt(11-i)*(2+((i+1) % 8));
  }
  d1 = 11 - (d1 % 11);
  if (d1 > 9){
    d1 = 0;
  }
  if (dv.charAt(1) != d1){
    return false;
  }
  return true;
}

function ebfIsCpf(value) {
  value = trim(value);
  if (value == null || typeof value == "undefined" || value == "") {
    return false;
  }
  return CPF(value);
}

function CPF(v) {

  if (v==''){
    return true;
  }

  v = v.replace('.', '').replace('.', '');
  v = v.replace('-', '');

  return validate_CPF(v);
}


function validate_CPF(s){
  if (isNaN(s)) {
    return false;
  }

  var i;
  var c = s.substr(0,9);
  var dv = s.substr(9,2);
  var d1 = 0;

  for (i = 0; i < 9; i++) {
    d1 += c.charAt(i)*(10-i);
  }

  if (d1 == 0){
    return false;
  }

  d1 = 11 - (d1 % 11);

  if (d1 > 9) {
    d1 = 0;
  }

  if (dv.charAt(0) != d1) {
    return false;
  }

  d1 *= 2;

  for (i = 0; i < 9; i++) {
    d1 += c.charAt(i)*(11-i);
  }

  d1 = 11 - (d1 % 11);

  if (d1 > 9){
    d1 = 0;
  }

  if (dv.charAt(1) != d1) {
    return false;
  }
  return true;
}

function ebfIsOnline(){
  var xmlReq = new getHTTPObject();
  xmlReq.open("GET", 'http://www.google.com', false);
  try {
    xmlReq.send(null);
  } catch(e) {
    return false;
  }
  return true;
}

function getHTTPObject() {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest();
  }
  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
  return false;
}

function ebfJSImportContent(content) {
  var code = document.createElement('script');
  code.setAttribute('type', "text/javascript" );
  code.setAttribute('charset', "utf-8" );
  code.innerHTML = content;
  document.getElementsByTagName('head')[0].appendChild(code);
}

function ebfLastIndexOf() {
  var indice = 0;
  if (existArgs(arguments)) {
    var value = arguments[0].toString();
    var valueToFind = arguments[1].toString();
    indice = value.lastIndexOf(valueToFind);
    indice = indice == -1 ? 0 : ++indice;
  }
  return indice;
}

function ebfListImplode(list, separator) {
  if (!(list instanceof Array)) {
    throw "Functions ebfListImplode expects an Array.";
  }
  var first = true;
  var value = "";
  for (var i = 0; i < list.length; i++) {
    var listValue = list[i];
    if (first) {
      first = false;
    } else if (separator != null && (typeof separator != "undefined")) {
      value += separator;
    }
    if (listValue != null && (typeof listValue != "undefined")) {
      value += listValue;
    }
  }
  return value;
}

function ebfListParamsCreate() {
  var list = new Array()
  for(i = 0; i < arguments.length; i++) {
    list[i] = arguments[i];
  }
  return list;
}

function ebfListSort(list, reverse){
  if (!reverse) {
    list = list.sort();
    list = list.reverse();
    return list;
  } else {
    list = list.sort();
    return list;
  }
}

function ebfListLength() {
  var value = 0;
  if (existArgs(arguments)) {
    value = arguments[0].length;
  }
  return value;
}

function ebfMapAddObject(obj, key, value) {
  obj.add(key, value);
}

function ebfMapCreateFromList() {
  var map = new MakerMap();
  for (var i = 0; i < arguments.length; i++) {
    var params = arguments[i];
    if (params instanceof Array && params.length == 2) {
      map.add(params[0], params[1]);
    }
  }
  return map;
}

function ebfMapCreateObject() {
  return new MakerMap();
}

function ebfMapGetObject(obj, key) {
  return obj.get(key);
}

function ebfMapKeys(obj) {
  return obj.getKeys();
}

function ebfMapLength(obj) {
  return obj.size();
}

function ebfMapRemoveObject(obj, key) {
  if (obj instanceof MakerMap) {
    return obj.remove(key);
  }
  return -1;
}

function ebfMapValues(obj) {
  return obj.getValues();
}

function ebfMathCubeRoot(value) {
  value = toDouble(value);
  var result = Math.pow(value, 1/3);
  if (isNaN(result)) {
    throw "Argumento inv·lido para o c·lculo da Raiz C˙bica.";
  }
  var ceilValue = Math.ceil(result);
  if (Math.pow(ceilValue, 3) == value) {
    return ceilValue;
  }
  var floorValue = Math.floor(result);
  if (Math.pow(floorValue, 3) == value) {
    return floorValue;
  }
  return result;
}

function ebfNavEditSaveRecord() {
  FormUpdate(null);

}

function ebfNavRefreshCurrentRecord() {
  OnEnterForm();
}

function ebfNewLine() {
  var value = "";
  if (existArgs(arguments)) {
    var qtd = arguments[0];
    while (qtd-- > 0) {
      value += "\n";
    }
  }
  return value;
}

function ebfNotificationBeep(times) {
  return top.navigator.notification.beep(times);
}

function ebfNotificationVibrate(milliseconds) {
  return top.navigator.notification.vibrate(milliseconds)
}

function ebfObjectEventAssociate(componente,evento,rule, ruleParams) {

  // Testa se o par‚metro do fluxo a ser executado È nulo
  if (typeof(ruleParams) == 'undefined' || ruleParams == null) {
    ruleParams = '';
  }

  var component = $(componente);
  component[evento] = function () {
  eval(rule).apply(window, ruleParams);
  }
}

function ebfOpenMap(latitude, longitude) {
  top.getAppUtils().openMap(latitude, longitude);
}

function ebfOpenApp(packageName, pathActivity) {
  window.GeoLocation.openApp(packageName, pathActivity);
}

function ebfOpenYouTube(code) {
  top.getAppUtils().openYouTube(code);
}

function ebfQRCodeReader(base64,ruleName) {

  var gCtx = null;
  var gCanvas = null;
  var imageData = null;
  var c=0;
  var stype=0;
  var StringReturn="";


  function handleFiles(data){

    var base = '"data:image/jpeg;base64,' + data + '"';
    qrcode.decode(eval('('+base+')'));
  }


  function read(a) {

    var html="<br>";
    html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
    html+="<b>"+a+"</b><br><br>";
    document.getElementById("result").innerHTML=html;
    StringReturn=a;

  }

  function isCanvasSupported(){

    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }


  function load() {

    if(isCanvasSupported() && window.File )
    {
      qrcode.callback = function(a) {
        read(a);
        top.$mainform().ebfFlowExecute(ruleName,[a]);
      };
      document.getElementById("mainbody").style.display="inline";
    }
    else
    {
      document.getElementById("mainbody").style.display="inline";
      document.getElementById("mainbody").innerHTML='<p id="mp1"><br><p id="mp2">sorry your browser is not supported</p><br><br>'+
      '<br><p id="mp2"></p><br><br>';
    }
  }
  //Criando uma DIV

  var id = 'div' + parseInt((Math.random() * 9999999));
  var div = getDiv(id, 0, 0, 0, 0, 1000010, true);

  //Corpo para renderizar a QRCode
  var corpo = '<div id="main"><div id="mainbody" style="display: inline;"><table width="100%" border="0">' +
  '<tbody><tr><td valign="top" align="center"><div id="outdiv"><div id="qrfile">' +
  '<canvas height="240" width="320" id="out-canvas"></canvas>' +
  '</div></div></td></tr><tr><td align="center" colspan="3"></td></tr><tr><td align="center" colspan="3">' +
  '<div id="result"></div></td></tr></tbody></table></div><canvas id="qr-canvas"></canvas></div>';

  div.style.display = "none";
  div.innerHTML= corpo;
  document.body.appendChild(div);
  load();
  handleFiles(base64);
}

function ebfRandom(value) {
  return parseInt(value * Math.random());
}

function ebfRefreshForm() {
  window.location.reload();
}

function ebfRemoveAccents(text) {
  if (text == null || typeof text == "undefined") {
    return null;
  }
  return translateAcentos(text);
}

function ebfRemoveSubstring(value, pos1, pos2) {
  var ini = pos1 - 1;
  var fim = ini + pos2;
  var valor = value;
  var length = valor.length;
  ini = Math.max(0, ini);
  fim = Math.min(length, fim);
  if (ini > length || ini >= fim) {
    return "";
  }
  valor = valor.replace(valor.slice(ini, fim), "");
  return valor;
}

function ebfReplace() {
  var value = "";
  if (existArgs(arguments)) {
    value = ebfToString(arguments[0]);
    var valueToFind = ebfToString(arguments[1]);
    var valueToReplace = ebfToString(arguments[2]);
    value = value.replace(valueToFind, valueToReplace);
  }
  return value;
}

function ebfReplaceAll(OldString,FindString,ReplaceString) {
  if(!OldString) OldString = "";
  var SearchIndex = 0;
  var NewString = "";
  OldString = ebfToString(OldString);
  FindString = ebfToString(FindString);
  ReplaceString = ebfToString(ReplaceString);
  while (OldString.indexOf(FindString,SearchIndex) != -1) {
    NewString += OldString.substring(SearchIndex,OldString.indexOf(FindString,SearchIndex));
    NewString += ReplaceString;
    SearchIndex = (OldString.indexOf(FindString,SearchIndex) + FindString.length);
  }
  NewString += OldString.substring(SearchIndex,OldString.length);
  return NewString;
}

function ebfRequestGetParameter(param){
  return JGQueryString.getVar(param);
}

function ebfResultSetFirst(tabela){
  return tabela.first();
}

function ebfScanCode(success, error, types) {
  if(top.platform != "androidhtml5"){
    var onsuccess = "parent."+ reduceVariable(success);
    var onerror = "parent." +  reduceVariable(error);
    parent.getBarcodeUtils().scan(success, error, types, formGUID);
  }else{
    var onsuccess = "parent."+ reduceVariable(success);
    var onerror = "parent." +  reduceVariable(error);
    top.getBarcodeUtils().scan(success, error, types, formGUID);
  }
}

function ebfNewScanCode(types) {
  return window.BarCode.scan(types);
}

function ebfSearchSubstring() {
  var indice = 0;
  if (existArgs(arguments)) {
    var value = ebfToString(arguments[0]);
    var valueToFind = ebfToString(arguments[1]);
    indice = value.indexOf(valueToFind);
  }
  return indice != -1;
}

function ebfSendAuthenticatedEmail2(hostVar,portVar,SSLAuthenticationVar,userVar,passwordVar,fromVar, toVar,subjectVar,bodyVar,typeHtml){

  if (toVar == null) {
    toVar = "";
  }

  if (subjectVar == null) {
    subjectVar = "";
  }

  if (bodyVar == null) {
    bodyVar = "";
  }

  return top.getNetworkUtils().sendEmail(bodyVar,toVar,subjectVar);

}

function ebfSendFilePOST(url, params, files) {
  if(params && params.getObject) {
    params = params.getObject();
  }
  if(files && files.getObject) {
    files = files.getObject();
  }
  return top.getNetworkUtils().postData(url, 'SENDPOST', params, files).toString();
}


function ebfSendFilePOSTAsync(url, params, files, success, successparams, fail, failparams) {
  if(params && params.getObject) {
    params = params.getObject();
  }
  if(files && files.getObject) {
    files = files.getObject();
  }
  top.getNetworkUtils().postDataAsync(url, params, files, success, successparams, fail, failparams, formGUID);
}

function ebfCheckInternetConnection(url, success, successParams, fail, failParams) {
  top.getNetworkUtils().checkInternetConnection(success, successParams, fail, failParams);
}


function postFile(url, params, files) {
  if(params && params.getObject) {
    params = params.getObject();
  }
  if(files && files.getObject) {
    files = files.getObject();
  }
  return top.getNetworkUtils().postData(url, 'SENDPOST', params, files).toString();
}

function ebfSendImageInBody(url,file) {
  return top.getNetworkUtils().sendImageInBody(url, file);

}

function SOAPClientParameters()
{
  var _pl = new Array();
  this.add = function(name, value)
  {
    _pl[name] = value;
    return this;
  }
  this.toXml = function()
  {
    var xml = "";
    for(var p in _pl)
    {
      switch(typeof(_pl[p]))
      {
        case "string":
        case "number":
        case "boolean":
        case "object":
        xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
        break;
        default:
        break;
      }
    }
    return xml;
  }
}
SOAPClientParameters._serialize = function(o)
{
  var s = "";
  switch(typeof(o))
  {
    case "string":
    s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
    case "number":
    case "boolean":
    s += o.toString(); break;
    case "object":
    // Date
    if(o.constructor.toString().indexOf("function Date()") > -1)
    {

      var year = o.getFullYear().toString();
      var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
      var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
      var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
      var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
      var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
      var milliseconds = o.getMilliseconds().toString();
      var tzminutes = Math.abs(o.getTimezoneOffset());
      var tzhours = 0;
      while(tzminutes >= 60)
      {
        tzhours++;
        tzminutes -= 60;
      }
      tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
      tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
      var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
      s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
    }
    // Array
    else if(o.constructor.toString().indexOf("function Array()") > -1)
    {
      for(var p in o)
      {
        if(!isNaN(p))   // linear array
        {
          (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
          var type = RegExp.$1;
          switch(type)
          {
            case "":
            type = typeof(o[p]);
            case "String":
            type = "string"; break;
            case "Number":
            type = "int"; break;
            case "Boolean":
            type = "bool"; break;
            case "Date":
            type = "DateTime"; break;
          }
          s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">"
        }
        else    // associative array
        s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">"
      }
    }
    // Object or custom function
    else
    for(var p in o)
    s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
    break;
    default:
    break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
  }
  return s;
}

function SOAPClient() {}

SOAPClient.username = null;
SOAPClient.password = null;

SOAPClient.invoke = function(url, port, method, parameters) {
  return SOAPClient._loadWsdl(url, port, method, parameters);
}

//private: wsdl cache
SOAPClient_cacheWsdl = new Array();

//private: invoke async
SOAPClient._loadWsdl = function(url, port, method, parameters, async, callback)
{
  // load from cache?
  var wsdl = SOAPClient_cacheWsdl[url];
  if(wsdl + "" != "" && wsdl + "" != "undefined")
  return SOAPClient._sendSoapRequest(url, port, method, parameters, wsdl);
  // get wsdl
  var xmlHttp = top.getNetworkUtils();
  var wsdl = xmlHttp.postData(url, "GET", null);

  parser = new DOMParser();

  if (top.platform == "androidhtml5") {
    wsdl = parser.parseFromString(wsdl, "application/xhtml+xml");
  } else {
    wsdl = parser.parseFromString(wsdl, "text/xml");
  }
  return SOAPClient._sendSoapRequest(url, port, method, parameters, wsdl);
}
SOAPClient._getPortUrl = function(wsdl, portName)
{
  var serviceNode = "";
  var portNode = "";
  var portUrl = "";

  for(var i=0; i<wsdl.documentElement.childNodes.length; i++) { //Get the node of services
    if (wsdl.documentElement.childNodes[i].nodeName.indexOf("service") != -1) {
      serviceNode = wsdl.documentElement.childNodes[i];
    }
  }
  for(var i=0; i<serviceNode.childNodes.length; i++) { //Get the node of ports
    if (serviceNode.childNodes[i].nodeName.indexOf("port") != -1) {
      if(portName != "undefined" && portName != null && portName != "") {
        if(serviceNode.childNodes[i].attributes.getNamedItem("name").value == portName) {
          portNode = serviceNode.childNodes[i];
        }
      }else {
        portNode = serviceNode.childNodes[i];
      }
    }
  }
  for(var i=0; i<portNode.childNodes.length; i++) { //Get the url from the port
    if (portNode.childNodes[i].nodeName.indexOf("address") != -1) {
      portUrl = portNode.childNodes[i].attributes.getNamedItem("location").value;
    }
  }
  return portUrl;
}

SOAPClient._sendSoapRequest = function(url, port, method, parameters, wsdl)
{
  pl = parameters;

  // get namespace
  var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
  // build SOAP request
  var sr =
  "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>" +
  "<soap:Envelope " +
  "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
  "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
  "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
  "<soap:Body>" +
  "<" + method + " xmlns=\"" + ns + "\">" +
  pl.toXml() +
  "</" + method + "></soap:Body></soap:Envelope>";
  // send request
  var wsPort = SOAPClient._getPortUrl(wsdl, port);

  var xmlHttp = top.platform == "androidhtml5" ? top.getNetworkUtils() : new XMLHttpRequest();
  if(top.platform == "ioshtml5"){
    xmlHttp.open("POST", wsPort, false);
  }
  
  if (SOAPClient.userName && SOAPClient.password){
    //TODO: xmlHttp.open("POST", wsPort, async, SOAPClient.userName, SOAPClient.password);
    // Some WS implementations (i.e. BEA WebLogic Server 10.0 JAX-WS) don't support Challenge/Response HTTP BASIC, so we send authorization headers in the first request
    xmlHttp.setRequestHeader("Authorization", "Basic " + SOAPClient._toBase64(SOAPClient.userName + ":" + SOAPClient.password));
  }
  var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
  xmlHttp.setRequestHeader("SOAPAction", soapaction);
  if (top.platform == "androidhtml5") {
    xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=iso-8859-1");
  } else {
    xmlHttp.setRequestHeader("Content-Type", "application/xhtml+xml; charset=iso-8859-1");
  }
  var responseXML;
  if(top.platform == "androidhtml5"){
   responseXML = xmlHttp.postData(wsPort, "POST", sr);
  }else{
   xmlHttp.send(sr);
   responseDoc = xmlHttp.responseXML;
  }
  parser = new DOMParser();

  if (top.platform == "androidhtml5") {
    responseDoc = parser.parseFromString(responseXML, "application/xhtml+xml");
  }

  var o = null;
  var nd = SOAPClient._getElementsByTagName(responseDoc, method + "Result");

  if(nd.length == 0)
  nd = SOAPClient._getElementsByTagName(responseDoc, method + "Return");

  if(nd.length == 0)
  nd = SOAPClient._getElementsByTagName(responseDoc, method + "Response");  // Maker web service

  if(nd.length == 0)
  nd = SOAPClient._getElementsByTagName(responseDoc, "return");  // PHP web Service?

  if(nd.length == 0)
  nd = SOAPClient._getElementsByTagName(responseDoc, "Return");
  if(nd.length == 0) {
    if(responseDoc.getElementsByTagName("faultcode").length > 0)
    {
      throw new Error(500, responseDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
    } else {
      nd = responseDoc.documentElement.childNodes;
      o = SOAPClient._soapresult2object(nd[0], wsdl);
    }
  }
  else
  o = SOAPClient._soapresult2object(nd[0], wsdl);
  return o;
}

SOAPClient._soapresult2object = function(node, wsdl)
{
  var wsdlTypes = SOAPClient._getTypesFromWsdl(wsdl);
  return SOAPClient._node2object(node, wsdlTypes);
}

SOAPClient._node2object = function(node, wsdlTypes)
{
  // null node
  if(node == null)
  return null;
  // text node
  if(node.nodeType == 3 || node.nodeType == 4)
  return SOAPClient._extractValue(node, wsdlTypes);
  //blackberry only
  if (top.platform == "blackberryhtml5") {
    if(node.textContent) {
      //if (node.attributes[0].nodeName.indexOf("type") != -1 && node.attributes[0].nodeValue.indexOf("string") != -1) {
      return node.textContent;
    }
  }
  // leaf node
  if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
  return SOAPClient._node2object(node.childNodes[0], wsdlTypes);
  var isarray = SOAPClient._getTypeFromWsdl(node.nodeName, wsdlTypes).toLowerCase().indexOf("arrayof") != -1;
  // object node
  if(!isarray)
  {
    var obj = null;
    if(node.hasChildNodes()) {
      obj = new Object();
      obj._str = "";
      for(var i = 0; i < node.childNodes.length; i++)
      {
        var p = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
        obj[node.childNodes[i].nodeName] = p;
        obj._str = p+"";
      }
      obj.toString = function() {
        return obj._str;
      }
    }
    return obj;
  }
  // list node
  else
  {
    // create node ref
    var l = new Array();
    for(var i = 0; i < node.childNodes.length; i++)
    l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
    return l;
  }
  return null;
}
SOAPClient._extractValue = function(node, wsdlTypes)
{
  var value = node.nodeValue;
  switch(SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes).toLowerCase())
  {
    default:
    case "s:string":
    return (value != null) ? value + "" : "";
    case "s:boolean":
    return value + "" == "true";
    case "s:int":
    case "s:long":
    return (value != null) ? parseInt(value + "", 10) : 0;
    case "s:double":
    return (value != null) ? parseFloat(value + "") : 0;
    case "s:datetime":
    if(value == null)
    return null;
    else
    {
      value = value + "";
      value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
      value = value.replace(/T/gi," ");
      value = value.replace(/-/gi,"/");
      var d = new Date();
      d.setTime(Date.parse(value));
      return d;
    }
  }
}
SOAPClient._getTypesFromWsdl = function(wsdl)
{
  var wsdlTypes = new Array();
  // IE
  var ell = wsdl.getElementsByTagName("s:element");
  var useNamedItem = true;
  // MOZ
  if(ell.length == 0)
  {
    ell = wsdl.getElementsByTagName("element");
    useNamedItem = false;
  }
  for(var i = 0; i < ell.length; i++)
  {
    if(useNamedItem)
    {
      if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null)
      wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
    }
    else
    {
      if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
      wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
    }
  }
  return wsdlTypes;
}
SOAPClient._getTypeFromWsdl = function(elementname, wsdlTypes)
{
  var type = wsdlTypes[elementname] + "";
  return (type == "undefined") ? "" : type;
}
//private: utils
SOAPClient._getElementsByTagName = function(document, tagName)
{
  try
  {
    // trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
    return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
  }
  catch (ex) {}
  // old XML parser support
  return document.getElementsByTagName(tagName);
}

SOAPClient._toBase64 = function(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
    keyStr.charAt(enc3) + keyStr.charAt(enc4);
  } while (i < input.length);

  return output;
}

function ebfSendSOAPrequest(wsdlURL, port, method, paramsNames, paramValues) {
  var pars = new SOAPClientParameters();
  if (paramsNames){
    for(var i = 0; i < paramsNames.length; i++) {
      pars.add(paramsNames[i], paramValues[i]);
    }
  }
  var output = SOAPClient.invoke(wsdlURL, port, method, pars);
  if(output && output.toString().substr(0, 10) == '<!--ERROR:') {
    var err = output.substring(10, output.length - 3);
    alert(err);
    throw err;
  };
  return output;
}

function ebfSetImageSrc(componentName, imageData) {
  var imgComp = $(componentName);

  if (imageData) {
    if(ebfEndsWith(imageData, "==")) {
      imgComp.src = null;
    }else {
      imgComp.src = imageData;
    }
  } else {
    imgComp.src = 'res/image/empty.gif';
  }
}

function ebfSetPercentProgressBar (percent) {
  var barSize = this.progressBar.width - 5;

  if (percent == 0) {
    this.progressBar_Bar.style.width = 10;
  } else {
    this.progressBar_Bar.style.width = (percent * (barSize / 100))+"px";
  }

  if (percent >= 100){
    this.progressBar_Bar.style.width = (100 * (barSize / 100))+"px";
  }

}

function trim(str) {
  var result = "";
  if (str) {
    result = str.toString().replace(/^\s+|\s+$/g, '');
  }
  return result;
}

function firstToUpper(texto) {
  if (texto) {
    if (texto.length == 1) {
      return texto.toUpperCase();
    } else if (texto.length > 1) {
      return texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();
    } else {
      return "";
    }
  }
}

/**
* Retira os acentos e cedilhas das letras
*/
function translateAcentos(aValue) {
  var CHR_ACENTUADA = "‡ËÏÚ˘·ÈÌÛ˙‚ÍÓÙ˚„ıÁÒ‰ÎÔˆ¸¿»Ã“Ÿ¡…Õ”⁄¬ Œ‘€√’«—ƒÀœ÷‹";
  var CHR_NAO_ACENTUADA = "aeiouaeiouaeiouaocnaeiouAEIOUAEIOUAEIOUAOCNAEIOU";

  var idx, idxpos;
  var result = "";

  for (idx = 0; idx < aValue.length; idx++) {
    idxpos = CHR_ACENTUADA.indexOf(aValue.charAt(idx));
    if (idxpos != -1) {
      result += CHR_NAO_ACENTUADA.charAt(idxpos);
    }
    else {
      result += aValue.charAt(idx);
    }
  }

  return result;
}

function reduceVariable(texto, notClassName) {
  var value = "";

  if (texto) {
    var regexp = /^\d+|\W/g;
    texto = texto.toString();

    if (notClassName) {
      value = trim(translateAcentos(texto.toUpperCase())).replace(/\s/g, "_");

      if (regexp.test(value)) {
        value = value.replace(regexp, "_");
      }
    } else {
      var specialChar = /\W/g;
      var startsNumeric = /^\d+/g;

      value = translateAcentos(texto);

      if (specialChar.test(value)) {
        value = value.replace(specialChar, " ");
      }

      if (startsNumeric.test(value)) {
        value = value.replace(startsNumeric, " ");
      }

      value = firstToUpper(trim(value.replace(/\s{2,}/g, " ").replace(/_/g, " ")));

      var spacePosition;
      while ((spacePosition = value.indexOf(" ")) != -1) {
        var aux = value.substring(spacePosition + 1);

        value = value.substring(0, spacePosition) + firstToUpper(aux);
      }
    }
  }

  return value;
}

function ebfSetRuleExecutionTime(rule, ruleParams, time){

  var func;
  try {
    func = eval(rule);
  } catch(e) {
    func = eval(reduceVariable(rule));
  }

  return setTimeout(function(){func.apply(this, ruleParams)}, time);
}

function executeRuleFromJS(rule, list){
  ebfSetRuleExecutionTime(rule, list, 100);
}

function executeJSRuleNoField(syscode, idForm, rule, list){
  ebfSetRuleExecutionTime(rule, list, 100);
}

function ebfSetSessionAttribute(name, value, global) {
  top.setSession(name, value);
}

function ebfSetSystemEvents(pauseRule, resumeRule, onlineRule, offlineRule, backbuttonRule, menubuttonRule, searchbuttonRule) {

  var pauseAction = pauseRule?eval(pauseRule):null;
  var resumeAction = resumeRule?eval(resumeRule):null;
  var onlineAction = onlineRule?eval(onlineRule):null;
  var offlineAction = offlineRule?eval(offlineRule):null;
  var backbuttonAction = backbuttonRule?eval(backbuttonRule):null;
  var menubuttonAction = menubuttonRule?eval(menubuttonRule):null;
  var searchbuttonAction = searchbuttonRule?eval(searchbuttonRule):null;

  if (pauseAction) {
    top.document.addEventListener("pause", pauseAction, false);
  }

  if (resumeAction) {
    top.document.addEventListener("resume", resumeAction, false);
  }

  if (onlineAction) {
    top.document.addEventListener("online", onlineAction, false);
  }

  if (offlineAction) {
    top.document.addEventListener("offline", offlineAction, false);
  }

  if (backbuttonAction) {
    top.document.addEventListener("backbutton", backbuttonAction, false);
  }

  if (menubuttonAction) {
    top.document.addEventListener("menubutton", menubuttonAction, false);
  }

  if (searchbuttonAction) {
    top.document.addEventListener("searchbutton", searchbuttonAction, false);
  }

}

function ebfSetTransparentBackground() {
  document.body.style.backgroung = 'transparent';
}

function ebfShowAlert(title,msg) {
  top.getFileManager().showAlert(title,msg);
}

function ebfShowConfirm(orderOK,title,msg,func,args) {
  if(args==undefined){
    var args=[];
    args.splice(0,0,"button");
    top.getFileManager().confirmshow(orderOK, title, msg, func, args, formGUID);
  }else{
    args.splice(0,0,"button");
    top.getFileManager().confirmshow(orderOK, title, msg, func, args, formGUID);
  }
}

function ebfSplit(text, caracterSplit) {
  return text.split(caracterSplit);
}

function ebfSQLClose(tabela){
  return tabela.close();
}

function ebfSQLCloseConnection(connection){
}

function ebfSQLCommitTransaction(){
  return getLocalDataBase().commitTransaction();
}

function ebfSQLDynamicQuery(SQL, additionalConnection, qtd, bindParams){
  var c = getLocalDataBase().rawQuery(SQL, bindParams);
  c.next();
  return c;
}

function ebfSQLDynamicScrollQuery(SQL, additionalConnection, qtd, bindParams) {
  var c = getLocalDataBase().rawQuery(SQL, bindParams);
  c.next();
  return c;
}

function ebfSQLEOF(tabela){
  return tabela.hasdata();
}

function ebfSQLExecuteDynamicUpdate(SQL, additionalConnection, bindParams){
  var i;
  if(top.platform == 'ioshtml5'){
    for(i=0;i<bindParams.length; i++){
      var imagem = bindParams[i].replace(("file://" + top.path), "");
      if(bindParams[i].indexOf(top.path) != -1){
        bindParams[i]= "../../../Documents/" + imagem;
      }
    }
  }
  return getLocalDataBase().execSQL(SQL, bindParams);
}

function ebfSQLExecuteQuery(SQL, params, additionalConnection){
  var c = getLocalDataBase().rawQuery(SQL, params);
  c.next();
  return c;
}

function ebfSQLExecuteScrollQuery(SQL, params, additionalConnection)  {
  var c = getLocalDataBase().rawQuery(SQL, params);
  c.next();
  return c;
}

function ebfSQLExecuteUpdate(SQL, params, additionalConnection){
  return getLocalDataBase().execSQL(SQL, params);
}

function ebfSQLField(tabela, name, type){
  return tabela.field(name, type);
}

function ebfSQLGetFieldAsType(tabela, name, type){
  return tabela.field(name, type);
}

function ebfSQLGetFormField(field) {
  if (field) {
    for ( var i = 0; i < components.length; i++) {
      var com = $(components[i]);
      if (com.getAttribute("field") && field && com.getAttribute("field").toUpperCase() == field.toUpperCase()) {
        return com.value;
      }
    }
  }

  return null;
}

function ebfSQLNext(tabela){
  return tabela.next();
}

function ebfSQLOpenTransaction(){
  return getLocalDataBase().beginTransaction();
}

function ebfSQLRollbackTransaction(){
  return getLocalDataBase().rollbackTransaction();
}

function ebfSQLSetNonManaged(param) {
  return param;
}

function ebfStartCam() {
  window._lastBackground = document.body.style.background;
  document.body.style.background = 'transparent';
  top.getCameraUtils().open();
}

function ebfStopCam() {
  document.body.style.background = window._lastBackground;
  top.getCameraUtils().close();
}

function ebfStringReverse(value) {
  var output = "";
  for (i = 0; i <= value.length; i++) {
    output = value.charAt (i) + output;
  }
  return output;
}

function ebfToUFT8(string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {

    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
}

function ebfStringToBase64(input) {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  input = ebfToUFT8(input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

  }

  return output;
}

function ebfBytesToBase64(content) {
  return  top.getFileManager().binaryToBase64(content);
}

function ebfStringToHTMLString(value) {
  var formated = "";

  if (value) {
    for (var i = 0; i < value.length; i++) {
      var c = value.charAt(i);
      if (c == " ") {
        formated += " ";
      } else {
        if (c == "\"") {
          formated += "&quot;";
        } else if (c == "&") {
          formated += "&amp;";
        } else if (c == "<") {
          formated += "&lt;";
        } else if (c == ">") {
          formated += "&gt;";
        } else if (c == "\n") {
          formated += "&lt;br/&gt;";
        } else {
          var ci = 0xffff & c.charCodeAt(0);
          if (ci < 160) {
            formated += c;
          } else {
            formated += "&#";
            formated += parseInt(ci);
            formated += ";";
          }
        }
      }
    }
  }

  return formated;
}

function ebfSubstring() {
  var retorno = "";
  if (existArgs(arguments)) {
    var value = arguments[0].toString();
    var length = value.length;
    var ini = parseInt(arguments[1]) - 1;
    var fim = ini + parseInt(arguments[2]);
    ini = ini < 0 ? 0 : ini;
    fim = fim > length ? length : fim;
    if (!(ini > length || ini >= fim)) {
      try {
        retorno = value.substring(ini, fim);
      } catch (ex) {
      }
    }
  }
  return retorno;
}

function ebfSubstringInverse(value, size) {
  var valor = ebfStringReverse(value);
  valor = ebfSubstring(valor, 1, size);
  valor = ebfStringReverse(valor);
  return valor;
}

function ebfTableChangeCSS(componente,estilo) {
  var componente = $(componente);
  if(componente != null) {
    componente.className = estilo;
  }
}

var ebfTextMD5 = function (string) {

  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }

  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }

  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  };

  function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  };

  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;

  string = isNullable(string) ? "" : string;
  string = Utf8Encode(string);

  x = ConvertToWordArray(string);

  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

  for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
  }

  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

  return temp.toLowerCase();
}

function ebfToJSString(str) {
  var sb = "";
  if (str != null) {
    str = str.toString();
    for (var i = 0; i < str.length; i++) {
      c = str.charAt(i);
      if (c == '\\') {
        sb += "\\\\";
      } else if (c == '\'') {
        sb += "\\'";
      } else if (c == '"') {
        sb += "\\\"";
      } else if (c == '\n') {
        sb += "\\n";
      } else if (c == '\r') {
      } else {
        sb += c;
      }
    }
    return sb;
  } else {
    return "";
  }
}

function ebfTrim() {
  var value = "";
  if (existArgs(arguments)) {
    value = trim(arguments[0]);
  }
  return value;
}

function ebfUploadDeviceFile(path, fileKey, paramsMap, server, onSuccessRule, onErrorRule) {
  var ft = new top.FileTransfer();

  var options = new top.FileUploadOptions();
  options.fileKey = fileKey;
  options.fileName = path.substr(path.lastIndexOf('/')+1);
  options.mimeType = "application/octet-stream";

  var params = new Object();
  var keys = paramsMap.getKeys();

  for (var i=0;i<keys.length;i++) {
    key = keys[i];
    params[key] = paramsMap.get(key);
  }

  options.params = params;

  var onSuccess = eval(onSuccessRule);
  var onError = onErrorRule?eval(onErrorRule):null;

  var onSuccessFunc = function(result) {
    onSuccess(result.responseCode, result.bytesSent, result.response);
  };

  var onErrorFunc = function(error) {
    var msg = 'ERROR';
    if (error.code == top.FileTransferError.FILE_NOT_FOUND_ERR) {
      msg = 'FILE_NOT_FOUND_ERR';
    } else if (error.code == top.FileTransferError.INVALID_URL_ERR) {
      msg = 'INVALID_URL_ERR';
    } else if (error.code == top.FileTransferError.CONNECTION_ERR) {
      msg = 'CONNECTION_ERR';
    }
    if (onError) {
      onError(msg);
    } else {
      alert(msg);
    }
  };
  ft.upload(path, server, onSuccessFunc, onErrorFunc, options);
}

function ebfURLDecoder(value){
  return unescape(value);
}

function ebfURLEncoder(value){
  return escape(value);
}

function ebfUtilReduceVariable(texto, className) {
  return reduceVariable(texto, !parseBoolean(className));
}

function ebfValidateTextER (text, regEx) {

  if (regEx == null || typeof regEx == "undefined" || regEx == "") {
    return false;
  }

  var regExp = new RegExp(regEx);
  return regExp.test(text);

}

function ebfWatchAcceleration(onSuccessRule, onErrorRule, time) {
  var options = { frequency: time };
  var onSuccess = eval(onSuccessRule);
  var onError = onErrorRule?eval(onErrorRule):null;

  var onSuccessFunc = function(acceleration) {
    onSuccess(acceleration.x, acceleration.y, acceleration.z, acceleration.timestamp);
  };

  var onErrorFunc = function(error) {
    if (onError) {
      onError(error.code);
    } else {
      alert('ERROR:'+ error.code);
    }
  };

  var watchID = top.navigator.accelerometer.watchAcceleration(onSuccessFunc, onErrorFunc, options);

  return watchID;
}

function ebfWidthWindow(){
  return document.documentElement.clientWidth;
}

function ebfWSCallN(wsdlURL, port, method, paramsNames, paramValues) {
  return ebfSendSOAPrequest(wsdlURL, port, method, paramsNames, paramValues);
}

function ebfWSSendSoapMessage(urlVar, soapAction, content){
  return top.getNetworkUtils().sendSoapMessage(urlVar, soapAction, content, "UTF-8");
}

function ebfXMLGetAttribute(node, attribute) {
  return node.getAttribute(attribute);
}

function ebfXMLGetChildElement(node, childName) {
  var c = node.getElementsByTagName(childName);
  if (c.length > 0)
  return c[0];
}

function ebfXMLGetChildrenElement(node, childName) {
  if (childName) {
    return node.getElementsByTagName(childName);
  }
  else {
    return node.childNodes;
  }
}

function ebfXMLGetElementTagName(node) {
  return node.tagName;
}

function ebfXMLGetElementValue(node) {
  if (node && node.firstChild)
    return node.firstChild.nodeValue;
  else
    return "";
}

function ebfXMLGetParentElement(node) {
  return node.parentNode
}

function ebfXMLGetRoot(doc) {
  if (doc) return doc.documentElement;
}

function ebfXMLOpen(XMLText) {
  var doc = null;
  if (document.implementation && document.implementation.createDocument) {//Mozzila
    var domParser = new DOMParser();
    doc = domParser.parseFromString(XMLText, 'application/xml');
    fixXMLDocument(doc);
    return doc;
  }
  else {//IE
    doc = new ActiveXObject("MSXML2.DOMDocument");
    doc.loadXML(XMLText);
  }
  return doc;
};

function ebgChangeValueGroupBox(ComponentName,HTML) {
  var c = $(ComponentName);
  c.innerHTML = HTML;
}

function getAllComponentNames() {
  return components;
}

function getColumnKeyName(value,keyField){
  if (ebfSearchSubstring(value, keyField)){
    if(ebfSearchSubstring(value, " As") || ebfSearchSubstring(value, " \n")){
      return ebfSubstring(value, 1, value.length - 2);

    }else if(ebfSearchSubstring(value, " ,") || ebfSearchSubstring(value, ",")){
      return ebfSubstring(value, 1, value.length - 1);

    }else{
      return value;
    }

  }else
  return keyField;
}

function replaceInternalFunctionsByValues(lineSelectColumn,tipo){
  if (ebfSearchSubstring(lineSelectColumn, tipo)){
    var selectRow = ebfSubstring(lineSelectColumn,ebfIndexOf(lineSelectColumn, tipo) - 1,lineSelectColumn.length);
    var functionName = getFunctionName(selectRow);
    var functionValue = GetParameters(functionName);
    lineSelectColumn = lineSelectColumn.replace(functionName,functionValue)
    lineSelectColumn = replaceInternalFunctionsByValues(lineSelectColumn,tipo);
    return lineSelectColumn;
  }else
  return lineSelectColumn;

}

function getFunctionName(value){
  var cont = 1;
  while(value.length > cont){
    if(value.charAt(cont) != "\n" && value.charAt(cont) != " ")
    cont++;
    else
    return ebfSubstring(value,1,cont);
  }
  return ebfSubstring(value,1,cont);

}

function getLookupDescription(metadata,valuedefault){

  if(metadata.componenttype == "K"){
    var valordocampo;

    var rs;
    var campo = metadata.campolista;
    var campoChave = metadata.campochave;
    var sql = metadata.sql;
    var selectColumns = "";



    if(ebfSearchSubstring(sql.toUpperCase(), "WHERE")){
      if(ebfSearchSubstring(sql, "WHERE_NEW")){
        sql = ebfSubstring(sql, 1, (ebfIndexOf(sql, "/*WHERE") - 1));
      }else{
        sql = ebfSubstring(sql, 1, (ebfIndexOf(sql.toUpperCase(), "WHERE") - 1));
      }

    }

    //verificando se as colunas do select possuem funÁıes prefixadas
    var selectColumns = ebfSubstring(sql, 1, (ebfLastIndexOf(sql.toUpperCase(), "FROM") - 1));
    var lineSelectColumn = selectColumns.split('\n');
    var rowSelected = "";

    //Verificando funÁıes
    if((ebfSearchSubstring(selectColumns, ":FUNCAO_"))||(ebfSearchSubstring(selectColumns, ":component_"))){
      for(var i=1; i< lineSelectColumn.length; i++){
        campoChave = getColumnKeyName(lineSelectColumn[i],campoChave);
        if(ebfSearchSubstring(lineSelectColumn[i], ":FUNCAO_")){
          rowSelected = replaceInternalFunctionsByValues(lineSelectColumn[i], ":FUNCAO_");
          sql = sql.replace(lineSelectColumn[i],rowSelected);

        }else if(ebfSearchSubstring(lineSelectColumn[i].toLowerCase(), ":component_")){
          rowSelected = replaceInternalFunctionsByValues(lineSelectColumn[i], ":component_");
          sql = sql.replace(lineSelectColumn[i],rowSelected);
        }

      }
    }

    sql = sql + "\n where " + campoChave + " =? " + "\n/*WHERE_ADD*/\n";
    rs = ebfSQLExecuteQuery(sql,[valuedefault],'');
    valordocampo = ebfSQLField(rs,campo);
    return valordocampo;

  }else{
    return valuedefault;
  }
}

function isGreater(value1, value2) {
  var value = false;
  if (value1 != null && typeof value1 != "undefined" && value2 != null && typeof value2 != "undefined") {
    var param1 = value1;
    var param2 = value2;
    if (param1 instanceof Date) {
      var data1 = param1;
      var data2 = toDate(param2);
      if (data1 != null && data2 != null) {
        value = (data1.compareTo(data2) == 1);
      }
    } else if (param1 instanceof Time) {
      var hora1 = param1;
      var hora2 = parseTime(param2);
      if (hora1 != null && hora2 != null) {
        value = (hora1.compareTo(hora2) == 1);
      }
    } else {
      value = param1 > param2;
    }
  }
  return value;
}

function isGreaterOrEqual(value1, value2) {
  var value = false;
  if (value1 != null && typeof value1 != "undefined" && value2 != null && typeof value2 != "undefined") {
    var param1 = value1;
    var param2 = value2;
    if (param1 instanceof Date) {
      var data1 = param1;
      var data2 = toDate(param2);
      if (data1 != null && data2 != null) {
        value = (data1.compareTo(data2) == 0 || data1.compareTo(data2) == 1);
      }
    } else if (param1 instanceof Time) {
      var hora1 = param1;
      var hora2 = parseTime(param2);
      if (hora1 != null && hora2 != null) {
        value = (hora1.compareTo(hora2) == 0 || hora1.compareTo(hora2) == 1);
      }
    } else {
      value = param1 >= param2;
    }
  }
  return value;
}

function isMinor(value1, value2) {
  var value = false;
  if (value1 != null && typeof value1 != "undefined" && value2 != null && typeof value2 != "undefined") {
    var param1 = value1;
    var param2 = value2;
    if (param1 instanceof Date) {
      var data1 = param1;
      var data2 = toDate(param2);
      if (data1 != null && data2 != null) {
        value = (data1.compareTo(data2) == -1);
      }
    } else if (param1 instanceof Time) {
      var hora1 = param1;
      var hora2 = parseTime(param2);
      if (hora1 != null && hora2 != null) {
        value = (hora1.compareTo(hora2) == -1);
      }
    } else {
      value = param1 < param2;
    }
  }
  return value;
}

function isNull() {
  var variableIsEmpty = false;
  if(arguments[0] == null || typeof arguments[0] == 'undefined' || arguments[0] == undefined){
    variableIsEmpty = true;
  }else if((arguments[0] instanceof MakerMap) || (typeof arguments[0] == 'Map') || (arguments[0].size)){
    variableIsEmpty = (arguments[0].size() < 1);
  }else if(arguments[0] == '' || arguments[0].toString() == 'NaN'){
    variableIsEmpty = true;
  }
  return variableIsEmpty;
}

function isNullOrEmpty(variavel) {
  var variableIsEmpty = false;
  if(variavel == null || typeof variavel == 'undefined' || variavel == undefined ){
    variableIsEmpty = true;
  }else if((variavel instanceof MakerMap) || (typeof variavel == 'Map') || (variavel.size)){
    variableIsEmpty = (variavel.size() < 1);
  }else if(trim(variavel.toString()) == '' || variavel.toString() == 'NaN'){
    variableIsEmpty = true;
  }
  return variableIsEmpty;
}

function listContainsObject(list, obj) {
  position = 0;
  if(list) {
    for (i = 0; i < list.length; i++) {
      if(list[i] == obj) {
        position = i + 1;
      }
    }
  }
  return position;
}

function ebfReplaceElementFromList() {
  listReturn = null;
  if (existArgs(arguments)) {
    listReturn = arguments[0];
    var position = parseInt(arguments[1]) - 1;
    position = Math.max(0, position);
    position = Math.min(position, (arguments[0].length - 1));
    listReturn[position] = arguments[2];
  }
  return listReturn;
}

function ebfGetElementFromListNoValidatePos() {
  var value = null;
  var length  = arguments[0].length - 1;
  if (existArgs(arguments)) {
    var position = parseInt(arguments[1]) - 1;
    //position = Math.max(0, position);
    // position = Math.min(position,length);
    if (position>length) {
      value = "";
    } else {
      value = arguments[0][position];
    }
  }
  return value;
}

function ebfRemoveElementFromList(list, idx) {
  if (list) {
    if ((idx) && (list.splice)) {
      list.splice((idx-1), 1);
    }
  }
  return list;
}

function OpenURLOnNewWindow(winURL, winName, winParams) {
  if(navigator.userAgent.indexOf('Android') > 0) {
    if(isNullOrEmpty(winName) && isNullOrEmpty(winParams)){
      Bridge.exec('Utils', 'openUrl', top.parseJSON([winURL]));
    }else{
      window.open(winURL, winName, winParams);
    }

  } else if (top.platform = 'ioshtml5'){
    return top.getFileManager().openView(winURL);
  }else{
    window.location.href = winURL;
  }
}


function OpenUrlOnNewTab(winURL) {
  top.getUtils().OpenUrlOnNewTab(winURL);
}

function oprMaximum() {
  var maximum = null;
  if (existArgs(arguments)) {
    maximum = parseNumeric(arguments[0]);
    for (var i = 0; i < arguments.length; i++) {
      var temp = parseNumeric(arguments[i]);
      if (temp > maximum) {
        maximum = temp;
      }
    }
  }
  return maximum;
}

function oprMinimum() {
  var minimum = null;
  if (existArgs(arguments)) {
    minimum = parseNumeric(arguments[0]);
    for (var i = 0; i < arguments.length; i++) {
      var temp = parseNumeric(arguments[i]);
      if (temp < minimum) {
        minimum = temp;
      }
    }
  }
  return minimum;
}

function toDate(value) {
  var toDate = null;
  if (value instanceof Date) {
    return value;
  } else if(isTypeOf(value, "Date")) {
    return new Date(value.getTime());
  }

  if (isNumeric(value)){
    return new Date(toLong(value));
  } else{
    if (!isNullable(value)) {
      if(value.indexOf("/") != -1){
        var dtExpReg = /^\s*(\d+)[\/\.-](\d+)[\/\.-](\d+)(\s(\d+):(\d+):(\d+))?\s*$/;
        var dataArr = dtExpReg.exec(value);
        if (dataArr != null) {
          var dia = removeZeros(dataArr[1]);
          var mes = removeZeros(dataArr[2]);
          var ano = removeZeros(dataArr[3]);
          var hora = removeZeros(dataArr[5]);
          var minuto = removeZeros(dataArr[6]);
          var segundo = removeZeros(dataArr[7]);
          if (hora != null && (typeof hora != "undefined")) {
            toDate = new Date(ano, mes-1, dia, hora, minuto, segundo);
          } else {
            toDate = new Date(ano, mes-1, dia, 0, 0, 0);
          }
        }
      } else{
        return new Date(value);
      }
    }else{
      return "";
    }
  }
  return toDate;
}

function removeZeros(value) {
  if (value != null && (typeof value != "undefined")) {
    while (value.charAt(0) == "0" && value.length > 1) {
      value = value.substring(1);
    }
  }
  return value;
}

function toDouble(value) {
  return parseNumeric(value);
}

function toLong() {
  var value = 0;
  if (existArgs(arguments)) {
    value = parseInt(toDouble(arguments[0]));
  }
  return value;
}

function ebfToString(obj) {
  return isNullable(obj) ? "" : obj.toString();
}


function ebfFileCopy (origin,destination){
  top.getFileManager().fileCopy(origin,destination);
}


function ebfFilechosser(Sucess,Fail){
  top.getFileManager().openfilechosser(Sucess,Fail,formGUID);
}


function ebfTableRowVisible(idColumn, Visible){
  var cell = document.getElementById(idColumn);
  if (Visible==1) {
    cell.style.display = "";
  }
  else {
    cell.style.display = "none";
  }
}

function ebfFormSetRequired() {
  if (existArgs(arguments)) {
    try{
      var components = arguments;
      var d;
      if(components[1]){
        d = "label" + components[0];
        var elem = document.getElementById(d);
        if(!(ebfSearchSubstring(elem.innerHTML, '<font color="red">*</font></b>'))) elem.innerHTML = '<b>' + elem.innerHTML + '&nbsp;<font color="red">*</font></b>';
      }else{
        d = "label" + components[0];
        var elem = document.getElementById(d);
        if(elem.innerHTML.indexOf('&nbsp;<font color="red">*</font></b>') != -1){
          elem.innerHTML = elem.innerHTML.replace("<b>", "").replace('&nbsp;<font color="red">*</font></b>', "");
        }
        else{
          elem.innerHTML = elem.innerHTML.replace("<b>", "").replace('<font color="red">*</font></b>', "");
        }

      }
    }catch(e){
      //Ignora os erros
    }
  }
}

function ebfstatusGps(){
  return top.getLocationUtils().statusGPS();
}

function ebfEnableGPS(){
  return top.getLocationUtils().enableGPS();
}

function ebfIOSDownloadURLContent(url, file) {
  return parent.getNetworkUtils().downloadFile(url, file);
}

function ebfLineaInit() {
  return parent.getLineaUtils().start();
}

function ebfLineaReadBarCodeSync(timeout) {
  return parent.getLineaUtils().readBarCodeSync(timeout);
}

function ebfLineaReadMagneticCardSync(timeout) {
  return parent.getLineaUtils().readMagneticCardSync(timeout);
}

function getTokenPush(){
  var tokenPush = parent.getNetworkUtils().getTokenPush();
  return tokenPush;
}

function ebfConsumeWsBase64ToBinary(url, jsonItem, jsonName) {
  return parent.getNetworkUtils().consumeWsBase64ToBinary(url, jsonItem, jsonName);
}

function ebfEncodeAES(message) {
  return parent.getCryptoUtils().encodeAES(message);
}

function ebfDecodeAES(message) {
  return parent.getCryptoUtils().decodeAES(message);
}

function ebfMapsToggleStreetView(streetview) {
  if (streetview) {
    var toggle = streetview.getVisible();
    if (toggle == false) {
      streetview.setVisible(true);
    } else {
      streetview.setVisible(false);
    }
  }
}

function ebfMapsAngle(map, type) {
  if (map) {
    map.setMapTypeId(type);
    map.setTilt(45);
  }
}

function ebfMapsAddListener(map, event, flow, param, image, addmarkers) {
  if (map) {
    if(addmarkers==undefined){
      addmarkers=true;
    }
    google.maps.event.addListener(map, event, function(e){
      placeMarker(e.latLng, map, image, addmarkers);
    });

    function placeMarker(position, map, image,addmarkers){
      if(addmarkers){
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: image
        });
      }

      var list = new Array();
      var pos = position.toString();
      pos = pos.replace("(", "");
      pos = pos.replace(")", "");
      var latlgn = pos.split(",");
      list[0] = latlgn[0];
      list[1] = latlgn[1];
      if(param){
        for (i = 0; i < param.length; i++) {
          list[i + 2] = param[i];
        }
      }
      executeRuleFromJS(flow, list);
      map.panTo(position);
    }
  }
}

function ebfMapsCalcDistBtwnTwoPoints(map, addressStart, addressEnd, ModeTravel, ruleName, sucessParams, ruleNameError, errorParams) {
  var addressPoints;
  var result = new Array();
  var service = new google.maps.DistanceMatrixService();
  if (map) {
    ebfMapsTraceRoute(map, addressStart, addressEnd, addressPoints, ModeTravel);
  }
  service.getDistanceMatrix({
    origins : [ addressStart ],
    destinations : [ addressEnd ],
    travelMode : ModeTravel
  }, calc);

  function calc(response, status) {
    responseElements = response.rows[0].elements[0];
    if (status == google.maps.DistanceMatrixStatus.OK && responseElements.status == google.maps.DistanceMatrixElementStatus.OK) {
      result[0] = responseElements.distance.text;
      result[1] = responseElements.duration.text;
      result[2] = responseElements.distance.value;
      result[3] = responseElements.duration.value;
      
      if(sucessParams instanceof Array && sucessParams != null){
        sucessParams.unshift(result);
      }else{
        sucessParams = [result];
      }
      
      sucessParams.splice(0, 0, result);
      executeRuleFromJS(ruleName, sucessParams);
    } else {    
      if(ruleNameError != null){
        executeRuleFromJS(ruleNameError, errorParams);
      }
    }
  }
}

function ebfMapsCalcRouteCoordenate(latOrigin, lngOrigin, latDestination, lngDestination, addressPoints, travelMode, ruleName, ruleParams) {
  var directionsService;
  var directionsRenderer;
  var addressPointsAux;   
  var result = new Array();

  if (addressPoints) {
    addressPointsAux = '['; 
    for (i = 0; i < addressPoints.length; i++) {
		
      if ((i + 1) == addressPoints.length) {
        addressPointsAux = addressPointsAux + '{location: new google.maps.LatLng(' + addressPoints[i][0] + ', ' + addressPoints[i][1] + ')}';
      } else {
        addressPointsAux = addressPointsAux + '{location: new google.maps.LatLng(' + addressPoints[i][0] + ', ' + addressPoints[i][1] + ')}, ';
      }
    }
    addressPointsAux = addressPointsAux + ']';
  }

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  
  var addressStart = new google.maps.LatLng(latOrigin, lngOrigin);
  var addressEnd = new google.maps.LatLng(latDestination, lngDestination);

  var request = {
    origin : addressStart,
    destination : addressEnd,
    waypoints : eval(addressPointsAux),    
    optimizeWaypoints: true,
    travelMode : travelMode
  };

  directionsService.route(request, function(response, status) {
    result = ['', '', 0, 0];
    if (status == google.maps.DirectionsStatus.OK) {    
      directionsRenderer.setDirections(response);             
      var route = response.routes[0];
      result[0] = route.legs[0].distance.text;
      result[1] = route.legs[0].duration.text;      
      result[2] = route.legs[0].distance.value;
      result[3] = route.legs[0].duration.value;      
    }
    
    if(ruleParams instanceof Array && ruleParams != null){
      ruleParams.unshift(result);
    }else{
      ruleParams = [result];
    }
     
    executeRuleFromJS(ruleName, ruleParams);
    
  });
  
  return directionsRenderer;
}

function ebfMapsSetOverlay(map, mapLayer, opt, visible) {
  if (mapLayer instanceof google.maps.MVCObject && typeof mapLayer.setMap === 'function') {
    mapLayer.setMap(null);
  }
  if (opt === 1 || opt === '1') {
    mapLayer = new google.maps.TrafficLayer();
  } else if (opt === 2 || opt === '2') {
    mapLayer = new google.maps.TransitLayer();
  } else if (opt === 3 || opt === '3') {
    mapLayer = new google.maps.BicyclingLayer();
  }
  if (visible) {
    mapLayer.setMap(map);
  }else{
    mapLayer.setMap(null);
  }
  return mapLayer;
}

function ebfMapsCenterMap(map, lat, lgt) {
  if (map) {
    var position = new google.maps.LatLng(lat, lgt);
    map.setCenter(position);
  }
}

function ebfMapsFrameOpenMap(form, component, zoom, lat, lgt, type, mapConfig) {
  if (form && component) {
    var mapOptions = {
      "zoom" : zoom || 8,
      "center" : new google.maps.LatLng(lat, lgt),
      "mapTypeId" : type,
      "gestureHandling": "greedy"
    };
    var groupBox = $c(component, form);
    var map = new google.maps.Map(groupBox, mapOptions);
    // Caso o navegador suporte MutationObserver, cria um listener para quando houver modificaÁ„o
    // no atributo style da Aba, forÁar um recarregamento do mapa, assim corrigindo o problema quando
    // se cria um mapa dentro de um elemento invisÌvel
    if (typeof MutationObserver === "function") {
      var mo = new MutationObserver(function () {
        google.maps.event.trigger(map, "resize");
      });
      mo.observe(groupBox.parentElement, {"attributes" : true, "attributeFilter" : ["style"]});
    }

    if(mapConfig != null && mapConfig != '' && mapConfig != undefined){
      map.setOptions(mapConfig);
    }

    return map;
  }
}

function ebfMapsCreateMarker(map, lat, lgt, title, image, animation, icon, letter, colorIcon, colorLetter, centralize, infowindow) {
  if (map) {
    if(icon == true && image == null) {
       image = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+letter+'|'+colorIcon.replace('#',"")+'|'+colorLetter.replace('#',"");
    }
    var center = new google.maps.LatLng(lat, lgt);
    var marker = new google.maps.Marker({
      position : center,
      map : map,
      title : title,
      icon : image,
      animation : animation
    });
      if(centralize == true){
      map.setCenter(center);
      }

	 // Par‚metros do texto que ser· exibido no clique
     if(infowindow){
    	var infowindow = new google.maps.InfoWindow({
    	  content: infowindow,
    	  maxWidth: 400
    	});

    	// Exibir texto ao clicar no pin;
    	google.maps.event.addListener(marker, 'click', function() {
    	  infowindow.open(map,marker);
    	});
    }

    return marker;
  }
}

function ebfMapsPolygonsArea(map, lat, color, borderOpacity, borderWeight, areaOpacity) {
  var lats = [];
  for (var i = 0; i < lat.length; i++) {
    var aux = lat[i]
    var mapAux = new Object();
    mapAux['lat'] = aux[0];
    mapAux['lng'] = aux[1]
    lats.push(mapAux);
  }

  var poly = new google.maps.Polygon({
    map: map,
    paths: lats,
    strokeColor: color,
    strokeOpacity: borderOpacity,
    strokeWeight: borderWeight,
    fillColor: color,
    fillOpacity: areaOpacity,
    draggable: false
  });

  poly.setMap(map);
  return poly;
}

function ebfMapsShowArea(map, lat, lng, radius, typeRadius, title, color, centralize) {
  var miles;

  if (typeRadius == 'km') {
    miles = radius / 1.609;
  } else {
    miles = radius;
  }

  var center = new google.maps.LatLng(lat, lng);
  var placemap = {};
  placemap[title] = {
    center : center,
    radius : miles
  };

  for ( var place in placemap) {
    var radiusOptions = {
      strokeColor : color,
      strokeOpacity : 0.8,
      strokeWeight : 2,
      fillColor : color,
      fillOpacity : 0.35,
      map : map,
      center : placemap[place].center,
      radius : placemap[place].radius * 1655
    };
    if(centralize == true){
      map.setCenter(center)
    }
    return new google.maps.Circle(radiusOptions);
  }
}

function ebfMapsStreetView(form, component, map, lat, lng, vertical, horizontal) {
  if (form && component) {
    var streetview;
    component = document.getElementById(component);
    var position = new google.maps.LatLng(lat, lng);
    var streetOptions = {
      position : position,
      enableCloseButton: true,
      addressControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }

    };
    streetview = new google.maps.StreetViewPanorama(component,streetOptions);
    map.setStreetView(streetview);
    return streetview;
  }
}

function ebfMapsImportLibrary (key, callbackRule, Params) {

  window.googlemapsCallbackFunction = function(){
    var parametros = Params;
    var ruleCallback = callbackRule;
    if(ruleCallback){
      executeRuleFromJS(callbackRule, parametros);
    }
  }

  var library = document.createElement("script");
  var url = "https://maps.googleapis.com/maps/api/js?callback=googlemapsCallbackFunction&libraries=geometry,places";

  if (key){
    url = url + "&key=" + key;
  }

  library.setAttribute('async', '');

  library.setAttribute("type", "text/javascript");

  library.setAttribute("src",  url);
  document.head.appendChild(library);
}

function ebfMapsCodeAddress(address, flow, params, errorFlow, errorParams){
  var syscode;
  var idForm;
   var geocoder = new google.maps.Geocoder();
   geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var gResult;
      gResult = results[0].geometry.location.toString().replace('(','').replace(')','');
      gResult = gResult.split(",");
      if (params instanceof Array && params != null){
        for (i=0; i < params.length; i++ ){
           gResult[i + 2] = params[i];
         }
      }
      executeJSRuleNoField(syscode, idForm, flow, gResult);
    } else {
      if(errorFlow != null) {
         executeJSRuleNoField(syscode, idForm, errorFlow, errorParams);
      }
    }
  });
}

function ebfMapsAddressFromLatLgn(lat, lgn, flow, param) {
    var geocoder = new google.maps.Geocoder();
    var latlng = {
        lat: parseFloat(lat),
        lng: parseFloat(lgn)
    };
    return geocoder.geocode({
        'location': latlng
    }, function(results, status) {
        var address = "";
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              address = results[0].formatted_address;
            }
        } else {
            console.log("N„o foi possÌvel obter o endereÁo a partir das coordenadas. CÛdigo do erro: " + status)
        }
        
        if (param instanceof Array){
          param.unshift(address);
        }else{
          param = new Array();
          param[0] = address;
        }
        executeRuleFromJS(flow, param);
    });
}

function ebfMapsGetGeoCodeFromLatLgn(lat, lgn, flow, param) {
    var geocoder = new google.maps.Geocoder();
    var latlng = {
        lat: parseFloat(lat),
        lng: parseFloat(lgn)
    };
    return geocoder.geocode({
        'location': latlng
    }, function(results, status) {
        var GeoObject = {};
        if (status == google.maps.GeocoderStatus.OK) {
            if (results) {
              GeoObject.results = results;
              GeoObject.status = status;
            }
        } else {
            GeoObject.status = status;
            console.log("N„o foi possÌvel obter o endereÁo a partir das coordenadas. CÛdigo do erro: " + status)
        }
        
        if (param instanceof Array){
          param.unshift(GeoObject);
        }else{
          param = new Array();
          param[0] = GeoObject;
        }
        executeRuleFromJS(flow, param);
    });
}
     
function ebfMapsGetCoordnateStreetView(street, flow, param) {
  google.maps.event.addListener(street, 'position_changed', function() {
    var position = street.getPosition();
    var list = new Array();
    var pos = position.toString();
    pos = pos.replace("(", "");
    pos = pos.replace(")", "");
    var latlgn = pos.split(",");
    list[0] = latlgn[0];
    list[1] = latlgn[1];
    if(param instanceof Array && param != null){
      for (i = 0; i < param.length; i++) {
        list[i + 2] = param[i];
      }
    }
    executeRuleFromJS(flow, list);
  });
}

function ebfMapsRemoveAllListeners(map){
  if(map){
    google.maps.event.clearInstanceListeners(map);
  }
}

function ebfMapsRemoveMarkers(marker){
  if(marker){
    if(marker instanceof Array){
      for(i=0; i < marker.length; i++){
        if(marker[i] instanceof google.maps.Marker){
          marker[i].setMap(null);
        }
      }
    }

    if(marker instanceof google.maps.Marker){
      marker.setMap(null);
    }
  }
}

function ebfMapsTraceRoute(map, addressStart, addressEnd, addressPoints, travelMode) {
  var directionsService;
  var directionsRenderer;
  var addressPointsAux;

  if (addressPoints) {
    addressPointsAux = '[';
    for (i = 0; i < addressPoints.length; i++) {
      if ((i + 1) == addressPoints.length) {
        addressPointsAux = addressPointsAux + '{location: \"' + addressPoints[i] + '\"}';
      } else {
        addressPointsAux = addressPointsAux + '{location: \"' + addressPoints[i] + '\"},';
      }
    }
    addressPointsAux = addressPointsAux + ']';
  }
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  var request = {
    origin : addressStart,
    destination : addressEnd,
    waypoints : eval(addressPointsAux),
    travelMode : google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
    }
  });

  return directionsRenderer;
}

function ebfMapsTraceRouteCoordenate(map, latOrigin, lngOrigin, latDestination, lngDestination, addressPoints, travelMode) {
  var directionsService;
  var directionsRenderer;
  var addressPointsAux;

  if (addressPoints) {
    addressPointsAux = '[';
    for (i = 0; i < addressPoints.length; i++) {

      if ((i + 1) == addressPoints.length) {
        addressPointsAux = addressPointsAux + '{location: new google.maps.LatLng(' + addressPoints[i][0] + ', ' + addressPoints[i][1] + ')}';
      } else {
        addressPointsAux = addressPointsAux + '{location: new google.maps.LatLng(' + addressPoints[i][0] + ', ' + addressPoints[i][1] + ')}, ';
      }
    }
    addressPointsAux = addressPointsAux + ']';
  }

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  var addressStart = new google.maps.LatLng(latOrigin, lngOrigin);
  var addressEnd = new google.maps.LatLng(latDestination, lngDestination);

  var request = {
    origin : addressStart,
    destination : addressEnd,
    waypoints : eval(addressPointsAux),
    travelMode : travelMode
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
    } else {
      return status;
    }
  });

  return directionsRenderer;
}

function ebfMapsGetNearbySearch (map, lat, lng, radius, filter, mk, urlIcon, callback){
  if(isNullOrEmpty(map)){
    handleException(new Error("Objeto Mapa (GoogleMaps) n„o definido."));
  } else{
    var pyrmont = new google.maps.LatLng(lat, lng);
    var service;
    var infowindow;
    radius = radius === undefined || radius === null ? 1000 : (radius * 1000);
    
    var request = {
      location: pyrmont,
      radius: radius,
      type:[filter]
    };
    
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callBack);    
  }
  
  function callBack (results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
    var lm = new Array();  
      if(mk){ 
        for(var i=0; i < results.length; i++){
          lm.push(createMarkerPlace(results[i]));
        }
      }  
      
      executeRuleFromJS(callback, new Array(results, lm));
    } else {
      handleException(new Error("Houve um problema, status do erro:" + status));
    }
  };

  function createMarkerPlace (place){
    var placeLoc = place.geometry.location;
    urlIcon = urlIcon === undefined || urlIcon === null ? place.icon : urlIcon;    
    
    var image = {
      url: urlIcon,      
      size: new google.maps.Size(20, 20),
      scaledSize: new google.maps.Size(20, 20)    
    };
    
    var options = {
      map: map,
      position: placeLoc,
      icon: image     
    };
    
    var marker = new google.maps.Marker(options);
    google.maps.event.addListener(marker, 'click', function(){     
      infowindow.setContent(place.name);
      infowindow.open(map, this);      
    });    
    return marker;
  }; 
};

function ebfMapComputeDistanceBetween(coordsOne, coordsTwo){
  if(coordsOne instanceof Array && coordsTwo instanceof Array){
    var p1 = new google.maps.LatLng(coordsOne[0], coordsOne[1]);
    var p2 = new google.maps.LatLng(coordsTwo[0], coordsTwo[1]); 
  
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2);    
  }  
  return null;
}

function ebfSetLocalVariable(varName, varValue) {
  return top.document[varName] = varValue;
}

function ebfGetLocalVariable(varName) {
  return top.document[varName];
}

function ebfRestCall(action, url, ParamsURL, ruleCallback, Params, headerParams, paramBody, charset, ruleCallbackError, paramsRuleError) {
  var data = "";
  action = action.toUpperCase();
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200 || this.status == 201 || this.status == 202 ){
        if (ruleCallback) {
          var content = convertNonUnicodeChars(this.responseText);
          Params = Params == null ? [] : Params
          ebfSetElementAtList(Params, content, 1)
          executeRuleFromJS(ruleCallback, Params);
        }
      }else{
        if (ruleCallbackError) {
          var content = this.status.toString();
          paramsRuleError = paramsRuleError == null ? [] : paramsRuleError
          ebfSetElementAtList(paramsRuleError, content, 1)
          executeRuleFromJS(ruleCallbackError, paramsRuleError);
        }
      }
    }
  };

  if (action == "POST" || action == "PUT") {
    if(ParamsURL !== undefined && ParamsURL !== 'undefined' && ParamsURL !== null && ParamsURL instanceof MakerMap){
      for(j=0; j < ParamsURL.size(); j++){
        if(ParamsURL.size() > 1 && j + 1 < ParamsURL.size() ){
          data += "" + ParamsURL.keys[j]+'='+ebfMapGetObject(ParamsURL, ParamsURL.keys[j])+'&';
        }else{
          data += "" + ParamsURL.keys[j]+'='+ebfMapGetObject(ParamsURL, ParamsURL.keys[j]);
        }
      }
    }else{
      data = ParamsURL;
    }
  } else {
    if (ParamsURL != "" && ParamsURL !== undefined && ParamsURL !== 'undefined' && ParamsURL !== null) {
      url = url + "?" + ParamsURL;
    }
  }

  xhr.overrideMimeType('text/plain; charset=' + top.ENCODING);
  xhr.open(action, url, true);

  if(headerParams !== undefined && headerParams instanceof MakerMap){
    for(i=0; i < headerParams.size(); i++){
      xhr.setRequestHeader(headerParams.keys[i], ebfMapGetObject(headerParams, headerParams.keys[i]));
    }
  }

  xhr.send(data == "" ? null : data);
}

function ebfSetElementAtList() {
  var value = null;
  if (existArgs(arguments)) {
    var list = arguments[0];
    var element = arguments[1];
    var position = arguments[2];
    if (position) {
      position--;
      position = Math.max(0, position);
      position = Math.min(position, list.length);
      if (position == 0) {
        list.unshift(element);
      } else if (position == (list.length)) {
        list.push(element);
      } else {
        var arr1 = list.slice(0, (position-1));
        arr1.push(element);
        var arr2 = list.slice(position);
        value = new Array();
        value = value.concat(arr1);
        value = value.concat(arr2);
      }
    } else {
      list.push(element);
    }
    value = list;
  }
  return value;
}

function ebfRemoveLineBreak() {
  var value = "";
  if (existArgs(arguments)) {
    value = arguments[0].replace(/(\r\n|\n|\r)/gm,"");
  }
  return value;
}

function ebfExecuteJSFromWindow(newWindow, jsQuery) {
  try {
    if(!newWindow) {
      return eval(jsQuery);
    } else if(newWindow instanceof HTMLIFrameElement) {
      newWindow = newWindow.contentWindow;
    }
    return newWindow.eval(jsQuery);
  } catch(e) {
    handleException(new Error(e));
  }
}

function ebfAuthSMS(phone, onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().authSMS(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, phone);
}

function ebfEmailLogin(email, password, onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().emailLogin(formGUID, onSuccess, onSuccessParams ? onSuccessParams : [], onFail, onFailParams ? onFailParams : [], email, password);
}

function ebfAuthIsUserLoggedIn() {
  return parseBoolean(top.getAuthUtils().isUserLoggedIn());
}

function ebfFacebookLoginMobile(onSuccess, onSuccessParams, onFail, onFailParams, facebookParams) {
  top.getAuthUtils().facebookLogin(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, facebookParams);
}

function ebfGoogleLogin(onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().googleLogin(formGUID, onSuccess, onSuccessParams, onFail, onFailParams);
}

function ebfLogoutFirebase () {
  top.getAuthUtils().onLogout();
}
           
function ebfResetPassword(email, onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().passwordReset(formGUID, onSuccess, onSuccessParams, onFail, onFailParams, email);
}

function ebfEmailVerification(onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().emailVerification(formGUID, onSuccess, onSuccessParams ? onSuccessParams : [], onFail, onFailParams ? onFailParams : []);
}
 
function ebfFirebaseTokenLogin(token, onSuccess, onSuccessParams, onFail, onFailParams) {
  top.getAuthUtils().tokenLogin(formGUID, onSuccess, onSuccessParams ? onSuccessParams : [], onFail, onFailParams ? onFailParams : [], ebfRemoveLineBreak(token));
}
          
function ebfFirebaseConnect() {
  top.getFirebaseDatabaseUtils().connect();
}

function ebfFirebaseOnDisconnect(connRef, node, data) {
  top.getFirebaseDatabaseUtils().onDisconnect(node, data);
}
           
function ebfFirebaseWriteData(connRef, node, udid, data, async, onSuccess, onSuccessParams, errorRule, errorParams) {
  return top.getFirebaseDatabaseUtils().writeData(node, udid, data, async, onSuccess, onSuccessParams, errorRule, errorParams);
}

function ebfFirebaseReadData(connRef, node, filter, orderType, orderData, onSuccess, onSuccessParams) {
  top.getFirebaseDatabaseUtils().readData(formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData);
}

function ebfFirebaseMonitoringData(connRef, node, filter, orderType, orderData, onSuccess, onSuccessParams) {
  top.getFirebaseDatabaseUtils().monitoring(formGUID, onSuccess, onSuccessParams, node, filter, orderType, orderData);
}

function ebfFirebaseStopMonitoringData(connRef, node) {
  top.getFirebaseDatabaseUtils().stopMonitoring(node);
}

function ebfGeoFireSetPosition(node, key, lat, lgt, onSuccess, onSuccessParams) {
  top.getGeoFireUtils().setPosition(onSuccess, onSuccessParams, node, key, lat, lgt);
}

function ebfGeoFireWatchArea(node, lat, lgt, radius, onSuccess, onSuccessParams) {
  top.getGeoFireUtils().watch(onSuccess, onSuccessParams, node, lat, lgt, radius);
}

function ebfGeoFireStopWatching() {
  top.getGeoFireUtils().stopWatching();
}

function ebfSetLogDebug() {
  console.log(arguments[0]);
}

function ebfClearTimeOut(id){
 if(typeof id === 'number'){
   window.clearTimeout(id);
 }
}

function ebfSetOnBackPress(backEvent, backParams){
  top.backEvent = backEvent;
  top.backParams = backParams;
  top.backFormCaller = formGUID;
}

function ebfMapsDrawIcon(iconSymbol, iconColor, iconOpacity, borderColor, borderWeight, iconRotation) {
  
  var lineSymbol = {
    path: eval(iconSymbol),
    fillColor: iconColor,
    fillOpacity: iconOpacity,     
    strokeColor: borderColor,
    strokeWeight: borderWeight,
    rotation: iconRotation?iconRotation:0
  };  

  return lineSymbol;
}

function ebfMapsDrawRouteDinamicaly(map, latOrigin, lngOrigin, latDestination, lngDestination, travelMode, iconLine, iconPosition, iconFlex, lineColor, lineOpacity, callback, param, callbackError, paramError) {
  var line;
  var directionsService = new google.maps.DirectionsService();
  var call;
  var callError;

  if(!iconLine){
    iconLine = {};
  }else{
    iconLine = { fixedRotation: !iconFlex, icon: iconLine, offset: iconPosition + '%' }
  }

  line = new google.maps.Polyline({
    strokeColor: lineColor?lineColor:'black',
    strokeOpacity: lineOpacity?lineOpacity:0.4,
    path: [],
    icons: [iconLine],
  });

  calcRoute();

  function calcRoute() {
    var start = new google.maps.LatLng(latOrigin, lngOrigin);
    var end = new google.maps.LatLng(latDestination, lngDestination);
    var request = {
        origin:start,
        destination:end,
        travelMode: eval('google.maps.TravelMode.' + travelMode)
    };

    call = callback;
    callError = callbackError;
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        //Adiciona a dist‚ncia/tempo entre os pontos.
        line.duration = response.routes[0].legs[0].duration;
        line.distance = response.routes[0].legs[0].distance;
        var legs = response.routes[0].legs;


        for (i=0;i<legs.length;i++) {
          var steps = legs[i].steps;
          for (j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            for (k=0;k<nextSegment.length;k++) {
              line.getPath().push(nextSegment[k]);
            }
          }
        }
        if(call){
          if (param instanceof Array){
            param.unshift(response);
          }else{
            param = new Array();
            param[0] = response;
          }
          executeRuleFromJS(call, param);
        }

      } else {
        if(callError) {
          if(paramError instanceof Array) {
            paramError.unshift(status);
          } else {
            paramError = new Array();
            paramError[0] = status;
          }
          executeRuleFromJS(callError, paramError);
        }
      }
    });
  }

  line.setMap(map);

  return line;
}

function ebfMapsChangeIconPosition(line, symbol, perc) {
  var icons = line.get('icons');
  icons[0].offset = perc + '%';
  line.set('icons', icons);
}

function ebfMathFloor(theta) {
  var result = Math.floor(toDouble(theta));
  if (isNaN(result)) {
    throw "Argumento inv·lido arredondando o valor para baixo.";
  }
  return result;
}

function oprRound() {
  var value = 0;
  if (existArgs(arguments)) {
    value = Math.round(parseNumeric(arguments[0]));
  }
  return value;
}

function ebfIsEmail(value) {
  if (value == null || typeof value == "undefined" || value == "") {
    return false;
  } 
  
  var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regExp.test(value);
}

function ebfAppIsInBackground(){
  return top.getUtils().isInBackground();
}

function ebfCreateNotification(notificationRule, notificationParams, notificationTitle, notificationText, autocancel, ongoing, notificationID) {
  return top.getUtils().createNotification(notificationRule, notificationParams, notificationTitle, notificationText, autocancel, ongoing, notificationID);
}

function ebfSetRuleOnConnect(rule, params) {
  return top.getNetworkUtils().setRuleOnConnect(rule, params);
}

function ebfSetRuleOnDisconnect(rule, params) {
  return top.getNetworkUtils().setRuleOnDisconnect(rule, params);
}

function ebfStartLocationService(successRule, succesParams, errorRule, errorParams) {
  return top.getLocationUtils().startLocationService(formGUID, successRule, succesParams, errorRule, errorParams);
}

function ebfGetCurrentLocation() {
  return top.getLocationUtils().getCurrentLocation();
}

function ebfGetGPSLastCoords() {
  return top.getLocationUtils().getGPSLastCoords();
}

function ebfStartMonitoringGPS(monitoringRule, monitoringParams, priority, interval, fastestInterval) {
  return top.getLocationUtils().startMonitoringGPS(formGUID, monitoringRule, monitoringParams, priority, interval, fastestInterval);
}

function ebfDisconnectLocationService() {
  return top.getLocationUtils().disconnect();
}

function oprBetween() {
 var between = false;
 if (existArgs(arguments)) {
   var value = arguments[0];
   var v1 = arguments[1];
   var v2 = arguments[2];
   if (!isNullable(value) && !isNullable(v1) && !isNullable(v2)) {
     if ((value instanceof Date) && (v1 instanceof Date) && (v2 instanceof Date)) {
       between = value.compareTo(v1) >= 0 && value.compareTo(v2) <= 0;
     } else if ((value instanceof Time) && (v1 instanceof Time) && (v2 instanceof Time)) {
       between = value.compareTo(v1) >= 0 && value.compareTo(v2) <= 0;
     } else if ((typeof value == "number") && (typeof v1 == "number") && (typeof v2 == "number")) {
       between = value >= v1 && value <= v2;
     } else {
       between = value.toString() >= v1.toString() && value.toString() <= v2.toString();
     }
   }
 }
 return between;
}

function ebfAESEncryptMessage (m, k) {
  if(isNullOrEmpty(k))
    handleException(new Error("A chave n„o pode ser nula ou vazia"));     
    
  return CryptoJS.AES.encrypt(m,k).toString();
}

function ebfAESDecryptMessage (mc, k) {
  if(isNullOrEmpty(k))  
    handleException(new Error("A chave n„o pode ser nula ou vazia."));    

  var md = CryptoJS.AES.decrypt(mc, k).toString(CryptoJS.enc.Utf8);
  return md;
}

function ebfTranslate(text) {
  
  return text;
  /*
  // Caso o texto n„o tenha sida definido, ent„o retorna o prÛprio valor
  if ((text == null) || (typeof text == "undefined") || (text === "")) {
    return text;
  }
	
  var value = text;
	
  // Traduz o texto
  if (this.translations.findKey(resources_locale) != -1) {
    var resourcesMap = this.translations.get(resources_locale);
    if (resourcesMap.findKey(text) != -1) {
      value = resourcesMap.get(text);
    }
  }  

  // Tabela de TraduÁ„o.  
  try {
    if (eval("resources_" + resources_locale) && eval("resources_" + resources_locale)[text]) {  
      return eval("resources_" + resources_locale)[text];
    }  
  } catch(e) {}

  // Trata os par‚metros, caso haja
  if ((arguments.length > 1) && (arguments[1] != null) && (typeof arguments[1] != "undefined")) {
    if (arguments[1] instanceof Array) {
      // ObtÈm o Array
      var params = arguments[1];

      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (param != null && typeof param != "undefined") {
          var regexp = new RegExp("\\{" + (i) + "\\}", "g");
          value = value.replace(regexp, param);
        }
      }
    } else {
      // ObtÈm os par‚metros definidos a partir do segundo par‚metro
      for (var i = 1; i < arguments.length; i++) {
        var param = arguments[i];
        if (param != null && typeof param != "undefined") {
          var regexp = new RegExp("\\{" + (i-1) + "\\}", "g");
          value = value.replace(regexp, param);
        }
      }
    }    
  }
  return value;*/
}

function ebfToggleA920Light () {
  top.getA920Utils().toggleLight();
}

function ebfPrintText(text) {
  top.getA920Utils().printText(text);
}

function ebfPrintQrCode(dir) {
  top.getA920Utils().printQrCode(dir);
}

function ebfReadCardIcc(onSuccess, onSuccessParams, onError, onErrorParams) {
  top.getA920Utils().readIcc(onSuccess, onSuccessParams, onError, onErrorParams, formGUID);
}

function ebfReadCardMag(onSuccess, onSuccessParams, onError, onErrorParams) {
   top.getA920Utils().readMag(onSuccess, onSuccessParams, onError, onErrorParams, formGUID);
}

function ebfRecordVoice(format){
  return top.getAudioUtils().startRecord(format);
}
function ebfStopAudioRecord(){
  return top.getAudioUtils().stopRecord();
}

function ebfSetHardwareAccelerated(status){
  top.getUtils().SetHardwareAccelerated(status);
}

function ebfFingerprintValidation(onSuccess, onSuccessParams, onFail, onFailParams) {
  return top.getFingerprintUtils().fingerprintValidation(formGUID, onSuccess, onSuccessParams, onFail, onFailParams);
}

function ebfGetAppVersion(){
  return top.getUtils().getAppVersion();
}

function ebfGetDeviceInfo(){
  return top.getUtils().getDeviceInfo();
}

try{
!function(t){"window"in t&&"document"in t&&function(){function n(t){if(this._data=[],t)for(var n=0;n<t.elements.length;++n){var e=t.elements[n];""!==e.name&&this.append(e.name,e.value)}}function e(t,n){return{next:function(){return this._i>=this._data.length?{done:!0}:(++this._i,{done:!1,value:n(this._data[this._i-1])})},_i:0,_data:t}}if(!("FormData"in t&&"set"in t.FormData.prototype)){(n.prototype={append:function(n,e,i){var a=String(n),o=e;"Blob"in t&&e instanceof t.Blob&&(o=new File(e,"blob")),i&&"File"in t&&e instanceof t.File&&(o=new File(o,i)),this._data.push([a,o])},toString:function(){return this._data.map(function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])}).join("&")}}).set=function(n,e,i){for(var a=!1,o=0;o<this._data.length;++o)this._data[o][0]===n&&(a?(this._data.splice(o,1),--o):(this._data[o][1]=e,i&&"File"in t&&e instanceof t.File&&(this._data[o][1].name=i),a=!0));a||this.append(n,e,i)},n.prototype.get=function(t){for(var n=0;n<this._data.length;++n)if(this._data[n][0]===t)return this._data[n][1];return null},n.prototype.getAll=function(t){for(var n=[],e=0;e<this._data.length;++e)this._data[e][0]===t&&n.push(this._data[e][1]);return n},n.prototype.has=function(t){return null!==this.get(t)},n.prototype.delete=function(t){for(var n=0;n<this._data.length;++n)this._data[n][0]===t&&(this._data.splice(n,1),--n)},n.prototype.entries=function(){return e(this._data,function(t){return[t[0],t[1]]})},n.prototype.keys=function(){return e(this._data,function(t){return t[0]})},n.prototype.values=function(){return e(this._data,function(t){return t[1]})},n.prototype[Symbol.iterator]=function(){return this._data[Symbol.iterator]()},t.FormData=n;var i=t.XMLHttpRequest.prototype.send;}}()}(self);
}catch(e){console.log("Recurso FormData n„o suportado para este dispositivo")}

var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();
