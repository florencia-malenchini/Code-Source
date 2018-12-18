function teste() {
  
  alert('foi');
  
};



function ebfMapsOpenMapOnDivW(form, component, zoom, lat, lgt, type) {
  if (form && component) {
    var mapOptions = {
      "zoom" : zoom || 8,
      "center" : new google.maps.LatLng(lat, lgt),
      "mapTypeId" : type
    };
    var div = document.getElementById(component);
    var map = new google.maps.Map(div, mapOptions);

    return map;
  }
};


function ebfMapsImportLibraryW (key, callbackRule, Params) {

  window.googlemapsCallbackFunction = function(){
    var parametros = Params;
    var ruleCallback = callbackRule;
    if(ruleCallback){
      executeRuleFromJS(callbackRule, parametros);
    }
  }

  var library = document.createElement("script");
  var url = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=googlemapsCallbackFunction&libraries=geometry,places";

  if (key){
    url = url + "&key=" + key;
  }
 
  library.setAttribute("type", "text/javascript");

  library.setAttribute("src",  url);
  document.head.appendChild(library);
};

function ebfMapsCreateMarkerW(map, lat, lgt, title, image, animation, icon, letter, colorIcon, colorLetter, centralize, infowindow) {
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

	 // Parâmetros do texto que será exibido no clique
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

