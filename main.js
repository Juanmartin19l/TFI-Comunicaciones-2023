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

      document.getElementById('ptx').innerHTML = `<td>Suma: ${gananciaA} + ${distancia}</td><td>${ptx}</td>`;


      //Ptx
      document.getElementById('ptx').innerHTML = `<td>Ganancia de la señal del trasmisor</td><td>${ptx.toFixed(3)} dB</td>`;
      //Atenuacion cable A
      document.getElementById('cableA').innerHTML = `<td>Pérdida por Atenuación en A</td><td>${aA.toFixed(3)} dB</td>`;
      //Atenuacion cable B
      document.getElementById('cableB').innerHTML = `<td>Pérdida por Atenuación en B</td><td>${aB.toFixed(3)} dB</td>`;
      //Ganancia de antena A
      document.getElementById('antena').innerHTML = `<td>Ganancia de antena A</td><td>${gananciaA} dB</td>`;
      //Atenuación en el Espacio Libre
      document.getElementById('espacio').innerHTML = `<td>Atenuación en el Espacio Libre</td><td>${el.toFixed(3)} dB</td>`;
      //RSSI
      document.getElementById('rssi').innerHTML = `<td>Ganancia RSSI</td><td>${resRSSI.toFixed(3)} dB</td>`;

      document.getElementById('resultados').style.display = 'block';

      // También puedes reiniciar el formulario después de enviar los datos si es necesario
      // document.getElementById('miFormulario').reset();
    }
  }
