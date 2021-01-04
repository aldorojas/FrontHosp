

var formNewHospital = document.getElementById('formNewHospital');

formNewHospital.addEventListener('submit', function(e){

	const URLNewHospital = 'http://134.122.120.195/api/v1/hospital';

    e.preventDefault()
    var nombreHospital = document.getElementById('nombreHospital')
	var direccionHospital = document.getElementById('direccionHospital')
	var telefonoHospital = document.getElementById('telefonoHospital')
	var adminHospital = document.getElementById('adminHospital')

    var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	var headers = {
		"Content-Type": "application/json"
	 }

	const dataToSend = JSON.stringify(
		{
			"hospital":nombreHospital.value, 
            "direccion": direccionHospital.value ,
            "telefono": telefonoHospital.value,
            "admin":adminHospital.value,
		});
	console.log(dataToSend)
	
	fetch(URLNewHospital, {
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
			title: 'Hospital registrado',
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


///////////////////////////////////////// Todos los hospitales


var formTodosHospitales = document.getElementById('formTodosHospitales');

formTodosHospitales.addEventListener('submit', function(e){

	const URLTodosHospitales = 'http://134.122.120.195/api/v1/hospitales/list';

	e.preventDefault()

	var divPrueba = document.getElementById('card')
    divPrueba.innerHTML = ''

	fetch(URLTodosHospitales)
	.then(response => response.json())
	.then(data => {
		
		console.log(data)
		for(var i = 0; i < data.length; i++){
			//console.log(data.pacientes[i].nombres)
			//console.log(data.pacientes[i].apellidos)
			
			var nombre = `
				
				<div class="blog-post">
				<div class="blog-post_img">
					<img src="../assets/img/avatarCard.png">
				</div>
				<div class="blog-post_info">
					<h1 class="blog-post_title">  Hospital: ${data[i].hospital} </h1>
					<div class="blog-post_date">
					<span> Direccion: ${data[i].direccion}</span>
					<span> Telefono: ${data[i].telefono}</span> 
					<span> Activo:  ${data[i].activo}</span>
					</div>
					
				</div>
				</div>
				`
			divPrueba.innerHTML += nombre
		}

		
		
	})
	.catch(err => console.log(err))
	//.catch(
		
	//)
})

