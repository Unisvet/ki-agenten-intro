// KMU 3D Roadmap Data and Main Controller

const roadmapTopics = [
    {
        num: "Knoten 1",
        title: "KI-Agenten-Plattformen",
        desc: `
            <p style="margin-bottom:16px;">Wir haben heute eine große und vielfältige Auswahl an KI-Agenten-Plattformen. Um die passende Lösung zu finden, unterscheidet man meist zwischen Low-Code-/No-Code-Tools, Enterprise-Plattformen und Entwickler-Frameworks.</p>
            
            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-code-branch"></i> 1. Low-Code / No-Code & Workflow-Automatisierung</h4>
            <p style="font-size:0.92rem; margin-bottom:12px; color:var(--color-text-muted);">Ermöglicht es Ihnen, visuell Agenten zu bauen oder Prozesse zu automatisieren, ohne Programmierkenntnisse zu besitzen.</p>
            <ul style="padding-left:20px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <li><strong>n8n:</strong> Eine extrem beliebte Open-Source-basierte Plattform, mit der Sie visuell komplexe AI-Workflows (Agenten, die Aktionen auslösen) erstellen und lokal hosten können.</li>
                <li><strong>Make:</strong> Eine einsteigerfreundliche No-Code-Alternative, die über 2000 App-Integrationen bietet, um Daten intelligent weiterzuleiten.</li>
                <li><strong>Lindy.ai:</strong> Ein bekannter No-Code-Dienst, der darauf ausgelegt ist, sogenannte "KI-Mitarbeiter" für verschiedene Aufgaben (wie Terminplanung oder Vertrieb) zu erstellen.</li>
            </ul>

            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-building"></i> 2. Plattformen für Unternehmen (Enterprise)</h4>
            <p style="font-size:0.92rem; margin-bottom:12px; color:var(--color-text-muted);">Lassen sich tief in die bestehende Infrastruktur von großen Firmen integrieren und legen viel Wert auf Datenschutz und Skalierbarkeit.</p>
            <ul style="padding-left:20px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <li><strong>Google Cloud Gemini Agent Platform:</strong> Googles Plattform, die sich tief in Workspace (Drive, Docs) integrieren lässt und Agenten mit Langzeitgedächtnis sowie Web-Zugriff ausstattet. <a href="https://cloud.google.com/products/gemini-enterprise-agent-platform?hl=de" target="_blank" style="color:var(--color-primary); text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Info</a></li>
                <li><strong>Agentforce (Salesforce):</strong> Salesforce-Plattform für Kundenservice, Vertrieb und Commerce, die sehr gut auf Unternehmensdaten zugreifen kann. <a href="https://www.salesforce.com/eu/agentforce/demos/overview/" target="_blank" style="color:var(--color-primary); text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Info</a></li>
                <li><strong>Microsoft Copilot Studio:</strong> Die Plattform, um innerhalb des Microsoft-Ökosystems eigene Copiloten und Agenten zu konfigurieren. <a href="https://www.microsoft.com/en-us/microsoft-365-copilot/microsoft-copilot-studio" target="_blank" style="color:var(--color-primary); text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Info</a></li>
                <li><strong>Databricks Agent Bricks:</strong> Eine Enterprise-Plattform, die Daten, Machine Learning und agentisches Denken in einer sicheren Umgebung vereint. <a href="https://www.databricks.com/product/artificial-intelligence/agent-bricks" target="_blank" style="color:var(--color-primary); text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Info</a></li>
            </ul>

            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-laptop-code"></i> 3. Entwickler-Frameworks</h4>
            <p style="font-size:0.92rem; margin-bottom:12px; color:var(--color-text-muted);">Zur Programmierung eigener Softwarelösungen oder hochkomplexer, flexibler Agenten-Systeme (Multi-Agenten-Teams).</p>
            <ul style="padding-left:20px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <li><strong>CrewAI:</strong> Extrem beliebt für Systeme, bei denen mehrere Agenten (z. B. Rechercheur, Texter, Designer) als Team zusammenarbeiten.</li>
                <li><strong>LangGraph:</strong> Ideal für Agenten, die in logischen Schleifen (Denken, Handeln, Bewerten) komplexe Aufgaben lösen sollen.</li>
                <li><strong>AutoGen:</strong> Ein Microsoft-Framework für Multi-Agenten-Konversationen.</li>
            </ul>

            <div style="background:rgba(205,10,30,0.05); border:1px solid var(--color-border); border-radius:8px; padding:16px; margin-top:20px;">
                <h5 style="margin-bottom:8px; font-weight:700; color:var(--color-text-main);">Entscheidungshilfe für Ihr KMU:</h5>
                <ol style="padding-left:20px; font-size:0.88rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:4px;">
                    <li>Möchten Sie vorhandene Tools (wie CRM, JIRA, Slack) anbinden oder einen komplett neuen Agenten bauen?</li>
                    <li>Suchen Sie eine No-Code-Lösung oder soll Code geschrieben werden?</li>
                    <li>Für welchen Bereich (Kundenservice, Marketing, interne Recherche, Software-Entwicklung) wird der Agent benötigt?</li>
                </ol>
            </div>
        `
    },
    {
        num: "Knoten 2",
        title: "Datensouveränität & Gemma 4",
        desc: `
            <p style="margin-bottom:16px;">Viele mittelständische Betriebe stehen herkömmlichen Cloud-KI-Systemen aufgrund berechtigter Skepsis bezüglich des Schutzes von sensiblen Kundendaten, vertraulichen Konstruktionsplänen oder Geschäftsgeheimnissen zurückhaltend gegenüber. Werden Daten über das öffentliche Internet auf Servern externer US-Anbieter verarbeitet, birgt dies erhebliche Risiken hinsichtlich der DSGVO-Compliance.</p>
            
            <p style="margin-bottom:16px;">Die Lösung für dieses Dilemma bieten <strong>Open-Weights-Modelle wie Googles Gemma 4-Familie</strong>. Da diese fertig trainierten „digitalen Gehirne“ kostenfrei unter unbedenklichen kommerziellen Lizenzen (wie Apache 2.0) heruntergeladen werden können, ermöglichen sie es KMU, leistungsfähige KI-Systeme zu 100 Prozent lokal oder in einer privaten Cloud auf eigener Hardware zu betreiben. Sämtliche Daten verbleiben somit lückenlos im eigenen Firmennetzwerk.</p>

            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-circle-nodes"></i> Typische KMU-Anwendungen:</h4>
            <div style="display:flex; flex-direction:column; gap:12px; margin-top:10px;">
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:14px; border-radius:8px;">
                    <strong style="color:var(--color-text-main); font-size:0.95rem; display:block; margin-bottom:4px;"><i class="fa-solid fa-book-bookmark" style="color:var(--color-primary);"></i> Das sichere Offline-Firmenwiki</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Ein lokales RAG-System (Retrieval-Augmented Generation) verbindet das Modell offline mit internen Dokumentenordnern (z. B. ISO-Normen und Wartungsprotokollen im Maschinenbau).</p>
                </div>
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:14px; border-radius:8px;">
                    <strong style="color:var(--color-text-main); font-size:0.95rem; display:block; margin-bottom:4px;"><i class="fa-solid fa-screwdriver-wrench" style="color:var(--color-primary);"></i> Die lokale Assistenz im Handwerk vor Ort</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Ein optimiertes, kleines Modell auf dem Tablet eines Service-Technikers formuliert auch im Keller oder in abgelegenen Regionen ohne Mobilfunknetz direkt vor Ort fehlerfreie, professionelle Wartungsprotokolle.</p>
                </div>
            </div>
            
            <p style="font-size:0.88rem; color:var(--color-text-dark); margin-top:20px; font-style:italic;">Zur lokalen Umsetzung können KMUs kostenlose Server-Tools wie <strong>Ollama</strong> oder <strong>LM Studio</strong> nutzen, um die Gemma 4 Modelle auf einer Workstation bereitzustellen.</p>
        `
    },
    {
        num: "Knoten 3",
        title: "Die 5-Phasen-Roadmap",
        desc: `
            <p style="margin-bottom:16px;">Für eine risikoarme und wirtschaftlich tragfähige Implementierung hat sich in der Praxis ein iterativer, stufenweiser Ansatz bewährt, der auf dem Prinzip basiert: <strong>„Starten Sie mit einem digitalen Praktikanten, bevor Sie den digitalen Abteilungsleiter einstellen“</strong>.</p>
            
            <div class="phase-details-container">
                
                <div class="phase-item">
                    <div class="phase-title-row">
                        <span class="phase-number-badge">1</span>
                        <h4>Engpassanalyse & Zieldefinition</h4>
                    </div>
                    <p>Identifizieren Sie repetitive, zeitraubende Aufgaben mit klaren Regeln (z. B. in Service, Vertrieb, Buchhaltung). Erneuern Sie einen prozessaffinen „KI-Champion“ im Team (ca. 10–20 % Arbeitszeit). Fokus auf klare, messbare KPIs.</p>
                </div>

                <div class="phase-item">
                    <div class="phase-title-row">
                        <span class="phase-number-badge">2</span>
                        <h4>Die „Datenkur“ als Fundament</h4>
                    </div>
                    <p>Datenquellen (CRM, ERP, Wikis) bereinigen, strukturieren und digital zugänglich machen. Mangelhafte Datenqualität ist die Hauptursache für Halluzinationen von Agenten. Diese Bereinigung gilt als zwingender „Schritt 0“.</p>
                </div>

                <div class="phase-item">
                    <div class="phase-title-row">
                        <span class="phase-number-badge">3</span>
                        <h4>Infrastruktur- und Plattformauswahl</h4>
                    </div>
                    <p>Nutzen Sie standardisierte Plattformen mit nativer Unterstützung für Multi-Modell-Szenarien, dem Model Context Protocol (MCP), Logging und Governance. Das senkt Integrationskosten und schützt vor Vendor-Lock-in.</p>
                </div>

                <div class="phase-item">
                    <div class="phase-title-row">
                        <span class="phase-number-badge">4</span>
                        <h4>Der Pilot als „digitaler Praktikant“</h4>
                    </div>
                    <p>Starten Sie ein überschaubares, zeitlich begrenztes Pilotprojekt (4–8 Wochen) in einer Abteilung. Nutzung von Low-Code/No-Code-Tools mit geringen Kosten. Eine lückenlose menschliche Kontrolle (Human-in-the-Loop) ist hier zwingend.</p>
                </div>

                <div class="phase-item">
                    <div class="phase-title-row">
                        <span class="phase-number-badge">5</span>
                        <h4>Skalieren über Plattform-Effekte</h4>
                    </div>
                    <p>Messen Sie den realen Return on Investment (ROI). Läuft der erste Use Case stabil, können weitere Prozesse schneller und kostengünstiger angebunden werden, da Sicherheitsmodelle und Datenverbindungen bereits auf der Plattform existieren.</p>
                </div>

            </div>
        `
    },
    {
        num: "Knoten 4",
        title: "Governance & EU AI Act",
        desc: `
            <p style="margin-bottom:16px;">Der Einsatz autonomer KI-Systeme findet nicht im rechtsfreien Raum statt. Unternehmen müssen klare Richtlinien und gesetzliche Anforderungen beachten.</p>
            
            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-gavel"></i> Rechtliche Leitplanken: DSGVO & EU AI Act</h4>
            <ul style="padding-left:20px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
                <li><strong>EU AI Act (Stichtag: 2. August 2026):</strong> Ab diesem Datum gelten strenge Pflichten für Hochrisiko-Systeme. Werden Agenten z. B. im HR-Recruiting zur automatisierten Bewerberauswahl eingesetzt, müssen KMU zwingend ein Risikomanagementsystem, Daten-Governance, automatische Protokollierung und technische Mechanismen zur Aufsicht einrichten.</li>
                <li><strong>DSGVO-Compliance:</strong> Bei personenbezogenen Daten (CRM, E-Mails) ist vor Inbetriebnahme eine Datenschutz-Folgenabschätzung (DPIA) durchzuführen und Datenflüsse präzise abzubilden.</li>
            </ul>

            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-users-gear"></i> 1. Einbindung in ein „Autonomie-Konsortium“</h4>
            <p style="font-size:0.92rem; margin-bottom:12px; color:var(--color-text-muted);">Etablieren Sie eine Risiko-Autonomie-Matrix im Unternehmen:</p>
            <ul style="padding-left:20px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <li><strong>High-Risk:</strong> Zwingend <em>Human-in-the-Loop (HITL)</em>. Kritische Aktionen (z.B. Überweisungen oder Verträge) benötigen menschliche Freigabe.</li>
                <li><strong>Medium-Risk:</strong> <em>Human-on-the-Loop (HOTL)</em>. System arbeitet eigenständig, wird aber kontinuierlich überwacht und kann sofort gestoppt werden.</li>
                <li><strong>Low-Risk:</strong> <em>Human-in-command (HIC)</em>. Der Mensch setzt strategische Ziele und kontrolliert lediglich stichprobenartig.</li>
            </ul>

            <h4 style="color:var(--color-primary); margin:16px 0 8px 0;"><i class="fa-solid fa-coins"></i> 2. Kostenkontrolle durch Model Routing</h4>
            <p style="font-size:0.9rem; color:var(--color-text-muted); margin-bottom:0;">Vermeiden Sie explodierende Cloud-Rechnungen. Nutzen Sie eine Multi-Modell-Strategie: Einfache Aufgaben wie die Datenextraktion werden an kleine, extrem günstige Modelle delegiert, während teurere Rechenleistung (wie GPT-4o oder Gemini Pro) nur für komplexe logische Argumentationen beansprucht wird. Das kann Token-Kosten um <strong>30 % bis 70 % senken</strong>.</p>
        `
    },
    {
        num: "Knoten 5",
        title: "Kritische Fallstricke",
        desc: `
            <p style="margin-bottom:20px;">Vermeiden Sie bei der KI-Einführung im Mittelstand diese typischen Fehler, die häufig zum Scheitern von Projekten führen:</p>

            <div style="display:flex; flex-direction:column; gap:12px;">
                
                <div style="border-left:3px solid var(--color-primary); padding-left:14px;">
                    <strong style="color:var(--color-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-circle-xmark"></i> 1. Anbieter-Abhängigkeit (Vendor Lock-in)</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Sich auf einen einzigen Modellanbieter festlegen. Dies führt zu massiven Migrationsschmerzen und Risiken bei Preis- oder Richtlinienänderungen.</p>
                </div>

                <div style="border-left:3px solid var(--color-primary); padding-left:14px;">
                    <strong style="color:var(--color-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-circle-xmark"></i> 2. Zu viele Baustellen gleichzeitig</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Zehn Use Cases gleichzeitig starten. Der Fokus geht verloren, bevor auch nur ein einziger Agent stabil und wertschöpfend in Produktion ist.</p>
                </div>

                <div style="border-left:3px solid var(--color-primary); padding-left:14px;">
                    <strong style="color:var(--color-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-circle-xmark"></i> 3. Fehlendes Audit-Logging</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Agenten ohne lückenlose Protokollierung (Audit Trails) betreiben. Ohne Logs und API-Gateways werden autonome Systeme zu einem unkalkulierbaren Sicherheits- und Haftungsrisiko.</p>
                </div>

                <div style="border-left:3px solid var(--color-primary); padding-left:14px;">
                    <strong style="color:var(--color-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-circle-xmark"></i> 4. Mangelndes Change Management</strong>
                    <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Mitarbeiter vor vollendete Tatsachen stellen. Teams müssen früh geschult und darüber aufgeklärt werden, dass Agenten sie von administrativen Routinearbeiten befreien, um Raum für wertschöpfende Tätigkeiten zu schaffen.</p>
                </div>

            </div>
        `
    }
];

