# HR Center — spletna stran

Navodila za objavo strani, povezavo domene in urejanje vsebine.

## 1. Struktura strani

```
index.html                    → domača stran
o-nas.html                    → o podjetju
delodajalci.html              → storitve za delodajalce + obrazec povpraševanja
prosta-delovna-mesta.html     → seznam prostih delovnih mest (s filtri)
delovno-mesto.html            → detajl posameznega mesta + prijava s CV-jem
kontakt.html                  → splošni kontaktni obrazec
assets/css/style.css          → celoten dizajn (barve, pisave, postavitev)
assets/js/jobs-data.js        → SEZNAM DELOVNIH MEST — to urejaš najpogosteje
assets/js/main.js             → funkcionalnost (filtri, obrazci, animacije)
assets/images/logo.png        → logotip
robots.txt, sitemap.xml       → za Google
```

## 2. Objava na GitHub + Netlify (brezplačno)

1. Ustvari račun na **github.com**, nato nov repozitorij (npr. `hr-center-website`)
2. Naloži vse te datoteke vanj (Add file → Upload files → povleci celotno mapo)
3. Ustvari račun na **netlify.com** (lahko kar z GitHub računom)
4. "Add new site" → "Import an existing project" → izberi svoj GitHub repozitorij
5. Build command pusti prazno, "Publish directory" nastavi na `/` (koren) → Deploy

Stran bo takoj živa na naslovu tipa `nakljucno-ime.netlify.app`.

## 3. Povezava domene Domenca.com

1. V Netlify: Site settings → Domain management → Add custom domain → vpiši `hr-center.si`
2. Netlify ti pokaže DNS zapise, ki jih moraš dodati (običajno):
   - `A` zapis: `@` → Netlify IP (pokaže ti ga Netlify, trenutno `75.2.60.5`)
   - `CNAME` zapis: `www` → `tvoja-stran.netlify.app`
3. Pojdi v nadzorno ploščo na **domenca.com** → izberi domeno `hr-center.si` → DNS zapisi / FreeDNS
4. Dodaj zgornja zapisa (Tip, Naslov/Ime, Cilj/Vrednost — glej prejšnja navodila v pogovoru)
5. Počakaj 10 min–24 ur. Netlify samodejno doda brezplačen SSL certifikat (https)

## 4. Kako urediti vsebino

### Dodajanje / urejanje delovnega mesta
Odpri `assets/js/jobs-data.js`. Vsako delovno mesto je en blok v `{ }`. Kopiraj obstoječi blok, prilepi kot novega in spremeni vrednosti (naslov, lokacija, opis, zahteve...). `id` mora biti unikaten (brez presledkov in šumnikov).

Ko datoteko spremeniš in jo naložiš nazaj na GitHub (Add file → Upload files, prepiši obstoječo), se Netlify avtomatsko posodobi v cca. 1 minuti.

### Urejanje besedila na straneh
Odpri ustrezno `.html` datoteko, poišči besedilo in ga spremeni neposredno. Če ti je lažje, mi lahko kadarkoli prilepiš, kaj želiš spremeniti (npr. nov odstavek, nova storitev), in ti pripravim posodobljeno datoteko.

### Menjava barv
V `assets/css/style.css`, na vrhu (`:root`), so vse barve zbrane na enem mestu (`--teal`, `--coral`, `--ink` ...). Spremeniš eno vrednost in se posodobi povsod na strani.

## 5. Obrazci (kontaktni obrazec in prijave s CV-jem)

Obrazci uporabljajo **Netlify Forms** — deluje samodejno, brez dodatne nastavitve, ker je stran gostovana na Netlify. Vse oddane prijave in povpraševanja najdeš v Netlify nadzorni plošči: **Site → Forms**. Tam lahko nastaviš tudi obvestila po e-pošti (Forms → Settings → Form notifications → "Email notification"), da te vsaka nova prijava obvesti direktno na `info@hr-center.si`.

Brezplačni Netlify plan vključuje do 100 oddanih obrazcev na mesec, kar je za začetek več kot dovolj.

## 6. SEO (da vas najdejo na Googlu)

- Stran ima že osnovne SEO oznake (naslovi, opisi, sitemap.xml, robots.txt, strukturirani podatki)
- Po objavi prijavi stran v **Google Search Console** (search.google.com/search-console) in oddaj `sitemap.xml`
- Ko dodajaš delovna mesta, uporabljaj konkretne naslove (npr. "Skladiščnik Ljubljana" namesto samo "Skladiščnik") — to pomaga pri iskanju

## 7. Prihodnje spremembe

Za vsako spremembo (nova stran, nova sekcija, popravek besedila, nov dizajn elementa) se preprosto vrni v pogovor s Claude in opiši, kaj želiš — pripravljena datoteka bo pripravljena za nalaganje nazaj na GitHub.
