var formBusqueda2 = document.getElementById('formBusqueda2');

formBusqueda2.addEventListener('submit', function(e){

	e.preventDefault()
	var nombrePaciente = document.getElementById('input2')
	const urlAPI = 'http://localhost:5000/api/getPaciente/' + nombrePaciente.value ;

	var divPrueba = document.getElementById('card')
	divPrueba.innerHTML = ''
    console.log(urlAPI)
	fetch(urlAPI)
	.then(response => response.json())
	.then(data => {
		if(data.message == "Success"){
			for(var i = 0; i < data.pacientes.length; i++){
				//console.log(data.pacientes[i].nombres)
				//console.log(data.pacientes[i].apellidos)
				
				var nombre = `
					
					<div class="blog-post">
					<div class="blog-post_img">
						<img src="../assets/img/avatarCard.png">
					</div>
					<div class="blog-post_info">
						<h1 class="blog-post_title"> ${data.pacientes[i].nombres} ${data.pacientes[i].apellidos} </h1>
						<div class="blog-post_date">
						<span> Pasaporte: ${data.pacientes[i].pasaporte}</span>
						<span> Rut: ${data.pacientes[i].rut}</span>
						<span> Direccion: ${data.pacientes[i].direccion}</span> 
						<span> Fecha de nacimiento:  ${data.pacientes[i].fechaNacimiento}</span>
						<span> Telefono:  ${data.pacientes[i].telefono}</span>
						<span> Sexo:  ${data.pacientes[i].sexo}</span>
						</div>
						
					</div>
					</div>
					`
				divPrueba.innerHTML += nombre
			}
		}
		else{
			console.log(data.message)
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
				  toast.addEventListener('mouseenter', Swal.stopTimer)
				  toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			  })
			  
			  Toast.fire({
				icon: 'error',
				title: 'El paciente no existe'
			  })

			$('#exampleModal').modal('show');	
		}
	})
	.catch(err => console.log(err))
})



var formNewPaciente = document.getElementById('formNewPaciente');

formNewPaciente.addEventListener('submit', function(e){
	e.preventDefault()
	var nombreNewPaciente = document.getElementById('nombres')
	var apellidosNewPaciente = document.getElementById('apellidos')
	var rutNewPaciente = document.getElementById('rut')
	var pasaporteNewPaciente = document.getElementById('pasaporte')
	var direccionNewPaciente = document.getElementById('direccion')
	var telefonoNewPaciente = document.getElementById('telefono')
	var sexoNewPaciente = document.getElementById('sexo')
	var fechaNacimientoNewPaciente = document.getElementById('fechaNacimiento')

	const dataToSend = JSON.stringify({"nombres": nombreNewPaciente.value , "apellidos": apellidosNewPaciente.value,
										"rut": rutNewPaciente.value, "pasaporte": pasaporteNewPaciente.value, "direccion": direccionNewPaciente.value,
										"telefono": telefonoNewPaciente.value, "sexo": sexoNewPaciente.value, "fechaNacimiento":fechaNacimientoNewPaciente.value});

	console.log(dataToSend)


})