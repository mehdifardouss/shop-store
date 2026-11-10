const ProductsPlace = document.querySelector(".products-list");
const Search = document.querySelector(".search");
const FilterByCategorie = document.querySelector(".bycategorie");
const FilterByPrix = document.querySelector(".byprix");
const FilterByRelevance = document.querySelector(".byrelevance");

async function getProducts() {

    try {

        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const products = await response.json();

        console.log(products);
        CreatEtDisplayProduct(products);
        SearchProduct(products);
    }
    catch (error) {
        console.error("erreure");
    }

}
getProducts();

function CreatEtDisplayProduct(products) {

    products.forEach((p) => {
        ProductsPlace.innerHTML += `<article id="${p.id}" class="product-card">
                            <img src="http://127.0.0.1:3000${p.image}" alt="PlayStation 5">
                            <p>${p.name}</p>
                            <h3>${p.description}</h3>
                            <h4> $${p.price}</h4>
                            <p>${p.stock} en stock</p>
                            <p>${p.categoryName}</p>
                            <button>
                                <i  data-id="${p.id}"class="fa-solid fa-cart-shopping"></i>
                                Add to Cart
                            </button>
                        </article>`
    });
}


function SearchProduct(products){
     Search.addEventListener("input" , (item)=>{
        const valeur = item.target.value.toLowerCase();
        const resultat =products.filter((prod)=>prod.name.toLowerCase().includes(valeur)
    );
        ProductsPlace.innerHTML = ""
        CreatEtDisplayProduct(resultat)

     });    
}