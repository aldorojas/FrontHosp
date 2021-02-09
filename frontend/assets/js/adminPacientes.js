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
		loadMedico()
	}


	//numberPages();

	const urlAPI = 'http://134.122.120.195/api/v1/pacientes/list/1';
	//allPacientes(urlAPI)
  
})
///////////////////////////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
	
}


const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {
	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})



function showDivBusqueda(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
  document.getElementById("formBusqueda4").style.display = element.value == 3 ? 'block' : 'none';
}


///////////////////////////////////// Add Paciente


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
		Swal.fire({
			icon: 'success',
			title: 'Paciente registrado',
			showConfirmButton: false,
			timer: 2500
			})
		var divPrueba = document.getElementById('card')
		divPrueba.innerHTML = ''

		

	});
})
//////////////////////////////////// todos los pacientes

// var divPrueba = document.getElementById('contentTable')
// divPrueba.innerHTML = ''

// function allPacientes(urlAPI){
// 	fetch(urlAPI)
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data)
// 		for(var i = 0; i < data.length; i++){
// 			//console.log(data.pacientes[i].nombres)
// 			//console.log(data.pacientes[i].apellidos)
			
// 			var nombre = `
// 			<tr>
// 				<td scope="row" data-label="Id"> ${data[i].id} </td>
// 				<td data-label="Nombre"> ${data[i].nombre}</td>
// 				<td data-label="Apellidos">${data[i].apellido}</td>
// 				<td data-label="Edad">${data[i].edad}</td>
// 				<td data-label="Pasaporte">${data[i].pasaporte}</td>
// 				<td data-label="Rut">${data[i].rut}</td>
// 				<td data-label="Direccion">${data[i].direccion}</td>
// 				<td data-label="Telefono">${data[i].telefono}</td>
// 				<td data-label="Fecha de nacimiento">${data[i].birth_date}</td>
// 				<td data-label="Sexo">${data[i].sexo}</td>
// 				<td data-label="Sexo">${data[i].alergias}</td>
// 				<td data-label="Sexo">${data[i].tipo_sangre}</td>
// 				<td data-label="Acciones">
// 					<button onclick="deletePaciente(${data[i].id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
// 						<i class="icon ion-md-trash "></i>
// 					</button>
// 					<button onclick="editPaciente(${data[i].id}, '${data[i].nombre}', '${data[i].apellido}',
// 													'${data[i].rut}', '${data[i].pasaporte}', '${data[i].direccion}',
// 													'${data[i].telefono}', '${data[i].sexo}', '${data[i].birth_date}')" 
// 					class="btn btn-info btn-sm" title="Editar Paciente">
// 						<i class="icon ion-md-create "></i>
// 					</button>
// 				</td>
// 			</tr>
			
// 				`
// 			//divPrueba.innerHTML += nombre
// 			$( "#tablePacientes tbody" ).append(nombre);
// 		}
// 	// $(document).ready(function(){
// 	// 	$('#tablePacientes').dataTable();
// 	// });

	
// 	})
// .catch(err => console.log(err))
// }




var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

function numberPages(){
    urlAPIPages = 'http://134.122.120.195/api/v1/list_entries/pacientes';
    pagesHtml =  ''
    fetch(urlAPIPages)
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){
        console.log(data)
        var botones =  data.numbers_entries/10
        botones = Math.ceil(botones)
        //console.log(botones)

        for(var i = 1; i < botones + 1; i++){
            pagesHtml += `
            <td>
                <button onclick="perPage(${i*10 - 9})" class="btn btn-danger btn-sm">
                    ${i}
                </button>
            </td>
            `
              
        }
        divpieTable.innerHTML = pagesHtml  
        //$( "#tableEncuentros tfoot tr" ).append(pagesHtml);
	});
}


function perPage(numPage){
    console.log(numPage)
    urlPacientesPagina = 'http://134.122.120.195/api/v1/pacientes/list/' + numPage;
    //console.log(urlEncuentrosPagina)
    var divPrueba = document.getElementById('contentTable')
    divPrueba.innerHTML = ''
    
    fetch(urlPacientesPagina)
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
        console.log(data)
        allPacientes(urlPacientesPagina)
        numberPages()
	});
}



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

///////////////////////////////////////////////////////////////


