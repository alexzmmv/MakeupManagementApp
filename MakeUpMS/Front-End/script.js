
/*
"id": 3,
    "category": "Makeup",
    "type": "Foundation",
    "brand": "BeautyGlow",
    "name": "Full Coverage Foundation",
    "description": "Long-lasting, full coverage foundation",
    "quantity": 40,
    "isOpened": false,
    "expirationDate": "2025-06-15T00:00:00.000+00:00",
    "purchaseDate": "2024-10-01T00:00:00.000+00:00",
    "openDate": null,
    "openDuration": 0,
    "price": 20.99,
    "notes": "Shake well before use "
 */
let productInterface ={
    category: "",
    type: "",
    brand: "",
    name: "",
    description: "",
    quantity: 0,
    isOpened: false,
    expirationDate: "",
    purchaseDate: "",
    openDate: "",
    openDuration: 0,
    price: 0,
    notes: ""
}
let products = [];
fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    });

// Display products on the page
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.id = product.id;
        // Create product name
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        productDiv.appendChild(productName);

        // Create product details
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('product-details');

        // Display product details
        Object.keys(product).forEach(key => {
        detail = document.createElement('p');
        switch (key) {
            case 'id':
            case 'name':
                break;
            case 'price':
                detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: $${product[key]}`;
                break;
            default:
                if (key.toLowerCase().search('date') !== -1) {
                    const date = new Date(product[key]);
                    detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${date.toLocaleDateString()}`;
                    if (key === 'expirationDate') {
                        const currentDate = new Date();
                        if (date < currentDate) {
                            detail.style.color = 'red';
                            detail.style.fontWeight = 'bold';
                        }
                    }
                    if (product[key] === null) {
                        detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: N/A`;
                    }
                } else if (key === 'openDuration') {
                    detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${product[key]} months`;
                } else {
                    detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${product[key]}`;
                }
                break;
        }
        detailsDiv.appendChild(detail);
        });

        productDiv.appendChild(detailsDiv);

        // Add modify button
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modify';
        modifyButton.onclick = () => modifyProduct(product.id);
        productDiv.appendChild(modifyButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteProduct(product.id);
        productDiv.appendChild(deleteButton);

        // Append product div to product list
        productList.appendChild(productDiv);
    });
}

// Modify product
function modifyProduct(productId) {
    const product = products.find(p => p.id === productId);
    const productDiv = document.getElementById(productId);

    // Remove the buttons and show form inputs for editing
    productDiv.querySelectorAll('button').forEach(button => button.style.display = 'none');

    const detailsDiv = productDiv.querySelector('.product-details');
    detailsDiv.innerHTML = '';

    // Create form inputs for each field
    Object.keys(product).forEach(key => {
        if (key !== 'id') {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-input');
            const label = document.createElement('label');
            label.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: `;
            formGroup.appendChild(label);

            const input = document.createElement('input');
            switch (key) {

                case 'expirationDate':
                case 'purchaseDate':
                case 'openDate':
                    input.type = 'date';
                    input.value = product[key] ? new Date(product[key]).toISOString().split('T')[0] : '';
                    break;
                case 'isOpened':
                    input.type = 'checkbox';
                    input.checked = product[key];
                    break;
                default:
                    input.type = 'text';
                    input.value = product[key];
                    break;}
            input.id = key;
            formGroup.appendChild(input);
            detailsDiv.appendChild(formGroup);
        }
    });

    // Add save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => saveProduct(productId);
    productDiv.appendChild(saveButton);

    // Add cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => displayProducts();
    productDiv.appendChild(cancelButton);
}

// Save the modified product
function saveProduct(productId) {
    const product = products.find(p => p.id === productId);

    // Update product with modified data from form inputs
    Object.keys(product).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            if (input.type === 'checkbox') {
                product[key] = input.checked; // Handle checkbox values
            } else {
                product[key] = input.value; // Handle text or date inputs
            }
        }
    });

    // Deep copy the updated product
    let newProduct = JSON.parse(JSON.stringify(product));

    // Convert date strings to ISO format only if valid
    Object.keys(newProduct).forEach(key => {
        if (key.toLowerCase().search('date') !== -1 && newProduct[key]) {
            const date = new Date(newProduct[key]);
            if (!isNaN(date)) {
                newProduct[key] = date.toISOString();
            } else {
                newProduct[key] = null; // Handle invalid dates gracefully
            }
        }
    });

    // Send the updated product to the server
    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
        .then(response => response.json())
        .then(data => {
            // Update the product in the local array
            products = products.map(p => (p.id === productId ? data : p));
            displayProducts(); // Refresh the UI
        })
        .catch(error => console.error('Error:', error));
}


