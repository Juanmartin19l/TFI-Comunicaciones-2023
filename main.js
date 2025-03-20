// Lista de antenas
const listaDeAntenas = [
  {
    nombre: "ANT-2X2-2714",
    bandaBaja: 2.4,
    bandaAlta: 2.483,
    peakGain: 14,
    imagen: "./img/Antenas/ANT-2X2-2714.webp",
  },
  {
    nombre: "ANT-2X2-5010",
    bandaBaja: 5.15,
    bandaAlta: 5.875,
    peakGain: 10,
    imagen: "./img/Antenas/ANT-2X2-5010.webp",
  },
  {
    nombre: "ANT-2X2-5314",
    bandaBaja: 4.9,
    bandaAlta: 5.875,
    peakGain: 14,
    imagen: "./img/Antenas/ANT-2X2-5314.webp",
  },
  {
    nombre: "ANT-2X2-5005",
    bandaBaja: 5.15,
    bandaAlta: 5.875,
    peakGain: 5,
    imagen: "./img/Antenas/ANT-2X2-5005.webp",
  },
  {
    nombre: "ANT-2X2-2314",
    bandaBaja: 2.4,
    bandaAlta: 2.5,
    peakGain: 14,
    imagen: "./img/Antenas/ANT-2X2-2314.webp",
  },
  {
    nombre: "ANT-2X2-2005",
    bandaBaja: 2.4,
    bandaAlta: 2.5,
    peakGain: 5,
    imagen: "./img/Antenas/ANT-2X2-2005.webp",
  },
  {
    nombre: "ANT-3X3-5712",
    bandaBaja: 4.9,
    bandaAlta: 6.0,
    peakGain: 11.5,
    imagen: "./img/Antenas/ANT-3X3-5712.webp",
  },
  {
    nombre: "ANT-3X3-5010",
    bandaBaja: 4.9,
    bandaAlta: 5.875,
    peakGain: 10,
    imagen: "./img/Antenas/ANT-3X3-5010.webp",
  },
  {
    nombre: "ANT-3X3-5005",
    bandaBaja: 4.9,
    bandaAlta: 5.875,
    peakGain: 5,
    imagen: "./img/Antenas/ANT-3X3-5005.webp",
  },
  {
    nombre: "ANT-3X3-2005",
    bandaBaja: 2.4,
    bandaAlta: 2.5,
    peakGain: 5,
    imagen: "./img/Antenas/ANT-3X3-2005.webp",
  },
];

// Función para seleccionar antenas
function seleccionarAntenas(banda, peakGainA) {
  // Usa Array.filter() para buscar todas las antenas que cumplen las condiciones
  const antenasCoincidentes = listaDeAntenas.filter(
    (antena) =>
      banda >= antena.bandaBaja &&
      banda <= antena.bandaAlta &&
      peakGainA <= antena.peakGain
  );
  // Devuelve el array de antenas coincidentes
  return antenasCoincidentes;
}