function editPaciente(IdPaciente,nombrePaciente,apellidoPaciente,
	rutPaciente, pasaportePaciente, direccionPaciente, telefonoPaciente, sexoPaciente,
	birthdatePaciente
	){
	// console.log(IdHospital,nombreMedicoEdit,apellidosMedicoEdit,telefonoMedicoEdit, 
	// 	telefonoMedicoEdit, especialidadMedicoEdit, staffMedicoEdit)
	
	var IdPacienteEdit = document.getElementById('idEdit')
	var nombrePacienteEdit = document.getElementById('nombresEdit')
	var apellidosPAcienteEdit = document.getElementById('apellidosEdit')
	var rutPacienteEdit = document.getElementById('rutEdit')
	var pasaportePacienteEdit = document.getElementById('pasaporteEdit')
	var direccionPacienteEdit = document.getElementById('direccionEdit')
	var telefonoPacienteEdit = document.getElementById('telefonoEdit')
	var sexoPacienteEdit = document.getElementById('sexoEdit')
	var fechaNacimientoPacienteEdit = document.getElementById('fechaNacimientoEdit')

	IdPacienteEdit.value = IdPaciente;
	nombrePacienteEdit.value = nombrePaciente;
	apellidosPAcienteEdit.value = apellidoPaciente;
	rutPacienteEdit.value = rutPaciente;
	pasaportePacienteEdit.value = pasaportePaciente;
	direccionPacienteEdit.value = direccionPaciente;
	telefonoPacienteEdit.value = telefonoPaciente;
	sexoPacienteEdit.value = sexoPaciente;
	fechaNacimientoPacienteEdit.value = birthdatePaciente;

	
	$('#editPaciente').modal('show');

}


/////////////////// Modal editar pacientes //////////////////////

var formEditPaciente = document.getElementById('formEditPaciente');

formEditPaciente.addEventListener('submit', function(e){

	const URLEditPaciente = 'http://134.122.120.195/api/v1/paciente/update';

	e.preventDefault()
	var IdPacienteEdit = document.getElementById('idEdit')
	var nombrePacienteEdit = document.getElementById('nombresEdit')
	var apellidosPacienteEdit = document.getElementById('apellidosEdit')
	var rutPacienteEdit = document.getElementById('rutEdit')
	var pasaportePacienteEdit = document.getElementById('pasaporteEdit')
	var direccionPacienteEdit = document.getElementById('direccionEdit')
	var telefonoPacienteEdit = document.getElementById('telefonoEdit')
	var sexoPacienteEdit = document.getElementById('sexoEdit')
	var fechaNacimientoPacienteEdit = document.getElementById('fechaNacimientoEdit')

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"id" : IdPacienteEdit.value,
			"rut": rutPacienteEdit.value, 
			"pasaporte": pasaportePacienteEdit.value,
			"direccion": direccionPacienteEdit.value,
			"telefono": telefonoPacienteEdit.value,
			"sexo": sexoPacienteEdit.value, 
			"birth_date":fechaNacimientoPacienteEdit.value,
			"nombre": nombrePacienteEdit.value, 
			"apellido": apellidosPacienteEdit.value
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
	})
	.catch(err => console.log(err));
})




/////////////////////////////////////////////////



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












let page = 1;
const loader = document.querySelector('.loader');

const divPrueba = document.getElementsByClassName('divTable')

document.addEventListener("DOMContentLoaded", () => {
    getData(1);
  });

  
divPrueba[0].addEventListener('scroll', () => {
    if (
        divPrueba[0].scrollTop +
        divPrueba[0].clientHeight >=
		divPrueba[0].scrollHeight) {
        
            //elem.scrollTop = elem.scrollHeight;
        page = page + 10;
        console.log(page)

        loader.classList.remove('hidden');
		setTimeout(() => {
			loader.classList.add('hidden');
			getData(page);
		}, 2000);
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
      `http://134.122.120.195/api/v1/pacientes/list/${page_no}`
    );
  
    //const {results} = data;
    populateUI(data);
  };

  
  const populateUI = data => {
    const container = document.getElementById('contentTable');
    data && 
    data.length && 
    data
    .map((each,index)=>{
      const {id, nombre, apellido,edad, pasaporte, rut, direccion,telefono,
		birth_date,sexo, alergias, tipo_sangre  } = each;
      

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
		<td data-label="Sexo">${alergias}</td>
		<td data-label="Sexo">${tipo_sangre}</td>
		<td data-label="Acciones">
			<button onclick="deletePaciente(${id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
				<i class="icon ion-md-trash "></i>
			</button>
			<button onclick="editPaciente(${id}, '${nombre}', '${apellido}',
											'${rut}', '${pasaporte}', '${direccion}',
											'${telefono}', '${sexo}', '${birth_date}')" 
			class="btn btn-info btn-sm" title="Editar Paciente">
				<i class="icon ion-md-create "></i>
			</button>
		</td>



        </tr>
      
      `
    })
  
  }


