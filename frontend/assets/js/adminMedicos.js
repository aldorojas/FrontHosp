window.onload = (function(){
	console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
	  console.log("si es admin")
	  document.getElementById("moduloAdmin").style.display = 'block'
	}
	else{
	  console.log("no es admin")
	  //element.style.display = 'none'; 
	}
  
  })



const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {

	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})

////////////////////////////////////////////////////////////////////////////7


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

const URLTodosMedicos = 'http://134.122.120.195/api/v1/doctores/list';
var divPrueba = document.getElementById('contentTable')
divPrueba.innerHTML = ''


fetch(URLTodosMedicos)
	.then(response => response.json())
	.then(data => {
		
		console.log(data)
		for(var i = 0; i < data.length; i++){
			//console.log(data.pacientes[i].nombres)
			//console.log(data.pacientes[i].apellidos)
			
			if ( data[i].becario == true ){
				var switch1 = ' <div class="custom-control custom-switch">' +
					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
					'<label class="custom-control-label" for="customSwitch1"></label>' +
			  	'</div>'
				  console.log(switch1);
			}
			else{
				switch1 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			  '</div>'
			}

			if ( data[i].interno == true ){
				var switch2 = ' <div class="custom-control custom-switch">' +
					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
					'<label class="custom-control-label" for="customSwitch1"></label>' +
			  	'</div>'
				  console.log(switch1);
			}
			else{
				switch2 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			  '</div>'
			}

			if ( data[i].activo == true ){
				var switch3 = ' <div class="custom-control custom-switch">' +
					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
					'<label class="custom-control-label" for="customSwitch1"></label>' +
			  	'</div>'
				  console.log(switch1);
			}
			else{
				switch3 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			  '</div>'
			}

			if ( data[i].admin == true ){
				var switch4 = ' <div class="custom-control custom-switch">' +
					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
					'<label class="custom-control-label" for="customSwitch1"></label>' +
			  	'</div>'
				  console.log(switch1);
			}
			else{
				switch3 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			  '</div>'
			}
			
			

			var nombre = `
			<tr>
				<th scope="row"> ${data[i].id} </th>
				<td> ${data[i].id_hospital}<td>
				<td>${data[i].nombre}</td>
				<td>${data[i].apellidos}</td>
				<td>${data[i].telefono}</td>
				<td>${data[i].staff}</td>
				<td>${data[i].especialidad}</td>
				<td> 
					${switch1}
				</td>
				<td>${switch2}</td>
				<td>${switch3}</td>
				<td>${switch4}</td>
				<td>
					<button onclick="deleteMedico(${data[i].id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
						<i class="icon ion-md-trash "></i>
					</button>
					<button onclick="editMedico(${data[i].id}, ${data[i].id_hospital},'${data[i].nombre}','${data[i].apellidos}',
										'${data[i].telefono}', '${data[i].staff}', '${data[i].especialidad}', '${data[i].becario}',
										 '${data[i].interno}', '${data[i].activo}', '${data[i].admin}' )" 
						class="btn btn-info btn-sm" title="Editar Paciente">
						<i class="icon ion-md-create "></i>
					</button>
				</td>
			</tr>
				`
			divPrueba.innerHTML += nombre
		}})
// 	})
 	.catch(err => console.log(err))

