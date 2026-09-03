/**
 * ARCHIVO PRINCIPAL DE REGISTRO DE PREGUNTAS
 * ==========================================
 * Este archivo inicializa el almacén global de preguntas.
 * Las preguntas individuales están organizadas por temas en la carpeta /preguntas/
 * 
 * Para añadir un nuevo tema:
 * 1. Crea un archivo en la carpeta preguntas/, por ejemplo: preguntas/tema01.js
 * 2. Añade las preguntas usando el formato del archivo de plantilla.
 * 3. Enlaza el nuevo archivo en index.html antes de app.js
 */

window.preguntasData = window.preguntasData || [];
