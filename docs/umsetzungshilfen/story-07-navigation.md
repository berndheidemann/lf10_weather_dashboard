# Umsetzungshilfe – Story 7: Navigation nutzen

## Struktur
```
src/
  components/
    Navbar.tsx             # Navbar mit Navigation
  pages/
    HomePage.tsx
    AboutPage.tsx
    ProfilePage.tsx
  App.tsx                  # Router-Setup
```

## Router-Setup
- Definiere Routen wie `/`, `/about`, `/profile`.
- Verwende `BrowserRouter` im Wurzel-Tree (`main.tsx` oder `App.tsx`).
- Die Navbar wird direkt in `App.tsx` über dem Routing-Bereich eingebunden.

## Exkurs: `NavLink` und aktive Styles
- `NavLink` ist eine spezielle Variante von `Link` aus React Router.
- Es setzt automatisch die CSS-Klasse `active`, wenn die zugehörige Route aktiv ist.
- Nutze dies, um die aktive Seite visuell hervorzuheben (z. B. fett, unterstrichen oder farbig).

## Einfaches Routing-Setup

Für die meisten Anwendungen reicht ein einfaches, flaches Routing ohne verschachtelte Routes.

**Struktur in App.tsx:**
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar ist für alle Seiten sichtbar */}
      <Navbar />
      
      {/* Content-Bereich mit Routes */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
```

**Navbar mit NavLink:**
```typescript
// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Meine App</span>
        
        <div className="navbar-nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            Über uns
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            Profil
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
```

**CSS für aktive Links:**
```css
/* src/components/Navbar.css */
.nav-link.active {
  font-weight: bold;
  text-decoration: underline;
  color: #ffffff !important;
}

/* Optional: Hover-Effekt */
.nav-link:hover {
  opacity: 0.8;
}
```

## Wie es funktioniert:
1. Die Navbar steht **außerhalb** der `<Routes>`, daher ist sie auf allen Seiten sichtbar
2. `NavLink` erhält automatisch die Klasse `active`, wenn die Route aktiv ist
3. Bei Klick auf einen Link navigiert React Router zur entsprechenden Route
4. Die passende Page-Komponente wird in `<Routes>` gerendert
5. Die Navbar bleibt persistent (wird nicht neu gemountet)

## Vorteile dieser Lösung:
- ✅ **Einfach und übersichtlich**: Keine komplexe Verschachtelung nötig
- ✅ **Navbar persistent**: Wird bei Seitenwechsel nicht neu gerendert
- ✅ **Automatische aktive Klasse**: React Router setzt `active` automatisch
- ✅ **Flexibel erweiterbar**: Neue Routes einfach zur Liste hinzufügen
- ✅ **Perfekt für kleine bis mittlere Apps**: Übersichtlich und wartbar

## Hinweis zu komplexeren Layouts:
Für sehr große Anwendungen mit vielen verschachtelten Bereichen (z.B. Admin-Dashboard mit Sidebar und Sub-Navigation) kann ein Layout-Pattern mit `Outlet` sinnvoll sein. Für die meisten Projekte ist die hier gezeigte einfache Lösung jedoch ausreichend und übersichtlicher.
