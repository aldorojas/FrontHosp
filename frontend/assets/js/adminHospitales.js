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


	numberPages();
	const URLTodosHospitales = 'http://134.122.120.195/api/v1/hospitales/list/1';
	allHospitales(URLTodosHospitales);

})

////////////////////////////////////////////////

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

var divPrueba = document.getElementById('contentTable')
divPrueba.innerHTML = ''

function allHospitales(URLAPI) {
	
	fetch(URLAPI)
	.then(response => response.json())
	.then(data => {
		//console.log(data)
		for(var i = 0; i < data.length; i++){
			
			if ( data[i].activo == true ){
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


			var nombre = `
			<tr>
				<td scope="row" data-label="Id"> ${data[i].id} </td>
				<td data-label="Hospital"> ${data[i].hospital}</td>
				<td data-label="Direccion">${data[i].direccion}</td>
				<td data-label="Telefono">${data[i].telefono}</td>
				<td data-label="Activo">${switch1}</td>
				<td data-label="Acciones">
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
			//divPrueba.innerHTML += nombre
			$( "#tableHospitales tbody" ).append(nombre);
		}
		// $(document).ready(function(){
		//     $('#tableHospitales').dataTable({
		//         select: true
		//     });
		// });

	})	
	// 	})
	.catch(err => console.log(err))
}




var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

function numberPages(){
    urlAPIPages = 'http://134.122.120.195/api/v1/list_entries/hospitales';
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
    urlHospitalesPagina = 'http://134.122.120.195/api/v1/hospitales/list/' + numPage;
    //console.log(urlEncuentrosPagina)
    var divPrueba = document.getElementById('contentTable')
    divPrueba.innerHTML = ''
    
    fetch(urlHospitalesPagina)
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
        console.log(data)
        allHospitales(urlHospitalesPagina)
        numberPages()
	});
}



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




