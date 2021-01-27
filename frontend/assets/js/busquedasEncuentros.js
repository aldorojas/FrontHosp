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
    


    //////////////////////////////////// todos los pacientes
    const urlAPI = 'http://134.122.120.195/api/v1/encuentros/list';
    var divPrueba = document.getElementById('tableEncuentros')
    //divPrueba.innerHTML = ''

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
				  //console.log(PDFElectro);
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
				  //console.log(PDFExamLab);
			}
			else{
				PDFExamLab = ''
            }



            if ( data[i].eliminado == "True" ){
				var switch1 = ' <div class="custom-control custom-switch">' +
					'<input type="checkbox" checked disabled class="custom-control-input" id="customSwitch1">' +
					'<label class="custom-control-label" for="customSwitch1"></label>' +
			  	'</div>'
				  console.log(switch1);
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
                <td>
                    <button onclick="deleteEncuentro(${data[i].id_encuentro})" class="btn btn-danger btn-sm" title="Eliminar Paciente">
                        <i class="icon ion-md-trash "></i>
                    </button>
                    <button onclick="editEncuentro(${data[i].id_encuentro},${data[i].id_paciente},'${data[i].fecha_e}',
                                '${data[i].hora_e}', '${data[i].tipo_2}', '${data[i].diag_primario}',
                                '${data[i].diag_secun}', '${data[i].diag_secun2}', '${data[i].notas_clinicas}',
                                '${data[i].resultado_med_ia}', '${data[i].resultados_ia}', '${data[i].feedback_ia}',
                                ${data[i].id_medico}, ${data[i].id_hospital}, '${data[i].eliminado}' )" 
                        class="btn btn-info btn-sm" title="Editar Paciente">
                        <i class="icon ion-md-create "></i>
                    </button>
            </td>
            </tr>
            
                `
                $( "#tableEncuentros tbody" ).append(row);
     
        }
        
        $(document).ready(function(){
            $('#tableEncuentros').dataTable({
                select: true
            });
        });

        })
    .catch(err => console.log(err));



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



function editEncuentro(idEncuentro,idPaciente,fechaEncuentro,horaEncuentro,
        tipoEncuentro, diagnosticoPrimario, diagnosticoSecun, diagnosticoSecun2,
        notaClinica, resultadoMedIA, resultadoIA, feedbackIA, idMedico, idHospital,
        eliminado
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

	$('#modalEditEncuentro').modal('show');

}



var formEditEncuentro = document.getElementById('formEditEncuentro');

formEditEncuentro.addEventListener('submit', function(e){

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
    var notaClinicaEdit = document.getElementById('notaClinicaEdit')
    var resultadoMedIAEdit = document.getElementById('resultadoMedIAEdit')
    var resultadoIAEdit = document.getElementById('resultadoIAEdit')
    var feedbackIAEdit = document.getElementById('feedbackIAEdit')
    var idMedicoEdit = document.getElementById('idMedicoEdit')
    var idHospitalEdit = document.getElementById('idHospitalEdit')
    var eliminadoEdit = document.getElementById('eliminadoEdit')


    /////////// Epicrisis ///////////
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
    
    //////////////prot operatorio ////////////////////////
    var fechaRegistro = document.getElementById('fechaRegistro')
	var horaRegistro = document.getElementById('horaRegistro')
	var implantesRegistro = document.getElementById('implantesRegistro')
	var descProcedimiento = document.getElementById('descProcedimiento')
    

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{	
            "anamnesis": "",
            "cie10": "NHSHSMK",
            "date_registered": "",
            "descripcion": "",
            "diag_alta": "",
            "diag_primario": "Arritmia.test",
            "diag_secun": "Valvulopatia",
            "diag_secun2": "Bypass",
            "dias_hospitalizado": "",
            "eliminado": "False",
            "estudios_acciones": "",
            "fecha_e": "01/26/2021",
            "fecha_egreso": "",
            "fecha_ep": "",
            "fecha_hospitalizacion": "",
            "feedback_ia": "No esta bien",
            "hora_e": "05:56:22",
            "hora_ep": "",
            "id_cirugia": "",
            "id_diagnostico": 2,
            "id_encuentro": 87,
            "id_epicrisis": "",
            "id_hospital": 22,
            "id_medico": 23,
            "id_paciente": 24,
            "implantes": "",
            "indiciaciones_alta": "",
            "notas_clinicas": "",
            "resultado_med_ia": "55%",
            "resultados_ia": "99",
            "resumen_evolucion": "",
            "snomed": "877dyjs",
            "time_protocol": "",
            "tipo_2": "Cirugia",
			"ruta_audio" : Base64Audio,
			"ruta_exam_lab" : base64ExamLab,
			"ruta_exam_electro" : base64Electro
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























const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {
	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})
