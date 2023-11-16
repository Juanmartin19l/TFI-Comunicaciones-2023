function enviarDatos() {
    // Verificar si todos los campos están completos
    var gananciaA = document.getElementById('gananciaA').value;
    var distancia = document.getElementById('distancia').value;
    var frecuencia = document.getElementById('frecuencia').value;
    var atenuacion = document.getElementById('atenuacion').value;
    var longitudA = document.getElementById('longitudA').value;
    var longitudB = document.getElementById('longitudB').value;
    var señalA = document.getElementById('señalA').value;

    if (gananciaA === '' || distancia === '' || frecuencia === '' || atenuacion === '' || longitudA === '' || longitudB === '' || señalA === '' || isNaN(parseFloat(gananciaA))  || isNaN(parseFloat(distancia)) || isNaN(parseFloat(frecuencia)) || isNaN(parseFloat(atenuacion)) || isNaN(parseFloat(longitudA)) || isNaN(parseFloat(longitudB)) || isNaN(parseFloat(señalA))) {
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
      const resRSSI = - 80 + 10 - ptx + aA + aB - gananciaA + el;
      //Ptx
      document.getElementById('ptx').textContent = `Ganancia de la señal del trasmisor 10 x log(10) (${señalA}mW / 1mW) = ${ptx.toFixed(3)}dB`;
      //Atenuacion cable A
      document.getElementById('cableA').textContent = `Pérdida por Atenuación en A: dB A = ${longitudA}m x ${atenuacion}dB/m = ${aA.toFixed(3)}dB`;
      //Atenuacion cable B
      document.getElementById('cableB').textContent = `Pérdida por Atenuación en B: dB B = ${longitudB}m x ${atenuacion}dB/m = ${aB.toFixed(3)}dB`;
      //Ganancia de antena A
      document.getElementById('antena').textContent = `Ganancia de antena A: ${gananciaA}dB`;
      //Atenuación en el Espacio Libre
      document.getElementById('espacio').textContent = `Atenuación en el Espacio Libre: 92.44 + 20 log(10) (${distancia}Km) + 20 log(10) (${frecuencia}GHz) = ${el.toFixed(3)}dB`;
      //RSSI
      document.getElementById('rssi').textContent = `Ganancia RSSI: ${resRSSI.toFixed(3)}dB`;

      document.getElementById('resultados').style.display = 'block';

      // También puedes reiniciar el formulario después de enviar los datos si es necesario
      // document.getElementById('miFormulario').reset();
    }
  }
