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

app.use('/intro', express.static(path.join(__dirname, '../public/intro1')));
app.use('/intro2', express.static(path.join(__dirname, '../public/intro2')));
app.use('/question1', express.static(path.join(__dirname, '../public/question1')));
app.use('/question2', express.static(path.join(__dirname, '../public/question2')));
app.use('/question3', express.static(path.join(__dirname, '../public/question3')));
app.use('/question4', express.static(path.join(__dirname, '../public/question4')));
app.use('/question5', express.static(path.join(__dirname, '../public/question5')));
app.use('/question6', express.static(path.join(__dirname, '../public/question6')));
app.use('/question7', express.static(path.join(__dirname, '../public/question7')));
app.use('/question8', express.static(path.join(__dirname, '../public/question8')));
app.use('/question9', express.static(path.join(__dirname, '../public/question9')));
app.use('/question10', express.static(path.join(__dirname, '../public/question10')));
app.use('/question11', express.static(path.join(__dirname, '../public/question11')));
app.use('/question12', express.static(path.join(__dirname, '../public/question12')));
app.use('/loading', express.static(path.join(__dirname, '../public/loadingScreen')));
app.use('/answer3', express.static(path.join(__dirname, '../public/answer3')));
app.use('/answer4', express.static(path.join(__dirname, '../public/answer4')));


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/intro1', 'intro.html'));
});

app.get('/clubs.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../data', 'clubs.json'));
});

app.post('/filter-clubs', async (req, res) => {
    const filters = req.body;
    const clubsData = await loadClubsData(path.join(__dirname, '../data', 'clubs.json'));
    const minMatches = 2; // Minimum number of tags that need to match

    const filteredClubs = await filterClubs(clubsData, filters, minMatches);

    const systemPrompt = `
    **Follow these steps to generate appropriate club recommendations when given data by the user:**
    

    Here is the ranking of what clubs to recommend by importance:
    1
   hobby/interest
   career development
   cultural
   social + networking
   academic
   recreational/sports
   service/philantropy
   greek life


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

    Include two new lines between each club
    Show which tags are included in the process of matching a club
    If the field WantsGreekLife is No, zero frats or sororities or any clubs with greek letters should be recommended under any circumstance
   Assume that everyone taking this survey is an undergraduate student
                
   If a user is male in their given tags, under no circumstance will they be recommended female clubs, and vice versa
   Using the above steps, at least five clubs that are the best match for the user.
   Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.   

    `;            
    const userPrompt = `
    The user's tags are: ${JSON.stringify(filters)}.
    Using the data you obtain from each user, please recommend 5 clubs at most.
   If the value in WantsGreekLife is No, zero frats or sororities or any clubs with greek letters should be recommended under any circumstance
   Assume that everyone taking this survey is an undergraduate student

    1. <First Club name here>
    <First Club Description here>
    <Reasons why here>

    2. <Second Club name here>
   <Second Club Description here>
   <Reasons why here>
   etc...
    `;

    const recommendations = await getRecommendations(systemPrompt, userPrompt);

    res.json({ filteredClubs, recommendations });
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'search.html'));
});

app.get('/intro', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/intro1', 'intro.html'));
});

app.get('/intro2', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/intro2', 'intro2.html'));
});

app.get('/intro3', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/intro3', 'intro3.html'));
});

app.get('/question1', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question1', 'question1.html'));
});

app.get('/question2', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question2', 'question2.html'));
});

app.get('/question3', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question3', 'question3.html'));
});

app.get('/question4', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question4', 'question4.html'));
});

app.get('/question5', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question5', 'question5.html'));
});

app.get('/question6', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question6', 'question6.html'));
});

app.get('/question7', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question7', 'question7.html'));
});

app.get('/question8', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question8', 'question8.html'));
});

app.get('/question9', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question9', 'question9.html'));
});

app.get('/question10', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question10', 'question10.html'));
});

app.get('/question11', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question11', 'question11.html'));
});

app.get('/question12', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question12', 'question12.html'));
});

app.get('/question13', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question13', 'question13.html'));
});

app.get('/question14', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/question14', 'question14.html'));
});

app.get('/loading', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/loadingScreen', 'loading.html'));
});

app.get('/answer1', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer1', 'answer1.html'));
});

app.get('/answer2', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer2', 'answer2.html'));
});

app.get('/answer3', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer3', 'answer3.html'));
});

app.get('/answer4', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer4', 'answer4.html'));
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
