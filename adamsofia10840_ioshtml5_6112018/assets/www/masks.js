function preencheCampoMascara(v, mascara) {
	
  if(mascara=="(##) ####-####")
	{  
       v = v.replace(/\D/g,""); v = v.replace(/^(\d{2})(\d)/g,"($1)$2");v = v.replace(/(\d)(\d{4})$/,"$1-$2"); 
	   return v;
    }
	
  if (v.length == 0)
    return v;
  
  var digitos = "00";  
  if (mascara.indexOf('$') > -1) {
    digitos = "";
    decimalLength = (mascara.length > 1) ? parseInt(mascara.replace("$", "")) : 2;
    for (i = 0; i < decimalLength; i++)
      digitos += "0";
  }
    
  mascara = ebfReplaceMascara(mascara);
  if (!isNaN(v)) {
    if ((mascara.indexOf(".") > -1) && (mascara.indexOf(",") > -1)) {
      if (v.toString().indexOf(".") > -1) {
                               maskDecimalLength = (mascara.length > 1) ? mascara.length - mascara.indexOf(',') - 1 : 0;
                               var s = v.toString();
                               numberDecimalLength = (s.length > 1) ? s.length - s.indexOf('.') - 1: 0;
                               if(maskDecimalLength < numberDecimalLength) {
                                 s = s.substring(0, s.length - (numberDecimalLength - maskDecimalLength))
                               }
                               while(maskDecimalLength > numberDecimalLength) {
                                   s += "0";
                                   numberDecimalLength++;
                                }
                                v = s;
        return formataCampoInverso(v, mascara);
                        }
      else
        return formataCampoInverso(v.toString()+digitos, mascara);
    } else {
      return formataCampo(v, mascara);  
    }
  } else {
    return formataCampo(v, mascara);
  }
}

function isAlpha(val) {
  alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (alpha.indexOf(val) > -1) { return true; } else { return false; }
}

function tratarCaracterMascara(caracter, charMask)
{
  valor = "";
  if (((charMask == '#') || (charMask == '9') || (charMask.toUpperCase() == "D") || (charMask.toUpperCase() == "M") || (charMask.toUpperCase() == "Y")) && (!isNaN(caracter))) {
    valor = caracter;
  } else if ((charMask.toUpperCase() == "U") && (isAlpha(caracter))) {
    valor = caracter.toUpperCase();
  } else if ((charMask == "l") && (isAlpha(caracter))) {
    valor = caracter.toLowerCase();
  } else if ((charMask == "L") && (isAlpha(caracter))) {
    valor = caracter;
  } else if ((charMask == "A") && ((isAlpha(caracter)) || (!isNaN(caracter)))) {
    valor = caracter;
  }   
  return valor;
}

function formataCampo(v, Mascara) { 
        var boleanoMascara; 
        exp = /\-|\,|\:|\.|\/|\(|\)| /g
        campoSoNumeros = v.toString().replace( exp, "" ); 
   
       var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;
    
    if (Mascara.indexOf("U>") > -1)
      return v.toUpperCase();
    if (Mascara.indexOf("l>") > -1)
      return v.toLowerCase();
    
    for(i=0; i<= TamanhoMascara; i++) { 
        boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                            || (Mascara.charAt(i) == "/")) 
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                            || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == ":") 
                            || (Mascara.charAt(i) == ",") || (Mascara.charAt(i) == "0"))
                boleanoMascara  = boleanoMascara && !isNull(v);                            
        if (boleanoMascara) { 
            NovoValorCampo += Mascara.charAt(i); 
            TamanhoMascara++;
            if (Mascara.charAt(i) == '0')
              posicaoCampo++;
        }else { 
            valor = tratarCaracterMascara(campoSoNumeros.charAt(posicaoCampo), Mascara.charAt(i));
            if (valor == "") { i++; }
            NovoValorCampo += valor; 
            posicaoCampo++; 
          }              
      }   
      return NovoValorCampo;
}

