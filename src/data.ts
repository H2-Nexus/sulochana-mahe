// All content below is placeholder copy and imagery (crops of one reference mural).
// Replace with real works, photos, video IDs and facts before launch.
//
// Visible text is written as L('English', 'മലയാളം'); pages read this file through
// useLocalized(), which resolves each pair to the selected language. Keys used for
// logic (id, cat, n) stay in English.

const L = (en: string, ml: string) => ({ en, ml });

const C: Record<string, [size: string, pos: string]> = {
  full: ["cover", "50% 50%"],
  face: ["450%", "27% 35%"],
  narasimha: ["800%", "2% 0%"],
  brahma: ["400%", "47% 0%"],
  lakshmi: ["300%", "83% 42%"],
  garuda: ["800%", "98% 1%"],
  devotees: ["450%", "100% 85%"],
  hoods: ["400%", "9% 1%"],
  women: ["500%", "0% 72%"],
  coils: ["350%", "55% 95%"],
  sage: ["600%", "72% 22%"],
  flying: ["700%", "80% 6%"],
  lotus: ["500%", "48% 38%"],
};
const crop = (k: string) => ({ size: C[k][0], pos: C[k][1] });

const galleryCaps: [cat: string, caption: ReturnType<typeof L>][] = [
  ["Studio", L("Morning light in the studio", "സ്റ്റുഡിയോയിലെ പ്രഭാതവെളിച്ചം")],
  ["Process", L("First outlines in yellow ochre", "മഞ്ഞക്കാവിയിലെ ആദ്യ രേഖകൾ")],
  ["Workshops", L("Weekend class, Thrissur", "വാരാന്ത്യ ക്ലാസ്, തൃശൂർ")],
  ["Events", L("Exhibition opening, Kochi", "പ്രദർശന ഉദ്ഘാടനം, കൊച്ചി")],
  ["Process", L("Grinding natural pigment", "പ്രകൃതിദത്ത ചായം അരയ്ക്കുന്നു")],
  ["Studio", L("Brushes and lamp black", "ബ്രഷുകളും കരിമഷിയും")],
  ["Workshops", L("Students’ first faces", "വിദ്യാർത്ഥികൾ വരച്ച ആദ്യ മുഖങ്ങൾ")],
  ["Events", L("Temple festival commission", "ക്ഷേത്രോത്സവത്തിനായുള്ള രചന")],
  ["Process", L("Layering green over ochre", "കാവിക്കു മുകളിൽ പച്ചയുടെ പാളി")],
  ["Studio", L("Work in progress: Garuda", "പുരോഗമിക്കുന്ന രചന: ഗരുഡൻ")],
  ["Workshops", L("School programme, Kannur", "സ്കൂൾ പരിപാടി, കണ്ണൂർ")],
  ["Events", L("Community wall, Mahe", "സാമൂഹിക ചുവർ, മാഹി")],
  ["Process", L("The final black line", "അവസാനത്തെ കറുത്ത വര")],
  [
    "Studio",
    L("Canvas stretched and primed", "വലിച്ചുകെട്ടി ഒരുക്കിയ ക്യാൻവാസ്"),
  ],
  ["Workshops", L("Women’s collective session", "വനിതാ കൂട്ടായ്മയുടെ ക്ലാസ്")],
  ["Events", L("Award ceremony", "പുരസ്കാര ചടങ്ങ്")],
  ["Process", L("Detail of ornament", "അലങ്കാരത്തിന്റെ വിശദാംശം")],
  ["Studio", L("Sketchbook pages", "സ്കെച്ച്ബുക്ക് താളുകൾ")],
  ["Workshops", L("Online class, 2020", "ഓൺലൈൻ ക്ലാസ്, 2020")],
  ["Events", L("Mural unveiling", "ചുമർചിത്ര അനാച്ഛാദനം")],
  ["Process", L("Mixing lime white", "ചുണ്ണാമ്പ് വെള്ള ചാലിക്കുന്നു")],
  ["Studio", L("Finished panel drying", "ഉണങ്ങാൻ വെച്ച പൂർത്തിയായ പാനൽ")],
  [
    "Workshops",
    L(
      "Certificate course graduates",
      "സർട്ടിഫിക്കറ്റ് കോഴ്സ് പൂർത്തിയാക്കിയവർ",
    ),
  ],
  ["Events", L("Talk on a heritage walk", "പൈതൃക നടത്തത്തിലെ പ്രഭാഷണം")],
];
const keys = Object.keys(C);
const ars = ["3 / 4", "4 / 5", "1 / 1", "4 / 3", "3 / 4", "4 / 5"];

