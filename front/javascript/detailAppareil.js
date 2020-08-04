//Récupère les paramètres de l'URL
const url = new URL(window.location);

//Récupère l'id dans l'URL
var idElt = url.searchParams.get("Id");


//Récupération requête API
var request = new XMLHttpRequest();

const traitement = new Promise((resolve, reject) =>
{
    request.onreadystatechange = function() 
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        {
            resolve(JSON.parse(this.responseText));
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 200)
        {
            reject();
        }
    };
});


//Requête API
request.open("GET", "http://localhost:3000/api/cameras/" + idElt);
request.send();





//Traitement de la requête
traitement
.then((result) =>
{
    //Change le prix en euros
    result.price = result.price / 100;

    var container = document.createElement("div");
    container.setAttribute("class", "row index");
    container.setAttribute("id", "index_elt_" + result._id);
    container.setAttribute("data-id", result._id);

    var link = document.createElement("a");
    link.setAttribute("class", "col-6");
    link.setAttribute("href", "product.html?Id=" + result._id);

    var image = document.createElement("img");
    image.setAttribute("class", "index-img");
    image.setAttribute("src", result.imageUrl);
    image.setAttribute("alt", result.description);

    var para = document.createElement("p");
    para.setAttribute("class", "col-6 index-desc");
    para.innerHTML = 'Appareil photo '+ result.name +'<br><br>Description de l\'appareil photo : '+ result.description +'<br><br>Prix de l\'appareil photo : '+ result.price +' €';

    link.appendChild(image);

    container.appendChild(link);

    container.appendChild(para);

    document.getElementById("detailAppareil").appendChild(container);

    for(let lentille of result.lenses)
    {
        opt = document.createElement("option");
        opt.setAttribute("value", lentille);
        opt.innerHTML = lentille;

        document.getElementById("lentille").appendChild(opt);
    }
    //sessionStorage.clear(); /* A SUPPRIMER */

    var addElt = document.getElementById("addElt");
    addElt.addEventListener("click", function(event)
    {
        event.preventDefault();
        var cart = null;
        if(sessionStorage.getItem("cart") == null)
        {
            cart = [];   
        }
        else
        {
            cart = JSON.parse(sessionStorage.getItem("cart"));
        }
        cart.push(result._id);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("formulaire").submit();
    });
})
.catch(() =>
{
    console.log("ERREUR dans la requête GET !");
});










/*
_id
name
description
price
imageUrl
lenses (focale)
*/
