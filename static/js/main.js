// Main Interactive Logic for KI-Agenten Presentation

// Topic content data in German (compiled from docs learning materials)
const topicsData = [
    {
        num: "Säule 1",
        title: "Modell (Das Gehirn)",
        desc: "Das Sprachmodell (LLM) dient als zentrales Gehirn des Agenten. Es ist verantwortlich für das Verständnis natürlicher Sprache, das Treffen von Entscheidungen, das Lösen von Problemen und das Planen zukünftiger Schritte.",
        bullets: [
            { icon: "fa-brain", title: "Verständnis & Generierung", text: "Verarbeitet Benutzeranfragen in natürlicher Sprache und generiert kontextbezogene, verständliche Antworten." },
            { icon: "fa-route", title: "Planungsfähigkeit (Reasoning)", text: "Zerlegt komplexe Aufgaben eigenständig in logische Teilaufgaben (z. B. durch Chain-of-Thought-Prompts)." },
            { icon: "fa-sliders", title: "Gemini 2.5 & 3.5 Flash", text: "Optimierte Modelle bieten schnelle Reaktionszeiten und hohe Genauigkeit für Echtzeit-Entscheidungen im Unternehmen." },
            { icon: "fa-ban", title: "Modellgrenzen überwinden", text: "Das Modell allein ist statisch ('Gehirn ohne Hände'). Erst durch Verbindung mit Werkzeugen wird es aktiv handlungsfähig." }
        ]
    },
    {
        num: "Säule 2",
        title: "Werkzeuge (Die Hände / Tools & MCP)",
        desc: "Werkzeuge (Tools) sind Schnittstellen (APIs), Code-Ausführungsumgebungen, Websuchen oder Datenbanken, auf die der Agent zugreift, um Aktionen in der Außenwelt durchzuführen.",
        bullets: [
            { icon: "fa-plug", title: "Erweiterung der Fähigkeiten", text: "Ermöglicht dem Agenten, das aktuelle Wetter abzufragen, Berechnungen auszuführen oder E-Mails zu senden." },
            { icon: "fa-database", title: "Datenquellen anbinden", text: "Über Datenbank-Tools kann der Agent auf aktuelle Unternehmensdaten zugreifen, statt sich auf veraltete Trainingsdaten zu verlassen." },
            { icon: "fa-network-wired", title: "Model Context Protocol (MCP)", text: "Ein offener Standard, der die n:m-Verbindungsproblematik löst und eine einheitliche Kommunikation zwischen Hosts, Clients und Tool-Servern ermöglicht." },
            { icon: "fa-shield-halved", title: "Sicherheit & Governance", text: "Regelt genaue Berechtigungen für Aktionen, um unerwünschten Zugriff oder Fehlfunktionen bei kritischen Systemen zu verhindern." }
        ]
    },
    {
        num: "Säule 3",
        title: "Orchestrierung (Das Nervensystem)",
        desc: "Die Orchestrierung (Orchestration) ist die Kontrolllogik, die das Modell und die Werkzeuge verbindet. Sie verwaltet den Schleifen-Ablauf, steuert das Gedächtnis (Memory) und pflegt den aktuellen Status.",
        bullets: [
            { icon: "fa-arrows-spin", title: "Die ReAct-Schleife", text: "Ein zyklischer Ablauf aus Denken (Reasoning), Handeln (Action) und Beobachten (Observation), bis das Ziel erreicht ist." },
            { icon: "fa-memory", title: "Kontext & Gedächtnis", text: "Speichert vergangene Schritte und Zwischenergebnisse, damit der Agent auch bei langen Prozessen den roten Faden behält." },
            { icon: "fa-heartbeat", title: "Selbstkorrektur", text: "Erkennt der Agent bei einer Aktion einen Fehler (z.B. eine Fehlermeldung einer API), passt er seinen Plan autonom an." },
            { icon: "fa-chart-pie", title: "Wann Agenten nutzen?", text: "Nur bei Aufgaben, die Reasoning (Planung), Tool-Use (Werkzeuge) und Autonomie (Eigenständigkeit) erfordern. Einfache Tasks sind als klassische Skripte besser aufgehoben." }
        ]
    },
    {
        num: "Säule 4",
        title: "Bereitstellung (Die Praxis / ADK & Cloud)",
        desc: "Die praktische Umsetzung erfolgt über Entwicklungs-Kits und Hosting-Plattformen. Google bietet mit dem Agent Development Kit (ADK) ein mächtiges Framework zur Erstellung von Agenten.",
        bullets: [
            { icon: "fa-code", title: "Code-basierte Definition", text: "Entwicklung von Agenten direkt in Python (agent.py) unter Verwendung des google.adk Software Development Kits." },
            { icon: "fa-file-code", title: "Konfigurations-basiert (agent.yaml)", text: "Definition von Agent-Eigenschaften (Name, Modell, Systemanweisungen, Tools) in YAML zur klaren Trennung von Logik und Konfiguration." },
            { icon: "fa-desktop", title: "adk web & adk deploy", text: "Lokales interaktives Testen im Browser mit `adk web` und direktes Deployment in die Cloud mit `adk deploy`." },
            { icon: "fa-cloud-arrow-up", title: "Google Cloud Run", text: "Der Agent wird in einem Docker-Container verpackt und serverlos in Cloud Run bereitgestellt, um hohe Skalierbarkeit und geringe Latenz zu garantieren." }
        ]
    }
];

// Topic Selection handler (called by Three.js raycaster and quick selectors)
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
    }, 200);
}

// Initialise everything
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-start-simulation').addEventListener('click', runSimulation);
    document.getElementById('btn-back-to-overview').addEventListener('click', showOverview);
    initNotebookInspector();
});
