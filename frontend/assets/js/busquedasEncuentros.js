window.onload = (function(){
	//console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
	  //console.log("si es admin")
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
    const urlAPI = 'http://134.122.120.195/api/v1/encuentros/list/1';
    AllEncuentros(urlAPI)
    
})


//////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico
}



function AllEncuentros(urlAPI){
    //////////////////////////////////// todos los pacientes
    //const urlAPI = 'http://134.122.120.195/api/v1/encuentros/list/1';
    fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(var i = 0; i < data.length; i++){
            ////////////// Audio ////////////////////
            if ( data[i].ruta_audio != '' ){
				var audio = 
                `<a href="http://134.122.120.195/files/${data[i].ruta_audio}">` + 
                    '<img src="../assets/img/mp3Logo.png" height="50px" width="45px">' + 
                '</a>'
				  //console.log(audio);
			}
			else{
				audio = ''
            }

            /////////////////////////////
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


            ///////////////////////////////////////////
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
            

            var row = `
            <tr>
                <td scope="row" data-label="Id"> ${data[i].id_encuentro} </td>
                <td data-label="IdPaciente"> ${data[i].id_paciente}</td>
                <td data-label="Fecha"> ${data[i].fecha_e}</td>
                <td data-label="Hora">${data[i].hora_e}</td>
                <td data-label="Tipo encuentro">${data[i].tipo_2}</td>
                <td data-label="Diag primario">${data[i].diag_primario}</td>
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
                <td data-label="Resul IA">${data[i].resultados_ia}</td>
                <td data-label="Feedback IA">${data[i].feedback_ia}</td>
                <td data-label="Id medico">${data[i].id_medico}</td>
                <td data-label="Id hospital">${data[i].id_hospital}</td>
                <td data-label="Eliminado">${switch1}</td>

                <td data-label="Epicrisis">
                    <button type="button" class="btn btn-primary"
                        onclick="loadModalEpi('${data[i].id_epicrisis}','${data[i].fecha_ep}', '${data[i].hora_ep}',
                        '${data[i].fecha_hospitalizacion}', '${data[i].fecha_egreso}','${data[i].dias_hospitalizado}',
                        '${data[i].diag_alta}', '${data[i].anamnesis}', '${data[i].estudios_acciones}', '${data[i].indiciaciones_alta}',
                        '${data[i].resumen_evolucion}' )">
                        Epicrisis
                    </button>
                </td>
               

                <td data-label="Cirugia">
                    <button type="button" class="btn btn-primary"
                        onclick="loadModalCirugia('${data[i].id_cirugia}', '${data[i].date_registered}', '${data[i].time_protocol}', 
                        '${data[i].implantes}', '${data[i].descripcion}' )">
                        Cirugia
                    </button>
                </td>
    
                
                <td data-label="Acciones">
                    <button onclick="deleteEncuentro(${data[i].id_encuentro})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
                        <i class="icon ion-md-trash "></i>
                    </button>
                    <button onclick="editEncuentro(${data[i].id_encuentro},${data[i].id_paciente},'${data[i].fecha_e}',
                                '${data[i].hora_e}', '${data[i].tipo_2}', '${data[i].diag_primario}',
                                '${data[i].diag_secun}', '${data[i].diag_secun2}', '${data[i].notas_clinicas}',
                                '${data[i].resultado_med_ia}', '${data[i].resultados_ia}', '${data[i].feedback_ia}',
                                ${data[i].id_medico}, ${data[i].id_hospital}, '${data[i].eliminado}', '${data[i].fecha_ep}',
                                '${data[i].hora_ep}', '${data[i].fecha_hospitalizacion}', '${data[i].fecha_egreso}',
                                '${data[i].dias_hospitalizado}', '${data[i].diag_alta}', '${data[i].anamnesis}',
                                '${data[i].estudios_acciones}', '${data[i].indiciaciones_alta}', '${data[i].resumen_evolucion}',
                                '${data[i].date_registered}', '${data[i].time_protocol}', 
                                '${data[i].implantes}', '${data[i].descripcion}', '${data[i].id_epicrisis}', '${data[i].id_cirugia}')" 
                        class="btn btn-info btn-sm" title="Editar Paciente">
                        <i class="icon ion-md-create "></i>
                    </button>
            </td>
            </tr>
            
                `


            $( "#tableEncuentros tbody" ).append(row);
     
        }
        
        // $(document).ready(function(){
        //     $('#tableEncuentros').dataTable({
        //         select: true
        //     });
        // });

        })
    .catch(err => console.log(err));

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




