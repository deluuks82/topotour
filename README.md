# Nederland topografie

Een klikspel om de Nederlandse provincies, hoofdsteden en steden te leren. De kaart
gebruikt de officiële provinciegrenzen van het CBS, geprojecteerd in het
Rijksdriehoeksstelsel, dus de vormen en verhoudingen kloppen met een echte atlas.

Vier spelvormen: provincies, hoofdsteden, steden en landen, of alles door elkaar.
Je kunt een hint vragen voor drie punten, en een helikopter vliegt naar de plek
waar je klikt.

## Online zetten met GitHub Pages

1. Maak een nieuwe repository aan, bijvoorbeeld `nederland-topografie`, en zet die
   op **Public**. GitHub Pages werkt alleen bij publieke repositories op een gratis
   account.
2. Upload alle bestanden uit deze map in de hoofdmap van de repository, niet in een
   submap. Klik `Add file` → `Upload files`, sleep de bestanden erin en commit.
3. Ga naar `Settings` → `Pages`. Kies bij **Source** de optie `Deploy from a branch`,
   bij **Branch** `main` en bij map `/ (root)`. Klik op `Save`.
4. Na ongeveer een minuut staat het spel op
   `https://GEBRUIKERSNAAM.github.io/nederland-topografie/`.

Het bestand heet `index.html`, dus het spel opent meteen op dat adres.

### Nog één regel aanpassen

In `index.html` staat bij `og:image` een relatief pad. Sociale media en chatapps
hebben een volledige URL nodig om het voorbeeldplaatje te laten zien. Vervang die
regel door je eigen adres:

```html
<meta property="og:image" content="https://GEBRUIKERSNAAM.github.io/nederland-topografie/social-preview.png">
```

## Wat zit er in

| Bestand | Waarvoor |
| --- | --- |
| `index.html` | Het hele spel: kaart, opmaak en spellogica in één bestand |
| `favicon.svg` | Pictogram in de browsertab |
| `icon-192.png`, `icon-512.png` | Pictogrammen voor het beginscherm van telefoon of tablet |
| `manifest.webmanifest` | Maakt het spel installeerbaar als app |
| `sw.js` | Service worker, laat het spel offline werken na het eerste bezoek |
| `social-preview.png` | Voorbeeldplaatje bij het delen van de link |
| `.nojekyll` | Zegt tegen GitHub Pages dat er niets verwerkt hoeft te worden |
| `LICENSE` | Licentie van de code |

Het spel heeft geen server, build-stap of externe bibliotheken nodig. Je kunt
`index.html` ook dubbelklikken om het lokaal te spelen, alleen werkt de service
worker dan niet.

## Op een tablet installeren

Open de link in Safari of Chrome en kies `Deel` → `Zet op beginscherm`, of in Chrome
het menu → `App installeren`. Het spel opent dan zonder adresbalk en werkt daarna
ook zonder internet.

## Zelf aanpassen

Alles staat in `index.html`.

- **Steden toevoegen of weghalen**: de lijsten `PROVINCES`, `CAPITALS`, `PLACES` en
  `COUNTRIES` staan bovenaan het `<script>`-blok. Voor een nieuwe stad zet je er ook
  een `<g class="marker">` bij in de SVG, met de naam in `data-name`.
- **Punten**: goed is `+10`, mis is `-2`, een hint kost `3`. Zoek op `points+=10`.
- **Symbolen**: hoofdsteden zijn een stip met een ring, andere steden een gewone stip
  en Schiphol een vierkantje. Er staat geen legenda onder de kaart, want die verklapte
  welk symbool het vliegveld was.
- **Kleuren**: de provincies gebruiken vier roodtinten zo verdeeld dat geen twee
  buurprovincies dezelfde kleur hebben. Pas je er één aan, let dan op de buren.

Werk je aan het spel terwijl het al online staat, verhoog dan `nl-topografie-v1`
bovenaan `sw.js` naar `v2`. Dan gooien bezoekers hun oude cache weg.

## Herkomst van de kaart

De provinciegrenzen komen uit de gegeneraliseerde provinciekaart van het
[CBS](https://www.cbs.nl), beschikbaar via [PDOK](https://www.pdok.nl) en gebundeld
in [cartomap/nl](https://github.com/cartomap/nl). Die data staat onder
**CC BY 4.0**: je mag ze vrij gebruiken en aanpassen, mits je de bron vermeldt.

Die bronvermelding staat niet meer in het spel zelf, maar bovenaan `index.html` in een
commentaarblok en in dit README-bestand. CC BY staat toe dat je de vermelding op een
andere redelijke plek zet, zolang die vindbaar blijft. Haal ze dus niet uit beide
bestanden weg.

De stadsposities zijn coördinaten in het Rijksdriehoeksstelsel en zijn nagerekend:
elke marker ligt in de juiste provincie.

## Licentie

De code staat onder de MIT-licentie, zie `LICENSE`. De kaartdata valt onder CC BY 4.0
van het CBS en staat los van die licentie.
