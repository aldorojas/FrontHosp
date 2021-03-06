const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});


////////////////////////// Form de login /////////////////////////////////
var formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function(e){

	e.preventDefault()
	var idMedico = document.getElementById('txtIdMedico')
	const urlAPI = 'http://134.122.120.195/api/v1/login/' + idMedico.value ;

	fetch(urlAPI)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		if(data.Status == "Success"){
			Swal.fire({
					icon: 'success',
					title: 'Id correcto',
					showConfirmButton: false,
					timer: 2500
					})
			localStorage.setItem("Admin",data.Medico.admin);
			localStorage.setItem("idMedico",data.Medico.id);
			localStorage.setItem("nombreMedico",data.Medico.nombre);
			localStorage.setItem("apellidosMedico",data.Medico.apellidos);
			localStorage.setItem("idHospital",data.Medico.id_hospital);
			localStorage.setItem("especialidad",data.Medico.especialidad);

			window.location.replace("http://134.122.120.195:8080/modulos/inicio.html");
			//window.location.replace("http://127.0.0.1:5500/modulos/inicio.html");
			
		}
		else{
			console.log(data.message)
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
				title: 'El medico no existe'
				})
		}
		
	})
	.catch(err => console.log(err))

})




