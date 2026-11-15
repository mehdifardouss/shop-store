//     const ProductsPlace = document.querySelector(".products-list");
//     const Search = document.querySelector(".search");

//     const FilterByPrix = document.querySelector(".byprix");
//     const FilterByRelevance = document.querySelector(".byrelevance");
//     const FilterByCategorie = document.querySelector(".bycategorie");

//     const FilterByStock = document.querySelector(".bystock");

//     const URL = "http://localhost:3000/api";
// // async function getProducts() {
// //     try {
// //         const response = await  fetch(`${URL}/products`)
// //         if (!response.ok) {
// //             throw new Error(`Response status: ${response.status}`);
// //         }
// //         const products = await response.json();
// //         CreatEtDisplayProduct(products);
// //         /*SearchProduct(products);
// //         FilterProductByCategorie(products);*/
// //     }
// //     catch (error) {
// //         console.log("une ereure se produit de type " + error);
// //     }
// // }
// // getProducts();

// // function CreatEtDisplayProduct(products) {
// //     ProductsPlace.innerHTML = "";
// //     products.forEach((p) => {
// //         ProductsPlace.innerHTML += `<article id="${p.id}" class="product-card">
// //                              <img src="http://127.0.0.1:3000${p.image}" alt="PlayStation 5">
// //                              <p>${p.name}</p>
// //                              <h3>${p.description}</h3>
// //                             <h4> $${p.price}</h4>
// //                              <p>${p.stock} en stock</p>
// //                             <p>${p.categoryName}</p>
// //                          <button>
// //                        <i  data-id="${p.id}"class="fa-solid fa-cart-shopping"></i>
// //                              Add to Cart
// //                            </button>
// //                          </article>`
// //     })
// // };
// // function SearchProduct(products) {
// //     Search.addEventListener("input", event => {
// //         const value = event.target.value.toLowerCase();

// //         const result = products.filter(p =>
// //             p.name.toLowerCase().includes(value)
// //         );

// //         ProductsPlace.innerHTML = "";
// //         CreatEtDisplayProduct(result);
// //     });
// // };

// // function FilterProductByCategorie(products) {

// //     FilterByCategorie.addEventListener("change", event => {

// //         const value = event.target.value;

// //         const result = products.filter(p => {
// //             return value === "all" || p.categoryName === value;
// //         });

// //         CreatEtDisplayProduct(result);

// //     });

// // }

// // function FilterProductByStock(products) {
// //         const Choix = FilterByStock.value
// //         if (Choix === "In Stock") {
// //             const EnStock = products.filter((produit) => produit.stock > 0)
// //             CreatEtDisplayProduct(EnStock);

// //         }
// //         else if (Choix === "Out Of Stock") {
// //             const EnStock = products.filter((produit) => produit.stock <= 0)
// //             CreatEtDisplayProduct(EnStock);
// //         }
// //         else {
// //             CreatEtDisplayProduct(products);
// //         }
// //     };

// //  FilterByStock.addEventListener("change", ()=>
// // FilterProductByStock()
// // );


const ProductsPlace = document.querySelector(".products-list");
const Search = document.querySelector(".search");
const FilterByRelevance = document.querySelector(".byrelevance");
const FilterByCategorie = document.querySelector(".bycategorie");
const FilterByStock = document.querySelector(".bystock");
const FilterByPrix = document.querySelector(".filter-options form select:nth-of-type(3)");
const FilterForm = document.querySelector(".filter-options form");

const URL = "http://localhost:3000/api/products";

const Categories = {
    Books: 1,
    Electronics: 2,
    Kitchen: 3,
    Outdoor: 4
};



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


function getdata(url = URL) {

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
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



function SearchProduct() {

    const value = Search.value;

    getdata(`${URL}?search=${encodeURIComponent(value)}`);
}

Search.addEventListener("input", SearchProduct);


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


function ResetFilters() {
    getdata();
}
FilterForm.addEventListener("reset", () => ResetFilters,);



getdata();