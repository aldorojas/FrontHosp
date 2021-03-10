////////////////// Al cargar la pagina /////////////////
/// Validacion de modulo Admin y login

window.onload = (function(){
    console.log(localStorage.getItem("Admin")); 
    localStorage.setItem("encuentrosPaciente", "False");

	if(localStorage.getItem("Admin")== "true"){
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


///////////////// Mostrar Nombre del modico logueado	///////////////////////////////

function loadMedico(){
	var medico = localStorage.getItem("nombreMedico")
	document.getElementById("navbarDropdown").innerHTML += medico	
}



///////////////////////////////  Animacion del toggle /////////////////////////////////
const opcion = document.querySelectorAll('.opcion');
opcion.forEach(e => {

	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})

//////////////////////// mostrar formulario de busqueda Paciente /////////////////////////
function showDivBusqueda(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("formBusqueda1").style.display = element.value == 0 ? 'block' : 'none';
  document.getElementById("formBusqueda2").style.display = element.value == 1 ? 'block' : 'none';
  document.getElementById("formBusqueda3").style.display = element.value == 2 ? 'block' : 'none';
  document.getElementById("formBusqueda4").style.display = element.value == 3 ? 'block' : 'none';
}

  //////////////////////////////////////////////////////////////////

  function toEncuentros(idPaciente,nombrePaciente,apellidosPaciente,
						fechaNacimientoPaciente,sexoPaciente,edadPaciente,
						telefonoPaciente,rutPaciente,direccionPaciente){
	localStorage.setItem("idPaciente", idPaciente);
    localStorage.setItem("idPacienteEncuentros", idPaciente);
	localStorage.setItem("nombrePaciente", nombrePaciente);
	localStorage.setItem("apellidosPaciente", apellidosPaciente);
	localStorage.setItem("fechaNacimientoPaciente", fechaNacimientoPaciente);
	localStorage.setItem("sexoPaciente", sexoPaciente);
	localStorage.setItem("edadPaciente", edadPaciente);
	localStorage.setItem("telefonoPaciente", telefonoPaciente);
	localStorage.setItem("rutPaciente", rutPaciente);
    localStorage.setItem("direccionPaciente", direccionPaciente);
	window.location.href = 'encuentros.html'
  }


  ////////////////////////////////////////////////////////
var container2 = document.getElementById('encuentrosPaciente');
function verEncuentros(idPaciente, nombrePaciente,apellidosPaciente,
    fechaNacimientoPaciente,sexoPaciente,edadPaciente,
    telefonoPaciente,rutPaciente,direccionPaciente){

    container2.innerHTML = ''
    getDataEncuentros(1, idPaciente,nombrePaciente,apellidosPaciente,
        fechaNacimientoPaciente,sexoPaciente,edadPaciente,
        telefonoPaciente,rutPaciente,direccionPaciente )

    


}


  
//////////////////// Mostrar todos los pacientes ///////////////////////////////////
var pagesHtml = ''
var divpieTable = document.getElementById('paginasBotones')


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


function formatCourseDate(date) {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
}


let page = 1;
var scrolling
var container = document.getElementById('card');

////////////////////////// Busqueda Nombre //////////////////////////////
var formSearchNombre= document.getElementById('formBusqueda3');
formSearchNombre.addEventListener("submit", function(event){
	event.preventDefault()
	var nombrePacienteFind = document.getElementById('nombrePacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchNombre'    
    getDataNombre(1, nombrePacienteFind.value )

  });

  //////////////////////////////Busqueda por Rut  ////////////////////////////7
  var formSearchRut= document.getElementById('formBusqueda1');
  formSearchRut.addEventListener("submit", function(event){
	event.preventDefault()
	var rutPacienteFind = document.getElementById('rutPacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchRut'    
    getDataRut(1, rutPacienteFind.value )

  });

///////////////////////////////////////////// Buscar por pasaporte ///////////////////////
var formSearchPasaporte= document.getElementById('formBusqueda2');
formSearchPasaporte.addEventListener("submit", function(event){
	event.preventDefault()
	var pasaportePacienteFind = document.getElementById('pasaportePacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchPasaporte'    
    getDataPasaporte(1, pasaportePacienteFind.value )

	
  });

////////////////////////////////	Busqueda por fecha de nacimiento ///////////////////////////////////////
var formSearchBirthDay= document.getElementById('formBusqueda4');
formSearchBirthDay.addEventListener("submit", function(event){
	event.preventDefault()
	var birthdayPacienteFind = document.getElementById('birthdayPacienteFind');
	container.innerHTML = ''

	scrolling = 'SearchBirthday'    
    getDataBirthday(1, birthdayPacienteFind.value )

	
  });
  
  ////////////////////////////////	Mostrar pacientes ordenados  ///////////////////////////////////////
var formAllPacientes= document.getElementById('allPacientes');
formAllPacientes.addEventListener("submit", function(event){
	event.preventDefault()
	container.innerHTML = ''

	scrolling = 'PacientesOrdenados'    
    getDataTodos(1)

  });



const loader = document.querySelector('.loader');
const divPrueba = document.getElementsByClassName('card')
const divTest = document.getElementById('content')
const divScrollModal = document.getElementsByClassName('divTableModal')



const httpRequestWrapper = (method, URL) => {
    return new Promise((resolve, reject) => {
      const xhr_obj = new XMLHttpRequest();
      xhr_obj.responseType = "json";
      xhr_obj.open(method, URL);
      xhr_obj.onload = () => {
        const data = xhr_obj.response;
        resolve(data);
        console.log(data)
      };
      xhr_obj.onerror = () => {
        reject("failed");
      };
      xhr_obj.send();
    });
  };

///////////////  busueda con scroll  ///////////////////////

divTest.addEventListener('scroll', () => {
	if (divTest.scrollTop + divTest.clientHeight >= divTest.scrollHeight) {
        page = page + 10;
        console.log(page)

		if(scrolling == 'SearchNombre'){
			console.log('Buscando por nombre')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataNombre(page);
            }, 2000);
        }
		if(scrolling == 'SearchRut'){
			console.log('Buscando por rut')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataRut(page);
            }, 2000);
        }
		if(scrolling == 'SearchPasaporte'){
			console.log('Buscando por pasaporte')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataPasaporte(page);
            }, 2000);
        }
		if(scrolling == 'SearchBirthday'){
			console.log('Buscando por fecha de nacimiento')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataBirthday(page);
            }, 2000);
        }
        if(scrolling == 'PacientesOrdenados'){
			console.log('Buscando todas')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataTodos(page);
            }, 2000);
        }
	}
});
///////////////  busueda con scroll  ///////////////////////
var lastScrollTop = 0;
divScrollModal[0].addEventListener('scroll', () => {
    var st = divScrollModal[0].pageYOffset || divScrollModal[0].scrollTop; 
    if (st > lastScrollTop){
        if (divScrollModal[0].scrollTop + divScrollModal[0].clientHeight >= divScrollModal[0].scrollHeight) {        
            page = page + 10;
            console.log('Buscando por encuentros por paciente')
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
                getDataEncuentros(page);
            }, 2000);
        }
    }
    
    
});




