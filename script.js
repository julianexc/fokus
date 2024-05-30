const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const imputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoInicialPusar = document.querySelector('#start-pause span');
const iconoIniciarPausa = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const reproducir = new Audio('./sonidos/play.wav');
const pausa = new Audio('./sonidos/pause.mp3');
const tiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null


musica.loop = true


imputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
});

botonCorto.addEventListener('click',() =>{
    tiempoTranscurridoEnSegundos = 300
    cabiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click',() =>{
    tiempoTranscurridoEnSegundos = 1500
    cabiarContexto('enfoque');
    botonEnfoque.classList.add('active');

});

botonLargo.addEventListener('click',() =>{
    tiempoTranscurridoEnSegundos = 900
    cabiarContexto('descanso-largo');
    botonLargo.classList.add('active');

});

function cabiarContexto(contexto){
    mostrarTiempo()
    botones.forEach(function(contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);


    switch (contexto) {
    case "enfoque":
       titulo.innerHTML = `Optimiza tu productividad,<br>
       <strong class="app__title-strong">sumérgete en lo que importa</strong>
       ` 

        break;
        
    case "descanso-corto":
        titulo.innerHTML = `¿Qué tal tomar un respiro? 
        <strong class="app__title-strong">¡Haz una pausa corta!</strong> `
            
        break;

    case "descanso-largo":
        titulo.innerHTML = `Hora de volver a la superficie
        <strong class="app__title-strong">Haz una pausa larga.</strong>
        `  

    default:
        break;
    }
}

const cuentaRegraciva = () => {
    if (tiempoTranscurridoEnSegundos <= 0){
       tiempoFinalizado.play(); 
        if (!musica.paused){
            musica.pause()
            
        }
        alert('tiempo finalizado') 
        reiniciar()
        return
    } 
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click',iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        pausa.play();

     reiniciar()
     if (!musica.paused) {
        musica.pause();
    }

     return
    }
    reproducir.play();
    idIntervalo = setInterval(cuentaRegraciva,1000);
    textoInicialPusar.textContent = "Pausar"
    iconoIniciarPausa.setAttribute('src',`./imagenes/pause.png`);

    if (imputEnfoqueMusica.checked && musica.paused) {
        musica.play();
    }
}

function reiniciar(){
    clearInterval(idIntervalo)
    textoInicialPusar.textContent = "Comenzar"
    iconoIniciarPausa.setAttribute('src',`./imagenes/play_arrow.png`);
    idIntervalo = null
    
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000 )
    const tiempoFormateado = tiempo.toLocaleString('es-CO',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
 
mostrarTiempo()