const fetch = require('node-fetch');
const current = new Date()
const time = current.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
});

var div_element = document.getElementById("input-widget-complet")
var div_meteo_widget = document.getElementById("meteo-widget")

function getMeteo() {
    var input_value = document.getElementById('searchAutoComplet')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input_value.value},fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric`)
        .then(response => response.json())
        .then(json => {
            div_meteo_widget.style.display = 'block'
            div_element.style.display = 'none'
            document.getElementById("title-meteo-widget").innerHTML = json['name']
            document.getElementById("geo-meteo-widget").innerHTML = `lon: ${json['coord']['lon']} <br>lat: ${json['coord']['lat']}`
            document.getElementById("date-meteo-widget").innerHTML = time
            document.getElementById("desc-meteo-widget").innerHTML = `${json['weather'][0]['main']},<br>${json['weather'][0]['description']}`
        })
}