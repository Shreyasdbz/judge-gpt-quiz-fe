import { Article } from "@/models/Article";

/**
 * Mix of real and fake news articles for testing purposes.
 */
export const MockArticles: Article[] = [
  {
    uid: "A1B2C3",
    createdAt: new Date(),
    title: "Major Breakthrough in Cancer Treatment Found",
    content:
      "Researchers at Stanford have made a groundbreaking discovery, potentially eliminating certain cancers through targeted gene therapy. Trials are set to begin in early 2025, with widespread application expected within five years.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "Major Breakthrough in Cancer Treatment Found",
    localizedTitleFr: "D&eacute;couverte Majeure dans le Traitement du Cancer",
    localizedTitleEs:
      "Descubrimiento Importante en el Tratamiento del C&aacute;ncer",
    localizedTitleDe: "Wichtiger Durchbruch bei der Krebsbehandlung",
    localizedContentEn:
      "Researchers at Stanford have made a groundbreaking discovery, potentially eliminating certain cancers through targeted gene therapy. Trials are set to begin in early 2025, with widespread application expected within five years.",
    localizedContentFr:
      "Les chercheurs de Stanford ont fait une d&eacute;couverte r&eacute;volutionnaire, &eacute;liminant potentiellement certains cancers gr&acirc;ce &agrave; la th&eacute;rapie g&eacute;nique cibl&eacute;e. Les essais devraient commencer d&eacute;but 2025.",
    localizedContentEs:
      "Los investigadores de Stanford han hecho un descubrimiento innovador, eliminando potencialmente ciertos tipos de c&aacute;ncer a trav&eacute;s de la terapia g&eacute;nica dirigida. Los ensayos comenzar&aacute;n a principios de 2025.",
    localizedContentDe:
      "Forscher an der Stanford haben eine bahnbrechende Entdeckung gemacht, die bestimmte Krebsarten durch gezielte Gentherapie m&ouml;glicherweise beseitigen k&ouml;nnte. Die Versuche beginnen Anfang 2025.",
  },
  {
    uid: "D4E5F6",
    createdAt: new Date(),
    title: "NASA Confirms Alien Life Discovered on Mars",
    content:
      "In a shocking revelation, NASA announced that microbial alien life has been discovered beneath the surface of Mars. The discovery raises questions about extraterrestrial life and its implications for humanity.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "NASA Confirms Alien Life Discovered on Mars",
    localizedTitleFr:
      "La NASA Confirme la D&eacute;couverte de Vie Extraterrestre sur Mars",
    localizedTitleEs:
      "La NASA Confirma el Descubrimiento de Vida Extraterrestre en Marte",
    localizedTitleDe:
      "NASA Best&auml;tigt Entdeckung von Au&szlig;erirdischem Leben auf dem Mars",
    localizedContentEn:
      "In a shocking revelation, NASA announced that microbial alien life has been discovered beneath the surface of Mars. The discovery raises questions about extraterrestrial life and its implications for humanity.",
    localizedContentFr:
      "Dans une r&eacute;v&eacute;lation choquante, la NASA a annonc&eacute; la d&eacute;couverte de vie extraterrestre microbienne sous la surface de Mars.",
    localizedContentEs:
      "En una revelaci&oacute;n impactante, la NASA anunci&oacute; que se descubri&oacute; vida microbiana extraterrestre bajo la superficie de Marte.",
    localizedContentDe:
      "In einer schockierenden Enth&uuml;llung gab die NASA bekannt, dass mikrobielles au&szlig;erirdisches Leben unter der Marsoberfl&auml;che entdeckt wurde.",
  },
  {
    uid: "G7H8I9",
    createdAt: new Date(),
    title: "Electric Cars Overtake Gas Vehicles in Global Sales",
    content:
      "For the first time in history, electric vehicles have outsold gas-powered cars globally. The shift is seen as a major step toward reducing carbon emissions and combating climate change.",
    isFake: false,
    source: "NYT",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "Electric Cars Overtake Gas Vehicles in Global Sales",
    localizedTitleFr:
      "Les Voitures &Eacute;lectriques D&eacute;passent les V&eacute;hicules &agrave; Essence dans les Ventes Mondiales",
    localizedTitleEs:
      "Los Autos El&eacute;ctricos Superan a los Veh&iacute;culos de Gas en Ventas Globales",
    localizedTitleDe:
      "Elektroautos &Uuml;berholen Benzinfahrzeuge im Globalen Absatz",
    localizedContentEn:
      "For the first time in history, electric vehicles have outsold gas-powered cars globally. The shift is seen as a major step toward reducing carbon emissions and combating climate change.",
    localizedContentFr:
      "Pour la premi&egrave;re fois dans l&rsquo;histoire, les v&eacute;hicules &eacute;lectriques ont surpass&eacute; les voitures &agrave; essence au niveau mondial.",
    localizedContentEs:
      "Por primera vez en la historia, los veh&iacute;culos el&eacute;ctricos superaron a los de gasolina en ventas a nivel mundial.",
    localizedContentDe:
      "Zum ersten Mal in der Geschichte haben Elektrofahrzeuge weltweit mehr Absatz gefunden als benzinbetriebene Autos.",
  },
  {
    uid: "J1K2L3",
    createdAt: new Date(),
    title: "Scientists Invent Water That Never Boils",
    content:
      "In a stunning advancement, scientists have developed a type of water that never boils, no matter the temperature. This discovery could revolutionize industries that rely on extreme heat.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "Scientists Invent Water That Never Boils",
    localizedTitleFr:
      "Des Scientifiques Inventent de l&rsquo;Eau Qui Ne Bouillit Jamais",
    localizedTitleEs: "Cient&iacute;ficos Inventan Agua Que Nunca Hierve",
    localizedTitleDe: "Wissenschaftler Erfinden Wasser, Das Niemals Kocht",
    localizedContentEn:
      "In a stunning advancement, scientists have developed a type of water that never boils, no matter the temperature. This discovery could revolutionize industries that rely on extreme heat.",
    localizedContentFr:
      "Dans une avanc&eacute;e &eacute;tonnante, des scientifiques ont d&eacute;velopp&eacute; un type d&rsquo;eau qui ne bout jamais, peu importe la temp&eacute;rature.",
    localizedContentEs:
      "En un avance sorprendente, los cient&iacute;ficos han desarrollado un tipo de agua que nunca hierve, sin importar la temperatura.",
    localizedContentDe:
      "In einer atemberaubenden Entwicklung haben Wissenschaftler eine Wasserart entwickelt, die unabh&auml;ngig von der Temperatur niemals kocht.",
  },
  {
    uid: "M4N5O6",
    createdAt: new Date(),
    title: "World Leaders Agree on Global Carbon Tax",
    content:
      "Leaders from over 100 countries have agreed to implement a global carbon tax in a bid to curb greenhouse gas emissions. The tax will take effect in 2026 and is expected to reduce emissions by 30% by 2030.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "World Leaders Agree on Global Carbon Tax",
    localizedTitleFr:
      "Les Dirigeants Mondiaux Acceptent une Taxe Carbone Globale",
    localizedTitleEs:
      "Los L&iacute;deres Mundiales Acordaron un Impuesto al Carbono Global",
    localizedTitleDe:
      "Weltf&uuml;hrer Stimmen Einer Globalen Kohlenstoffsteuer Zu",
    localizedContentEn:
      "Leaders from over 100 countries have agreed to implement a global carbon tax in a bid to curb greenhouse gas emissions. The tax will take effect in 2026 and is expected to reduce emissions by 30% by 2030.",
    localizedContentFr:
      "Les dirigeants de plus de 100 pays ont convenu d&rsquo;impl&eacute;menter une taxe mondiale sur le carbone pour limiter les &eacute;missions de gaz &agrave; effet de serre.",
    localizedContentEs:
      "Los l&iacute;deres de m&aacute;s de 100 pa&iacute;ses acordaron implementar un impuesto global al carbono para reducir las emisiones de gases de efecto invernadero.",
    localizedContentDe:
      "F&uuml;hrer von &uuml;ber 100 L&auml;ndern haben sich auf die Einf&uuml;hrung einer globalen Kohlenstoffsteuer geeinigt, um die Treibhausgasemissionen zu senken.",
  },
  {
    uid: "P1Q2R3",
    createdAt: new Date(),
    title: "Global Health Authorities Announce Eradication of Malaria",
    content:
      "In a major global health victory, the World Health Organization has officially announced the eradication of malaria, a disease that has plagued humanity for centuries. Widespread vaccination and prevention efforts were credited with the success.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Global Health Authorities Announce Eradication of Malaria",
    localizedTitleFr:
      "Les Autorit&eacute;s de Sant&eacute; Mondiale Annoncent l&rsquo;Eradication du Paludisme",
    localizedTitleEs:
      "Las Autoridades de Salud Globales Anuncian la Erradicaci&oacute;n de la Malaria",
    localizedTitleDe:
      "Globale Gesundheitsbeh&ouml;rden K&uuml;ndigen Ausrottung der Malaria an",
    localizedContentEn:
      "In a major global health victory, the World Health Organization has officially announced the eradication of malaria, a disease that has plagued humanity for centuries.",
    localizedContentFr:
      "Dans une grande victoire pour la sant&eacute; mondiale, l&rsquo;OMS a annonc&eacute; officiellement l&rsquo;&eacute;radication du paludisme, une maladie qui a tourment&eacute; l&rsquo;humanit&eacute; pendant des si&egrave;cles.",
    localizedContentEs:
      "En una gran victoria global para la salud, la Organizaci&oacute;n Mundial de la Salud anunci&oacute; oficialmente la erradicaci&oacute;n de la malaria.",
    localizedContentDe:
      "In einem gro&szlig;en globalen Gesundheitserfolg hat die Weltgesundheitsorganisation offiziell die Ausrottung der Malaria verk&uuml;ndet.",
  },
  {
    uid: "S4T5U6",
    createdAt: new Date(),
    title:
      "New Island Appears in the Pacific After Underwater Volcanic Eruption",
    content:
      "An underwater volcanic eruption has led to the formation of a new island in the Pacific Ocean. The island, currently unnamed, is expected to grow in size as volcanic activity continues in the region.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "New Island Appears in the Pacific After Underwater Volcanic Eruption",
    localizedTitleFr:
      "Une Nouvelle &Icirc;le Appara&icirc;t dans le Pacifique Apr&egrave;s une &Eacute;ruption Volcanique Sous-Marine",
    localizedTitleEs:
      "Nueva Isla Aparece en el Pac&iacute;fico Despu&eacute;s de una Erupci&oacute;n Volc&aacute;nica Submarina",
    localizedTitleDe:
      "Neue Insel Entsteht im Pazifik Nach Unterwasser-Vulkanausbruch",
    localizedContentEn:
      "An underwater volcanic eruption has led to the formation of a new island in the Pacific Ocean. The island is expected to grow in size as volcanic activity continues.",
    localizedContentFr:
      "Une &eacute;ruption volcanique sous-marine a conduit &agrave; la formation d&rsquo;une nouvelle &icirc;le dans le Pacifique.",
    localizedContentEs:
      "Una erupci&oacute;n volc&aacute;nica submarina ha llevado a la formaci&oacute;n de una nueva isla en el oc&eacute;ano Pac&iacute;fico.",
    localizedContentDe:
      "Ein Unterwasser-Vulkanausbruch hat zur Entstehung einer neuen Insel im Pazifik gef&uuml;hrt.",
  },
  {
    uid: "V7W8X9",
    createdAt: new Date(),
    title:
      "New AI Law Passed in European Union to Regulate Automated Decision Making",
    content:
      "The European Union has passed a comprehensive new law regulating the use of AI in automated decision-making systems. This legislation is aimed at ensuring transparency, fairness, and accountability in sectors like healthcare, finance, and law enforcement.",
    isFake: false,
    source: "NYT",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "New AI Law Passed in European Union to Regulate Automated Decision Making",
    localizedTitleFr:
      "Une Nouvelle Loi sur l&rsquo;IA Adopt&eacute;e dans l&rsquo;Union Europ&eacute;enne pour R&eacute;guler la Prise de D&eacute;cisions Automatis&eacute;e",
    localizedTitleEs:
      "Nueva Ley de IA Aprobada en la Uni&oacute;n Europea para Regular la Toma de Decisiones Automatizadas",
    localizedTitleDe:
      "Neue KI-Gesetzgebung der EU zur Regulierung Automatisierter Entscheidungen Verabschiedet",
    localizedContentEn:
      "The European Union has passed a new law regulating the use of AI in automated decision-making systems to ensure transparency, fairness, and accountability.",
    localizedContentFr:
      "L&rsquo;Union europ&eacute;enne a adopt&eacute; une nouvelle loi r&eacute;glementant l&rsquo;utilisation de l&rsquo;IA dans les syst&egrave;mes de prise de d&eacute;cisions automatis&eacute;es.",
    localizedContentEs:
      "La Uni&oacute;n Europea ha aprobado una nueva ley que regula el uso de la IA en sistemas de toma de decisiones automatizadas.",
    localizedContentDe:
      "Die Europ&auml;ische Union hat ein neues Gesetz zur Regulierung der Verwendung von KI in automatisierten Entscheidungssystemen verabschiedet.",
  },
  {
    uid: "Y1Z2A3",
    createdAt: new Date(),
    title:
      "Moon&rsquo;s Surface Shows Signs of Fresh Volcanic Activity, NASA Reports",
    content:
      "NASA has reported signs of recent volcanic activity on the surface of the Moon, indicating that the lunar interior may be more geologically active than previously thought. Scientists are now studying the implications for future lunar missions.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Moon&rsquo;s Surface Shows Signs of Fresh Volcanic Activity, NASA Reports",
    localizedTitleFr:
      "La Surface de la Lune Montre des Signes d&rsquo;Activit&eacute; Volcanique R&eacute;cente, Selon la NASA",
    localizedTitleEs:
      "La Superficie de la Luna Muestra Se&ntilde;ales de Actividad Volc&aacute;nica Reciente, Informa la NASA",
    localizedTitleDe:
      "Mondoberfl&auml;che Zeigt Anzeichen Frischer Vulkanaktivit&auml;t, Berichtet die NASA",
    localizedContentEn:
      "NASA has reported signs of recent volcanic activity on the surface of the Moon, indicating that the lunar interior may be more geologically active than previously thought.",
    localizedContentFr:
      "La NASA a signal&eacute; des signes d&rsquo;activit&eacute; volcanique r&eacute;cente sur la surface de la Lune.",
    localizedContentEs:
      "La NASA ha informado sobre signos de actividad volc&aacute;nica reciente en la superficie de la Luna.",
    localizedContentDe:
      "Die NASA hat Anzeichen f&uuml;r frische Vulkanaktivit&auml;ten auf der Mondoberfl&auml;che gemeldet.",
  },
  {
    uid: "B4C5D6",
    createdAt: new Date(),
    title:
      "World&rsquo;s First Hydrogen-Powered Commercial Flight Successfully Takes Off",
    content:
      "The world&rsquo;s first hydrogen-powered commercial aircraft successfully took off from Heathrow Airport today, marking a major milestone in the aviation industry&rsquo;s shift toward sustainable energy solutions. The flight is expected to lead to further advancements in clean energy technology.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "World&rsquo;s First Hydrogen-Powered Commercial Flight Successfully Takes Off",
    localizedTitleFr:
      "Le Premier Vol Commercial Aliment&eacute; &agrave; l&rsquo;Hydrog&egrave;ne du Monde D&eacute;colle avec Succ&egrave;s",
    localizedTitleEs:
      "El Primer Vuelo Comercial del Mundo Impulsado por Hidrogeno Despega con &Eacute;xito",
    localizedTitleDe:
      "Erster Wasserstoffbetriebener Kommerzieller Flug Startet Erfolgreich",
    localizedContentEn:
      "The world&rsquo;s first hydrogen-powered commercial aircraft successfully took off from Heathrow Airport today, marking a major milestone in the aviation industry&rsquo;s shift toward sustainable energy.",
    localizedContentFr:
      "Le premier avion commercial aliment&eacute; &agrave; l&rsquo;hydrog&egrave;ne du monde a d&eacute;coll&eacute; aujourd&rsquo;hui de l&rsquo;a&eacute;roport de Heathrow.",
    localizedContentEs:
      "El primer avi&oacute;n comercial impulsado por hidr&oacute;geno del mundo despeg&oacute; hoy desde el aeropuerto de Heathrow.",
    localizedContentDe:
      "Das erste kommerzielle Flugzeug der Welt, das mit Wasserstoff betrieben wird, ist heute erfolgreich vom Flughafen Heathrow gestartet.",
  },
  {
    uid: "H1I2J3",
    createdAt: new Date(),
    title: "New Material Discovered That Can Withstand Temperatures of the Sun",
    content:
      "Scientists have discovered a new synthetic material that can withstand temperatures as high as 15 million degrees Celsius, rivaling the core of the sun. This discovery could have significant implications for nuclear fusion technology.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "New Material Discovered That Can Withstand Temperatures of the Sun",
    localizedTitleFr:
      "Un Nouveau Mat&eacute;riau D&eacute;couvert Capable de R&eacute;sister aux Temp&eacute;ratures du Soleil",
    localizedTitleEs:
      "Descubierto un Nuevo Material Capaz de Resistir las Temperaturas del Sol",
    localizedTitleDe:
      "Neues Material Entdeckt, das Temperaturen der Sonne Standh&auml;lt",
    localizedContentEn:
      "Scientists have discovered a new synthetic material that can withstand temperatures as high as 15 million degrees Celsius, rivaling the core of the sun.",
    localizedContentFr:
      "Des scientifiques ont d&eacute;couvert un nouveau mat&eacute;riau synth&eacute;tique capable de r&eacute;sister &agrave; des temp&eacute;ratures aussi &eacute;lev&eacute;es que celles du noyau du soleil.",
    localizedContentEs:
      "Cient&iacute;ficos han descubierto un nuevo material sint&eacute;tico capaz de soportar temperaturas tan altas como las del n&uacute;cleo del sol.",
    localizedContentDe:
      "Wissenschaftler haben ein neues synthetisches Material entdeckt, das Temperaturen von bis zu 15 Millionen Grad Celsius standhalten kann.",
  },
  {
    uid: "K4L5M6",
    createdAt: new Date(),
    title: "New Species of Whale Discovered in the Deep Pacific",
    content:
      "Marine biologists have discovered a new species of whale deep in the Pacific Ocean. The species, which has been named the &ldquo;Shadow Whale&rdquo; due to its elusive nature, is believed to be one of the largest mammals on Earth.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "New Species of Whale Discovered in the Deep Pacific",
    localizedTitleFr:
      "Nouvelle Esp&egrave;ce de Baleine D&eacute;couverte dans le Pacifique Profond",
    localizedTitleEs:
      "Nueva Especie de Ballena Descubierta en las Profundidades del Pac&iacute;fico",
    localizedTitleDe: "Neue Walart im Tiefen Pazifik Entdeckt",
    localizedContentEn:
      "Marine biologists have discovered a new species of whale deep in the Pacific Ocean. It has been named the &ldquo;Shadow Whale&rdquo; due to its elusive nature.",
    localizedContentFr:
      "Des biologistes marins ont d&eacute;couvert une nouvelle esp&egrave;ce de baleine dans les profondeurs du Pacifique.",
    localizedContentEs:
      "Biólogos marinos han descubierto una nueva especie de ballena en las profundidades del Océano Pacífico.",
    localizedContentDe:
      "Meeresbiologen haben im tiefen Pazifik eine neue Walart entdeckt, die als &ldquo;Schattenwal&rdquo; bezeichnet wird.",
  },
  {
    uid: "N7O8P9",
    createdAt: new Date(),
    title: "Google Launches AI That Writes Books in Minutes",
    content:
      "Google has unveiled a groundbreaking AI that can write entire novels in under 10 minutes. The AI, named &ldquo;NovellaBot,&rdquo; is expected to revolutionize the publishing industry, although it has raised concerns among writers about the future of creative jobs.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn: "Google Launches AI That Writes Books in Minutes",
    localizedTitleFr:
      "Google Lance une IA Qui &Eacute;crit des Livres en Quelques Minutes",
    localizedTitleEs: "Google Lanza una IA que Escribe Libros en Minutos",
    localizedTitleDe: "Google Startet KI, die B&uuml;cher in Minuten Schreibt",
    localizedContentEn:
      "Google has unveiled a groundbreaking AI that can write entire novels in under 10 minutes, raising concerns among writers about the future of creative jobs.",
    localizedContentFr:
      "Google a d&eacute;voil&eacute; une IA r&eacute;volutionnaire capable d&rsquo;&eacute;crire des romans entiers en moins de 10 minutes.",
    localizedContentEs:
      "Google ha presentado una IA innovadora que puede escribir novelas completas en menos de 10 minutos.",
    localizedContentDe:
      "Google hat eine revolution&auml;re KI vorgestellt, die in weniger als 10 Minuten ganze Romane schreiben kann.",
  },
  {
    uid: "Q1R2S3",
    createdAt: new Date(),
    title:
      "Scientists Successfully Bring Extinct Species Back to Life Using DNA",
    content:
      "In a scientific first, researchers have successfully brought the extinct woolly mammoth back to life using preserved DNA samples. The team hopes this achievement will pave the way for further breakthroughs in cloning extinct species.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Scientists Successfully Bring Extinct Species Back to Life Using DNA",
    localizedTitleFr:
      "Des Scientifiques R&eacute;ussissent &agrave; Ramener une Esp&egrave;ce &Eacute;teinte &agrave; la Vie Gr&acirc;ce &agrave; l&rsquo;ADN",
    localizedTitleEs:
      "Cient&iacute;ficos Traen con &Eacute;xito a la Vida una Especie Extinta Usando ADN",
    localizedTitleDe:
      "Wissenschaftler Erwecken Ausgestorbene Art Erfolgreich mit DNA zum Leben",
    localizedContentEn:
      "Researchers have successfully brought the extinct woolly mammoth back to life using preserved DNA samples, hoping to pave the way for further cloning breakthroughs.",
    localizedContentFr:
      "Des chercheurs ont r&eacute;ussi &agrave; ramener &agrave; la vie le mammouth laineux gr&acirc;ce &agrave; des &eacute;chantillons d&rsquo;ADN conserv&eacute;s.",
    localizedContentEs:
      "Investigadores han tra&iacute;do de vuelta a la vida al mamut lanudo extinto utilizando muestras de ADN conservadas.",
    localizedContentDe:
      "Forscher haben den ausgestorbenen Wollmammut erfolgreich mit Hilfe von konservierten DNA-Proben zum Leben erweckt.",
  },
  {
    uid: "T4U5V6",
    createdAt: new Date(),
    title: "First 3D-Printed Rocket Successfully Launched into Space",
    content:
      "In a historic moment for space exploration, the world&rsquo;s first fully 3D-printed rocket successfully launched into orbit from Cape Canaveral. The rocket, developed by a private company, is seen as a breakthrough in reducing the cost of space travel.",
    isFake: false,
    source: "NYT",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "First 3D-Printed Rocket Successfully Launched into Space",
    localizedTitleFr:
      "Le Premier Fus&eacute;e Imprim&eacute;e en 3D D&eacute;colle Avec Succ&egrave;s dans l&rsquo;Espace",
    localizedTitleEs:
      "El Primer Cohete Impreso en 3D Despega con &Eacute;xito al Espacio",
    localizedTitleDe:
      "Erste 3D-gedruckte Rakete Erfolgreich in den Weltraum Gestartet",
    localizedContentEn:
      "In a historic moment, the world&rsquo;s first fully 3D-printed rocket successfully launched into orbit from Cape Canaveral, a breakthrough in reducing space travel costs.",
    localizedContentFr:
      "Dans un moment historique, la premi&egrave;re fus&eacute;e enti&egrave;rement imprim&eacute;e en 3D a d&eacute;coll&eacute; avec succ&egrave;s depuis Cap Canaveral.",
    localizedContentEs:
      "En un momento hist&oacute;rico, el primer cohete completamente impreso en 3D despeg&oacute; con &eacute;xito desde Cabo Cañaveral.",
    localizedContentDe:
      "In einem historischen Moment wurde die erste vollst&auml;ndig 3D-gedruckte Rakete erfolgreich von Cape Canaveral gestartet.",
  },
  {
    uid: "W1X2Y3",
    createdAt: new Date(),
    title:
      "Breakthrough in Alzheimer&rsquo;s Research Could Lead to Cure Within a Decade",
    content:
      "Scientists at a leading university have made a significant breakthrough in Alzheimer&rsquo;s research, discovering a new treatment that could potentially slow the disease&rsquo;s progression by targeting specific proteins in the brain. The treatment, which has shown promise in early clinical trials, may drastically reduce the onset of symptoms in patients diagnosed with early-stage Alzheimer&rsquo;s. Experts are hopeful that this could lead to a cure within the next decade, though further testing is required before widespread use can begin.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Breakthrough in Alzheimer&rsquo;s Research Could Lead to Cure Within a Decade",
    localizedTitleFr:
      "Une Perc&eacute;e dans la Recherche sur l&rsquo;Alzheimer Pourrait Mener &agrave; un Rem&egrave;de en Une D&eacute;cennie",
    localizedTitleEs:
      "Un Avance en la Investigaci&oacute;n del Alzheimer Podr&iacute;a Conducir a una Cura en una D&eacute;cada",
    localizedTitleDe:
      "Durchbruch in der Alzheimer-Forschung K&ouml;nnte Innerhalb Eines Jahrzehnts zur Heilung F&uuml;hren",
    localizedContentEn:
      "Scientists at a leading university have made a significant breakthrough in Alzheimer&rsquo;s research, discovering a treatment that could slow the disease&rsquo;s progression by targeting specific proteins in the brain.",
    localizedContentFr:
      "Des scientifiques d&rsquo;une grande universit&eacute; ont fait une perc&eacute;e majeure dans la recherche sur Alzheimer en d&eacute;couvrant un traitement qui pourrait ralentir la progression de la maladie.",
    localizedContentEs:
      "Cient&iacute;ficos de una universidad l&iacute;der han hecho un avance significativo en la investigaci&oacute;n del Alzheimer, descubriendo un tratamiento que podr&iacute;a ralentizar la progresi&oacute;n de la enfermedad.",
    localizedContentDe:
      "Wissenschaftler an einer f&uuml;hrenden Universit&auml;t haben einen bedeutenden Durchbruch in der Alzheimer-Forschung erzielt, indem sie eine Behandlung entdeckt haben, die das Fortschreiten der Krankheit verlangsamen k&ouml;nnte.",
  },
  {
    uid: "Z4A5B6",
    createdAt: new Date(),
    title: "Humanity Reaches Mars: First Crewed Mission Successfully Lands",
    content:
      "In an extraordinary achievement, humanity has successfully landed its first crewed mission on Mars. The spacecraft, which launched from Earth nearly seven months ago, touched down on the Martian surface in the Jezero Crater, a region scientists believe could hold evidence of ancient life. The crew of six astronauts will now spend the next two years exploring the planet, conducting experiments, and collecting samples to be returned to Earth on a future mission. This marks a new chapter in space exploration and humanity&rsquo;s quest to understand our place in the universe.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Humanity Reaches Mars: First Crewed Mission Successfully Lands",
    localizedTitleFr:
      "L&rsquo;Humanit&eacute; Atterrit sur Mars: la Premi&egrave;re Mission Habitee Est un Succ&egrave;s",
    localizedTitleEs:
      "La Humanidad Llega a Marte: La Primera Misi&oacute;n Tripulada Aterriza con &Eacute;xito",
    localizedTitleDe:
      "Menschheit Erreicht Mars: Erste Bemanntes Mission Erfolgreich Gelandet",
    localizedContentEn:
      "In an extraordinary achievement, humanity has successfully landed its first crewed mission on Mars. The crew will now spend two years exploring the planet and conducting experiments.",
    localizedContentFr:
      "Dans une r&eacute;alisation extraordinaire, l&rsquo;humanit&eacute; a r&eacute;ussi &agrave; faire atterrir sa premi&egrave;re mission habit&eacute;e sur Mars. L&rsquo;&eacute;quipage passera deux ans &agrave; explorer la plan&egrave;te.",
    localizedContentEs:
      "En un logro extraordinario, la humanidad ha aterrizado con &eacute;xito su primera misi&oacute;n tripulada en Marte. La tripulaci&oacute;n pasar&aacute; dos a&ntilde;os explorando el planeta.",
    localizedContentDe:
      "In einer au&szlig;ergew&ouml;hnlichen Errungenschaft hat die Menschheit erfolgreich ihre erste bemannte Mission auf dem Mars gelandet. Die Besatzung wird nun zwei Jahre auf dem Planeten verbringen.",
  },
  {
    uid: "C7D8E9",
    createdAt: new Date(),
    title: "Ancient Roman City Discovered Underneath Modern Day Naples",
    content:
      "Archaeologists have uncovered an ancient Roman city buried beneath modern-day Naples, revealing a perfectly preserved town that dates back over 2,000 years. The discovery includes a vast network of streets, homes, and public buildings, many of which are adorned with mosaics and frescoes depicting life in ancient Rome. Experts believe that this city may have been a vital part of the Roman Empire before being buried by volcanic ash from a nearby eruption. The site is expected to offer new insights into the lives of Romans and their urban planning techniques.",
    isFake: false,
    source: "NYT",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Ancient Roman City Discovered Underneath Modern Day Naples",
    localizedTitleFr:
      "Une Ville Romaine Ancienne D&eacute;couverte Sous le Naples Moderne",
    localizedTitleEs:
      "Descubren una Antigua Ciudad Romana Bajo el N&aacute;poles Moderno",
    localizedTitleDe:
      "Alte R&ouml;mische Stadt Unter Dem Heutigen Neapel Entdeckt",
    localizedContentEn:
      "Archaeologists have uncovered an ancient Roman city buried beneath modern-day Naples, revealing a perfectly preserved town that dates back over 2,000 years.",
    localizedContentFr:
      "Des arch&eacute;ologues ont d&eacute;couvert une ville romaine ancienne enfouie sous Naples moderne, r&eacute;v&eacute;lant une ville parfaitement pr&eacute;serv&eacute;e de plus de 2 000 ans.",
    localizedContentEs:
      "Arque&oacute;logos han descubierto una ciudad romana antigua enterrada bajo el N&aacute;poles moderno, revelando una ciudad perfectamente conservada de hace m&aacute;s de 2,000 a&ntilde;os.",
    localizedContentDe:
      "Arch&auml;ologen haben eine alte r&ouml;mische Stadt unter dem heutigen Neapel entdeckt, die &uuml;ber 2.000 Jahre alt ist.",
  },
  {
    uid: "F1G2H3",
    createdAt: new Date(),
    title: "Scientists Create Artificial Black Hole in Laboratory Conditions",
    content:
      "In a groundbreaking experiment, physicists have managed to create an artificial black hole in a controlled laboratory environment. This simulated black hole is designed to mimic the behavior of cosmic black holes, including the intense gravitational pull that bends light around it. While the artificial black hole is far smaller than those found in space, the experiment provides scientists with a unique opportunity to study black hole mechanics in real-time. The team behind the discovery believes that these insights could pave the way for new advancements in quantum mechanics and astrophysics.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Scientists Create Artificial Black Hole in Laboratory Conditions",
    localizedTitleFr:
      "Des Scientifiques Cr&eacute;ent un Trou Noir Artificiel dans des Conditions de Laboratoire",
    localizedTitleEs:
      "Cient&iacute;ficos Crean un Agujero Negro Artificial en Condiciones de Laboratorio",
    localizedTitleDe:
      "Wissenschaftler Erstellen K&uuml;nstliches Schwarzes Loch Unter Laborbedingungen",
    localizedContentEn:
      "Physicists have created an artificial black hole in a laboratory setting, allowing scientists to study black hole mechanics in real-time.",
    localizedContentFr:
      "Des physiciens ont cr&eacute;&eacute; un trou noir artificiel dans un environnement de laboratoire, permettant aux scientifiques d&rsquo;&eacute;tudier les m&eacute;caniques des trous noirs en temps r&eacute;el.",
    localizedContentEs:
      "F&iacute;sicos han creado un agujero negro artificial en un entorno de laboratorio, lo que permite a los cient&iacute;ficos estudiar la mec&aacute;nica de los agujeros negros en tiempo real.",
    localizedContentDe:
      "Physiker haben unter Laborbedingungen ein k&uuml;nstliches Schwarzes Loch erstellt, das es Wissenschaftlern erm&ouml;glicht, die Mechanik von Schwarzen L&ouml;chern in Echtzeit zu untersuchen.",
  },
  {
    uid: "L7M8N9",
    createdAt: new Date(),
    title: "Apple Announces Groundbreaking Augmented Reality Glasses",
    content:
      "In a highly anticipated event, Apple unveiled its latest innovation: augmented reality (AR) glasses called &ldquo;VisionPro.&rdquo; The sleek new device allows users to interact with digital content in their physical environment, offering immersive experiences for gaming, virtual meetings, and navigation. Apple claims that VisionPro&rsquo;s advanced sensors and lightweight design set it apart from competitors. The AR glasses are expected to hit the market in late 2024, with analysts predicting they could revolutionize the way people interact with technology in their daily lives.",
    isFake: false,
    source: "BBC",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Apple Announces Groundbreaking Augmented Reality Glasses",
    localizedTitleFr:
      "Apple Annonce des Lunettes de R&eacute;alit&eacute; Augment&eacute;e R&eacute;volutionnaires",
    localizedTitleEs: "Apple Anuncia Gafas de Realidad Aumentada Innovadoras",
    localizedTitleDe:
      "Apple K&uuml;ndigt Bahnbrechende Augmented-Reality-Brille an",
    localizedContentEn:
      "Apple unveiled its latest innovation: augmented reality glasses called &ldquo;VisionPro,&rdquo; which allow users to interact with digital content in their physical environment.",
    localizedContentFr:
      "Apple a pr&eacute;sent&eacute; sa derni&egrave;re innovation : des lunettes de r&eacute;alit&eacute; augment&eacute;e appel&eacute;es &ldquo;VisionPro&rdquo;.",
    localizedContentEs:
      "Apple present&oacute; su &uacute;ltima innovaci&oacute;n: gafas de realidad aumentada llamadas &ldquo;VisionPro&rdquo;.",
    localizedContentDe:
      "Apple hat seine neueste Innovation vorgestellt: eine Augmented-Reality-Brille namens &ldquo;VisionPro&rdquo;.",
  },
  {
    uid: "O1P2Q3",
    createdAt: new Date(),
    title: "Elon Musk Confirms Neuralink to Begin Human Trials in 2025",
    content:
      "Elon Musk has announced that Neuralink, his brain-computer interface company, is set to begin human trials in 2025. The device, which has been in development for several years, aims to allow direct communication between the human brain and computers. Musk stated that the technology could initially be used to treat neurological disorders such as Alzheimer&rsquo;s and Parkinson&rsquo;s, but its long-term potential includes enhancing human cognition and enabling telepathic communication. Ethical concerns have been raised about the implications of this technology, but Neuralink has received approval to proceed with trials.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Elon Musk Confirms Neuralink to Begin Human Trials in 2025",
    localizedTitleFr:
      "Elon Musk Confirme que Neuralink Commencera les Essais Humains en 2025",
    localizedTitleEs:
      "Elon Musk Confirma que Neuralink Comenzar&aacute; los Ensayos Humanos en 2025",
    localizedTitleDe:
      "Elon Musk Best&auml;tigt, dass Neuralink 2025 Mit Menschlichen Tests Beginnt",
    localizedContentEn:
      "Elon Musk has announced that Neuralink, his brain-computer interface company, is set to begin human trials in 2025, with the aim of enhancing human cognition and treating neurological disorders.",
    localizedContentFr:
      "Elon Musk a annonc&eacute; que Neuralink commencera les essais humains en 2025, visant &agrave; am&eacute;liorer la cognition humaine et &agrave; traiter les troubles neurologiques.",
    localizedContentEs:
      "Elon Musk ha anunciado que Neuralink comenzar&aacute; los ensayos humanos en 2025 con el objetivo de mejorar la cognici&oacute;n humana y tratar los trastornos neurol&oacute;gicos.",
    localizedContentDe:
      "Elon Musk hat angek&uuml;ndigt, dass Neuralink 2025 mit menschlichen Versuchen beginnen wird, um die menschliche Kognition zu verbessern und neurologische Erkrankungen zu behandeln.",
  },
  {
    uid: "R4S5T6",
    createdAt: new Date(),
    title: "Taylor Swift Sets New Streaming Record with Latest Album",
    content:
      "Pop sensation Taylor Swift has broken yet another streaming record with the release of her latest album, &ldquo;Midnight Memories.&rdquo; The album racked up over 500 million streams within its first 24 hours, making it the most-streamed album in a single day in Spotify&rsquo;s history. Fans around the world have praised Swift&rsquo;s new sound, which blends her signature lyrical storytelling with experimental electronic beats. Critics are calling it her most ambitious project to date, and Swift is already rumored to be planning a global tour to support the album.",
    isFake: false,
    source: "NYT",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Taylor Swift Sets New Streaming Record with Latest Album",
    localizedTitleFr:
      "Taylor Swift &Eacute;tablit un Nouveau Record de Streaming avec son Dernier Album",
    localizedTitleEs:
      "Taylor Swift Establece un Nuevo R&eacute;cord de Streaming con su &Uacute;ltimo &Aacute;lbum",
    localizedTitleDe:
      "Taylor Swift Stellt Neuen Streaming-Rekord Mit Ihrem Neuesten Album Auf",
    localizedContentEn:
      "Taylor Swift has broken another streaming record with her album &ldquo;Midnight Memories,&rdquo; which garnered 500 million streams in 24 hours.",
    localizedContentFr:
      "Taylor Swift a battu un nouveau record de streaming avec son album &ldquo;Midnight Memories,&rdquo; qui a recueilli 500 millions de flux en 24 heures.",
    localizedContentEs:
      "Taylor Swift ha batido otro r&eacute;cord de streaming con su &uacute;ltimo &aacute;lbum &ldquo;Midnight Memories&rdquo;, que obtuvo 500 millones de reproducciones en 24 horas.",
    localizedContentDe:
      "Taylor Swift hat mit ihrem neuesten Album &ldquo;Midnight Memories&rdquo; einen weiteren Streaming-Rekord gebrochen, mit 500 Millionen Streams in 24 Stunden.",
  },
  {
    uid: "U7V8W9",
    createdAt: new Date(),
    title: "Marvel Announces All-Female Avengers Movie for 2026 Release",
    content:
      "Marvel Studios has confirmed the development of an all-female Avengers movie, set for release in 2026. The film will feature several fan-favorite heroines from the Marvel Cinematic Universe, including Captain Marvel, Black Widow (via a multiverse storyline), and the Scarlet Witch. Directed by Chloe Zhao, the movie is expected to explore themes of empowerment and unity. This marks a major milestone for representation in superhero films and has already generated excitement among fans and critics alike. Marvel&rsquo;s president, Kevin Feige, hinted that this could be the start of a new era for the franchise.",
    isFake: true,
    source: "machine-generated",
    modelInformation: "GPT-4 AI Model",
    localizedTitleEn:
      "Marvel Announces All-Female Avengers Movie for 2026 Release",
    localizedTitleFr:
      "Marvel Annonce un Film Avengers Tout-F&eacute;minin pour une Sortie en 2026",
    localizedTitleEs:
      "Marvel Anuncia Pel&iacute;cula de Avengers Femeninas para Estrenarse en 2026",
    localizedTitleDe:
      "Marvel K&uuml;ndigt Avengers-Film mit Weiblicher Besetzung f&uuml;r 2026 an",
    localizedContentEn:
      "Marvel Studios has confirmed the development of an all-female Avengers movie, set for release in 2026, featuring Captain Marvel, Black Widow, and Scarlet Witch.",
    localizedContentFr:
      "Marvel Studios a confirm&eacute; le d&eacute;veloppement d&rsquo;un film Avengers tout-f&eacute;minin, pr&eacute;vu pour une sortie en 2026.",
    localizedContentEs:
      "Marvel Studios ha confirmado el desarrollo de una pel&iacute;cula de Avengers femeninas, que se estrenar&aacute; en 2026.",
    localizedContentDe:
      "Marvel Studios hat die Entwicklung eines reinen Avengers-Films mit weiblicher Besetzung best&auml;tigt, der 2026 erscheinen soll.",
  },
];