function editEncuentro(idEncuentro,idPaciente,fechaEncuentro,horaEncuentro,
        tipoEncuentro, diagnosticoPrimario, diagnosticoSecun, diagnosticoSecun2,
        notaClinica, resultadoMedIA, resultadoIA, feedbackIA, idMedico, idHospital,
        eliminado,fechaEpicrisis,horaEpicrisis,fechaHospitalizacion,fechaEgreso,
        diasHospitalizado,diagnosticoAlta,anamnesis,estudiosAcciones, indicacionesAlta,
        resumenEvolucion, dateResgistered, timeProtocol, implantes, descripcion,
        idEpicrisis, idCirugia
        ){
	
    var idEncuentroEdit = document.getElementById('idEncuentroEdit')	
    var idPacienteEdit = document.getElementById('idPacienteEdit')	
    var fechaEncuentroEdit = document.getElementById('fechaEncuentroEdit')	
    var horaEncuentroEdit = document.getElementById('horaEncuentroEdit')
    var tipoEncuentroEdit = document.getElementById('tipoEncuentroEdit')
    var diagPrimarioEdit = document.getElementById('diagPrimarioEdit')
    var diagSecun1Edit = document.getElementById('diagSecundario1Edit')
    var diagSecun2Edit = document.getElementById('diagSecundario2Edit')
    
    var notaClinicaEdit = document.getElementById('notaClinicaEdit')
    var resultadoMedIAEdit = document.getElementById('resultadoMedIAEdit')
    var resultadoIAEdit = document.getElementById('resultadoIAEdit')
    var feedbackIAEdit = document.getElementById('feedbackIAEdit')
    var idMedicoEdit = document.getElementById('idMedicoEdit')
    var idHospitalEdit = document.getElementById('idHospitalEdit')
    var eliminadoEdit = document.getElementById('eliminadoEdit')

    var fechaEpicrisisEdit = document.getElementById('fechaEpicrisisEdit')
    var horaEpicrisisEdit = document.getElementById('horaEpicrisisEdit')
    var fechaHospitalizacionEdit = document.getElementById('fechaHospitalizacionEdit')
    var fechaEgresoEdit = document.getElementById('fechaEgresoHospitalEdit')
    var diasHospEdit = document.getElementById('diasHospitalizacionEdit')
    var diagAltaEdit = document.getElementById('diagAltaEdit')
    var anamnesisEdit = document.getElementById('anamnesisEdit')
    var estudiosAccionesEdit = document.getElementById('estudiosAccionesEdit')
    var indicacionesAltaEdit = document.getElementById('indicacionesAltaEdit')
    var resumenEvoEdit = document.getElementById('resumenEvolucionEdit')

    var fechaProtOperaEdit = document.getElementById('fechaProtOperaEdit')
    var horaProtOperaEdit = document.getElementById('horaProtOperaEdit')
    var implantesEdit = document.getElementById('implantesProtEdit')
    var descProtEdit = document.getElementById('descProtOperaEdit')

    var idEpicrisisEdit = document.getElementById('idEpicrisis')
    var idCirugiaEdit = document.getElementById('idCirugia')
    

    idEncuentroEdit.value = idEncuentro;
    idPacienteEdit.value = idPaciente;
    fechaEncuentroEdit.value = fechaEncuentro;
    horaEncuentroEdit.value = horaEncuentro;
    tipoEncuentroEdit.value = tipoEncuentro;
    diagPrimarioEdit.value = diagnosticoPrimario;
    diagSecun1Edit.value = diagnosticoSecun;
    diagSecun2Edit.value = diagnosticoSecun2;
    notaClinicaEdit.value = notaClinica;
    resultadoMedIAEdit.value = resultadoMedIA;
    resultadoIAEdit.value = resultadoIA;
    feedbackIAEdit.value = feedbackIA;
    idMedicoEdit.value = idMedico;
    idHospitalEdit.value = idHospital;
    eliminadoEdit.value = eliminado;

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

    fechaProtOperaEdit.value = dateResgistered;
    horaProtOperaEdit.value = timeProtocol;
    implantesEdit.value = implantes;
    descProtEdit.value = descripcion;

    idEpicrisisEdit.value = idEpicrisis;
    idCirugiaEdit.value = idCirugia;



	$('#modalEditEncuentro').modal('show');

}



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




var formEditEncuentro = document.getElementById('formEditEncuentro');

