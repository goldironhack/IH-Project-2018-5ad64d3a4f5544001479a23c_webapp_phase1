const API_KEY = "AIzaSyBePmbVuBJxe-uCYZYOGoeROdGOVpAHam0";
var map;
var nyucoor = {lat: 40.7291, lng: -73.9965};
var brokcoor = {lat: 40.650002, lng: -73.949997};
var markernyu;
var brokmarker;
var directionsService;
var directionsRenderer;
var bermudaTriangle;

var triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];


function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 10,
         center: nyucoor
       });
       markernyu = new google.maps.Marker({
         position: nyucoor,
         map: map
       });
       brokmarker = new google.maps.Marker({
         position: brokcoor,
         map: map
       });
       directionsService = new google.maps.DirectionsService();
       directionsRenderer = new google.maps.DirectionsRenderer();
       markerEvents(markernyu)
     }


function markerEvents(marker){
  if (marker != "undefined") {
    marker.addListener("click",function(){
      getRoute();
    })
  }
}

function getRoute(){
    var request ={
      origin: markernyu.position,
      destination: brokmarker.position,
      travelMode: 'DRIVING'
    }
  directionsRenderer.setMap(map);
  directionsService.route(request,function(result,status){
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  })
}

function drawPolygon(polygon,color){
      polygon = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35
    });
    polygon.setMap(map);
  }



function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
