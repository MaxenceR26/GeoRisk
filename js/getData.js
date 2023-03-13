// https://geo.api.gouv.fr/communes?codePostal=75001
// https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=62117&page=1&page_size=10&rayon=1000
// https://www.georisques.gouv.fr/doc-api#!/CATNAT/rechercheCatNatUsingGET

//https://newsapi.org/v2/top-headlines?country=fr&category=science&apiKey=87477605f678417c87d4e1527568190a
// https://fiches-risques.brgm.fr/georisques/cavite/
// Get code INSEE
const fetch = require('node-fetch');

var codeInsee = 0;

// var test = ['lorem lorem lorem lorem 1', 'lorem lorem lorem lorem 2', 'lorem lorem lorem lorem 3', 'lorem lorem lorem lorem 4']

// code_commune_insee

var errors = 0
var div_element = document.getElementById('GeoRisk-Information')
var div_popup_text = document.getElementById('element-PopUpText')
var input_value = document.getElementById('search')
// Index.html

function getCodeInsee() {

    if (!isNaN(input_value.value)) {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${input_value.value}`)
        .then(response => response.json())
        .then(json => {
            try {
                if (json[0]['code']) {
                    codeInsee = json[0]['code']
                    // console.log(codeInsee)
                    getRisk()
            }   
            } catch (TypeError) {
                console.log("Une erreur est survenue")
            }
            
        })
    } else {
        fetch(`https://geo.api.gouv.fr/communes?nom=${input_value.value}`)
        .then(response => response.json())
        .then(json => {
            try {
                if (json[0]['code']) {
                    codeInsee = json[0]['code']
                    // console.log(codeInsee)
                    getRisk()
            }   
            } catch (TypeError) {
                console.log("Une erreur est survenue")
            } 
            
        })
    }
    
}

function writeElement(jsonFirst, jsonSecond = null) {
    
    for (element in jsonFirst['data'][0]['risques_detail']) {
        var child = document.createElement('p')
        if (jsonSecond != null){
            if (jsonFirst['data'][0]['risques_detail'][element]["num_risque"] == '158') {
                child.innerHTML = (`
                Type de risque: ${jsonFirst['data'][0]['risques_detail'][element]["libelle_risque_long"]} <br>
                Numéro : ${jsonFirst['data'][0]['risques_detail'][element]["num_risque"]} <br>
                Zone sismicite : ${jsonSecond['data'][0]['zone_sismicite']}
                `)
                // var button = document.createElement('a')
                // button.innerHTML = `Voir la liste des arrêtés de catastrophe naturelle <br><br>`
            } else {
                child.innerHTML = (`
                Type de risque: ${jsonFirst['data'][0]['risques_detail'][element]["libelle_risque_long"]} <br>
                Numéro : ${jsonFirst['data'][0]['risques_detail'][element]["num_risque"]}
                `)
                // var button = document.createElement('a')
                // button.innerHTML = `Voir la liste des arrêtés de catastrophe naturelle <br><br>`
            }
        } else {
            child.innerHTML = (`
            Type de risque: ${jsonFirst['data'][0]['risques_detail'][element]["libelle_risque_long"]} <br>
            Numéro : ${jsonFirst['data'][0]['risques_detail'][element]["num_risque"]}
            `)
        }
        div_element.appendChild(child)
        
    }

    document.getElementById("popupbutton").style.display = 'block'
    document.getElementById("footer").style.display = 'block'
}

function getRisk(){
    var json_list = []
    fetch(`https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=${codeInsee}&page=1&page_size=10&rayon=1000`)
        .then(response => response.json())
        .then(json => {
            
            if (json['data'][0]['risques_detail']) {
                json_list.push(json)
            }})
        .catch(error => {
            errors = errors + 1
        })
            
    fetch(`https://www.georisques.gouv.fr/api/v1/zonage_sismique?code_insee=${codeInsee}&page=1&page_size=10&rayon=1000`)
        .then(response => response.json())
        .then(json => {
            try {
                if (json['data'][0]['zone_sismicite']) {
                json_list.push(json)
                if (json_list.length >= 1) {
                    div_element.innerHTML = ""
                    console.log("e")
                    writeElement(json_list[0], json_list[1])
                    json_list.pop()
                    console.log(json_list)
                }
            }
            } catch (TypeError) {
                div_element.innerHTML = ""
                writeElement(json_list[0])
            }
        })   
        .catch(error => {
            errors = errors + 1
            if (errors > 0) {
                console.log("Une erreur est survenue")
            }
        }) 
}

var count=0;

function listingElement() {
    fetch(`https://www.georisques.gouv.fr/api/v1/gaspar/catnat?code_insee=${codeInsee}&page=1&page_size=10&rayon=1000`)
        .then(response => response.json())
        .then(json => { 
            div_popup_text.innerHTML = ''
            for (element in json['data']){
                count+=1
                var child = document.createElement('p')
                console.log(json['data'][element]['code_national_catnat'])
                
                if (count > 1) {
                    console.log(count)
                    child.innerHTML = `
                    ────────────────────────<br><br>
                    Code catnat : ${json['data'][element]['code_national_catnat']}<br>
                    Date de début : ${json['data'][element]['date_debut_evt']}<br>
                    Date de fin : ${json['data'][element]['date_fin_evt']}<br>
                    Commune : ${json['data'][element]['libelle_commune']}<br>
                    Evenement : ${json['data'][element]['libelle_risque_jo']}`
                } else {
                    child.innerHTML = `
                        Code catnat : ${json['data'][element]['code_national_catnat']}<br>
                        Date de début : ${json['data'][element]['date_debut_evt']}<br>
                        Date de fin : ${json['data'][element]['date_fin_evt']}<br>
                        Commune : ${json['data'][element]['libelle_commune']}<br>
                        Evenement : ${json['data'][element]['libelle_risque_jo']}
                        `
                }
                
                div_popup_text.appendChild(child)
                
            }
            count=0;
        })
}

// risque_cyclone.html

// https://meteofrance.com/ajax/widgetAutocomplete/

