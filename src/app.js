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

    const systemPrompt = `
    **Follow these steps to generate appropriate club recommendations when given data by the user:**
    
    Step 1: **Filter by Ethnicity**
    - Check the user's tags for any specified ethnicity.
    - Remove clubs that do not specifically include the student's ethnicity.
    
    Step 2: Filter out clubs that do not match the user's ethnicity tag
    - If a club does not specifically match one of the tags that the user has, it should not be recommended at all
    - It is okay to recommend less than five clubs if there is a lack of matching clubs
        
    Step 3: **Include Diverse Club Types**
    - Ensure the top five recommendations include at least:
      - One hobby/interest club
      - One career club
      - One cultural club
    - If there is insufficient data to include a club from one of these categories, it is acceptable to omit that category.
                
   If a user is male in their given tags, under no circumstance will they be recommended female clubs, and vice versa
   Using the above steps, at least five clubs that are the best match for the user.
   Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.

    `;            
    const userPrompt = `
    The user's tags are: ${JSON.stringify(filters)}.
    Using the data you obtain from each user, please recommend 5 clubs at most.
    `;

    const recommendations = await getRecommendations(systemPrompt, userPrompt);

    res.json({ filteredClubs, recommendations });
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'search.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
