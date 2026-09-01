---
title: Evals before models
title_de: Evals vor Modellen
read: 4 min
read_de: 4 Min.
lede: If you can't measure the thing, swapping the model is astrology. A cheap eval harness you write on day one buys you every later decision.
lede_de: Wenn du es nicht messen kannst, ist ein Modellwechsel Astrologie. Ein günstiges Eval-Harness, am ersten Tag geschrieben, bezahlt jede spätere Entscheidung.
---

The cheapest eval is thirty real inputs in a CSV and a script that prints a diff. It takes an afternoon. It is the only reason I can tell a client "this change made it 8% better" instead of "it feels sharper now".

Once the harness exists, the expensive questions get cheap. Smaller model? Run it. New prompt? Run it. Cut the retrieval step entirely? Run it. Half the time the boring option wins, and you keep the money.

> Taste is what you use before you have data. Evals are what you use after.

The only rule: the eval set is written by whoever owns the outcome, not by the model, and not by me. Otherwise you are grading your own homework.

+++GERMAN+++

Das günstigste Eval sind dreißig echte Eingaben in einer CSV und ein Skript, das einen Diff ausgibt. Es kostet einen Nachmittag. Es ist der einzige Grund, warum ich einem Kunden sagen kann „diese Änderung hat es um 8 % verbessert" statt „es fühlt sich schärfer an".

Sobald das Harness existiert, werden die teuren Fragen billig. Kleineres Modell? Ausprobieren. Neuer Prompt? Ausprobieren. Den Retrieval-Schritt ganz weglassen? Ausprobieren. In der Hälfte der Fälle gewinnt die langweilige Option, und das Geld bleibt.

> Geschmack nutzt man, bevor man Daten hat. Evals danach.

Die einzige Regel: Das Eval-Set schreibt, wer das Ergebnis verantwortet — nicht das Modell und nicht ich. Sonst korrigierst du deine eigenen Hausaufgaben.
