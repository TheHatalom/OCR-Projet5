var cart = JSON.parse(sessionStorage.getItem("cart"));

if(cart == null)
{
    var para = document.createElement("p");
    para.setAttribute("class", "col-12 text-center");
    para.innerHTML = 'Votre panier est vide !';

    document.getElementById("panierAppareil").appendChild(para);
}

for(let cartElt of cart)
{
    //Requête vers le serveur avec l'id
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
    request.open("GET", "http://localhost:3000/api/cameras/" + cartElt);
    request.send();


    //Traitement de la requête
    traitement
    .then((result) =>
    {
        /* --------------------------------- LENTILLE A REFAIRE ------------------------------------- */
        //Récupération de la lentille
        const url = new URL(window.location);
        result.lenses = url.searchParams.get("lentille");;

        //Change le prix en euros
        result.price = result.price / 100;

        var container = document.createElement("div");
        container.setAttribute("class", "row index panier-list");
        container.setAttribute("id", "index_elt_" + result._id);
        container.setAttribute("data-id", result._id);

        var image = document.createElement("img");
        image.setAttribute("class", "index-img panier-img");
        image.setAttribute("src", result.imageUrl);
        image.setAttribute("alt", result.description);

        var para = document.createElement("p");
        para.setAttribute("class", "col-6 row panier-desc");
        para.innerHTML = result.name + '<br>Prix de l\'appareil photo : '+ result.price +' €';

        var btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "Supprimer");
        btn.setAttribute("class", "btn-delete");
        btn.addEventListener("click", function()
        {
            var cartRemove = JSON.parse(sessionStorage.getItem("cart"));
            var remove = cartRemove.findIndex(function(element)
            {
                return result._id == element;
            });

            cartRemove.splice(remove, 1);
            sessionStorage.setItem("cart", JSON.stringify(cartRemove));
            document.getElementById("index_elt_" + result._id).remove();
        });
        
        para.appendChild(btn);

        container.appendChild(image);

        container.appendChild(para);

        document.getElementById("panierAppareil").appendChild(container);


    })
    .catch((error) =>
    {
        console.log("ERREUR dans la requête GET !" + error);
    });

}


/*

Responsive panier

Mettre sur github

Tests

Créer support présentation

*/