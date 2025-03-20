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
  const resultadosTests = document.getElementById("resultados");
  resultadosTests.innerHTML =
    '<div class="test-result"><h3>Ejecutando pruebas...</h3></div>';

  try {
    // Configurar los datos de entrada
    configurarDatosEntrada();

    // Ejecutar el cálculo
    enviarDatos();

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
      '<div class="test-result"><h3>Resultados de las pruebas:</h3><ul>';

    for (const key in resultadosEsperados) {
      if (resultados[key] === resultadosEsperados[key]) {
        html += `<li class="success">✅ ${key}: correcto (${resultados[key]})</li>`;
      } else {
        html += `<li class="error">❌ ${key}: incorrecto. Esperado: "${resultadosEsperados[key]}", obtenido: "${resultados[key]}"</li>`;
        errores.push(key);
      }
    }

    // Verificar antenas recomendadas
    const antenasHTML = document.getElementById("tipoAntena").innerHTML;
    if (
      antenasHTML.includes("ANT-2X2-2714") &&
      antenasHTML.includes("ANT-2X2-2314")
    ) {
      html += '<li class="success">✅ Antenas recomendadas: correctas</li>';
    } else {
      html += '<li class="error">❌ Antenas recomendadas: incorrectas</li>';
      errores.push("antenas");
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
      <li>Distancia entre antenas: 1 Km</li>
      <li>Frecuencia: 2.4 GHz</li>
      <li>Atenuación: 0.35 dB/m</li>
      <li>Longitud cable A: 16 m</li>
      <li>Ganancia antena A: 14 dBi</li>
      <li>Potencia señal A: 63.1 mW</li>
      <li>Longitud cable B: 18 m</li>
      <li>Sensibilidad receptor: -80 dBm</li>
      <li>Margen recepción: 10 dB</li>
    </ul>
  </div>
`;
