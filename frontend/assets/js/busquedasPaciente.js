

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


				var encuentro = `
				<tr>
					<th scope="row"> ${data[i].id_encuentro} </th>
					<td> ${data[i].fecha_e}</td>
					<td>${data[i].hora_e}</td>
					<td>${data[i].tipo_2}</td>
					<td>${data[i].diag_primario}</td>
					<td>${data[i].diag_secun}</td>
					<td>${data[i].diag_secun2}</td>
					<td>
						${audio}
					</td>
					<td>
						${PDFElectro}
					</td>
					<td>
						${PDFExamLab}
					</td>
					<td>${data[i].notas_clinicas}</td>
					
					<td>${data[i].resultado_med_ia}</td>
					<td>${data[i].resultados_ia}</td>
					<td>${data[i].feedback_ia}</td>
					<td>${data[i].id_medico}</td>
					<td>${data[i].id_hospital}</td>
					<td>${data[i].eliminado}</td>

					<td>${data[i].fecha_ep}</td>
					<td>${data[i].hora_ep}</td>
					<td>${data[i].fecha_hospitalizacion}</td>
					<td>${data[i].fecha_egreso}</td>
					<td>${data[i].dias_hospitalizado}</td>
					<td>${data[i].diag_alta}</td>
					<td>${data[i].anamnesis}</td>
					<td>${data[i].estudios_acciones}</td>
					<td>${data[i].resumen_evolucion}</td>
					<td>${data[i].indiciaciones_alta}</td>

					<td>${data[i].date_registered}</td>
					<td>${data[i].time_protocol}</td>
					<td>${data[i].descripcion}</td>
					<td>${data[i].implantes}</td>
					
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