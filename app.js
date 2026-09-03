/**
 * APP DE TEST DE OPOSICIONES - LÓGICA PRINCIPAL (Vanilla JS)
 * =========================================================
 * Manejo de estado, algoritmo Fisher-Yates, interfaz reactiva,
 * validación inmediata, tema oscuro y almacenamiento local.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------
  // 1. ESTADO GLOBAL DE LA APLICACIÓN
  // ------------------------------------------------------------------
  const state = {
    allQuestions: Array.isArray(window.preguntasData) ? window.preguntasData : [],
    activeQuestions: [],
    currentIndex: 0,
    userAnswers: [], // Array de objetos { question, selectedIndex, isCorrect }
    answeredCurrent: false,
    selectedTema: 'ALL',
    selectedOrden: 'random',
    selectedCantidad: 'ALL',
    currentFilter: 'all' // 'all', 'incorrect', 'correct' para la pantalla de resultados
  };

  // ------------------------------------------------------------------
  // 2. REFERENCIAS A ELEMENTOS DEL DOM
  // ------------------------------------------------------------------
  const DOM = {
    // Pantallas
    configScreen: document.getElementById('config-screen'),
    testScreen: document.getElementById('test-screen'),
    resultsScreen: document.getElementById('results-screen'),

    // Cabecera y Tema
    themeToggle: document.getElementById('theme-toggle'),
    themeToggleIcon: document.getElementById('theme-toggle-icon'),
    themeToggleText: document.getElementById('theme-toggle-text'),
    brandLink: document.getElementById('brand-link'),

    // Pantalla Configuración
    selectTema: document.getElementById('select-tema'),
    selectOrden: document.getElementById('select-orden'),
    selectCantidad: document.getElementById('select-cantidad'),
    groupCantidadAll: document.getElementById('group-cantidad-all'),
    groupRangoTema: document.getElementById('group-rango-tema'),
    inputDesde: document.getElementById('input-desde'),
    inputHasta: document.getElementById('input-hasta'),
    rangeInfoText: document.getElementById('range-info-text'),
    btnStart: document.getElementById('btn-start'),
    statTotalTests: document.getElementById('stat-total-tests'),
    statAvgScore: document.getElementById('stat-avg-score'),
    statAvailableQ: document.getElementById('stat-available-q'),

    // Pantalla Test
    topicBadge: document.getElementById('test-topic-badge'),
    btnQuitTest: document.getElementById('btn-quit-test'),
    progressText: document.getElementById('progress-text'),
    progressPercentage: document.getElementById('progress-percentage'),
    progressFill: document.getElementById('progress-fill'),
    questionText: document.getElementById('question-text'),
    optionsGrid: document.getElementById('options-grid'),
    btnNextQuestion: document.getElementById('btn-next-question'),

    // Pantalla Resultados
    resultsIcon: document.getElementById('results-icon'),
    resultsTitle: document.getElementById('results-title'),
    resultsSubtitle: document.getElementById('results-subtitle'),
    resultsPercentage: document.getElementById('results-percentage'),
    resultsCorrectCount: document.getElementById('results-correct-count'),
    resultsIncorrectCount: document.getElementById('results-incorrect-count'),
    resultsTotalCount: document.getElementById('results-total-count'),
    reviewList: document.getElementById('review-list'),
    btnRestartSame: document.getElementById('btn-restart-same'),
    btnGoConfig: document.getElementById('btn-go-config'),
    filterBtns: document.querySelectorAll('.filter-btn')
  };

  // ------------------------------------------------------------------
  // 3. INICIALIZACIÓN
  // ------------------------------------------------------------------
  function init() {
    initTheme();
    loadTopicsIntoSelect();
    updateConfigStats();
    updateFormUIForTopic();
    attachEventListeners();
  }

  // ------------------------------------------------------------------
  // 4. MODO CLARO / OSCURO (PERSISTENTE EN LOCALSTORAGE)
  // ------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('prepOpos_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      DOM.themeToggleIcon.textContent = '☀️';
      DOM.themeToggleText.textContent = 'Modo Claro';
      localStorage.setItem('prepOpos_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      DOM.themeToggleIcon.textContent = '🌙';
      DOM.themeToggleText.textContent = 'Modo Oscuro';
      localStorage.setItem('prepOpos_theme', 'light');
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
  }

  // ------------------------------------------------------------------
  // 5. CARGA DINÁMICA DE TEMAS Y ESTADÍSTICAS
  // ------------------------------------------------------------------
  function loadTopicsIntoSelect() {
    if (!state.allQuestions || state.allQuestions.length === 0) {
      DOM.selectTema.innerHTML = '<option value="">No hay preguntas cargadas</option>';
      DOM.statAvailableQ.textContent = '0';
      return;
    }

    DOM.statAvailableQ.textContent = state.allQuestions.length;

    // Obtener temas únicos y su conteo de preguntas
    const topicMap = new Map();
    state.allQuestions.forEach(q => {
      const topicName = q.tema || 'Tema General';
      topicMap.set(topicName, (topicMap.get(topicName) || 0) + 1);
    });

    let html = `<option value="ALL">Todos los temas mezclados (${state.allQuestions.length} preguntas)</option>`;
    topicMap.forEach((count, topicName) => {
      html += `<option value="${escapeHtml(topicName)}">${escapeHtml(topicName)} (${count} preguntas)</option>`;
    });

    DOM.selectTema.innerHTML = html;
  }

  function updateFormUIForTopic() {
    const selectedTopic = DOM.selectTema.value;

    if (selectedTopic === 'ALL') {
      DOM.groupCantidadAll.style.display = 'flex';
      DOM.groupRangoTema.style.display = 'none';
    } else {
      DOM.groupCantidadAll.style.display = 'none';
      DOM.groupRangoTema.style.display = 'flex';

      const topicQuestions = state.allQuestions.filter(q => q.tema === selectedTopic);
      const totalCount = topicQuestions.length;

      if (totalCount > 0) {
        DOM.inputDesde.min = 1;
        DOM.inputDesde.max = totalCount;
        DOM.inputDesde.value = 1;

        DOM.inputHasta.min = 1;
        DOM.inputHasta.max = totalCount;
        DOM.inputHasta.value = totalCount;

        DOM.rangeInfoText.textContent = `💡 Este tema contiene ${totalCount} preguntas disponibles (del 1 al ${totalCount}).`;
      } else {
        DOM.rangeInfoText.textContent = 'No hay preguntas disponibles para este tema.';
      }
    }
  }

  function updateConfigStats() {
    const statsHistory = JSON.parse(localStorage.getItem('prepOpos_history') || '[]');
    if (statsHistory.length === 0) {
      DOM.statTotalTests.textContent = '0';
      DOM.statAvgScore.textContent = '0%';
      return;
    }

    DOM.statTotalTests.textContent = statsHistory.length;
    const totalPercentage = statsHistory.reduce((acc, item) => acc + item.percentage, 0);
    const avgPercentage = Math.round(totalPercentage / statsHistory.length);
    DOM.statAvgScore.textContent = `${avgPercentage}%`;
  }

  // ------------------------------------------------------------------
  // 6. NAVEGACIÓN ENTRE PANTALLAS
  // ------------------------------------------------------------------
  function showScreen(screenElement) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screenElement.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ------------------------------------------------------------------
  // 7. ALGORITMO DE BARAJADO FISHER-YATES
  // ------------------------------------------------------------------
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // ------------------------------------------------------------------
  // 8. INICIO Y GESTIÓN DEL TEST
  // ------------------------------------------------------------------
  function startTest() {
    state.selectedTema = DOM.selectTema.value;
    state.selectedOrden = DOM.selectOrden.value;

    let pool = [];

    if (state.selectedTema === 'ALL') {
      pool = [...state.allQuestions];

      if (pool.length === 0) {
        alert('No hay preguntas disponibles.');
        return;
      }

      if (state.selectedOrden === 'random') {
        pool = shuffleArray(pool);
      }

      // Aplicar límite máximo de 200 preguntas para Todos los temas mezclados
      let limit = 200;
      const selectedCant = DOM.selectCantidad.value;
      if (selectedCant !== 'MAX_200') {
        const parsed = parseInt(selectedCant, 10);
        if (!isNaN(parsed) && parsed > 0) {
          limit = Math.min(parsed, 200);
        }
      }

      pool = pool.slice(0, limit);

    } else {
      const topicQuestions = state.allQuestions.filter(q => q.tema === state.selectedTema);
      const total = topicQuestions.length;

      if (total === 0) {
        alert('No hay preguntas disponibles para el tema seleccionado.');
        return;
      }

      let desde = parseInt(DOM.inputDesde.value, 10);
      let hasta = parseInt(DOM.inputHasta.value, 10);

      if (isNaN(desde) || desde < 1) desde = 1;
      if (isNaN(hasta) || hasta > total) hasta = total;

      if (desde > hasta) {
        alert(`La pregunta "Desde" (${desde}) no puede ser mayor que "Hasta" (${hasta}).`);
        return;
      }

      // Recortar rango elegido (1-based a slice 0-based)
      pool = topicQuestions.slice(desde - 1, hasta);

      // Si es aleatorio, barajar las preguntas del rango seleccionado
      if (state.selectedOrden === 'random') {
        pool = shuffleArray(pool);
      }
    }

    // Asignar al estado activo
    state.activeQuestions = pool;
    state.currentIndex = 0;
    state.userAnswers = [];
    state.answeredCurrent = false;

    showScreen(DOM.testScreen);
    renderCurrentQuestion();
  }

  // Renderizar la pregunta actual
  function renderCurrentQuestion() {
    state.answeredCurrent = false;
    const currentQ = state.activeQuestions[state.currentIndex];
    const totalQ = state.activeQuestions.length;

    // Actualizar Insignia de Tema y Progreso
    DOM.topicBadge.textContent = currentQ.tema || 'Test de Oposiciones';
    DOM.progressText.textContent = `Pregunta ${state.currentIndex + 1} de ${totalQ}`;
    
    const progressPercent = Math.round(((state.currentIndex + 1) / totalQ) * 100);
    DOM.progressPercentage.textContent = `${progressPercent}%`;
    DOM.progressFill.style.width = `${progressPercent}%`;

    // Enunciado
    DOM.questionText.textContent = currentQ.pregunta;

    // Opciones
    const letters = ['A', 'B', 'C', 'D'];
    DOM.optionsGrid.innerHTML = '';

    currentQ.opciones.forEach((opcionTexto, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';
      btn.dataset.index = index;

      btn.innerHTML = `
        <span class="option-badge">${letters[index] || index + 1}</span>
        <span class="option-text">${escapeHtml(opcionTexto)}</span>
      `;

      btn.addEventListener('click', () => handleOptionSelect(index));
      DOM.optionsGrid.appendChild(btn);
    });

    // Reset de botón Siguiente
    DOM.btnNextQuestion.classList.remove('visible');

    // Cambiar texto del botón en la última pregunta
    if (state.currentIndex === totalQ - 1) {
      DOM.btnNextQuestion.querySelector('span').textContent = 'Ver Resultados 🏁';
    } else {
      DOM.btnNextQuestion.querySelector('span').textContent = 'Siguiente Pregunta ➔';
    }
  }

  // Manejo del clic en una opción (FEEDBACK INMEDIATO)
  function handleOptionSelect(selectedIndex) {
    if (state.answeredCurrent) return; // Evitar múltiples respuestas
    state.answeredCurrent = true;

    const currentQ = state.activeQuestions[state.currentIndex];
    const isCorrect = selectedIndex === currentQ.respuestaCorrecta;

    // Guardar respuesta del usuario
    state.userAnswers.push({
      question: currentQ,
      selectedIndex: selectedIndex,
      isCorrect: isCorrect
    });

    // Aplicar clases de feedback a los botones
    const optionBtns = DOM.optionsGrid.querySelectorAll('.option-btn');

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true; // Deshabilitar todos

      if (idx === selectedIndex) {
        if (isCorrect) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('incorrect');
        }
      }

      // Marcar siempre cuál era la correcta si el usuario falló
      if (!isCorrect && idx === currentQ.respuestaCorrecta) {
        btn.classList.add('correct');
      }
    });

    // No mostrar la explicación del artículo al responder durante el test
    // (La explicación sólo estará disponible en la pantalla de revisión final)

    // Mostrar el botón de Siguiente Pregunta
    DOM.btnNextQuestion.classList.add('visible');
    DOM.btnNextQuestion.focus();
  }

  // Avanzar a la siguiente pregunta o ver resultados
  function handleNextQuestion() {
    if (!state.answeredCurrent) return;

    if (state.currentIndex < state.activeQuestions.length - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      finishTest();
    }
  }

  // ------------------------------------------------------------------
  // 9. FINALIZACIÓN Y PANTALLA DE RESULTADOS
  // ------------------------------------------------------------------
  function finishTest() {
    const total = state.userAnswers.length;
    const correctCount = state.userAnswers.filter(a => a.isCorrect).length;
    const incorrectCount = total - correctCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // Guardar en historial de localStorage
    saveTestHistory({
      date: new Date().toISOString(),
      tema: state.selectedTema,
      total: total,
      correct: correctCount,
      percentage: percentage
    });

    // Renderizar cabecera de resultados
    DOM.resultsPercentage.textContent = `${percentage}%`;
    DOM.resultsCorrectCount.textContent = correctCount;
    DOM.resultsIncorrectCount.textContent = incorrectCount;
    DOM.resultsTotalCount.textContent = total;

    // Mensaje y Emoticono motivacional
    if (percentage >= 80) {
      DOM.resultsIcon.textContent = '🏆';
      DOM.resultsTitle.textContent = '¡Excelente Trabajo!';
      DOM.resultsSubtitle.textContent = 'Tienes muy dominados los contenidos. ¡Sigue así!';
    } else if (percentage >= 50) {
      DOM.resultsIcon.textContent = '💪';
      DOM.resultsTitle.textContent = '¡Buen Intento!';
      DOM.resultsSubtitle.textContent = 'Vas por buen camino, pero conviene repasar los fallos.';
    } else {
      DOM.resultsIcon.textContent = '📚';
      DOM.resultsTitle.textContent = 'Necesita Repaso';
      DOM.resultsSubtitle.textContent = 'Revisa las explicaciones de las preguntas falladas para reforzar conceptos.';
    }

    // Renderizar lista de revisión
    state.currentFilter = 'all';
    updateFilterButtonsUI();
    renderReviewList();

    // Actualizar métricas del inicio
    updateConfigStats();

    showScreen(DOM.resultsScreen);
  }

  function saveTestHistory(sessionData) {
    try {
      const history = JSON.parse(localStorage.getItem('prepOpos_history') || '[]');
      history.push(sessionData);
      // Mantener solo los últimos 50 tests para optimizar almacenamiento
      if (history.length > 50) history.shift();
      localStorage.setItem('prepOpos_history', JSON.stringify(history));
    } catch (e) {
      console.warn('No se pudo guardar el historial en localStorage:', e);
    }
  }

  // Renderizar la lista detallada de revisión
  function renderReviewList() {
    DOM.reviewList.innerHTML = '';

    const filtered = state.userAnswers.filter(ans => {
      if (state.currentFilter === 'correct') return ans.isCorrect;
      if (state.currentFilter === 'incorrect') return !ans.isCorrect;
      return true; // 'all'
    });

    if (filtered.length === 0) {
      DOM.reviewList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No hay preguntas que coincidan con este filtro.</p>';
      return;
    }

    filtered.forEach((item, index) => {
      const q = item.question;
      const letters = ['A', 'B', 'C', 'D'];
      const userLetter = letters[item.selectedIndex] || '-';
      const correctLetter = letters[q.respuestaCorrecta];

      const div = document.createElement('div');
      div.className = `review-item ${item.isCorrect ? 'is-correct' : 'is-incorrect'}`;

      let content = `
        <div class="review-q-title">${index + 1}. ${escapeHtml(q.pregunta)}</div>
        <div class="review-ans-info">
          <div><strong>Tu respuesta:</strong> (${userLetter}) ${escapeHtml(q.opciones[item.selectedIndex])} ${item.isCorrect ? '✅' : '❌'}</div>
      `;

      if (!item.isCorrect) {
        content += `<div><strong>Respuesta correcta:</strong> (${correctLetter}) ${escapeHtml(q.opciones[q.respuestaCorrecta])}</div>`;
      }

      content += `</div>`;
      div.innerHTML = content;
      DOM.reviewList.appendChild(div);
    });
  }

  function updateFilterButtonsUI() {
    DOM.filterBtns.forEach(btn => {
      if (btn.dataset.filter === state.currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------
  // 10. EVENT LISTENERS
  // ------------------------------------------------------------------
  function attachEventListeners() {
    // Cambio de Tema de Color
    DOM.themeToggle.addEventListener('click', toggleTheme);

    // Cambio de Selección de Tema/Materia
    DOM.selectTema.addEventListener('change', updateFormUIForTopic);

    // Botón Empezar Test
    DOM.btnStart.addEventListener('click', startTest);

    // Botón Siguiente Pregunta
    DOM.btnNextQuestion.addEventListener('click', handleNextQuestion);

    // Abandonar Test
    DOM.btnQuitTest.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas abandonar el test en curso? Se perderá el progreso.')) {
        showScreen(DOM.configScreen);
      }
    });

    // Enlace a la marca (Ir al Inicio)
    DOM.brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (DOM.testScreen.classList.contains('active')) {
        if (confirm('¿Deseas salir del test actual para volver a la pantalla de configuración?')) {
          showScreen(DOM.configScreen);
        }
      } else {
        showScreen(DOM.configScreen);
      }
    });

    // Botones de Filtro en Resultados
    DOM.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.currentFilter = e.target.dataset.filter;
        updateFilterButtonsUI();
        renderReviewList();
      });
    });

    // Repetir Test Mismo Config
    DOM.btnRestartSame.addEventListener('click', startTest);

    // Ir a Configuración para un nuevo test
    DOM.btnGoConfig.addEventListener('click', () => {
      showScreen(DOM.configScreen);
    });

    // Atajos de teclado (Accesibilidad): 1-4 o A-D para seleccionar respuesta, Enter/Espacio para siguiente
    document.addEventListener('keydown', (e) => {
      if (!DOM.testScreen.classList.contains('active')) return;

      if (!state.answeredCurrent) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const key = e.key.toLowerCase();
        if (keyMap[key] !== undefined) {
          handleOptionSelect(keyMap[key]);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    });
  }

  // Utility para prevenir inyecciones HTML en datos dinámicos
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Inicializar la aplicación
  init();
});
