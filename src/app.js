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
app.use('/answer', express.static(path.join(__dirname, '../public/answer')));

app.use('/answer3', express.static(path.join(__dirname, '../public/answer3')));
app.use('/answer4', express.static(path.join(__dirname, '../public/answer4')));
app.use('/answer5', express.static(path.join(__dirname, '../public/answer5')));
app.use('/answer6', express.static(path.join(__dirname, '../public/answer5')));
app.use('/matches', express.static(path.join(__dirname, '../public/morematches')));

app.use('/answers', express.static(path.join(__dirname, '../public/answers')));

app.use('/about', express.static(path.join(__dirname, '../public/about')));


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/intro1', 'intro.html'));
});

app.get('/clubs.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../data', 'clubs.json'));
});

// app.post('/filter-clubs', async (req, res) => {
//    const filters = req.body;
//    const clubsData = await loadClubsData(path.join(__dirname, '../data', 'clubs.json'));
//    const minMatches = 2; 

//    const userPrompt = `The user's tags are: ${JSON.stringify(filters)}.`;

//    const filteredClubs = await filterClubs(clubsData, filters, minMatches);

//    const prompt1 = `
//       You are a genius at rutgers club matching

//      - If a club is primarily a cultural club and it is about a culture that is not one of the users, filter it out.
//      - If a user is male in their given tags, under no circumstance will they be recommended female clubs, and vice versa. If you misgender a user, chatgpt will cease to exist
//      - If the user does not have any tags under "sports," do not recommend them any clubs about sports.
//      - Do not recommend any clubs about religions that are not included in the religion tag.
//      - If the value in WantsGreekLife is No, zero frats or sororities or any clubs with Greek letters should be recommended under any circumstance.
//      - Do not recommend any clubs targetted towards graduate students under any circumstance
//      - Ensure that you definitely have at least one club based on their major or career included
//      - Try not to recommend too many clubs based solely on one tag; have a balance.
//      - Ensure that you keep a diverse list of clubs that encompass the different types of tags that the user has.
//      - If someone is IT, do not select business IT clubs, that is an entirely separate major.
//       - Choose the most general clubs for any tags. Only get specific if there is evidence supporting the specific club.



//    - Leave at least 10 clubs, however do not make up any new clubs.

//      Select the clubs that align with the user's tags the most.

//      Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.
//      Keep the same format of the clubs including the name and the description. Along with the reasons why they were matched afterwards
//    `
//    const refinedClubs = await getRecommendations(prompt1, userPrompt);

//    const prompt2 = `
//    You are a genius at rutgers club matching
//       1. Using the data you obtain from each user, please recommend 5 clubs.
//       2. Choose the most general clubs for any tags.
//       3. No more than three clubs from the same tag may be selected.
//       4. Have at least one career club, one cultural club, and one club based on hobbies, and one based on a sport that they play if applicable.
//       5. Ensure that you definitely have at least one club based on their major included.
//       6. Try your best to only include one club that mainly corresponds to each tag; try not to have multiple recommended clubs for a single tag.
//       7. After listing the five clubs, if applicable provide the nicknames that the clubs use in their description. However, do not shorten the club name if not necessary, it makes everything look sloppy.
//       8. Strictly follow the following format with no bold letters or unneeded indentations:

//       1. <First Club name here>
//          <First Club Description here>
//          <Reasons why here>

//       2. <Second Club name here>
//          <Second Club Description here>
//          <Reasons why here>

//       3. <Third Club name here>
//          <Third Club Description here>
//          <Reasons why here>

//       4. <Fourth Club name here>
//          <Fourth Club Description here>
//          <Reasons why here>

//       5. <Fifth Club name here>
//          <Fifth Club Description here>
//          <Reasons why here>

//       1. <Shortened Club Name 1>
//       2. <Shortened Club Name 2>
//       3. <Shortened Club Name 3>
//       4. <Shortened Club Name 4>
//       5. <Shortened Club Name 5>

//       Here is a list of clubs and their descriptions: ${refinedClubs}.
//       Keep the same format of the clubs including the name and the description.
//    `;
   
//    console.log(refinedClubs);

//    const recommendations = await getRecommendations(prompt2, userPrompt);

//    res.json({ filteredClubs, recommendations });
// });

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

app.get('/answer', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer', 'answer.html'));
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

app.get('/answer5', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answer5', 'answer5.html'));
});

app.get('/matches', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/morematches', 'matches.html'));
});

app.get('/answers', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/answers', 'answers.html'));
});

