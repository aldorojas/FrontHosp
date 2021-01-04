

var formNewMedico = document.getElementById('formNewMedico');

formNewMedico.addEventListener('submit', function(e){

	const URLNewMedico = 'http://134.122.120.195/api/v1/doctor/';

    e.preventDefault()
    var IdHospital = document.getElementById('IdHospital')
	var nombreNewMedico = document.getElementById('nombreMedico')
	var apellidosNewMedico = document.getElementById('apellidosMedico')
	var telefonoNewMedico = document.getElementById('telefonoMedico')
	var especialidadNewMedico = document.getElementById('especialidadMedico')
	var staffNewMedico = document.getElementById('staffMedico')
	var becarioNewMedico = document.getElementById('becarioMedico')
	var internoNewMedico = document.getElementById('internoMedico')
    var activoNewMedico = document.getElementById('activoMedico')
    var adminNewMedico = document.getElementById('adminMedico')
    

    var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"id_hospital":IdHospital.value, 
            "nombre": nombreNewMedico.value ,
            "apellidos": apellidosNewMedico.value,
            "telefono":telefonoNewMedico.value,
            "especialidad":especialidadNewMedico.value,
            "staff":staffNewMedico.value,
            "becario": becarioNewMedico.value,
            "interno": internoNewMedico.value,
            "activo": activoNewMedico.value,
            "admin": adminNewMedico.value
		});
	console.log(dataToSend)
	
	fetch(URLNewMedico, {
		method: "POST",
		headers: headers,
		body: dataToSend
	})
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
        console.log(data)
        if(data.status == 'success'){
            Swal.fire({
			icon: 'success',
			title: 'Medico registrado',
			showConfirmButton: false,
			timer: 2500
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error inesperado'
              })
        }
		

	});
})


///////////////////////////////////////// Todos los medicos


var formTodosMedicos = document.getElementById('formTodosMedicos');

formTodosMedicos.addEventListener('submit', function(e){

	const URLTodosMedicos = 'http://134.122.120.195/api/v1/doctores/list';

	e.preventDefault()

	var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	fetch(URLTodosMedicos)
	.then(response => response.json())
	.then(data => {
		
		console.log(data)
		for(var i = 0; i < data.length; i++){
			//console.log(data.pacientes[i].nombres)
			//console.log(data.pacientes[i].apellidos)
			
			var nombre = `
				
				<div class="blog-post">
				<div class="blog-post_img">
					<img src="../assets/img/avatarCard.png">
				</div>
				<div class="blog-post_info">
					<h1 class="blog-post_title">  Medico: ${data[i].nombre} ${data[i].apellidos} </h1>
					<div class="blog-post_date">
					<span> Id: ${data[i].id}</span>
					<span> Especialidad: ${data[i].especialidad}</span>
					<span> Staff: ${data[i].staff}</span>
					<span> Telefono: ${data[i].telefono}</span> 
					<span> Hospital:  ${data[i].id_hospital}</span>
					<span> Becario:  ${data[i].becario}</span>
					<span> Interno:  ${data[i].interno}</span>
					</div>
					
				</div>
				</div>
				`
			divPrueba.innerHTML += nombre
		}

		
		
	})
	.catch(err => console.log(err))
	//.catch(
		
	//)
})

//////////////////////////////Eliminar medicos



var formDeleteMedico = document.getElementById('formDeleteMedico');

formDeleteMedico.addEventListener('submit', function(e){

	var IdMedico = document.getElementById('IdMedico')

	const URLDeleteHospital = 'http://134.122.120.195/api/v1/doctor/' + IdMedico.value ;

	e.preventDefault()

	var headers = {
		"Content-Type": "application/json"
	 }
	
	fetch(URLDeleteHospital, {
		method: "DELETE",
		headers: headers
	})
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
		console.log(data)
		Swal.fire({
			icon: 'success',
			title: 'Medico eliminado',
			showConfirmButton: false,
			timer: 2500
			})
		var divPrueba = document.getElementById('card')
		divPrueba.innerHTML = ''

		

	});
})
