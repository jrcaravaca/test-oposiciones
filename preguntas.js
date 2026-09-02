/**
 * BANCO DE PREGUNTAS PARA TEST DE OPOSICIONES
 * 
 * Instrucciones:
 * Cada objeto dentro del array 'preguntasData' representa una pregunta.
 * 
 * Campos requeridos:
 * - id: Número único para identificar la pregunta.
 * - tema: Nombre del tema o materia (sirve para filtrar en la pantalla inicial).
 * - pregunta: Texto del enunciado de la pregunta.
 * - opciones: Array con exactamente 4 opciones de respuesta en texto.
 * - respuestaCorrecta: Índice numérico (0, 1, 2 o 3) de la opción correcta:
 *       0 -> Primera opción (A)
 *       1 -> Segunda opción (B)
 *       2 -> Tercera opción (C)
 *       3 -> Cuarta opción (D)
 * - explicacion: (Opcional) Texto explicativo que se muestra al responder.
 */

const preguntasData = [
  {
    id: 1,
    tema: "Constitución Española - Título Preliminar",
    pregunta: "¿En qué artículo de la Constitución Española se establece que la soberanía nacional reside en el pueblo español?",
    opciones: [
      "Artículo 1.1",
      "Artículo 1.2",
      "Artículo 1.3",
      "Artículo 2.0"
    ],
    respuestaCorrecta: 1,
    explicacion: "El artículo 1.2 de la CE dicta expresamente: 'La soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado'."
  },
  {
    id: 2,
    tema: "Constitución Española - Título Preliminar",
    pregunta: "Según la Constitución Española, ¿cuál es la forma política del Estado español?",
    opciones: [
      "República Parlamentaria",
      "Monarquía Constitucional",
      "Monarquía Parlamentaria",
      "Estado Social y Democrático"
    ],
    respuestaCorrecta: 2,
    explicacion: "El artículo 1.3 de la Constitución Española establece que 'La forma política del Estado español es la Monarquía parlamentaria'."
  },
  {
    id: 3,
    tema: "Constitución Española - Derechos Fundamentales",
    pregunta: "Los españoles son iguales ante la ley, sin que pueda prevalecer discriminación alguna. ¿En qué artículo de la Constitución se recoge este principio de igualdad?",
    opciones: [
      "Artículo 9.3",
      "Artículo 10",
      "Artículo 14",
      "Artículo 15"
    ],
    respuestaCorrecta: 2,
    explicacion: "El artículo 14 de la CE proclama que los españoles son iguales ante la ley, sin discriminación por nacimiento, raza, sexo, religión u opinión."
  },
  {
    id: 4,
    tema: "Derecho Administrativo - Ley 39/2015",
    pregunta: "Según la Ley 39/2015, de Procedimiento Administrativo Común, ¿cuál es el plazo general para la notificación de un acto administrativo?",
    opciones: [
      "5 días a partir de la fecha en que el acto haya sido dictado",
      "10 días a partir de la fecha en que el acto haya sido dictado",
      "15 días a partir de la fecha en que el acto haya sido dictado",
      "1 mes a partir de la fecha en que el acto haya sido dictado"
    ],
    respuestaCorrecta: 1,
    explicacion: "El artículo 40.2 de la Ley 39/2015 indica que toda notificación deberá ser cursada dentro del plazo de diez días a partir de la fecha en que el acto haya sido dictado."
  },
  {
    id: 5,
    tema: "Derecho Administrativo - Ley 39/2015",
    pregunta: "Salvo que una norma con rango de ley establezca lo contrario, los plazos señalados por días en el procedimiento administrativo se entienden que son:",
    opciones: [
      "Días naturales",
      "Días lectivos",
      "Días hábiles, excluyéndose sábados, domingos y festivos",
      "Días hábiles, incluyéndose los sábados pero excluyéndose domingos y festivos"
    ],
    respuestaCorrecta: 2,
    explicacion: "Según el artículo 30.2 de la Ley 39/2015, los plazos por días se entienden hábiles, excluyéndose del cómputo los sábados, domingos y los declarados festivos."
  },
  {
    id: 6,
    tema: "Estatuto Básico del Empleado Público (TREBEP)",
    pregunta: "¿Cuál de los siguientes NO es un tipo de empleado público según el TREBEP?",
    opciones: [
      "Personal funcionario de carrera",
      "Personal interino",
      "Personal eventual",
      "Personal mercantil contratado"
    ],
    respuestaCorrecta: 3,
    explicacion: "El Art. 8 del TREBEP clasifica a los empleados públicos en: funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual."
  },
  {
    id: 7,
    tema: "Estatuto Básico del Empleado Público (TREBEP)",
    pregunta: "¿Qué título del TREBEP regula los Derechos y Deberes del Empleado Público y el Código de Conducta?",
    opciones: [
      "Título II",
      "Título III",
      "Título IV",
      "Título V"
    ],
    respuestaCorrecta: 1,
    explicacion: "El Título III del Real Decreto Legislativo 5/2015 (TREBEP) está dedicado íntegramente a los Derechos y Deberes del Empleado Público. Código de Conducta."
  },
  {
    id: 8,
    tema: "Constitución Española - La Corona",
    pregunta: "¿Ante quién presta juramento el Rey al ser proclamado ante las Cortes Generales?",
    opciones: [
      "Ante el Presidente del Gobierno",
      "Ante las Cortes Generales",
      "Ante el Tribunal Constitucional",
      "Ante el Consejo de Estado"
    ],
    respuestaCorrecta: 1,
    explicacion: "El artículo 61.1 de la Constitución establece que el Rey, al ser proclamado ante las Cortes Generales, prestará juramento ante las mismas."
  }
];

if (typeof window !== 'undefined') {
  window.preguntasData = preguntasData;
}
