function requestLocation(ipaddress) {
    var request2 = new XMLHttpRequest();

    request2.addEventListener("readystatechange", () => {
        if (request2.readyState == 4 && request2.status == 200){
            
            var details = JSON.parse(request2.responseText);
            
            var address = details.ip;
            var city = details.location.region;
            var nation = details.location.country;
            var timezone = details.location.timezone;
            var internetProvider = details.isp;
            var latitude = details.location.lat;
            var longitude = details.location.lng;

            document.getElementById('ipaddress').innerText = address;
            document.getElementById('location').innerText = city + " " + nation;
            document.getElementById('timezone').innerText = timezone;
            document.getElementById('isp').innerText = internetProvider;

            requestMap(latitude, longitude);
        }
    })
    // This is a free API key, you can get yours at https://geo.ipify.org/ 
    request2.open("GET", `https://geo.ipify.org/api/v2/country,city?apiKey=at_MoJaHQEGSmSJ551wUIsYuu6044m9S&ipAddress=${ipaddress}`);
    request2.send();
} // requestLocation();

function requestMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        //  This is again a free API key, you can get yours at https://geo.ipify.org/
        accessToken: 'pk.eyJ1IjoiYWZ0YWJhbGFtMzciLCJhIjoiY2wxdDQ1M2hyMWNmcTNjbG1ocmRuc2F0dCJ9.GAsKNqkYhoypfUoaJ8Kctg' 
    }).addTo(map);

    var greenIcon = L.icon({
        iconUrl: './images/icon-location.svg',
    
        iconSize:  [65, 95] // size of the icon
        
    });

    L.marker([latitude, longitude], {icon: greenIcon}).addTo(map);

}


document.getElementById('search-btn').addEventListener('click', () => {
    var string;

    string = document.getElementById('input').value;

    document.getElementById("play-btn").style.visibility = "visible";

    requestLocation(string);
});

document.getElementById("play-btn").addEventListener('click', () => {
    document.getElementById("map").style.zIndex = 0;
})

if (screen.width < 768) {
    document.querySelector('body').innerHTML = "<h1 style='margin:2rem;'> Please switch to your Laptop/Desktop. This site is compatible with wider screen.</h1>";   
}
