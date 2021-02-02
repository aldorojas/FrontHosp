

window.onload = (function(){
    console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
		//console.log("si es admin")
		document.getElementById("moduloAdminMed").style.display = 'block'
	  	document.getElementById("moduloAdminHosp").style.display = 'block'
	  }
	 
})

//////////// Modulos admin
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
}



////////////////////////// Busqueda Nombre //////////////////////////////

document.getElementById("btnFindNombre").addEventListener("click", function(event){
	event.preventDefault()
	var nombrePacienteFind = document.getElementById('nombrePacienteFind');
	const URLFindNombreMEdico = 'http://134.122.120.195/api/v1/paciente/';

	var divPrueba = document.getElementById('card')
	divPrueba.innerHTML = ''

	//e.preventDefault()
	var headers = {
		"Content-Type": "application/json"
	 }
	const dataToSend = JSON.stringify(
		{
			"method" : "find",
			"search_for": "nombre",
			"data_search": nombrePacienteFind.value
		});
	console.log(dataToSend)

	fetch(URLFindNombreMEdico, {
		method: "POST",
		headers: headers,
		body: dataToSend
	})
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
		if(data.length > 0){
			for(var i = 0; i < data.length; i++){
				console.log(data[i].nombre)
				var nombre = `
				<div class="blog-post">
                    <div class="blog-post_img">
                        <img src="../assets/img/avatarCard.png">
                    </div>
                    <div class="blog-post_info"> 
                        <label class="form-check-label" for="paciente${data[i].id}">
                        <h1 class="blog-post_title">  Paciente  ${data[i].id} : ${data[i].nombre} ${data[i].apellido} </h1> 
                        </label>

                        <div class="blog-post_date">
                        <span> Pasaporte: ${data[i].pasaporte}</span>
                        <span> Rut: ${data[i].rut}</span>
                        <span> Direccion: ${data[i].direccion}</span> 
						<span> Fecha de nacimiento:  ${data[i].birth_date}</span>
						<span> Edad:  ${data[i].edad}</span>
                        <span> Telefono:  ${data[i].telefono}</span>
                        <span> Sexo:  ${data[i].sexo}</span>
						</div>
						<div class="row">
							<div class="col-lg-6 col-md-6 stat  text-center" id="btnVerEncuentro">
								<button type="button" class="btn btn-primary -primary"
									onclick="verEncuentros(${data[i].id})">
									Ver encuentros
								</button>  
							</div>
							<div class="col-lg-6 col-md-6 stat text-center ">  	
								<button type="button" class="btn btn-primary" 
									onclick="toEncuentros(${data[i].id}, '${data[i].nombre}', 
												'${data[i].apellido}', '${data[i].birth_date}',
												'${data[i].sexo}', '${data[i].edad}','${data[i].telefono}',
												'${data[i].rut}')"> 
									
									Crear encuentro
								</button>	                                  
							</div> 
						</div>
					</div>
					
				</div>
				`
				divPrueba.innerHTML += nombre
			}
		}
		else{
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
					title: 'No hay coincidencias'
				})

			$('#exampleModal').modal('show');	
		}
	});
  });

  //////////////////////////////////////////////////////////////////

  function toEncuentros(idPaciente,nombrePaciente,apellidosPaciente,
						fechaNacimientoPaciente,sexoPaciente,edadPaciente,
						telefonoPaciente,rutPaciente){
	localStorage.setItem("idPaciente", idPaciente);
	localStorage.setItem("nombrePaciente", nombrePaciente);
	localStorage.setItem("apellidosPaciente", apellidosPaciente);
	localStorage.setItem("fechaNacimientoPaciente", fechaNacimientoPaciente);
	localStorage.setItem("sexoPaciente", sexoPaciente);
	localStorage.setItem("edadPaciente", edadPaciente);
	localStorage.setItem("telefonoPaciente", telefonoPaciente);
	localStorage.setItem("rutPaciente", rutPaciente);
	window.location.href = 'encuentros.html'
  }



  function verEncuentros(idPaciente){
	

	const URLFindEncuentros = 'http://134.122.120.195/api/v1/encuentros_per_patient?patient=' + idPaciente + '&entry_n=1';
	 // console.log(URLFindEncuentros)

	  	 var divPrueba = document.getElementById('encuentrosPaciente')
		 divPrueba.innerHTML = ''

		fetch(URLFindEncuentros)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			for(var i = 0; i < data.length; i++){

				if ( data[i].ruta_audio != '' ){
					var audio = 
					`<a href="http://134.122.120.195/files/${data[i].ruta_audio}">` + 
						'<img src="../assets/img/mp3Logo.png" height="50px" width="45px">' + 
					'</a>'
				}
				else{
					audio = ''
				}

				///////////////////////////////////////////////////////7

				if ( data[i].ruta_exam_electro != '' ){
					var PDFElectro = 
					`<a href="http://134.122.120.195/files/${data[i].ruta_exam_electro}">` + 
						'<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
					'</a>'
				}
				else{
					PDFElectro = ''
				}
				
				///////////////////////////////77
				if ( data[i].ruta_exam_lab != '' ){
					var PDFExamLab = 
					`<a href="http://134.122.120.195/files/${data[i].ruta_exam_lab}">` + 
						'<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
					'</a>'
				}
				else{
					PDFExamLab = ''
				}

				/////////////////////////////////
				if ( data[i].eliminado == "True" ){
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


				var encuentro = `
				<tr>
					<td scope="row" data-label="Id"> ${data[i].id_encuentro} </td>
					<td data-label="Fecha"> ${data[i].fecha_e}</td>
					<td data-label="Hora">${data[i].hora_e}</td>
					<td data-label="Tipo encuentro">${data[i].tipo_2}</td>
					<td data-label="Diag prim">${data[i].diag_primario}</td>
					<td data-label="Diag sec">${data[i].diag_secun}</td>
					<td data-label="Diag sec 2">${data[i].diag_secun2}</td>
					<td data-label="Audio">
						${audio}
					</td>
					<td data-label="PDF Electro">
						${PDFElectro}
					</td>
					<td data-label="PDF Exam Lab">
						${PDFExamLab}
					</td>

					<td data-label="Notas clinicas">${data[i].notas_clinicas}</td>
					<td data-label="Res med IA">${data[i].resultado_med_ia}</td>
					<td data-label="Resultados IA">${data[i].resultados_ia}</td>
					<td data-label="Feedbaack IA">${data[i].feedback_ia}</td>
					<td data-label="Id medico">${data[i].id_medico}</td>
					<td data-label="Hospital">${data[i].id_hospital}</td>
					<td data-label="Eliminado">${switch1}</td>

					<td data-label="Acciones">
						<button type="button" class="btn btn-primary"
							onclick="loadModalEpi('${data[i].id_epicrisis}','${data[i].fecha_ep}', '${data[i].hora_ep}',
							'${data[i].fecha_hospitalizacion}', '${data[i].fecha_egreso}','${data[i].dias_hospitalizado}',
							'${data[i].diag_alta}', '${data[i].anamnesis}', '${data[i].estudios_acciones}', '${data[i].indiciaciones_alta}',
							'${data[i].resumen_evolucion}' )">
							Epicrisis
						</button>
					</td>
				

					<td>
						<button type="button" class="btn btn-primary"
							onclick="loadModalCirugia('${data[i].id_cirugia}', '${data[i].date_registered}', '${data[i].time_protocol}', 
							'${data[i].implantes}', '${data[i].descripcion}' )">
							Cirugia
						</button>
					</td>

					
		
				</tr>
				
					`
				divPrueba.innerHTML += encuentro

				//$( "#tableEncuentrosPaciente tbody" ).append(encuentro);
			}
			numberPages(idPaciente);
			// $(document).ready(function(){
			// 	$('#tableEncuentrosPaciente').dataTable({
			// 		select: true
			// 	});
			// });
			
			})
		.catch(err => console.log(err))

		$('#modalEncuentros').modal('show');
		


  }


  