// Display a specific topic in the sidebar
function selectRoadmapTopic(index) {
    const placeholder = document.getElementById('sidebar-placeholder');
    const content = document.getElementById('sidebar-active-content');
    const topicNum = document.getElementById('active-roadmap-num');
    const topicTitle = document.getElementById('active-roadmap-title');
    const topicDesc = document.getElementById('active-roadmap-desc');

    content.style.opacity = 0;
    
    setTimeout(() => {
        placeholder.classList.add('hidden');
        content.classList.remove('hidden');

        const data = roadmapTopics[index];
        topicNum.innerText = data.num;
        topicTitle.innerText = data.title;
        topicDesc.innerHTML = data.desc;

        content.style.opacity = 1;
        
        // Highlight active 2D label overlay
        const overlays = document.querySelectorAll('.roadmap-label-overlay');
        overlays.forEach((ov, idx) => {
            if (idx === index) {
                ov.classList.add('active');
            } else {
                ov.classList.remove('active');
            }
        });
        
        // Call scene function to focus camera on the clicked 3D node
        if (typeof focusNode === 'function') {
            focusNode(index);
        }

        // Auto-open sidebar when selecting a topic
        const sidebar = document.getElementById('roadmap-sidebar');
        if (sidebar && !sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
            const toggleBtn = document.getElementById('sidebar-toggle-btn');
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> <span class="toggle-text">Schließen</span>';
                toggleBtn.classList.add('active');
            }
        }
    }, 200);
}

