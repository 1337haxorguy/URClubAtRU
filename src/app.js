import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { loadClubsData, filterClubs } from './clubFilter.js'; // Adjust the import path as needed
import { getRecommendations } from './gpt.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/', 'index.html'));
});

app.get('/clubs.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..//data', 'clubs.json'));
});

app.post('/filter-clubs', async (req, res) => {
    const filters = req.body;
    const clubsData = await loadClubsData(path.join(__dirname, '../data', 'clubs.json'));
    const minMatches = 2; // Minimum number of tags that need to match

    const filteredClubs = await filterClubs(clubsData, filters, minMatches);

    const prompt = `
    Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.
    
    The user's tags are: ${JSON.stringify(filters)}.
    
    Please recommend the top 5 clubs that are the best match for the user based on their tags. Follow these guidelines:
    
    1. **Gender-Specific Clubs:**
       - If the user is male, do not include any clubs focused around/dedicated women, and vice versa.
    
    2. **Priority Order:**
       - Prioritize clubs in this order:
         1. Hobby/Interest (derived from the hobby tag)
         2. Career Development
         3. Cultural
         4. Academic
         5. Social + Networking
         6. Recreational/Sports
         7. Service/Philanthropy
    
    3. **Inclusion Criteria:**
       - Include at least one hobby/interest club, one career club, and one cultural club in the top five recommendations, as long as there is enough data to extrapolate one of these clubs
    
    4. **Ethnicity-Specific Clubs:**
       - If there is a general club for an ethnicity, prioritize recommending that one. For example:
         - If the user is Taiwanese, recommend the Taiwanese Student Association.
         - If the user is Filipino, recommend the Association of Philippine Students (Rutgers).
       - Only recommend a more specific club (e.g., Japanese Conversation Club) if the user's tags strongly support the recommendation beyond just ethnicity.
    
    5. **General vs. Specific Clubs:**
       - Prefer general clubs over specific ones unless additional tags provide strong justification for a specific club.
       
    6. **Avoid Fraternities/Sororities:**
       - Explicitly avoid recommending fraternities, sororities, or any clubs with Greek letters in their names, unless the user's tags explicitly mention interest in Greek life.
    
    7. **Avoid Assumptions:**
       - Avoid making assumptions based on partial tags. For example:
         - Do not assume a user interested in "singing" should be recommended a specific type of choir unless explicitly tagged.
      - If someone is filipino, they are southeast asian, asian, but not south asian, you cannot generalize them to something incorrectly, or else it would look bad on this application
    
    8. **Additional Considerations:**
       - Ensure the recommendations are balanced across the priority categories.
    
    Recommend five clubs with these priorities and guidelines in mind. Provide the recommendations in a list format with each recommendation on a new line.
    `;
    
    const recommendations = await getRecommendations(prompt);

    console.log(filteredClubs)
    res.json({ filteredClubs, recommendations });
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'search.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
