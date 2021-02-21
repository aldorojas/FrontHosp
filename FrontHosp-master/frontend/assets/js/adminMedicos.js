window.onload = (function(){
	console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
	  document.getElementById("moduloAdminMed").style.display = 'block'
	  document.getElementById("moduloAdminHosp").style.display = 'block'
	}

	if (localStorage.getItem("nombreMedico") === null) {
		window.location.href = '../index.html'
	}
	else{
		loadMedico();
	}

	// numberPages();
	// const URLTodosMedicos = 'http://134.122.120.195/api/v1/doctores/list/1';
	// allMedicos(URLTodosMedicos)

})

/////////////////////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
}

function showDivBusquedaMedicos(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1Med").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2Med").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3Med").style.display = element.value == 2 ? 'block' : 'none';
}

function validateStaff(element){ 
	if (element.value == 'True'){
		document.getElementById('becarioMedico').value = 'False'
		document.getElementById('becarioMedico').disabled = true
		document.getElementById('internoMedico').value = 'False'
		document.getElementById('internoMedico').disabled = true
	}
	else{
		document.getElementById('becarioMedico').disabled = false
		document.getElementById('internoMedico').disabled = false
	}
}
function validateBecario(element){ 
	if (element.value == 'True'){
		document.getElementById('staffMedico').value = 'False'
		document.getElementById('staffMedico').disabled = true
		document.getElementById('internoMedico').value = 'False'
		document.getElementById('internoMedico').disabled = true
	}
	else{
		document.getElementById('staffMedico').disabled = false
		document.getElementById('internoMedico').disabled = false
	}
}
function validateInterno(element){ 
	if (element.value == 'True'){
		document.getElementById('staffMedico').value = 'False'
		document.getElementById('staffMedico').disabled = true
		document.getElementById('becarioMedico').value = 'False'
		document.getElementById('becarioMedico').disabled = true
	}
	else{
		document.getElementById('staffMedico').disabled = false
		document.getElementById('becarioMedico').disabled = false
	}
}

const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {

	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})

////////////////////////////////////////////////////////////////////////////7
///////// new medico

var formNewMedico = document.getElementById('formNewMedico');

