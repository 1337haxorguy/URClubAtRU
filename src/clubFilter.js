import { promises as fs } from 'fs';

const tagVariations = {
    major: {
        "actuarial mathematics": ["actuarial mathematics", "actuary", "mathematical finance"],
        "aerospace engineering": ["aerospace engineering", "aerospace", "aviation"],
        "african, middle eastern, and south asian languages and literatures": ["african languages", "middle eastern languages", "south asian languages", "literatures"],
        "africana studies": ["africana studies", "african studies", "black studies"],
        "agriculture and food systems": ["agriculture", "food systems", "agricultural science"],
        "american studies": ["american studies", "american history", "american culture"],
        "animal science": ["animal science", "animal biology", "zoology"],
        "anthropology, cultural": ["cultural anthropology", "cultural studies", "anthropology"],
        "anthropology, evolutionary": ["evolutionary anthropology", "evolutionary biology", "evolutionary studies"],
        "applied sciences in engineering": ["applied sciences", "engineering", "applied engineering"],
        "art": ["art", "fine arts", "visual arts"],
        "art history": ["art history", "history of art", "art historiography"],
        "asian studies": ["Asian American Cultural Center"],
        "astrophysics": ["astrophysics", "astronomy", "cosmology"],
        "biochemistry": ["biochemistry", "biochemical sciences", "biochemist"],
        "biological sciences": ["biological sciences", "biology", "biological research"],
        "biomathematics": ["biomathematics", "mathematical biology", "biomath"],
        "biomedical engineering": ["biomedical engineering", "biomedical sciences", "biomedical technology"],
        "biotechnology": ["biotechnology", "biotech", "genetic engineering"],
        "business analytics and information technology": ["business analytics", "information technology", "business IT"],
        "cell biology and neuroscience": ["cell biology", "neuroscience", "cell and neurobiology"],
        "chemical engineering": ["chemical engineering", "chemical process engineering", "chemical sciences"],
        "chemistry": ["chemistry", "chemical sciences", "chemist"],
        "chinese": ["chinese", "mandarin", "chinese studies"],
        "cinema studies": ["cinema studies", "film studies", "movie studies"],
        "civil engineering": ["civil engineering", "structural engineering", "civil structures"],
        "classics": ["classics", "ancient studies", "classical languages"],
        "cognitive science": ["cognitive science", "cognition", "cognitive psychology"],
        "communication": ["communication", "communications", "media studies"],
        "comparative literature": ["comparative literature", "literary comparison", "literary studies"],
        "computer science": ["computer science", "computing", "software engineering", "coding", "data structures", "developer", "hackathon"],
        "criminal justice": ["criminal justice", "criminology", "criminal law"],
        "dance": ["dance", "performing arts", "choreography"],
        "design": ["design", "graphic design", "industrial design"],
        "digital filmmaking": ["digital filmmaking", "film production", "digital cinema"],
        "ecology, evolution, and natural resources": ["ecology", "evolution", "natural resources", "environmental science"],
        "economics": ["economics", "economic sciences", "economist"],
        "electrical and computer engineering": ["electrical engineering", "computer engineering", "electronics"],
        "english": ["english", "literature", "creative writing"],
        "entomology": ["entomology", "insects", "bugs"],
        "environmental and business economics": ["environmental economics", "business economics", "sustainable economics"],
        "environmental engineering": ["environmental engineering", "environmental science", "sustainable engineering"],
        "environmental planning": ["environmental planning", "urban planning", "sustainable planning"],
        "environmental policy, institutions, and behavior": ["environmental policy", "policy studies", "environmental institutions"],
        "environmental sciences": ["environmental sciences", "environmental studies", "ecology"],
        "environmental studies (available as a second major only)": ["environmental studies", "environmental science", "sustainability studies"],
        "european studies": ["european studies", "european history", "european cultures"],
        "exercise science": ["exercise science", "kinetics", "sports science"],
        "finance": ["finance", "financial management", "financial planning"],
        "food science": ["food science", "food technology", "nutritional science"],
        "french": ["french", "francophone studies", "french literature"],
        "genetics": ["genetics", "genetic research", "genetic engineering"],
        "geography": ["geography", "geospatial sciences", "physical geography"],
        "geological sciences": ["geological sciences", "geology", "earth sciences"],
        "german": ["german", "german studies", "german literature"],
        "global humanities": ["global humanities", "humanities", "global studies"],
        "health administration": ["health administration", "health management", "healthcare administration"],
        "history": ["history", "historical studies", "historian"],
        "history/french": ["history/french", "history and french", "french history"],
        "history/political science": ["history/political science", "history and political science", "political history"],
        "human resource management": ["human resource management", "HRM", "human resources"],
        "industrial engineering": ["industrial engineering", "manufacturing engineering", "operations research"],
        "information technology and informatics": ["information technology", "informatics"],
        "italian": ["italian", "italian studies", "italian language"],
        "italian studies": ["italian studies", "italian culture", "italian literature"],
        "jewish studies": ["jewish studies", "jewish history", "jewish culture"],
        "journalism and media studies": ["journalism", "media studies", "news media"],
        "korean": ["korean", "korean studies", "korean language"],
        "labor and employment relations": ["labor and employment relations", "labor studies", "employment relations"],
        "landscape architecture": ["landscape architecture", "landscape design", "urban design"],
        "latin american studies": ["latin american studies", "latin american culture", "latin american history"],
        "latino and caribbean studies": ["latino studies", "caribbean studies", "latino culture"],
        "linguistics": ["linguistics", "language studies", "linguistic science"],
        "management and global business": ["management and global business", "global business", "business management"],
        "marine sciences": ["marine sciences", "oceanography", "marine biology"],
        "marketing": ["marketing", "advertising", "market research"],
        "materials science and engineering": ["materials science", "materials engineering", "material science"],
        "mathematics": ["mathematics", "math", "mathematician"],
        "mechanical engineering": ["mechanical engineering", "mechanics", "engineering"],
        "medieval studies": ["medieval studies", "medieval history", "medieval literature"],
        "meteorology": ["meteorology", "weather science", "climatology"],
        "microbiology": ["microbiology", "microbes", "bacteriology"],
        "middle eastern studies": ["middle eastern studies", "middle eastern cultures", "middle eastern history"],
        "molecular biology and biochemistry": ["molecular biology", "biochemistry", "molecular genetics"],
        "music": ["music", "musical studies", "musicians"],
        "nursing": ["nursing", "nurse", "nursing practitioner"],
        "nutritional sciences": ["nutritional sciences", "nutrition", "dietetics"],
        "pharmacy": ["pharmacy", "pharmacology", "pharmacist"],
        "philosophy": ["philosophy", "philosopher", "philosophical studies"],
        "physics": ["physics", "physical sciences", "physicist"],
        "planning and public policy": ["planning and public policy", "public policy", "urban planning"],
        "plant biology": ["plant biology", "botany", "plant sciences"],
        "political science": ["political science", "politics", "political scientist"],
        "portuguese": ["portuguese", "portuguese studies", "portuguese language"],
        "psychology": ["psychology", "psychological sciences", "psychologist"],
        "public health": ["public health", "health sciences", "public health management"],
        "public policy": ["public policy", "policy analysis", "policy studies"],
        "religion": ["religion", "theology", "religious studies"],
        "russian": ["russian", "russian studies", "russian language"],
        "social work": ["social work", "social services", "social worker"],
        "sociology": ["sociology", "social sciences", "sociologist"],
        "spanish": ["spanish", "spanish studies", "spanish language"],
        "sport management": ["sport management", "sports administration", "sports management"],
        "statistics and biostatistics": ["statistics", "biostatistics", "data analysis"],
        "statistics/mathematics": ["statistics", "mathematics", "data science"],
        "supply chain management": ["supply chain management", "logistics", "operations management"],
        "theater arts": ["theater arts", "performing arts", "drama"],
        "urban planning and design": ["urban planning and design", "urban design", "city planning"],
        "visual arts": ["visual arts", "art", "fine arts"],
        "women's, gender, and sexuality studies": ["women's studies", "gender studies", "sexuality studies"]
    },
    ethnicity: {
        african: ["African", "African-American"],
        arab: ["Arab", "Arabic", "Middle Eastern"],
        bangladeshi: ["Bangladeshi", "Bangladesh"],
        brazilian: ["Brazilian", "Brazil"],
        cambodian: ["Cambodian", "Cambodia", "Southeast Asia"],
        canadian: ["Canadian", "Canada"],
        chinese: ["Chinese", "China"],
        colombian: ["Colombian", "Colombia"],
        dominican: ["Dominican", "Dominican Republic"],
        dutch: ["Dutch", "Netherlands"],
        egyptian: ["Egyptian", "Egypt"],
        english: ["English", "England"],
        filipino: ["Filipino", "Filipina", "Philippines", "pinoy", "philippine"],
        french: ["French", "France"],
        german: ["German", "Germany"],
        greek: ["Greek", "Greece"],
        haitian: ["Haitian", "Haiti"],
        indian: ["Indian", "India"],
        indonesian: ["Indonesian", "Indonesia" , "Southeast Asia"],
        iranian: ["Iranian", "Iran"],
        irish: ["Irish", "Ireland"],
        italian: ["Italian", "Italy"],
        japanese: ["Japanese", "Japan"],
        korean: ["Korean", "Korea"],
        mexican: ["Mexican", "Mexico"],
        nigerian: ["Nigerian", "Nigeria"],
        pakistani: ["Pakistani", "Pakistan"],
        polish: ["Polish", "Poland"],
        puerto_rican: ["Puerto Rican", "Puerto Rico"],
        russian: ["Russian", "Russia"],
        vietnamese: ["Vietnamese", "Vietnam", "Southeast Asia"],
        "Ukrainian": ["Ukrainian", "Ukraine"],
        "Uruguayan": ["Uruguayan", "Uruguay"],
        "Uzbek": ["Uzbek", "Uzbekistan"],
        "Vanuatuan": ["Vanuatuan", "Vanuatu"],
        "Venezuelan": ["Venezuelan", "Venezuela"],
        "Vietnamese": ["Vietnamese", "Vietnam"],
        "Yemeni": ["Yemeni", "Yemen"],
        "Zambian": ["Zambian", "Zambia"],
        "Zimbabwean": ["Zimbabwean", "Zimbabwe"],
        "Norwegian": ["Norwegian", "Norway"],
        "Omani": ["Omani", "Oman"],
        "Pakistani": ["Pakistani", "Pakistan"],
        "Palauan": ["Palauan", "Palau"],
        "Panamanian": ["Panamanian", "Panama"],
        "Papuan": ["Papuan", "Papua New Guinea"],
        "Paraguayan": ["Paraguayan", "Paraguay"],
        "Peruvian": ["Peruvian", "Peru"],
        "Polish": ["Polish", "Poland"],
        "Portuguese": ["Portuguese", "Portugal"],
        "Qatari": ["Qatari", "Qatar"],
        "Romanian": ["Romanian", "Romania"],
        "Russian": ["Russian", "Russia"],
        "Rwandan": ["Rwandan", "Rwanda"],
        "Saint Lucian": ["Saint Lucian", "Saint Lucia"],
        "Saint Vincentian": ["Saint Vincentian", "Saint Vincent and the Grenadines"],
        "Salvadoran": ["Salvadoran", "El Salvador"],
        "Samoan": ["Samoan", "Samoa"],
        "San Marinese": ["San Marinese", "San Marino"],
        "Sao Tomean": ["Sao Tomean", "Sao Tome and Principe"],
        "Saudi Arabian": ["Saudi Arabian", "Saudi Arabia"],
        "Senegalese": ["Senegalese", "Senegal"],
        "Serbian": ["Serbian", "Serbia"],
        "Seychellois": ["Seychellois", "Seychelles"],
        "Sierra Leonean": ["Sierra Leonean", "Sierra Leone"],
        "Singaporean": ["Singaporean", "Singapore", "Southeast Asia"],
        "Slovak": ["Slovak", "Slovakia"],
        "Slovenian": ["Slovenian", "Slovenia"],
        "Somali": ["Somali", "Somalia"],
        "South African": ["South African", "South Africa"],
        "Korean": ["Korean", "Korea"],
        "Spanish": ["Spanish", "Spain"],
        "Sri Lankan": ["Sri Lankan", "Sri Lanka"],
        "Sudanese": ["Sudanese", "Sudan"],
        "Surinamese": ["Surinamese", "Suriname"],
        "Swazi": ["Swazi", "Eswatini"],
        "Swedish": ["Swedish", "Sweden"],
        "Swiss": ["Swiss", "Switzerland"],
        "Syrian": ["Syrian", "Syria"],
        "Taiwanese": ["Taiwanese", "Taiwan"],
        "Tajik": ["Tajik", "Tajikistan"],
        "Tanzanian": ["Tanzanian", "Tanzania"],
        "Thai": ["Thai", "Thailand", "Southeast Asia"],
        "Togolese": ["Togolese", "Togo"],
        "Tongan": ["Tongan", "Tonga"],
        "Trinidadian": ["Trinidadian", "Trinidad and Tobago"],
        "Tunisian": ["Tunisian", "Tunisia"],
        "Turkish": ["Turkish", "Turkey"],
        "Turkmen": ["Turkmen", "Turkmenistan"],
        "Tuvaluan": ["Tuvaluan", "Tuvalu"],
        "Ugandan": ["Ugandan", "Uganda"],
        "Ukrainian": ["Ukrainian", "Ukraine"],      
        "Georgian": ["Georgian", "Georgia"],
        "German": ["German", "Germany"],
        "Ghanaian": ["Ghanaian", "Ghana"],
        "Gibraltarian": ["Gibraltarian", "Gibraltar"],
        "Greek": ["Greek", "Greece"],
        "Grenadian": ["Grenadian", "Grenada"],
        "Guamanian": ["Guamanian", "Guam"],
        "Guatemalan": ["Guatemalan", "Guatemala"],
        "Guinean": ["Guinean", "Guinea"],
        "Guyanese": ["Guyanese", "Guyana"],
        "Haitian": ["Haitian", "Haiti"],
        "Honduran": ["Honduran", "Honduras"],
        "Hungarian": ["Hungarian", "Hungary"],
        "Icelandic": ["Icelandic", "Iceland"],
        "Indian": ["Indian", "India"],
        "Indonesian": ["Indonesian", "Indonesia"],
        "Iranian": ["Iranian", "Iran"],
        "Iraqi": ["Iraqi", "Iraq"],
        "Irish": ["Irish", "Ireland"],
        "Israeli": ["Israeli", "Israel"],
        "Italian": ["Italian", "Italy"],
        "Jamaican": ["Jamaican", "Jamaica"],
        "Japanese": ["Japanese", "Japan"],
        "Jordanian": ["Jordanian", "Jordan"],
        "Kazakh": ["Kazakh", "Kazakhstan"],
        "Kenyan": ["Kenyan", "Kenya"],
        "Kiribati": ["Kiribati", "Kiribati"],
        "Kuwaiti": ["Kuwaiti", "Kuwait"],
        "Kyrgyzstani": ["Kyrgyzstani", "Kyrgyzstan"],
        "Laotian": ["Laotian", "Laos", "Southeast Asia"],
        "Latvian": ["Latvian", "Latvia"],
        "Lebanese": ["Lebanese", "Lebanon"],
        "Liberian": ["Liberian", "Liberia"],
        "Libyan": ["Libyan", "Libya"],
        "Liechtensteiner": ["Liechtensteiner", "Liechtenstein"],
        "Lithuanian": ["Lithuanian", "Lithuania"],
        "Luxembourger": ["Luxembourger", "Luxembourg"],
        "Malawian": ["Malawian", "Malawi", "Southeast Asia"],
        "Malaysian": ["Malaysian", "Malaysia", "Southeast Asia"],
        "Maldivian": ["Maldivian", "Maldives"],
        "Malian": ["Malian", "Mali"],
        "Maltese": ["Maltese", "Malta"],
        "Marshallese": ["Marshallese", "Marshall Islands"],
        "Mauritian": ["Mauritian", "Mauritius"],
        "Mexican": ["Mexican", "Mexico"],
        "Micronesian": ["Micronesian", "Micronesia"],
        "Moldovan": ["Moldovan", "Moldova"],
        "Monégasque": ["Monégasque", "Monaco"],
        "Mongolian": ["Mongolian", "Mongolia"],
        "Montenegrin": ["Montenegrin", "Montenegro"],
        "Moroccan": ["Moroccan", "Morocco"],
        "Mozambican": ["Mozambican", "Mozambique"],
        "Namibian": ["Namibian", "Namibia"],
        "Nauruan": ["Nauruan", "Nauru"],
        "Nepalese": ["Nepalese", "Nepal"],
        "Netherlander": ["Netherlander", "Netherlands"],
        "New Zealander": ["New Zealander", "New Zealand"],
        "Nigerian": ["Nigerian", "Nigeria"],
        "Bahamian": ["Bahamian", "Bahamas"],
    "Bahraini": ["Bahraini", "Bahrain"],
    "Bengali": ["Bengali", "Bangladesh"],
    "Barbadian": ["Barbadian", "Barbados"],
    "Basque": ["Basque", "Basque Country"],
    "Belarusian": ["Belarusian", "Belarus"],
    "Belgian": ["Belgian", "Belgium"],
    "Belizean": ["Belizean", "Belize"],
    "Beninese": ["Beninese", "Benin"],
    "Bermudian": ["Bermudian", "Bermuda"],
    "Bhutanese": ["Bhutanese", "Bhutan"],
    "Bolivian": ["Bolivian", "Bolivia"],
    "Bosnian": ["Bosnian", "Bosnia and Herzegovina"],
    "Botswanan": ["Botswanan", "Botswana"],
    "Brazilian": ["Brazilian", "Brazil"],
    "Breton": ["Breton", "Brittany"],
    "British": ["British", "United Kingdom"],
    "British Virgin Islander": ["British Virgin Islander", "British Virgin Islands"],
    "Bruneian": ["Bruneian", "Brunei", 'Southeast Asia'],
    "Bulgarian": ["Bulgarian", "Bulgaria"],
    "Burkinabé": ["Burkinabé", "Burkina Faso"],
    "Burmese": ["Burmese", "Myanmar", "Southeast Asia"],
    "Myanmar": ["Burmese", "Myanmar", "Southeast Asia"],
    "Burundian": ["Burundian", "Burundi"],
    "Cabo Verdean": ["Cabo Verdean", "Cape Verde"],
    "Cambodian": ["Cambodian", "Cambodia"],
    "Cameroonian": ["Cameroonian", "Cameroon"],
    "Canadian": ["Canadian", "Canada"],
    "Catalan": ["Catalan", "Catalonia"],
    "Caymanian": ["Caymanian", "Cayman Islands"],
    "Central African": ["Central African", "Central African Republic"],
    "Chadian": ["Chadian", "Chad"],
    "Chilean": ["Chilean", "Chile"],
    "Chinese": ["Chinese", "China"],
    "Colombian": ["Colombian", "Colombia"],
    "Comorian": ["Comorian", "Comoros"],
    "Congolese": ["Congolese", "Congo"],
    "Costa Rican": ["Costa Rican", "Costa Rica"],
    "Croatian": ["Croatian", "Croatia"],
    "Cuban": ["Cuban", "Cuba"],
    "Curaçaoan": ["Curaçaoan", "Curaçao"],
    "Cypriot": ["Cypriot", "Cyprus"],
    "Czech": ["Czech", "Czech Republic"],
    "Danish": ["Danish", "Denmark"],
    "Djiboutian": ["Djiboutian", "Djibouti"],
    "Dominican": ["Dominican", "Dominican Republic"],
    "Dutch": ["Dutch", "Netherlands"],
    "Ecuadorian": ["Ecuadorian", "Ecuador"],
    "Egyptian": ["Egyptian", "Egypt"],
    "Emirati": ["Emirati", "United Arab Emirates"],
    "English": ["English", "England"],
    "Equatoguinean": ["Equatoguinean", "Equatorial Guinea"],
    "Eritrean": ["Eritrean", "Eritrea"],
    "Estonian": ["Estonian", "Estonia"],
    "Ethiopian": ["Ethiopian", "Ethiopia"],
    "Faroese": ["Faroese", "Faroe Islands"],
    "Fijian": ["Fijian", "Fiji"],
    "Filipino": ["Filipino", "Philippines", "Southeast Asia"],

    "Finnish": ["Finnish", "Finland"],
    "French": ["French", "France"],
    },
    gender: {
        female: ["female", "girl", "woman", "women", "girls", "lady", "ladies"],
        male: ["male", "boy", "man", "men", "boys", "gentleman", "gentlemen"]
    },
    hobbies: {
        reading: ["reading", "books", "literature", "novels"],
        "video games": ["video games", "gaming", "PC games", "console games"],
        "e-sports": ["e-sports", "competitive gaming", "tournaments", "online gaming"],
        "cooking/baking": ["cooking", "baking", "recipes", "culinary"],
        "k-pop dance": ["k-pop dance", "k-pop", "dance", "choreography"],
        painting: ["painting", "art", "fine arts", "canvas"],
        drawing: ["drawing", "sketching", "art", "illustration"],
        fashion: ["fashion", "clothing", "style", "design"],
        hackathons: ["hackathon", "coding", "tech competitions"],
        writing: ["writing"],
        photography: ["photography", "photos", "cameras", "photo editing"],
        choir: ["choir", "singing", "vocal", "choral"],
        chess: ["chess", "board games", "strategy games", "tournaments"],
        gardening: ["gardening", "plants", "horticulture", "landscaping"],
        "anime / manga": ["anime", "manga", "cosplay", "otaku"],
        "fantasy sports": ["fantasy sports", "fantasy football", "fantasy basketball", "fantasy leagues"],
        "bird watching": ["bird watching", "birding", "wildlife", "nature"],
        "a capella": ["a capella"],
        "playing musical instruments": ["playing musical instruments", "music", "band", "orchestra"],
        "learning new languages": ["learning new languages", "language learning", "bilingual", "multilingual"],
        "board games": ["board games", "tabletop games", "strategy games", "card games"],
        "taylor swift": ["taylor swift", "swifties", "pop music", "concerts"],
        "harry potter": ["harry potter", "wizarding world", "JK Rowling", "fantasy"],
        crochet: ["crochet", "yarn", "crafts", "knitting"],
        knitting: ["knitting", "yarn", "crafts", "crochet"],
        "watching films": ["watching films", "movies", "cinema"],
        embroidery: ["embroidery", "sewing", "crafts", "textile arts"],
        cosplay: ["cosplay", "costume", "anime", "manga"],
        "pokémon": ["pokémon"],
        podcasting: ["podcasting", "broadcasting", "audio", "radio"],
        "DJ / radio": ["DJ / radio", "music", "broadcasting", "entertainment"],
        blogging: ["blogging", "writing", "journaling", "content creation"],
        astronomy: ["astronomy", "space", "stars", "planets"],
        investing: ["invest", "investment"],
        "Content creation / influencing": ["influencer", "content creation", "content creator"]
    },
    minor: {
        "african area studies": ["african area studies", "african studies", "africa"],
        "afrikan studies": ["afrikan studies", "african studies", "black studies"],
        "aging": ["aging", "gerontology", "elder care"],
        "american studies": ["american studies", "american history", "american culture"],
        "anthropology": ["anthropology", "cultural anthropology", "social anthropology"],
        "art history": ["art history", "history of art", "art historiography"],
        "asian studies": ["Asian American Cultural Center"],
        "astronomy": ["astronomy", "astrophysics", "cosmology"],
        "biological sciences": ["biological sciences", "biology", "biological research"],
        "chemistry": ["chemistry", "chemical sciences", "chemist"],
        "chinese": ["chinese", "mandarin", "chinese studies"],
        "cinema studies": ["cinema studies", "film studies", "movie studies"],
        "classical humanities": ["classical humanities", "ancient studies", "classical languages"],
        "cognitive science": ["cognitive science", "cognition", "cognitive psychology"],
        "comparative literature": ["comparative literature", "literary comparison", "literary studies"],
        "computer science": ["computer science", "computing", "software engineering", "coding", "data structures", "computer", "developer"],
        "economics": ["economics", "economic sciences", "economist"],
        "english": ["english", "literature", "creative writing"],
        "european studies": ["european studies", "european history", "european cultures"],
        "french": ["french", "francophone studies", "french literature"],
        "geography": ["geography", "geospatial sciences", "physical geography"],
        "geological sciences": ["geological sciences", "geology", "earth sciences"],
        "german": ["german", "german studies", "german literature"],
        "greek (ancient)": ["ancient greek", "classical greek", "greek language"],
        "greek (modern)": ["modern greek", "greek studies", "greek language"],
        "history": ["history", "historical studies", "historian"],
        "hungarian": ["hungarian", "hungarian studies", "hungarian language"],
        "italian": ["italian", "italian studies", "italian language"],
        "japanese": ["japanese", "japanese studies", "japanese language"],
        "jewish studies": ["jewish studies", "jewish history", "jewish culture"],
        "korean": ["korean", "korean studies", "korean language"],
        "labor studies": ["labor studies", "labor relations", "employment studies"],
        "latin": ["latin", "latin language", "latin studies"],
        "latin american studies": ["latin american studies", "latin american culture", "latin american history"],
        "linguistics": ["linguistics", "language studies", "linguistic science"],
        "marine sciences": ["marine sciences", "oceanography", "marine biology"],
        "mathematics": ["mathematics", "math", "mathematician"],
        "medieval studies": ["medieval studies", "medieval history", "medieval literature"],
        "middle eastern studies": ["middle eastern studies", "middle eastern cultures", "middle eastern history"],
        "music": ["music", "musical studies", "musicians"],
        "operations research": ["operations research", "management science", "optimization"],
        "philosophy": ["philosophy", "philosopher", "philosophical studies"],
        "physics": ["physics", "physical sciences", "physicist"],
        "planning and public policy": ["planning and public policy", "public policy", "urban planning"],
        "political science": ["political science", "politics", "political scientist"],
        "portuguese": ["portuguese", "portuguese studies", "portuguese language"],
        "psychology": ["psychology", "psychological sciences", "psychologist"],
        "puerto rican and hispanic caribbean studies": ["puerto rican studies", "hispanic caribbean studies", "latin studies"],
        "religion": ["religion", "theology", "religious studies"],
        "russian": ["russian", "russian studies", "russian language"],
        "science, technology, and society": ["science technology society", "STS", "science and society"],
        "sociology": ["sociology", "social sciences", "sociologist"],
        "south asian studies": ["south asian studies", "south asian cultures", "south asian history"],
        "spanish": ["spanish", "spanish studies", "spanish language"],
        "statistics": ["statistics", "statistical analysis", "data analysis"],
        "theater arts": ["theater arts", "performing arts", "drama"],
        "women's and gender studies": ["women's studies", "gender studies", "sexuality studies"]
    },
    causesPassionateAbout: {
        
            "animal_rights": ["animal rights", "animal welfare", "animal protection"],
            "atheism": ["atheism", "secularism", "non-religious"],
            "bipartisan": ["bipartisan", "cross-party", "political compromise"],
            "capitalism": ["capitalism", "free market", "private enterprise"],
            "climate_action": ["climate action", "environmentalism", "climate change"],
            "conservative": ["conservative", "right-wing", "traditionalism"],
            "environmentalism": ["environmentalism", "sustainability", "eco-friendly"],
            "feminism": ["feminism", "women's rights", "gender equality"],
            "green_party": ["green party", "environmental politics", "ecology"],
            "healthcare_reform": ["healthcare reform", "medical reform", "health policy"],
            "liberal": ["liberal", "left-wing", "progressivism"],
            "libertarian": ["libertarian", "individual freedom", "minimal government"],
            "minimum_wage": ["minimum wage", "living wage", "wage policy"],
            "progressive": ["progressive", "social change", "reform"],
            "public_health": ["public health", "healthcare", "community health"],
            "socialism": ["socialism", "social justice", "collectivism"],
            "tax_reform": ["tax reform", "tax policy", "taxation"],
            "transgender_rights": ["transgender rights", "gender identity", "LGBTQ+ rights"],
            "universal_basic_income": ["universal basic income", "UBI", "income equality"],
            "veganism": ["veganism", "plant-based diet", "animal-free"],
            "womens_rights": ["women's rights", "gender equality", "feminism"],
            "workers_rights": ["workers' rights", "labor rights", "employment rights"],
            "youth_activism": ["youth activism", "teen activism", "young activists"]
        
        
    },
    career: {
        "software engineering": ["software engineering", "software engineer", "programming"],
        "nursing": ["nursing", "nurse", "healthcare"],
        "accounting": ["accounting", "accountant", "finance"],
        "ux designer": ["ux design", "ux designer", "user experience", "UI/UX"],
        "financial analysis": ["financial analysis", "finance analyst", "financial analyst"],
        "law": ["law", "lawyer", "legal studies"],
        "investment banking": ["investment banking", "investment banker", "finance"],
        "operations management": ["operations management", "operations manager", "business operations"],
        "data science": ["data science", "data scientist", "analytics"],
        "civil engineering": ["civil engineering", "civil engineer", "construction engineering"],
        "mechanical engineering": ["mechanical engineering", "mechanical engineer", "engineering"],
        "marketing": ["marketing", "marketing specialist", "advertising"],
        "project management": ["project management", "project manager", "business management"],
        "human resources": ["human resources", "hr representative", "personnel management"],
        "journalism": ["journalism", "journalist", "reporting"],
        "teaching": ["teaching", "teacher", "education"],
        "psychology": ["psychology", "psychologist", "mental health"],
        "copywriting": ["copywriting", "copywriter", "content creation"],
        "politics": ["politics", "politician", "government"],
        "photography": ["photography", "photographer", "visual arts"],
        "cybersecurity": ["cybersecurity", "cybersecurity analyst", "information security"],
        "medicine": ["medicine", "physician", "doctor"],
        "physical therapy": ["physical therapy", "physical therapist", "rehabilitation"],
        "architecture": ["architecture", "architect", "building design"],
        "interior design": ["interior design", "interior designer", "decorating"],
        "veterinary medicine": ["veterinary medicine", "veterinarian", "animal care"],
        "research science": ["research science", "research scientist", "scientific research"],
        "film directing": ["film directing", "film director", "movie making"],
        "entrepreneurship": ["entrepreneurship", "entrepreneur", "startup founder"],
        "urban planning": ["urban planning", "urban planner", "city planning"],
        "dentistry": ["dentistry", "dentist", "oral health"],
        "videography": ["videography", "videographer", "video production"],
        "music": ["music", "musician", "performing arts"],
        "acting": ["acting", "actor", "theatre"],
        "pharmacy": ["pharmacy", "pharmacist", "pharmaceutical science"],
        "environmental science": ["environmental science", "environmental scientist", "ecology"],
        "event planning": ["event planning", "event planner", "event management"],
        "actuarial science": ["actuarial science", "actuary", "mathematical finance"],
        "fashion design": ["fashion design", "fashion designer", "clothing design"],
        "video game development": ["video game development", "video game developer", "game design"],
        "forensic science": ["forensic science", "forensic scientist", "criminalistics"],
        "marine biology": ["marine biology", "marine biologist", "oceanography"],
        "real estate": ["real estate", "real estate agent", "property management"],
        "physician assistant": ["physician assistant", "pa", "medical assistant"],
        "biomedical engineering": ["biomedical engineering", "biomedical engineer", "bioengineering"]
    },
    religion: {
        "bahá'í faith": ["bahá'í faith", "bahá'í"],
        "buddhism": ["buddhism", "buddhist"],
        "christianity": ["christianity", "christian"],
        "confucianism": ["confucianism", "confucius"],
        "hinduism": ["hinduism", "hindu"],
        "islam": ["islam", "muslim", "islamic"],
        "jainism": ["jainism", "jain"],
        "judaism": ["judaism", "jewish"],
        "neo-paganism": ["neo-paganism", "paganism"],
        "rastafarianism": ["rastafarianism", "rastafari"],
        "shamanism": ["shamanism", "shaman"],
        "shinto": ["shinto", "shintoism"],
        "sikhism": ["sikhism", "sikh"],
        "taoism": ["taoism", "taoist"],
        "unitarian universalism": ["unitarian universalism", "unitarian"],
        "zoroastrianism": ["zoroastrianism", "zoroaster"]
    },
    genderIdentity: {
        "agender": ["agender", "genderless", "LGBTQ"],
        "asexual": ["asexual", "ace", "LGBTQ"],
        "bisexual": ["bisexual", "bi", "LGBTQ"],
        "demisexual": ["demisexual", "demi", "LGBTQ"],
        "gay": ["gay", "homosexual", "LGBTQ"],
        "genderqueer": ["genderqueer", "nonbinary", "LGBTQ"],
        "intersex": ["intersex", "hermaphrodite", "LGBTQ"],
        "lesbian": ["lesbian", "gay woman", "LGBTQ"],
        "non-binary": ["non-binary", "nonbinary", "LGBTQ"],
        "pansexual": ["pansexual", "pan", "LGBTQ"],
        "polysexual": ["polysexual", "poly", "LGBTQ"],
        "queer": ["queer", "genderqueer", "LGBTQ"],
        "two spirit": ["two spirit", "two-spirit", "LGBTQ"]
    }
    
    
};