function enviarDatos() {
  // Limpiar resultados anteriores
  document.getElementById("ptx").innerHTML = "dBm";
  document.getElementById("cableA").innerHTML = "dB";
  document.getElementById("cableB").innerHTML = "dB";
  document.getElementById("antena").innerHTML = "dBi";
  document.getElementById("espacio").innerHTML = "dB";
  document.getElementById("antenaB").innerHTML = "dBi";
  document.getElementById("tipoAntena").innerHTML = "";

  // Obtener los valores de los campos y reemplazar comas por puntos
  var gananciaA = document
    .getElementById("gananciaA")
    .value.trim()
    .replace(",", ".");
  var distancia = document
    .getElementById("distancia")
    .value.trim()
    .replace(",", ".");
  var frecuencia = document
    .getElementById("frecuencia")
    .value.trim()
    .replace(",", ".");
  var atenuacion = document
    .getElementById("atenuacion")
    .value.trim()
    .replace(",", ".");
  var longitudA = document
    .getElementById("longitudA")
    .value.trim()
    .replace(",", ".");
  var longitudB = document
    .getElementById("longitudB")
    .value.trim()
    .replace(",", ".");
  var potenciaA = document
    .getElementById("potenciaA")
    .value.trim()
    .replace(",", ".");
  var sensibilidad = document
    .getElementById("sensibilidad")
    .value.trim()
    .replace(",", ".");
  var margen = document.getElementById("margen").value.trim().replace(",", ".");

  // Expresión regular para permitir solo números, punto y coma, con máximo un punto
  var regex = /^-?[0-9]+(\.[0-9]+)?$/;

  // Verificar si algún campo contiene caracteres no permitidos
  if (
    !regex.test(gananciaA) ||
    !regex.test(distancia) ||
    !regex.test(frecuencia) ||
    !regex.test(atenuacion) ||
    !regex.test(longitudA) ||
    !regex.test(longitudB) ||
    !regex.test(potenciaA) ||
    !regex.test(sensibilidad) ||
    !regex.test(margen)
  ) {
    // Mostrar mensaje de alerta si algún campo contiene caracteres no permitidos
    document.getElementById("alerta").style.display = "block";
  } else {
    // Ocultar mensaje de alerta si todos los campos están completos
    document.getElementById("alerta").style.display = "none";

    const ptx = 10 * Math.log10(potenciaA / 1);
    const aA = longitudA * atenuacion;
    const aB = longitudB * atenuacion;
    const el = 92.44 + 20 * Math.log10(distancia) + 20 * Math.log10(frecuencia);
    const resantenaB =
      parseFloat(sensibilidad) +
      parseFloat(margen) -
      ptx +
      aA +
      aB -
      gananciaA +
      el;
    const antenasElegidas = seleccionarAntenas(frecuencia, resantenaB);

    //Ptx dBm
    document.getElementById("ptx").innerHTML = `${ptx.toFixed(3)} dBm`;
    //Atenuacion cable A dB
    document.getElementById("cableA").innerHTML = `${aA.toFixed(3)} dB`;
    //Atenuacion cable B dB
    document.getElementById("cableB").innerHTML = `${aB.toFixed(3)} dB`;
    //Ganancia de antena A dBi
    document.getElementById("antena").innerHTML = `${gananciaA} dBi`;
    //Atenuación en el Espacio Libre dB
    document.getElementById("espacio").innerHTML = `${el.toFixed(3)} dB`;
    //antenaB dBm
    document.getElementById("antenaB").innerHTML = `${resantenaB.toFixed(
      3
    )} dBi`;

    //Antena
    if (antenasElegidas.length > 0) {
      const contenidoAntenas = antenasElegidas
        .map(
          (antena) =>
            `<tr><td>${antena.nombre}</td><td class="text-center"><img src="${antena.imagen}" alt="${antena.nombre}, " style="max-width: 100px;"></td></tr>`
        )
        .join("");

      document.getElementById("tipoAntena").innerHTML = contenidoAntenas;
    } else {
      document.getElementById(
        "tipoAntena"
      ).innerHTML = `No se encontraron antenas que cumplan con las condiciones.`;
    }
  }
}

function enviarDatos2() {
  // Limpiar resultados anteriores
  document.getElementById("N").innerHTML = "W";
  document.getElementById("S").innerHTML = "W";
  document.getElementById("SNR").innerHTML = "";

  // Obtener los valores de los campos y reemplazar comas por puntos
  var temperatura = document
    .getElementById("temperatura")
    .value.trim()
    .replace(",", ".");

  var sensibilidad = document
    .getElementById("sensibilidad")
    .value.trim()
    .replace(",", ".");

  var norma = document.getElementById("norma").value.trim().replace(",", ".");

  // Expresión regular para permitir solo números, punto y coma, con máximo un punto
  var regex = /^-?[0-9]+(\.[0-9]+)?$/;

  // Verificar si algún campo contiene caracteres no permitidos
  if (!regex.test(temperatura) || !regex.test(sensibilidad)) {
    // Mostrar mensaje de alerta si algún campo contiene caracteres no permitidos
    document.getElementById("alerta2").style.display = "block";
  } else {
    // Ocultar mensaje de alerta si todos los campos están completos
    document.getElementById("alerta2").style.display = "none";
    const K = parseFloat(temperatura) + 273;
    const constanteBoltzmann = 1.380649e-23;
    const N = constanteBoltzmann * K * norma;
    const S = Math.pow(10, sensibilidad / 10) / 1000;
    const SNR = S / N;
    //N
    document.getElementById("N").innerHTML = `${N.toExponential(3)} W`;
    //S
    document.getElementById("S").innerHTML = `${S.toExponential(3)} W`;
    //SNR
    document.getElementById("SNR").innerHTML = `${SNR.toFixed(3)}`;
  }
}
