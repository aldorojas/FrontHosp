
////////////////// Al cargar la pagina /////////////////
/// Validacion de modulo Admin y login

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
		loadMedico();
	}

}) 

///////////////// Mostrar Nombre del modico logueado	///////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
}

//////////////////////// mostrar form de busqueda Hospitales /////////////////////////
function showDivBusquedaHospitales (element)
{ 
  document.getElementById("formBusqueda1Hosp").style.display = element.value == 1 ? 'block' : 'none';
}

//////////////////  Animacion del toggle
const opcion = document.querySelectorAll('.opcion');
opcion.forEach(e => {

	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})


////////////////////////////// Form de nuevo hospital /////////////////////////////

var formNewHospital = document.getElementById('formNewHospital');
formNewHospital.addEventListener('submit', function(e){

	const URLNewHospital = 'http://134.122.120.195/api/v1/hospital/';
    e.preventDefault()
    var nombreHospital = document.getElementById('nombreHospital')
	var direccionHospital = document.getElementById('direccionHospital')
	var telefonoHospital = document.getElementById('telefonoHospital')
	var adminHospital = document.getElementById('adminHospital')  

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{			
			"hospital":nombreHospital.value,
			"direccion":direccionHospital.value,
			"telefono":telefonoHospital.value,
			"activo": adminHospital.value
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
        if(data.status == 'success'){
            Swal.fire({
			icon: 'success',
			title: 'Hospital Registrado',
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


var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

////////////////////////// funcion para borrar hositales ///////////////////
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
				location.reload();		
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


////////Mostrar modal precargado para editar hospital  /////////////////////////////
function editHospital(IdHospital,nombreHospital,direccionHospital,
	telefonoHospital, activoHospital
	){
	
	var idHospitalEdit = document.getElementById('idHospitalEdit')	
	var nombreHospitalEdit = document.getElementById('nombreHospitalEdit')
	var direccionHospitalEdit = document.getElementById('direccionHospitalEdit')
	var telefonoHospitalEdit = document.getElementById('telefonoHospitalEdit')
	let activoHospitalEdit = document.getElementById('activoHospitalEdit')

	idHospitalEdit.value = IdHospital;
	nombreHospitalEdit.value = nombreHospital;
	direccionHospitalEdit.value = direccionHospital;
	telefonoHospitalEdit.value = telefonoHospital;
	if (activoHospital.toLowerCase() == "true"){
		document.getElementById('activoHospitalEdit').options.selectedIndex = 0;
	} else{
		document.getElementById('activoHospitalEdit').options.selectedIndex = 1;
	}
	$('#editarHospital').modal('show');

}

/////////////   Form para editar Hospitales //////////////////////////////
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
		location.reload();		
	});
})





let page = 1;
var scrolling
const loader = document.querySelector('.loader');
const divPrueba = document.getElementsByClassName('divTable');
const container = document.getElementById('contentTable');

////////////////////////// Busqueda Nombre //////////////////////////////
var formSearchNombre= document.getElementById('formBusqueda1Hosp');
formSearchNombre.addEventListener("submit", function(event){
	event.preventDefault()
	var nombreHospitalFind = document.getElementById('nombreHospitalFind');
	container.innerHTML = ''

	scrolling = 'SearchNombre'    
    getDataNombre(1, nombreHospitalFind.value )

  });


/////////// al cargar el archivo, mostrar todos los hospitales
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

			if(scrolling == 'Normal'){          //////////////filtrado de busqueda general
				loader.classList.remove('hidden');
				setTimeout(() => {
					loader.classList.add('hidden');
					getData(page);
				}, 2000);
			}
			if(scrolling == 'SearchNombre'){ 	//////////////filtrado de busqueda por nombre
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

//////////////////////////////////////
const getData = async (page_no = 1) => {
    const data = await httpRequestWrapper(
      "GET",
      `http://134.122.120.195/api/v1/hospitales/list/${page_no}`
    );
	scrolling = 'Normal'
    
	if (data == ''){
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
        populateUI(data);
    }
  };

  
//////////////////////////////////////
const getDataNombre = async (page_no = 1, searchParam ) => {
    const data = await httpRequestWrapper(
      "GET",
	  'http://134.122.120.195/api/v1/hospitales_per_type?type=nombre&data=' + searchParam+ '&entry_n=' + `${page_no}`
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
      const {id, hospital, direccion, telefono, activo } = each;
	  ///////////////////////////////////////
	  if (activo == true ){
		var switch1 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
		'</div>'
		//console.log(switch1);
		}
		else{
			switch1 = ' <div class="custom-control custom-switch">' +
			'<input type="checkbox" disabled class="custom-control-input" id="customSwitch1">' +
			'<label class="custom-control-label" for="customSwitch1"></label>' +
		'</div>'
		}

      container.innerHTML += 
      `
        <tr>
			<td scope="row" data-label="Id"> ${id} </td>
			<td data-label="Hospital"> ${hospital}</td>
			<td data-label="Direccion">${direccion}</td>
			<td data-label="Telefono">${telefono}</td>
			<td data-label="Activo">${switch1}</td>
			<td data-label="Acciones">
				<button onclick="deleteHospital(${id})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
					<i class="icon ion-md-trash "></i>
				</button>
				<button onclick="editHospital(${id}, '${hospital}', '${direccion}',
												'${telefono}', '${activo}' )" 
					class="btn btn-info btn-sm" title="Editar Paciente">
					<i class="icon ion-md-create "></i>
				</button>
			</td>
        </tr>
      
      `
    })
  
  }





  //////////////////////////////////////
function exit(){
	window.localStorage.clear();
	window.location.href = '../index.html'
}
$(function(){
	$('#nombreHospital').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#telefonoHospital').validCampoFranz('1234567890'); 
	$('#nombreHospitalEdit').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#telefonoHospitalEdit').validCampoFranz('1234567890'); 
});




