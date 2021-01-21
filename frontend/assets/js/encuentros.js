//window.onload = console.log(localStorage.getItem("DatosLogueado")) 
window.onload = (function(){

	console.log("id paciente: " + localStorage.getItem("idPaciente")); 
	console.log("id hospital: " + localStorage.getItem("idHospital")); 
	console.log("nombre paciente: " + localStorage.getItem("nombrePaciente") + localStorage.getItem("apellidosPaciente") ); 
	console.log("Fecha nacimiento: " + localStorage.getItem("fechaNacimientoPaciente"))
	console.log("Sexo paciente: " + localStorage.getItem("sexoPaciente"))
	console.log("edadPaciente: " + localStorage.getItem("edadPaciente"))
	console.log("telefonoPaciente: " + localStorage.getItem("telefonoPaciente"))
	console.log("rutPaciente: " + localStorage.getItem("rutPaciente"))
	console.log("Nombre del medico: " + localStorage.getItem("nombreMedico") + " " + localStorage.getItem("apellidosMedico") )
	


	var titulo = document.getElementById("nombrePaciente")
	div = '<h1>' +  localStorage.getItem("nombrePaciente") + '</h1> '
	titulo.innerHTML += div


	if(localStorage.getItem("Admin")== "true"){
		document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
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

	})
	.catch(err => console.log(err));
})


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



	/////////////////////////////   Crear encuentro  ///////////////////////


	
var formEncuentro = document.getElementById('formEncuentro');

