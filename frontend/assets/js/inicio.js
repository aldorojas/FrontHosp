window.onload = (function(){
  	console.log(localStorage.getItem("Admin")); 
	  localStorage.setItem("encuentrosPaciente", "False");
	if(localStorage.getItem("Admin")== "true"){
		//console.log("si es admin")
		document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
	}

	if (localStorage.getItem("nombreMedico") === null) {
		window.location.href = '../index.html'
	}
	else{
		loadMedico()
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


function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
	
}



function showDivBusqueda(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
}


///////////////////

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
	var idNewPaciente
	var edadNewPaciente

	const [year, month, day] = fechaNacimientoNewPaciente.value.split('-');
    var newDate = month + '-' + day + '-' + year

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
			"birth_date":newDate,
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
			idNewPaciente = data.id_paciente
			edadNewPaciente = data.current_age

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
				localStorage.setItem("idPaciente", idNewPaciente);
				localStorage.setItem("nombrePaciente", nombreNewPaciente.value);
				localStorage.setItem("apellidosPaciente", apellidosNewPaciente.value);
				localStorage.setItem("fechaNacimientoPaciente", fechaNacimientoNewPaciente.value);
				localStorage.setItem("sexoPaciente", sexoNewPaciente.value);
				localStorage.setItem("edadPaciente", edadNewPaciente);
				localStorage.setItem("telefonoPaciente", telefonoNewPaciente.value);
				localStorage.setItem("rutPaciente", rutNewPaciente.value);
				localStorage.setItem("direccionPaciente", direccionNewPaciente.value);
				
				
				localStorage.setItem("rut", rutNewPaciente.value);				
				window.location.href = 'encuentros.html'								
	});
})




function exit(){
	window.localStorage.clear();
	window.location.href = '../index.html'
}

$(function(){

	$('#nombres').validCampoFranz(' abcdefghijklmnñopqrstuvwxyziouABCEDEFGHIJKLMNÑOPQRSTUVWXYZ');
	$('#apellidos').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiouABCEDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÓÍÚ'); 
	$('#telefono').validCampoFranz('1234567890');
});
// function check(e) {
//     tecla = (document.all) ? e.keyCode : e.which;

//     //Tecla de retroceso para borrar, siempre la permite
//     if (tecla == 8) {
//         return true;
//     }

//     // Patron de entrada, en este caso solo acepta numeros y letras
//     patron = /[A-Za-z]/;
//     tecla_final = String.fromCharCode(tecla);
//     return patron.test(tecla_final);
// }








