/**
 * PLANTILLA PARA AÑADIR UN NUEVO TEMA DE PREGUNTAS
 * =================================================
 * Copia este archivo con el nombre del tema (ej. tema01.js, tema02.js, etc.)
 * e inserta tus preguntas dentro del array window.preguntasData.push(...)
 * 
 * Recuerda incluir el nuevo archivo en index.html:
 * <script src="preguntas/tema01.js"></script>
 */

window.preguntasData = window.preguntasData || [];

window.preguntasData.push(
  {
    id: 1,
    tema: "Tema 1: Nombre del Tema",
    pregunta: "Escribe aquí el enunciado de la pregunta...",
    opciones: [
      "Primera opción (A)",
      "Segunda opción (B)",
      "Tercera opción (C)",
      "Cuarta opción (D)"
    ],
    respuestaCorrecta: 0 // Índice numérico: 0 -> A, 1 -> B, 2 -> C, 3 -> D
  }
  // Añade más objetos de preguntas separados por comas...
);
