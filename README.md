# TFI Comunicaciones 2023

## Descripción

https://comunicaciones2023.netlify.app/

Este proyecto es un Trabajo Final Integrador (TFI) para la materia de Comunicaciones en la Universidad Tecnológica Nacional (UTN). Consiste en una aplicación web que ofrece dos calculadoras especializadas para el diseño y análisis de sistemas de comunicación inalámbrica:

1. **Calculadora de Ganancia para Antena B**: Calcula la ganancia necesaria para la antena receptora y recomienda antenas compatibles según los parámetros ingresados.

2. **Calculadora de Temperatura del Receptor**: Calcula la potencia de ruido, la potencia de señal y la relación señal-ruido (SNR) en función de la temperatura y otros parámetros del receptor.

## Estructura del Proyecto

```
├── index.html              # Página principal - Calculadora de Ganancia
├── temperatura.html        # Calculadora de Temperatura
├── main.js                 # Lógica principal de las calculadoras
├── style.css               # Estilos CSS para todo el proyecto
├── components/             # Componentes HTML reutilizables
│   ├── header.html         # Barra de navegación
│   └── footer.html         # Pie de página
├── js/
│   └── components.js       # Carga dinámica de componentes
├── img/                    # Imágenes del proyecto
│   └── Antenas/            # Imágenes de las antenas recomendables
└── tests/                  # Tests automáticos
    ├── index.test.js       # Test para la calculadora de ganancia
    ├── temperatura.test.js # Test para la calculadora de temperatura
    └── test-runner.html    # Página para ejecutar los tests
```

## Funcionalidades

### 1. Calculadora de Ganancia para Antena B

Esta calculadora permite determinar la ganancia necesaria para una antena receptora (Antena B) en un enlace de comunicación inalámbrico. Además, recomienda antenas compatibles de la matriz Aruba según los resultados obtenidos.

**Parámetros de entrada:**

- Distancia entre antenas (Km)
- Frecuencia de operación (GHz)
- Atenuación por cable (dB/m)
- Longitud del cable A (m)
- Ganancia de antena A (dBi)
- Potencia de señal A (mW)
- Longitud del cable B (m)
- Sensibilidad del receptor (dBm)
- Margen de recepción (dB)

**Resultados:**

- Ganancia de potencia señal A (dBm)
- Pérdida por atenuación en cables A y B (dB)
- Atenuación en el espacio libre (dB)
- Ganancia de antena A (dBi)
- Ganancia necesaria para antena B (dBi)
- Lista de antenas recomendadas con imágenes

### 2. Calculadora de Temperatura del Receptor

Esta calculadora analiza el comportamiento del receptor bajo diferentes condiciones de temperatura y estándares de comunicación.

**Parámetros de entrada:**

- Temperatura del receptor (°C)
- Norma (IEEE 802.11n, IEEE 802.11ac, IEEE 802.11ax)
- Sensibilidad del receptor (dBm)

**Resultados:**

- Potencia de ruido (W)
- Potencia de señal (W)
- Relación señal-ruido (SNR)

## Cómo Utilizar la Aplicación

1. Abra el archivo [`index.html`](index.html) o [`temperatura.html`](temperatura.html) en un navegador web moderno
2. Complete los campos requeridos con los valores correspondientes
3. Haga clic en el botón "Calcular"
4. Revise los resultados obtenidos en las tablas correspondientes

Para la calculadora de ganancia, el sistema también mostrará imágenes de las antenas recomendadas que cumplen con los requisitos de frecuencia y ganancia.

## Tests Automáticos

El proyecto incluye tests automáticos para verificar el correcto funcionamiento de ambas calculadoras:

1. Para ejecutar los tests, abra el archivo [`tests/test-runner.html`](tests/test-runner.html) en un navegador
2. Haga clic en el botón "Ejecutar Test de Ganancia" o "Ejecutar Test de Temperatura"
3. Revise los resultados de las pruebas

Los tests verifican que los cálculos produzcan resultados correctos para un conjunto predefinido de valores de entrada.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.2.1
- Font Awesome 6.4.0

## Autor

**Juan Martín Lavalle - 53293**  
Universidad Tecnológica Nacional - Facultad Regional Tucumán  
Comunicaciones - 2023 - 3K1

- [LinkedIn](https://www.linkedin.com/in/juan-martín-lavalle/)
- [GitHub](https://github.com/Juanmartin19l)

---

© 2023 Universidad Tecnológica Nacional - Facultad Regional Tucumán
