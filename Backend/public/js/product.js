let productList = [];
let productTodo = [];
function fetchProductData() {
    return fetch('/getProductList')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then(data => {
            productList = data.productList;
            // Now you can use the CourseList array with the fetched data
        })
        .catch(error => {
            // Handle errors that occurred during the fetch
            console.error('Error during fetch:', error);
        });
}

// Call the function to initiate the fetch operation
fetchProductData();


function addProductTodo() {
    // Get values from input fields
    var subProductName = document.getElementById("subProductName").value;
    var subProductLink = document.getElementById("subProductLink").value;
    var ProductUlList = document.getElementById("ProductUlList");

    var subTitleElement = document.createElement("li");
    subTitleElement.innerHTML = `<p id="${subProductName}" data-title="${subProductName}" data-description='${subProductLink}'  onclick="editProduct(this)"><strong> ${subProductName} </strong></p> `;
    ProductUlList.appendChild(subTitleElement);
    productTodo.push({ name: subProductName, link: subProductLink });

    // Clear input fields
    document.getElementById("subProductName").value = "";
    document.getElementById("subProductLink").value = "";


    toggleVisibility('noSubtitle', 'addProductVisiblity');

}

function handleSubmitProduct() {
    var mainProductName = document.getElementById("mainProductName");
    var ProductUlList = document.getElementById("ProductUlList");


    const formData = new FormData();
    formData.append("mainProduct", mainProductName.value);
    formData.append("subProducts", JSON.stringify(productTodo));

    fetch('/addProductList', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            productList = data.productList;
            mainProductName.value = '';
            ProductUlList.innerHTML = '';
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });

    // location.reload();

}

const editProduct = (elementToRemove) => {

    const title = elementToRemove.getAttribute('data-title');
    const description = elementToRemove.getAttribute('data-description');

    const ProductUlList = document.getElementById("ProductUlList");

    ProductUlList.removeChild(elementToRemove.parentNode);

    const indexToRemove = productTodo.findIndex(todo => todo.name === title.value);
    productTodo.splice(indexToRemove, 1);

    const updatesubProductName = document.getElementById("subProductName");
    const updatesubProductLink = document.getElementById("subProductLink");

    updatesubProductName.value = title;

    updatesubProductLink.value = description;

    toggleVisibility('yesSubtitle', 'addProductVisiblity')

}

function handleUpdateProduct() {
    var updateProductSelect = document.getElementById('updateProduct');
    originalSubTitleName = updateProductSelect.value;
    var selectedProduct = updateProductSelect.options[updateProductSelect.selectedIndex];

    var subproductSelect = document.getElementById('updateSubProduct');
    subproductSelect.innerHTML = ''; // Clear existing options
    subproductSelect.innerHTML += '<option value="" selected disabled> Select Prdoduct </option>';

    // Find the selected product in productList
    var selectedProductData = productList.find(function (prodcut) {
        return prodcut.mainProduct === selectedProduct.value;
    });
    // Assuming selectedProductData is the object mentioned above

    toggleVisibility("yesSubtitle", "updateSubProductVisiblity");



    if (selectedProductData) {
        selectedProductData.subProducts.forEach(function (subproduct) {
            addSubProductOption(subproduct);
        });
    }

}

function addSubProductOption(subproduct) {
    var subproductSelect = document.getElementById('updateSubProduct');
    var newOption = document.createElement('option');
    newOption.value = subproduct.name;
    newOption.text = subproduct.name;
    subproductSelect.appendChild(newOption);
}

var originalSubProductName;
function handleSubProductSelection() {
    toggleVisibility("noSubtitle", "updateSelectProduct");
    var selectedProduct = document.getElementById('updateProduct');
    var subproductSelect = document.getElementById('updateSubProduct');
    originalSubProductName = subproductSelect.value;
    var selectedOption = subproductSelect.options[subproductSelect.selectedIndex];

    toggleVisibility("yesSubtitle", "updateSelectProduct", "upAddSubtDescVisiblity");
    var updatesubProductName = document.getElementById("updatesubProductName");
    var updatesubProductLink = document.getElementById("updatesubProductLink");

    //getting descrition from productList
    var selectedLink = productList
        .find(product => product.mainProduct === selectedProduct.value)
        ?.subProducts
        .find(subproduct => subproduct.name === selectedOption.value)
        ?.link;

    //setting value
    updatesubProductName.value = selectedOption.value;
    updatesubProductLink.value = selectedLink;
}

function updateSubProductList() {
    var selectedProduct = document.getElementById('updateProduct');
    var updateSubProduct = document.getElementById("updatesubProductName");
    var updatesubProductLink = document.getElementById("updatesubProductLink");
    // var updateQuillEditorSub = quillUp.getContents();

    productList = productList.map(product => {
        if (product.mainProduct === selectedProduct.value) {
            product.subProducts = product.subProducts.map(subproduct => {
                if (subproduct.name === originalSubProductName) {
                    return { name: updateSubProduct.value, link: updatesubProductLink.value };
                }
                return subproduct;
            });
        }
        return product;
    });

    updateSubProduct.value = "";
    updatesubProductLink.value = ""
    toggleVisibility("noSubtitle", "updateSelectProduct");

    //immediately update dropdown 
    // updateProduct related function
    handleUpdateProduct();
    fetchUpdateProductData();
}

