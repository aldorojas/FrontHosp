////////////////// Al cargar la pagina /////////////////
/// Validacion login
window.onload = (function(){
	console.log(localStorage.getItem("Admin")); 
	localStorage.setItem("encuentrosPaciente", "False");
	if(localStorage.getItem("Admin")== "true"){
	  	document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
	}

	if (localStorage.getItem("nombreMedico") === null) {
		window.location.href = '../index.html'
	}
	else{
		loadMedico()
	}

	const urlAPI = 'http://134.122.120.195/api/v1/pacientes/list/1';

  
})


///////////////// Mostrar Nombre del modico logueado	///////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
	
}


///////////////////////////////  Animacion del toggle /////////////////////////////////

const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {
	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})

//////////////////////// mostrar formulario de busqueda Hospitales /////////////////////////

function showDivBusqueda(element)
{ 
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
  document.getElementById("formBusqueda4").style.display = element.value == 3 ? 'block' : 'none';
}


///////////////////// form nuevo Paciente ///////////////////////////


var formNewPaciente = document.getElementById('formNewPaciente');

formNewPaciente.addEventListener('submit', function(e){

	const URLNewPaciente = 'http://134.122.120.195/api/v1/paciente/';

	e.preventDefault()
	var nombreNewPaciente = document.getElementById('nombres')
	var apellidosNewPaciente = document.getElementById('apellidos')
	var rutNewPaciente = document.getElementById('rut')
	var pasaporteNewPaciente = document.getElementById('pasaporte')
	var direccionNewPaciente = document.getElementById('direccion')
	var telefonoNewPaciente = document.getElementById('telefono')
	var sexoNewPaciente = document.getElementById('sexo')
	var fechaNacimientoNewPaciente = document.getElementById('fechaNacimiento')
	var alergiasNewPaciente = document.getElementById('alergiasPaciente')
	var tipoSangreNewPaciente = document.getElementById('tipoSangrePaciente')

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"method" : "add",
			"rut": rutNewPaciente.value, 
			"pasaporte": pasaporteNewPaciente.value,
			"direccion": direccionNewPaciente.value,
			"telefono": telefonoNewPaciente.value,
			"sexo": sexoNewPaciente.value, 
			"birth_date":fechaNacimientoNewPaciente.value,
			"nombre": nombreNewPaciente.value, 
			"apellido": apellidosNewPaciente.value,
			"alergias": alergiasNewPaciente.value,
    		"tipo_sangre": tipoSangreNewPaciente.value
		});
	console.log(dataToSend)
	
	fetch(URLNewPaciente, {
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
			title: 'Paciente Registrado',
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
		location.reload();		
	});

})

//////////////////// Mostrar todos los pacientes ///////////////////////////////////

var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')


////////////////////////// funcion para borrar pacientes ///////////////////

function deletePaciente(idPaciente){
	const URLDeletePaciente = 'http://134.122.120.195/api/v1/paciente/' + idPaciente ;

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
		fetch(URLDeletePaciente, {
			method: "DELETE",
			headers: headers
		})
		.then(function(response){ 
			return response.json(); 
		})
		.then(function(data){ 
			console.log("Eliminado")
			location.reload();
		})
		.catch(err => console.log(err))
		
		Swal.fire(
		'Borrado!',
		'El paciente fue eliminado.',
		'success'
		)		
	}	
	})
}