// Reset sidebar to default view
function closeSidebar() {
    const placeholder = document.getElementById('sidebar-placeholder');
    const content = document.getElementById('sidebar-active-content');

    content.style.opacity = 0;
    
    setTimeout(() => {
        content.classList.add('hidden');
        placeholder.classList.remove('hidden');
        placeholder.style.opacity = 1;
        
        // Reset label overlays active status
        const overlays = document.querySelectorAll('.roadmap-label-overlay');
        overlays.forEach(ov => ov.classList.remove('active'));
        
        // Return camera to default position
        if (typeof resetCamera === 'function') {
            resetCamera();
        }

        // Close sidebar
        const sidebar = document.getElementById('roadmap-sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
            const toggleBtn = document.getElementById('sidebar-toggle-btn');
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i> <span class="toggle-text">Details</span>';
                toggleBtn.classList.remove('active');
            }
        }
    }, 200);
}

// Toggle sidebar manually
function toggleSidebar() {
    const sidebar = document.getElementById('roadmap-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    if (!sidebar || !toggleBtn) return;
    
    const isOpen = sidebar.classList.toggle('open');
    if (isOpen) {
        toggleBtn.classList.add('active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> <span class="toggle-text">Schließen</span>';
    } else {
        toggleBtn.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i> <span class="toggle-text">Details</span>';
    }
}

// ==========================================================================
// Drone Quiz Logic
// ==========================================================================

let droneQuestions = [];
let activeDroneIdx = null;
let selectedQuizOptionIdx = null;
let droneSolvedStatus = [false, false, false];

async function initDroneQuiz() {
    try {
        const response = await fetch('/static/quiz/questions.json');
        droneQuestions = await response.json();
    } catch (e) {
        console.warn("Could not fetch quiz questions, using hardcoded fallback.");
        droneQuestions = [
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
            }
        ];
    }
}

function openQuiz(droneIdx) {
    activeDroneIdx = droneIdx;
    selectedQuizOptionIdx = null;

    // Retrieve corresponding question
    const q = droneQuestions[droneIdx] || droneQuestions[droneIdx % droneQuestions.length];
    if (!q) return;

    // Reset UI
    document.getElementById('quiz-modal').classList.remove('hidden');
    document.getElementById('quiz-question-container').classList.remove('hidden');
    document.getElementById('quiz-feedback-container').classList.add('hidden');
    document.getElementById('quiz-result-container').classList.add('hidden');

    // Set question text
    document.getElementById('quiz-question-text').innerText = q.question;

    // Render option buttons
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectQuizOption(idx);
        optionsContainer.appendChild(btn);
    });

    // Configure complete/close button
    const nextBtn = document.getElementById('btn-next-quiz');
    if (nextBtn) {
        nextBtn.innerText = "Abschließen";
        nextBtn.onclick = closeQuiz;
    }
}

