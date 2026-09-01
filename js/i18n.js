/*!
 * Subhradip Roy — portfolio site
 * EN/DE toggle. Loaded on every page, including individual journal posts —
 * every post is bilingual (see journal-guide.md).
 *
 * Usage: give any element carrying translatable text
 *   data-i18n="Exact English sentence"
 * The English sentence IS the dictionary key (same convention the source
 * prototype used), so the attribute value doubles as the English fallback —
 * nothing needs caching. Heading elements that also use the decode/scramble
 * effect (data-reveal="scramble") get re-scrambled on toggle if already
 * revealed.
 *
 * Journal post BODIES (the long-form paragraphs, as opposed to the title/
 * lede/read-time in the chrome) do NOT go through this dictionary — each
 * post's HTML has the full English and German body written out once each,
 * in a pair of [data-lang-block="en"|"de"] wrappers, and css/style.css
 * shows/hides the matching one based on <html lang>. That's deliberate:
 * routing entire blog posts through this shared dictionary would mean
 * every page on the site downloads every post's full text in both
 * languages forever, which fights the "keep the site fast" goal. Only
 * short, reused chrome strings belong in DICT.
 */
(function () {
  'use strict';

  var DICT = {
    /* nav + chrome */
    'Index': 'Start', 'Work': 'Arbeiten', 'About': 'Über mich', 'Journal': 'Journal', 'Dump': 'Dump', 'Contact': 'Kontakt',
    '(Scroll to explore)': '(Zum Entdecken scrollen)',
    'Freelance AI & Full-Stack Developer': 'Freiberuflicher KI- & Full-Stack-Entwickler',

    /* index hero */
    'Available for Q4 2026': 'Verfügbar ab Q4 2026',
    'Subhradip Roy': 'Subhradip Roy',
    '— ship software that thinks': '— Software, die denkt',
    "Most AI demos die in the sandbox. I ship the ones that don't — websites, products and AI systems that hold up under real users, real edge cases and real regulators.":
      'Die meisten KI-Demos sterben in der Sandbox. Ich liefere die, die es nicht tun — Websites, Produkte und KI-Systeme, die echten Nutzern, echten Grenzfällen und echten Aufsichtsbehörden standhalten.',
    'Email me': 'Schreib mir', 'Book a call ↗': 'Termin buchen ↗',

    /* trust strip */
    'Trusted by growing brands &': 'Vertraut von wachsenden Marken &', 'YC-backed startups': 'YC-finanzierten Startups',

    /* selected work */
    'Selected Work': 'Ausgewählte Arbeiten', 'All projects →': 'Alle Projekte →',
    'Race planning SaaS': 'Renn-Planungs-SaaS', 'Compliance engine': 'Compliance-Engine', 'Argumentation engine': 'Argumentations-Engine',

    /* story */
    'The story': 'Die Geschichte', 'so far': 'bisher',
    'Three years, thirty-odd clients, and a pattern that repeats: someone has a prototype that dazzles in a controlled demo and collapses on contact with real users, real edge cases, or a regulator.':
      'Drei Jahre, über dreißig Kunden und ein Muster, das sich wiederholt: Jemand hat einen Prototyp, der in der Demo glänzt und beim Kontakt mit echten Nutzern, Grenzfällen oder Behörden zusammenbricht.',
    'I work solo, directly with founders, in short cycles. No account managers, no discovery theatre.':
      'Ich arbeite allein, direkt mit Gründern, in kurzen Zyklen. Keine Account Manager, kein Discovery-Theater.',
    'Read the long version →': 'Die lange Version lesen →',
    'Clients served': 'Kunden betreut', 'Projects shipped': 'Projekte geliefert', 'Years shipping': 'Jahre im Einsatz', 'YC-backed teams': 'YC-finanzierte Teams',

    /* work list page */
    'Three builds that explain how I work. Scroll the column on the right — click any project for the full story.':
      'Drei Projekte, die zeigen, wie ich arbeite. Scrolle die rechte Spalte — klicke ein Projekt für die ganze Geschichte.',
    'Currently taking work for Q4 2026': 'Aktuell buchbar für Q4 2026',
    'Constraint-driven race planning': 'Constraint-basierte Rennplanung',
    'Neurosymbolic compliance engine': 'Neurosymbolische Compliance-Engine',
    'Formal argumentation engine': 'Formale Argumentations-Engine',
    'Planning SaaS for Ironman triathletes. Turns fuel, pacing, heat and course data into a plan that respects every constraint at once — not a chatbot guessing at splits.':
      'Planungs-SaaS für Ironman-Triathleten. Macht aus Verpflegung, Pacing, Hitze und Streckendaten einen Plan, der alle Constraints gleichzeitig einhält — kein Chatbot, der Splits errät.',
    'EU drone operators have to prove risk assessments, not vibe them. A symbolic rules core does the reasoning; the model only handles language.':
      'EU-Drohnenbetreiber müssen Risikobewertungen belegen, nicht erahnen. Ein symbolischer Regelkern übernimmt die Logik; das Modell nur die Sprache.',
    'Builds health-insurance appeal letters as structured arguments — every claim traced to policy language and clinical evidence, so nothing is invented.':
      'Baut Widerspruchsschreiben an Krankenversicherungen als strukturierte Argumente — jede Aussage auf Policentext und klinische Evidenz zurückgeführt, damit nichts erfunden wird.',

    /* project detail — chrome */
    '← All work': '← Alle Arbeiten',
    'The problem': 'Das Problem', 'What I built': 'Was ich gebaut habe', 'Next project': 'Nächstes Projekt',
    'Live product': 'Live-Produkt', 'Open live app ↗': 'Live-App öffnen ↗',
    'Source code': 'Quellcode', 'Frontend': 'Frontend', 'Backend': 'Backend',
    'Try RaceOS AI': 'RaceOS AI ausprobieren',
    'Try SORA Copilot': 'SORA Copilot ausprobieren',
    'Try Appeal Architect': 'Appeal Architect ausprobieren',

    /* journal post — chrome (shared by every post page) */
    '← Journal': '← Journal', 'Reply by email →': 'Per E-Mail antworten →',

    /* project detail — RaceOS AI */
    'Constraint-driven race planning for Ironman triathletes — fuelling, pacing, heat and course profile solved together instead of guessed at one at a time.':
      'Constraint-basierte Rennplanung für Ironman-Triathleten — Verpflegung, Pacing, Hitze und Streckenprofil werden gemeinsam gelöst, statt einzeln geschätzt.',
    'Triathletes were stitching plans together from spreadsheets, forum posts and coach hand-me-downs. Generic AI tools made it worse: a chatbot will happily suggest a carb intake that contradicts the bike split it recommended two paragraphs earlier.':
      'Triathleten bastelten ihre Pläne aus Tabellen, Forenbeiträgen und Trainer-Weitergaben zusammen. Generische KI-Tools machten es schlimmer: Ein Chatbot empfiehlt bereitwillig eine Kohlenhydratzufuhr, die dem zwei Absätze zuvor vorgeschlagenen Radsplit widerspricht.',
    "A solver holds the hard constraints — gut tolerance, watt ceilings, aid-station spacing, heat adjustment — and the model only handles interpretation and language. Every plan is internally consistent by construction, versioned per race, and exportable to the athlete's head unit.":
      'Ein Solver hält die harten Constraints — Magenverträglichkeit, Wattobergrenzen, Abstände der Verpflegungsstellen, Hitzeanpassung — und das Modell übernimmt nur Interpretation und Sprache. Jeder Plan ist per Konstruktion widerspruchsfrei, pro Rennen versioniert und auf den Radcomputer exportierbar.',

    /* project detail — SORA Copilot */
    'A neurosymbolic compliance engine for EU drone operations — SORA risk assessments that a regulator can actually follow.':
      'Eine neurosymbolische Compliance-Engine für EU-Drohnenbetrieb — SORA-Risikobewertungen, denen eine Behörde tatsächlich folgen kann.',
    'Specific Operations Risk Assessments are long, formal, and unforgiving. Operators were paying consultants for weeks of work, and a pure-LLM approach was a non-starter: a hallucinated mitigation is a grounded fleet.':
      'Specific Operations Risk Assessments sind lang, formal und unversöhnlich. Betreiber zahlten Berater für Wochen Arbeit, und ein reiner LLM-Ansatz war ausgeschlossen: Eine halluzinierte Maßnahme bedeutet eine stillgelegte Flotte.',
    'The reasoning lives in a symbolic rules core encoding the regulation — ground risk classes, containment, mitigations, assurance levels. The model reads operator input and writes the narrative, but never decides. Every output line traces to the rule that produced it.':
      'Die Logik liegt in einem symbolischen Regelkern, der die Verordnung abbildet — Bodenrisikoklassen, Containment, Maßnahmen, Assurance-Level. Das Modell liest die Eingaben und schreibt den Text, entscheidet aber nie. Jede Ausgabezeile verweist auf die Regel, die sie erzeugt hat.',

    /* project detail — Appeal Architect */
    'A formal argumentation engine for health-insurance appeals: every sentence in the letter is traceable to policy language or clinical evidence.':
      'Eine formale Argumentations-Engine für Widersprüche gegen Krankenversicherungen: Jeder Satz im Schreiben ist auf Policentext oder klinische Evidenz zurückführbar.',
    "Denied claims get appealed with letters written under time pressure, and the ones that win are the ones that answer the insurer's stated reason on its own terms. Free-form generation is dangerous here — an invented citation ends the appeal.":
      'Abgelehnte Leistungen werden unter Zeitdruck angefochten, und erfolgreich sind die Schreiben, die den genannten Ablehnungsgrund auf dessen eigenen Begriffen beantworten. Freie Textgenerierung ist hier gefährlich — eine erfundene Quelle beendet den Widerspruch.',
    'Denial reasons are parsed into claims, matched against policy clauses and evidence, then assembled through a formal argumentation framework that only emits a sentence if it is supported. Unsupported branches surface as gaps for a human to fill, rather than being papered over.':
      'Ablehnungsgründe werden in Aussagen zerlegt, mit Policenklauseln und Evidenz abgeglichen und über ein formales Argumentations-Framework zusammengesetzt, das einen Satz nur ausgibt, wenn er belegt ist. Unbelegte Zweige erscheinen als Lücken für einen Menschen, statt übertüncht zu werden.',

    /* about */
    'the human': 'den Menschen',
    "I'm a freelance developer in India, working with founders across the EU and US. I build websites, products and AI systems — the kind that have to keep working after the launch tweet.":
      'Ich bin freiberuflicher Entwickler in Indien und arbeite mit Gründern in der EU und den USA. Ich baue Websites, Produkte und KI-Systeme — solche, die auch nach dem Launch-Tweet noch funktionieren.',
    'Three years, thirty-odd clients, top 1% on both Upwork and Contra. The pattern in almost every project is the same: someone has a prototype that dazzles in a controlled demo and collapses on contact with real users, real edge cases, or a regulator. My job is the unglamorous half — constraints, evals, traces, fallbacks — that turns the demo into a product.':
      'Drei Jahre, über dreißig Kunden, Top 1 % auf Upwork und Contra. Das Muster ist fast überall gleich: Jemand hat einen Prototyp, der in der Demo glänzt und beim Kontakt mit echten Nutzern, Grenzfällen oder Behörden zusammenbricht. Meine Arbeit ist die unglamouröse Hälfte — Constraints, Evals, Traces, Fallbacks — die aus der Demo ein Produkt macht.',
    'I work solo and directly with founders — no account managers, no discovery theatre. Outside of work: long walks with a camera, too much coffee, and an unreasonable amount of time spent reading changelogs.':
      'Ich arbeite allein und direkt mit Gründern — keine Account Manager, kein Discovery-Theater. Außerhalb der Arbeit: lange Spaziergänge mit Kamera, zu viel Kaffee und unangemessen viel Zeit mit Changelogs.',
    'Work with me': 'Zusammenarbeiten',

    /* dump */
    'An unsorted album — places, builds and frames I refuse to delete.':
      'Ein unsortiertes Album — Orte, Projekte und Bilder, die ich nicht löschen will.',
    '06 frames': '06 Bilder', 'On rotation': 'In Dauerschleife',
    'Now playing': 'Läuft gerade',
    'Home studio': 'Heimstudio', 'Office, day one': 'Büro, Tag eins', 'Conference floor': 'Konferenzhalle',
    'Grain over sharpness. Ambient records over playlists. The ten quiet minutes before a place wakes up.':
      'Korn statt Schärfe. Ambient-Platten statt Playlists. Die zehn stillen Minuten, bevor ein Ort erwacht.',
    'Somewhere green': 'Irgendwo im Grünen', 'Desk at 3am': 'Schreibtisch, 3 Uhr', 'Golden hour': 'Goldene Stunde',
    'First server rack': 'Erstes Server-Rack', 'Monsoon window': 'Monsunfenster', 'Sticker haul': 'Sticker-Beute',

    /* journal listing — chrome only; per-post title/lede/read live below */
    'Notes on building with models, shipping alone, and the parts of freelancing nobody writes about.':
      'Notizen über das Bauen mit Modellen, das Ausliefern im Alleingang und die Seiten der Freiberuflichkeit, über die niemand schreibt.',

    /* contact */
    "Let's talk": 'Sprechen wir', "about the thing that's stuck": 'über das, was feststeckt',
    "Tell me what's broken, what's stalled, or what you haven't started. If it's a fit I'll say so in the first reply — and if it isn't, I'll say that too.":
      'Erzähl mir, was kaputt ist, was feststeckt oder was du noch nicht angefangen hast. Wenn es passt, sage ich das in der ersten Antwort — und wenn nicht, auch.',
    'Available for Q4 2026 · Freelance AI & Full-Stack · ': 'Verfügbar ab Q4 2026 · Freiberuflich KI & Full-Stack · ',

    /* footer */
    "Let's build something that holds up.": 'Bauen wir etwas, das hält.',
    'Pages': 'Seiten', 'Elsewhere': 'Anderswo',
    'Freelance AI & full-stack developer. Software that holds up after the launch tweet.':
      'Freiberuflicher KI- & Full-Stack-Entwickler. Software, die nach dem Launch-Tweet hält.',
    'Top 1% — Upwork & Contra': 'Top 1 % — Upwork & Contra',

    /* BUILD:JOURNAL:START (auto-generated by journal/build.py — do not hand-edit below) */
    'Agents are just loops with good taste': 'Agenten sind nur Schleifen mit gutem Geschmack',
    'Everyone wants a framework. Most production agents I\'ve shipped are a while loop, three tools, and a very opinionated system prompt.': 'Alle wollen ein Framework. Die meisten Produktions-Agenten, die ich ausgeliefert habe, sind eine While-Schleife, drei Tools und ein sehr meinungsstarker System-Prompt.',
    '6 min': '6 Min.',
    'Evals before models': 'Evals vor Modellen',
    'If you can\'t measure the thing, swapping the model is astrology. A cheap eval harness you write on day one buys you every later decision.': 'Wenn du es nicht messen kannst, ist ein Modellwechsel Astrologie. Ein günstiges Eval-Harness, am ersten Tag geschrieben, bezahlt jede spätere Entscheidung.',
    '4 min': '4 Min.',
    'The freelance stack I actually use': 'Der Freelance-Stack, den ich wirklich nutze',
    'Contracts, invoices, scope, and the two tools that stopped me from working weekends.': 'Verträge, Rechnungen, Scope und die zwei Werkzeuge, die mich davon abgehalten haben, an Wochenenden zu arbeiten.',
    '7 min': '7 Min.',
    /* BUILD:JOURNAL:END */
  };

  function applyLang(lang) {
    var de = lang === 'de';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var next = de && DICT[key] !== undefined ? DICT[key] : key;
      if (el.textContent === next) return;
      el.textContent = next;
      if (el.getAttribute('data-reveal') === 'scramble' && el.classList.contains('is-revealed')) {
        delete el.dataset.scrambled;
        if (window.SiteAnim) window.SiteAnim.scramble(el);
      }
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-current', on ? 'true' : 'false');
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function currentLang() {
    try {
      var saved = window.localStorage.getItem('site-lang');
      if (saved === 'de' || saved === 'en') return saved;
    } catch (e) { /* ignore */ }
    return 'en';
  }

  function setLang(lang) {
    try { window.localStorage.setItem('site-lang', lang); } catch (e) { /* ignore */ }
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(currentLang());
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang-btn'));
      });
    });
  });
})();