////////////////////////// Mostrar modal precargado para editar pacientes  /////////////////////////////
function editPaciente(IdPaciente, rutPaciente, pasaportePaciente, direccionPaciente, telefonoPaciente, 
	sexoPaciente, birthdatePaciente, nombrePaciente,apellidoPaciente, alergias, tipodesangre
	){
	
	var IdPacienteEdit = document.getElementById('idEdit')
	var rutPacienteEdit = document.getElementById('rutEdit')
	var pasaportePacienteEdit = document.getElementById('pasaporteEdit')
	var direccionPacienteEdit = document.getElementById('direccionEdit')
	var telefonoPacienteEdit = document.getElementById('telefonoEdit')
	var sexoPacienteEdit = document.getElementById('sexoEdit')
	var fechaNacimientoPacienteEdit = document.getElementById('fechaNacimientoEdit')
	var nombrePacienteEdit = document.getElementById('nombresEdit')
	var apellidosPAcienteEdit = document.getElementById('apellidosEdit')	
	var alergiasNewPacienteEdit = document.getElementById('alergiasPacienteEdit')
	var tipoSangreNewPacienteEdit = document.getElementById('tipoSangrePacienteEdit')


	IdPacienteEdit.value = IdPaciente;
	nombrePacienteEdit.value = nombrePaciente;
	rutPacienteEdit.value = rutPaciente;
	pasaportePacienteEdit.value = pasaportePaciente;
	direccionPacienteEdit.value = direccionPaciente;
	telefonoPacienteEdit.value = telefonoPaciente;
	sexoPacienteEdit.value = sexoPaciente;
	fechaNacimientoPacienteEdit.value = new Date(birthdatePaciente).toLocaleDateString('fr-CA')
	apellidosPAcienteEdit.value = apellidoPaciente;	
	alergiasNewPacienteEdit.value = alergias;
	tipoSangreNewPacienteEdit.value = new String(tipodesangre);
	console.log(tipodesangre);
	
	
	$('#editPaciente').modal('show');

}