formEncuentro.addEventListener('submit', async function(e){

	const URLNewEncuentro = 'http://134.122.120.195/api/v1/encuentro';

	e.preventDefault()
	// var inputRadios = document.querySelectorAll('input[type="radio"]:checked');
	// var idPaciente = inputRadios.length>0? inputRadios[0].value: null;

	// PDFs //
	let base64Electro = "";

	if (document.getElementById('inputFileElectro').files.length == 0) {
		base64Electro = "";
	}
	else{
		let PDFElectro = document.getElementById('inputFileElectro').files;
		let promise = getBase64(PDFElectro);
		base64Electro = await promise;
	}
    

	let base64ExamLab = "";
	
	if (document.getElementById('inputFileExamLab').files.length == 0) {
		base64ExamLab = "";
	}
	else{
		let PDFExamLab = document.getElementById('inputFileExamLab').files;
		let promise2 = getBase64(PDFExamLab);
		base64ExamLab = await promise2;
	}
    
	//console.log(base64ExamLab)
	//////////////////////////////////////

	var tipoEncuentro = document.getElementById('tipoEncuentro');
	var diagPrimario = document.getElementById('diagPrimario')
	var diagSecundario1 = document.getElementById('diagSecundario1')
	var diagSecundario2 = document.getElementById('diagSecundario2')
	var notaClinica = document.getElementById('notaClinica')

	var fecha_epicrisis = document.getElementById('fechaEpicrisis')
	var hora_epicris = document.getElementById('horaEpicrisis')
	var fecha_in_hospi = document.getElementById('fechaHospitalizacion')
	var fecha_egreso = document.getElementById('fechaEgresoHospital')
	var dias_de_hosp = document.getElementById('diasHospitalizacion')
	var diag_alta = document.getElementById('diagAlta')
	var anamnesis = document.getElementById('anamnesis')
	var estudios_acciones = document.getElementById('estudiosAcciones')
	var resumenEvolucion = document.getElementById('resumenEvolucion')
	var indicacionesAlta = document.getElementById('indicacionesAlta')
	
	var fechaRegistro = document.getElementById('fechaRegistro')
	var horaRegistro = document.getElementById('horaRegistro')
	var implantesRegistro = document.getElementById('implantesRegistro')
	var descProcedimiento = document.getElementById('descProcedimiento')


	var headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	 }

	const dataToSend = JSON.stringify(
		{
			"tipo_2" : tipoEncuentro.value,
			"diag_primario" : diagPrimario.value,
			"diag_secun" : diagSecundario1.value,
			"diag_secun2" : diagSecundario2.value,
			"ruta_audio" : "",
			"notas_clinicas": notaClinica.value,
			"resultados_ia" : "99",
			"feedback_ia" : "No esta bien",
			"resultado_med_ia" : "55%",
			"id_medico" : localStorage.getItem("idMedico"),
			"id_hospital" : localStorage.getItem("idHospital"),
			"id_paciente" : localStorage.getItem("idPaciente"),
			"eliminado" : "",
			"fecha_ep":fecha_epicrisis.value,
			"fecha_hospitalizacion":fecha_in_hospi.value,
			"fecha_egreso":fecha_egreso.value,
			"hora_ep": hora_epicris.value,
			"dias_hospitalizado":dias_de_hosp.value,
			"diag_alta": diag_alta.value,
			"anamnesis":anamnesis.value,
			"estudios_acciones":estudios_acciones.value,
			"resumen_evolucion" : resumenEvolucion.value,
			"indiciaciones_alta" : indicacionesAlta.value,
			"date_registered":fechaRegistro.value,
			"time_protocol":horaRegistro.value,
			"descripcion" : descProcedimiento.value,
			"implantes":implantesRegistro.value,
			"ruta_exam_lab" : base64ExamLab,
			"ruta_exam_electro" : base64Electro

		});
	console.log(dataToSend)
	
	fetch(URLNewEncuentro, {	
		mode: 'no-cors',
		method: "POST",
		headers: headers,
		body: dataToSend
	})
	
	.then(function(response){ 
		//return response.json(); 
		Swal.fire({
			icon: 'success',
			title: 'Encuentro registrado',
			showConfirmButton: false,
			timer: 2500
		})	
	})
	.catch(err => console.log(err))

	// .then(function(data){ 
	// 	console.log(data)
		

	// });
})


  ////////////////////////////////////////////////////////////////////////////////////


  var BtnGuardarProtOpera = document.getElementById('guardarProtOpera');

  BtnGuardarProtOpera.addEventListener('click', function(e){
	  e.preventDefault()
  
	  // PDFs //
	
	  ////////////
	  var fechaRegistro = document.getElementById('fechaRegistro')
	  var horaRegistro = document.getElementById('horaRegistro')
	  var implantesRegistro = document.getElementById('implantesRegistro')
	  var descProcedimiento = document.getElementById('descProcedimiento')
  
	  var doc = new jsPDF()
	  doc.setFontType("bold");
	  doc.setFontSize(14);
	  doc.text('Protocolo Operatorio',80,20)
	  doc.setFontSize(12);

	  doc.text('Diagnostico quirurgico postoperatorio',20,70)
	  doc.setFontType("normal");
	  doc.setFontSize(8);
	  doc.text('Fecha:					' + fechaRegistro.value,20,75)
	  doc.text('Hora:				 	' + horaRegistro.value,20,80)
	  doc.text('Codigo:  				 ',20,85)
	  doc.text('Descripcion diagnostico:  	' + 'OSTEOCONDROSIS DE LA COLUMNA VERTEBRAL DEL ADULTO',20,90)
	  doc.text('Responsable:  				 ',20,95)
	  doc.text('Especialidad:  			 ' + 'COLUMNA',20,100)
	  doc.text('Rut:  				 ' + '' ,20,105)

	  doc.setFontType("bold");
	  doc.setFontSize(12);
	  doc.text('Descripcion de procedimiento',20,120)
	  doc.setFontType("normal");
	  doc.setFontSize(8);
	  doc.text(descProcedimiento.value,20,125)

	  doc.setFontType("bold");
	  doc.setFontSize(12);
	  doc.text('Implantes',20,250)
	  doc.setFontType("normal");
	  doc.setFontSize(8);
	  doc.text(implantesRegistro.value,20,255)

	  doc.text('Especialidad:' + 'Columna',20,280)
	  doc.text('Responsable' + '',80,280)

	  //doc.text(fechaRegistro.value, 50, 20)
	  doc.save('ProtocoloOperatorio.pdf')


	

	//e.preventDefault();  //stop the browser from following
    //window.location.href = 'uploads/file.pdf';


	//   var headers = {
	// 	  "Content-Type": "application/json"
	//    }
  
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


  var BtnGuardarEpicrisis = document.getElementById('guardarEpicrisis');

  BtnGuardarEpicrisis.addEventListener('click', function(e){
	  e.preventDefault()
  
	  // PDFs //
	
	  ////////////

	  var fechaEpicrisis = document.getElementById('fechaEpicrisis')
	  var horaEpicrisis = document.getElementById('horaEpicrisis')
	  var fechaHospitalizacion = document.getElementById('fechaHospitalizacion')
	  var fechaEgresoHospital = document.getElementById('fechaEgresoHospital')
	  var diasHospitalizado = document.getElementById('diasHospitalizacion')
	  var anamnesis = document.getElementById('anamnesis')
	  var estudiosAcciones = document.getElementById('estudiosAcciones')
	  var resumenEvolucion = document.getElementById('resumenEvolucion')
	  var indicacionesAlta = document.getElementById('indicacionesAlta')
  
	  var doc = new jsPDF()
	  doc.setFontType("bold");
	  doc.setFontSize(14);
	  doc.text('RESUMEN DE ATENCION MEDICA',70,20)
	  
	  doc.setFontType("normal");
	  doc.setFontSize(11);
	  doc.text('Nombre paciente:	' + localStorage.getItem("nombrePaciente") + ' ' 
					  + localStorage.getItem("apellidosPaciente") ,20,40)
	  doc.text('Aseguradora:	VIDA TRES S.A.',20,45)
	  doc.text('Fecha de nacimiento:	' + localStorage.getItem("fechaNacimientoPaciente") ,20,50)
	  doc.text('Medico tratante:	' + localStorage.getItem("nombreMedico") + ' ' + localStorage.getItem("apellidosMedico"),20,55)
	  doc.text('RUT medico tratante:',20,60)

	  doc.text('Identificacion RU:',130,45)
	  doc.text('Edad: ' + localStorage.getItem("edadPaciente") ,130,50)
	  doc.text('Sexo: ' + localStorage.getItem("sexoPaciente"),165,50)
	  doc.text('Episodio:',130,55)
	  doc.text('Telefono: ' + localStorage.getItem("telefonoPaciente"),130,60)

	
	  doc.setFontType("bold");
	  doc.setFontSize(14);
	  doc.text('EPICRISIS',90,80)
	  doc.setFontSize(10);
	  doc.text('PACIENTE:',21,90)
	  doc.rect(20, 85, 25, 10, )
	  doc.setFontType("normal");
	  doc.text(localStorage.getItem("apellidosPaciente") + " " + localStorage.getItem("nombrePaciente"),47,90)
	  doc.rect(45, 85, 60, 10 )
	  
	  doc.setFontType("bold");
	  doc.text('RUT:',106,90)
	  doc.rect(105, 85, 10, 10 )

	  doc.rect(115, 85, 35, 10 )
	  doc.setFontType("normal");
	  doc.text(localStorage.getItem("rutPaciente"), 117,90)

	  doc.rect(150, 85, 15, 10 )
	  doc.setFontType("bold");
	  doc.text('EDAD:', 152,90)

	  doc.rect(165, 85, 25, 10 )
	  doc.setFontType("normal");
	  doc.text(localStorage.getItem("edadPaciente"), 166, 90)

	  ///////////////////////////// renglon 2
	  doc.rect(20, 95, 45, 10 )
	  doc.setFontType("bold");
	  doc.text('SERVICIO DE INGRESO:', 21, 100)

	  doc.rect(65, 95, 55, 10)
	  doc.setFontType("normal");
	  doc.text('UE UTI Adulto 4 LDS', 66, 100)

	  doc.rect(120, 95, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('FECHA DE INGRESO:', 121, 100)

	  doc.rect(160, 95, 30, 10)
	  doc.setFontType("normal");
	  doc.text(fechaHospitalizacion.value, 161, 100)


	  ///////////////////////////////renglon 3
	  doc.rect(20, 105, 45, 10 )
	  doc.setFontType("bold");
	  doc.text('SERVICIO DE EGRESO:', 21, 110)

	  doc.rect(65, 105, 55, 10 )
	  doc.setFontType("normal");
	  doc.text('UE Enfermeria HOSP04 LDS', 66, 110)

	  doc.rect(120, 105, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('FECHA DE EGRESO:', 121, 110)

	  doc.rect(160, 105, 30, 10 )
	  doc.setFontType("normal");
	  doc.text(fechaEgresoHospital.value, 161, 110)


	  ////////////////////////////RENGLON 3 
	  doc.rect(20, 115, 55, 10 )
	  doc.setFontType("bold");
	  doc.text('DIAS DE HOSPITALIZACION:', 21, 120)

	  doc.rect(75, 115, 115, 10 )
	  doc.setFontType("normal");
	  doc.text(diasHospitalizado.value, 78, 120)

	//   ////////////////////////RENGLON 4
	  doc.rect(20, 125, 45, 10 )
	  doc.setFontType("bold");
	  doc.text('MEDICO TRATANTE:', 21, 130)

	  doc.rect(65, 125, 45, 10 )
	  doc.setFontType("normal");
	  doc.text(localStorage.getItem("nombreMedico") + ' ' + localStorage.getItem("apellidosMedico"), 66, 130)
	
	  doc.rect(110, 125, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('ESPECIALIDAD:', 111, 130)

	  doc.rect(150, 125, 40, 10 )
	  doc.setFontType("normal");
	  doc.text('', 151, 130)

	//   ////////////////////////renglon 5
	  doc.rect(20, 135, 45, 10 )
	  doc.setFontType("bold");
	  doc.text('MEDICO RESP. ALTA:', 21, 140)

	  doc.rect(65, 135, 45, 10 )
	  doc.setFontType("normal");
	  doc.text('', 66, 140)

	  doc.rect(110, 135, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('ESPECIALIDAD:', 111, 140)

	  doc.rect(150, 135, 40, 10 )
	  doc.setFontType("normal");
	  doc.text('', 151, 140)

	//   ///////////////////////// renglon 6
	  doc.rect(20, 145, 45, 10 )
	  doc.setFontType("bold");
	  doc.text('MOTIVO DE ALTA:', 21, 150)

	  doc.rect(65, 145, 125, 10 )
	  doc.setFontType("normal");
	  doc.text('', 66, 150)

	//   /////////////////////////// DIAGNOSTICO ALTA
	  doc.rect(20, 165, 170, 10 )
	  doc.setFontType("bold");
	  doc.text('DIAGNOSTICO DE ALTA', 90, 170)

	  doc.rect(20, 175, 30, 10 )
	  doc.setFontType("normal");
	  doc.text('M421', 21, 180)
	  
	  doc.rect(50, 175, 140, 10 )
	  doc.setFontType("normal");
	  doc.text('', 51, 180)

	  ////////////////////////////
	  doc.rect(20, 195, 170, 90 )
	  doc.setFontType("bold");
	  doc.text('ANAMNESIS DE:', 21, 200)
	  doc.setFontType("normal");
	  doc.text(anamnesis.value, 21, 210)

	  //////////////////////////// Pagina 2
	  ///////////////////////////////
	  doc.addPage();

	  doc.rect(20, 15, 170, 40 )
	  doc.setFontType("bold");
	  doc.text('ESTUDIOS Y ACCIONES:', 21, 20)
	  doc.setFontType("normal");
	  doc.text(estudiosAcciones.value, 21, 30)
	
	  doc.rect(20, 65, 170, 40 )
	  doc.setFontType("bold");
	  doc.text('RESUMEN DE EVOLUCION:', 21, 70)
	  doc.setFontType("normal");
	  doc.text(resumenEvolucion.value, 21, 80)

	  doc.rect(20, 115, 170, 40 )
	  doc.setFontType("bold");
	  doc.text('INDICACIONES DE ALTA:', 21, 120)
	  doc.setFontType("normal");
	  doc.text(indicacionesAlta.value, 21, 130)




	  doc.save('Epicrisis.pdf')

  })