// Lista de antenas
const listaDeAntenas = [
  //1 hoja
  { nombre: 'ANT-2X2-2714', bandaBaja: 2.400, bandaAlta:  2.483, peakGain: 14, imagen: './img/Antenas/ANT-2X2-2714.jpg'},
  { nombre: 'ANT-2X2-5010', bandaBaja: 5.150, bandaAlta: 5.875, peakGain: 10, imagen: './img/Antenas/ANT-2X2-5010.jpg'},
  { nombre: 'ANT-2X2-5314', bandaBaja: 4.900, bandaAlta: 5.875, peakGain: 14, imagen: './img/Antenas/ANT-2X2-5314.gif'},
  //2 hoja
  { nombre: 'ANT-2X2-5005', bandaBaja: 5.150, bandaAlta: 5.875, peakGain: 5, imagen: './img/Antenas/ANT-2X2-5005.jpg'},
  { nombre: 'ANT-2X2-2314', bandaBaja: 2.400, bandaAlta: 2.500, peakGain: 14, imagen: './img/Antenas/ANT-2X2-2314.gif'},
  { nombre: 'ANT-2X2-2005', bandaBaja: 2.400, bandaAlta: 2.500, peakGain: 5, imagen: './img/Antenas/ANT-2X2-2005.jpg'},
  //3 hoja
  { nombre: 'ANT-3X3-5712', bandaBaja: 4.900, bandaAlta: 6.000, peakGain: 11.5, imagen: './img/Antenas/ANT-3X3-5712.jpg'},
  { nombre: 'ANT-3X3-5010', bandaBaja: 4.9, bandaAlta: 5.875, peakGain: 10, imagen: './img/Antenas/ANT-3X3-5010.jpg'},
  //hoja 4
  { nombre: 'ANT-3X3-5005', bandaBaja: 4.9, bandaAlta: 5.875, peakGain: 5, imagen: './img/Antenas/ANT-3X3-5005.jpg'},
  { nombre: 'ANT-3X3-2005', bandaBaja: 2.4, bandaAlta: 2.5, peakGain: 5, imagen: './img/Antenas/ANT-3X3-2005.jpg'},
//{ nombre: '', bandaBaja: , bandaAlta: , peakGain: },
];

// Función para seleccionar antenas
function seleccionarAntenas(banda, peakGainA) {
  // Usa Array.filter() para buscar todas las antenas que cumplen las condiciones
  const antenasCoincidentes = listaDeAntenas.filter(antena => 
    banda >= antena.bandaBaja && banda <= antena.bandaAlta && peakGainA <= antena.peakGain
  );

  // Devuelve el array de antenas coincidentes
  return antenasCoincidentes;
}


function enviarDatos() {
      // Limpiar resultados anteriores
      document.getElementById('ptx').innerHTML = '-';
      document.getElementById('cableA').innerHTML = '-';
      document.getElementById('cableB').innerHTML = '-';
      document.getElementById('antena').innerHTML = '-';
      document.getElementById('espacio').innerHTML = '-';
      document.getElementById('rssi').innerHTML = '-';
      document.getElementById('tipoAntena').innerHTML = '-';  

    // Verificar si todos los campos están completos
    var gananciaA = parseFloat(document.getElementById('gananciaA').value.replace(',', '.'));
    var distancia = parseFloat(document.getElementById('distancia').value.replace(',', '.'));
    var frecuencia = parseFloat(document.getElementById('frecuencia').value.replace(',', '.'));
    var atenuacion = parseFloat(document.getElementById('atenuacion').value.replace(',', '.'));
    var longitudA = parseFloat(document.getElementById('longitudA').value.replace(',', '.'));
    var longitudB = parseFloat(document.getElementById('longitudB').value.replace(',', '.'));
    var señalA = parseFloat(document.getElementById('señalA').value.replace(',', '.'));
    var sensibilidad = parseFloat(document.getElementById('sensibilidad').value.replace(',', '.'));
    var margen = parseFloat(document.getElementById('margen').value.replace(',', '.'));
  

    if (isNaN(gananciaA) || isNaN(distancia) || isNaN(frecuencia) || isNaN(atenuacion) || isNaN(longitudA) || isNaN(longitudB) || isNaN(señalA) || isNaN(sensibilidad) || isNaN(margen)) {
      // Mostrar mensaje de alerta si algún campo no es un número flotante
      document.getElementById('alerta').style.display = 'block';  

    } else {
      // Ocultar mensaje de alerta si todos los campos están completos
      document.getElementById('alerta').style.display = 'none';

      const ptx = 10*Math.log10(señalA / 1);
      const aA = longitudA * atenuacion;
      const aB = longitudB * atenuacion;
      const el = 92.44 + 20 * Math.log10(distancia) + 20 * Math.log10(frecuencia);
      const resRSSI = parseFloat(sensibilidad) + parseFloat(margen) -ptx + aA + aB - gananciaA + el;
      const antenasElegidas = seleccionarAntenas(frecuencia, resRSSI);
      

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
      //Antena
      if (antenasElegidas.length > 0) {
        const contenidoAntenas = antenasElegidas.map(antena => 
          `<p>${antena.nombre} <img src="${antena.imagen}" alt="${antena.nombre}, " style="max-width: 100px;"></p>`
        ).join('');
      
        document.getElementById('tipoAntena').innerHTML = contenidoAntenas;
      
      } else {
        document.getElementById('tipoAntena').innerHTML = `No se encontraron antenas que cumplan con las condiciones.`;
      }
    }
  }
