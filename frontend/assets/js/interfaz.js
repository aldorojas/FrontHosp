function ocultar(){
  document.getElementById('SinResultados').style.display="block";
}

$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    document.getElementById("bodyContent").style.width="100%";
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// botones atras-siguiente

const movPag = document.querySelector(".movPag");
const btn_adelante2 = document.querySelector(".sigPag");

const btn_atras1 = document.querySelector(".volver-pag1");
const btn_adelante3 = document.querySelector(".adelante-pag3");

const btn_atras2 = document.querySelector(".volver-pag2");
const btn_final = document.querySelector(".Fin")


const progressText = document.querySelectorAll(".paso p");
const progressCheck = document.querySelectorAll(".paso .check");
const num = document.querySelectorAll(".paso .num");

let max = 3;
let cont = 1;


btn_adelante2.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-25%";
  num[cont - 1].classList.add("active");
  progressText[cont - 1].classList.add("active");
  progressCheck[cont - 1].classList.add("active");
  cont += 1;
});

btn_adelante3.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-50%";
  num[cont - 1].classList.add("active");
  progressText[cont - 1].classList.add("active");
  progressCheck[cont - 1].classList.add("active");
  cont += 1;
});


btn_final.addEventListener("click", function(e){
  e.preventDefault();
  num[cont - 1].classList.add("active");
  progressText[cont - 1].classList.add("active");
  progressCheck[cont - 1].classList.add("active");
  cont += 1;
  alert("Aqui termina el proceso")
})


btn_atras1.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "0%";
  num[cont - 2].classList.remove("active");
  progressText[cont - 2].classList.remove("active");
  progressCheck[cont - 2].classList.remove("active");
  cont += 1;
});
btn_atras2.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-25%";
  num[cont - 2].classList.remove("active");
  progressText[cont - 2].classList.remove("active");
  progressCheck[cont - 2].classList.remove("active");
  cont -= 1;
});

//// /////////////////////////
//////////////codigo Select option

function showDiv(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("docs").style.display = element.value != 3 ? 'block' : 'none';

  document.getElementById("btns2").style.display = element.value == 3 ? 'block' : 'none';
  document.getElementById("btns3").style.display = element.value == 3 ? 'block' : 'none';

  //var div = document.getElementById("btns2");
  //var div2 = document.getElementById("btns3");

  //if(element.value == 3 ){
    //div.style.display = 'block';
    //div2.style.display = 'block';
  //}
  //else{
    //docs.style.display = 'block';
  //}

}