function updateAddSubProduct() {
    var selectedProduct = document.getElementById('updateProduct');
    var upAddSubProductName = document.getElementById("upAddSubProductName");
    var upAddSubProductLink = document.getElementById("upAddSubProductLink");

    // Find the target product in ProductList
    var targetProduct = productList.find(product => product.mainProduct === selectedProduct.value);
    targetProduct.subProducts.push({ name: upAddSubProductName.value, link: upAddSubProductLink.value });

    addSubProductOption({ name: upAddSubProductName.value, link: upAddSubProductLink.value })

    // Clear input fields
    upAddSubProductName.value = "";
    upAddSubProductLink.value = "";

    toggleVisibility('noSubtitle', 'upAddSubtDescVisiblity')
    fetchUpdateProductData();
}

function fetchUpdateProductData() {
    const formData = new FormData();
    formData.append("productList", JSON.stringify(productList));


    fetch('/updateProductList', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            productList = data.productList;
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });

    // location.reload();

}
function deleteProduct() {
    var deleteProductSelect = document.getElementById('deleteProduct');

    var deleteSubproductSelect = document.getElementById('deletesubproduct');
    var selectedValues = Array.from(deleteSubproductSelect.selectedOptions).map(option => option.value);

    if ((selectedValues.length === 1 && selectedValues[0] === '') || selectedValues.length === 0) {
        // It will not delete product if it has subProducts
        var kpscProductLength = productList.find(product => product.mainProduct === deleteProductSelect.value)?.subProducts?.length;
        if (kpscProductLength > 0) {
            return;
        }
        // Get the index of the currently selected option
        var selectedIndex = deleteProductSelect.selectedIndex;

        if (selectedIndex !== -1) {
            // Remove the currently selected option
            deleteProductSelect.remove(selectedIndex);
        }
        deleteProductList(selectedIndex - 1)
        return;
    }

    selectedValues.forEach(function (value) {
        var optionToRemove = deleteSubproductSelect.querySelector('option[value="' + value + '"]');

        if (optionToRemove) {
            // Remove the option
            optionToRemove.remove();
        }
        toggleVisibility("noSubtitle", "deletesubproductVisiblity");
    });
    deleteProductList(deleteProductSelect.selectedIndex - 1, selectedValues);

}

function deleteProductList(productIndex, selectedValues) {
    if (selectedValues === null || selectedValues === undefined) {
        productList.splice(productIndex, 1)
        fetchDeleteProductList();
        return;
    }

    if (productIndex !== -1) {
        // Iterate over selectedValues
        selectedValues.forEach(subProductToRemove => {
            // Find the index of the subTitle in SubTitle array
            var subProductIndex = productList[productIndex]?.subProducts.findIndex(subProduct => subProduct.name === subProductToRemove);

            // Check if the subTitle exists
            if (subProductIndex !== -1) {
                productList[productIndex].subProducts.splice(subProductIndex, 1);
            }
        });
    }
    fetchDeleteProductList();
}

function fetchDeleteProductList() {
    const formData = new FormData();
    formData.append("productList", JSON.stringify(productList));


    fetch('/deleteProductList', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            productList = data.productList;            
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });

    // location.reload();
}

//DropDownFunctionality
function handleDeleteProduct() {

    var deleteproductSelect = document.getElementById('deleteProduct');

    var selectedProduct = deleteproductSelect.value;
    var subproductSelect = document.getElementById('deletesubproduct');
    subproductSelect.innerHTML = ''; // Clear existing options
    // subproductSelect.innerHTML += '<option value="" selected disabled> Select Course </option>';

    // Find the selected product in ProductList
    var selectedProductData = productList.find(function (product) {
        return product.mainProduct === selectedProduct;
    });
    // Assuming selectedProductData is the object mentioned above

    if (selectedProductData && selectedProductData.subProducts && selectedProductData.subProducts.length > 0) {
        toggleVisibility("yesSubtitle", "deletesubproductVisiblity");
    } else {
        toggleVisibility("noSubtitle", "deletesubproductVisiblity");
    }

    // Add options based on the selected product's subproduct
    if (selectedProductData && selectedProductData.subProducts) {
        selectedProductData.subProducts.forEach(function (subproduct) {
            // var deleteproductSelect = document.getElementById('deletesubproduct');
            var newOption = document.createElement('option');
            newOption.value = subproduct.name;
            newOption.text = subproduct.name;
            subproductSelect.appendChild(newOption);
        });
    }

}