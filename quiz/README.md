# Quiz-Fragen Sammlung (Mittelstand & KI-Agenten)

Dieser Ordner dient als zentraler Ort zur Verwaltung und Sammlung von Fragen für das interaktive Quiz der Webanwendung.

## Dateien in diesem Ordner

*   [questions.json](file:///c:/Users/SvetlanaMeissner/Documents/ddoc/06_Cottbus/AI/Webseiten/ki-agenten-intro/quiz/questions.json): Die Master-Datei mit allen Multiple-Choice-Fragen, Optionen, korrekten Antworten und Erklärungen.

## Format der Fragen (`questions.json`)

Jede Frage ist ein JSON-Objekt mit folgendem Aufbau:

```json
{
  "id": 1,
  "question": "Hier steht die Frage?",
  "options": [
    "Option 1",
    "Option 2 (Korrekte Antwort)",
    "Option 3"
  ],
  "correct": 1,
  "explanation": "Hier steht die detaillierte Erklärung, warum Option 2 korrekt ist."
}
```

*   `id`: Eindeutige Nummer der Frage (fortlaufend).
*   `question`: Der Fragetext auf Deutsch.
*   `options`: Ein Array von 3 Antwortmöglichkeiten.
*   `correct`: Der 0-basierte Index der korrekten Antwort aus dem `options`-Array (z.B. `0` für die erste Option, `1` für die zweite, `2` für die dritte).
*   `explanation`: Ein kurzer, lehrreicher Begleittext, der nach der Beantwortung angezeigt wird.

## Synchronisierung mit der Web-App

Die Frontend-Seiten (`index.html` und `kmu.html`) laden die Fragen standardmäßig aus dem Pfad `/static/quiz/questions.json`.
Wenn Sie hier im Ordner `/quiz` neue Fragen hinzufügen oder bestehende anpassen:
*   Kopieren Sie die aktualisierte `questions.json` nach `static/quiz/questions.json` (oder bearbeiten Sie direkt die Datei dort).
*   Die Änderungen werden nach einem Neuladen der Seite sofort im Quiz-Modal der Landingpage sowie beim Klicken auf die fliegenden Drohnen auf dem Fahrplan wirksam.
