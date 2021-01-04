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
	const urlAPI = 'http://134.122.120.195/api/v1/login/' + idMedico.value ;

	fetch(urlAPI)
	.then(response => response.json())
	.then(data => {
		
		console.log(data)
		Swal.fire({
			icon: 'success',
			title: 'Id correcto',
			showConfirmButton: false,
			timer: 2500
			})

		window.location.replace("http://134.122.120.195:8080/modulos/pacientes.html");
		
	})
	//.catch(err => console.log(err)
	.catch(
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Id de medico no valido!'
		  })
	)	

})

