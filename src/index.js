import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import OpenAI from 'openai';
import { promises as fs } from 'fs';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clubs.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'clubs.json'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

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

  
async function loadClubsData(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

function getVariations(key, value) {
    const variations = [];
    if (tagVariations[key]) {
        if (typeof tagVariations[key] === 'object' && !Array.isArray(tagVariations[key])) {
            Object.entries(tagVariations[key]).forEach(([gender, subArray]) => {
                if (gender === value.toLowerCase()) {
                    variations.push(...subArray.map(v => v.toLowerCase()));
                }
            });
        } else {
            variations.push(...tagVariations[key].map(v => v.toLowerCase()));
        }
    } else {
        variations.push(value.toLowerCase());
    }
    return variations;
}

function filterClubs(clubsData, filters, minMatches) {
    return clubsData.clubs.filter(club => {
        let matchCount = 0;
        let priorityMatch = false;
        const matchedFilters = new Set(); // To track matched filters

        // Check club name and description for each filter
        for (const key in filters) {
            if (filters.hasOwnProperty(key) && !matchedFilters.has(key)) {
                const variations = getVariations(key, filters[key]);
                if (key === 'major' || key == 'hobby' || key == 'ethnicity') {
                    // Check priority aspect exclusively
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        priorityMatch = true;
                    }
                } else {
                    // Check other aspects to meet minMatches if priority aspect is not matched
                    if (variations.some(variation => {
                        const regex = new RegExp(`\\b${variation}\\b`, 'i');
                        return regex.test(club.name.toLowerCase()) || regex.test(club.description.toLowerCase());
                    })) {
                        matchCount++;
                        matchedFilters.add(key); // Mark filter as matched
                    }
                }
            }
        }

        return priorityMatch || matchCount >= minMatches;
    });
}

async function getRecommendations(prompt) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-05-13",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      });
      const generatedText = response.choices[0].message.content;
      return generatedText;
    } catch (error) {
      console.error("Error fetching recommendations from OpenAI:", error);
    }
  }

async function main() {
    const filePath = './clubs.json';
    const clubsData = await loadClubsData(filePath);
    const minMatches = 2; // Minimum number of tags that need to match

    const filters = {
        major: "engineering",
        ethnicity: "filipino",
        grade: "freshman",
        gender: "male",
        hobby: "photography",
        level: "undergraduate",
        greeklife: "false"
    };

    const filteredClubs = await filterClubs(clubsData, filters, minMatches);

    // const prompt = `Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.\n\nThe user's tags are: ${JSON.stringify(filters)}.\n\nBased on the user's tags, please recommend the top 5 clubs that are the best match for them. Please select the most general clubs based on the given information`;
    // const recommendations = await getRecommendations(prompt);

    // console.log(recommendations);
}

main()