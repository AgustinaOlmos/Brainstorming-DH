const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro ?',
        text: "No podrás revertir esto. !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo !'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Su producto ha sido eliminado.',
                showConfirmButton: false,
                timer: 3500
            })
            setTimeout(function(){
                form.submit();
            }, 2500); 
        }
      })
});