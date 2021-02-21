//   Icons
window.FontAwesomeKitConfig = {"asyncLoading":{"enabled":false},"autoA11y":{"enabled":true},"baseUrl":"https://kit-free.fontawesome.com","detectConflictsUntil":null,"license":"free","method":"css","minify":{"enabled":true},"v4FontFaceShim":{"enabled":true},"v4shim":{"enabled":true},"version":"latest"};
!function(){function r(e){var t,n=[],i=document,o=i.documentElement.doScroll,r="DOMContentLoaded",a=(o?/^loaded|^c/:/^loaded|^i|^c/).test(i.readyState);a||i.addEventListener(r,t=function(){for(i.removeEventListener(r,t),a=1;t=n.shift();)t()}),a?setTimeout(e,0):n.push(e)}!function(){if(!(void 0===window.Element||"classList"in document.documentElement)){var e,t,n,i=Array.prototype,o=i.push,r=i.splice,a=i.join;d.prototype={add:function(e){this.contains(e)||(o.call(this,e),this.el.className=this.toString())},contains:function(e){return-1!=this.el.className.indexOf(e)},item:function(e){return this[e]||null},remove:function(e){if(this.contains(e)){for(var t=0;t<this.length&&this[t]!=e;t++);r.call(this,t,1),this.el.className=this.toString()}},toString:function(){return a.call(this," ")},toggle:function(e){return this.contains(e)?this.remove(e):this.add(e),this.contains(e)}},window.DOMTokenList=d,e=Element.prototype,t="classList",n=function(){return new d(this)},Object.defineProperty?Object.defineProperty(e,t,{get:n}):e.__defineGetter__(t,n)}function d(e){for(var t=(this.el=e).className.replace(/^\s+|\s+$/g,"").split(/\s+/),n=0;n<t.length;n++)o.call(this,t[n])}}();function a(e){var t,n,i,o;prefixesArray=e||["fa"],prefixesSelectorString="."+Array.prototype.join.call(e,",."),t=document.querySelectorAll(prefixesSelectorString),Array.prototype.forEach.call(t,function(e){n=e.getAttribute("title"),e.setAttribute("aria-hidden","true"),i=!e.nextElementSibling||!e.nextElementSibling.classList.contains("sr-only"),n&&i&&((o=document.createElement("span")).innerHTML=n,o.classList.add("sr-only"),e.parentNode.insertBefore(o,e.nextSibling))})}var d=function(e,t){var n=document.createElement("link");n.href=e,n.media="all",n.rel="stylesheet",n.id="font-awesome-5-kit-css",t&&t.detectingConflicts&&t.detectionIgnoreAttr&&n.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)),document.getElementsByTagName("head")[0].appendChild(n)},c=function(e,t){!function(e,t){var n,i=t&&t.before||void 0,o=t&&t.media||void 0,r=window.document,a=r.createElement("link");if(t&&t.detectingConflicts&&t.detectionIgnoreAttr&&a.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)),i)n=i;else{var d=(r.body||r.getElementsByTagName("head")[0]).childNodes;n=d[d.length-1]}var c=r.styleSheets;a.rel="stylesheet",a.href=e,a.media="only x",function e(t){if(r.body)return t();setTimeout(function(){e(t)})}(function(){n.parentNode.insertBefore(a,i?n:n.nextSibling)});var s=function(e){for(var t=a.href,n=c.length;n--;)if(c[n].href===t)return e();setTimeout(function(){s(e)})};function l(){a.addEventListener&&a.removeEventListener("load",l),a.media=o||"all"}a.addEventListener&&a.addEventListener("load",l),(a.onloadcssdefined=s)(l)}(e,t)},e=function(e,t,n){var i=t&&void 0!==t.autoFetchSvg?t.autoFetchSvg:void 0,o=t&&void 0!==t.async?t.async:void 0,r=t&&void 0!==t.autoA11y?t.autoA11y:void 0,a=document.createElement("script"),d=document.scripts[0];a.src=e,void 0!==r&&a.setAttribute("data-auto-a11y",r?"true":"false"),i&&(a.setAttributeNode(document.createAttribute("data-auto-fetch-svg")),a.setAttribute("data-fetch-svg-from",t.fetchSvgFrom)),o&&a.setAttributeNode(document.createAttribute("defer")),n&&n.detectingConflicts&&n.detectionIgnoreAttr&&a.setAttributeNode(document.createAttribute(n.detectionIgnoreAttr)),d.parentNode.appendChild(a)};function s(e,t){var n=t&&t.addOn||"",i=t&&t.baseFilename||e.license+n,o=t&&t.minify?".min":"",r=t&&t.fileSuffix||e.method,a=t&&t.subdir||e.method;return e.baseUrl+"/releases/"+("latest"===e.version?"latest":"v".concat(e.version))+"/"+a+"/"+i+o+"."+r}var t,n,i,o,l;try{if(window.FontAwesomeKitConfig){var u,f=window.FontAwesomeKitConfig,m={detectingConflicts:f.detectConflictsUntil&&new Date<=new Date(f.detectConflictsUntil),detectionIgnoreAttr:"data-fa-detection-ignore",detectionTimeoutAttr:"data-fa-detection-timeout",detectionTimeout:null};"js"===f.method&&(o=m,l={async:(i=f).asyncLoading.enabled,autoA11y:i.autoA11y.enabled},"pro"===i.license&&(l.autoFetchSvg=!0,l.fetchSvgFrom=i.baseUrl+"/releases/"+("latest"===i.version?"latest":"v".concat(i.version))+"/svgs"),i.v4shim.enabled&&e(s(i,{addOn:"-v4-shims",minify:i.minify.enabled})),e(s(i,{minify:i.minify.enabled}),l,o)),"css"===f.method&&function(e,t){var n,i=a.bind(a,["fa","fab","fas","far","fal","fad"]);e.autoA11y.enabled&&(r(i),n=i,"undefined"!=typeof MutationObserver&&new MutationObserver(n).observe(document,{childList:!0,subtree:!0})),e.v4shim.enabled&&(e.license,e.asyncLoading.enabled?c(s(e,{addOn:"-v4-shims",minify:e.minify.enabled}),t):d(s(e,{addOn:"-v4-shims",minify:e.minify.enabled}),t));e.v4FontFaceShim.enabled&&(e.asyncLoading.enabled?c(s(e,{addOn:"-v4-font-face",minify:e.minify.enabled}),t):d(s(e,{addOn:"-v4-font-face",minify:e.minify.enabled}),t));var o=s(e,{minify:e.minify.enabled});e.asyncLoading.enabled?c(o,t):d(o,t)}(f,m),m.detectingConflicts&&((u=document.currentScript.getAttribute(m.detectionTimeoutAttr))&&(m.detectionTimeout=u),document.currentScript.setAttributeNode(document.createAttribute(m.detectionIgnoreAttr)),t=f,n=m,r(function(){var e=document.createElement("script");n&&n.detectionIgnoreAttr&&e.setAttributeNode(document.createAttribute(n.detectionIgnoreAttr)),n&&n.detectionTimeoutAttr&&n.detectionTimeout&&e.setAttribute(n.detectionTimeoutAttr,n.detectionTimeout),e.src=s(t,{baseFilename:"conflict-detection",fileSuffix:"js",subdir:"js",minify:t.minify.enabled}),e.async=!0,document.body.appendChild(e)}))}}catch(e){}}();
//////
const opcion = document.querySelectorAll('.opcion');

