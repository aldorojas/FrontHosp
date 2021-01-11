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


////////////////////////////// nuevo hospital

var formNewHospital = document.getElementById('formNewHospital');

formNewHospital.addEventListener('submit', function(e){

	const URLNewHospital = 'http://134.122.120.195/api/v1/hospital';
    e.preventDefault()
    var nombreHospital = document.getElementById('nombreHospital')
	var direccionHospital = document.getElementById('direccionHospital')
	var telefonoHospital = document.getElementById('telefonoHospital')
	var adminHospital = document.getElementById('adminHospital')

    var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"hospital":nombreHospital.value, 
            "direccion": direccionHospital.value ,
            "telefono": telefonoHospital.value,
            "admin":adminHospital.value,
		});
	console.log(dataToSend)
	
	fetch(URLNewHospital, {
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
			title: 'Hospital registrado',
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


///////////////////////////////////////// Todos los hospitales




////////////////////////////////////////

const URLTodosHospitales = 'http://134.122.120.195/api/v1/hospitales/list';
var divPrueba = document.getElementById('contentTable')
divPrueba.innerHTML = ''

fetch(URLTodosHospitales)
	.then(response => response.json())
	.then(data => {
		
		console.log(data)
		for(var i = 0; i < data.length; i++){
			//console.log(data.pacientes[i].nombres)
			//console.log(data.pacientes[i].apellidos)
			
			if ( data[i].activo == true ){
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


			var nombre = `
			<tr>
				<th scope="row"> ${data[i].id} </th>
				<td> ${data[i].hospital}</td>
				<td>${data[i].direccion}</td>
				<td>${data[i].telefono}</td>
				<td>${switch1}</td>
				<td>
					<button onclick="deleteHospital(${data[i].id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
						<i class="icon ion-md-trash "></i>
					</button>
					<button onclick="editHospital(${data[i].id}, '${data[i].hospital}', '${data[i].direccion}',
													'${data[i].telefono}', '${data[i].activo}' )" 
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





function deleteHospital(idHospital){
	const URLDeleteHospital = 'http://134.122.120.195/api/v1/hospital/' + idHospital ;

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
			fetch(URLDeleteHospital, {
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
			'El hospital fue eliminado.',
			'success'
			)
		}
	})
}

//////////////////////////////////////////7
////////Editar hospital  /////////////////////////////
function editHospital(IdHospital,nombreHospital,direccionHospital,
	telefonoHospital, activoHospital
	){
	
	var idHospitalEdit = document.getElementById('idHospitalEdit')	
	var nombreHospitalEdit = document.getElementById('nombreHospitalEdit')
	var direccionHospitalEdit = document.getElementById('direccionHospitalEdit')
	var telefonoHospitalEdit = document.getElementById('telefonoHospitalEdit')
	var activoHospitalEdit = document.getElementById('activoHospitalEdit')

	idHospitalEdit.value = IdHospital;
	nombreHospitalEdit.value = nombreHospital;
	direccionHospitalEdit.value = direccionHospital;
	telefonoHospitalEdit.value = telefonoHospital;
	activoHospitalEdit.value = activoHospital;
	$('#editarHospital').modal('show');

}


/////////////   modal editar Hospitales //////////////////////////////

var formEditHospital = document.getElementById('formEditHospital');

formEditHospital.addEventListener('submit', function(e){

	const URLEditHospital = 'http://134.122.120.195/api/v1/hospital/update';
	e.preventDefault()
	var idHospitalEdit = document.getElementById('idHospitalEdit')
    var nombreHospitalEdit = document.getElementById('nombreHospitalEdit')
	var direccionHospitalEdit = document.getElementById('direccionHospitalEdit')
	var telefonoHospitalEdit = document.getElementById('telefonoHospitalEdit')
	var adminHospitalEdit = document.getElementById('activoHospitalEdit')

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{	
			"id" : idHospitalEdit.value,
			"hospital":nombreHospitalEdit.value, 
            "direccion": direccionHospitalEdit.value ,
            "telefono": telefonoHospitalEdit.value,
            "activo":adminHospitalEdit.value,
		});
	console.log(dataToSend)
	
	fetch(URLEditHospital, {
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
			title: 'Hospital editado',
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



/////////////////////// boton todos los hospitales

// var formTodosHospitales = document.getElementById('formTodosHospitales');

// formTodosHospitales.addEventListener('submit', function(e){

// 	const URLTodosHospitales = 'http://134.122.120.195/api/v1/hospitales/list';

// 	e.preventDefault()

// 	var divPrueba = document.getElementById('card')
//     divPrueba.innerHTML = ''

// 	fetch(URLTodosHospitales)
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
// 					<h1 class="blog-post_title">  Hospital: ${data[i].hospital} </h1>
//                     <div class="blog-post_date">
//                     <span> Id: ${data[i].id}</span>
// 					<span> Direccion: ${data[i].direccion}</span>
// 					<span> Telefono: ${data[i].telefono}</span> 
// 					<span> Activo:  ${data[i].activo}</span>
// 					</div>
					
// 				</div>
// 				</div>
// 				`
// 			divPrueba.innerHTML += nombre
// 		}

		
		
// 	})
// 	.catch(err => console.log(err))
// })



////////////////////// eliminar hospital boton

// var formDeleteHospital = document.getElementById('formDeleteHospital');

// formDeleteHospital.addEventListener('submit', function(e){

// 	var idHospital = document.getElementById('IdHospital')

// 	const URLDeleteHospital = 'http://134.122.120.195/api/v1/hospital/' + idHospital.value ;

// 	e.preventDefault()

// 	var headers = {
// 		"Content-Type": "application/json"
// 	 }
	
// 	fetch(URLDeleteHospital, {
// 		method: "DELETE",
// 		headers: headers
// 	})
// 	.then(function(response){ 
// 		return response.json(); 
// 	})
// 	.then(function(data){ 
// 		console.log(data)
// 		Swal.fire({
// 			icon: 'success',
// 			title: 'Hospital eliminado',
// 			showConfirmButton: false,
// 			timer: 2500
// 			})
// 		var divPrueba = document.getElementById('card')
// 		divPrueba.innerHTML = ''

		

// 	});
// })

