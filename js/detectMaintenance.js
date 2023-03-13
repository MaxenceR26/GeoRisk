fetch('https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=62173&page=1&page_size=10&rayon=1000')
    .then(response => {
      r = 503 // Systeme de test
      if (response.status == 200) {
        console.log("Loaded !")
        var divMaintenance = document.getElementById("maintenance-div")
        divMaintenance.style.display = 'none'
      } else if (response.status == 503) {
        console.log("Une maintenance est en cours")
        var divMaintenance = document.getElementById("maintenance-div")
        var textMaintenance = document.getElementById("maintenance-text")
        textMaintenance.innerHTML = 'Attention une maintenance est en cours sur l\'API utilisée !'
        divMaintenance.style.display = 'block'
      } else {
        console.log("Un problème est survenue")
        var divMaintenance = document.getElementById("maintenance-div")
        divMaintenance.style.display = 'none'
      }
    })