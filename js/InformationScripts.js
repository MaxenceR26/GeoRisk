var textInfo = document.getElementById("Informations-element");


function sizeWordEvent(size=null, element_informations, elements){
    console.log(maxSize)
    if (element_informations.length >= maxSize) {
        if (element_informations.replace(` -${elements[elements.length - 1]}`, '').length >= maxSize) {
            textInfo.style = `font-size: ${size}px`
            textInfo.innerHTML = element_informations.replace(` -${elements[elements.length - 1]}`, '')
        } else {
            textInfo.innerHTML = element_informations.replace(` -${elements[elements.length - 1]}`, '')
        }
    } else {
        textInfo.innerHTML = element_informations
    }            
}

fetch('https://newsapi.org/v2/top-headlines?country=fr&category=science&apiKey=87477605f678417c87d4e1527568190a')
    .then(response => response.json())
    .then(json => {
        element_informations = json["articles"][0]['title']
        
        maxSize = 124
        elements = element_informations.split('-')
        // console.log(elements[elements.length - 1].length)
        // textInfo.innerHTML = element
        
        window.addEventListener("resize", function() {
            if (window.innerWidth >= 1130) {
                console.log(element_informations)
                sizeWordEvent(13, element_informations, elements)
            } else {
                sizeWordEvent(12, element_informations, elements)   
            }
          });
        
        if (element_informations.length >= maxSize) {
            sizeWordEvent(12, element_informations, elements)
        } else {
            sizeWordEvent(13, element_informations, elements)
        }
        
        
        
        // console.log(el.length, eltwo.length) // => 8
    })