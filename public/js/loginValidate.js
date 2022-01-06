const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

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
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

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
    // Validacion para Password
    if(passwordValue === '') {
        setErrorFor(password, '(*) La conraseña no debe estar en blanco');
        errors.push('(*) La conraseña no debe estar en blanco');
    } else {
        setSuccessFor(password);
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
