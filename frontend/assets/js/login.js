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


///////////////////////////////////////////////////////////



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
			var datosLogueado = JSON.stringify ({	
				"id" : data.Medico.id,
				"id_hospital":data.Medico.id_hospital,
				"nombre": data.Medico.nombre,
				"apellidos": data.Medico.apellidos,
				"telefono":data.Medico.telefono,
				"especialidad":data.Medico.especialidad,
				"staff":data.Medico.staff,
				"becario": data.Medico.becario,
				"interno": data.Medico.interno,
				"activo": data.Medico.activo,
				"admin": data.Medico.admin
			});
			console.log(data.Medico.admin)
			//export { datosLogueado };

			//var getInput = prompt("Hey type something here: ");
			localStorage.setItem("Admin",data.Medico.admin);


			//window.location.replace("http://134.122.120.195:8080/modulos/encuentros.html");
			window.location.replace("http://127.0.0.1:5500/modulos/encuentros.html");


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

			//$('#exampleModal').modal('show');	
		}
		
	})
	.catch(err => console.log(err))
	// .catch(
	// 	Swal.fire({
	// 		icon: 'error',
	// 		title: 'Oops...',
	// 		text: 'Id de medico no valido!'
	// 	  })
	// )	

})


// window.onload = function() {
// 	var getInput = prompt("Hey type something here: ");
// 	localStorage.setItem("storageName",getInput);
//  }


