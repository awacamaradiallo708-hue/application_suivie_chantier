<<<<<<< HEAD
function getGPS() {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
    });
=======
function getGPS() {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
    });
>>>>>>> 1e1236a4ec0a87082a0757450538e5d1db7ef17b
}