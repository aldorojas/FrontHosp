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
    divPrueba.innerHTML = ''

    fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(var i = 0; i < data.length; i++){
            var nombre = `
            <tr>
                <th scope="row"> ${data[i].id_encuentro} </th>
                <td> ${data[i].id_paciente}</td>
                <td> ${data[i].fecha_e}</td>
                <td>${data[i].hora_e}</td>
                <td>${data[i].tipo_2}</td>
                <td>${data[i].diag_primario}</td>
                <td>${data[i].diag_secun}</td>
                <td>${data[i].diag_secun2}</td>
                <td>${data[i].ruta_audio}</td>
                <td>
                    <a href="http://134.122.120.195/files/${data[i].ruta_exam_electro}" >
                        <img src="../assets/img/pdfLogo.png" height="40px" width="70px">
                    </a>
                </td>
                <td>
                    <a href="http://134.122.120.195/files/${data[i].ruta_exam_lab}" >
                        <img src="../assets/img/pdfLogo.png" height="40px" width="70px">
                    </a>
                </td>
                <td>${data[i].notas_clinicas}</td>
                <td>${data[i].resultado_med_ia}</td>
                <td>${data[i].resultados_ia}</td>
                <td>${data[i].feedback_ia}</td>
                <td>${data[i].id_medico}</td>
                <td>${data[i].id_hospital}</td>
                <td>${data[i].eliminado}</td>

                
                
                
            </tr>
            
                `
            divPrueba.innerHTML += nombre
        }
        
        })
    .catch(err => console.log(err))















  
})


const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {
	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})
