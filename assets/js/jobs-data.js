/* =========================================================
   PROSTA DELOVNA MESTA — podatki
   ---------------------------------------------------------
   To je edino mesto, ki ga urejaš, ko dodajaš/odstranjuješ/
   spreminjaš delovna mesta. Vsak objekt v seznamu je eno
   delovno mesto. Ko dodaš novo mesto, ga preprosto kopiraj
   in prilepi kot nov objekt ter spremeni vrednosti.

   POMEMBNO: "id" mora biti enkraten (brez presledkov,
   brez šumnikov) — uporablja se v povezavi do strani
   delovno-mesto.html?id=TVOJ_ID
   ========================================================= */

const JOBS = [
  {
    id: "skladiscnik-lj",
    title: "Skladiščnik / Skladiščnica",
    location: "Ljubljana",
    type: "Polni delovni čas",
    category: "Logistika",
    posted: "2026-08-01",
    summary: "Iščemo natančno in zanesljivo osebo za delo v skladišču našega partnerja na področju logistike.",
    description: [
      "Za našega partnerja, uveljavljeno logistično podjetje, iščemo skladiščnika/-co za delo v Ljubljani. Delo je primerno za kandidate, ki imajo radi dinamično okolje in fizično aktivno delo."
    ],
    responsibilities: [
      "Prevzem, skladiščenje in izdaja blaga",
      "Delo z ročnim in viličarskim transportom (izpit za viličarja je prednost)",
      "Vodenje evidenc o zalogah",
      "Skrb za red in urejenost skladišča"
    ],
    requirements: [
      "Izkušnje na podobnem delovnem mestu so prednost, niso pa pogoj",
      "Natančnost, zanesljivost in samostojnost pri delu",
      "Pripravljenost na delo v izmenah",
      "Vozniško dovoljenje kategorije B je prednost"
    ],
    offer: [
      "Redno zaposlitev s polnim delovnim časom",
      "Uvajanje in mentorstvo ob začetku dela",
      "Prijazno delovno okolje in stabilnega delodajalca",
      "Možnost napredovanja"
    ]
  },
  {
    id: "kadrovski-referent-lj",
    title: "Kadrovski/-a referent/-ka",
    location: "Ljubljana",
    type: "Polni delovni čas",
    category: "Kadrovska administracija",
    posted: "2026-07-20",
    summary: "Za partnersko podjetje iščemo organiziranega kadrovskega referenta za vodenje kadrovske administracije.",
    description: [
      "Naš partner, srednje veliko proizvodno podjetje, išče kadrovskega/-o referenta/-ko, ki bo skrbel/-a za urejeno kadrovsko administracijo in podporo zaposlenim."
    ],
    responsibilities: [
      "Priprava pogodb o zaposlitvi in ostale kadrovske dokumentacije",
      "Vodenje evidenc o delovnem času in odsotnostih",
      "Priprava podatkov za obračun plač",
      "Komunikacija z zaposlenimi in podpora vodstvu pri kadrovskih vprašanjih"
    ],
    requirements: [
      "Najmanj srednješolska izobrazba, zaželena višja/visoka",
      "Izkušnje na področju kadrovske administracije",
      "Poznavanje delovnopravne zakonodaje",
      "Natančnost in diskretnost"
    ],
    offer: [
      "Stabilno zaposlitev v uspešnem podjetju",
      "Možnost dodatnih izobraževanj",
      "Prijetno delovno okolje",
      "Konkurenčno plačilo"
    ]
  },
  {
    id: "trgovec-mb",
    title: "Trgovec / Trgovka v prodajalni",
    location: "Maribor",
    type: "Polni delovni čas",
    category: "Prodaja",
    posted: "2026-07-10",
    summary: "Za partnersko trgovsko podjetje iščemo prijazno in komunikativno osebo za delo s strankami.",
    description: [
      "Iščemo trgovca/-ko za delo v prodajalni našega partnerja v Mariboru. Pridružite se ekipi, kjer je pomemben odnos do strank in timsko delo."
    ],
    responsibilities: [
      "Postrežba in svetovanje strankam",
      "Urejanje in zlaganje blaga na prodajnih policah",
      "Delo z blagajno",
      "Skrb za urejenost prodajnega prostora"
    ],
    requirements: [
      "Izkušnje v prodaji so prednost",
      "Komunikativnost in prijazen nastop",
      "Pripravljenost na delo v izmenah, tudi ob vikendih",
      "Odgovornost in točnost"
    ],
    offer: [
      "Redna zaposlitev",
      "Uvajanje v delo",
      "Prijetno delovno okolje",
      "Možnost dolgoročnega sodelovanja"
    ]
  },
  {
    id: "vzdrzevalec-koper",
    title: "Vzdrževalec / Vzdrževalka strojev",
    location: "Koper",
    type: "Polni delovni čas",
    category: "Proizvodnja",
    posted: "2026-06-28",
    summary: "Za partnersko proizvodno podjetje iščemo tehnično spretno osebo za vzdrževanje proizvodnih strojev.",
    description: [
      "Naš partner s področja proizvodnje išče izkušenega vzdrževalca/-ko strojev za skrb za nemoteno delovanje proizvodne linije."
    ],
    responsibilities: [
      "Redno vzdrževanje in popravila proizvodnih strojev",
      "Odpravljanje okvar in preventivni pregledi",
      "Vodenje evidenc o opravljenih posegih",
      "Sodelovanje s proizvodno ekipo"
    ],
    requirements: [
      "Izobrazba strojne ali elektro smeri",
      "Izkušnje pri vzdrževanju strojev v proizvodnji",
      "Samostojnost pri odpravljanju napak",
      "Pripravljenost na delo v izmenah"
    ],
    offer: [
      "Stabilno zaposlitev v rastočem podjetju",
      "Redno strokovno usposabljanje",
      "Sodobno delovno okolje",
      "Konkurenčno plačilo glede na izkušnje"
    ]
  }
];