function formataCampoInverso(v, Mascara) { 
        var boleanoMascara; 
        
        exp = /\-|\,|\:|\.|\/|\(|\)| /g
        campoSoNumeros = v.toString().replace( exp, "" ); 
    var posicaoCampo = campoSoNumeros.length-1;    
    var NovoValorCampo="";
    var TamanhoMascara = Mascara.length;

    for(i=TamanhoMascara-1; i>= TamanhoMascara - campoSoNumeros.length; i--) { 
        boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") 
                            || (Mascara.charAt(i) == "/")) 
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                            || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == ":") 
                            || (Mascara.charAt(i) == ",") || (Mascara.charAt(i) == "0")) 
          boleanoMascara  = boleanoMascara && !isNull(v);
        if (boleanoMascara) { 
            NovoValorCampo = Mascara.charAt(i) + NovoValorCampo; 
            TamanhoMascara--;
            if (Mascara.charAt(i) == '0')
              posicaoCampo--;
        }else { 
            NovoValorCampo = campoSoNumeros.charAt(posicaoCampo) + NovoValorCampo; 
            posicaoCampo--; 
          }              
      }   
      
      return NovoValorCampo;
}

function BackSpace(e){
  var tecla=(window.event)?event.keyCode:e.which;   
  if (tecla == 8)
    return true;
  else  
    return false;
}


function SomenteNumero(e){
  var tecla=(window.event)?event.keyCode:e.which;   
  if((tecla > 47 && tecla < 58)) return true;
    else{
      if (tecla == 8 || tecla == 0) 
        return true;
    else  
      return false;
    }
}

function removeMask(value, mask){
  if(isNullable(value) || isNullable(mask)){
    return value;
  }
  mask = ebfReplaceMascara(mask);
  var valorAntgio = value;
  var remove = "";
    var STRING_MASK_CHARS = "09#L|?AaCc&<>!'*{}^;";

  for  (var i = 0; i < mask.length; i++)  {
    var c = mask.charAt(i);
    if (STRING_MASK_CHARS.indexOf(c) != -1) {
      if (i > 0) {
        if (mask.charAt(i - 1) == '\\') {
          remove += c;
        }
      }
    } else if (c != '\\')
      remove += c;
  }
  
  for (var i = 0; i < remove.length; i++) {
    value = value.replace(remove.charAt(i),"");
  }
  return value;
}
 
// define the addEvent(oElement, sEvent, sCmd, bAppend) function
function $addEvent(o, _e, c, _b){
  var e = _e.toLowerCase(), b = (typeof _b == "boolean") ? _b : true, x = (o[e]) ? o[e].toString() : "";
  // strip out the body of the function
  x = x.substring(x.indexOf("{")+1, x.lastIndexOf("}"));
  x = ((b) ? (x + c) : (c + x)) + "\n";
  return o[e] = (!!window.Event) ? new Function("event", x) : new Function(x);
}

function mascaraPadrao(o,f,p){
  v_obj=o
    v_fun=f
  v_par=p
    setTimeout("execmascara2()",10)
}
 
function execmascara2(){
  v_obj.value=v_fun(v_obj.value,v_par)
}


function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",10)
}
 
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
 
function leech(v){
    v=v.replace(/o/gi,"0")
    v=v.replace(/i/gi,"1")
    v=v.replace(/z/gi,"2")
    v=v.replace(/e/gi,"3")
    v=v.replace(/a/gi,"4")
    v=v.replace(/s/gi,"5")
    v=v.replace(/t/gi,"7")
    return v
}

function inteiro(v){  
  var sinal = ((v.length > 0) && (v.charAt(0) == "-")) ? "-" : "";
  var n = v.replace(/\D/g,"");//Remove tudo o que não é dígito  
        return sinal+n;
}

function numerico(v){
  var sinal = ((v.length > 0) && (v.charAt(0) == "-")) ? "-" : "";
  var caracter = (v.indexOf(DECIMAL_POINT) > -1) ? true : false;

  var inteiro, decimal;
  if (caracter){
    arr = v.split(DECIMAL_POINT)
    inteiro = arr[0]; decimal = arr[1];
  } else {
    inteiro = v; decimal = "";  
  }
  inteiro=inteiro.replace(/\D/g,"") //Remove tudo o que não é dígito
  decimal=decimal.replace(/\D/g,"") //Remove tudo o que não é dígito
  
  m = "";
  for (i = 0; i < inteiro.length; i++) {
    m = "#" + m;
    if (((i+1) % 3) == 0)
      m = GROUPING_POINT + m;
  }
  m = ((m.length > 0) && (m.charAt(0) == GROUPING_POINT)) ? m.substring(1) : m;
  inteiro = formataCampo(inteiro, m);
  final = (caracter) ? sinal+inteiro+DECIMAL_POINT+decimal : sinal+inteiro;

  return final;
}


