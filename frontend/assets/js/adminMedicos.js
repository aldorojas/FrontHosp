
/////////////////////concatenar ID y nombre de hospital en un combo
var dropdown = document.getElementById('IdHospital');
var dropdown_edit = document.getElementById('IdHospitalEdit');
dropdown.length = 0;

let defaultOption = document.createElement('option');

dropdown.selectedIndex = 0;

const url = 'http://134.122.120.195/api/v1/hospitales/list_listbox';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function () {
	if (request.status === 200) {
		const data = JSON.parse(request.responseText);
		var option;
		for (var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			option.text = data[i].id + "-" + data[i].hospital;
			option.value = data[i].id + "-" + data[i].hospital;
			dropdown_edit.add(option);
			var option = document.createElement('option');
			option.text = data[i].id + "-" + data[i].hospital;
			option.value = data[i].id + "-" + data[i].hospital;
			dropdown.add(option);
		}
	} else {
		
	}
}
request.onerror = function () {
	console.error('An error occurred fetching the JSON from ' + url);
};

request.send();

////////////////// Al cargar la pagina /////////////////
/// Validacion de modulo Admin y login

window.onload = (function () {
	console.log(localStorage.getItem("Admin"));
	localStorage.setItem("encuentrosPaciente", "False");
	if (localStorage.getItem("Admin") == "true") {
		document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
	}

	if (localStorage.getItem("nombreMedico") === null) {
		window.location.href = '../index.html'
	}
	else {
		loadMedico();
	}

})


///////////////// Mostrar Nombre del modico logueado	///////////////////////////////

function loadMedico() {
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
}

////////////////////esconde o muestra un formulario de búsqueda.////////////////
function showDivBusquedaMedicos(element) {
	document.getElementById("formBusqueda1Med").style.display = element.value == 0 ? 'block' : 'none';
	document.getElementById("formBusqueda2Med").style.display = element.value == 1 ? 'block' : 'none';
	document.getElementById("formBusqueda3Med").style.display = element.value == 2 ? 'block' : 'none';
}

/////////////////////////////validacion del select staff //////////////////
function validateStaff(element) {
	if (element.value == 'True') {
		document.getElementById('becarioMedico').value = 'False'
		document.getElementById('becarioMedico').disabled = true
		document.getElementById('internoMedico').value = 'False'
		document.getElementById('internoMedico').disabled = true
	}
	else {
		document.getElementById('becarioMedico').disabled = false
		document.getElementById('internoMedico').disabled = false
	}
}
function validateBecario(element) {
	if (element.value == 'True') {
		document.getElementById('staffMedico').value = 'False'
		document.getElementById('staffMedico').disabled = true
		document.getElementById('internoMedico').value = 'False'
		document.getElementById('internoMedico').disabled = true
	}
	else {
		document.getElementById('staffMedico').disabled = false
		document.getElementById('internoMedico').disabled = false
	}
}
function validateInterno(element) {
	if (element.value == 'True') {
		document.getElementById('staffMedico').value = 'False'
		document.getElementById('staffMedico').disabled = true
		document.getElementById('becarioMedico').value = 'False'
		document.getElementById('becarioMedico').disabled = true
	}
	else {
		document.getElementById('staffMedico').disabled = false
		document.getElementById('becarioMedico').disabled = false
	}
}

/////////////////////////////validacion del select staffEdit //////////////////
function validateStaffEdit(element) {
	if (element.value == 'True') {
		document.getElementById('becarioMedicoEdit').value = 'False'
		document.getElementById('becarioMedicoEdit').disabled = true
		document.getElementById('internoMedicoEdit').value = 'False'
		document.getElementById('internoMedicoEdit').disabled = true
	}
	else {
		document.getElementById('becarioMedicoEdit').disabled = false
		document.getElementById('internoMedicoEdit').disabled = false
	}
}
function validateBecarioEdit(element) {
	if (element.value == 'True') {
		document.getElementById('staffMedicoEdit').value = 'False'
		document.getElementById('staffMedicoEdit').disabled = true
		document.getElementById('internoMedicoEdit').value = 'False'
		document.getElementById('internoMedicoEdit').disabled = true
	}
	else {
		document.getElementById('staffMedicoEdit').disabled = false
		document.getElementById('internoMedicoEdit').disabled = false
	}
}
function validateInternoEdit(element) {
	if (element.value == 'True') {
		document.getElementById('staffMedicoEdit').value = 'False'
		document.getElementById('staffMedicoEdit').disabled = true
		document.getElementById('becarioMedicoEdit').value = 'False'
		document.getElementById('becarioMedicoEdit').disabled = true
	}
	else {
		document.getElementById('staffMedicoEdit').disabled = false
		document.getElementById('becarioMedicoEdit').disabled = false
	}
}

