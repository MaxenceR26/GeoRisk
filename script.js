const { ipcRenderer } = require("electron")
var div_element = document.getElementById("input-widget-complet")
// Bouton navbar

var maximize = document.getElementById("maximizeButton")
var minimize = document.getElementById("reductButton")
var closedbtn = document.getElementById("closeButton")

minimize.addEventListener('click', function() {
    ipcRenderer.send('minimize')
})

maximize.addEventListener('click', function() {
    ipcRenderer.send('maximize')
})

closedbtn.addEventListener('click', function() {
    ipcRenderer.send('closeApp')
})

// Activation du system pour déplacer la fenêtre

var navbar = document.getElementById("navbar-active-drag")
navbar.style.webkitAppRegion = "drag"
maximize.style.webkitAppRegion = "none"
minimize.style.webkitAppRegion = "none"
closedbtn.style.webkitAppRegion = "none"



// Autocomplet
function autocomplet() {
    var valueInput = document.getElementById("searchAutoComplet")
    if (valueInput.value.length > 2) {
        fetch(`https://meteofrance.com/ajax/widgetAutocomplete/${valueInput.value}`)
            .then(response => response.json())
            .then(json => {
                div_element.innerHTML = ''
                for (element in json) {
                    var child = document.createElement('ul')
                    div_element.style.display = 'block'
                    child.innerHTML = json[element]['title']
                    child.style.cursor = 'pointer'
                    if (element > 5) {
                        div_element.style.height = '200px'
                    } else {
                        div_element.style.height = 'auto'
                    }
                    div_element.style.overflowX = 'auto'
                    div_element.style.borderRadius = '10px'
                    div_element.style.boxShadow = '-5px 5px 25px 0px rgba(0,0,0,0.75)'
                    child.addEventListener('click', function() {
                        document.getElementById("searchAutoComplet").value = this.textContent
                        div_element.style.display = 'none'
                        div_element.innerHTML = ''
                    })
                    div_element.appendChild(child)
                    // console.log(json[element]['title'])
                }
            })
    } else {
        div_element.style.display = 'none'
        div_element.innerHTML = ''
    }
}
