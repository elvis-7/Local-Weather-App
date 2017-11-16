$(document).ready(function() {
    var location;
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    location = position.coords.latitude + ", " + position.coords.longitude;
    setCity(location);
    getweather(location);
  });
 }
 
 $("#updateWeather").click(function update(){
   getweather(location);
 });
function setCity(latLon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLon + "&sensor=true";
  url = url.replace(/\s/g, "");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#Location').html(data.results[0].address_components[2].long_name + "<br><br>" + data.results[0].address_components[1].long_name + ", " + data.results[0].address_components[4].long_name);
    },
    method: "GET"
  });
}
  var currenttemp;
  var MaxTemp;
  var MinTemp;
  var currenttempF;
  var MaxTempF;
  var MinTempF;
  var description;
  var icon;
  var weatherIcon;
  function getweather(latlon){
       var url = "https://api.darksky.net/forecast/e7ea57ca52da5ae872c7c0c343f312be/" +latlon+ "?callback=?&units=si";
        $.getJSON(url,function(data){
          currenttemp = data.currently.temperature;
          currenttempF = (data.currently.temperature * 9 / 5 + 32).toFixed(1) + "&deg;F";
          $('#currentTemp').html(data.currently.temperature + "&deg;C");
                 icon = "wi wi-forecast-io-" + data.currently.icon;
                  weatherIcon = data.currently.icon;
             $("#icon").html("<i class=\"" + icon + "\">");
             description = data.currently.summary;
           $("#description").html(description);
          MaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
          MinTemp = data.daily.data[0].temperatureMin.toFixed(0);
          MaxTempF = (MaxTemp * 9 / 5 + 32).toFixed(1) + "&deg;F";
          MinTempF = (MinTemp * 9 / 5 + 32).toFixed(1) + "&deg;F";
          $('#todayMax').html("Max-temp : "+ MaxTemp + "&deg;C");
          $('#todayMin').html("Min-temp : " + MinTemp + "&deg;C");
          setBackground(weatherIcon);
        });
  }
  $("#celsius").click(function (){
    $('#currentTemp').html(currenttemp+ "&deg;C");
    $('#todayMax').html("Max-temp : "+ MaxTemp + "&deg;C");
    $('#todayMin').html("Min-temp : " + MinTemp + "&deg;C");
  });
    $("#fahrenheit").click(function (){
    $('#currentTemp').html(currenttempF);
    $('#todayMax').html("Max-temp : "+ MaxTempF);
    $('#todayMin').html("Min-temp : " + MinTempF);
  });
  function setBackground(weatherIcon) {
  //console.log(weatherIcon);
  switch (weatherIcon) {
    case "clear-day":
      document.getElementById("body").style.backgroundImage = 'url("http://feelgrafix.com/data_images/out/15/899301-sunny-day.jpg")';
      break;
    case "clear-night":
      document.getElementById("body").style.backgroundImage = 'url("https://tcklusman.files.wordpress.com/2014/05/tumblr_static_dark-starry-night-sky-226736.jpg")';
      break;
    case "rain":
      document.getElementById("body").style.backgroundImage = 'url("http://wearechange.org/wp-content/uploads/2015/03/1_See_It.jpg")';
      break;
    case "cloudy":
      document.getElementById("body").style.backgroundImage = 'url("http://www.tripwire.com/state-of-security/wp-content/uploads/cache//shutterstock_106367810/4261234929.jpg")';
      break;
    case "partly-cloudy-day":
      document.getElementById("body").style.backgroundImage = 'url("http://www.sturdyforcommonthings.com/wp-content/uploads/2013/03/wind_blowing.jpg")';
      break;
    case "partly-cloudy-night":
      document.getElementById("body").style.backgroundImage = 'url("http://scienceblogs.com/startswithabang/files/2013/04/night-sky-stars.jpeg")';
      break;
    case "snow":
      document.getElementById("body").style.backgroundImage = 'url("http://www.vancitybuzz.com/wp-content/uploads/2015/12/shutterstock_315123593-984x500.jpg")';
      break;
    default:
      break;

  }

}
});