# Allgemeine Umsetzungshilfe – React

Diese Umsetzungshilfe beschreibt einen Fahrplan, wie du aus einer User Story Schritt für Schritt ein funktionierendes Feature im Weather Dashboard entwickelst.

## 0. Installation und Setup

Bevor du mit der Umsetzung der User Stories beginnst, musst du ein React-Projekt aufsetzen.

### Projekt erstellen

Verwende **Vite** als Build-Tool für schnelle Entwicklung:

```bash
# Neues React-Projekt mit TypeScript erstellen
npm create vite@latest weather-dashboard -- --template react-ts

# In das Projektverzeichnis wechseln
cd weather-dashboard
```

### Dependencies installieren

Installiere die notwendigen Abhängigkeiten für das Projekt:

```bash
# Basis-Dependencies installieren
npm install

# Bootstrap für Styling mit CSS-Klassen
npm install bootstrap

# React Bootstrap für Bootstrap-Komponenten mit React-Integration
npm install react-bootstrap

```

### Bootstrap einbinden

Nach der Installation muss Bootstrap in dein Projekt eingebunden werden:

**In `main.tsx` oder `App.tsx` (am Anfang der Datei):**
```typescript
// Bootstrap CSS importieren
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Development Server starten

Starte den Entwicklungsserver:

```bash
npm run dev
```

Die App läuft dann unter `http://localhost:5173`

### Erstes Cleanup (Optional)

Entferne Beispiel-Code aus dem Template:
- Lösche `App.css` Inhalte (oder behalte nur Basis-Styles)
- Bereinige `App.tsx` auf ein minimales Gerüst
- Entferne nicht benötigte Beispiel-Assets

**Minimales App.tsx Gerüst:**
```typescript
function App() {
  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <p>Bereit für Story 1!</p>
    </div>
  );
}

export default App;
```

Jetzt bist du bereit, mit Story 1 zu beginnen!

## 1. Von der Story zum Mock
- Starte jede Story mit einem UI-Mock (Platzhalter oder Dummy-Daten reichen).
- Ziel: Oberfläche sichtbar machen, bevor Logik, Datenanbindung und Styling folgen.
- Ergänze das Feature anschließend iterativ:
  1. State hinzufügen
  2. API-Calls ergänzen
  3. Lade- und Fehlerzustände gestalten
  4. Styling verfeinern

## 2. Entscheidung: Page, Component, Hook, Context oder Service?

### Page
- Entspricht einer Route, z. B. `/search`, `/favorites`, `/city/:id`.
- Enthält das große Ganze einer Funktionalität und orchestriert Datenflüsse.
- Frage: Braucht der Teil eine eigene URL? Wenn ja, bau eine Page.

### Component
- Wiederverwendbarer UI-Baustein ohne globale Logik.
- Bekommt Daten und Callbacks über Props.
- Frage: Wird der Teil mehrfach oder an verschiedenen Stellen benötigt? Wenn ja, baue eine Komponente.

### Hook
- Kapselt Logik mit State und Side Effects.
- Enthält kein UI, liefert nur Funktionalität.
- Beispiele: `useDebounce`, `useCitySearch`.
- Frage: Soll wiederverwendbare Logik (State + Effekte) entstehen? Wenn ja, erstelle einen Hook.

#### Exkurs: Side Effects
- Side Effects sind Effekte außerhalb des Renderings, z. B. API-Calls, Timer, Event-Listener, `localStorage`.
- In React steuerst du sie mit `useEffect`.
- Eigene Hooks helfen, Side Effects sauber zu kapseln und Komponenten schlank zu halten.

### Service
- Kapselt externe Zugriffe wie API- oder `localStorage`-Zugriffe.
- Hält UI-Komponenten fokussiert.
- Frage: Greifst du auf externe Daten oder Storage zu? Wenn ja, baue einen Service.

### Service vs. Hook
- Service: reine Logik ohne React.
- Hook: React-Integration (State + Effekte), kann Services nutzen.

### Context
- Macht Daten global im Komponentenbaum verfügbar.
- Beispiele: `SelectedCityContext`, `FavoritesContext`.
- Frage: Brauchen mehrere Komponenten denselben Wert? Wenn ja, nutze Context.

## 3. Vorgehensweise pro Story
1. Story lesen und UI grob skizzieren (Mock).
2. Entscheiden, welche Pages, Components, Hooks, Contexts und Services nötig sind.
3. Dateien und Boilerplate anlegen.
4. Dummy-Daten einsetzen, um das UI sichtbar zu machen.
5. Funktionalität iterativ ergänzen:
   - State anlegen
   - API- oder Storage-Anbindung herstellen
   - Lade- und Fehlerzustände umsetzen
   - Exkurse aus den Hilfen berücksichtigen
6. Akzeptanzkriterien als Checkliste prüfen.

## 4. Tipps und Best Practices
- Klein anfangen, dann erweitern.
- Klare Struktur: `pages/`, `components/`, `hooks/`, `services/`, `context/`, `types/`.
- Verantwortlichkeiten trennen:
  - Page = Orchestrierung
  - Component = UI
  - Hook = Logik
  - Context = globaler State
  - Service = API/Storage
- Iterativ arbeiten: Jede Story liefert ein Feature, am Ende wächst alles zusammen.