// Delete product
function deleteProduct(productId) {
    //create a are you sure message
    product=products.find(p=>p.id===productId);
    const r = confirm("Are you sure you want to delete"+product.name+"?");
    if (r == false) {
        return;
    }
    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Deleted:', data);
        })
        .catch(error => console.error('Error:', error));
    products = products.filter(p => p.id !== productId);
    displayProducts();

}


function toggleProducts() {
    var products = document.getElementById('product-list');
    var button = document.getElementById('toggleButton');
    var form = document.getElementById('add-product-form');
    var search = document.getElementById('search-bar');
    var addButtons = document.getElementsByClassName('swbutton');
    if (products.style.display === 'none') {
        products.style.display = 'block';
        button.textContent = 'Hide Products/Open form';
        button.style.backgroundColor = 'red';
        form.innerHTML = '';
        search.style.display = 'block';
        Array.from(addButtons).forEach(button => button.style.display = 'none');
    } else {
        products.style.display = 'none';
        button.textContent = 'Show Products/Close form';
        button.style.backgroundColor = 'green';
        search.style.display = 'none';
        createAddProductForm();
    }
}

function createAddProductForm() {
    const newProductForm = document.getElementById("add-product-form");
    const addButtons = document.getElementsByClassName('swbutton');
    Array.from(addButtons).forEach(button => button.style.display = 'inline-block');
    newProductForm.innerHTML = '';
    Object.keys(productInterface).forEach(key => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-input');
        const label = document.createElement('label');
        label.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: `;
        formGroup.appendChild(label);

        const input = document.createElement('input');
        switch (key) {
            case 'expirationDate':
            case 'purchaseDate':
            case 'openDate':
                input.type = 'date';
                break;
            case 'isOpened':
                input.type = 'checkbox';
                break;
            default:
                input.type = 'text';
                break;
        }
        input.id = key;
        formGroup.appendChild(input);
        newProductForm.appendChild(formGroup);
    });
    // Handle add and cancel buttons
    document.getElementById('add-save-button').onclick = saveNewProduct;
    document.getElementById('add-cancel-button').onclick = toggleProducts;
}

function saveNewProduct() {
    const form = document.getElementById('add-product-form');
    const newProduct = {};

    // Collect data from the form// Collect data from the form
Array.from(form.elements).forEach(input => {
    if (input.type === 'checkbox') {
        newProduct[input.id] = input.checked;
    } else if (input.type === 'date' && input.value) {
        newProduct[input.id] = new Date(input.value).toISOString();
    } else {
        newProduct[input.id] = input.value;
    }
});


    //clear form
    form.reset();

    // Send the new product to the server
    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
    })
        .then(response => response.json())
        .then(data => {
            products.push(data);// Add the new product to the local products array
            //confirm the product was added
            alert("Product was added successfully");
            displayProducts(); // Refresh the product list
        })
        .catch(error => console.error('Error:', error));
    toggleProducts();
}
function searchProducts(){
    const search = document.getElementById('search');
    const searchValue = search.value.toLowerCase();
    if (!searchValue) {
        products = [];
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => {
                products = data;
                displayProducts();
            });
        displayProducts();
        return;
    }
    const filteredProducts = products.filter(product => {
        return Object.keys(product).some(key => {
            if (key.toLowerCase().search('date') !== -1) {
                const date = new Date(product[key]);
                return date.toLocaleDateString().toLowerCase().includes(searchValue);
            }
            return product[key].toString().toLowerCase().includes(searchValue);
        });
    });
    products = filteredProducts;
    displayProducts();
}
//if the user presses enter in the search bar, search for the products event_listener
addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});
// Initialize the page
displayProducts();