function moeda(v){  
    v=v.replace(/\D/g,"");//Remove tudo o que não é dígito 
    v=v.replace(/(\d)(\d{20})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos qui milhões  
    v=v.replace(/(\d)(\d{17})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos qua milhões  
    v=v.replace(/(\d)(\d{14})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos trilhões  
    v=v.replace(/(\d)(\d{11})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos bilhões  
    v=v.replace(/(\d)(\d{8})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos milhões  
    v=v.replace(/(\d)(\d{5})$/,"$1"+GROUPING_POINT+"$2");//coloca o ponto dos milhares  
  
    v=v.replace(/(\d)(\d{2})$/,"$1"+DECIMAL_POINT+"$2");//coloca a virgula antes dos 2 últimos dígitos  
    return v;  
}

function mascaraTelefone(campo) {
  
  function trata( valor,  isOnBlur ) {
    
    valor = valor.replace(/\D/g,"");                   
    valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2");     
    
    if(isOnBlur) {
      
      valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");   
    } else {

      valor = valor.replace(/(\d)(\d{3})$/,"$1-$2"); 
    }
    return valor;
  }
  
  campo.onkeypress = function(evt) {
     
    var code = (window.event)? window.event.keyCode : evt.which;  
    var valor = this.value
    
    if(code > 57 || (code < 48 && code != 8 ))  {
      return false;
    } else {
      this.value = trata(valor, false);
    }
  }

  campo.onblur = function() {
    
    var valor = this.value;
    if( valor.length < 10 ) { //No Samsung, ao digitar, a máscara não é realizada na hora. Com isso, assume-se que valores < 10 são inválidos.
      this.value = ""
    }else {    
      this.value = trata( this.value, true );
    }
  }
  
  campo.maxLength = 14;
}


function currencyFormat(element, maxlength, evt, decimal, mask) {
  var decimalSeparator;
 
 decimalSeparator = top.DECIMAL_POINT;  
  
  var groupingSeparator;
  groupingSeparator = top.GROUPING_POINT;
  
  
  var isNegative = /^-/.test(element.value);
  var keyCode = evt.keyCode || evt.which;

  var decimalQtt = 2;
  var regexp = new RegExp("^\\$(\\d*)$");
  var decimals = regexp.exec(mask);
  if (decimals.length > 1) {
    decimalQtt = decimals[1];
  }
  if (isNullable(decimalQtt) || decimalQtt < 1) {
    decimalQtt = 2;
  }

  var value = element.value;
  if (isNullable(value)) {
    value = "";
  }
  
  var cleanValue = value.replace(/[^\d]+/gi, "").replace(/^0+/, "");

  if (cleanValue.length <= 0) {
    value = ("0" + decimalSeparator);
    
    var temp = decimalQtt;
    while (temp-- > 0) {
      value += "0";
    }
  } else {
    // 25 -> 0,025
    // 256 -> 0,256
    if (cleanValue.length <= decimalQtt) {
      value = ("0" + decimalSeparator);
      
      var temp = (decimalQtt - cleanValue.length);
      while (temp-- > 0) {
        value += "0";
      }
      
      value += cleanValue;
    } else {
      // 2568 -> 2,568
      // 25689 -> 25,689
      // 256897 -> 256,897
      // 2568974 -> 2.568,974
      // 452568974 -> 452.568,974
      // 120030010 -> 1.200.300,10
      var decimalPosition = (cleanValue.length - decimalQtt);
      var decimalValue = cleanValue.substring(decimalPosition, cleanValue.length);
      var finalFloatValue = "";
      
      var floatValue = cleanValue.substring(0, decimalPosition);
      
      var temp = (cleanValue.length - decimalQtt);
      while (temp > 3) {
        var tempPosition = (floatValue.length - 3);
        var tempFloatValue = floatValue.substring(tempPosition, floatValue.length);
        
        floatValue = floatValue.substring(0, tempPosition);
        temp = floatValue.length;
        
        finalFloatValue = (groupingSeparator + tempFloatValue + finalFloatValue);
        
        if (temp <= 3) {
          finalFloatValue = (floatValue + finalFloatValue);
        }
      }
      
      if (finalFloatValue.length == 0) {
        finalFloatValue = floatValue;
      }
      
      value = (finalFloatValue + decimalSeparator + decimalValue);
    }
  }
  
  element.value = value;
  
  var negativeIsNotDefined = /^[^-]/.test(element.value);
  if (isNegative && negativeIsNotDefined) {
    value = ("-" + element.value);
    element.value = value;
  }
  
  return value;
}