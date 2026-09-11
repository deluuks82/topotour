# Topo Tour

Een klikspel om de Nederlandse provincies, hoofdsteden en steden te leren. De kaart
gebruikt de officiële provinciegrenzen van het CBS, geprojecteerd in het
Rijksdriehoeksstelsel, dus de vormen en verhoudingen kloppen met een echte atlas.

**Speel het op [deluuks82.github.io/topotour](https://deluuks82.github.io/topotour/)**

Vier spelvormen: provincies, hoofdsteden, steden en landen, of alles door elkaar.
Je kunt een hint vragen voor drie punten, en een helikopter vliegt naar de plek
waar je klikt.

## Bijwerken

Alle bestanden staan al op het juiste adres ingesteld. Er is niets meer handmatig
aan te passen.

1. Ga naar de repository `topotour` op GitHub.
2. `Add file` → `Upload files`, sleep de bestanden erin en commit op `main`.
3. Na ongeveer een minuut staat de nieuwe versie online.

Bestaande bestanden overschrijf je gewoon: GitHub vervangt ze zonder te vragen.

Je hoeft geen versienummer bij te werken. De service worker haalt de pagina altijd
verplicht van het netwerk, dus bezoekers krijgen bij hun volgende bezoek meteen de
nieuwe versie in plaats van iets uit hun cache.

### Als je opnieuw begint met een lege repository

Zet de repository op **Public**; GitHub Pages werkt op een gratis account niet bij
privérepositories. Daarna `Settings` → `Pages`, bij **Source** de optie
`Deploy from a branch`, bij **Branch** `main` en bij map `/ (root)`.

De bestanden moeten in de hoofdmap staan, niet in een submap, want `index.html` moet
op het adres zelf te vinden zijn.

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

## Delen

Deel je de link in WhatsApp, Teams of op sociale media, dan verschijnt
`social-preview.png` als voorbeeldplaatje. Dat is al ingesteld met het volledige
adres, dus je hoeft er niets voor te doen.

Wil je datzelfde plaatje ook op de repositorypagina zelf, dan is dat een losse
instelling die niet in een bestand kan staan: `Settings` → onder **Social preview**
`social-preview.png` uploaden. Puur cosmetisch.

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
- **Tikgebied**: je hoeft niet precies op een stadsstip te tikken. De stad die het
  dichtst bij je vinger zit wint, binnen een marge van ongeveer 48 beeldpunten.
  Die marge staat als `TAP_RADIUS_PX` onderaan het `<script>`-blok en wordt per
  schermformaat omgerekend, zodat hij op telefoon en laptop even groot aanvoelt.

## Herkomst van de kaart

De provinciegrenzen komen uit de gegeneraliseerde provinciekaart van het
[CBS](https://www.cbs.nl), beschikbaar via [PDOK](https://www.pdok.nl) en gebundeld
in [cartomap/nl](https://github.com/cartomap/nl). Die data staat onder
**CC BY 4.0**: je mag ze vrij gebruiken en aanpassen, mits je de bron vermeldt.

Onderin het spel staat daarom een regel met de bronvermelding, met links naar het CBS,
PDOK en de licentie. Laat die staan. Voor de zekerheid staat dezelfde vermelding ook in
een commentaarblok bovenaan `index.html` en in dit README-bestand.

De stadsposities zijn coördinaten in het Rijksdriehoeksstelsel en zijn nagerekend:
elke marker ligt in de juiste provincie.

## Licentie

De code staat onder de MIT-licentie, zie `LICENSE`. De kaartdata valt onder CC BY 4.0
van het CBS en staat los van die licentie.
