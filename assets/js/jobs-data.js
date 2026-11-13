/* =========================================================
   PROSTA DELOVNA MESTA — podatki
   ---------------------------------------------------------
   To je edino mesto, ki ga urejaš, ko dodajaš/odstranjuješ/
   spreminjaš delovna mesta. Vsak objekt v seznamu je eno
   delovno mesto. Ko dodaš novo mesto, ga preprosto kopiraj
   in prilepi kot nov objekt ter spremeni vrednosti.

   Rok prijave se samodejno izračuna: 1 mesec po datumu objave
   ("posted"). Po poteku roka se mesto neha prikazovati na seznamu.
   Po želji lahko dodaš polje deadline: "2026-12-31".
   Neobvezno polje note (npr. "Enoizmensko delo") se prikaže kot oznaka.

   POMEMBNO: "id" mora biti enkraten (brez presledkov,
   brez šumnikov) — uporablja se v povezavi do strani
   delovno-mesto.html?id=TVOJ_ID
   ========================================================= */

const JOBS = [
  {
    "id": "skladiscnik-lj",
    "title": "Skladiščnik (m/ž)",
    "location": "Ljubljana",
    "type": "Polni delovni čas",
    "category": "Logistika",
    "posted": "2026-10-26",
    "summary": "Iščemo natančno in zanesljivo osebo za delo v skladišču našega partnerja na področju logistike.",
    "description": [
      "Za našega partnerja, uveljavljeno logistično podjetje, iščemo skladiščnika (m/ž) za delo v Ljubljani. Delo je primerno za kandidate, ki imajo radi dinamično okolje in fizično aktivno delo."
    ],
    "responsibilities": [
      "Prevzem, skladiščenje in izdaja blaga",
      "Delo z ročnim in viličarskim transportom (izpit za viličarja je prednost)",
      "Vodenje evidenc o zalogah",
      "Skrb za red in urejenost skladišča"
    ],
    "requirements": [
      "Izkušnje na podobnem delovnem mestu so prednost, niso pa pogoj",
      "Natančnost, zanesljivost in samostojnost pri delu",
      "Pripravljenost na delo v izmenah",
      "Vozniško dovoljenje kategorije B je prednost"
    ],
    "offer": [
      "Redno zaposlitev s polnim delovnim časom",
      "Uvajanje in mentorstvo ob začetku dela",
      "Prijazno delovno okolje in stabilnega delodajalca",
      "Možnost napredovanja"
    ]
  },
  {
    "id": "komercialist-celje",
    "title": "Komercialist (m/ž)",
    "location": "Celje",
    "type": "Polni delovni čas",
    "category": "Prodaja",
    "posted": "2026-10-27",
    "summary": "Za partnersko podjetje iščemo komercialista (m/ž) za pripravo ponudb, obdelavo naročil in komunikacijo s kupci.",
    "description": [
      "Naš partner, uveljavljeno podjetje v savinjski regiji, išče komercialista (m/ž), ki bo skrbel za komercialne procese – od povpraševanja do izdaje računa. Iščemo organizirano osebo, ki zna poskrbeti za kupce in hkrati zanesljivo vodi dokumentacijo."
    ],
    "responsibilities": [
      "Priprava ponudb in pogodb",
      "Sprejem in obdelava naročil kupcev",
      "Komunikacija s kupci, dobavitelji in notranjimi službami",
      "Spremljanje zalog, dobav in plačil kupcev",
      "Vnos in vzdrževanje podatkov v poslovnem sistemu",
      "Priprava prodajnih poročil"
    ],
    "requirements": [
      "V. ali VI. stopnja izobrazbe ekonomske, komercialne ali druge ustrezne smeri",
      "Izkušnje v komerciali ali prodaji so prednost",
      "Dobro poznavanje MS Office, predvsem programa Excel",
      "Znanje angleškega ali nemškega jezika",
      "Natančnost, organiziranost in komunikativnost"
    ],
    "offer": [
      "Redno zaposlitev za polni delovni čas",
      "Uvajanje in mentorstvo ob začetku dela",
      "Stabilnega delodajalca s pregledno organizacijo dela",
      "Možnost strokovnega razvoja"
    ]
  },
  {
    "id": "kadrovski-referent-lj",
    "title": "Kadrovski referent (m/ž)",
    "location": "Ljubljana",
    "type": "Polni delovni čas",
    "category": "Kadrovska administracija",
    "posted": "2026-10-28",
    "summary": "Za partnersko podjetje iščemo organiziranega kadrovskega referenta za vodenje kadrovske administracije.",
    "description": [
      "Naš partner, srednje veliko proizvodno podjetje, išče kadrovskega referenta (m/ž), ki bo skrbel za urejeno kadrovsko administracijo in podporo zaposlenim."
    ],
    "responsibilities": [
      "Priprava pogodb o zaposlitvi in ostale kadrovske dokumentacije",
      "Vodenje evidenc o delovnem času in odsotnostih",
      "Priprava podatkov za obračun plač",
      "Komunikacija z zaposlenimi in podpora vodstvu pri kadrovskih vprašanjih"
    ],
    "requirements": [
      "Najmanj srednješolska izobrazba, zaželena višja ali visoka",
      "Izkušnje na področju kadrovske administracije",
      "Poznavanje delovnopravne zakonodaje",
      "Natančnost in diskretnost"
    ],
    "offer": [
      "Stabilno zaposlitev v uspešnem podjetju",
      "Možnost dodatnih izobraževanj",
      "Prijetno delovno okolje",
      "Konkurenčno plačilo"
    ]
  },
  {
    "id": "trgovec-mb",
    "title": "Trgovec v prodajalni (m/ž)",
    "location": "Maribor",
    "type": "Polni delovni čas",
    "category": "Prodaja",
    "posted": "2026-10-30",
    "summary": "Za partnersko trgovsko podjetje iščemo prijazno in komunikativno osebo za delo s strankami.",
    "description": [
      "Iščemo trgovca (m/ž) za delo v prodajalni našega partnerja v Mariboru. Pridružite se ekipi, kjer je pomemben odnos do strank in timsko delo."
    ],
    "responsibilities": [
      "Postrežba in svetovanje strankam",
      "Urejanje in zlaganje blaga na prodajnih policah",
      "Delo z blagajno",
      "Skrb za urejenost prodajnega prostora"
    ],
    "requirements": [
      "Izkušnje v prodaji so prednost",
      "Komunikativnost in prijazen nastop",
      "Pripravljenost na delo v izmenah, tudi ob vikendih",
      "Odgovornost in točnost"
    ],
    "offer": [
      "Redna zaposlitev",
      "Uvajanje v delo",
      "Prijetno delovno okolje",
      "Možnost dolgoročnega sodelovanja"
    ]
  },
  {
    "id": "vzdrzevalec-koper",
    "title": "Vzdrževalec strojev (m/ž)",
    "location": "Koper",
    "type": "Polni delovni čas",
    "category": "Proizvodnja",
    "posted": "2026-11-02",
    "summary": "Za partnersko proizvodno podjetje iščemo tehnično spretno osebo za vzdrževanje proizvodnih strojev.",
    "description": [
      "Naš partner s področja proizvodnje išče izkušenega vzdrževalca strojev (m/ž), ki bo skrbel za nemoteno delovanje proizvodne linije."
    ],
    "responsibilities": [
      "Redno vzdrževanje in popravila proizvodnih strojev",
      "Odpravljanje okvar in preventivni pregledi",
      "Vodenje evidenc o opravljenih posegih",
      "Sodelovanje s proizvodno ekipo"
    ],
    "requirements": [
      "Izobrazba strojne ali elektro smeri",
      "Izkušnje pri vzdrževanju strojev v proizvodnji",
      "Samostojnost pri odpravljanju napak",
      "Pripravljenost na delo v izmenah"
    ],
    "offer": [
      "Stabilno zaposlitev v rastočem podjetju",
      "Redno strokovno usposabljanje",
      "Sodobno delovno okolje",
      "Konkurenčno plačilo glede na izkušnje"
    ]
  },
  {
    "id": "skrbnik-kljucnih-kupcev-kranj",
    "title": "Skrbnik ključnih kupcev (m/ž)",
    "location": "Kranj",
    "type": "Polni delovni čas",
    "category": "Prodaja",
    "posted": "2026-11-03",
    "summary": "Za partnersko podjetje iščemo skrbnika ključnih kupcev (m/ž), ki bo gradil dolgoročne odnose z največjimi strankami.",
    "description": [
      "Naš partner, uspešno podjetje z razvito prodajno mrežo, išče skrbnika ključnih kupcev (m/ž). Vaša naloga bo razvijati obstoječe poslovne odnose, odkrivati nove prodajne priložnosti in skrbeti, da so ključni kupci zadovoljni na dolgi rok."
    ],
    "responsibilities": [
      "Vodenje portfelja ključnih kupcev in skrb za dolgoročne odnose",
      "Priprava prodajnih načrtov in doseganje dogovorjenih ciljev",
      "Pogajanja o pogojih sodelovanja in pogodbah",
      "Spremljanje trga, konkurence in prodajnih analiz",
      "Usklajevanje med kupci, logistiko in notranjimi oddelki",
      "Redno poročanje vodji prodaje"
    ],
    "requirements": [
      "VI. ali VII. stopnja izobrazbe ekonomske ali druge ustrezne smeri",
      "Vsaj 2 leti izkušenj v prodaji ali upravljanju ključnih kupcev",
      "Pogajalske in komunikacijske veščine",
      "Aktivno znanje angleščine, znanje nemščine je prednost",
      "Vozniško dovoljenje kategorije B"
    ],
    "offer": [
      "Zaposlitev za nedoločen čas",
      "Samostojno in raznoliko delo",
      "Mentorstvo in strokovna izobraževanja",
      "Nagrajevanje glede na dosežene rezultate",
      "Možnost napredovanja v vodstvene vloge"
    ]
  },
  {
    "id": "prodajni-predstavnik-murska-sobota",
    "title": "Prodajni predstavnik na terenu (m/ž)",
    "location": "Murska Sobota",
    "type": "Polni delovni čas",
    "category": "Prodaja",
    "posted": "2026-11-04",
    "summary": "Za partnersko podjetje iščemo prodajnega predstavnika (m/ž) za razvoj prodaje in obiske strank na terenu.",
    "description": [
      "Iščemo samostojnega in komunikativnega prodajnega predstavnika (m/ž), ki bo razvijal prodajo v pomurski regiji. Delo je dinamično, večinoma na terenu, s poudarkom na pridobivanju novih kupcev in skrbi za obstoječe."
    ],
    "responsibilities": [
      "Pridobivanje novih kupcev in širjenje prodaje na dodeljenem območju",
      "Redni obiski in svetovanje obstoječim kupcem",
      "Predstavitev izdelkov in priprava ponudb",
      "Doseganje prodajnih ciljev",
      "Reševanje reklamacij in spremljanje plačil",
      "Poročanje o prodaji in tržnih informacijah v sistemu CRM"
    ],
    "requirements": [
      "Najmanj srednješolska izobrazba, zaželena ekonomska ali komercialna smer",
      "Izkušnje s prodajo na terenu so prednost",
      "Vozniško dovoljenje kategorije B",
      "Samostojnost, pogajalske sposobnosti in vztrajnost",
      "Osnovno znanje dela z računalnikom"
    ],
    "offer": [
      "Redno zaposlitev za polni delovni čas",
      "Uvajanje in usposabljanje o izdelkih",
      "Samostojno organizacijo dela",
      "Nagrajevanje glede na prodajne rezultate"
    ]
  },
  {
    "id": "prodajni-svetovalec-nova-gorica",
    "title": "Prodajni svetovalec (m/ž)",
    "location": "Nova Gorica",
    "type": "Polni delovni čas",
    "category": "Prodaja",
    "posted": "2026-11-05",
    "summary": "Za partnersko podjetje iščemo prodajnega svetovalca (m/ž) za svetovanje poslovnim strankam in notranjo prodajo.",
    "description": [
      "Naš partner išče prodajnega svetovalca (m/ž), ki bo poslovnim strankam svetoval pri izbiri izdelkov in storitev ter skrbel za prodajo po telefonu, e-pošti in v živo."
    ],
    "responsibilities": [
      "Svetovanje in prodaja izdelkov in storitev poslovnim strankam",
      "Priprava ponudb in zaključevanje poslov",
      "Vzdrževanje odnosov z obstoječimi strankami",
      "Vnos naročil in vodenje evidenc v sistemu CRM",
      "Sodelovanje z oddelkoma nabave in logistike",
      "Priprava poročil o prodaji"
    ],
    "requirements": [
      "Srednja ali višja izobrazba",
      "Izkušnje s prodajo ali delom s strankami so prednost",
      "Dobro pisno in ustno izražanje",
      "Znanje tujega jezika (angleščina, italijanščina) je prednost",
      "Komunikativnost, odgovornost in ciljna naravnanost"
    ],
    "offer": [
      "Redno zaposlitev za polni delovni čas",
      "Uvajanje in mentorstvo",
      "Dinamično delovno okolje",
      "Možnost strokovnega in karierne rasti"
    ]
  },
  {
    "id": "vodja-kuhinje-osrednja-slovenija",
    "title": "Vodja kuhinje (m/ž)",
    "location": "Osrednja Slovenija",
    "type": "Polni delovni čas",
    "category": "Gostinstvo",
    "posted": "2026-11-06",
    "summary": "Za partnerja v gostinstvu iščemo vodjo kuhinje (m/ž) za organizacijo dela in zagotavljanje kakovosti obrokov.",
    "description": [
      "Naš partner, gostinsko podjetje v osrednji Sloveniji, išče izkušenega vodjo kuhinje (m/ž), ki bo prevzel organizacijo dela v kuhinji, skrbel za kakovost jedi in vodil kuhinjsko ekipo."
    ],
    "responsibilities": [
      "Organizacija, vodenje in nadzor dela v kuhinji",
      "Priprava jedilnikov in kalkulacij",
      "Naročanje živil ter nadzor zalog in stroškov",
      "Priprava zahtevnejših jedi",
      "Uvajanje in usposabljanje novih sodelavcev",
      "Vodenje dokumentacije HACCP in skrb za higienske standarde",
      "Sodelovanje z vodstvom pri razvoju ponudbe"
    ],
    "requirements": [
      "Gostinska izobrazba (kuhar ali ustrezna smer)",
      "Vsaj 3 leta izkušenj v kuhinji, od tega z vodenjem ekipe",
      "Poznavanje sistema HACCP",
      "Organizacijske in vodstvene sposobnosti",
      "Pripravljenost na delo po razporedu"
    ],
    "offer": [
      "Zaposlitev za nedoločen čas",
      "Samostojnost pri oblikovanju jedilnikov",
      "Strokovno izobraževanje",
      "Urejeno delovno okolje",
      "Možnost napredovanja"
    ]
  },
  {
    "id": "kuhar-koper-enoizmensko",
    "title": "Kuhar (m/ž)",
    "location": "Koper",
    "type": "Polni delovni čas",
    "note": "Enoizmensko delo",
    "category": "Gostinstvo",
    "posted": "2026-11-09",
    "summary": "Za partnerja v gostinstvu iščemo kuharja (m/ž) za enoizmensko delo v Kopru.",
    "description": [
      "Naš partner išče kuharja (m/ž) za delo v kuhinji v Kopru. Delo poteka enoizmensko, kar omogoča stabilen delovni ritem in več prostega časa za zasebno življenje."
    ],
    "responsibilities": [
      "Priprava toplih in hladnih jedi po jedilniku",
      "Priprava in kontrola živil",
      "Sodelovanje pri sestavi jedilnika",
      "Sprejem blaga in spremljanje zalog",
      "Vzdrževanje reda in čistoče v kuhinji ter upoštevanje načel HACCP",
      "Timsko delo z ostalimi člani kuhinje"
    ],
    "requirements": [
      "Poklicna ali srednja izobrazba gostinske smeri (kuhar)",
      "Izkušnje v kuhinji so prednost",
      "Poznavanje načel HACCP",
      "Natančnost, zanesljivost in higienske navade",
      "Timski duh"
    ],
    "offer": [
      "Redno zaposlitev",
      "Enoizmensko delo",
      "Stabilno delovno okolje",
      "Možnost napredovanja v kuhinjski ekipi"
    ]
  },
  {
    "id": "racunovodja-lj",
    "title": "Računovodja (m/ž)",
    "location": "Ljubljana",
    "type": "Polni delovni čas",
    "category": "Finance in računovodstvo",
    "posted": "2026-11-10",
    "summary": "Za partnersko podjetje iščemo računovodjo (m/ž) za vodenje poslovnih knjig in pripravo obračunov.",
    "description": [
      "Naš partner v Ljubljani išče računovodjo (m/ž), ki bo skrbel za pravilno in pravočasno vodenje poslovnih knjig ter pripravo davčnih in računovodskih poročil."
    ],
    "responsibilities": [
      "Kontiranje in knjiženje poslovnih dogodkov",
      "Vodenje glavne knjige in pomožnih evidenc",
      "Obračun DDV in priprava davčnih obračunov",
      "Spremljanje terjatev in obveznosti ter usklajevanje kontov",
      "Priprava mesečnih poročil in letnih računovodskih izkazov",
      "Sodelovanje z revizorji in zunanjimi institucijami"
    ],
    "requirements": [
      "Višja ali visokošolska izobrazba ekonomske smeri",
      "Vsaj 2 leti izkušenj na podobnem delovnem mestu",
      "Poznavanje slovenskih računovodskih standardov in davčne zakonodaje",
      "Poznavanje računovodskega programa",
      "Natančnost, odgovornost in analitično razmišljanje"
    ],
    "offer": [
      "Zaposlitev za nedoločen čas",
      "Strokovno izobraževanje in spremljanje zakonodajnih sprememb",
      "Stabilno delovno okolje",
      "Možnost strokovnega razvoja"
    ]
  },
  {
    "id": "referent-v-logistiki-novo-mesto",
    "title": "Referent v logistiki (m/ž)",
    "location": "Novo mesto",
    "type": "Polni delovni čas",
    "category": "Logistika",
    "posted": "2026-11-11",
    "summary": "Za partnersko podjetje iščemo referenta v logistiki (m/ž) za organizacijo naročil, dobav in transporta.",
    "description": [
      "Naš partner v Novem mestu zaradi rasti poslovanja išče referenta v logistiki (m/ž). Delo je raznoliko: od naročanja in spremljanja dobav do organizacije transporta in urejanja dokumentacije."
    ],
    "responsibilities": [
      "Naročanje materiala in blaga pri dobaviteljih ter spremljanje potrditev",
      "Usklajevanje dobavnih rokov z nabavo, proizvodnjo in prodajo",
      "Organizacija prevozov in komunikacija s prevozniki",
      "Priprava in kontrola transportne dokumentacije",
      "Prevzem blaga v informacijski sistem in preverjanje skladnosti z naročilom",
      "Reševanje reklamacij in odstopanj pri dobavah"
    ],
    "requirements": [
      "Srednja ali višja izobrazba prometne, logistične ali ekonomske smeri",
      "Izkušnje v logistiki ali nabavi so prednost",
      "Znanje angleškega ali nemškega jezika",
      "Poznavanje MS Office in poslovnih informacijskih sistemov",
      "Organiziranost in natančnost"
    ],
    "offer": [
      "Redno zaposlitev za polni delovni čas",
      "Uvajanje in mentorstvo",
      "Dinamično in raznoliko delo",
      "Možnost strokovnega razvoja"
    ]
  }
];
