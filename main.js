// Ejemplo de lista de antenas
const listaDeAntenas = [
  { nombre: 'Antena1', parametro1: 'valor1', parametro2: 'valorA' },
  { nombre: 'Antena2', parametro1: 'valor2', parametro2: 'valorB' },
  { nombre: 'Antena3', parametro1: 'valor1', parametro2: 'valorA' },
  // ... más antenas
];

// Función para seleccionar antenas
function seleccionarAntenas(parametro1, parametro2) {
  // Usa Array.filter() para buscar todas las antenas que coinciden con los parámetros
  const antenasCoincidentes = listaDeAntenas.filter(antena => 
    antena.parametro1 === parametro1 && antena.parametro2 === parametro2
  );

  // Devuelve el array de antenas coincidentes
  return antenasCoincidentes;
}

// Ejemplo de uso
const antenasElegidas = seleccionarAntenas('valor1', 'valorA');

// Verificar el resultado
if (antenasElegidas.length > 0) {
  const nombresAntenas = antenasElegidas.map(antena => antena.nombre).join(', ');
  console.log('Las antenas que se pueden usar son: ' + nombresAntenas);
} else {
  console.log('No se encontraron antenas con esos parámetros.');
}



function enviarDatos() {
    // Verificar si todos los campos están completos
    var gananciaA = document.getElementById('gananciaA').value;
    var distancia = document.getElementById('distancia').value;
    var frecuencia = document.getElementById('frecuencia').value;
    var atenuacion = document.getElementById('atenuacion').value;
    var longitudA = document.getElementById('longitudA').value;
    var longitudB = document.getElementById('longitudB').value;
    var señalA = document.getElementById('señalA').value;
    var sensibilidad = document.getElementById('sensibilidad').value;
    var margen = document.getElementById('margen').value;

    if (gananciaA === '' || distancia === '' || frecuencia === '' || atenuacion === '' || longitudA === '' || longitudB === '' || señalA === '' || sensibilidad === '' || margen === ''||isNaN(parseFloat(gananciaA))  || isNaN(parseFloat(distancia)) || isNaN(parseFloat(frecuencia)) || isNaN(parseFloat(atenuacion)) || isNaN(parseFloat(longitudA)) || isNaN(parseFloat(longitudB)) || isNaN(parseFloat(señalA)) || isNaN(parseFloat(sensibilidad)) || isNaN(parseFloat(margen))) {
      // Mostrar mensaje de alerta
      document.getElementById('alerta').style.display = 'block';
      document.getElementById('resultados').style.display = 'none';
    } else {
      // Ocultar mensaje de alerta si todos los campos están completos
      document.getElementById('alerta').style.display = 'none';

      const ptx = 10*Math.log10(señalA / 1);
      const aA = longitudA * atenuacion;
      const aB = longitudB * atenuacion;
      const el = 92.44 + 20 * Math.log10(distancia) + 20 * Math.log10(frecuencia);
      const resRSSI = parseFloat(sensibilidad) + parseFloat(margen) -ptx + aA + aB - gananciaA + el;

      //Ptx
      document.getElementById('ptx').innerHTML = `${ptx.toFixed(3)} dB`;
      //Atenuacion cable A
      document.getElementById('cableA').innerHTML = `${aA.toFixed(3)} dB`;
      //Atenuacion cable B
      document.getElementById('cableB').innerHTML = `${aB.toFixed(3)} dB`;
      //Ganancia de antena A
      document.getElementById('antena').innerHTML = `${gananciaA} dB`;
      //Atenuación en el Espacio Libre
      document.getElementById('espacio').innerHTML = `${el.toFixed(3)} dB`;
      //RSSI
      document.getElementById('rssi').innerHTML = `${resRSSI.toFixed(3)} dB`;

      
    }
  }