var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

function numberPages(idPaciente){
    urlAPIPages = 'http://134.122.120.195/api/v1/encuentros/list_registers?type_e=patient&patient=' + idPaciente;
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
                <button onclick="perPage(${i*10 - 9 })" class="btn btn-danger btn-sm">
                    ${i}
                </button>
            </td>
            `
              
        }
        divpieTable.innerHTML = pagesHtml  
        //$( "#tableEncuentros tfoot tr" ).append(pagesHtml);
	});
}





function loadModalEpi(idEpicrisis,fechaEpicrisis,horaEpicrisis,fechaHospitalizacion,fechaEgreso,
    diasHospitalizado,diagnosticoAlta,anamnesis,estudiosAcciones, indicacionesAlta,
    resumenEvolucion){

    var idEpicrisisEdit = document.getElementById('idEpicrisis')
    var fechaEpicrisisEdit = document.getElementById('fechaEpicrisis')
    var horaEpicrisisEdit = document.getElementById('horaEpicrisis')
    var fechaHospitalizacionEdit = document.getElementById('fechaHospitalizacion')
    var fechaEgresoEdit = document.getElementById('fechaEgresoHospital')
    var diasHospEdit = document.getElementById('diasHospitalizacion')
    var diagAltaEdit = document.getElementById('diagAlta')
    var anamnesisEdit = document.getElementById('anamnesis')
    var estudiosAccionesEdit = document.getElementById('estudiosAcciones')
    var indicacionesAltaEdit = document.getElementById('indicacionesAlta')
    var resumenEvoEdit = document.getElementById('resumenEvolucion')

    idEpicrisisEdit.value = idEpicrisis;
    fechaEpicrisisEdit.value = fechaEpicrisis;
    horaEpicrisisEdit.value = horaEpicrisis;
    fechaHospitalizacionEdit.value = fechaHospitalizacion;
    fechaEgresoEdit.value = fechaEgreso;
    diasHospEdit.value = diasHospitalizado;
    diagAltaEdit.value = diagnosticoAlta;
    anamnesisEdit.value = anamnesis;
    estudiosAccionesEdit.value = estudiosAcciones;
    indicacionesAltaEdit.value = indicacionesAlta
    resumenEvoEdit.value = resumenEvolucion;

    $('#modalEditEpi').modal('show');

}



function loadModalCirugia(idCirugia, dateResgistered, timeProtocol, implantes, descripcion,){

    var idCirugiaEdit = document.getElementById('idCirugiaModal')
    var fechaProtOperaEdit = document.getElementById('fechaProtOpera')
    var horaProtOperaEdit = document.getElementById('horaProtOpera')
    var implantesEdit = document.getElementById('implantesProt')
    var descProtEdit = document.getElementById('descProtOpera')

    idCirugiaEdit.value = idCirugia;
    fechaProtOperaEdit.value = dateResgistered;
    horaProtOperaEdit.value = timeProtocol;
    implantesEdit.value = implantes;
    descProtEdit.value = descripcion;

    $('#modalEditCirugia').modal('show');

}


  //////////////////////////////Busqueda por Rut  ////////////////////////////7

  document.getElementById("btnFindRut").addEventListener("click", function(event){
	event.preventDefault()
	var rutPacienteFind = document.getElementById('rutPacienteFind');
	const URLFindRutMEdico = 'http://134.122.120.195/api/v1/paciente/';

	var divPrueba = document.getElementById('card')
	divPrueba.innerHTML = ''

	//e.preventDefault()
	var headers = {
		"Content-Type": "application/json"
	 }
	const dataToSend = JSON.stringify(
		{
			"method" : "find",
			"search_for": "rut",
			"data_search": rutPacienteFind.value
		});
	console.log(dataToSend)

	fetch(URLFindRutMEdico, {
		method: "POST",
		headers: headers,
		body: dataToSend
	})
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
		if(data.length > 0){
			for(var i = 0; i < data.length; i++){
				console.log(data[i].nombre)
				var nombre = `
					<div class="blog-post">
					<div class="blog-post_img">
						<img src="../assets/img/avatarCard.png">
					</div>
					<div class="blog-post_info">
						<input type='radio' id='pacientepaciente${data[i].id}' name='paciente' value='${data[i].id}' required /> 
						<label class="form-check-label" for="paciente${data[i].id}">
							<h1 class="blog-post_title">  Paciente  ${data[i].id} : ${data[i].nombre} ${data[i].apellido} </h1> 
						</label> 
						<div class="blog-post_date">
						<span> Pasaporte: ${data[i].pasaporte}</span>
						<span> Rut: ${data[i].rut}</span>
						<span> Direccion: ${data[i].direccion}</span> 
						<span> Fecha de nacimiento:  ${data[i].birth_date}</span>
						<span> Telefono:  ${data[i].telefono}</span>
						<span> Sexo:  ${data[i].sexo}</span>

						</div>
					</div>
					</div>
				`
				
				divPrueba.innerHTML += nombre
			}
		}
		else{
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
				title: 'No hay coincidencias'
				})

			$('#exampleModal').modal('show');	
		}
	});
  });


///////////////////////////////////////////// Buscar por pasaporte ///////////////////////

document.getElementById("btnFindPasaporte").addEventListener("click", function(event){
	event.preventDefault()
	var pasaportePacienteFind = document.getElementById('pasaportePacienteFind');
	const URLFindPasaporteMedico = 'http://134.122.120.195/api/v1/paciente/';

	var divPrueba = document.getElementById('card')
	divPrueba.innerHTML = ''

	//e.preventDefault()
	var headers = {
		"Content-Type": "application/json"
	 }
	const dataToSend = JSON.stringify(
		{
			"method" : "find",
			"search_for": "pasaporte",
			"data_search": pasaportePacienteFind.value
		});
	console.log(dataToSend)

	fetch(URLFindPasaporteMedico, {
		method: "POST",
		headers: headers,
		body: dataToSend
	})
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
		if(data.length > 0){
			for(var i = 0; i < data.length; i++){
				console.log(data[i].nombre)
				var nombre = `
					<div class="blog-post">
					<div class="blog-post_img">
						<img src="../assets/img/avatarCard.png">
					</div>
					<div class="blog-post_info">
						<input type='radio' id='pacientepaciente${data[i].id}' name='paciente' value='${data[i].id}' required /> 
						<label class="form-check-label" for="paciente${data[i].id}">
							<h1 class="blog-post_title">  Paciente  ${data[i].id} : ${data[i].nombre} ${data[i].apellido} </h1> 
						</label> 
						<div class="blog-post_date">
						<span> Pasaporte: ${data[i].pasaporte}</span>
						<span> Rut: ${data[i].rut}</span>
						<span> Direccion: ${data[i].direccion}</span> 
						<span> Fecha de nacimiento:  ${data[i].birth_date}</span>
						<span> Telefono:  ${data[i].telefono}</span>
						<span> Sexo:  ${data[i].sexo}</span>
						
						</div>
					</div>
					</div>
				`
				divPrueba.innerHTML += nombre
			}
		}
		else{
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
					title: 'No hay coincidencias'
				})

			$('#exampleModal').modal('show');	
		}
	});
  });