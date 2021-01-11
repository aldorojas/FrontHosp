//window.onload = console.log(localStorage.getItem("DatosLogueado")) 
window.onload = (function(){
    console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
		console.log("si es admin")
		document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
	}
	else{
		console.log("no es admin")
		
		//element.style.display = 'none'; 
	}


    // const urlAPI = 'http://134.122.120.195/api/v1/pacientes/list';

	// fetch(urlAPI)
	// .then(response => response.json())
	// .then(data => {
    //     //console.log(data)
    //     for(var i = 0; i < data.length; i++){
    //         console.log(data[i].id)
    //         $("#listPacientes").append($("<option>"+data[i].id+"</option>"));
    //     }
	
	// })
	// .catch(err => console.log(err))	

})

function showDivBusqueda(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
}

//////////////////////////77

////////////////////////////////// new PAciente ///////////////////


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

	});
})


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
			console.log("no hay, no existe")
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

    function getBase64(files, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() {
                resolve(reader.result.substr(reader.result.indexOf(',') + 1));
            };
            reader.onerror = reject;
            reader.readAsDataURL(files[0]);
        });
    }


    // $('.applicantForm').on('submit', async function(e) {
    //     e.preventDefault();

    //     let files = document.getElementById('file').files;

    //     let promise = getBase64(files);
    //     let encoded_file4 = await promise;
	// 	//alert(encoded_file4)
		

	// 	const dataToSend = JSON.stringify(
	// 		{
	// 			"method" : encoded_file4,
	// 			"search_for": "pasaporte"
	// 		});
		
	// 	console.log(dataToSend)

        //console.log(encoded_file4);


	//});
	

	/////////////////////////////   Crear encuentro  ///////////////////////


	
var formEncuentro = document.getElementById('formEncuentro');

formEncuentro.addEventListener('submit', async function(e){

	const URLNewEncuentro = 'http://134.122.120.195/api/v1/paciente/';

	e.preventDefault()
	var inputRadios = document.querySelectorAll('input[type="radio"]:checked');


	var idPaciente = inputRadios.length>0? inputRadios[0].value: null;
	var tipoEncuentro = document.getElementById('tipoEncuentro');

	// PDFs //
	let PDFElectro = document.getElementById('inputFileElectro').files;
    let promise = getBase64(PDFElectro);
	let base64Electro = await promise;
	//console.log(base64Electro)
	// --------------------
	let PDFExamLab = document.getElementById('inputFileExamLab').files;
    let promise2 = getBase64(PDFExamLab);
	let base64ExamLab = await promise;
	//console.log(base64ExamLab)
	//////////////////////////////////////

	
	var diagPrimario = document.getElementById('diagPrimario')
	var diagSecundario1 = document.getElementById('diagSecundario1')
	var diagSecundario2 = document.getElementById('diagSecundario2')
	var notaClinica = document.getElementById('notaClinica')

	//// fecha actual ////
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time; 
	console.log(dateTime)


	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"fechaEncuentro" : dateTime,
			"idPaciente" : idPaciente,
			"tipoEncuentro" : tipoEncuentro.value,
			"diagPrimario" : diagPrimario.value,
			"diagSecundario1" : diagSecundario1.value,
			"diagSecundario2" : diagSecundario2.value,
			"audio" : "",
			"pdfExamLab" : base64ExamLab,
			"pdfElectro" : base64Electro,
			"notasClinicas": notaClinica.value

		});
	console.log(dataToSend)
	
	// fetch(URLNewPaciente, {
	// 	method: "POST",
	// 	headers: headers,
	// 	body: dataToSend
	// })
	// .then(function(response){ 
	// 	return response.json(); 
	// })
	// .then(function(data){ 
	// 	console.log(data)
	// 	Swal.fire({
	// 		icon: 'success',
	// 		title: 'Paciente registrado',
	// 		showConfirmButton: false,
	// 		timer: 2500
	// 		})	

	// });
})


  ////////////////////////////////////////////////////////////////////////////////////


  var formProtOperatorio = document.getElementById('formProtOperatorio');

  formProtOperatorio.addEventListener('submit', async function(e){
  
	  const URLNewProtOpera = 'http://134.122.120.195/api/v1/paciente/';
  
	  e.preventDefault()
  
	  // PDFs //
	
	  ////////////

	  var fechaRegistro = document.getElementById('fechaRegistro')
	  var horaRegistro = document.getElementById('horaRegistro')
	  var implantesRegistro = document.getElementById('implantesRegistro')
	  var descProcedimiento = document.getElementById('descProcedimiento')
  
	 
	  var doc = new jsPDF()
	  doc.text('Protocolo operatorio', 65,10)
	  //doc.text(fechaRegistro.value, 50, 20)
	  
	  doc.save('a4.pdf')


	  var headers = {
		  "Content-Type": "application/json"
	   }
  
	//   const dataToSend = JSON.stringify(
	// 	  {
	// 		  "fechaEncuentro" : dateTime,
	// 		  "idPaciente" : idPaciente,
	// 		  "tipoEncuentro" : tipoEncuentro.value,
	// 		  "diagPrimario" : diagPrimario.value,
	// 		  "diagSecundario1" : diagSecundario1.value,
	// 		  "diagSecundario2" : diagSecundario2.value,
	// 		  "audio" : "",
	// 		  "pdfExamLab" : base64ExamLab,
	// 		  "pdfElectro" : base64Electro,
	// 		  "notasClinicas": notaClinica.value
  
	// 	  });
	//   console.log(dataToSend)
	  
	  // fetch(URLNewPaciente, {
	  // 	method: "POST",
	  // 	headers: headers,
	  // 	body: dataToSend
	  // })
	  // .then(function(response){ 
	  // 	return response.json(); 
	  // })
	  // .then(function(data){ 
	  // 	console.log(data)
	  // 	Swal.fire({
	  // 		icon: 'success',
	  // 		title: 'Paciente registrado',
	  // 		showConfirmButton: false,
	  // 		timer: 2500
	  // 		})	
  
	  // });
  })