//////////////////  Animacion del toggle

const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {

	e.addEventListener('click', function (e) {
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})

///////////////////// form nuevo Medico ///////////////////////////

var formNewMedico = document.getElementById('formNewMedico');

formNewMedico.addEventListener('submit', function (e) {

	const URLNewMedico = 'http://134.122.120.195/api/v1/doctor/';

	e.preventDefault()
	var IdHospital_raw = document.getElementById('IdHospital').value
	var nombreNewMedico = document.getElementById('nombreHospital')
	var apellidosNewMedico = document.getElementById('apellidosMedico')
	var telefonoNewMedico = document.getElementById('telefonoMedico')
	var especialidadNewMedico = document.getElementById('especialidadMedico')
	var staffNewMedico = document.getElementById('staffMedico')
	var becarioNewMedico = document.getElementById('becarioMedico')
	var internoNewMedico = document.getElementById('internoMedico')
	var activoNewMedico = document.getElementById('activoMedico')
	var adminNewMedico = document.getElementById('adminMedico')
	var rutMedico = document.getElementById('rutMedico')
	
	var headers = {
		"Content-Type": "application/json"
	}
	
	var IdHospital = IdHospital_raw.split("-")[0];
	const dataToSend = JSON.stringify(
		{
			"id_hospital": IdHospital,
			"nombre": nombreNewMedico.value,
			"apellidos": apellidosNewMedico.value,
			"telefono": telefonoNewMedico.value,
			"especialidad": especialidadNewMedico.value,
			"staff": staffNewMedico.value,
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
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data)
			if (data.status == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Medico Registrado',
					showConfirmButton: false,
					timer: 2500
				})
			}
			else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocurrio un error inesperado'
				})
			}
			location.reload();
		});
})


//////////////////// Mostrar todos los medico ///////////////////////////////////
var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

////////////////////////// funcion para borrar medicos ///////////////////

