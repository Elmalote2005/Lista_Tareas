// Seleccionamos los elementos del HTML
const ingresarTarea = document.getElementById('ingresar-tarea');
const ingresarEncargado = document.getElementById('ingresar-encargado');
const btnCrear = document.getElementById('btn-crear');
const listaDeTareas = document.getElementById('lista-de-tareas');
const contadorGeneral = document.getElementById('contador-general');

// Reloj en tiempo real
const elementoReloj = document.createElement('div');
elementoReloj.id = "reloj-actual";
contadorGeneral.after(elementoReloj);

const formatearNumero = (numero) => numero < 10 ? "0" + numero : numero;

const actualizarReloj = () => {
    const fecha = new Date();
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    
    const horas = formatearNumero(fecha.getHours());
    const minutos = formatearNumero(fecha.getMinutes());
    const segundos = formatearNumero(fecha.getSeconds());
    
    elementoReloj.textContent = `${diaSemana} ${dia} de ${mes} de ${anio} — ${horas}:${minutos}:${segundos}`;
};

actualizarReloj();
setInterval(actualizarReloj, 1000);

// Evento: al presionar Enter en el input, se presiona el botón
ingresarTarea.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        btnCrear.click();
    }
});
ingresarEncargado.addEventListener('keypress',function(evento) {
    if (evento.key === 'Enter') {
        btnCrear.click();
    }
})
// Función para agregar una nueva tarea
function agregarTarea() {
    let textoTarea = ingresarTarea.value.trim();
    let textoEncargado = ingresarEncargado.value.trim();
    // Verificamos si hay valor en el input
    if (textoTarea === "" || textoEncargado === "") {
        return;
    }
    // Creamos el contenedor de la tarea
    const tarea = document.createElement('div');
    tarea.classList.add('tarea');
    // Creamos la fila superior
    const filaSuperior = document.createElement('div');
    filaSuperior.classList.add('fila-superior');
    // Datos de la tarea
    const datosTarea = document.createElement('div');
    datosTarea.classList.add('datos-tarea');
    datosTarea.innerHTML = `<strong>Tarea: ${textoTarea}</strong>`;
    const encargado = document.createElement('div');
    encargado.classList.add('Encargado');
    encargado.textContent = "Responsable: " + textoEncargado;
    datosTarea.appendChild(encargado);
    // Temporizador de la tarea
    const contenedorTiempo = document.createElement('div');
    contenedorTiempo.classList.add('tiempo-tarea');
    contenedorTiempo.textContent = "23h 59m 59s";
    // Iconos
    const contenedorIconos = document.createElement('div');
    contenedorIconos.classList.add('contenedor-iconos');
    const iconoCompletar = document.createElement('i');
    iconoCompletar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
    iconoCompletar.onclick = function() {
        completarTarea(tarea);
    };
    const iconoEliminar = document.createElement('i');
    iconoEliminar.classList.add('bi', 'bi-x-circle-fill', 'icono-eliminar');
    iconoEliminar.onclick = function() {
        eliminarTarea(tarea);
    };
    contenedorIconos.appendChild(iconoCompletar);
    contenedorIconos.appendChild(iconoEliminar);
    filaSuperior.appendChild(datosTarea);
    filaSuperior.appendChild(contenedorTiempo);
    filaSuperior.appendChild(contenedorIconos);
    // Barra con el porcentaje visible
    const contenedorBarra = document.createElement('div');
    contenedorBarra.classList.add('barra-contenedor');
    const barra = document.createElement('div');
    barra.classList.add('barra-progreso');
    const textoPorcentaje = document.createElement('span');
    textoPorcentaje.classList.add('porcentaje-texto');
    textoPorcentaje.textContent = "0%";
    contenedorBarra.appendChild(barra);
    contenedorBarra.appendChild(textoPorcentaje);
    // Activamos la funcionalidad
    configurarBarra(barra, contenedorBarra, textoPorcentaje);
    // Agregamos todo a la tarea
    tarea.appendChild(filaSuperior);
    tarea.appendChild(contenedorBarra);
    // Agregamos la tarea a la lista
    listaDeTareas.appendChild(tarea);
    // Iniciamos temporizador y actualizamos contador
    iniciarTemporizador(contenedorTiempo);
    actualizarContadorGeneral();
    // Limpiamos los campos
    ingresarTarea.value = "";
    ingresarEncargado.value = "";
}
// Asignamos la función al botón
btnCrear.addEventListener('click', agregarTarea);
// Función para completar tarea
function completarTarea(elementoTarea) {
    elementoTarea.classList.toggle('completada');
}
// Función para eliminar tarea
function eliminarTarea(elementoTarea) {
    elementoTarea.remove();
    actualizarContadorGeneral();
}
// EVALUACION
// Creamos la funcion para que la barra se mueva con el mouse y cambie el porcentaje
function configurarBarra(barra, contenedorBarra, textoPorcentaje) {
    function actualizarProgreso(e) {
        const rect = contenedorBarra.getBoundingClientRect();
        const posicionX = e.clientX - rect.left;
        const anchoTotal = contenedorBarra.offsetWidth - 60;
        let porcentaje = Math.round((posicionX / anchoTotal) * 100);
        if (porcentaje < 0) porcentaje = 0;
        if (porcentaje > 100) porcentaje = 100;
        barra.style.width = porcentaje + "%";
        textoPorcentaje.textContent = porcentaje + "%";
    }
    // Al hacer clic en la barra
    contenedorBarra.addEventListener('mousedown', function(e) {
        arrastrando = true;
        actualizarProgreso(e);
    });
    // Al mover el mouse manteniendo el clic presionado
    document.addEventListener('mousemove', function(e) {
        if (arrastrando) {
            actualizarProgreso(e);
        }
    });
    // Al soltar el clic
    document.addEventListener('mouseup', function() {
        arrastrando = false;
    });
}
// Variable para saber si estamos arrastrando la barra
let arrastrando = false;
// Creamos el contador de tareas
const actualizarContadorGeneral = () => {
    const total = listaDeTareas.children.length;
    contadorGeneral.textContent = "Total de tareas pendientes: " + total;
};
// PARTE 3
// Creamos un contador para cada tarea
const formatearTiempo = (segundosTotales) => {
    let horas = Math.floor(segundosTotales / 3600);
    let minutos = Math.floor((segundosTotales % 3600) / 60);
    let segundos = segundosTotales % 60;
    if (horas < 10) horas = "0" + horas;
    if (minutos < 10) minutos = "0" + minutos;
    if (segundos < 10) segundos = "0" + segundos;
    return horas + "h " + minutos + "m " + segundos + "s";
};
const iniciarTemporizador = (elementoTiempo) => {
    let tiempoRestante = 86400;
    const intervalo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante >= 0) {
            elementoTiempo.textContent = formatearTiempo(tiempoRestante);
        } else {
            clearInterval(intervalo);
            elementoTiempo.textContent = "00h 00m 00s";
        }
    }, 1000);
};