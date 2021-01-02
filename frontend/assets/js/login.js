const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});


///////////////////////////////////////////////////////////



var formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function(e){

	e.preventDefault()
	var idMedico = document.getElementById('txtIdMedico')
	const urlAPI = 'http://localhost:5000/api/login/' + idMedico.value ;

	fetch(urlAPI)
	.then(response => response.json())
	.then(data => {
		if(data.username != "Null"){
			console.log(data)
			Swal.fire({
				icon: 'success',
				title: 'Id correcto',
				showConfirmButton: false,
				timer: 2500
			  })

			window.location.replace("http://127.0.0.1:5500/frontend/modulos/pacientes.html");
		
		}
		else{
			console.log("No existe el usuario")
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Id de medico no valido!'
			  })
		}
		
	})
	.catch(err => console.log(err))

})