export async function loadClubsData(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export function getVariations(key, value) {
    let variations = [];

    if (Array.isArray(value)) {
        variations = value.map(v => v.toLowerCase()); // Convert each item to lowercase
    } else if (typeof value === 'string') {
        variations = [value.toLowerCase()]; // Convert string to lowercase and include as a variation
    }

    if (tagVariations[key]) {
        if (typeof tagVariations[key] === 'object' && !Array.isArray(tagVariations[key])) {
            Object.entries(tagVariations[key]).forEach(([subKey, subArray]) => {
                if (variations.includes(subKey.toLowerCase())) {
                    variations.push(...subArray.map(v => v.toLowerCase()));
                }
            });
        } else {
            variations.push(...tagVariations[key].map(v => v.toLowerCase()));
        }
    }

    return variations;
}

export function filterClubs(clubsData, filters, minMatches) {
    const filteredClubs = [];
    const ethnicityClubs = [];
    const hobbiesClubs = [];
    const majorCareerClubs = [];
    const otherClubs = [];

    clubsData.clubs.forEach(club => {
        let matchCount = 0;
        let priorityMatch = false;
        const matchedFilters = new Set();
        let isEthnicityMatch = false;
        let isHobbiesMatch = false;
        let isMajorCareerMatch = false;
        let isOtherMatch = false;

        const userGender = filters.gender || ''; // Assuming filters contain gender
        if (userGender.toLowerCase() === 'male') {
            const femaleVariations = ['female', 'women', 'girls', 'lady', 'ladies'];
            if (femaleVariations.some(variation => {
                const regex = new RegExp(`\\b${variation}\\b`, 'i');
                return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
            })) {
                return; // Skip this club as it is meant for females
            }
        }
        
        if (userGender.toLowerCase() === 'female') {
            const maleVariations = ['male', 'men', 'boys', 'gentlemen', 'man'];
            if (maleVariations.some(variation => {
                const regex = new RegExp(`\\b${variation}\\b`, 'i');
                return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
            })) {
                return; // Skip this club as it is meant for males
            }
        }
        
        for (const key in filters) {
            if (filters.hasOwnProperty(key) && filters[key] && !matchedFilters.has(key)) { // Check if the filter value is not empty
                const variations = getVariations(key, filters[key]);

                if (key === 'major' || key === 'career') {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        priorityMatch = true;
                        isMajorCareerMatch = true;
                    }
                } else if (key === 'ethnicity') {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        priorityMatch = true;
                        isEthnicityMatch = true;
                    }
                } else if (key === 'hobbies' || key == 'sports') {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        priorityMatch = true;
                        isHobbiesMatch = true;
                    }
                } else if (key === 'genderIdentity' || key === 'causesPassionateAbout' || key === 'religion') {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        isOtherMatch = true;
                    }
                } else {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        matchCount++;
                        matchedFilters.add(key);
                    }
                }
            }
        }

        if (isOtherMatch) {
            otherClubs.push(club);
        } else if (priorityMatch || matchCount >= minMatches) {
            filteredClubs.push(club);
            if (isEthnicityMatch) {
                ethnicityClubs.push(club);
            } else if (isHobbiesMatch) {
                hobbiesClubs.push(club);
            } else if (isMajorCareerMatch) {
                majorCareerClubs.push(club);
            } else {
                otherClubs.push(club);
            }
        }
    });

    console.log('Ethnicity: ', ethnicityClubs);
    console.log('Hobbies: ', hobbiesClubs);
    console.log('Career: ', majorCareerClubs);
    console.log('Other: ', otherClubs);

    return {
        filteredClubs,
        ethnicityClubs,
        hobbiesClubs,
        majorCareerClubs,
        otherClubs
    };
}