function deleteMedico(idMedico) {
	
	const URLDeleteMedico = 'http://134.122.120.195/api/v1/doctor/' + idMedico;

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
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log("Eliminado")
					location.reload();
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

////////////////////////// Mostrar modal precargado para editar medicos  /////////////////////////////
function editMedico(IdMedico, IdHospital, nombreMedico, apellidosMedico,
	telefonoMedico, staffMedico, especialidadMedico, rutMedico, becarioMedico,
	internoMedico, activoMedico, adminMedico, nombre_hospital
) {
	var IdMedicoEdit = document.getElementById('IdMedicoEdit')
	var IdHospitalEdit = document.getElementById('IdHospitalEdit')
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
	console.log(IdHospital + '-' + nombre_hospital);
	IdHospitalEdit.value = IdHospital + '-' + nombre_hospital;
	nombreMedicoEdit.value = nombreMedico;
	apellidosMedicoEdit.value = apellidosMedico;
	telefonoMedicoEdit.value = telefonoMedico;
	especialidadMedicoEdit.value = especialidadMedico;
	rutMedicoEdit.value = rutMedico
	//staff
	if (staffMedico.toLowerCase() == "true") {
		staffMedicoEdit.options.selectedIndex = 1;
		becarioMedicoEdit.disabled = true
		internoMedicoEdit.disabled = true
	} else {
		staffMedicoEdit.options.selectedIndex = 2;
	}
	//becario
	if (becarioMedico.toLowerCase() == "true") {
		becarioMedicoEdit.options.selectedIndex = 1;
		staffMedicoEdit.disabled = true
		internoMedicoEdit.disabled = true
	} else {
		becarioMedicoEdit.options.selectedIndex = 2;
	}
	//interno
	if (internoMedico.toLowerCase() == "true") {
		internoMedicoEdit.options.selectedIndex = 1;
		staffMedicoEdit.disabled = true
		becarioMedicoEdit.disabled = true
	} else {
		internoMedicoEdit.options.selectedIndex = 2;
	}
	//activo
	if (activoMedico.toLowerCase() == "true") {
		activoMedicoEdit.options.selectedIndex = 0;
	} else {
		activoMedicoEdit.options.selectedIndex = 1;
	}
	if (adminMedico.toLowerCase() == "true") {
		adminMedicoEdit.options.selectedIndex = 0;
	} else {
		adminMedicoEdit.options.selectedIndex = 1;
	}

	$('#editMedico').modal('show');

}


/////////////////   Form editar medicos  /////////////////////////

var formEditMedico = document.getElementById('formEditMedico');

formEditMedico.addEventListener('submit', function (e) {

	const URLEditMedico = 'http://134.122.120.195/api/v1/doctor/update';

	e.preventDefault()
	var idMedico = document.getElementById('IdMedicoEdit')
	var IdHospitalEdit_raw = document.getElementById('IdHospitalEdit').value
	var IdHospitalEdit = IdHospitalEdit_raw.split("-")[0];
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
			"id": idMedico.value,
			"id_hospital": IdHospitalEdit,
			"nombre": nombreEditMedico.value,
			"apellidos": apellidosEditMedico.value,
			"telefono": telefonoEditMedico.value,
			"especialidad": especialidadEditMedico.value,
			"staff": staffEditMedico.value,
			"becario": becarioEditMedico.value,
			"interno": internoEditMedico.value,
			"activo": activoEditMedico.value,
			"admin": adminEditMedico.value,
			"rut_medico": rutMedicoEdit.value
		});

	console.log(dataToSend)
	fetch(URLEditMedico, {
		method: "POST",
		headers: headers,
		body: dataToSend
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data)
			if (data.status == 'Success') {
				Swal.fire({
					icon: 'success',
					title: 'Medico actualizado',
					showConfirmButton: false,
					timer: 2500
				})
			}
			else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocurrio un error inesperado'
				})
			}
			location.reload();
		})
		.catch(err => console.log(err));

})


/////////////////// Declaraciones de variables //////////////////

let page = 1;
var scrolling
const loader = document.querySelector('.loader');
const divPrueba = document.getElementsByClassName('divTable')
const container = document.getElementById('contentTable');


////////////////////////// Busqueda rut medico //////////////////////////////
var formSearchRut = document.getElementById('formBusqueda1Med');
formSearchRut.addEventListener("submit", function (event) {
	event.preventDefault()
	var rutMedicoFind = document.getElementById('rutMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchRut'
	getDataRut(1, rutMedicoFind.value)

});

////////////////////////// Busqueda especialidad //////////////////////////////
var formSearchEspecialidad = document.getElementById('formBusqueda2Med');
formSearchEspecialidad.addEventListener("submit", function (event) {
	event.preventDefault()
	var especialidadMedicoFind = document.getElementById('especialidadMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchEspecialidad'
	getDataEspecialidad(1, especialidadMedicoFind.value)

});

////////////////////////// Busqueda Nombre //////////////////////////////
var formSearchNombre = document.getElementById('formBusqueda3Med');
formSearchNombre.addEventListener("submit", function (event) {
	event.preventDefault()
	var nombreMedicoFind = document.getElementById('nombreMedicoFind');
	container.innerHTML = ''

	scrolling = 'SearchNombre'
	getDataNombre(1, nombreMedicoFind.value)

});


/////////// al cargar el archivo, mostrar todos los medicos

document.addEventListener("DOMContentLoaded", () => {
	getData(1);
});


///////////////  busueda con scroll  ///////////////////////

var lastScrollTop = 0;

divPrueba[0].addEventListener('scroll', () => {
	var st = divPrueba[0].pageYOffset || divPrueba[0].scrollTop; 
    if (st > lastScrollTop){
        if ( divPrueba[0].scrollTop + divPrueba[0].clientHeight >= divPrueba[0].scrollHeight) {

			page = page + 10;
			console.log(page)
			if (scrolling == 'Normal') {
				console.log('buscando todos')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getData(page);
				}, 2000);
			}
			if (scrolling == 'SearchRut') {
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataRut(page);
				}, 2000);
			}
			if (scrolling == 'SearchEspecialidad') {
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataEspecialidad(page);
				}, 2000);
			}
			if (scrolling == 'SearchNombre') {
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataNombre(page);
				}, 2000);
			}
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