opcion.forEach(e => {

	e.addEventListener('click', function(e){
		const padre = e.target.parentNode;
		padre.children[0].classList.toggle('animation');
		padre.parentNode.children[1].classList.toggle('animation')
	})
})


/////

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

let max = 2;
let cont = 1;


btn_adelante2.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-25%";
  // num[cont - 1].classList.add("active");
  // progressText[cont - 1].classList.add("active");
  // progressCheck[cont - 1].classList.add("active");
  cont += 1;
});

btn_adelante3.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-50%";
  // num[cont - 1].classList.add("active");
  // progressText[cont - 1].classList.add("active");
  // progressCheck[cont - 1].classList.add("active");
  cont += 1;
});


// btn_final.addEventListener("click", function(e){
//   e.preventDefault();
//   num[cont - 1].classList.add("active");
//   progressText[cont - 1].classList.add("active");
//   progressCheck[cont - 1].classList.add("active");
//   cont += 1;
//   alert("Aqui termina el proceso")
// })


btn_atras1.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "0%";
  // num[cont - 2].classList.remove("active");
  // progressText[cont - 2].classList.remove("active");
  // progressCheck[cont - 2].classList.remove("active");
  cont += 1;
});

btn_atras2.addEventListener("click", function(e){
  e.preventDefault();
  movPag.style.marginLeft = "-25%";
  // num[cont - 2].classList.remove("active");
  // progressText[cont - 2].classList.remove("active");
  // progressCheck[cont - 2].classList.remove("active");
  cont -= 1;
});

//// /////////////////////////
//////////////codigo Select option

function showDiv(element)
{ 
  //var docs = document.getElementById("docs");
  document.getElementById("docs").style.display = element.value != "Cirugia" ? 'block' : 'none';
  document.getElementById("btns2").style.display = element.value == "Cirugia" ? 'block' : 'none';
  document.getElementById("btns3").style.display = element.value == "Cirugia" ? 'block' : 'none';

}


