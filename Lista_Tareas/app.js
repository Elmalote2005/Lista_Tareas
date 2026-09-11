// Seleccionamos los elementos del HTML
const ingresarTarea = document.getElementById('ingresar-tarea');
const ingresarEncargado = document.getElementById('ingresar-encargado');
const btnCrear = document.getElementById('btn-crear');
const listaDeTareas = document.getElementById('lista-de-tareas');

// Variable para saber si estamos arrastrando la barra
let arrastrando = false;

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

//Creamos la funcion para que la barra se mueva con el mouse y cambie el porcentaje
function configurarBarra(barra, contenedorBarra, textoPorcentaje) {
    function actualizarProgreso(e) {
        const rect = contenedorBarra.getBoundingClientRect();
        const posicionX = e.clientX - rect.left;
        const anchoTotal = rect.width - 60;
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
    datosTarea.innerHTML = `<strong>Responsable: ${textoTarea}</strong>`;

    const encargado = document.createElement('div');
    encargado.classList.add('Encargado');
    encargado.textContent = textoEncargado;
    datosTarea.appendChild(encargado);

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
    filaSuperior.appendChild(contenedorIconos);

    // Barra + PORCENTAJE VISIBLE AL LADO
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
}