//////////////////////////////////////peticiones de pacientes por nombre
const getDataNombre = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=nombre&data='+ paramSearch + '&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
///////////////////////////////////////////////peticiones de pacientes por rut
const getDataRut = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=rut&data=' + paramSearch +'&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
///////////////////////////////////////////////////peticiones de pacientes por pasaporte
const getDataPasaporte = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=pasaporte&data='+ paramSearch + '&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
//////////////////////////////////////////////////peticiones de pacientes por birth_date 
const getDataBirthday = async (page_no = 1, paramSearch) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes_per_type?type=birth_date&data='+ paramSearch + '&entry_n=' + `${page_no}`
    );
    
    if (data[0]== 0){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data[1]);
    }
};
//////////////////////////////////////peticion de todos los pacientes registrados
const getDataTodos = async (page_no = 1,) => {
    const data = await httpRequestWrapper(
    "GET",
	'http://134.122.120.195/api/v1/pacientes/list_ord_name_date/' + `${page_no}`
    );
    
    if (data == ''){
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
                title: 'Sin resultados'
            })
    }
    else{
        populateUI(data);
    }
};
/////////////////////////////////
const getDataEncuentros = async (page_no = 1, idPaciente, nombrePaciente,apellidosPaciente,
    fechaNacimientoPaciente,sexoPaciente,edadPaciente,
    telefonoPaciente,rutPaciente,direccionPaciente) => {
    
    localStorage.setItem("encuentrosPaciente", "True");
    localStorage.setItem("idPaciente", idPaciente);
    localStorage.setItem("idPacienteEncuentros", idPaciente);
	localStorage.setItem("nombrePaciente", nombrePaciente);
	localStorage.setItem("apellidosPaciente", apellidosPaciente);
	localStorage.setItem("fechaNacimientoPaciente", fechaNacimientoPaciente);
	localStorage.setItem("sexoPaciente", sexoPaciente);
	localStorage.setItem("edadPaciente", edadPaciente);
	localStorage.setItem("telefonoPaciente", telefonoPaciente);
	localStorage.setItem("rutPaciente", rutPaciente);
    localStorage.setItem("direccionPaciente", direccionPaciente);

	window.location.href = 'busquedas.html'

    
};

/////////////////////////////función para llenado de tabla paciente Correspondiente a la vista busquedasPacientes.html
  
