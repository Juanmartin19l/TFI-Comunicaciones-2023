// Test para verificar la calculadora de temperatura en temperatura.html

// Configurar valores de entrada para el test
function configurarDatosEntrada() {
  document.getElementById("temperatura").value = "25";
  document.getElementById("norma").value = "40e6"; // IEEE 802.11n
  document.getElementById("sensibilidad").value = "-80";
}

// Valores esperados para el test
const resultadosEsperados = {
  N: "1.646e-13 W",
  S: "1.000e-11 W",
  SNR: "60.763",
};

// Función para ejecutar el test
function ejecutarTest() {
  const resultadosTests = document.getElementById("resultados");
  resultadosTests.innerHTML =
    '<div class="test-result"><h3>Ejecutando pruebas...</h3></div>';

  try {
    // Configurar los datos de entrada
    configurarDatosEntrada();

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
      '<div class="test-result"><h3>Resultados de las pruebas:</h3><ul>';

    for (const key in resultadosEsperados) {
      if (resultados[key] === resultadosEsperados[key]) {
        html += `<li class="success">✅ ${key}: correcto (${resultados[key]})</li>`;
      } else {
        html += `<li class="error">❌ ${key}: incorrecto. Esperado: "${resultadosEsperados[key]}", obtenido: "${resultados[key]}"</li>`;
        errores.push(key);
      }
    }

    html += "</ul>";

    // Mostrar resultado final
    if (errores.length === 0) {
      html +=
        '<p class="success">✅ TODAS LAS PRUEBAS PASARON CORRECTAMENTE</p>';
    } else {
      html += `<p class="error">❌ HAY ${errores.length} ERRORES EN LAS PRUEBAS</p>`;
    }

    html += "</div>";
    resultadosTests.innerHTML = html;
  } catch (error) {
    resultadosTests.innerHTML = `<div class="test-result"><h3 class="error">Error en la ejecución de la prueba</h3><p>${error.message}</p></div>`;
    console.error("Error al ejecutar la prueba:", error);
  }
}

// Asociar el evento de clic al botón
document.getElementById("run-test").addEventListener("click", ejecutarTest);

// Mostrar instrucciones iniciales
document.getElementById("resultados").innerHTML = `
  <div class="test-result">
    <h3>Instrucciones:</h3>
    <p>Haga clic en "Ejecutar Test" para verificar si la calculadora funciona correctamente.</p>
    <p>La prueba utiliza los siguientes valores de entrada:</p>
    <ul>
      <li>Temperatura del receptor: 25 °C</li>
      <li>Norma: IEEE 802.11n</li>
      <li>Sensibilidad del receptor: -80 dBm</li>
    </ul>
  </div>
`;
