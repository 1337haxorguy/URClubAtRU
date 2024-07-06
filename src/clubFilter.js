import { promises as fs } from 'fs';

const tagVariations = {
    major: {
        computerscience: ["computer science", "computing", "software engineering", "coding", "data structures", "computer", "developer"],
        engineering: ["engineers", "engineering"],
        "ux/ui": ["ux/ui", "ux", "ui", "user experience", "user interface"]
    },
    ethnicity: {
        asian: ["asian", "asian-american", "asia"],
        filipino: ["filipino", "filipina", "philippines", "pinoy", "philippine", "asia", "asian"]
    },
    gender: {
        female: ["female", "girl", "woman", "women", "girls", "lady", "ladies"],
        male: ["male", "boy", "man", "men", "boys", "gentleman", "gentlemen"]
    },
    hobby: {
        videogames: ["video games", "games", "e-sports", "esports", "gaming"],
        photography: ["photography", "photographer", "photo", "photos", "photograph", "photographs", "camera", "cameras", "lens", "lenses"]
    }
};

export async function loadClubsData(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export function getVariations(key, value) {
    const variations = [value.toLowerCase()]; // Include the original value as a variation

    if (tagVariations[key]) {
        if (typeof tagVariations[key] === 'object' && !Array.isArray(tagVariations[key])) {
            Object.entries(tagVariations[key]).forEach(([subKey, subArray]) => {
                if (subKey === value.toLowerCase()) {
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
                if (key === 'major' || key == 'hobby' || key == 'ethnicity') {
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
