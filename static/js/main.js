// Main Interactive Logic for KI-Agenten Presentation

// Topic content data in German (compiled from docs learning materials)
const topicsData = [
    {
        num: "Säule 1",
        title: "Reasoning-Kern (LLM)",
        desc: "Das Sprachmodell (LLM) dient als zentraler kognitiver Kern. Es analysiert Absichten, trifft Entscheidungen, zerlegt komplexe Aufgaben und plant Lösungswege.",
        bullets: [
            { icon: "fa-brain", title: "Verständnis & Generierung", text: "Verarbeitet Benutzeranfragen in natürlicher Sprache und generiert präzise, kontextbezogene Antworten." },
            { icon: "fa-route", title: "Planungsfähigkeit (Reasoning)", text: "Zerlegt Aufgaben eigenständig in logische Teiloperationen (z. B. durch Chain-of-Thought oder ReAct-Prompts)." },
            { icon: "fa-sliders", title: "Optimierte Modelle", text: "Modelle wie Gemini 1.5/2.5 Pro & Flash bieten schnelle Reaktionszeiten und hohe Genauigkeit für Echtzeit-Entscheidungen." },
            { icon: "fa-plug-circle-bolt", title: "Modellgrenzen überwinden", text: "Das LLM allein ist statisch ('Gehirn ohne Hände'). Erst durch die Verbindung mit Gedächtnis und Werkzeugen wird es handlungsfähig." }
        ]
    },
    {
        num: "Säule 2",
        title: "Gedächtnis (Memory)",
        desc: "Das Gedächtnis ermöglicht dem Agenten das Speichern, Verwalten und Abrufen von Informationen über einzelne Interaktionen hinweg.",
        bullets: [
            { icon: "fa-comments", title: "Session-Kontext (Kurzzeit)", text: "Verwaltung des aktuellen Chat-Verlaufs, um direkte Anschlussfragen korrekt beantworten zu können." },
            { icon: "fa-clock-rotate-left", title: "Langzeitgedächtnis", text: "Persistente Speicherung von Benutzerpräferenzen, Profilen und historischen Interaktionen." },
            { icon: "fa-database", title: "Semantische Suche (RAG)", text: "Einbindung von Vektordatenbanken (z. B. Vertex AI Vector Search) zum Abrufen relevanter Unternehmensdokumente." },
            { icon: "fa-arrows-spin", title: "Dynamisches Lernen", text: "Möglichkeit, den eigenen Wissensstand basierend auf Benutzerfeedback oder neuen Daten anzupassen." }
        ]
    },
    {
        num: "Säule 3",
        title: "Werkzeugekasten (Tools & APIs)",
        desc: "Werkzeuge (Tools) sind die Schnittstellen zur Außenwelt. Sie verwandeln den statischen Agenten in eine aktive, handlungsfähige Software.",
        bullets: [
            { icon: "fa-plug", title: "System-Schnittstellen", text: "Anbindung an APIs von CRMs, ERPs, E-Mail-Systemen, Wetterdiensten oder Datenbanken." },
            { icon: "fa-code", title: "Code-Ausführung (Sandboxing)", text: "Lokales Ausführen von Python-Skripten zur exakten Berechnung mathematischer oder analytischer Probleme." },
            { icon: "fa-network-wired", title: "Model Context Protocol (MCP)", text: "Ein neuer, offener Standard zur einheitlichen, sicheren Kommunikation zwischen LLMs und Tool-Servern." },
            { icon: "fa-magnifying-glass", title: "Echtzeit-Websuche", text: "Autonome Recherche im Internet, um veraltete Trainingsdaten durch aktuelle Informationen zu ergänzen." }
        ]
    },
    {
        num: "Säule 4",
        title: "Orchestrator & Guardrails",
        desc: "Die Orchestrierung steuert den Ablaufzyklus, während Guardrails (Sicherheitsleitplanken) für Governance, Datenschutz und Risikominimierung sorgen.",
        bullets: [
            { icon: "fa-arrows-split-up-and-left", title: "Ablaufsteuerung (Loops)", text: "Verwaltung von Schleifen wie ReAct (Denken, Handeln, Beobachten) zur autonomen Problemlösung." },
            { icon: "fa-shield-halved", title: "Guardrails & Sicherheit", text: "Schutz vor Prompt-Injections, Filtern von Halluzinationen und Einhaltung von DSGVO/EU AI Act Vorgaben." },
            { icon: "fa-user-check", title: "Human-in-the-Loop (HITL)", text: "Sicherheitsstufen zur manuellen Freigabe bei kritischen Aktionen (z. B. Überweisungen oder Mailversand)." },
            { icon: "fa-chart-line", title: "Monitoring & Kostenkontrolle", text: "Protokollierung aller Agenten-Schritte, Latenzen und des genauen Token-Verbrauchs." }
        ]
    }
];

