// Emplacement de l'API météo sur le net
const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// On définit la mesureType
let measureType = "";

// Quand on clique sur le menu déroulant
selectionOption = document.getElementById("Deroulant");
selectionOption.addEventListener("change", function () {
    measureType = selectionOption.value;
});

// Quand on clique sur le Menu - Dernières Mesures
document.getElementById("titre1").addEventListener("click", function () {

    // On fait une boucle pour supprimer le dernier paragraphe affiché
    const sectionResult = document.getElementById("Resultats");
    const elementNumber = sectionResult.childElementCount;
    for (let i = 0; i < elementNumber; i++) {
        sectionResult.removeChild(sectionResult.firstElementChild);
        console.log(i);
    }

    // On fait une boucle pour supprimer le formulaire Selection de dates
    const sectionDate = document.getElementById("Selection-date");
    const elementNumberDate = sectionDate.childElementCount;
    for (let i = 0; i < elementNumberDate; i++) {
        sectionDate.removeChild(sectionDate.firstElementChild);
        console.log(i);
    }

    // On récupère la dernière valeur depuis l'API
    fetch(baseApiUrl + '/last?measure-type=' + measureType).then(function (response) {
        response.json().then(function (result) {
            console.log(result);

            // On initialise l'objet Date (pour modifier le format par la suite)
            const date = new Date(result.measureDate);

            // On créé les paragraphes contentant les valeurs de l'objet RESULT
            let resultTemp = document.createElement("p");

            resultTemp.textContent = "Dernière mesure du " + date.toLocaleDateString();
            document.getElementById("Resultats").appendChild(resultTemp);

            resultTemp = document.createElement("p");
            resultTemp.textContent = measureType + " : " + result.value + " " + result.unit;
            document.getElementById("Resultats").appendChild(resultTemp);
        });

    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});

// Quand on clique sur Menu - Top Mesures
document.getElementById("titre2").addEventListener("click", function () {

    // On fait une boucle pour supprimer le dernier paragraphe affiché
    const sectionResult = document.getElementById("Resultats");
    const elementNumber = sectionResult.childElementCount;
    for (let i = 0; i < elementNumber; i++) {
        sectionResult.removeChild(sectionResult.firstElementChild);
        console.log(i);
    }

    // On fait une boucle pour supprimer le formulaire Selection de dates
    const sectionDate = document.getElementById("Selection-date");
    const elementNumberDate = sectionDate.childElementCount;
    for (let i = 0; i < elementNumberDate; i++) {
        sectionDate.removeChild(sectionDate.firstElementChild);
        console.log(i);
    }

    // On récupère la dernière valeur depuis l'API
    fetch(baseApiUrl + '/top?measure-type=' + measureType).then(function (response) {
        response.json().then(function (result) {
            console.log(result);

            const date = new Date(result.measureDate);

            // Création du paragraphe contentant les valeurs de l'objet RESULT
            let resultTemp = document.createElement("p");

            resultTemp.textContent = "Top mesure du " + date.toLocaleDateString();
            document.getElementById("Resultats").appendChild(resultTemp);

            resultTemp = document.createElement("p");
            resultTemp.textContent = measureType + " : " + result.value + " " + result.unit;
            document.getElementById("Resultats").appendChild(resultTemp);
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});

// Quand on clique sur Menu - Tableaux des mesures
document.getElementById("titre3").addEventListener("click", function () {

    // On fait une boucle pour supprimer le dernier formulaire Selection de dates (et en laisser 1)
    const sectionForm = document.getElementById("Selection-date");
    const elementNumber = sectionForm.childElementCount;
    for (let i = 0; i < elementNumber; i++) {
        sectionForm.removeChild(sectionForm.firstElementChild);
        console.log(i);
    }

    // On crée le formulaire pour renseigner les dates
    const formulaire = document.createElement("form");
    document.getElementById("Selection-date").appendChild(formulaire);

    const startDate = document.createElement("label");
    formulaire.appendChild(startDate);
    startDate.textContent = "Date de début : ";

    const champStart = document.createElement("input");
    formulaire.appendChild(champStart);
    champStart.textContent = "Date";
    champStart.type = "datetime-local";
    champStart.id = "startDateId";

    const endDate = document.createElement("label");
    formulaire.appendChild(endDate);
    endDate.textContent = "Date de fin : ";

    const champEnd = document.createElement("input");
    formulaire.appendChild(champEnd);
    champEnd.textContent = "Date";
    champEnd.type = "datetime-local";
    champEnd.id = "endDateId";

    const button = document.createElement("button");
    formulaire.appendChild(button);
    button.textContent = "Rafraîchir les données";

    // On créé un évenemnt lorsqu'on clique que le bouton Rafraîchir les données
    button.addEventListener("click", function () {

        // On récupère les données entrées dans le champ date
        let startDate = "";
        let endDate = "";

        let selectionDateS = document.getElementById("startDateId");
        startDate = selectionDateS.value;
        let selectionDateE = document.getElementById("endDateId");
        endDate = selectionDateE.value;

// On récupère la dernière valeur depuis l'API
        fetch(baseApiUrl + '?measure-type=' + measureType + '&start-date=' + startDate + '&end-date=' + endDate).then(function (response) {
            response.json().then(function (result) {
                console.log(result);

                // On fait une boucle pour supprimer le dernier tableau affiché
                const sectionResult = document.getElementById("Resultats");
                const elementNumber = sectionResult.childElementCount;
                for (let i = 0; i < elementNumber; i++) {
                    sectionResult.removeChild(sectionResult.firstElementChild);
                    console.log(i);
                }
                // On crée le tableau contentant les valeurs de l'objet RESULT
                // On crée une table et un body
                let table = document.createElement("table");
                let tableHead = document.createElement("thead");
                let tableBody = document.createElement("tbody");

                // On crée la ligne de titre
                const newRowH = document.createElement("tr");

                const title1 = document.createElement("th");
                title1.textContent = "Date";
                newRowH.appendChild(title1);

                const title2 = document.createElement("th");
                title2.textContent = "Valeur des données";
                newRowH.appendChild(title2);

                // On crée les  lignes contenant les valeurs
                for (let j = 0; j < result.length; j++) {

                    let date = new Date(result[j].measureDate);
                    const newRowB = document.createElement("tr");

                    const td1 = document.createElement("td");
                    td1.textContent = date.toLocaleDateString();
                    newRowB.appendChild(td1);

                    const td2 = document.createElement("td");
                    td2.textContent = result[j].value;
                    newRowB.appendChild(td2);

                    tableBody.appendChild(newRowB);
                }

                // On ajoute les lignes dans le tableau
                tableHead.appendChild(newRowH);
                table.appendChild(tableHead);
                table.appendChild(tableBody);
                document.getElementById("Resultats").appendChild(table);

            });
        }).catch(function (error) {
            console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
        });
    });
});
