window.onload = (function(){

	// console.log("id paciente: " + localStorage.getItem("idPaciente")); 
	// console.log("id hospital: " + localStorage.getItem("idHospital")); 
	// console.log("nombre paciente: " + localStorage.getItem("nombrePaciente") + localStorage.getItem("apellidosPaciente") ); 
	// console.log("Fecha nacimiento: " + localStorage.getItem("fechaNacimientoPaciente"))
	// console.log("Sexo paciente: " + localStorage.getItem("sexoPaciente"))
	// console.log("edadPaciente: " + localStorage.getItem("edadPaciente"))
	// console.log("telefonoPaciente: " + localStorage.getItem("telefonoPaciente"))
	// console.log("rutPaciente: " + localStorage.getItem("rutPaciente"))
	// console.log("Nombre del medico: " + localStorage.getItem("nombreMedico") + " " + localStorage.getItem("apellidosMedico") )
	
	localStorage.setItem("encuentrosPaciente", "False");

	if (localStorage.getItem("nombreMedico") === null) {
		window.location.href = '../index.html'
	}
	else{
		loadMedico();
	}

	var titulo = document.getElementById("nombrePaciente")
	div = '<h1>' +  localStorage.getItem("nombrePaciente") + '</h1> '
	titulo.innerHTML += div


	if(localStorage.getItem("Admin")== "true"){
		document.getElementById("moduloAdminMed").style.display = 'block'
		document.getElementById("moduloAdminHosp").style.display = 'block'
	}
	
	///////////////////////////////////////////
	
    const urlAPI = 'http://134.122.120.195/api/v1/doctors_list';
	fetch(urlAPI)
	.then(response => response.json())
	.then(data => {
		console.log(data)
        for(var i = 0; i < data.length; i++){
            console.log(data[i].nombre_completo)
            $("#doctorAlta").append($("<option>"+data[i].nombre_completo +"</option>"));
        }
	
	})
	.catch(err => console.log(err))	

})
//////////////////////////////////////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
}

function charLimit(limitField, limitNum) { 
    if (limitField.value.length > limitNum) { 
    limitField.value = limitField.value.substring(0, limitNum);} 
} 

function pulsar(e) {
	if (e.which === 13 && !e.shiftKey) {
	  e.preventDefault();
	  console.log('prevented');
	  return false;
	}
  }
////////////////////////////////////////////////////
function showDivBusqueda(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
}

function showSelectIsapre(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("divAseguradora").style.display = element.value == 'isapre' ? 'block' : 'none';
}

//////////////////////////

////////////////////////////////// new PAciente ///////////////////
var formNewPaciente = document.getElementById('formNewPaciente')
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

	
//////////////////////////////////////
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


/////////////////// Audio ////////////////

var context = new AudioContext();
var source = null;
var audioBuffer = null;

