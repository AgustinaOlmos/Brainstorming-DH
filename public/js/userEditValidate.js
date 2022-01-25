const form = document.getElementById('form');
const usuario = document.getElementById('username');
const dni_Cuil = document.getElementById('dniCuil');
const phone = document.getElementById('numberPhone');
const email = document.getElementById('email');
const afip = document.getElementById('afip');
const street = document.getElementById('street');
const number = document.getElementById('number');
const zip = document.getElementById('zip');
const city = document.getElementById('city');
const state = document.getElementById('state');
const imageFile = document.getElementById('imageFile');

let errors = [];

form.addEventListener('submit', e => {
    checkInputs();
    if (errors.length > 0) {
        e.preventDefault();
        
    }else{
        e.preventDefault();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La validación fué exitosa',
            showConfirmButton: false,
            timer: 2500
        })
        setTimeout(function(){
            form.submit();
        }, 2500);  

    }
	errors = [];
});

function checkInputs() {
	// trim to remove the whitespaces
	const usuarioValue = usuario.value.trim();
	const dni_CuilValue = dni_Cuil.value.trim();
	const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const afipValue = afip;
    const streetValue = street.value.trim();
    const numberValue = number.value.trim();
    const zipValue = zip.value.trim();
    const cityValue = city.value.trim();
    const stateValue = state;
    const imageFileValue = imageFile.value;

    // Validacion para nombre usuario
	if(usuarioValue === '') {
		setErrorFor(usuario, '(*) Tienes que escribir un nombre completo');
        errors.push('(*) Tienes que escribir un nombre completo');
	} else if(usuarioValue.length < 2) {
		setErrorFor(usuario, '(*) Debe contener un mínimo de 2 carateres');
        errors.push('(*) Debe contener un mínimo de 2 carateres');
	} else {
		setSuccessFor(usuario);
	}
    // Validacion para DNI - CUIT - CUIL
    if(dni_CuilValue === '') {
		setErrorFor(dni_Cuil, '(*) Tienes que escribir un DNI o CUIT');
        errors.push('(*) Tienes que escribir un DNI o CUIT');
	} else if(dni_CuilValue.length < 7 || dni_CuilValue.length > 11) {
        setErrorFor(dni_Cuil, '(*) Debe contener un mínimo de 7  y un máximo se 11 caracteres numéricos');
        errors.push('(*) Debe contener un mínimo de 7  y un máximo se 11 caracteres numéricos');
    } else {
        setSuccessFor(dni_Cuil);
    }
    // Validacion para Phone
    if(phoneValue === '') {
		setErrorFor(phone, '(*) Tienes que escribir un teléfono');
        errors.push('(*) Tienes que escribir un teléfono');
	} else if(phoneValue.length < 7 || phoneValue.length > 13) {
        setErrorFor(phone, '(*) Debe contener un mínimo de 7 y un máximo de 13 carateres');
        errors.push('(*) Debe contener un mínimo de 7 y un máximo de 13 carateres');
    } else {
        setSuccessFor(phone);
    }
    // Validacion para Email
    if(emailValue === '') {
		setErrorFor(email, '(*) Tienes que escribir un correo electrónico');
        errors.push('(*) Tienes que escribir un correo electrónico');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, '(*) Debes escribir un formato de correo válido');
        errors.push('(*) Debes escribir un formato de correo válido');
	} else {
		setSuccessFor(email);
	}
    // Validacion para Afip
    if(!afipValue.value) {
		setErrorFor(afip, '(*) Por favor seleccione una categoria tributaria');
        errors.push('(*) Por favor seleccione una categoria tributaria');
	} else {
		setSuccessFor(afip);
	}
    // Validacion para Street
    if(streetValue === '') {
		setErrorFor(street, '(*) Tienes que ingresar una calle');
        errors.push('(*) Tienes que ingresar una calle');
	} else {
		setSuccessFor(street);
	}
    // Validacion para Number
    if(numberValue === '') {
		setErrorFor(number, '(*) Tienes que ingresar un numero');
        errors.push('(*) Tienes que ingresar un numero');
	} else {
		setSuccessFor(number);
	}
    // Validacion para Zip
    if(zipValue === '') {
		setErrorFor(zip, '(*) Tienes que ingresar un código Postal');
        errors.push('(*) Tienes que ingresar un código Postal');
	} else {
		setSuccessFor(zip);
	}
    // Validacion para City
    if(cityValue === '') {
		setErrorFor(city, '(*) Tienes que ingresar una localidad');
        errors.push('(*) Tienes que ingresar una localidad');
	} else {
		setSuccessFor(city);
	}
     // Validacion para Afip
     if(!stateValue.value) {
		setErrorFor(state, '(*) Tienes que seleccionar una ciudad');
        errors.push('(*) Tienes que seleccionar una ciudad');
	} else {
		setSuccessFor(state);
	}
     // Validacion para Imagenes
     let fileExtension = '.' + imageFileValue.split('.').pop();
     let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff', '.psd'];
     if(fileExtension != '.'){
        if(!acceptedExtensions.includes(fileExtension)) {
            setErrorFor(imageFile, `(*) Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`);
            errors.push(`(*) Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`);
        } else {
            setSuccessFor(imageFile);
        }
     } else {
        setSuccessFor(imageFile);
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

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
