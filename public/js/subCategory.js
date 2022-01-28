const selectElement = document.querySelector(".categoryProduct");
const selectElement2 = document.querySelector(".subCategoryProduct");
var categoryID;
var subCategoryArray = [];

selectElement.addEventListener("change", (event) => {
    categoryID = event.target.value;

    const url = 'http://localhost:4000/products/subcategories';
    fetch(url)
    .then(response => response.json())
    .then(categories => {
      subCategoryArray = categories.filter(subcategory => subcategory.category_id == categoryID);
      var length = selectElement2.options.length;
      for (i = length-1; i >= 0; i--) {
        selectElement2.options[i] = null;
      }
      subCategoryArray.forEach(subCategory => {
        const { id, name } = subCategory;
        const optionElement = document.createElement("option");
        optionElement.innerText = `${ name }`;
        optionElement.value = id
        selectElement2.appendChild(optionElement);
      })
    })
    .catch(err => console.log(err));
    
})