const populateUI = data => {
    data && 
    data.length && 
    data
    .map((each,index)=>{
      const {id,nombre,apellido,rut,sexo,birth_date,alergias,tipo_sangre,direccion,
		telefono,pasaporte,edad  } = each;
        ///////////////////////////////
       

      container.innerHTML += 
      `
	  	<div class="blog-post">
			<div class="blog-post_img">
				<img src="../assets/img/avatarCard.png">
			</div>
			<div class="blog-post_info"> 
				<label class="form-check-label" for="paciente${id}">
                </label>
				Paciente  ${id} : <a href='#' onclick="verEncuentros(${id}, '${nombre}', 
                                        '${apellido}', '${birth_date}',
                                        '${sexo}', '${edad}','${telefono}',
                                        '${rut}', '${direccion}')"> 
                 ${nombre} ${apellido} 
                 </a> 
				

				<div class="blog-post_date">
					<span> Rut: ${rut}</span>
					<span> Sexo:  ${sexo}</span>
					<span> Fecha de nacimiento:  ${birth_date}</span>
					<span> Alergias: ${alergias} </span>
					<span> Tipo sangre: ${tipo_sangre} </span>
					<span> Direccion: ${direccion}</span> 
					<span> Telefono:  ${telefono}</span>
					<span> Pasaporte: ${pasaporte}</span>
				</div>
				<div class="row">
					
					<div class="col-lg-10 col-md-6 stat text-center ">  	
						<button type="button" class="btn btn-primary" 
							onclick="toEncuentros(${id}, '${nombre}', 
										'${apellido}', '${birth_date}',
										'${sexo}', '${edad}','${telefono}',
										'${rut}', '${direccion}')"> 
							Crear encuentro
						</button>	                                  
					</div> 
				</div>
			</div>
		
		</div>
      
      `
    })
  
  }




////////////función para llenado de tabla encuentro Correspondiente a la vista busquedasPaciente.html
  const populateEncuentros = data => {
    data && 
    data.length && 
    data
    .map((each,index)=>{
      const {ruta_audio,ruta_exam_electro,ruta_exam_lab,eliminado,id_encuentro, fecha_e, hora_e,
        tipo_2,diag_primario,diag_secun, diag_secun2, notas_clinicas, resultado_med_ia,resultados_ia,
        feedback_ia,id_medico,id_hospital,id_epicrisis,fecha_ep, hora_ep,fecha_hospitalizacion,
        fecha_egreso,dias_hospitalizado,diag_alta,anamnesis,estudios_acciones,indiciaciones_alta,
        resumen_evolucion,id_cirugia,date_registered,time_protocol,implantes,descripcion } = each;
        ///////////////////////////////
        if (ruta_audio != '' ){
            var audio = 
            `<a href="http://134.122.120.195/files/${ruta_audio}">` + 
                '<img src="../assets/img/mp3Logo.png" height="50px" width="45px">' + 
            '</a>'
        }
        else{
            audio = ''
        }

        ///////////////////////////////////////////////////////

        if (ruta_exam_electro != '' ){
            var PDFElectro = 
            `<a href="http://134.122.120.195/files/${ruta_exam_electro}">` + 
                '<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
            '</a>'
        }
        else{
            PDFElectro = ''
        }
        
        ///////////////////////////////
        if ( ruta_exam_lab != '' ){
            var PDFExamLab = 
            `<a href="http://134.122.120.195/files/${ruta_exam_lab}">` + 
                '<img src="../assets/img/pdfLogo.png" height="40px" width="70px">' + 
            '</a>'
        }
        else{
            PDFExamLab = ''
        }

        /////////////////////////////////
        if ( eliminado == "True" ){
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

      container2.innerHTML += 
      `
        <tr>
            <td scope="row" data-label="Id"> ${id_encuentro} </td>
            <td data-label="Fecha"> ${fecha_e}</td>
            <td data-label="Hora">${hora_e}</td>
            <td data-label="Tipo encuentro">${tipo_2}</td>
            <td data-label="Diag prim">${diag_primario}</td>
            <td data-label="Diag sec">${diag_secun}</td>
            <td data-label="Diag sec 2">${diag_secun2}</td>
            <td data-label="Audio">
                ${audio}
            </td>
            <td data-label="PDF Electro">
                ${PDFElectro}
            </td>
            <td data-label="PDF Exam Lab">
                ${PDFExamLab}
            </td>

            <td data-label="Notas clinicas">${notas_clinicas}</td>
            <td data-label="Res med IA">${resultado_med_ia}</td>
            <td data-label="Resultados IA">${resultados_ia}</td>
            <td data-label="Feedbaack IA">${feedback_ia}</td>
            <td data-label="Id medico">${id_medico}</td>
            <td data-label="Hospital">${id_hospital}</td>
            <td data-label="Eliminado">${switch1}</td>

            <td data-label="Acciones">
                <button type="button" class="btn btn-primary"
                    onclick="loadModalEpi('${id_epicrisis}','${fecha_ep}', '${hora_ep}',
                    '${fecha_hospitalizacion}', '${fecha_egreso}','${dias_hospitalizado}',
                    '${diag_alta}', '${anamnesis}', '${estudios_acciones}', '${indiciaciones_alta}',
                    '${resumen_evolucion}' )">
                    Epicrisis
                </button>
            </td>
    

            <td>
                <button type="button" class="btn btn-primary"
                    onclick="loadModalCirugia('${id_cirugia}', '${date_registered}', '${time_protocol}', 
                    '${implantes}', '${descripcion}' )">
                    Cirugia
                </button>
            </td>

        

        </tr>
      
      `
    })
  
  }

  //////////////////cierre de sesion/////////////////
  function exit(){
	window.localStorage.clear();
	window.location.href = '../index.html'
}

/////////////////Validar caracteres especiales /////////////////////////
function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}