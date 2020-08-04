
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
request.open("GET", "http://localhost:3000/api/cameras");
request.send();


//Traitement de la requête
traitement
.then((result) =>
{
    for(let appareil of result)
    {
        //Change le prix en euros
        appareil.price = appareil.price / 100;

        var container = document.createElement("div");
        container.setAttribute("class", "row index");
        container.setAttribute("id", "index_elt_" + appareil._id);
        container.setAttribute("data-id", appareil._id);

        var link = document.createElement("a");
        link.setAttribute("class", "col-4");
        link.setAttribute("href", "product.html?Id=" + appareil._id);

        var image = document.createElement("img");
        image.setAttribute("class", "index-img");
        image.setAttribute("src", appareil.imageUrl);
        image.setAttribute("alt", appareil.description);

        var para = document.createElement("p");
        para.setAttribute("class", "col-6 index-desc");
        para.innerHTML = 'Appareil photo '+ appareil.name +'<br><br>Description de l\'appareil photo : '+ appareil.description +'<br><br>Prix de l\'appareil photo : '+ appareil.price +' €';

        link.appendChild(image);

        container.appendChild(link);

        container.appendChild(para);

        document.getElementById("listAppareil").appendChild(container);
    }
})
.catch(() =>
{
    console.log("ERREUR dans la requête GET !");
});

