window.onload = (function(){
	//console.log(localStorage.getItem("Admin")); 
	if(localStorage.getItem("Admin")== "true"){
	  //console.log("si es admin")
	  document.getElementById("moduloAdminMed").style.display = 'block'
	    document.getElementById("moduloAdminHosp").style.display = 'block'
	}

    numberPages();

    


    //////////////////////////////////// todos los pacientes
    const urlAPI = 'http://134.122.120.195/api/v1/encuentros/list/1';
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
				  console.log(audio);
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
                <th scope="row"> ${data[i].id_encuentro} </th>
                <td> ${data[i].id_paciente}</td>
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
                <td>${switch1}</td>

                <td>${data[i].id_epicrisis}</td>
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

                <td>${data[i].id_cirugia}</td>
                <td>${data[i].date_registered}</td>
                <td>${data[i].time_protocol}</td>
                <td>${data[i].descripcion}</td>
                <td>${data[i].implantes}</td>
    
                
                <td>
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

})

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
                <th scope="row"> ${data[i].id_encuentro} </th>
                <td> ${data[i].id_paciente}</td>
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
                <td>${switch1}</td>

                <td>${data[i].id_epicrisis}</td>
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

                <td>${data[i].id_cirugia}</td>
                <td>${data[i].date_registered}</td>
                <td>${data[i].time_protocol}</td>
                <td>${data[i].descripcion}</td>
                <td>${data[i].implantes}</td>
    
                
                <td>
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
            //$( "#tableEncuentros tbody" ).append(row);
            divPrueba.innerHTML += row
           
            
        }

        numberPages()
	});
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
            "fecha_e": fechaEncuentroEdit,  
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






















const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {
	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})


