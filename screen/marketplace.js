// main.js

const productData = [
    {
        id: "1",
        title: "Exquisite Handcrafted Ceramic Pottery: Unique Artisanal Collection",
        description: "Introducing our Exquisite Handcrafted Ceramic Pottery, a stunning item that embodies the beauty of artisanal craftsmanship. Each piece is meticulously crafted by...",
        suggested_price: 75.00,
        category: "Pottery",
        language: "English",
        image: "../images/ceramic_pottery.jpg"
    },
    {
        id: "2",
        title: "Handwoven Cotton Scarf with Traditional Patterns",
        description: "This beautiful scarf is handwoven using traditional techniques passed down through generations. Made from 100% organic cotton with natural dyes, featurin...",
        suggested_price: 45.00,
        category: "Textiles",
        language: "English",
        image: "../images/cotton_scarf.jpg"
    },
    {
        id: "3",
        title: "Ceramic Tea Set with Hand-Painted Motifs",
        description: "Elegant ceramic tea set crafted from local clay and fired in a traditional kiln. Each piece is unique, hand-painted with delicate floral motifs using lead-free glazes.",
        suggested_price: 125.00,
        category: "Pottery",
        language: "English",
        image: "../images/teaset.jpg"
    }
];

let allProducts = [];
let filteredProducts = [];

const searchInput = document.getElementById('searchQuery');
const categoryFilter = document.getElementById('categoryFilter');
const languageFilter = document.getElementById('languageFilter');
const priceFilter = document.getElementById('priceFilter');
const resultsInfo = document.getElementById('resultsInfo');
const productList = document.getElementById('productList');

// Function to simulate a network call to load products
const loadProducts = async () => {
    // In a real application, you would fetch data here
    allProducts = productData;
    filterAndRenderProducts();
};

const filterAndRenderProducts = () => {
    let currentProducts = [...allProducts];

    // Search filter
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        currentProducts = currentProducts.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }

    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        currentProducts = currentProducts.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Language filter (assuming products have a language property)
    const selectedLanguage = languageFilter.value;
    if (selectedLanguage !== "all") {
        currentProducts = currentProducts.filter(product => product.language.toLowerCase() === selectedLanguage.toLowerCase());
    }

    // Price filter
    const selectedPriceRange = priceFilter.value;
    if (selectedPriceRange !== "all") {
        currentProducts = currentProducts.filter(product => {
            const price = product.suggested_price || 0;
            switch (selectedPriceRange) {
                case "under50": return price < 50;
                case "50to100": return price >= 50 && price <= 100;
                case "over100": return price > 100;
                default: return true;
            }
        });
    }

    filteredProducts = currentProducts;
    renderProducts();
};

const renderProducts = () => {
    productList.innerHTML = ""; // Clear existing products
    if (filteredProducts.length === 0) {
        const message = document.createElement("p");
        message.className = "text-center text-gray-500 col-span-full";
        message.textContent = "No products match your criteria.";
        productList.appendChild(message);
    } else {
        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card bg-white rounded-xl shadow-lg overflow-hidden";
            productCard.innerHTML = `
                <div class="relative">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
                    <div class="absolute top-3 right-3 bg-white bg-opacity-80 text-gray-800 text-sm font-semibold px-2 py-1 rounded-full">$${product.suggested_price.toFixed(2)}</div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-800">${product.title}</h3>
                    <p class="mt-2 text-sm text-gray-600 line-clamp-3">${product.description}</p>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    // Update results info
    resultsInfo.textContent = `Showing ${filteredProducts.length} of ${allProducts.length} products`;
};

// Event listeners for filters
searchInput.addEventListener('input', filterAndRenderProducts);
categoryFilter.addEventListener('change', filterAndRenderProducts);
languageFilter.addEventListener('change', filterAndRenderProducts);
priceFilter.addEventListener('change', filterAndRenderProducts);

// Initial load
document.addEventListener('DOMContentLoaded', loadProducts);