var bufferToBase64 = function (buffer) {
	var bytes = new Uint8Array(buffer);
	var len = buffer.byteLength;
	var binary = "";
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

///////////////////////////////////////////////////////////////////////////////////
function initSound(arrayBuffer) {
	var base64String = bufferToBase64(arrayBuffer);
	//console.log(base64String)
	return base64String
}


function getAudioBase64(files, onLoadCallback){
	return new Promise(function() {
		var reader = new FileReader();
		reader.onload = function (e) {
			initSound(files);
		};
		reader.readAsArrayBuffer(files[0]);
	});
}




// function loadData() {
//   spinner.removeAttribute('hidden');
//   fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=5000ms')
//     .then(response => response.json())
//     .then(data => {
//       spinner.setAttribute('hidden', '');
//       console.log(data)
//     });
// }





/////////////////////////////   Crear encuentro  ///////////////////////
var formEncuentro = document.getElementById('formEncuentro');

formEncuentro.addEventListener('submit', async function(e){
	
const URLNewEncuentro = 'http://134.122.120.195/api/v1/encuentro';

e.preventDefault()

//console.log(base64ExamLab)
//////////////////////////////////////
var tipoEncuentro = document.getElementById('tipoEncuentro');
var diagPrimario = document.getElementById('diagPrimario')
var diagSecundario1 = document.getElementById('diagSecundario1')
var diagSecundario2 = document.getElementById('diagSecundario2')
var notaClinica = document.getElementById('notaClinica')

//////////////////////////////Protocolo operatorio/////////////////////////	
var fechaRegistro = document.getElementById('fechaRegistro')
var horaRegistro = document.getElementById('horaRegistro')
var nombrecirujano = document.getElementById('nombrecirujano1')
var nombrecirujano2 = document.getElementById('nombrecirujano2')
var rutcirujano1 = document.getElementById('rutcirujano1')
var rutcirujano2 = document.getElementById('rutcirujano2')
var especialidadcirujano1 = document.getElementById('especialidadcirujano1')
var especialidadcirujano2 = document.getElementById('especialidadcirujano2')
var anestesista = document.getElementById('nombreanestesista')
var rutanestesista = document.getElementById('rutanestesista')
var descProcedimiento = document.getElementById('descProcedimiento')
var implantesRegistro = document.getElementById('implantesRegistro')
var eliminadoEncuentro = document.getElementById('eliminadoEncuentro')
 
////////////////////////////Epicrisis///////////////////////////////////////
var fecha_epicrisis = document.getElementById('fechaEpicrisis')
var hora_epicris = document.getElementById('horaEpicrisis')
var fecha_in_hospi = document.getElementById('fechaHospitalizacion')
var fecha_egreso = document.getElementById('fechaEgresoHospital')
var dias_de_hosp = document.getElementById('diasHospitalizacion')
var aseguradora = document.getElementById('aseguradora')
var seringreso = document.getElementById('seringreso')
var seregreso = document.getElementById('seregreso')
var Rutatra = document.getElementById('Rutatra')
//var medicoresp = document.getElementById('medicoresp')
//var especialidadresp = document.getElementById('especialidadresp')
var diag_alta = document.getElementById('diagAlta')
var anamnesis = document.getElementById('anamnesis')
var resumenEvolucion = document.getElementById('resumenEvolucion')
var estudios_acciones = document.getElementById('estudiosAcciones')
var indicacionesAlta = document.getElementById('indicacionesAlta')
var motivoalta = document.getElementById('motivoalta')

var aseguradoraIsapre = document.getElementById('aseguradoraIsapre')
var lMargin=24; //left margin in mm
var rMargin=24; //right margin in mm
var pdfInMM=210;  // width of A4 in mm

var lMargin1=24; //left margin in mm
var rMargin1=24; //right margin in mm
var pdfInMM1=180;  // width of A4 in mm
var medicotratante = document.getElementById('doctorAlta')	
//var especialidadanestesista1 = document.getElementById('especialidanestesista')
//var descripcionpro = document.getElementById('descripcionpro')



var aseguradoraFinal 

if (aseguradora.value == 'isapre'){
	aseguradoraFinal = aseguradoraIsapre.value
}
else{
	aseguradoraFinal = 'fonosa'
}

const spinner = document.getElementById("spinner");
spinner.removeAttribute('hidden');

//Audio  ///////////////
let Base64Audio = "";

if (document.getElementById('audioEncuentro').files.length == 0) {
	Base64Audio = "";
}
else{
	let audioBase64 = document.getElementById('audioEncuentro').files;
	let promise = getBase64(audioBase64);
	Base64Audio = await promise;
}

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

	
var headers = {
		"Content-Type": "application/json"
}

const dataToSend = JSON.stringify(
	{
		"tipo_2" : tipoEncuentro.value,
		"diag_primario" : diagPrimario.value,
		"diag_secun" : diagSecundario1.value,
		"diag_secun2" : diagSecundario2.value,
		"notas_clinicas": notaClinica.value,
		"resultados_ia" : "99",
		"feedback_ia" : "No esta bien",
		"resultado_med_ia" : "55%",
		"id_medico" : localStorage.getItem("idMedico"),
		"id_hospital" : localStorage.getItem("idHospital"),
		"id_paciente" : localStorage.getItem("idPaciente"),
		"eliminado" : "False",
		"fecha_ep": fecha_epicrisis.value,
		"fecha_hospitalizacion":fecha_in_hospi.value,
		"fecha_egreso":fecha_egreso.value,
		"hora_ep": hora_epicris.value,
		"dias_hospitalizado":dias_de_hosp.value,
		"diag_alta": diag_alta.value,
		"anamnesis": anamnesis.value,
		"estudios_acciones":estudios_acciones.value,
		"resumen_evolucion" : resumenEvolucion.value,
		"indiciaciones_alta" : indicacionesAlta.value,
		"date_registered":fechaRegistro.value,
		"time_protocol":horaRegistro.value,
		"descripcion" : descProcedimiento.value,
		"implantes":implantesRegistro.value,
		"cie10":"182773js",
		"snomed":"877dyjs",
		"nombre_cirujano1": nombrecirujano.value,
		"nombre_cirujano2": nombrecirujano2.value,
		"anestesista": anestesista.value,
		"especialidad_cirujano1": especialidadcirujano1.value,
		"especialidad_cirujano2": especialidadcirujano2.value,
		"especialidad_anestesista": '',
		"rut_cirujano1": rutcirujano1.value,
		"rut_cirujano2": rutcirujano2.value,
		"rut_anestesista": rutanestesista.value,
		"descripcion_procedimiento": descProcedimiento.value,
		"aseguradora": aseguradoraFinal,
		"servicio_ingreso": seringreso.value,
		"servicio_egreso": seregreso.value,
		"medico_tratante": medicotratante.value,
		"ruta_tratante": Rutatra.value,
		"medico_responsable": localStorage.getItem("nombrePaciente") + ' ' + localStorage.getItem("apellidosPaciente"),
		"especialidad_responsable": localStorage.getItem("especialidad"),
		"ruta_audio" : Base64Audio,
		"ruta_exam_lab" : base64ExamLab,
		"ruta_exam_electro" : base64Electro

	});


	if(tipoEncuentro.value == 'Cirugia'){

		var campos = [fecha_epicrisis, hora_epicris, fecha_in_hospi, fecha_egreso, dias_de_hosp, seringreso,
			seregreso, Rutatra, diag_alta, anamnesis, resumenEvolucion, estudios_acciones, indicacionesAlta,
			nombrecirujano,nombrecirujano2,rutcirujano1,rutcirujano2, especialidadcirujano1,especialidadcirujano2,
			anestesista,rutanestesista, descProcedimiento, implantesRegistro]
		var vacios = ''

		for(var i = 0; i < campos.length; i++){
			
			if(campos[i].value == ''){
				vacios += campos[i].id + ', '
				
				spinner.setAttribute('hidden', '');
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Falta llenar el/los campo(s): ' + vacios,
				})
				console.log(vacios)
			}
			
			
		}
		if(vacios == '' ){
			var doc = new jsPDF()
			doc.setFontType("bold");
			doc.setFontSize(14);
			doc.text('RESUMEN DE ATENCION MEDICA',70,20)
	
			doc.setFontType("normal");
			doc.setFontSize(11);
			doc.text('Nombre Paciente:' + localStorage.getItem("nombrePaciente") + ' ' + localStorage.getItem("apellidosPaciente"),20,40)
			doc.text('RUT:' + localStorage.getItem("rutPaciente") ,20,45)
			doc.text('Aseguradora:'+ aseguradoraFinal,20,50)
			doc.text('Fecha nacimiento:	' + localStorage.getItem("fechaNacimientoPaciente") ,20,55)
	
			doc.text('Edad: ' + localStorage.getItem("edadPaciente") ,110,40)
			doc.text('Sexo:	' +  localStorage.getItem("sexoPaciente") ,110,45)
			doc.text('Telefono: ' + localStorage.getItem("telefonoPaciente"),110,50)
	
			doc.setFontType("bold");
			doc.setFontSize(14);
			doc.text('EPICRISIS',90,70)
			doc.setFontSize(10);
			doc.text('PACIENTE:',21,85)
			doc.rect(20, 80, 25, 10, )
			doc.setFontType("normal");
			doc.text(localStorage.getItem("apellidosPaciente") + " " + localStorage.getItem("nombrePaciente"),47,85)
			doc.rect(45, 80, 75, 10 )
			doc.setFontType("bold");
			doc.text('DIAS DE HOSPITALIZACION:',121,85)
			doc.rect(120, 80, 51, 10 )
			doc.setFontType("normal");
			doc.text(dias_de_hosp.value, 172,85)
			doc.rect(171, 80, 19, 10 )
			
			///////////////////////////// renglon 2
			doc.rect(20, 90, 45, 10 )
			doc.setFontType("bold");
			doc.text('SERVICIO DE INGRESO:', 21, 95)
	
			doc.rect(65, 90, 55, 10)
			doc.setFontType("normal");
			doc.text(seringreso.value, 66, 95)
	
			doc.rect(120, 90, 40, 10 )
			doc.setFontType("bold");
			doc.text('FECHA DE INGRESO:', 121, 95)
	
			doc.rect(160, 90, 30, 10)
			doc.setFontType("normal");
			doc.text(fecha_in_hospi.value, 161, 95)
	
	
			///////////////////////////////renglon 3
			doc.rect(20, 100, 45, 10 )
			doc.setFontType("bold");
			doc.text('SERVICIO DE EGRESO:', 21, 105)
	
			doc.rect(65, 100, 55, 10 )
			doc.setFontType("normal");
			doc.text(seregreso.value, 66, 105)
	
			doc.rect(120, 100, 40, 10 )
			doc.setFontType("bold");
			doc.text('FECHA DE EGRESO:', 121, 105)
	
			doc.rect(160, 100, 30, 10 )
			doc.setFontType("normal");
			doc.text(fecha_egreso.value, 161, 105)
	
			//   ////////////////////////RENGLON 3
			doc.rect(20, 110, 40, 10 )
			doc.setFontType("bold");
			doc.text('MEDICO TRATANTE:', 21, 115)
	
			doc.rect(60, 110, 60, 10 )
			doc.setFontType("normal");
			doc.text(localStorage.getItem("nombreMedico") + ' ' + localStorage.getItem("apellidosMedico"), 61, 115)
	
			doc.rect(120, 110, 40, 10 )
			doc.setFontType("bold");
			doc.text('ESPECIALIDAD:', 121, 115)
	
			doc.rect(160, 110, 30, 10 )
			doc.setFontType("normal");
			doc.text(localStorage.getItem("especialidad"), 161, 115)
	
			////////////////////////////RENGLON 4
			doc.rect(20, 120, 30, 10 )
			doc.setFontType("bold");
			doc.text('RUT TRATANTE:', 21, 125)
	
			doc.rect(50, 120, 30, 10 )
			doc.setFontType("normal");
			doc.text(Rutatra.value, 51, 125)
	
			//   ////////////////////////renglon 5
			doc.rect(80, 120, 40, 10 )
			doc.setFontType("bold");
			doc.text('MEDICO RESP. ALTA:', 81, 125)
			doc.rect(120, 120, 70, 10 )
			doc.setFontType("normal");
			doc.text(doctorAlta.value, 121, 125)
			////////////////////////////
	
			
			doc.rect(20, 130, 51, 10 )
			doc.setFontType("bold");
			doc.text('ESPECIALIDAD RESP. ALTA:', 21, 135)
			doc.rect(71, 130, 119, 10 )
			doc.setFontType("normal");
			doc.text( localStorage.getItem("especialidad"), 72, 135)


	
			//   ///////////////////////// renglon 6
			doc.rect(20, 145, 170, 10 )
			doc.setFontType("bold");
			doc.text('MOTIVO DE ALTA', 90, 150)

			doc.rect(20, 155, 170, 20 )
			doc.setFontType("normal");
			//doc.text('texto libre', 21, 160)
			doc.text(lMargin, 160, doc.splitTextToSize(motivoalta.value, (pdfInMM-lMargin-rMargin)));
	


			//   /////////////////////////// DIAGNOSTICO ALTA

			doc.rect(20, 185, 170, 10 )
			doc.setFontType("bold");
			doc.text('DIAGNOSTICO DE ALTA', 90, 190)
			doc.rect(20, 195, 170, 20 )
			doc.setFontType("normal");
			//doc.text(diag_alta.value, 21, 160)
			doc.text(lMargin, 200, doc.splitTextToSize(diag_alta.value, (pdfInMM-lMargin-rMargin)));

			////////////////////////////
			doc.rect(20, 225, 170, 50 )
			doc.setFontType("bold");
			doc.text('ANAMNESIS DE:', 21, 230)
			doc.setFontType("normal");
			//doc.text(anamnesis.value, 21, 195)
			doc.text(lMargin, 241, doc.splitTextToSize(anamnesis.value, (pdfInMM-lMargin-rMargin)));





	
			//////////////////////////// Pagina 2
			///////////////////////////////
			doc.addPage();
	
			doc.rect(20, 15, 170, 40 )
			doc.setFontType("bold");
			doc.text('ESTUDIOS Y ACCIONES:', 21, 20)
			doc.setFontType("normal");
			//doc.text(estudios_acciones.value, 21, 30)
			doc.text(lMargin, 25, doc.splitTextToSize(estudios_acciones.value, (pdfInMM-lMargin-rMargin)));
	
			doc.rect(20, 65, 170, 40 )
			doc.setFontType("bold");
			doc.text('RESUMEN DE EVOLUCION:', 21, 70)
			doc.setFontType("normal");
			//oc.text(resumenEvolucion.value, 21, 80)
			doc.text(lMargin, 75, doc.splitTextToSize(resumenEvolucion.value, (pdfInMM-lMargin-rMargin)));
	
			doc.rect(20, 115, 170, 40 )
			doc.setFontType("bold");
			doc.text('INDICACIONES DE ALTA:', 21, 120)
			doc.setFontType("normal");
			//doc.text(indicacionesAlta.value, 21, 130)
			doc.text(lMargin, 125, doc.splitTextToSize(indicacionesAlta.value, (pdfInMM-lMargin-rMargin)));

			doc.save('Epicrisis.pdf')
			
			
	
			///////////////////////PDF Protocolo operatorio//////////////////////////
			setTimeout(5000);
	
	
			var doc2 = new jsPDF()
			doc2.setFontType("bold");
			doc2.setFontSize(12);
			doc2.text('Protocolo Operatorio',80,30)
	
			doc2.setFontType("normal");
			doc2.setFontSize(11);
			doc2.text('Rut:'  + localStorage.getItem("rutPaciente") ,20,40)
			doc2.text('Nombre Paciente:'  + localStorage.getItem("nombrePaciente") + ' ' + localStorage.getItem("apellidosPaciente"),20,45)
			doc2.text('Sexo:'  + localStorage.getItem("sexoPaciente") ,20,50)
			doc2.text('Fecha nacimiento:'  + localStorage.getItem("fechaNacimientoPaciente") ,20,55)
			doc2.text('Direccion:'  + localStorage.getItem("direccionPaciente") ,20,60)
	
			doc2.setFontType("bold");
			doc2.setFontSize(12);
			doc2.text('Diagnostico quirurgico postoperatorio',70,70)
			doc2.setFontType("normal");
			doc2.setFontSize(11);
			doc2.text('Fecha:' + fechaRegistro.value,20,85)
			doc2.text('Hora:' + horaRegistro.value,20,90)
			doc2.text('Codigo:',20,95)
			doc2.text('Descripcion diagnostico:' + 'OSTEOCONDROSIS DE LA COLUMNA VERTEBRAL DEL ADULTO',20,100)
			doc2.text('Nombre Cirujano1:' + nombrecirujano.value,20,105)
			doc2.text('Especialidad:' + especialidadcirujano1.value,20,110)
			doc2.text('RUT:'+ rutcirujano1.value,20,115)
			doc2.text('Nombre Cirujano2:' + nombrecirujano2.value,20,120)
			doc2.text('Especialidad:' + especialidadcirujano2.value,20,125)
			doc2.text('RUT:' + rutcirujano2.value,20,130)
			doc2.text('Nombre Anestesista:' + anestesista.value,20,135)
			doc2.text('RUT:' + rutanestesista.value,20,140)
	
			doc2.setFontType("bold");
			doc2.setFontSize(12);
			doc2.text('Descripcion de procedimiento',20,150)
			doc2.setFontType("normal");
			doc2.text(lMargin1, 156, doc.splitTextToSize(descProcedimiento.value, (pdfInMM1-lMargin1-rMargin1)));
			//doc2.setFontSize(11);
			//doc2.text(descProcedimiento.value,20,160)
	
			doc2.setFontType("bold");
			doc2.setFontSize(12);
			doc2.text('Implantes',20,190)
			doc2.setFontType("normal");
			doc2.text(lMargin1, 196, doc.splitTextToSize(implantesRegistro.value, (pdfInMM1-lMargin1-rMargin1)));
			//doc2.setFontSize(11);
			//doc2.text(implantesRegistro.value,20,180)
			
			doc2.text('Especialidad:' + 'Columna',20,250)
			doc2.text('Responsable:' + localStorage.getItem("nombreMedico") + ' ' + localStorage.getItem("apellidosMedico"),80,250)
	
			doc2.save('ProtocoloOperatorio.pdf')
			

			console.log(dataToSend)


			fetch(URLNewEncuentro, {	
				mode: 'no-cors',
				method: "POST",
				headers: headers,
				body: dataToSend
			})
			.then(function(response){ 
				//return response.json(); 
				spinner.setAttribute('hidden', '');
				Swal.fire({
					icon: 'success',
					title: 'Encuentro registrado',
					showConfirmButton: false,
					timer: 2500
				});
				
				localStorage.setItem("encuentrosPaciente", "True");
				localStorage.setItem("idPacienteEncuentros",localStorage.getItem("idPaciente") );
				window.location.href = 'busquedas.html'
				
			})
			.catch(err => console.log(err))



		}

		
	}
	else{
		console.log(dataToSend)
		fetch(URLNewEncuentro, {	
			mode: 'no-cors',
			method: "POST",
			headers: headers,
			body: dataToSend
		})
		.then(function(response){ 
			//return response.json(); 
			spinner.setAttribute('hidden', '');
			Swal.fire({
				icon: 'success',
				title: 'Encuentro registrado',
				showConfirmButton: false,
				timer: 2500
			});
			
			localStorage.setItem("encuentrosPaciente", "True");
			localStorage.setItem("idPacienteEncuentros",localStorage.getItem("idPaciente") );
			window.location.href = 'busquedas.html'
			
			//window.location.href = 'busquedas.html'
		})
		.catch(err => console.log(err))

	}


})



function exit(){
window.localStorage.clear();
window.location.href = '../index.html'
}