formNewMedico.addEventListener('submit', function(e){

	const URLNewMedico = 'http://134.122.120.195/api/v1/doctor/';

    e.preventDefault()
    //var IdHospital = document.getElementById('IdHospital')
	var nombreNewHospital = document.getElementById('nombreHospital')
	var nombreNewMedico = document.getElementById('nombreMedico')
	var apellidosNewMedico = document.getElementById('apellidosMedico')
	var telefonoNewMedico = document.getElementById('telefonoMedico')
	var especialidadNewMedico = document.getElementById('especialidadMedico')
	var staffNewMedico = document.getElementById('staffMedico')
	var becarioNewMedico = document.getElementById('becarioMedico')
	var internoNewMedico = document.getElementById('internoMedico')
    var activoNewMedico = document.getElementById('activoMedico')
	var adminNewMedico = document.getElementById('adminMedico')
	var rutMedico = document.getElementById('rutMedico')
    

    var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			//"id_hospital":IdHospital.value, 
			"hospital":nombreNewHospital.value, 
            "nombre": nombreNewMedico.value ,
            "apellidos": apellidosNewMedico.value,
            "telefono":telefonoNewMedico.value,
            "especialidad":especialidadNewMedico.value,
            "staff":staffNewMedico.value,
            "becario": becarioNewMedico.value,
            "interno": internoNewMedico.value,
            "activo": activoNewMedico.value,
			"admin": adminNewMedico.value,
			"rut_medico": rutMedico.value
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
// var divPrueba = document.getElementById('contentTable')
// divPrueba.innerHTML = ''

// function allMedicos(URLAPI){
// 	fetch(URLAPI)
// 	.then(response => response.json())
// 	.then(data => {
		
// 		///console.log(data)
// 		for(var i = 0; i < data.length; i++){
			
// 			if ( data[i].becario == true ){
// 				var switch1 = ' <div class="custom-control custom-switch">' +
// 					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
// 					'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  	'</div>'
// 				  //console.log(switch1);
// 			}
// 			else{
// 				switch1 = ' <div class="custom-control custom-switch">' +
// 				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
// 				'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  '</div>'
// 			}

// 			if ( data[i].interno == true ){
// 				var switch2 = ' <div class="custom-control custom-switch">' +
// 					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
// 					'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  	'</div>'
// 				  //console.log(switch1);
// 			}
// 			else{
// 				switch2 = ' <div class="custom-control custom-switch">' +
// 				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
// 				'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  '</div>'
// 			}

// 			if ( data[i].activo == true ){
// 				var switch3 = ' <div class="custom-control custom-switch">' +
// 					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
// 					'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  	'</div>'
// 				  //console.log(switch1);
// 			}
// 			else{
// 				switch3 = ' <div class="custom-control custom-switch">' +
// 				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
// 				'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  '</div>'
// 			}

// 			if ( data[i].admin == true ){
// 				var switch4 = ' <div class="custom-control custom-switch">' +
// 					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
// 					'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  	'</div>'
// 				  //console.log(switch1);
// 			}
// 			else{
// 				switch4 = ' <div class="custom-control custom-switch">' +
// 				'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
// 				'<label class="custom-control-label" for="customSwitch1"></label>' +
// 			  '</div>'
// 			}
			
			

// 			var nombre = `
// 			<tr>
// 				<td scope="row" data-label="Id"> ${data[i].id} </td>
// 				<td data-label="IdHospital"> ${data[i].id_hospital}</td>
// 				<td data-label="Nombre">${data[i].nombre}</td>
// 				<td data-label="Apellidos">${data[i].apellidos}</td>
// 				<td data-label="Telefono">${data[i].telefono}</td>
// 				<td data-label="Staff">${data[i].staff}</td>
// 				<td data-label="Especialidad">${data[i].especialidad}</td>
// 				<td data-label="Rut Medico">${data[i].rut_medico}</td>
// 				<td data-label="Becario"> 
// 					${switch1}
// 				</td>
// 				<td data-label="Interno">${switch2}</td>
// 				<td data-label="Activo">${switch3}</td>
// 				<td data-label="Admin">${switch4}</td>
// 				<td data-label="Acciones">
// 					<button onclick="deleteMedico(${data[i].id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
// 						<i class="icon ion-md-trash "></i>
// 					</button>
// 					<button onclick="editMedico(${data[i].id}, ${data[i].id_hospital},'${data[i].nombre}','${data[i].apellidos}',
// 										'${data[i].telefono}', '${data[i].staff}', '${data[i].especialidad}', '${data[i].rut_medico}', '${data[i].becario}',
// 										 '${data[i].interno}', '${data[i].activo}', '${data[i].admin}' )" 
// 						class="btn btn-info btn-sm" title="Editar Paciente">
// 						<i class="icon ion-md-create "></i>
// 					</button>
// 				</td>
// 			</tr>
// 				`
// 			//divPrueba.innerHTML += nombre
// 			$( "#tableMedicos tbody" ).append(nombre);

// 		}

// 		// $(document).ready(function(){
//         //     $('#tableMedicos').dataTable({
//         //         select: true
//         //     });
//         // });

// 	})
// // 	})
//  	.catch(err => console.log(err))
// }

var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')
// function numberPages(){
//     urlAPIPages = 'http://134.122.120.195/api/v1/list_entries/medicos';
//     pagesHtml =  ''
//     fetch(urlAPIPages)
// 	.then(function(response){ 
// 		return response.json(); 
// 	})
// 	.then(function(data){
//         console.log(data)
//         var botones =  data.numbers_entries/10
//         botones = Math.ceil(botones)
//         //console.log(botones)

//         for(var i = 1; i < botones + 1; i++){
//             pagesHtml += `
//             <td>
//                 <button onclick="perPage(${i*10 - 9})" class="btn btn-danger btn-sm">
//                     ${i}
//                 </button>
//             </td>
//             `
              
//         }
//         divpieTable.innerHTML = pagesHtml  
//         //$( "#tableEncuentros tfoot tr" ).append(pagesHtml);
// 	});
// }


// function perPage(numPage){
//     console.log(numPage)
//     urlMedicosPagina = 'http://134.122.120.195/api/v1/doctores/list/' + numPage;
//     //console.log(urlEncuentrosPagina)
//     var divPrueba = document.getElementById('contentTable')
//     divPrueba.innerHTML = ''
    
//     fetch(urlMedicosPagina)
// 	.then(function(response){ 
// 		return response.json(); 
// 	})
// 	.then(function(data){ 
//         console.log(data)
//         allMedicos(urlMedicosPagina)
//         numberPages()
// 	});
// }
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

///////////////
function editMedico(IdMedico,/*IdHospital*/nombreHospital,nombreMedico,apellidosMedico,
	telefonoMedico,  staffMedico, especialidadMedico, rutMedico,  becarioMedico,
	internoMedico, activoMedico, adminMedico
	){
	// console.log(IdHospital,nombreMedicoEdit,apellidosMedicoEdit,telefonoMedicoEdit, 
	// 	telefonoMedicoEdit, especialidadMedicoEdit, staffMedicoEdit)
	
	var IdMedicoEdit = document.getElementById('IdMedicoEdit')
	//var IdHospitalEdit = document.getElementById('IdHospitalEdit')
	var nombreHospitalEdit = document.getElementById('nombreHospitalEdit')
	var nombreMedicoEdit = document.getElementById('nombreMedicoEdit')
	var apellidosMedicoEdit = document.getElementById('apellidosMedicoEdit')
	var telefonoMedicoEdit = document.getElementById('telefonoMedicoEdit')
	var especialidadMedicoEdit = document.getElementById('especialidadMedicoEdit')
	var rutMedicoEdit = document.getElementById('rutMedicoEdit')
	var staffMedicoEdit = document.getElementById('staffMedicoEdit')
	var becarioMedicoEdit = document.getElementById('becarioMedicoEdit')
	var internoMedicoEdit = document.getElementById('internoMedicoEdit')
	var activoMedicoEdit = document.getElementById('activoMedicoEdit')
	var adminMedicoEdit = document.getElementById('adminMedicoEdit')
	
	IdMedicoEdit.value = IdMedico;
	//IdHospitalEdit.value = IdHospital;
	nombreHospitalEdit.value = nombreHospital;
	nombreMedicoEdit.value = nombreMedico;
	apellidosMedicoEdit.value = apellidosMedico;
	telefonoMedicoEdit.value = telefonoMedico;
	especialidadMedicoEdit.value = especialidadMedico;
	rutMedicoEdit.value = rutMedico
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
	//var IdHospital = document.getElementById('IdHospitalEdit')
	var nombreHospitalEdit = document.getElementById('nombreHospitalEdit')
	var nombreEditMedico = document.getElementById('nombreMedicoEdit')
	var apellidosEditMedico = document.getElementById('apellidosMedicoEdit')
	var telefonoEditMedico = document.getElementById('telefonoMedicoEdit')
	var especialidadEditMedico = document.getElementById('especialidadMedicoEdit')
	var staffEditMedico = document.getElementById('staffMedicoEdit')
	var becarioEditMedico = document.getElementById('becarioMedicoEdit')
	var internoEditMedico = document.getElementById('internoMedicoEdit')
	var activoEditMedico = document.getElementById('activoMedicoEdit')
	var adminEditMedico = document.getElementById('adminMedicoEdit')
	var rutMedicoEdit = document.getElementById('rutMedicoEdit')
	

	var headers = {
		"Content-Type": "application/json"
		}

	const dataToSend = JSON.stringify(
		{
			"id" : idMedico.value,
			//"id_hospital":IdHospital.value, 
			"hospital":nombreHospitalEdit.value, 
			"nombre":nombreEditMedico.value,
			"apellidos":apellidosEditMedico.value,
			"telefono":telefonoEditMedico.value,
			"especialidad":especialidadEditMedico.value,
			"staff":staffEditMedico.value,
			"becario": becarioEditMedico.value,
			"interno": internoEditMedico.value,
			"activo": activoEditMedico.value,
			"admin": adminEditMedico.value,
			"rut_medico" : rutMedicoEdit.value
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


/////////////////////////////////////////////

let page = 1;
var scrolling
const loader = document.querySelector('.loader');
const divPrueba = document.getElementsByClassName('divTable')
const container = document.getElementById('contentTable');


////////////////////////// Busqueda rut medico //////////////////////////////
var formSearchRut= document.getElementById('formBusqueda1Med');
formSearchRut.addEventListener("submit", function(event){
	event.preventDefault()
	var rutMedicoFind = document.getElementById('rutMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchRut'    
    getDataRut(1, rutMedicoFind.value )

  });

////////////////////////// Busqueda especialidad //////////////////////////////
var formSearchEspecialidad= document.getElementById('formBusqueda2Med');
formSearchEspecialidad.addEventListener("submit", function(event){
	event.preventDefault()
	var especialidadMedicoFind = document.getElementById('especialidadMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchEspecialidad'    
    getDataEspecialidad(1, especialidadMedicoFind.value )

  });

////////////////////////// Busqueda Nombre //////////////////////////////
var formSearchNombre= document.getElementById('formBusqueda3Med');
formSearchNombre.addEventListener("submit", function(event){
	event.preventDefault()
	var nombreMedicoFind = document.getElementById('nombreMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchNombre'    
    getDataNombre(1, nombreMedicoFind.value )

  });







document.addEventListener("DOMContentLoaded", () => {
    getData(1);
  });

  
divPrueba[0].addEventListener('scroll', () => {
    if (
        divPrueba[0].scrollTop +
        divPrueba[0].clientHeight >=
		divPrueba[0].scrollHeight) {
        
        page = page + 10;
        console.log(page)
		if(scrolling == 'Normal'){
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getData(page);
            }, 2000);
        }
		if(scrolling == 'SearchRut'){
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataRut(page);
            }, 2000);
        }
		if(scrolling == 'SearchEspecialidad'){
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataEspecialidad(page);
            }, 2000);
        }
		if(scrolling == 'SearchNombre'){
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataNombre(page);
            }, 2000);
        }

    }

});

