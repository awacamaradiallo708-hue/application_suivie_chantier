function getGPS() {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
    });
}