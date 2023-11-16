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
      var resultado1 = parseFloat(gananciaA) + parseFloat(distancia);
      var resultado2 = parseFloat(frecuencia) * parseFloat(atenuacion);

      document.getElementById('resultado1').textContent = resultado1;
      document.getElementById('resultado2').textContent = resultado2;
      document.getElementById('resultados').style.display = 'block';

      // También puedes reiniciar el formulario después de enviar los datos si es necesario
      // document.getElementById('miFormulario').reset();
    }
  }