//--------------------------parte 1

//-----dom

const ProductsPlace = document.querySelector(".products-list");
const Search = document.querySelector(".search");
const FilterByRelevance = document.querySelector(".byrelevance");
const FilterByCategorie = document.querySelector(".bycategorie");
const FilterByStock = document.querySelector(".bystock");
const FilterByPrix = document.querySelector(".byprix");
const FilterForm = document.querySelector(".reset");

const URL = "http://localhost:3000/api/products";

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
                <button>
                    <i data-id="${p.id}" class="fa-solid fa-cart-shopping"></i>
                    Add to Cart
                </button>
            </article>
        `;
    });
}

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
            CreatEtDisplayProduct(data);
        })
        .catch(error => {
            console.log("Erreur :", error);
        });
}

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