function selectQuizOption(index) {
    if (selectedQuizOptionIdx !== null) return;
    selectedQuizOptionIdx = index;

    const q = droneQuestions[activeDroneIdx] || droneQuestions[activeDroneIdx % droneQuestions.length];
    const optionButtons = document.getElementById('quiz-options-container').children;

    const isCorrect = (index === q.correct);

    if (isCorrect) {
        optionButtons[index].classList.add('correct-choice');
        document.getElementById('quiz-feedback-status').innerText = "✓ Richtig!";
        document.getElementById('quiz-feedback-status').className = "feedback-status correct";
        droneSolvedStatus[activeDroneIdx] = true;
        
        // Dynamic premium 3D response: turn drone green!
        if (typeof roadmapDrones !== 'undefined' && roadmapDrones[activeDroneIdx]) {
            const coreMesh = roadmapDrones[activeDroneIdx].children[0];
            if (coreMesh && typeof THREE !== 'undefined') {
                coreMesh.material = new THREE.MeshStandardMaterial({
                    color: 0x10b981, // green
                    emissive: 0x10b981,
                    emissiveIntensity: 0.8,
                    roughness: 0.2,
                    metalness: 0.8
                });
            }
        }
        // Update 2D Label
        if (typeof droneLabels !== 'undefined' && droneLabels[activeDroneIdx]) {
            droneLabels[activeDroneIdx].innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:6px;"></i> Gelöst!`;
            droneLabels[activeDroneIdx].style.borderColor = 'rgba(16, 185, 129, 0.7)';
        }
    } else {
        optionButtons[index].classList.add('wrong-choice');
        optionButtons[q.correct].classList.add('correct-choice');
        document.getElementById('quiz-feedback-status').innerText = "✗ Falsch";
        document.getElementById('quiz-feedback-status').className = "feedback-status wrong";
        
        // Turn drone red!
        if (typeof roadmapDrones !== 'undefined' && roadmapDrones[activeDroneIdx]) {
            const coreMesh = roadmapDrones[activeDroneIdx].children[0];
            if (coreMesh && typeof THREE !== 'undefined') {
                coreMesh.material = new THREE.MeshStandardMaterial({
                    color: 0xcd0a1e, // red
                    emissive: 0xcd0a1e,
                    emissiveIntensity: 0.8,
                    roughness: 0.2,
                    metalness: 0.8
                });
            }
        }
        // Update 2D Label
        if (typeof droneLabels !== 'undefined' && droneLabels[activeDroneIdx]) {
            droneLabels[activeDroneIdx].innerHTML = `<i class="fa-solid fa-circle-xmark" style="color:#cd0a1e; margin-right:6px;"></i> Falsch!`;
            droneLabels[activeDroneIdx].style.borderColor = 'rgba(205, 10, 30, 0.7)';
        }
    }

    document.getElementById('quiz-feedback-text').innerText = q.explanation;
    document.getElementById('quiz-feedback-container').classList.remove('hidden');
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
}

function restartQuiz() {
    if (activeDroneIdx !== null) {
        openQuiz(activeDroneIdx);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initialise Drone Quiz
    initDroneQuiz();

    // Parse URL search parameters on load (e.g. kmu.html?topic=2)
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    if (topicParam !== null) {
        const topicIndex = parseInt(topicParam);
        if (topicIndex >= 0 && topicIndex < roadmapTopics.length) {
            // Delay slightly to allow Three.js rendering to initialize
            setTimeout(() => {
                selectRoadmapTopic(topicIndex);
            }, 600);
        }
    }
});
