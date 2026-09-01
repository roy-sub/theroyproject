---
title: Agents are just loops with good taste
title_de: Agenten sind nur Schleifen mit gutem Geschmack
read: 6 min
read_de: 6 Min.
lede: Everyone wants a framework. Most production agents I've shipped are a while loop, three tools, and a very opinionated system prompt.
lede_de: Alle wollen ein Framework. Die meisten Produktions-Agenten, die ich ausgeliefert habe, sind eine While-Schleife, drei Tools und ein sehr meinungsstarker System-Prompt.
---

The first agent I put in front of real users had a graph diagram with nine nodes. It was beautiful in Figma and impossible to debug at 2am. The version that survived contact with production had one loop, a hard iteration cap, and a tool layer that returned boring, typed results.

What actually matters is not orchestration. It is the quality of the tools you expose, how narrowly you scope each one, and whether a failure is loud. An agent that silently returns a plausible wrong answer is worse than no agent at all — it costs you the trust you needed to ship the next one.

> Complexity in an agent is almost always a missing tool wearing a costume.

So my default now: start with the loop. Add a node only when you can name the failure it prevents. If you cannot name it, you are building a diagram, not a product.

+++GERMAN+++

Der erste Agent, den ich echten Nutzern vorgesetzt habe, hatte ein Graph-Diagramm mit neun Knoten. In Figma war es wunderschön und um drei Uhr nachts unmöglich zu debuggen. Die Version, die den Produktivbetrieb überlebte, hatte eine Schleife, ein hartes Iterationslimit und eine Tool-Schicht, die langweilige, typisierte Ergebnisse zurückgab.

Worauf es wirklich ankommt, ist nicht Orchestrierung. Es ist die Qualität der Tools, die du freigibst, wie eng du jedes einzelne fasst, und ob ein Fehler laut ist. Ein Agent, der stillschweigend eine plausible falsche Antwort liefert, ist schlimmer als kein Agent — er kostet dich das Vertrauen, das du für den nächsten gebraucht hättest.

> Komplexität in einem Agenten ist fast immer ein fehlendes Tool im Kostüm.

Mein Standard heute: mit der Schleife anfangen. Einen Knoten nur hinzufügen, wenn du den Fehler benennen kannst, den er verhindert. Wenn du ihn nicht benennen kannst, baust du ein Diagramm, kein Produkt.
