

var formEncuentros1 = document.getElementById('encuentrosPag1');

formEncuentros1.addEventListener('submit', function(e){
	e.preventDefault()
	var nombreNewPaciente = document.getElementById('nombres')
	var apellidosNewPaciente = document.getElementById('apellidos')
	var rutNewPaciente = document.getElementById('rut')
	var pasaporteNewPaciente = document.getElementById('pasaporte')
	var direccionNewPaciente = document.getElementById('direccion')
	var telefonoNewPaciente = document.getElementById('telefono')
	var sexoNewPaciente = document.getElementById('sexo')
	var fechaNacimientoNewPaciente = document.getElementById('fechaNacimiento')

	const dataToSend = JSON.stringify({"nombres": nombreNewPaciente.value , "apellidos": apellidosNewPaciente.value,
										"rut": rutNewPaciente.value, "pasaporte": pasaporteNewPaciente.value, "direccion": direccionNewPaciente.value,
										"telefono": telefonoNewPaciente.value, "sexo": sexoNewPaciente.value, "fechaNacimiento":fechaNacimientoNewPaciente.value});

	console.log(dataToSend)


})