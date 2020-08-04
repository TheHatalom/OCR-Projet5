//Récupère les paramètres de l'URL
const url = new URL(window.location);

//Récupère les paramètres dans l'URL
var body = 
{
    contact:
    {
        firstName:url.searchParams.get("firstname"),
        lastName:url.searchParams.get("lastname"),
        address:url.searchParams.get("address"),
        city:url.searchParams.get("city"),
        email:url.searchParams.get("email")
    }, 
    products:JSON.parse(sessionStorage.getItem("cart"))
};






//Definition du corps de la requête à envoyer

//console.log(body);


var request = new XMLHttpRequest();
const traitement = new Promise((resolve, reject) =>
{
    request.onreadystatechange = function() 
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) 
        {
            resolve(JSON.parse(this.responseText));
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 201)
        {
            reject();
        }
    };
});

request.open("POST", "http://localhost:3000/api/cameras/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(body));


traitement
    .then((result) =>
    {
        var para = document.createElement("p");
        para.setAttribute("class", "col-12 text-center");
        para.innerHTML = 'Orinoco vous remerci de votre commande ! <br> Elle sera livrée dans les plus bref délais. <br> Numéro de commande : ' + result.orderId;
        
        document.getElementById("order").appendChild(para);
    })
    .catch((error) =>
    {
        console.log("ERREUR dans la requête POST !" + error);

        var para = document.createElement("p");
        para.setAttribute("class", "col-12 text-center");
        para.innerHTML = 'Votre commande à échouée :( <br> Erreur : ' + error + '<br><br>Retourner à <a href="cart.html">Mon Panier</a>';
        
        document.getElementById("order").appendChild(para);
    });
