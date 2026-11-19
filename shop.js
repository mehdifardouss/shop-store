//--------------------------parte 1

//-----dom

const ProductsPlace = document.querySelector(".products-list");
const Search = document.querySelector(".search");
const FilterByRelevance = document.querySelector(".byrelevance");
const FilterByCategorie = document.querySelector(".bycategorie");
const FilterByStock = document.querySelector(".bystock");
const FilterByPrix = document.querySelector(".byprix");
const FilterForm = document.querySelector(".reset");
console.log("bienvenue")
const URL = "http://localhost:3000/api/products";
let pproducts = [];

const Categories = {
    Books: 1,
    Electronics: 2,
    Kitchen: 3,
    Outdoor: 4
};

//-------CreatEtDisplayProduct

function CreatEtDisplayProduct(products) {
    ProductsPlace.innerHTML = "";
    if (products.length === 0) {
        ProductsPlace.innerHTML = "<p>Aucun produit trouvé</p>";
        return;
    }
    products.forEach(p => {
        ProductsPlace.innerHTML += `
         <article id="${p.id}" class="product-card">
    <img src="http://127.0.0.1:3000${p.image}" alt="${p.name}">
    <p>${p.name}</p>
    <h3>${p.description}</h3>
    <h4>$${p.price}</h4>
    <p>${p.stock} en stock</p>
    <p>${p.categoryName}</p>

    <div class="quantity-container">
        <label>Quantité</label>
        <input  type="number"  class="quantity-input" min="1"  max="${p.stock}" value="1"
>
    </div>

    <button onclick="addToPanier(${p.id})" data-id="${p.id}">
        <i class="fa-solid fa-cart-shopping"></i>
        Add to Cart
    </button>
</article>
        `;
    });
}
console.log("element cree")
//--------getdata with fetch

function getdata(url = URL) {

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log("ereure");

            }

            return response.json();
        })
        .then(data => {
            pproducts = data;
            CreatEtDisplayProduct(data);
        })
        .catch(error => {
            console.log("Erreur :", error);
        });
}
console.log(pproducts);


//---------search

function SearchProduct() {

    const value = Search.value;

    getdata(`${URL}?search=${encodeURIComponent(value)}`);
}

Search.addEventListener("input", SearchProduct);

//------------------FilterProductByCategorie

function FilterProductByCategorie() {

    const category = FilterByCategorie.value;

    if (category === "all") {
        getdata();
    } else {
        const categoryId = Categories[category];

        if (categoryId !== undefined) {
            getdata(`${URL}?categoryId=${categoryId}`);
        }
    }
}

FilterByCategorie.addEventListener("change", FilterProductByCategorie);

//-----------FilterProductByStock

function FilterProductByStock() {

    const stock = FilterByStock.value;

    if (stock === "In Stock") {
        getdata(`${URL}?inStock=true`);
    }
    else if (stock === "Out Of Stock") {
        getdata(`${URL}?inStock=false`);
    }
    else {
        getdata();
    }
}

FilterByStock.addEventListener("change", FilterProductByStock);

//--------------FilterProductByPrice

function FilterProductByPrice() {

    const price = FilterByPrix.value;

    if (price === "all") {
        getdata();
    }
    else {
        getdata(`${URL}?maxPrice=${encodeURIComponent(price)}`);
    }
}

FilterByPrix.addEventListener("change", FilterProductByPrice);

//----------ResetFilters

function ResetFilters() {
    getdata();
}
FilterForm.addEventListener("click", ResetFilters);
getdata();


//--------------------------------partie 2
//----------hideShow


function hideShow() {
    const MyProduct = document.getElementById("myProducts");
    if (getComputedStyle(MyProduct).display === "none") {
        MyProduct.style.display = "block";
    } else {
        MyProduct.style.display = "none";
    }
}
function showForm() {
    const MyForm = document.getElementById("clientFormContainer");
    if (getComputedStyle(MyForm).display === "none") {
        MyForm.style.display = "block";
    } else {
        MyForm.style.display = "none";
    }
}
//------------ADD tcart
const CartPlace = document.getElementById("blasetlescarte");
const TotalPlace = document.querySelector(".totale");

let panier = [];

function addToPanier(id) {

    let ProductAded = pproducts.find(p => p.id === id);
    if (!ProductAded) {
        return;
    }
    if (ProductAded.stock === 0) {
        alert("Produit en rupture de stock");
        return;
    }
    let existe = panier.find(p => p.id === id);
    if (existe) {
        if (existe.quantite < existe.stock) {
            existe.quantite++;
        } else {
            console.log("Stock maximum atteint");
        }
    } else {
        panier.push(ProductAded);
    }
    displayCart();
}


function displayCart() {

    const CartCards = CartPlace.querySelectorAll(".myproduct-card");
    CartCards.forEach(card => card.remove());

    if (panier.length === 0) {
        CartPlace.innerHTML = "<p>Votre panier est vide</p>";
        return;
    }
    panier.forEach(p => {
        CartPlace.innerHTML += `
            <article id="${p.id}" class="myproduct-card">
                <div class="dataa">
                    <img src="http://127.0.0.1:3000${p.image}" alt="${p.name}">
                    <p class="ba3ed"  style="color: aliceblue; margin :10px ;">${p.name}</p>
                    <h4>prix : $${p.price}</h4>
                    <p class="ba3ed"  style="color: aliceblue; margin :10px ;">quantite : ${p.quantite}</p>
                     <h4>Totale : $${p.price}</h4>
                </div>
                <div class="buttons">
                    <button  id="${p.id}" class="deleteproduct" onclick = "Remouve(${p.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button id="${p.id}" class="confirmebutton" >
                        <i class="fa-regular fa-square-check"></i>
                    </button>
                </div>
            </article>`;
    });
}

function Remouve(id) {
    panier = panier.filter((p) => p.id !== id);
    displayCart();
}





























