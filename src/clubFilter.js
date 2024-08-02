import { promises as fs } from 'fs';

const tagVariations = {
    major: {
        accounting: ["accounting", "accountant", "financial accounting"],
        biology: ["biology", "biological sciences", "bio"],
        business: ["business", "business administration", "management"],
        chemistry: ["chemistry", "chemical engineering", "chemical sciences"],
        communications: ["communications", "communication studies", "media"],
        computerengineering: ["computer engineering", "computer hardware", "networking"],
        computerscience: ["computer science", "computing", "software engineering", "coding", "data structures", "computer", "developer"],
        criminaljustice: ["criminal justice", "criminology", "criminal law"],
        dentistry: ["dentistry", "dental hygiene", "dental"],
        economics: ["economics", "economic sciences", "economist"],
        education: ["education", "teaching", "educator"],
        electricalengineering: ["electrical engineering", "electrical", "electric"],
        "environmental science": ["environmental science", "environment", "environmental engineering"],
        entomology: ["entomology", "insects", "bugs"],
        film: ["film", "cinema", "movies"],
        finance: ["finance", "financial", "financial planning"],
        history: ["history", "historical studies", "historian"],
        "humanities and social sciences": ["humanities & social sciences", "humanities", "social sciences"],
        law: ["law", "legal studies", "lawyer"],
        literature: ["literature", "literary studies", "books"],
        marketing: ["marketing", "advertising", "market research"],
        mathematics: ["mathematics", "math", "mathematician"],
        medicine: ["medicine", "medical", "healthcare"],
        music: ["music", "musical", "musicians"],
        nursing: ["nursing", "nurse", "nursing practitioner"],
        philosophy: ["philosophy", "philosopher", "philosophical"],
        physics: ["physics", "physical sciences", "physicist"],
        politicalscience: ["political science", "politics", "political scientist"],
        psychology: ["psychology", "psychological", "psychologist"],
        "ux/ui": ["ux/ui", "usability", "user experience", "user interface", "design"]
    },
    ethnicity: {
        african: ["African", "African-American"],
        arab: ["Arab", "Arabic", "Middle Eastern"],
        bangladeshi: ["Bangladeshi", "Bangladesh"],
        brazilian: ["Brazilian", "Brazil"],
        cambodian: ["Cambodian", "Cambodia"],
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
        indonesian: ["Indonesian", "Indonesia"],
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
        vietnamese: ["Vietnamese", "Vietnam"]
    },
        gender: {
        female: ["female", "girl", "woman", "women", "girls", "lady", "ladies"],
        male: ["male", "boy", "man", "men", "boys", "gentleman", "gentlemen"]
    },
    hobby: {
        anime: ["anime", "manga", "cosplay"],
        art: ["art", "painting", "drawing", "sculpture"],
        blogging: ["blogging", "writing", "journaling"],
        cooking: ["cooking", "baking", "recipes", "culinary"],
        crafts: ["crafts", "DIY", "handicrafts"],
        dancing: ["dancing", "ballet", "hip-hop", "salsa"],
        exercise: ["exercise", "fitness", "running", "yoga"],
        fashion: ["fashion", "clothing", "style", "shopping"],
        filmmaking: ["filmmaking", "movies", "cinema", "directing"],
        gardening: ["gardening", "plants", "flowers", "horticulture"],
        hiking: ["hiking", "outdoors", "nature", "camping"],
        music: ["music", "playing instruments", "concerts"],
        painting: ["painting", "watercolor", "acrylic", "oil painting"],
        reading: ["reading", "books", "literature", "fiction"],
        rock_climbing: ["rock climbing", "bouldering", "climbing gym"],
        sewing: ["sewing", "quilting", "embroidery", "knitting"],
        singing: ["singing", "vocal", "choir", "karaoke"],
        skateboarding: ["skateboarding", "longboarding", "skate park"],
        surfing: ["surfing", "bodyboarding", "wave riding"],
        swimming: ["swimming", "diving", "water sports"],
        technology: ["technology", "gadgets", "coding", "tech"],
        traveling: ["traveling", "exploring", "adventure"],
        'video games': ["video games", "gaming", "e-sports", "esports"],
        volunteering: ["volunteering", "community service", "charity"],
        watching_movies: ["watching movies", "film", "cinema"],
        writing: ["writing", "creative writing", "journalism"],
        woodworking: ["woodworking", "carpentry", "woodcraft"],
        working_out: ["working out", "gym", "exercise"],
        yoga: ["yoga", "meditation", "mindfulness"],
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
    return clubsData.clubs.filter(club => {
        let matchCount = 0;
        let priorityMatch = false;
        const matchedFilters = new Set();

        for (const key in filters) {
            if (filters.hasOwnProperty(key) && filters[key] && !matchedFilters.has(key)) { // Check if the filter value is not empty
                const variations = getVariations(key, filters[key]);

                // Gender-specific exclusion logic
                if (key === 'gender') {
                    const genderVariations = tagVariations.gender;
                    const oppositeGender = filters[key] === 'male' ? 'female' : 'male';
                    const oppositeVariations = genderVariations[oppositeGender];

                    if (oppositeVariations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        return false; // Exclude club
                    }
                }
                
                
                if (key === 'major' || key == 'hobbies' || key == 'ethnicity' || key == 'causesPassionateAbout') {
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        priorityMatch = true;
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

        return priorityMatch || matchCount >= minMatches;
    });
}