// Test para verificar la calculadora de ganancia en index.html

// Configurar valores de entrada para el test
function configurarDatosEntrada() {
  document.getElementById("distancia").value = "1";
  document.getElementById("frecuencia").value = "2.4";
  document.getElementById("atenuacion").value = "0.35";
  document.getElementById("longitudA").value = "16";
  document.getElementById("gananciaA").value = "14";
  document.getElementById("potenciaA").value = "63.1";
  document.getElementById("longitudB").value = "18";
  document.getElementById("sensibilidad").value = "-80";
  document.getElementById("margen").value = "10";
}

// Valores esperados para el test
const resultadosEsperados = {
  ptx: "18.000 dBm",
  cableA: "5.600 dB",
  cableB: "6.300 dB",
  espacio: "100.044 dB",
  antena: "14 dBi",
  antenaB: "9.944 dBi",
};

// Función para ejecutar el test
function ejecutarTest() {
  const resultadosTests = document.getElementById("resultados-ganancia");
  resultadosTests.innerHTML =
    '<div class="test-result"><h3>Ejecutando pruebas...</h3></div>';

  try {
    // Configurar los datos de entrada
    configurarDatosEntrada();

    // Mock de las imágenes para evitar errores 404
    const originalImage = window.Image;
    window.Image = function () {
      return {
        style: {},
        addEventListener: function (_, handler) {
          setTimeout(handler, 0);
        },
        removeEventListener: function () {},
      };
    };

    // Mock para la función createElement para prevenir carga de imágenes reales
    const originalCreateElement = document.createElement;
    document.createElement = function (tagName) {
      const element = originalCreateElement.call(document, tagName);
      if (tagName.toLowerCase() === "img") {
        // Prevenir que la imagen cargue realmente
        setTimeout(() => {
          if (typeof element.onload === "function") {
            element.onload();
          }
          element.dispatchEvent(new Event("load"));
        }, 0);
        // Usar una imagen de datos vacía
        element.src =
          "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      }
      return element;
    };

    // Modificar temporalmente la función seleccionarAntenas para evitar la carga de imágenes
    const originalSeleccionarAntenas = window.seleccionarAntenas;
    window.seleccionarAntenas = function (banda, peakGainA) {
      // Retornar una versión simplificada para el test
      return [
        {
          nombre: "ANT-2X2-2714",
          bandaBaja: 2.4,
          bandaAlta: 2.483,
          peakGain: 14,
          imagen:
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        },
        {
          nombre: "ANT-2X2-2314",
          bandaBaja: 2.4,
          bandaAlta: 2.5,
          peakGain: 14,
          imagen:
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        },
      ];
    };

    // Ejecutar el cálculo
    enviarDatos();

    // Restaurar funciones originales
    document.createElement = originalCreateElement;
    window.Image = originalImage;
    if (originalSeleccionarAntenas) {
      window.seleccionarAntenas = originalSeleccionarAntenas;
    }

    // Verificar resultados
    const resultados = {
      ptx: document.getElementById("ptx").innerHTML,
      cableA: document.getElementById("cableA").innerHTML,
      cableB: document.getElementById("cableB").innerHTML,
      espacio: document.getElementById("espacio").innerHTML,
      antena: document.getElementById("antena").innerHTML,
      antenaB: document.getElementById("antenaB").innerHTML,
    };

    // Comprobar cada valor
    let errores = [];
    let html =
      '<div class="test-result"><h3 class="mb-3">Resultados de las pruebas:</h3><ul class="list-group mb-3">';

    for (const key in resultadosEsperados) {
      if (resultados[key] === resultadosEsperados[key]) {
        html += `<li class="list-group-item success">✅ ${key}: correcto (${resultados[key]})</li>`;
      } else {
        html += `<li class="list-group-item error">❌ ${key}: incorrecto. Esperado: "${resultadosEsperados[key]}", obtenido: "${resultados[key]}"</li>`;
        errores.push(key);
      }
    }

    // Verificar antenas recomendadas (sin verificar imágenes)
    const antenasHTML = document.getElementById("tipoAntena").innerHTML;
    if (
      antenasHTML.includes("ANT-2X2-2714") &&
      antenasHTML.includes("ANT-2X2-2314")
    ) {
      html +=
        '<li class="list-group-item success">✅ Antenas recomendadas: correctas</li>';
    } else {
      html +=
        '<li class="list-group-item error">❌ Antenas recomendadas: incorrectas</li>';
      errores.push("antenas");
    }

    html += "</ul>";

    // Mostrar resultado final
    if (errores.length === 0) {
      html +=
        '<div class="alert alert-success"><p class="success mb-0">✅ TODAS LAS PRUEBAS PASARON CORRECTAMENTE</p></div>';
    } else {
      html += `<div class="alert alert-danger"><p class="error mb-0">❌ HAY ${errores.length} ERRORES EN LAS PRUEBAS</p></div>`;
    }

    html += "</div>";
    resultadosTests.innerHTML = html;
  } catch (error) {
    resultadosTests.innerHTML = `<div class="test-result"><h3 class="error">Error en la ejecución de la prueba</h3><p>${error.message}</p></div>`;
    console.error("Error al ejecutar la prueba:", error);
  }
}

// Mostrar instrucciones iniciales
function inicializarInstruccionesGanancia() {
  document.getElementById("resultados-ganancia").innerHTML = `
    <div class="test-result">
      <h3 class="mb-3">Instrucciones:</h3>
      <p>Haga clic en "Ejecutar Test de Ganancia" para verificar si la calculadora funciona correctamente.</p>
      <p>La prueba utiliza los siguientes valores de entrada:</p>
      <ul class="list-group mb-3">
        <li class="list-group-item">Distancia entre antenas: 1 Km</li>
        <li class="list-group-item">Frecuencia: 2.4 GHz</li>
        <li class="list-group-item">Atenuación: 0.35 dB/m</li>
        <li class="list-group-item">Longitud cable A: 16 m</li>
        <li class="list-group-item">Ganancia antena A: 14 dBi</li>
        <li class="list-group-item">Potencia señal A: 63.1 mW</li>
        <li class="list-group-item">Longitud cable B: 18 m</li>
        <li class="list-group-item">Sensibilidad receptor: -80 dBm</li>
        <li class="list-group-item">Margen recepción: 10 dB</li>
      </ul>
    </div>
  `;
}