///////////////////////////////////////////////////////////////////////////////////
	
	function deleteMedico(idMedico){
	const URLDeleteMedico = 'http://134.122.120.195/api/v1/doctor/' + idMedico ;

	var headers = {
		"Content-Type": "application/json"
		}

	Swal.fire({
	title: 'Esta seguro?',
	text: "¡No podrás revertir esto!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Si, borrar!'
	}).then((result) => {
	if (result.isConfirmed) {
		fetch(URLDeleteMedico, {
			method: "DELETE",
			headers: headers
		})
		.then(function(response){ 
			return response.json(); 
		})
		.then(function(data){ 
			console.log("Eliminado")
		})
		.catch(err => console.log(err))
		
		Swal.fire(
			'Borrado!',
			'El medico fue eliminado.',
			'success'
		)
	}
	})
	}


	function editMedico(IdMedico,IdHospital,nombreMedico,apellidosMedico,
		telefonoMedico,  staffMedico, especialidadMedico,  becarioMedico,
		internoMedico, activoMedico, adminMedico
		){
		// console.log(IdHospital,nombreMedicoEdit,apellidosMedicoEdit,telefonoMedicoEdit, 
		// 	telefonoMedicoEdit, especialidadMedicoEdit, staffMedicoEdit)
		
		var IdMedicoEdit = document.getElementById('IdMedicoEdit')
		var IdHospitalEdit = document.getElementById('IdHospitalEdit')
		var nombreMedicoEdit = document.getElementById('nombreMedicoEdit')
		var apellidosMedicoEdit = document.getElementById('apellidosMedicoEdit')
		var telefonoMedicoEdit = document.getElementById('telefonoMedicoEdit')
		var especialidadMedicoEdit = document.getElementById('especialidadMedicoEdit')
		var staffMedicoEdit = document.getElementById('staffMedicoEdit')
		var becarioMedicoEdit = document.getElementById('becarioMedicoEdit')
		var internoMedicoEdit = document.getElementById('internoMedicoEdit')
		var activoMedicoEdit = document.getElementById('activoMedicoEdit')
		var adminMedicoEdit = document.getElementById('adminMedicoEdit')
		
		IdMedicoEdit.value = IdMedico;
		IdHospitalEdit.value = IdHospital;
		nombreMedicoEdit.value = nombreMedico;
		apellidosMedicoEdit.value = apellidosMedico;
		telefonoMedicoEdit.value = telefonoMedico;
		especialidadMedicoEdit.value = especialidadMedico;
		staffMedicoEdit.value = staffMedico;
		becarioMedicoEdit.value = becarioMedico;
		internoMedicoEdit.value = internoMedico;
		activoMedicoEdit.value = activoMedico;
		adminMedicoEdit.value = adminMedico;

		
		$('#editMedico').modal('show');

	}


	/////////////////   Modal editar medicos  //////////

	var formEditMedico = document.getElementById('formEditMedico');

	formEditMedico.addEventListener('submit', function(e){
	
		const URLEditMedico = 'http://134.122.120.195/api/v1/doctor/update';
	
		e.preventDefault()
		var idMedico = document.getElementById('IdMedicoEdit')
		var IdHospital = document.getElementById('IdHospitalEdit')
		var nombreEditMedico = document.getElementById('nombreMedicoEdit')
		var apellidosEditMedico = document.getElementById('apellidosMedicoEdit')
		var telefonoEditMedico = document.getElementById('telefonoMedicoEdit')
		var especialidadEditMedico = document.getElementById('especialidadMedicoEdit')
		var staffEditMedico = document.getElementById('staffMedicoEdit')
		var becarioEditMedico = document.getElementById('becarioMedicoEdit')
		var internoEditMedico = document.getElementById('internoMedicoEdit')
		var activoEditMedico = document.getElementById('activoMedicoEdit')
		var adminEditMedico = document.getElementById('adminMedicoEdit')
		
	
		var headers = {
			"Content-Type": "application/json"
		 }
	
		const dataToSend = JSON.stringify(
			{
				"id" : idMedico.value,
				"id_hospital":IdHospital.value, 
				"nombre":nombreEditMedico.value,
				"apellidos":apellidosEditMedico.value,
				"telefono":telefonoEditMedico.value,
				"especialidad":especialidadEditMedico.value,
				"staff":staffEditMedico.value,
				"becario": becarioEditMedico.value,
				"interno": internoEditMedico.value,
				"activo": activoEditMedico.value,
				"admin": adminEditMedico.value
			});
			
		console.log(dataToSend)
		fetch(URLEditMedico, {
			method: "POST",
			headers: headers,
			body: dataToSend
		})
		.then(function(response){ 
			return response.json(); 
		})
		.then(function(data){ 
			console.log(data)
			if(data.status == 'Success'){
				Swal.fire({
				icon: 'success',
				title: 'Medico actualizado',
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
			
	
		})
		.catch(err => console.log(err));
		
	})



//////////////////////////////////////////////////

// var formTodosMedicos = document.getElementById('formTodosMedicos');

// formTodosMedicos.addEventListener('submit', function(e){

// 	const URLTodosMedicos = 'http://134.122.120.195/api/v1/doctores/list';

// 	e.preventDefault()

// 	var divPrueba = document.getElementById('card')
//     divPrueba.innerHTML = ''

// 	fetch(URLTodosMedicos)
// 	.then(response => response.json())
// 	.then(data => {
		
// 		console.log(data)
// 		for(var i = 0; i < data.length; i++){
// 			//console.log(data.pacientes[i].nombres)
// 			//console.log(data.pacientes[i].apellidos)
			
// 			var nombre = `
				
// 				<div class="blog-post">
// 				<div class="blog-post_img">
// 					<img src="../assets/img/avatarCard.png">
// 				</div>
// 				<div class="blog-post_info">
// 					<h1 class="blog-post_title">  Medico: ${data[i].nombre} ${data[i].apellidos} </h1>
// 					<div class="blog-post_date">
// 					<span> Id: ${data[i].id}</span>
// 					<span> Especialidad: ${data[i].especialidad}</span>
// 					<span> Staff: ${data[i].staff}</span>
// 					<span> Telefono: ${data[i].telefono}</span> 
// 					<span> Hospital:  ${data[i].id_hospital}</span>
// 					<span> Becario:  ${data[i].becario}</span>
// 					<span> Interno:  ${data[i].interno}</span>
// 					</div>
					
// 				</div>
// 				</div>
// 				`
// 			divPrueba.innerHTML += nombre
// 		}

		
		
// 	})
// 	.catch(err => console.log(err))
// 	//.catch(
		
// 	//)
// })

////////////////////////////////////////////////




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
