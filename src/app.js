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

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/intro', express.static(path.join(__dirname, '../public/intro1')));
app.use('/intro2', express.static(path.join(__dirname, '../public/intro2')));
app.use('/question1', express.static(path.join(__dirname, '../public/question1')));
app.use('/question2', express.static(path.join(__dirname, '../public/question2')));


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
    - The first recommendation should be a career club
    - second should be a cultural club
    - third should be a club based on a hobby
    - fourth should be something about a cause they are passionate about
    - fifth should be greek life if they mention they are interested

    If there is not enough information, or if they are not interested in a certain category of club,
    filling the space in with something else is fine
                
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

app.get('/intro', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/intro1', 'intro.html'));
});

app.get('/intro2', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/intro2', 'intro2.html'));
});

app.get('/question1', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question1', 'question1.html'));
});

app.get('/question2', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question2', 'question2.html'));
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