// Topic Selection handler (called by interactive HTML pillars and quick selectors)
function selectTopic(index) {
    const placeholder = document.getElementById('panel-placeholder-content');
    const content = document.getElementById('panel-active-content');
    const topicNum = document.getElementById('active-topic-num');
    const topicTitle = document.getElementById('active-topic-title');
    const topicDesc = document.getElementById('active-topic-desc');
    const topicBullets = document.getElementById('active-topic-bullets');

    // Smooth transition
    content.style.opacity = 0;
    
    setTimeout(() => {
        placeholder.classList.add('hidden');
        content.classList.remove('hidden');

        const data = topicsData[index];
        topicNum.innerText = data.num;
        topicTitle.innerText = data.title;
        topicDesc.innerText = data.desc;

        // Generate bullets
        let bulletHtml = '';
        data.bullets.forEach(b => {
            bulletHtml += `
                <div class="bullet-item">
                    <i class="fa-solid ${b.icon} bullet-icon"></i>
                    <div class="bullet-text">
                        <strong>${b.title}</strong>
                        <p>${b.text}</p>
                    </div>
                </div>
            `;
        });
        topicBullets.innerHTML = bulletHtml;

        // Fade in
        content.style.opacity = 1;

        // Update active class on HTML cards
        document.querySelectorAll('.pillar-card').forEach((card, idx) => {
            if (idx === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update active class on connecting lines
        document.querySelectorAll('.connector-path').forEach((path, idx) => {
            if (idx === index) {
                path.classList.add('active');
            } else {
                path.classList.remove('active');
            }
        });
    }, 200);
}

// ==========================================================================
// ReAct Agent Simulator
// ==========================================================================

const simulationScenarios = {
    cottbus: [
        { type: "system", text: "> Starten des Agenten 'Reiseplaner_Cottbus'..." },
        { type: "system", text: "> Ziel: Plane eine Reise nach Cottbus für den 26. Juni 2026. Ankunft vor 10:00 Uhr erwünscht." },
        { type: "thought", text: "[Gedanke] Ich muss die Reise nach Cottbus planen. Zuerst frage ich das Wetter für den 26. Juni 2026 ab, um die passende Kleidung zu empfehlen." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'wetter_api' auf mit: {ort: 'Cottbus', datum: '2026-06-26'}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von wetter_api: Wetter in Cottbus am 26.06.2026: Sonnig, Höchsttemperatur 24°C, Regenwahrscheinlichkeit 5 %." },
        { type: "thought", text: "[Gedanke] Das Wetter wird sonnig und warm (24°C). Ein Regenschirm ist nicht erforderlich. Jetzt suche ich nach einer passenden Zugverbindung von Berlin Hbf nach Cottbus Hbf, mit der ich vor 10:00 Uhr ankomme." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'bahn_fahrplan' auf mit: {start: 'Berlin Hbf', ziel: 'Cottbus Hbf', ankunft_vor: '09:40'}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von bahn_fahrplan: RE2 (Direktverbindung) ab Berlin Hbf um 08:05 Uhr, Ankunft Cottbus Hbf um 09:25 Uhr. Fahrzeit: 1h 20m." },
        { type: "thought", text: "[Gedanke] Der RE2 um 08:05 Uhr ist ideal. Die Ankunft um 09:25 Uhr lässt 35 Minuten Puffer bis zum Beginn des Seminars an der BTU Cottbus um 10:00 Uhr. Ich habe alle Daten beisammen und erstelle den finalen Reiseplan." },
        { type: "answer", text: "[Antwort] Hier ist Ihr Reiseplan nach Cottbus für den Digitaltag 2026:\n\n🌤️ Wetter: Sonnig & angenehme 24°C – perfekte Bedingungen für die Anreise.\n🚆 Zugverbindung: Nehmen Sie den RE2 ab Berlin Hbf um 08:05 Uhr. Sie kommen um 09:25 Uhr am Hauptbahnhof Cottbus an.\n📍 Transfer: Vom Bahnhof Cottbus erreichen Sie den Campus der BTU in ca. 15 Minuten zu Fuß oder in 5 Minuten mit der Buslinie 12." }
    ],
    budget: [
        { type: "system", text: "> Starten des Agenten 'Budget_Analyst'..." },
        { type: "system", text: "> Ziel: Berechne das verbleibende Budget für das laufende Quartal Q2 2026." },
        { type: "thought", text: "[Gedanke] Um das verbleibende Budget zu ermitteln, muss ich zuerst das zugewiesene Gesamtbudget für Q2 2026 aus der Finanzdatenbank abfragen." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'datenbank_abfrage' auf mit: {sql: \"SELECT budget FROM budgets WHERE quartal = 'Q2_2026'\"}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von datenbank_abfrage: {budget: 50000.00, waehrung: 'EUR'}" },
        { type: "thought", text: "[Gedanke] Das Gesamtbudget beträgt 50.000 EUR. Jetzt muss ich alle bereits freigegebenen Ausgaben für Q2 2026 summieren, um die Differenz zu bilden." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'datenbank_abfrage' auf mit: {sql: \"SELECT SUM(betrag) as summe FROM ausgaben WHERE quartal = 'Q2_2026' AND status = 'freigegeben'\"}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von datenbank_abfrage: {summe: 34250.00, waehrung: 'EUR'}" },
        { type: "thought", text: "[Gedanke] Die Summe der Ausgaben beträgt 34.250 EUR. Ich berechne das Restbudget: Gesamtbudget (50.000 EUR) minus Ausgaben (34.250 EUR) ergibt 15.750 EUR. Ich bereite den Abschlussbericht vor." },
        { type: "answer", text: "[Antwort] Das verbleibende Budget für das laufende Quartal (Q2 2026) beträgt:\n\n📊 Restbudget: 15.750,00 EUR (31,5 % verbleibend)\n- Gesamtbudget: 50.000,00 EUR\n- Ausgegeben: 34.250,00 EUR (freigegebene Posten)\n\nAlle Zahlungsströme liegen im grünen Bereich." }
    ],
    email: [
        { type: "system", text: "> Starten des Agenten 'Support_Assistent'..." },
        { type: "system", text: "> Ziel: Prüfe den E-Mail-Eingang und bereite Antworten für neue Kundenanfragen vor." },
        { type: "thought", text: "[Gedanke] Ich muss den Posteingang nach ungelesenen Nachrichten durchsuchen. Ich verwende das Mail-Tool." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'email_suche' auf mit: {status: 'ungelesen', limit: 1}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von email_suche: 1 neue E-Mail gefunden.\n- Von: lehmann-logistik@t-online.de\n- Betreff: 'Anfrage Beratung KI-Agenten'\n- Inhalt: 'Sehr geehrte Damen und Herren, wir betreiben ein Logistikzentrum im Spreewald. Können Sie uns bei der automatisierten Routenplanung mit KI-Agenten helfen und ist das für uns kostenfrei?'" },
        { type: "thought", text: "[Gedanke] Der Absender fragt nach Beratung für KI-Agenten in der Logistik im Spreewald. Da das Mittelstand-Digital Zentrum Spreeland KMUs kostenfrei berät und Logistik ein Kernbereich ist, entwerfe ich eine Antwort mit einem Terminvorschlag und speichere sie als Entwurf." },
        { type: "action", text: "[Aktion] Rufe Werkzeug 'email_entwurf_erstellen' auf mit: {\n  empfaenger: 'lehmann-logistik@t-online.de',\n  betreff: 'Re: Anfrage Beratung KI-Agenten',\n  inhalt: 'Sehr geehrter Herr Lehmann, vielen Dank für Ihre E-Mail. Ja! Als Mittelstand-Digital Zentrum Spreeland unterstützen wir kleine und mittlere Unternehmen in Brandenburg kostenfrei und neutral bei der Einführung von KI-Technologien. Gerne prüfen wir den Einsatz von KI-Agenten für Ihre Routenplanung. Haben Sie nächste Woche Zeit für ein kurzes Erstgespräch? ...'\n}" },
        { type: "observation", text: "[Beobachtung] Ergebnis von email_entwurf_erstellen: Entwurf erfolgreich angelegt (Draft-ID: mail_draft_88921)." },
        { type: "thought", text: "[Gedanke] Der Entwurf wurde angelegt. Ich berichte dem Benutzer über meine durchgeführte Aktion." },
        { type: "answer", text: "[Antwort] Ich habe eine neue Anfrage von Lehmann Logistik (Spreewald) bearbeitet:\n\n📥 Anfrage: Beratung zur automatisierten Routenplanung mittels KI-Agenten.\n📝 Aktion: Antwortentwurf (Draft-ID: mail_draft_88921) wurde erstellt. Darin bestätige ich die Kostenfreiheit unserer Beratung und schlage ein erstes Online-Treffen vor. Sie können den Entwurf in Ihrem Postausgang prüfen und senden." }
    ]
};

let isSimulating = false;

async function runSimulation() {
    if (isSimulating) return;
    isSimulating = true;

    const taskSelect = document.getElementById('simulation-task');
    const terminal = document.getElementById('simulation-terminal');
    const startBtn = document.getElementById('btn-start-simulation');
    const steps = simulationScenarios[taskSelect.value];

    // Reset terminal
    terminal.innerHTML = '';
    startBtn.disabled = true;
    startBtn.innerText = "Simulation läuft...";

    for (const step of steps) {
        const line = document.createElement('div');
        line.className = `terminal-line ${step.type}`;
        terminal.appendChild(line);
        
        // Typewriter effect
        await typeText(line, step.text, step.type === "answer" ? 15 : 25);
        
        // Auto scroll
        terminal.scrollTop = terminal.scrollHeight;
        
        // Pause between lines
        await sleep(800);
    }

    startBtn.disabled = false;
    startBtn.innerText = "Simulation starten";
    isSimulating = false;
}

function typeText(element, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                // Handle newlines
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================================================
// Jupyter Notebook (.ipynb) Inspector Logic
// ==========================================================================

function initNotebookInspector() {
    const dropZone = document.getElementById('ipynb-drop-zone');
    const fileInput = document.getElementById('ipynb-file-input');
    const clearBtn = document.getElementById('btn-clear-upload');
    const previewContainer = document.getElementById('upload-preview-container');

    // Click to select file
    dropZone.addEventListener('click', () => fileInput.click());

    // Drag-over styling
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    // Drop file
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleNotebookFile(files[0]);
        }
    });

    // File selected via input
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleNotebookFile(fileInput.files[0]);
        }
    });

    // Clear preview
    clearBtn.addEventListener('click', () => {
        previewContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        fileInput.value = '';
    });
}

function handleNotebookFile(file) {
    if (!file.name.endsWith('.ipynb')) {
        alert('Bitte laden Sie eine gültige Jupyter Notebook-Datei (.ipynb) hoch.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const notebook = JSON.parse(e.target.result);
            renderNotebookPreview(file.name, notebook);
        } catch (err) {
            alert('Fehler beim Lesen der JSON-Struktur des Notebooks. Die Datei ist möglicherweise beschädigt.');
        }
    };
    reader.readAsText(file);
}

function renderNotebookPreview(fileName, notebook) {
    const dropZone = document.getElementById('ipynb-drop-zone');
    const previewContainer = document.getElementById('upload-preview-container');
    const nameEl = document.getElementById('preview-file-name');
    const statCellsEl = document.getElementById('preview-stat-cells');
    const statCodeEl = document.getElementById('preview-stat-code');
    const cellsContainer = document.getElementById('preview-cells-container');

    // Update headers
    nameEl.innerText = fileName;
    dropZone.classList.add('hidden');
    previewContainer.classList.remove('hidden');

    const cells = notebook.cells || [];
    const codeCells = cells.filter(c => c.cell_type === 'code');

    statCellsEl.innerText = `${cells.length} Zellen`;
    statCodeEl.innerText = `${codeCells.length} Code-Zellen`;

    // Clear old preview cells
    cellsContainer.innerHTML = '';

    // Render first 5 cells
    const cellsToRender = cells.slice(0, 5);
    cellsToRender.forEach((cell, idx) => {
        const cellEl = document.createElement('div');
        cellEl.className = `preview-cell ${cell.cell_type}`;

        const typeBadge = document.createElement('div');
        typeBadge.className = 'preview-cell-type';
        typeBadge.innerText = `Zelle ${idx + 1} (${cell.cell_type})`;
        cellEl.appendChild(typeBadge);

        // Join cell source array into string
        const sourceText = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
        const preEl = document.createElement('pre');
        const codeEl = document.createElement('code');
        
        // Truncate long content
        const maxLength = 250;
        const truncatedText = sourceText.length > maxLength ? sourceText.substring(0, maxLength) + '\n... [trunkiert]' : sourceText;

        codeEl.innerText = truncatedText || '[Leere Zelle]';
        preEl.appendChild(codeEl);
        cellEl.appendChild(preEl);

        cellsContainer.appendChild(cellEl);
    });

    if (cells.length > 5) {
        const extraEl = document.createElement('div');
        extraEl.className = 'terminal-line system-text';
        extraEl.style.textAlign = 'center';
        extraEl.style.padding = '10px 0';
        extraEl.innerText = `... und ${cells.length - 5} weitere Zellen.`;
        cellsContainer.appendChild(extraEl);
    }
}

function showOverview() {
    const placeholder = document.getElementById('panel-placeholder-content');
    const content = document.getElementById('panel-active-content');

    // Smooth transition
    content.style.opacity = 0;
    
    setTimeout(() => {
        content.classList.add('hidden');
        placeholder.classList.remove('hidden');
        placeholder.style.opacity = 1;

        // De-highlight all cards and connectors
        document.querySelectorAll('.pillar-card').forEach(card => card.classList.remove('active'));
        document.querySelectorAll('.connector-path').forEach(path => path.classList.remove('active'));
    }, 200);
}

// ==========================================================================
// Landing Page Quiz Logic
// ==========================================================================

let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedOptionIndex = null;

async function initQuiz() {
    try {
        const response = await fetch('quiz/questions.json');
        quizQuestions = await response.json();
    } catch (e) {
        console.warn("Could not fetch quiz questions, using hardcoded fallback.");
        quizQuestions = [
            {
                "id": 1,
                "question": "Was unterscheidet einen KI-Agenten im Kern von einem klassischen Sprachmodell (LLM)?",
                "options": [
                    "Agenten sind größer und teurer in der Ausführung.",
                    "Agenten können autonom handeln, Werkzeuge nutzen und langfristige Ziele über mehrere Schritte verfolgen.",
                    "Agenten können ausschließlich auf lokaler Hardware betrieben werden."
                ],
                "correct": 1,
                "explanation": "Ein LLM ist wie ein 'Gehirn ohne Hände'. Ein Agent hingegen kann durch Orchestrierungslogik autonom Aktionen planen, Tools aufrufen und Zwischenergebnisse auswerten."
            },
            {
                "id": 2,
                "question": "Was ist der Hauptvorteil von Open-Weights-Modellen wie Gemma 4 für den Mittelstand (KMU)?",
                "options": [
                    "Sie haben Zugriff auf das gesamte Echtzeit-Internet ohne APIs.",
                    "Sie garantieren 100% Datensouveränität und DSGVO-Compliance, da sie komplett lokal auf eigener Hardware laufen.",
                    "Sie benötigen keine Grafikkarte und laufen auf jedem alten PC."
                ],
                "correct": 1,
                "explanation": "Durch lokales Ausführen über Tools wie Ollama verlassen sensible Kundendaten oder Geschäftsgeheimnisse das Firmennetzwerk nicht, was DSGVO-Compliance sicherstellt."
            },
            {
                "id": 3,
                "question": "Welche gesetzlichen Pflichten treten am 2. August 2026 durch den EU AI Act in Kraft?",
                "options": [
                    "Sämtliche KI-Systeme müssen in der Cloud betrieben werden.",
                    "Strenge Auflagen (Risikomanagement, Logging, Aufsicht) für Hochrisiko-KI wie automatisierte HR-Bewerbersysteme.",
                    "Ein generelles Verbot von KI im Kundenservice."
                ],
                "correct": 1,
                "explanation": "Ab dem 2. August 2026 müssen Unternehmen, die KI-Systeme in 'Hochrisiko'-Bereichen wie Recruiting oder Personalmanagement einsetzen, strenge Transparenz-, Governance- und Logging-Auflagen erfüllen."
            },
            {
                "id": 4,
                "question": "Was versteht man unter dem Begriff 'Model Routing'?",
                "options": [
                    "Ein Sicherheitsverfahren zur Verschlüsselung von API-Schlüsseln.",
                    "Das dynamische Zuweisen von Aufgaben: Einfache Aufgaben gehen an kleine, günstige Modelle, teure Modelle rechnen nur komplexe Logik.",
                    "Das physische Weiterleiten von Netzwerkkabeln im lokalen Rechenzentrum."
                ],
                "correct": 1,
                "explanation": "Durch Model Routing wird Rechenleistung effizient verteilt (z.B. Datenextraktion mit Gemma 2B, Reasoning mit Gemini Pro). Das senkt API-Token-Kosten um 30 % bis 70 %."
            }
        ];
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-modal').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    selectedOptionIndex = null;
    document.getElementById('quiz-question-container').classList.remove('hidden');
    document.getElementById('quiz-feedback-container').classList.add('hidden');
    document.getElementById('quiz-result-container').classList.add('hidden');

    const q = quizQuestions[currentQuestionIndex];
    document.getElementById('quiz-question-text').innerText = q.question;

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index) {
    if (selectedOptionIndex !== null) return;
    selectedOptionIndex = index;

    const q = quizQuestions[currentQuestionIndex];
    const optionButtons = document.getElementById('quiz-options-container').children;

    if (index === q.correct) {
        optionButtons[index].classList.add('correct-choice');
        document.getElementById('quiz-feedback-status').innerText = "✓ Richtig!";
        document.getElementById('quiz-feedback-status').className = "feedback-status correct";
        quizScore++;
    } else {
        optionButtons[index].classList.add('wrong-choice');
        optionButtons[q.correct].classList.add('correct-choice');
        document.getElementById('quiz-feedback-status').innerText = "✗ Falsch";
        document.getElementById('quiz-feedback-status').className = "feedback-status wrong";
    }

    document.getElementById('quiz-feedback-text').innerText = q.explanation;
    document.getElementById('quiz-feedback-container').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-question-container').classList.add('hidden');
    document.getElementById('quiz-feedback-container').classList.add('hidden');
    document.getElementById('quiz-result-container').classList.remove('hidden');
    document.getElementById('quiz-result-score').innerText = `Sie haben ${quizScore} von ${quizQuestions.length} Fragen richtig beantwortet.`;
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
}

// Initialise everything
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-start-simulation').addEventListener('click', runSimulation);
    document.getElementById('btn-back-to-overview').addEventListener('click', showOverview);
    initNotebookInspector();
    
    // Quiz bindings
    initQuiz();
    document.getElementById('btn-start-landing-quiz').addEventListener('click', startQuiz);
    document.getElementById('btn-close-quiz').addEventListener('click', closeQuiz);
    document.getElementById('btn-next-quiz').addEventListener('click', nextQuestion);
    document.getElementById('btn-restart-quiz').addEventListener('click', startQuiz);

    // Image Lightbox bindings
    const imageModal = document.getElementById('image-modal');
    const imageTrigger = document.getElementById('history-image-trigger');
    const closeImageBtn = document.getElementById('btn-close-image-modal');
    if (imageTrigger && imageModal && closeImageBtn) {
        imageTrigger.addEventListener('click', () => {
            imageModal.classList.remove('hidden');
        });
        closeImageBtn.addEventListener('click', () => {
            imageModal.classList.add('hidden');
        });
        // Also close when clicking outside the content area
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.add('hidden');
            }
        });
    }
});
