(function () {
    const STORAGE_KEY = 'lf10-weather-progress-v1';
    let progressTimeout = null;

    // Material lädt Seiten "instant": document$ triggert nach jedem Seitenwechsel
    document.addEventListener('DOMContentLoaded', init);
    if (window.document$) document$.subscribe(init);

    function init() {
        const state = loadState();
        const key = pageKey();
        state[key] = state[key] || {};

        // Alle Task-Checkboxen im Artikel
        const boxes = document.querySelectorAll('article input[type="checkbox"]');

        boxes.forEach((box, idx) => {
            // 1) Klickbar machen (Material setzt disabled)
            if (box.hasAttribute('disabled')) {
                box.removeAttribute('disabled');
            }

            // 2) stabile ID pro Checkbox
            if (!box.dataset.trackId) {
                const heading = document.querySelector('article h1, article h2, article h3');
                const htext = heading ? heading.textContent.trim() : 'page';
                box.dataset.trackId = `${htext}#${idx}`;
            }
            const id = box.dataset.trackId;

            // 3) gespeicherten Zustand anwenden
            if (state[key][id] !== undefined) {
                box.checked = !!state[key][id];
            }

            // 4) Änderungen speichern (nur einmal, nicht doppelt)
            box.removeEventListener('change', handleCheckboxChange);
            box.addEventListener('change', handleCheckboxChange);

            function handleCheckboxChange() {
                state[key][id] = box.checked;
                saveState(state);
                updateCounters();
                scheduleProgressUpdate();
            }
        });

        updateCounters();
        scheduleProgressUpdate();
    }

    function pageKey() {
        return location.pathname.replace(/\/+$/, '');
    }
    function loadState() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
        catch { return {}; }
    }
    function saveState(s) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }

    // Optional: Zähler in #t-total / #t-done befüllen, falls vorhanden
    function updateCounters() {
        const boxes = Array.from(document.querySelectorAll('article input[type="checkbox"]'));
        const total = boxes.length;
        const done = boxes.filter(b => b.checked).length;
        const tTotal = document.getElementById('t-total');
        const tDone = document.getElementById('t-done');
        if (tTotal) tTotal.textContent = String(total);
        if (tDone) tDone.textContent = String(done);
    }

    // ========== Neue Funktionen für Navigation-Färbung ==========

    function scheduleProgressUpdate() {
        // Cancel vorherigen Timeout um mehrfache Aufrufe zu vermeiden
        if (progressTimeout) {
            clearTimeout(progressTimeout);
        }

        const boxes = document.querySelectorAll('article input[type="checkbox"]');
        const currentPath = pageKey();

        // Wenn Checkboxen vorhanden sind, Progress speichern
        if (boxes.length > 0) {
            const checked = Array.from(boxes).filter(cb => cb.checked).length;
            const total = boxes.length;
            savePageProgress(currentPath, checked, total);
        }

        // Mit Delay alle Progress-Anzeigen aktualisieren
        progressTimeout = setTimeout(() => {
            loadAllProgress();
            progressTimeout = null;
        }, 100);
    }

    function savePageProgress(path, checked, total) {
        const progress = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
        progress[path] = {
            checked,
            total,
            completed: checked === total && total > 0,
            lastUpdate: new Date().toISOString()
        };
        localStorage.setItem('tutorialProgress', JSON.stringify(progress));
    }

    function loadAllProgress() {
        const progress = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
        const navLinks = document.querySelectorAll('.md-nav__link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Bereinige den Link-Pfad
            const linkPath = normalizeHref(href);

            // Entferne alte Indicators erstmal
            const oldIndicator = link.querySelector('.progress-indicator');
            if (oldIndicator) {
                oldIndicator.remove();
            }
            link.classList.remove('completed', 'in-progress');

            // Suche matching progress
            let matched = false;
            for (const [savedPath, data] of Object.entries(progress)) {
                const normalizedSavedPath = normalizePath(savedPath);

                // Exact match oder endsWith match
                if (normalizedSavedPath === linkPath || normalizedSavedPath.endsWith(linkPath)) {
                    const { checked, total, completed } = data;

                    const indicator = document.createElement('span');
                    indicator.className = 'progress-indicator';

                    if (completed) {
                        indicator.innerHTML = ' ✓';
                        link.classList.add('completed');
                    } else if (checked > 0) {
                        indicator.innerHTML = ` (${checked}/${total})`;
                        link.classList.add('in-progress');
                    } else if (total > 0) {
                        indicator.innerHTML = ` (0/${total})`;
                    }

                    link.appendChild(indicator);
                    matched = true;
                    break; // Nur ein Match pro Link
                }
            }
        });
    }

    function normalizeHref(href) {
        return href
            .replace(/^\.\.\//, '')  // Entferne führende ../
            .replace(/\.md$/, '')    // Entferne .md
            .replace(/\/$/, '')      // Entferne trailing slash
            .toLowerCase();
    }

    //
    function normalizePath(path) {
        return path
            .replace(/^\//, '')      // Entferne leading slash
            .replace(/\/$/, '')      // Entferne trailing slash
            .toLowerCase();
    }
})();