const httpRequestWrapper = (method, URL) => {
    return new Promise((resolve, reject) => {
      const xhr_obj = new XMLHttpRequest();
      xhr_obj.responseType = "json";
      xhr_obj.open(method, URL);
      xhr_obj.onload = () => {
        const data = xhr_obj.response;
        resolve(data);
        console.log(data)
      };
      xhr_obj.onerror = () => {
        reject("failed");
      };
      xhr_obj.send();
    });
  };




//////////////////////////////////////
const getData = async (page_no = 1) => {
    const data = await httpRequestWrapper(
      "GET",
      `http://134.122.120.195/api/v1/doctores/list/${page_no}`
    );
	scrolling == 'Normal'
    populateUI(data);
  };
  //////////////////////////////////////
const getDataRut = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/doctor_per_type?type=rut_medico&data='+ paramSearch + '&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
  //////////////////////////////////////
  const getDataEspecialidad = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/doctor_per_type?type=especialidad&data='+ paramSearch +'&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
 //////////////////////////////////////
 const getDataNombre = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/doctor_per_type?type=nombre&data='+ paramSearch + '&entry_n='+ `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};













  
  const populateUI = data => {
    data && 
    data.length && 
    data
    .map((each,index)=>{
      const {id, /*id_hospital*/ hospital, nombre, apellidos, telefono, staff, especialidad, rut_medico,
		becario, interno, activo, admin } = each;
	  ///////////////////////////////////////
	  if ( becario == true ){
			var switch1 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}
		else{
			switch1 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}

		if (interno == true ){
			var switch2 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}
		else{
			switch2 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}

		if (activo == true ){
			var switch3 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}
		else{
			switch3 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}

		if ( admin == true ){
			var switch4 = ' <div class="custom-control custom-switch">' +
				'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
				'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}
		else{
			switch4 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
			'</div>'
		}

      container.innerHTML += 
      `
        <tr>
			<td scope="row" data-label="Id"> ${id} </td>
			<td data-label="NombreHospital"> ${hospital}</td>
			<td data-label="Nombre">${nombre}</td>
			<td data-label="Apellidos">${apellidos}</td>
			<td data-label="Telefono">${telefono}</td>
			<td data-label="Staff">${staff}</td>
			<td data-label="Especialidad">${especialidad}</td>
			<td data-label="Rut Medico">${rut_medico}</td>
			<td data-label="Becario"> 
				${switch1}
			</td>
			<td data-label="Interno">${switch2}</td>
			<td data-label="Activo">${switch3}</td>
			<td data-label="Admin">${switch4}</td>
			<td data-label="Acciones">
				<button onclick="deleteMedico(${id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
					<i class="icon ion-md-trash "></i>
				</button>
				<button onclick="editMedico(${id},'${hospital}','${nombre}','${apellidos}',
									'${telefono}', '${staff}', '${especialidad}', '${rut_medico}', '${becario}',
										'${interno}', '${activo}', '${admin}' )" 
					class="btn btn-info btn-sm" title="Editar Paciente">
					<i class="icon ion-md-create "></i>
				</button>
			</td>




        </tr>
      
      `
	 /* `
        <tr>
			<td scope="row" data-label="Id"> ${id} </td>
			<td data-label="IdHospital"> ${id_hospital}</td>
			<td data-label="NombreHospital"> ${hospital}</td>
			<td data-label="Nombre">${nombre}</td>
			<td data-label="Apellidos">${apellidos}</td>
			<td data-label="Telefono">${telefono}</td>
			<td data-label="Staff">${staff}</td>
			<td data-label="Especialidad">${especialidad}</td>
			<td data-label="Rut Medico">${rut_medico}</td>
			<td data-label="Becario"> 
				${switch1}
			</td>
			<td data-label="Interno">${switch2}</td>
			<td data-label="Activo">${switch3}</td>
			<td data-label="Admin">${switch4}</td>
			<td data-label="Acciones">
				<button onclick="deleteMedico(${id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
					<i class="icon ion-md-trash "></i>
				</button>
				<button onclick="editMedico(${id},'${id_hospital}','${hospital}','${nombre}','${apellidos}',
									'${telefono}', '${staff}', '${especialidad}', '${rut_medico}', '${becario}',
										'${interno}', '${activo}', '${admin}' )" 
					class="btn btn-info btn-sm" title="Editar Paciente">
					<i class="icon ion-md-create "></i>
				</button>
			</td>




        </tr>
      
      `*/
    })
  
  }











////////////////////////////////////


function exit(){
	window.localStorage.clear();
	window.location.href = '../index.html'
}

function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}