formEditEncuentro.addEventListener('submit',async function(e){

	const URLEditEncuentro = 'http://134.122.120.195/api/v1/encuentro/update';
	e.preventDefault()
    
    var idEncuentroEdit = document.getElementById('idEncuentroEdit')	
    var idPacienteEdit = document.getElementById('idPacienteEdit')	
    var fechaEncuentroEdit = document.getElementById('fechaEncuentroEdit')	
    var horaEncuentroEdit = document.getElementById('horaEncuentroEdit')
    var tipoEncuentroEdit = document.getElementById('tipoEncuentroEdit')
    var diagPrimarioEdit = document.getElementById('diagPrimarioEdit')
    var diagSecun1Edit = document.getElementById('diagSecundario1Edit')
    var diagSecun2Edit = document.getElementById('diagSecundario2Edit')
    
    var idEpicrisis = document.getElementById('idEpicrisis')
    var idCirugia = document.getElementById('idCirugia')

    var notaClinicaEdit = document.getElementById('notaClinicaEdit')
    var resultadoMedIAEdit = document.getElementById('resultadoMedIAEdit')
    var resultadoIAEdit = document.getElementById('resultadoIAEdit')
    var feedbackIAEdit = document.getElementById('feedbackIAEdit')
    var idMedicoEdit = document.getElementById('idMedicoEdit')
    var idHospitalEdit = document.getElementById('idHospitalEdit')
    var eliminadoEdit = document.getElementById('eliminadoEdit')

    var fechaEpicrisisEdit = document.getElementById('fechaEpicrisisEdit')
    var horaEpicrisisEdit = document.getElementById('horaEpicrisisEdit')
    var fechaHospitalizacionEdit = document.getElementById('fechaHospitalizacionEdit')
    var fechaEgresoEdit = document.getElementById('fechaEgresoHospitalEdit')
    var diasHospEdit = document.getElementById('diasHospitalizacionEdit')
    var diagAltaEdit = document.getElementById('diagAltaEdit')
    var anamnesisEdit = document.getElementById('anamnesisEdit')
    var estudiosAccionesEdit = document.getElementById('estudiosAccionesEdit')
    var indicacionesAltaEdit = document.getElementById('indicacionesAltaEdit')
    var resumenEvoEdit = document.getElementById('resumenEvolucionEdit')

    var fechaProtOperaEdit = document.getElementById('fechaProtOperaEdit')
    var horaProtOperaEdit = document.getElementById('horaProtOperaEdit')
    var implantesEdit = document.getElementById('implantesProtEdit')
    var descProtEdit = document.getElementById('descProtOperaEdit')

    ///////////////////// Audio //////////////////////////
    let Base64Audio = "";

	if (document.getElementById('audioEncuentroEdit').files.length == 0) {
		Base64Audio = "";
	}
	else{
		let audioBase64 = document.getElementById('audioEncuentroEdit').files;
		let promise = getBase64(audioBase64);
		Base64Audio = await promise;
	}

	// PDFs //
	let base64Electro = "";

	if (document.getElementById('inputFileElectroEdit').files.length == 0) {
		base64Electro = "";
	}
	else{
		let PDFElectro = document.getElementById('inputFileElectroEdit').files;
		let promise = getBase64(PDFElectro);
		base64Electro = await promise;
	}
    

	let base64ExamLab = "";
	
	if (document.getElementById('inputFileExamLabEdit').files.length == 0) {
		base64ExamLab = "";
	}
	else{
		let PDFExamLab = document.getElementById('inputFileExamLabEdit').files;
		let promise2 = getBase64(PDFExamLab);
		base64ExamLab = await promise2;
	}



	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{	
            "anamnesis": anamnesisEdit.value,
            "cie10": "NHSHSMK",
            "date_registered": fechaProtOperaEdit.value,
            "descripcion": descProtEdit.value,
            "diag_alta": diagAltaEdit.value,
            "diag_primario": diagPrimarioEdit.value,
            "diag_secun": diagSecun1Edit.value,
            "diag_secun2": diagSecun2Edit.value,
            "dias_hospitalizado": diasHospEdit.value,
            "eliminado": eliminadoEdit.value,
            "estudios_acciones": estudiosAccionesEdit.value,
            "fecha_e": fechaEncuentroEdit.value,  
            "fecha_egreso": fechaEgresoEdit.value,
            "fecha_ep": fechaEpicrisisEdit.value,
            "fecha_hospitalizacion": fechaHospitalizacionEdit.value,
            "feedback_ia": feedbackIAEdit.value,
            "hora_e": horaEncuentroEdit.value,
            "hora_ep": horaEpicrisisEdit.value,
            "id_cirugia": idCirugia.value,
            "id_diagnostico": 2,
            "id_encuentro": idEncuentroEdit.value,
            "id_epicrisis": idEpicrisis.value,
            "id_hospital": idHospitalEdit.value,
            "id_medico": idMedicoEdit.value,
            "id_paciente": idPacienteEdit.value,
            "implantes": implantesEdit.value,
            "indiciaciones_alta": indicacionesAltaEdit.value,
            "notas_clinicas": notaClinicaEdit.value,
            "resultado_med_ia": resultadoMedIAEdit.value,
            "resultados_ia": resultadoIAEdit.value,
            "resumen_evolucion": resumenEvoEdit.value,
            "snomed": "877dyjs",
            "time_protocol": horaProtOperaEdit.value,
            "tipo_2": tipoEncuentroEdit.value,
			"ruta_audio" : Base64Audio,
			"ruta_exam_lab" : base64ExamLab,
			"ruta_exam_electro" : base64Electro
        });
        
    console.log(dataToSend)
    

    // PDFs //
	
	  ////////////
	  var fechaRegistro = document.getElementById('fechaProtOperaEdit')
	  var horaRegistro = document.getElementById('horaProtOperaEdit')
	  var implantesRegistro = document.getElementById('implantesProtEdit')
	  var descProcedimiento = document.getElementById('descProtOperaEdit')
  
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
      
      ////// -------------------- ///////////////////////

         // PDFs //
	  ////////////

	  var fechaEpicrisis = document.getElementById('fechaEpicrisisEdit')
	  var horaEpicrisis = document.getElementById('horaEpicrisisEdit')
	  var fechaHospitalizacion = document.getElementById('fechaHospitalizacionEdit')
	  var fechaEgresoHospital = document.getElementById('fechaEgresoHospitalEdit')
	  var diasHospitalizado = document.getElementById('diasHospitalizacionEdit')
	  var anamnesis = document.getElementById('anamnesisEdit')
	  var estudiosAcciones = document.getElementById('estudiosAccionesEdit')
	  var resumenEvolucion = document.getElementById('resumenEvolucionEdit')
	  var indicacionesAlta = document.getElementById('indicacionesAltaEdit')
	  var doctorAlta = document.getElementById('doctorAlta')

	  
  
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
	  doc.rect(20, 125, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('MEDICO TRATANTE:', 21, 130)

	  doc.rect(60, 125, 55, 10 )
	  doc.setFontType("normal");
	  doc.text(localStorage.getItem("nombreMedico") + ' ' + localStorage.getItem("apellidosMedico"), 61, 130)
	
	  doc.rect(115, 125, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('ESPECIALIDAD:', 116, 130)

	  doc.rect(155, 125, 35, 10 )
	  doc.setFontType("normal");
	  doc.text('', 151, 130)

	//   ////////////////////////renglon 5
	  doc.rect(20, 135, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('MEDICO RESP. ALTA:', 21, 140)

	  doc.rect(60, 135, 55, 10 )
	  doc.setFontType("normal");
	  doc.text(doctorAlta.value, 61, 140)

	  doc.rect(115, 125, 40, 10 )
	  doc.setFontType("bold");
	  doc.text('ESPECIALIDAD:', 116, 140)

	  doc.rect(155, 135, 35, 10 )
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



      
	fetch(URLEditEncuentro, {
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
			title: 'Encuentro editado',
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





function deleteEncuentro(idEncuentro){
    const URLDeleteEncuentro = 'http://134.122.120.195/api/v1/encuentro/' + idEncuentro ;

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
            fetch(URLDeleteEncuentro, {
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
            'El encuentro fue eliminado.',
            'success'
            )
        }
    })
}





var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')

function numberPages(){
    urlAPIPages = 'http://134.122.120.195/api/v1/encuentros/list_registers?type_e=all&patient=';
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



var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')


function perPage(numPage){
    console.log(numPage)
    urlEncuentrosPagina = 'http://134.122.120.195/api/v1/encuentros/list/' + numPage;
    //console.log(urlEncuentrosPagina)
    var divPrueba = document.getElementById('resultadosEncuentros')
    divPrueba.innerHTML = ''

    
    fetch(urlEncuentrosPagina)
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
        console.log(data)
        AllEncuentros(urlEncuentrosPagina)
        numberPages()
	});
}



function numberPagesBusqueda(numRegistros, URLAPI){
    //urlAPIPages = 'http://134.122.120.195/api/v1/encuentros/list_registers?type_e=all&patient=';
    pagesHtml =  ''
    console.log('numero de reg de busqueda: '+ numRegistros)

    var botones =  numRegistros/10
    console.log(botones)
    botones = Math.ceil(botones)
    console.log(botones)

    for(var i = 1; i < botones + 1; i++){

        pagesHtml += `
        <td>
            <button onclick="perPageBusqueda(${i*10 - 9}, ${numRegistros}, '${URLAPI}' )" class="btn btn-danger btn-sm">
                ${i}
            </button>
        </td>
        `
          
    }
    divpieTable.innerHTML = pagesHtml  

}

function perPageBusqueda(numPage, numRegs , URLAPI){
    console.log(numPage)
    urlEncuentrosFecha = URLAPI;
    console.log(urlEncuentrosFecha)
    var divPrueba = document.getElementById('resultadosEncuentros')
    divPrueba.innerHTML = ''

    
    fetch(urlEncuentrosFecha)
	.then(function(response){ 
		return response.json(); 
	})
	.then(function(data){ 
        console.log(data)
        encuentrosPorBusqueda(urlEncuentrosFecha)
        numberPagesBusqueda(numRegs)
	});
}









function encuentrosPorBusqueda(URLFindEncuentroDate){
    var headers = {
        "Content-Type": "application/json"
     }

     var divPrueba = document.getElementById('resultadosEncuentros')
    divPrueba.innerHTML = ''

    fetch(URLFindEncuentroDate, {
        headers: headers
    })
    .then(function(response){ 
        return response.json(); 
    })
    .then(function(data){ 
        var botones =  data[0]/10
        botones = Math.ceil(botones)
        console.log('botonoes' + botones)
        divpieTable.innerHTML = ''

        console.log('numero de registros: ' + data[0])
        var datos = data[1]

        numberPagesBusqueda( data[0], URLFindEncuentroDate)

        if(data[0].length != 0){
            for(var i = 0; i < datos.length; i++){
    
                if ( datos[i].ruta_audio != '' ){
                    var audio = 
                    `<a href="http://134.122.120.195/files/${datos[i].ruta_audio}">` + 
                        '<img src="../assets/img/mp3Logo.png" height="50px" width="45px">' + 
                    '</a>'
                      //console.log(audio);
                }
                else{
                    audio = ''
                }
    
                /////////////////////////////
                if ( datos[i].ruta_exam_electro != '' ){
                    var PDFElectro = 
                    `<a href="http://134.122.120.195/files/${datos[i].ruta_exam_electro}">` + 
                        '<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
                    '</a>'
                }
                else{
                    PDFElectro = ''
                }
                
                ///////////////////////////////77
                if ( datos[i].ruta_exam_lab != '' ){
                    var PDFExamLab = 
                    `<a href="http://134.122.120.195/files/${datos[i].ruta_exam_lab}">` + 
                        '<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
                    '</a>'
                }
                else{
                    PDFExamLab = ''
                }
    
    
                ///////////////////////////////////////////
                if ( datos[i].eliminado == "True" ){
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
                
    
                var row = `
                <tr>
                    <th scope="row" data-label="Id"> ${datos[i].id_encuentro} </th>
                    <td data-label="Id paciente"> ${datos[i].id_paciente}</td>
                    <td data-label="Fecha"> ${datos[i].fecha_e}</td>
                    <td data-label="Hora">${datos[i].hora_e}</td>
                    <td data-label="Tipo encuentro">${datos[i].tipo_2}</td>
                    <td data-label="Diag primario">${datos[i].diag_primario}</td>
                    <td data-label="Diag sec">${datos[i].diag_secun}</td>
                    <td data-label="Diag sec 2">${datos[i].diag_secun2}</td>
                    <td data-label="Audio">
                        ${audio}
                    </td>
                    <td data-label="PDF Electro">
                        ${PDFElectro}
                    </td>
                    <td data-label="PDF Exam Lab">
                        ${PDFExamLab}
                    </td>
                    <td data-label="Notas clinicas">${datos[i].notas_clinicas}</td>
                    <td data-label="Res Med IA">${datos[i].resultado_med_ia}</td>
                    <td data-label="Resul IA">${datos[i].resultados_ia}</td>
                    <td data-label="Feedbaack IA">${datos[i].feedback_ia}</td>
                    <td data-label="Id Medico">${datos[i].id_medico}</td>
                    <td data-label="Id Hospital">${datos[i].id_hospital}</td>
                    <td data-label="Eliminado">${switch1}</td>
    
                    <td data-label="Epicrisis">
                        <button type="button" class="btn btn-primary"
                            onclick="loadModalEpi('${datos[i].id_epicrisis}','${datos[i].fecha_ep}', '${datos[i].hora_ep}',
                            '${datos[i].fecha_hospitalizacion}', '${datos[i].fecha_egreso}','${datos[i].dias_hospitalizado}',
                            '${datos[i].diag_alta}', '${datos[i].anamnesis}', '${datos[i].estudios_acciones}', '${datos[i].indiciaciones_alta}',
                            '${datos[i].resumen_evolucion}' )">
                            Epicrisis
                        </button>
                    </td>
               

                    <td data-label="Cirugia">
                        <button type="button" class="btn btn-primary"
                        onclick="loadModalCirugia('${datos[i].id_cirugia}', '${datos[i].date_registered}', '${datos[i].time_protocol}', 
                        '${datos[i].implantes}', '${datos[i].descripcion}' )">
                            Cirugia
                        </button>
                    </td>
        
                    
                    <td data-label="Acciones">
                        <button onclick="deleteEncuentro(${datos[i].id_encuentro})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
                            <i class="icon ion-md-trash "></i>
                        </button>
                        <button onclick="editEncuentro(${datos[i].id_encuentro},${datos[i].id_paciente},'${datos[i].fecha_e}',
                                    '${datos[i].hora_e}', '${datos[i].tipo_2}', '${datos[i].diag_primario}',
                                    '${datos[i].diag_secun}', '${datos[i].diag_secun2}', '${datos[i].notas_clinicas}',
                                    '${datos[i].resultado_med_ia}', '${datos[i].resultados_ia}', '${datos[i].feedback_ia}',
                                    ${datos[i].id_medico}, ${datos[i].id_hospital}, '${datos[i].eliminado}', '${datos[i].fecha_ep}',
                                    '${datos[i].hora_ep}', '${datos[i].fecha_hospitalizacion}', '${datos[i].fecha_egreso}',
                                    '${datos[i].dias_hospitalizado}', '${datos[i].diag_alta}', '${datos[i].anamnesis}',
                                    '${datos[i].estudios_acciones}', '${datos[i].indiciaciones_alta}', '${datos[i].resumen_evolucion}',
                                    '${datos[i].date_registered}', '${datos[i].time_protocol}', 
                                    '${datos[i].implantes}', '${datos[i].descripcion}', '${datos[i].id_epicrisis}', '${datos[i].id_cirugia}')" 
                            class="btn btn-info btn-sm" title="Editar Paciente">
                            <i class="icon ion-md-create "></i>
                        </button>
                </td>
                </tr>
                
                    `
                //$( "#tableEncuentros tbody" ).append(row);
             
               divPrueba.innerHTML += row
            }
    
        }
        if(data[0] == 0){
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
        }

    });
}






//////////////////////     Function cambiar formato fecha  //////////////////////////////////
function formatCourseDate(date) {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
}
/////////////////////////// Busqueda de encuentro por Fecha ////////////

document.getElementById("btnFindDate").addEventListener("click", function(event){
	event.preventDefault()
    var dateEncuentroFind = document.getElementById('dateEncuentroFind');
    const [year, month, day] = dateEncuentroFind.value.split('-');
    const dateObj = {month, day, year};
    var newDate = month + '/' + day + '/' + year

    
	const URLFindEncuentroDate = 'http://134.122.120.195/api/v1/encuentros_per_type?type=fecha&data='+ newDate +'&entry_n=1';
    //console.log(URLFindEncuentroDate)


    encuentrosPorBusqueda(URLFindEncuentroDate)

  });
  ///////////////////////////////


  /////////////////////////////// Busqueda de encuentro por Tipo encuentro ///////////////

document.getElementById("btnFindTipoEncuentro").addEventListener("click", function(event){
	event.preventDefault()
    var tipoEncuentroFind = document.getElementById('tipoEncuentroFind');
    
	const URLFindTipoEncuentro = 'http://134.122.120.195/api/v1/encuentros_per_type?type=tipo&data='+ tipoEncuentroFind.value + '&entry_n=1';
    //console.log(URLFindTipoEncuentro)
    

    encuentrosPorBusqueda(URLFindTipoEncuentro)
  });















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
  //document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda1").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 2 ? 'block' : 'none';
}