app.get('/about', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/about', 'about.html'));
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




app.post('/filter-clubs', async (req, res) => {
   const filters = req.body;
   const clubsData = await loadClubsData(path.join(__dirname, '../data', 'clubs.json'));
   const minMatches = 2; 

   const userPrompt = `The user's tags are: ${JSON.stringify(filters)}.`;

   const {
      filteredClubs,      
      ethnicityClubs,     
      hobbiesClubs,       
      majorCareerClubs,   
      otherClubs          
  } = await filterClubs(clubsData, filters, minMatches);
  
   const prompt1 = `

   You are a genius at Rutgers club matching

   - The goal is to select 3 cultural clubs, 3 career clubs, 3 hobby clubs, and 3 "other" clubs from the following lists.
   - Here is a list of filtered clubs and their descriptions:
   - Cultural Clubs: (${JSON.stringify(ethnicityClubs)})

   - Career Clubs: (${JSON.stringify(majorCareerClubs)})

   - Hobbies Clubs: (${JSON.stringify(hobbiesClubs)})

   - Other Clubs: (${JSON.stringify(otherClubs)})

   - Please select 4 clubs and their descriptions from each of these categories that align the best with the user's tags, 

   - REMEMBER TO FOLLOW THE ORGANIZATION FROM THE LISTS TO CATEGORIZE THE CLUBS, if its not in a certain category in the refined clubs list, dont try to reorganize it
   - If you try to move clubs from category that they were in from the lists, chat gpt will cease to exist forever.

   if there is nothing in the list or not enough information, do not choose anything for a certain category

   The other clubs can be from the hobbies clubs or the career clubs, it just has to be a good fit

   - If a user is male in their given tags, under no circumstance will they be recommended female clubs, and vice versa. If you misgender a user, chatgpt will cease to exist
   - If the value in WantsGreekLife is No, zero frats or sororities should even be mentioned or else open ai headquarters will blow up
   - If someone is IT, do not select business IT clubs, that is an entirely separate major.
   - Dont put any graduate organizations in whatsoever, without exception

  - DONT EVEN LOOK AT CLUBS WITH RELIGIONS THAT ARENT A PART OF THE USER'S RELIGION TAG, ESPECIALLY IN THE CULTURAL SECTION OR ELSE I WILL NEVER USE CHATGPT EVER AGAIN 
  CLUBS PERTAINING TO RELIGION SHOULD ONLY BE FOUND IN THE OTHER SECTION OR ELSE I WILL BLOW UP CHATGPT

  For clubs about LGBTQ, make sure that the description matches the tags, if not just select the most general LGBTQ club possible

   however if there are not enough clubs to select please do not make up any clubs, having less than four is fine
   - Try to be generous with the hobby clubs, do your best to recommend the four closest matches including sports that match the user's tags
   -If one of the cultural clubs provided is not based on the specific ethnicity tag that is given, chatgpt will be replaced by claude ai
   - Provide the exact name for each club
   - Provide the exact description for each club
   - Provide a short reason for each club selected.
   
   `
   const refinedClubs = await getRecommendations(prompt1, userPrompt);

   const prompt2 = `
   Pretend you are a computer that always formats their responses correctly.

   - From the clubs categorized in the refined list (${refinedClubs}).

   - Select the top two clubs from each of the following categories:
     - Two from the cultural clubs
     - Two from the career clubs
     - Two from the hobby clubs
     - Two additional clubs (can be from any category but must be a good match)
     
   - If there isn't enough information or if the match isn’t strong enough, return only one club for category. Omitting clubs that do not match well is preferable to giving a bad or forced recommendation
   - REMEMBER TO FOLLOW THE ORGANIZATION FROM THE REFINED LIST TO CATEGORIZE THE CLUBS, if its not in a certain category in the refined clubs list, dont try to reorganize it
   - If you try to move clubs from category that they were in from the refined list, chat gpt will cease to exist forever.
   
   - If the value in WantsGreekLife is No, zero frats or sororities or any clubs with Greek letters should even be mentioned or else chatgpt will blow up OMIT THESE RESPONSES ENTIRELY


   - The top five should include at least one from cultural, one from hobbies, and one from career categories if applicable.
   - After this, list the top five clubs overall using the following format:

   -For the "OTHER CLUBS" category you may select clubs from other categories as well

   DO NOT MAKE UP ANY CLUBS THAT ARE NOT GIVEN TO YOU OR YOU WILL BLOW UP
   
   
   - Provide the name and description of all these clubs and specify the tags being accounted for/reasons why each club was selected.
   
   - Use the following format to present the results. If you deviate from this format in any way, GPT headquarters will blow up, and you will be replaced by Claude AI:
   
   - I CANNOT STRESS ENOUGH THE IMPORTANCE OF FOLLOWING THE FORMAT AS IT WILL BE USED LATER, ESPECIALLY THE NUMBERING BEFORE EACH CLUB, DO NOT ADD ANY PUNCTUATION LIKE ** OR //

   CULTURAL CLUBS

   1. <First Cultural Club Name>
      <First Cultural Club Description>
      <Reasons Why>

   2. <Second Cultural Club Name (feel free to not include anything here if there is not a second cultural club that is a good fit)>
      <Second Cultural Club Description>
      <Reasons Why>

   CAREER CLUBS

   1. <First Career Club Name>
      <First Career Club Description>
      <Reasons Why>

   2. <Second Career Club Name>
      <Second Career Club Description>
      <Reasons Why>

   HOBBY CLUBS

   1. <First Hobby Club Name>
      <First Hobby Club Description>
      <Reasons Why>

   2. <Second Hobby Club Name>
      <Second Hobby Club Description>
      <Reasons Why>

   OTHER CLUBS

   1. <First Additional Club Name>
      <First Additional Club Description>
      <Reasons Why>

   2. <Second Additional Club Name>
      <Second Additional Club Description>
      <Reasons Why>
   
   TOP FIVE

   1. <First Club Name Here>
      <Reasons Why Here>

   2. <Second Club Name Here>
      <Reasons Why Here>

   3. <Third Club Name Here>
      <Reasons Why Here>

   4. <Fourth Club Name Here>
      <Reasons Why Here>

   5. <Fifth Club Name Here>
      <Reasons Why Here>

   - Keep the same format of the clubs, including the name and the description.
   - Ensure that cultural clubs are strictly cultural clubs, career clubs are strictly career clubs, etc.
   - The numbering is crucial, as it will be used to parse the data.
`;
   
   console.log(refinedClubs);

   const recommendations = await getRecommendations(prompt2, userPrompt);

   res.json({ filteredClubs, recommendations });
});