/////////////////////////////peticion de todos los medicos registrados
const getData = async (page_no = 1) => {
	const data = await httpRequestWrapper(
		"GET",
		`http://134.122.120.195/api/v1/doctores/list/${page_no}`
	);
	scrolling = 'Normal'
	if (data == '') {
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
	else {
		populateUI(data);
	}

};
//////////////////////////////////////peticiones de medicos por rut
const getDataRut = async (page_no = 1, paramSearch) => {
	const data = await httpRequestWrapper(
		"GET",
		'http://134.122.120.195/api/v1/doctor_per_type?type=rut_medico&data=' + paramSearch + '&entry_n=' + `${page_no}`
	);

	if (data[0] == 0) {
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
	else {
		populateUI(data[1]);
	}
};
//////////////////////////////////////peticiones de medicos por especialidad
const getDataEspecialidad = async (page_no = 1, paramSearch) => {
	const data = await httpRequestWrapper(
		"GET",
		'http://134.122.120.195/api/v1/doctor_per_type?type=especialidad&data=' + paramSearch + '&entry_n=' + `${page_no}`
	);

	if (data[0] == 0) {
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
	else {
		populateUI(data[1]);
	}
};
//////////////////////////////////////peticiones de medicos por nombre
const getDataNombre = async (page_no = 1, paramSearch) => {
	const data = await httpRequestWrapper(
		"GET",
		'http://134.122.120.195/api/v1/doctor_per_type?type=nombre&data=' + paramSearch + '&entry_n=' + `${page_no}`
	);

	if (data[0] == 0) {
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
	else {
		populateUI(data[1]);
	}
};

///////////////////////////función para llenado de tabla hospital Correspondiente a la vista adminMedico.html
const populateUI = data => {
	data &&
		data.length &&
		data
			.map((each, index) => {
				const { id, id_hospital, hospital, nombre, apellidos, telefono, staff, especialidad, rut_medico,
					becario, interno, activo, admin } = each;
				///////////////////////////////////////
				if (becario == true) {
					var switch1 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}
				else {
					switch1 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}

				if (interno == true) {
					var switch2 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}
				else {
					switch2 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}

				if (activo == true) {
					var switch3 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}
				else {
					switch3 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}

				if (admin == true) {
					var switch4 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}
				else {
					switch4 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}

				if (staff == true) {
					var switch5 = ' <div class="custom-control custom-switch">' +
						'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>'
				}
				else {
					switch5 = ' <div class="custom-control custom-switch">' +
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
							<td data-label="Staff">${switch5}</td>
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
								<button onclick="editMedico(${id},'${id_hospital}','${nombre}','${apellidos}',
													'${telefono}', '${staff}', '${especialidad}', '${rut_medico}', '${becario}',
														'${interno}', '${activo}', '${admin}' , '${hospital}')" 
									class="btn btn-info btn-sm" title="Editar Paciente">
									<i class="icon ion-md-create "></i>
								</button>
							</td>




						</tr>
					
					`
			})

}




//////////////////cierre de sesion/////////////////
function exit() {
	window.localStorage.clear();
	window.location.href = '../index.html'
}

/////////////////Validar caracteres especiales /////////////////////////
$(function () {
	$('#IdHospital').validCampoFranz('1234567890');
	$('#nombreHospital').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#apellidosMedico').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#telefonoMedico').validCampoFranz('1234567890');
	$('#especialidadMedico').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#IdHospitalEdit').validCampoFranz('1234567890');
	$('#nombreMedicoEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#apellidosMedicoEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#telefonoMedicoEdit').validCampoFranz('1234567890');
	$('#especialidadMedicoEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
});