/////////////////// Form para editar pacientes //////////////////////
var formEditPaciente = document.getElementById('formEditPaciente');
formEditPaciente.addEventListener('submit', function(e){

	const URLEditPaciente = 'http://134.122.120.195/api/v1/paciente/update';

	e.preventDefault()
	var IdPacienteEdit = document.getElementById('idEdit')
	var rutPacienteEdit = document.getElementById('rutEdit')
	var pasaportePacienteEdit = document.getElementById('pasaporteEdit')
	var direccionPacienteEdit = document.getElementById('direccionEdit')
	var telefonoPacienteEdit = document.getElementById('telefonoEdit')
	var sexoPacienteEdit = document.getElementById('sexoEdit')
	var fechaNacimientoPacienteEdit = document.getElementById('fechaNacimientoEdit')
	var nombrePacienteEdit = document.getElementById('nombresEdit')
	var apellidosPacienteEdit = document.getElementById('apellidosEdit')	
	var alergiasNewPacienteEdit = document.getElementById('alergiasPacienteEdit')
	var tipoSangreNewPacienteEdit = document.getElementById('tipoSangrePacienteEdit')

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"id": IdPacienteEdit.value, 
			"rut": rutPacienteEdit.value,
			"pasaporte": pasaportePacienteEdit.value,
			"direccion": direccionPacienteEdit.value,
			"telefono": telefonoPacienteEdit.value,
			"sexo": sexoPacienteEdit.value,
			"birth_date": fechaNacimientoPacienteEdit.value,
			"nombre": nombrePacienteEdit.value,
			"apellido": apellidosPacienteEdit.value,
			"alergias": alergiasNewPacienteEdit.value,
			"tipo_sangre": tipoSangreNewPacienteEdit.value
		});
	console.log(dataToSend)
	
	fetch(URLEditPaciente, {
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
			title: 'Paciente editado',
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

////////////////////////// Busqueda Nombre //////////////////////////////
var formSearchNombre= document.getElementById('formBusqueda3');
formSearchNombre.addEventListener("submit", function(event){
	event.preventDefault()
	var nombrePacienteFind = document.getElementById('nombrePacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchNombre'    
    getDataNombre(1, nombrePacienteFind.value )

  });

//////////////////////////////Busqueda por Rut  ////////////////////////////7
var formSearchRut= document.getElementById('formBusqueda1');
formSearchRut.addEventListener("submit", function(event){
	event.preventDefault()
	var rutPacienteFind = document.getElementById('rutPacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchRut'    
	getDataRut(1, rutPacienteFind.value )

});

///////////////////////////////////////////// Buscar por pasaporte ///////////////////////
var formSearchPasaporte= document.getElementById('formBusqueda2');
formSearchPasaporte.addEventListener("submit", function(event){
	event.preventDefault()
	var pasaportePacienteFind = document.getElementById('pasaportePacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchPasaporte'    
    getDataPasaporte(1, pasaportePacienteFind.value )

	
  });

////////////////////////////////	Busqueda por fecha de nacimiento ///////////////////////////////////////
var formSearchBirthDay= document.getElementById('formBusqueda4');
formSearchBirthDay.addEventListener("submit", function(event){
	event.preventDefault()
	var birthdayPacienteFind = document.getElementById('birthDayPacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchBirthday'    
    getDataBirthday(1, birthdayPacienteFind.value )

	
  });

/////////// al cargar el archivo, mostrar todos los pacientes
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
		
			if(scrolling == 'Normal'){
				console.log('buscando todos los pacientes')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getData(page);
				}, 2000);
			}
			if(scrolling == 'SearchNombre'){
				console.log('Buscando por nombre')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataNombre(page);
				}, 2000);
			}
			if(scrolling == 'SearchRut'){
				console.log('Buscando por rut')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataRut(page);
				}, 2000);
			}
			if(scrolling == 'SearchPasaporte'){
				console.log('Buscando por pasaporte')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataPasaporte(page);
				}, 2000);
			}
			if(scrolling == 'SearchBirthday'){
				console.log('Buscando por fecha de nacimiento')
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getDataBirthday(page);
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

//////////////////////////////////////peticion de todos los pacientes registrados 
const getData = async (page_no = 1) => {
    const data = await httpRequestWrapper(
      "GET",
      `http://134.122.120.195/api/v1/pacientes/list/${page_no}`
    );
	
	scrolling = 'Normal'
    populateUI(data);
  };
  


//////////////////////////////////////peticiones de pacientes por nombre
const getDataNombre = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=nombre&data='+ paramSearch + '&entry_n=' + `${page_no}`
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
/////////////////////////////////////////peticiones de pacientes por rut
const getDataRut = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=rut&data=' + paramSearch +'&entry_n=' + `${page_no}`
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
////////////////////////////////////peticiones de pacientes por pasaporte
const getDataPasaporte = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=pasaporte&data='+ paramSearch + '&entry_n=' + `${page_no}`
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
///////////////////////////////peticiones de pacientes por birth_date 
const getDataBirthday = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=birth_date&data='+ paramSearch + '&entry_n=' + `${page_no}`
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

  ////////////////////////////////////////////////función para llenado de tabla paciente Correspondiente a la vista adminPacientes.html
  const populateUI = data => {
    data && 
    data.length && 
    data
    .map((each,index)=>{
      const {id, nombre, apellido,edad, pasaporte, rut, direccion, telefono,
		birth_date, sexo, alergias, tipo_sangre  } = each;
      

      container.innerHTML += 
      `
        <tr>
		<td scope="row" data-label="Id"> ${id} </td>
		<td data-label="Nombre"> ${nombre}</td>
		<td data-label="Apellidos">${apellido}</td>
		<td data-label="Edad">${edad}</td>
		<td data-label="Pasaporte">${pasaporte}</td>
		<td data-label="Rut">${rut}</td>
		<td data-label="Direccion">${direccion}</td>
		<td data-label="Telefono">${telefono}</td>
		<td data-label="Fecha de nacimiento">${birth_date}</td>
		<td data-label="Sexo">${sexo}</td>
		<td data-label="Alergias">${alergias}</td>
		<td data-label="Tipo sangre">${tipo_sangre}</td>
		<td data-label="Acciones">
			<button onclick="deletePaciente(${id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
				<i class="icon ion-md-trash "></i>
			</button>
			<button onclick="editPaciente('${id}','${rut}', '${pasaporte}', '${direccion}',
			'${telefono}', '${sexo}', '${birth_date}', '${nombre}', '${apellido}','${alergias}','${tipo_sangre}')" 
			class="btn btn-info btn-sm" title="Editar Paciente">
				<i class="icon ion-md-create "></i>
			</button>
		</td>



        </tr>
      
      `
    })
  
  }

//////////////////cierre de sesion/////////////////
function exit(){
	window.localStorage.clear();
	window.location.href = '../index.html'
}

/////////////////Validar caracteres especiales /////////////////////////

$(function(){
	$('#nombres').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#apellidos').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ'); 
	$('#telefono').validCampoFranz('1234567890');
	$('#nombresEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#apellidosEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ'); 
	$('#telefonoEdit').validCampoFranz('1234567890');
});
