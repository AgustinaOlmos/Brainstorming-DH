const form = document.getElementById('form');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(passwordValue === '') {
		setErrorFor(password, '(*) La contraseña no debe ingresar en blanco.');
        errors.push('(*) La contraseña no debe ingresar en blanco.');
	} else {
        if(!isPassword(passwordValue)) {
            setErrorFor(password, '(*) Deberá tener mínimo 8 caracteres, una letras mayúsculas, una letra minúsculas, un número y un carácter especial');
            errors.push('(*) Deberá tener mínimo 8 caracteres, una letras mayúsculas, una letra minúsculas, un número y un carácter especial');
        } else {
            setSuccessFor(password);
        }
	}
	
	if(password2Value === '') {
		setErrorFor(password2, '(*) Repetir contraseña no debe ingresar en blanco');
        errors.push('(*) Repetir contraseña no debe ingresar en blanco')
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, '(*) Las contraseñas no coinciden');
        errors.push('(*) Las contraseñas no coinciden');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}


// Modal

const modalAdd = document.querySelector('#modalAdd');

const openModal = () => {
    modalAdd.style.display = 'flex';
}

const closeModal = () => {
    modalAdd.style.display = 'none';
}

modalAdd.onclick = (e) => {
    if(e.target == modalAdd) {
        closeModal();
    }
}