const wall = L("Wall mural", "ചുമർചിത്രം"),
  canvas = L("Canvas", "ക്യാൻവാസ്"),
  privateCollection = L("Private collection", "സ്വകാര്യ ശേഖരം");

const data = {
  img: "/mural.png",
  works: [
    {
      id: "ananthasayanam",
      n: "01",
      t: L("Ananthasayanam", "അനന്തശയനം"),
      m: wall,
      cat: "Wall",
      y: "2024",
      dim: L("12 × 9 ft", "12 × 9 അടി"),
      place: L("Private residence, Thrissur", "സ്വകാര്യ വസതി, തൃശൂർ"),
      dur: L("7 months", "7 മാസം"),
      ar: "4 / 3",
      radius: "0",
      ...crop("full"),
      d: L(
        "Vishnu reclines on the serpent Anantha, attended by Lakshmi, Brahma on the lotus and a court of sages and devotees.",
        "ലക്ഷ്മിയും താമരയിലിരിക്കുന്ന ബ്രഹ്മാവും ഋഷിമാരും ഭക്തരും ചുറ്റും നിൽക്കെ, അനന്തനെന്ന സർപ്പത്തിൽ ശയിക്കുന്ന വിഷ്ണു.",
      ),
      story: [
        L(
          "The largest single panel in the studio’s portfolio, painted across a living-room wall over seven months.",
          "സ്റ്റുഡിയോയുടെ ശേഖരത്തിലെ ഏറ്റവും വലിയ ഒറ്റ പാനൽ; ഏഴു മാസം കൊണ്ട് ഒരു സ്വീകരണമുറിയുടെ ചുവരിൽ വരച്ചത്.",
        ),
        L(
          "The composition follows the temple tradition: the reclining god at the centre, the five-hooded serpent as his canopy, and every remaining surface filled with attendants, foliage and ornament.",
          "ക്ഷേത്രപാരമ്പര്യമാണ് ഈ ചിത്രസംവിധാനം പിന്തുടരുന്നത്: നടുവിൽ ശയിക്കുന്ന ഭഗവാൻ, മേലാപ്പായി അഞ്ചു ഫണങ്ങളുള്ള സർപ്പം, ബാക്കിയുള്ള ഇടമെല്ലാം പരിചാരകരും ഇലച്ചാർത്തുകളും അലങ്കാരങ്ങളും കൊണ്ട് നിറഞ്ഞിരിക്കുന്നു.",
        ),
      ],
    },
    {
      id: "narasimha",
      n: "02",
      t: L("Narasimha", "നരസിംഹം"),
      m: canvas,
      cat: "Canvas",
      y: "2023",
      dim: L("36 × 48 in", "36 × 48 ഇഞ്ച്"),
      place: privateCollection,
      dur: L("6 weeks", "6 ആഴ്ച"),
      ar: "3 / 4",
      radius: "999px 999px 0 0",
      ...crop("narasimha"),
      d: L(
        "The man-lion avatar, seated in calm majesty inside a flowering frame.",
        "പൂത്തുലഞ്ഞ ചട്ടക്കൂടിനുള്ളിൽ ശാന്തഗാംഭീര്യത്തോടെ ഇരിക്കുന്ന നരസിംഹാവതാരം.",
      ),
      story: [
        L(
          "Painted in natural pigment on prepared canvas for a collector in Bengaluru.",
          "ബെംഗളൂരുവിലെ ഒരു കലാസ്വാദകനു വേണ്ടി, ഒരുക്കിയ ക്യാൻവാസിൽ പ്രകൃതിദത്ത ചായങ്ങളിൽ വരച്ചത്.",
        ),
        L(
          "The fierce form is shown here at rest, with the traditional red ground and a border of lotus buds.",
          "ഉഗ്രരൂപത്തെ ഇവിടെ ശാന്തഭാവത്തിലാണ് ചിത്രീകരിച്ചിരിക്കുന്നത്; പാരമ്പര്യമായ ചുവന്ന പശ്ചാത്തലവും താമരമൊട്ടുകളുടെ അതിരും ഒപ്പമുണ്ട്.",
        ),
      ],
    },
    {
      id: "brahma",
      n: "03",
      t: L("Brahma on the Lotus", "താമരയിലെ ബ്രഹ്മാവ്"),
      m: L("Temple wall", "ക്ഷേത്രച്ചുവർ"),
      cat: "Temple",
      y: "2023",
      dim: L("8 × 10 ft", "8 × 10 അടി"),
      place: L("Temple commission, Kannur", "ക്ഷേത്രത്തിനായുള്ള രചന, കണ്ണൂർ"),
      dur: L("4 months", "4 മാസം"),
      ar: "3 / 4",
      radius: "0",
      ...crop("brahma"),
      d: L(
        "The four-faced creator rising from the lotus, framed by an arch of foliage.",
        "ഇലച്ചാർത്തിന്റെ കമാനത്തിനുള്ളിൽ, താമരയിൽ നിന്ന് ഉയർന്നുവരുന്ന ചതുർമുഖനായ സ്രഷ്ടാവ്.",
      ),
      story: [
        L(
          "Painted directly on lime plaster inside a working temple, during the hours when the shrine was closed.",
          "ആരാധന നടക്കുന്ന ഒരു ക്ഷേത്രത്തിനുള്ളിൽ, നട അടച്ചിരിക്കുന്ന സമയങ്ങളിൽ ചുണ്ണാമ്പ് തേച്ച ചുവരിൽ നേരിട്ട് വരച്ചത്.",
        ),
        L(
          "Proportions and attributes follow the iconographic texts used by traditional mural painters.",
          "പാരമ്പര്യ ചുമർചിത്രകാരർ ആശ്രയിക്കുന്ന പ്രതിമാലക്ഷണ ഗ്രന്ഥങ്ങൾ അനുസരിച്ചാണ് അനുപാതങ്ങളും ലക്ഷണങ്ങളും.",
        ),
      ],
    },
    {
      id: "lakshmi",
      n: "04",
      t: L("Lakshmi, Seated", "ഇരിക്കുന്ന ലക്ഷ്മി"),
      m: wall,
      cat: "Wall",
      y: "2022",
      dim: L("6 × 4 ft", "6 × 4 അടി"),
      place: L("Pooja room, Kochi", "പൂജാമുറി, കൊച്ചി"),
      dur: L("5 weeks", "5 ആഴ്ച"),
      ar: "4 / 3",
      radius: "999px 999px 0 0",
      ...crop("lakshmi"),
      d: L(
        "The goddess of abundance with an offering bowl, painted for a family pooja room.",
        "ഒരു കുടുംബത്തിന്റെ പൂജാമുറിക്കായി വരച്ച, നിവേദ്യപാത്രമേന്തിയ ഐശ്വര്യദേവത.",
      ),
      story: [
        L(
          "A compact commission designed around the room’s single window and the family’s lamp.",
          "മുറിയിലെ ഒരേയൊരു ജനലും കുടുംബത്തിന്റെ വിളക്കും കണക്കിലെടുത്ത് രൂപകൽപ്പന ചെയ്ത ഒരു ചെറിയ രചന.",
        ),
        L(
          "The palette is kept warm so the figure glows under oil-lamp light.",
          "നിലവിളക്കിന്റെ വെളിച്ചത്തിൽ രൂപം തിളങ്ങാനായി ഊഷ്മളമായ നിറങ്ങളാണ് ഉപയോഗിച്ചിരിക്കുന്നത്.",
        ),
      ],
    },
    {
      id: "garuda",
      n: "05",
      t: L("Garuda in Flight", "പറക്കുന്ന ഗരുഡൻ"),
      m: canvas,
      cat: "Canvas",
      y: "2021",
      dim: L("24 × 30 in", "24 × 30 ഇഞ്ച്"),
      place: privateCollection,
      dur: L("4 weeks", "4 ആഴ്ച"),
      ar: "3 / 4",
      radius: "0",
      ...crop("garuda"),
      d: L(
        "Vishnu’s eagle mount in mid-flight, wings open across a deep blue ground.",
        "കടുംനീല പശ്ചാത്തലത്തിൽ ചിറകുവിരിച്ച് പറക്കുന്ന, വിഷ്ണുവിന്റെ വാഹനമായ ഗരുഡൻ.",
      ),
      story: [
        L(
          "One of a pair of canvases painted during a quiet season in the studio.",
          "സ്റ്റുഡിയോയിലെ ഒരു ശാന്തകാലത്ത് വരച്ച രണ്ട് ക്യാൻവാസുകളിൽ ഒന്ന്.",
        ),
        L(
          "The wings are built from dozens of individually outlined feathers.",
          "ഓരോന്നായി വരച്ചെടുത്ത ഡസൻ കണക്കിന് തൂവലുകൾ ചേർന്നതാണ് ചിറകുകൾ.",
        ),
      ],
    },
    {
      id: "devotees",
      n: "06",
      t: L("The Devotees", "ഭക്തജനങ്ങൾ"),
      m: wall,
      cat: "Wall",
      y: "2019",
      dim: L("10 × 6 ft", "10 × 6 അടി"),
      place: L("Community hall, Mahe", "കമ്മ്യൂണിറ്റി ഹാൾ, മാഹി"),
      dur: L("3 months", "3 മാസം"),
      ar: "3 / 4",
      radius: "999px 999px 0 0",
      ...crop("devotees"),
      d: L(
        "A procession of devotees with folded hands, from an early public commission.",
        "ആദ്യകാലത്തെ ഒരു പൊതു രചനയിൽ നിന്ന്, കൈകൂപ്പി നീങ്ങുന്ന ഭക്തരുടെ ഘോഷയാത്ര.",
      ),
      story: [
        L(
          "Painted with a group of students, who worked on the borders and ornament.",
          "അതിരുകളും അലങ്കാരങ്ങളും വരച്ച ഒരു കൂട്ടം വിദ്യാർത്ഥികൾക്കൊപ്പമാണ് ഇത് പൂർത്തിയാക്കിയത്.",
        ),
        L(
          "The wall is still in daily use as the backdrop to community gatherings.",
          "നാട്ടുകൂട്ടായ്മകളുടെ പശ്ചാത്തലമായി ഈ ചുവർ ഇന്നും ദിവസവും ഉപയോഗത്തിലുണ്ട്.",
        ),
      ],
    },
  ],
  types: [
    {
      n: "01",
      t: L("Temple murals", "ക്ഷേത്ര ചുമർചിത്രങ്ങൾ"),
      d: L(
        "Sacred wall paintings for temples and shrines, following the proportions and iconography of the Kerala tradition.",
        "കേരളീയ പാരമ്പര്യത്തിലെ അനുപാതങ്ങളും പ്രതിമാലക്ഷണങ്ങളും പാലിച്ച്, ക്ഷേത്രങ്ങൾക്കും ആരാധനാലയങ്ങൾക്കുമായി വരയ്ക്കുന്ന പവിത്രമായ ചുമർചിത്രങ്ങൾ.",
      ),
      ...crop("brahma"),
      time: L("3 – 9 months", "3 – 9 മാസം"),
    },
    {
      n: "02",
      t: L("Home & interior walls", "വീടുകളും അകത്തളങ്ങളും"),
      d: L(
        "Large-format murals for living rooms, pooja rooms, entrances and stairwells.",
        "സ്വീകരണമുറികൾ, പൂജാമുറികൾ, പ്രവേശനകവാടങ്ങൾ, ഗോവണിയിടങ്ങൾ എന്നിവയ്ക്കായുള്ള വലിയ ചുമർചിത്രങ്ങൾ.",
      ),
      size: "cover",
      pos: "34% 50%",
      time: L("4 – 12 weeks", "4 – 12 ആഴ്ച"),
    },
    {
      n: "03",
      t: L("Canvas paintings", "ക്യാൻവാസ് ചിത്രങ്ങൾ"),
      d: L(
        "Framed works in natural pigment and acrylic, ready to hang or to give as a gift.",
        "പ്രകൃതിദത്ത ചായങ്ങളിലും അക്രിലിക്കിലും തീർത്ത, ചുവരിൽ തൂക്കാനോ സമ്മാനിക്കാനോ തയ്യാറായ ഫ്രെയിം ചെയ്ത ചിത്രങ്ങൾ.",
      ),
      ...crop("narasimha"),
      time: L("3 – 6 weeks", "3 – 6 ആഴ്ച"),
    },
    {
      n: "04",
      t: L("Commissioned pieces", "ആവശ്യാനുസരണമുള്ള രചനകൾ"),
      d: L(
        "Custom subjects, from deities to family stories, developed with you from the first sketch to the final line.",
        "ദേവതകൾ മുതൽ കുടുംബകഥകൾ വരെ, ഇഷ്ടമുള്ള വിഷയങ്ങൾ; ആദ്യ സ്കെച്ച് മുതൽ അവസാന വര വരെ നിങ്ങളോടൊപ്പം രൂപപ്പെടുത്തുന്നു.",
      ),
      ...crop("lakshmi"),
      time: L("6 – 16 weeks", "6 – 16 ആഴ്ച"),
    },
    {
      n: "05",
      t: L("Restoration & workshops", "പുനരുദ്ധാരണവും ശില്പശാലകളും"),
      d: L(
        "Care for ageing murals, and hands-on classes in the traditional technique.",
        "പഴക്കം ചെന്ന ചുമർചിത്രങ്ങളുടെ സംരക്ഷണവും, പാരമ്പര്യ രീതിയിൽ നേരിട്ടുള്ള പരിശീലന ക്ലാസുകളും.",
      ),
      ...crop("devotees"),
      time: L("On request", "ആവശ്യപ്രകാരം"),
    },
  ],
  gallery: galleryCaps.map(([cat, t], i) => ({
    i,
    n: String(i + 1).padStart(2, "0"),
    cat,
    t,
    ar: ars[i % ars.length],
    oy: ((i * 37) % 5) * 22,
    ...crop(keys[(i * 5) % keys.length]),
  })),
  seva: {
    stats: [
      {
        v: 1200,
        suf: "+",
        l: L("Students taught", "പരിശീലിപ്പിച്ച വിദ്യാർത്ഥികൾ"),
      },
      {
        v: 85,
        suf: "",
        l: L("Free community workshops", "സൗജന്യ സാമൂഹിക ശില്പശാലകൾ"),
      },
      {
        v: 30,
        suf: "",
        l: L(
          "Walls painted for schools and hospitals",
          "സ്കൂളുകൾക്കും ആശുപത്രികൾക്കുമായി വരച്ച ചുവരുകൾ",
        ),
      },
      { v: 12, suf: "", l: L("Years of teaching", "വർഷത്തെ അധ്യാപന പരിചയം") },
    ],
    classes: [
      {
        n: "01",
        t: L("Weekend workshops", "വാരാന്ത്യ ശില്പശാലകൾ"),
        d: L(
          "Two-day introductions to line, colour and the five pigments. No experience needed.",
          "വര, നിറം, പഞ്ചവർണ്ണങ്ങൾ എന്നിവയിലേക്കുള്ള രണ്ടു ദിവസത്തെ ആമുഖം. മുൻപരിചയം ആവശ്യമില്ല.",
        ),
        who: L("Ages 12 and up", "12 വയസ്സു മുതൽ"),
      },
      {
        n: "02",
        t: L("Certificate course", "സർട്ടിഫിക്കറ്റ് കോഴ്സ്"),
        d: L(
          "Six months of guided practice, from the first outline to a finished panel.",
          "ആദ്യ രേഖ മുതൽ പൂർത്തിയായ പാനൽ വരെ, ആറു മാസത്തെ മാർഗനിർദേശത്തോടെയുള്ള പരിശീലനം.",
        ),
        who: L("For serious learners", "ഗൗരവമുള്ള പഠിതാക്കൾക്ക്"),
      },
      {
        n: "03",
        t: L("Schools & colleges", "സ്കൂളുകളും കോളേജുകളും"),
        d: L(
          "Programmes that bring the tradition into classrooms, ending with a mural painted together.",
          "ഈ പാരമ്പര്യത്തെ ക്ലാസ്മുറികളിലെത്തിക്കുന്ന പരിപാടികൾ; ഒടുവിൽ എല്ലാവരും ചേർന്ന് ഒരു ചുമർചിത്രം.",
        ),
        who: L("For institutions", "സ്ഥാപനങ്ങൾക്ക്"),
      },
      {
        n: "04",
        t: L("Women’s collectives", "വനിതാ കൂട്ടായ്മകൾ"),
        d: L(
          "Free training for self-help groups, teaching mural painting as a skill that earns an income.",
          "സ്വയംസഹായ സംഘങ്ങൾക്ക് സൗജന്യ പരിശീലനം; വരുമാനം നേടാവുന്ന ഒരു തൊഴിൽനൈപുണ്യമായി ചുമർചിത്രകല പഠിപ്പിക്കുന്നു.",
        ),
        who: L("Free of charge", "സൗജന്യം"),
      },
    ],
    youtube: [
      {
        t: L(
          "Drawing the face of Krishna: full lesson",
          "കൃഷ്ണന്റെ മുഖം വരയ്ക്കാം: സമ്പൂർണ്ണ പാഠം",
        ),
        dur: "42:10",
        yt: "",
        ...crop("face"),
      },
      {
        t: L(
          "Preparing natural pigments",
          "പ്രകൃതിദത്ത ചായങ്ങൾ തയ്യാറാക്കുന്ന വിധം",
        ),
        dur: "18:05",
        yt: "",
        ...crop("coils"),
      },
      {
        t: L(
          "Kerala mural basics for beginners",
          "തുടക്കക്കാർക്കായി കേരള ചുമർചിത്രകലയുടെ അടിസ്ഥാനങ്ങൾ",
        ),
        dur: "25:30",
        yt: "",
        ...crop("lotus"),
      },
      {
        t: L("Studio tour and Q&A", "സ്റ്റുഡിയോ സന്ദർശനവും ചോദ്യോത്തരങ്ങളും"),
        dur: "31:12",
        yt: "",
        ...crop("sage"),
      },
    ],
    videos: [
      {
        t: L("Painting the Garuda border", "ഗരുഡന്റെ അതിർ വരയ്ക്കുന്നു"),
        dur: "0:48",
        src: "",
        ...crop("garuda"),
      },
      {
        t: L("Workshop day, Kannur", "ശില്പശാല ദിനം, കണ്ണൂർ"),
        dur: "1:12",
        src: "",
        ...crop("women"),
      },
      {
        t: L("Students’ first outlines", "വിദ്യാർത്ഥികളുടെ ആദ്യ രേഖകൾ"),
        dur: "0:36",
        src: "",
        ...crop("hoods"),
      },
      {
        t: L("Community wall, Mahe", "സാമൂഹിക ചുവർ, മാഹി"),
        dur: "1:30",
        src: "",
        ...crop("devotees"),
      },
      {
        t: L("Mixing lamp black", "കരിമഷി ചാലിക്കുന്നു"),
        dur: "0:52",
        src: "",
        ...crop("flying"),
      },
    ],
    photos: [
      {
        t: L(
          "Free workshop for a women’s self-help group",
          "വനിതാ സ്വയംസഹായ സംഘത്തിനായുള്ള സൗജന്യ ശില്പശാല",
        ),
        ar: "4 / 5",
        ...crop("women"),
      },
      {
        t: L("School mural programme", "സ്കൂൾ ചുമർചിത്ര പരിപാടി"),
        ar: "4 / 3",
        ...crop("devotees"),
      },
      {
        t: L("Hospital corridor mural", "ആശുപത്രി ഇടനാഴിയിലെ ചുമർചിത്രം"),
        ar: "3 / 4",
        ...crop("lotus"),
      },
      {
        t: L(
          "Students with their first panels",
          "ആദ്യ പാനലുകളുമായി വിദ്യാർത്ഥികൾ",
        ),
        ar: "1 / 1",
        ...crop("sage"),
      },
      {
        t: L("Flood relief fundraiser", "പ്രളയ ദുരിതാശ്വാസ ധനസമാഹരണം"),
        ar: "4 / 5",
        ...crop("hoods"),
      },
      {
        t: L(
          "Heritage talk for college students",
          "കോളേജ് വിദ്യാർത്ഥികൾക്കായുള്ള പൈതൃക പ്രഭാഷണം",
        ),
        ar: "4 / 3",
        ...crop("brahma"),
      },
      {
        t: L("Online class during lockdown", "ലോക്ക്ഡൗൺ കാലത്തെ ഓൺലൈൻ ക്ലാസ്"),
        ar: "3 / 4",
        ...crop("face"),
      },
    ],
    timeline: [
      {
        y: "2014",
        t: L("Studio and first classes", "സ്റ്റുഡിയോയും ആദ്യ ക്ലാസുകളും"),
        d: L(
          "Opens her studio and begins teaching weekend classes alongside her own commissions.",
          "സ്വന്തം സ്റ്റുഡിയോ തുറന്നു; സ്വന്തം രചനകൾക്കൊപ്പം വാരാന്ത്യ ക്ലാസുകളും തുടങ്ങി.",
        ),
      },
      {
        y: "2016",
        t: L("Painting as a livelihood", "ഉപജീവനമായി ചിത്രകല"),
        d: L(
          "Starts free workshops for women’s self-help groups, teaching mural painting as a skill that earns an income.",
          "വനിതാ സ്വയംസഹായ സംഘങ്ങൾക്കായി സൗജന്യ ശില്പശാലകൾ തുടങ്ങി; വരുമാനം നേടാവുന്ന നൈപുണ്യമായി ചുമർചിത്രകല പഠിപ്പിച്ചു.",
        ),
      },
      {
        y: "2018",
        t: L("Kerala flood relief", "കേരള പ്രളയ ദുരിതാശ്വാസം"),
        d: L(
          "Paints and auctions works with her students to support families affected by the floods.",
          "പ്രളയബാധിത കുടുംബങ്ങളെ സഹായിക്കാൻ വിദ്യാർത്ഥികൾക്കൊപ്പം ചിത്രങ്ങൾ വരച്ച് ലേലം ചെയ്തു.",
        ),
      },
      {
        y: "2020",
        t: L("Classes go online", "ക്ലാസുകൾ ഓൺലൈനിലേക്ക്"),
        d: L(
          "Moves teaching online during the lockdown and reaches students across India.",
          "ലോക്ക്ഡൗൺ കാലത്ത് ക്ലാസുകൾ ഓൺലൈനിലേക്ക് മാറ്റി, ഇന്ത്യയൊട്ടാകെയുള്ള വിദ്യാർത്ഥികളിലേക്കെത്തി.",
        ),
      },
      {
        y: "2022",
        t: L("Walls for public spaces", "പൊതുഇടങ്ങൾക്കായി ചുവരുകൾ"),
        d: L(
          "Leads murals for government schools and a district hospital with volunteer students.",
          "സന്നദ്ധ വിദ്യാർത്ഥികൾക്കൊപ്പം സർക്കാർ സ്കൂളുകളിലും ഒരു ജില്ലാ ആശുപത്രിയിലും ചുമർചിത്രങ്ങൾക്ക് നേതൃത്വം നൽകി.",
        ),
      },
      {
        y: "2025",
        t: L("A new generation", "പുതിയ തലമുറ"),
        d: L(
          "Graduates of her certificate course begin taking commissions of their own.",
          "അവരുടെ സർട്ടിഫിക്കറ്റ് കോഴ്സ് പൂർത്തിയാക്കിയവർ സ്വന്തമായി ഓർഡറുകൾ ഏറ്റെടുത്തു തുടങ്ങി.",
        ),
      },
    ],
  },
};
export default data;
