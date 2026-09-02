# 📚 PrepOpos - Aplicación Web de Test para Oposiciones

¡Bienvenido/a a **PrepOpos**! Esta es una aplicación web estática, ligera y moderna, diseñada específicamente para estudiar y repasar test de oposiciones sin distracciones.

Funciona directamente en cualquier navegador web, sin necesidad de servidores, bases de datos ni instalaciones complejas. Está lista para ser publicada directamente en **GitHub Pages**.

---

## 🚀 ¿Cómo publicar tu aplicación en GitHub Pages gratis?

Publicar tu propia versión en internet para estudiarla desde tu móvil, tablet u ordenador es muy sencillo:

1. **Crear un repositorio en GitHub**:
   - Entra en [GitHub.com](https://github.com) e inicia sesión (o crea una cuenta gratuita).
   - Haz clic en el botón verde **"New"** o **"+"** para crear un nuevo repositorio.
   - Ponle un nombre (por ejemplo: `mi-test-oposiciones`).
   - Selecciona que sea **Público (Public)** y haz clic en **"Create repository"**.

2. **Subir los archivos**:
   - En la página de tu nuevo repositorio, haz clic en **"uploading an existing file"** (subir archivos existentes).
   - Arrastra y suelta todos los archivos del proyecto (`index.html`, `style.css`, `app.js`, `preguntas.js` y `README.md`).
   - Haz clic en el botón verde **"Commit changes"**.

3. **Activar GitHub Pages**:
   - Dentro de tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración) en el menú superior.
   - En la barra lateral izquierda, haz clic en **Pages**.
   - En el apartado **Build and deployment -> Branch**, selecciona `main` (o `master`) y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
   - En unos segundos, GitHub te proporcionará un enlace web (ejemplo: `https://tu-usuario.github.io/mi-test-oposiciones/`) que podrás abrir desde cualquier dispositivo.

---

## 📝 Guía para gestionar tus preguntas (`preguntas.js`)

Todas las preguntas de la aplicación están guardadas en el archivo llamado `preguntas.js`. No necesitas saber programar para añadir, modificar o eliminar preguntas; solo debes seguir unas sencillas reglas de formato.

### 📋 Plantilla para copiar y pegar una nueva pregunta

Para añadir una nueva pregunta, abre el archivo `preguntas.js`, ve al final del todo (justo antes del corchete final `];`) y pega el siguiente bloque adaptándolo con tu contenido:

```javascript
  {
    id: 9,
    tema: "Constitución Española - Derechos Fundamentales",
    pregunta: "¿Qué artículo de la Constitución Española garantiza la libertad ideológica, religiosa y de culto?",
    opciones: [
      "Artículo 14",
      "Artículo 16",
      "Artículo 18",
      "Artículo 20"
    ],
    respuestaCorrecta: 1,
    explicacion: "El artículo 16.1 de la Constitución Española garantiza la libertad ideológica, religiosa y de culto de los individuos y las comunidades."
  },
```

---

### ⚠️ Reglas importantes para no romper el formato:

1. **Cada pregunta va entre llaves `{` y `}`**.
2. **Las preguntas se separan por comas `,`**. Asegúrate de poner una coma `,` después del cierre de llave `}` de la pregunta anterior.
3. **El campo `id`**: Debe ser un número único para cada pregunta (1, 2, 3, 4...).
4. **El campo `tema`**: Escribe entre comillas el nombre exacto de la materia. Si pones el mismo nombre en varias preguntas, la aplicación las agrupará automáticamente en el selector de la pantalla inicial.
5. **El campo `pregunta`**: El enunciado entre comillas. Si quieres usar comillas dobles dentro de la pregunta, puedes usar comillas simples `''` dentro.
6. **El campo `opciones`**: Un grupo de **exactamente 4 opciones** entre comillas, separadas por comas.
7. **El campo `respuestaCorrecta`**: Es la posición de la respuesta acertada (empezando a contar desde 0):
   - `0` indica que la respuesta correcta es la **Primera opción (A)**.
   - `1` indica que la respuesta correcta es la **Segunda opción (B)**.
   - `2` indica que la respuesta correcta es la **Tercera opción (C)**.
   - `3` indica que la respuesta correcta es la **Cuarta opción (D)**.
8. **El campo `explicacion`** (Opcional): Puedes indicar la norma, ley o explicación que aparecerá cuando el opositor responda a la pregunta.

---

### ✏️ ¿Cómo editar una pregunta existente?
Abre `preguntas.js`, busca el enunciado que quieras corregir y modifica únicamente el texto que se encuentra dentro de las comillas `"..."` o el número de `respuestaCorrecta`.

### ❌ ¿Cómo eliminar una pregunta?
Localiza la pregunta que empieza por `{` y termina en `},` en `preguntas.js` y borra ese bloque completo de líneas.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica accesible.
- **Vanilla CSS3**: Variables de color, fuentes modernas, tema oscuro/claro y adaptabilidad a móviles sin librerías externas.
- **Vanilla JavaScript (ES6)**: Algoritmo de barajado Fisher-Yates, manejo de estados en tiempo real y almacenamiento en `localStorage`.

---

¡Mucho ánimo con el estudio de las oposiciones! 🎓
