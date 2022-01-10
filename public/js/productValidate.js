const formCreate = document.getElementById('form-create')
const title = document.getElementById('title')
const imageFile = document.getElementById('imageFile')
const price = document.getElementById('price')
const promotion = document.getElementById('promotion')
const category = document.getElementById('category')
const subcategory = document.getElementById('subcategory')

let errors = []

formCreate.addEventListener('submit', e => {
    checkInputs();
    if (errors.length > 0) {
        e.preventDefault();

    } else {
        e.preventDefault();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La validación fué exitosa',
            showConfirmButton: false,
            timer: 2500
        })
        setTimeout(function () {
            formCreate.submit();
        }, 2500);
    }

    errors = [];
});

function checkInputs() {
    const titleValue = title.value.trim()
    const imageFileValue = imageFile.value
    const priceValue = price.value.trim()
    const promotionValue = promotion
    const categoryValue = category
    const subcategoryValue = subcategory

    // Validacion para titulo de producto
    if (titleValue === '') {
        setErrorFor(title, '(*) Escribe un nombre para el producto')
        errors.push('(*) Escribe un nombre para el producto')
    } else if (titleValue.length < 5) {
        setErrorFor(title, '(*) Pocas letras')
        errors.push('(*) El nombre del producto debe contener al menos de 5 letras')
    } else {
        setSuccessFor(title);
    }

    // Validacion de Imagenes
    let fileExtension = '.' + imageFileValue.split('.').pop();
    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.psd']
    if (fileExtension != '.') {
        if (!acceptedExtensions.includes(fileExtension)) {
            setErrorFor(imageFile, `(*) Los archivos permitidos son (${acceptedExtensions.join(', ')})`);
            errors.push(`(*) Los archivos permitidas son (${acceptedExtensions.join(', ')})`);
        } else {
            setSuccessFor(imageFile)
        }
    } else {
        setSuccessFor(imageFile)
    }

    // Validacion de Precio
    if (priceValue === '') {
        setErrorFor(price, '(*) Escribe un importe para el producto');
        errors.push('(*) Escribe un importe para el producto');
    } else {
        setSuccessFor(price);
    }
    // Validacion de Promocion
    if (!promotionValue.value) {
        setErrorFor(promotion, '(*) Seleccione una tipo de promoción');
        errors.push('(*) Seleccione una tipo de promoción');
    } else {
        setSuccessFor(promotion);
    }
    // Validacion de Categoria
    if (!categoryValue.value) {
        setErrorFor(category, '(*) Seleccione una Categoría');
        errors.push('(*) Seleccione una Categoría');
    } else {
        setSuccessFor(category);
        console.log(category.value)
    }
    // Validacion de Subcategoria
    if (!subcategoryValue.value) {
        setErrorFor(subcategory, '(*) Seleccione una Subcategoría');
        errors.push('(*) Seleccione una Subcategoría');
    } else {
        setSuccessFor(subcategory);
    }
}



function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.classList = 'form-group error';
    small.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.classList = 'form-group success';
}


console.log(errors)