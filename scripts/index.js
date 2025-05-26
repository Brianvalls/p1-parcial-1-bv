'use strict';

/*
 * VALLS, BRIAN
 */

let discos = [];

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    let nombre = prompt("Ingrese el nombre del disco:");
    while (!nombre) {
        nombre = prompt("El nombre no puede estar vacío. Por favpr ingrese el nombre del disco:");
    }

    let autor = prompt("Ingrese el autor o banda del disco:");
    while (!autor) {
        autor = prompt("El autor no puede estar vacío. Por favor ingrese el autor o banda del disco:");
    }

    let portada = prompt("Ingrese el link de la portada del disco:");
    while (!portada) {
        portada = prompt("La portada no puede estar vacía. Por favor ingrese el link de la portada del disco:");
    }

    let codigo;
    do {
        codigo = parseInt(prompt("Ingrese el código numérico único del disco (1-999):"));
        while (isNaN(codigo) || codigo < 1 || codigo > 999) {
            codigo = parseInt(prompt("El código debe ser un número entre 1 y 999. Ingrese el código nuevamente:"));
        }
    } while (discos.some(disco => disco.codigo === codigo));

    let pistas = [];
    let continuar = true;

    while (continuar) {
        let nombrePista = prompt("Ingrese el nombre de la pista:");
        while (!nombrePista) {
            nombrePista = prompt("El nombre de la pista no puede estar vacío. Ingrese el nombre de la pista:");
        }


        let duracion;
        do {
            duracion = parseInt(prompt("Ingrese la duración de la pista en segundos (0-7200):"));
        } while (isNaN(duracion) || duracion < 0 || duracion > 7200);

        pistas.push({
            nombre: nombrePista,
            duracion: duracion
        });

        continuar = confirm("¿Desea ingrewsar otra pista?");
    }

    discos.push({
        nombre: nombre,
        autor: autor,
        portada: portada,
        codigo: codigo,
        pistas: pistas
    });
}

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    const listaDiscos = document.getElementById('discos');
    listaDiscos.innerHTML = '';

    discos.forEach(disco => {
        const discoElement = document.createElement('div');
        discoElement.className = 'disco';
        
        discoElement.innerHTML = `
            <h2>${disco.nombre}</h2>
            <p><strong>Autor/Banda:</strong> ${disco.autor}</p>
            <p><strong>Código:</strong> ${disco.codigo}</p>
            <img src="${disco.portada}" alt="Portada de ${disco.nombre}" class="portada">
            <h3>Pistas:</h3>
        `;

        disco.pistas.forEach(pista => {
            const pistaElement = document.createElement('div');
            pistaElement.className = 'pista';
            const duracion = formatearDuracion(pista.duracion);
            const esDuracionLarga = pista.duracion > 180;
            
            pistaElement.innerHTML = `
                <p>
                    ${pista.nombre} - 
                    <span class="${esDuracionLarga ? 'duracion-larga' : ''}">
                        ${duracion}
                    </span>
                </p>
            `;
            
            discoElement.appendChild(pistaElement);
        });

        listaDiscos.appendChild(discoElement);
    });
}

/**
 * MM:SS
 */
function formatearDuracion(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}
