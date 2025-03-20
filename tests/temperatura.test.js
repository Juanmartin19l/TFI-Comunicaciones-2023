// Test para verificar la calculadora de temperatura en temperatura.html

// Configurar valores de entrada para el test
function configurarDatosEntradaTemperatura() {
  document.getElementById("temperatura").value = "25";
  document.getElementById("norma").value = "40e6"; // IEEE 802.11n
  document.getElementById("sensibilidad").value = "-80";
}

// Valores esperados para el test
const resultadosEsperadosTemperatura = {
  N: "1.646e-13 W",
  S: "1.000e-11 W",
  SNR: "60.763",
};

// Función para ejecutar el test
function ejecutarTestTemperatura() {
  const resultadosTests = document.getElementById("resultados-temperatura");
  resultadosTests.innerHTML =
    '<div class="test-result"><h3>Ejecutando pruebas...</h3></div>';

  try {
    // Configurar los datos de entrada
    configurarDatosEntradaTemperatura();

    // Ejecutar el cálculo
    enviarDatos2();

    // Verificar resultados
    const resultados = {
      N: document.getElementById("N").innerHTML,
      S: document.getElementById("S").innerHTML,
      SNR: document.getElementById("SNR").innerHTML,
    };

    // Comprobar cada valor
    let errores = [];
    let html =
      '<div class="test-result"><h3 class="mb-3">Resultados de las pruebas:</h3><ul class="list-group mb-3">';

    for (const key in resultadosEsperadosTemperatura) {
      if (resultados[key] === resultadosEsperadosTemperatura[key]) {
        html += `<li class="list-group-item success">✅ ${key}: correcto (${resultados[key]})</li>`;
      } else {
        html += `<li class="list-group-item error">❌ ${key}: incorrecto. Esperado: "${resultadosEsperadosTemperatura[key]}", obtenido: "${resultados[key]}"</li>`;
        errores.push(key);
      }
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
function inicializarInstruccionesTemperatura() {
  document.getElementById("resultados-temperatura").innerHTML = `
    <div class="test-result">
      <h3 class="mb-3">Instrucciones:</h3>
      <p>Haga clic en "Ejecutar Test de Temperatura" para verificar si la calculadora funciona correctamente.</p>
      <p>La prueba utiliza los siguientes valores de entrada:</p>
      <ul class="list-group mb-3">
        <li class="list-group-item">Temperatura del receptor: 25 °C</li>
        <li class="list-group-item">Norma: IEEE 802.11n</li>
        <li class="list-group-item">Sensibilidad del receptor: -80 dBm</li>
      </ul>
    </div>
  `;
}

// Asociar el evento de clic al botón
document
  .getElementById("run-test")
  .addEventListener("click", ejecutarTestTemperatura);

// Mostrar instrucciones iniciales
inicializarInstruccionesTemperatura();
