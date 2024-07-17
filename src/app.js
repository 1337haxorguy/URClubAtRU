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
**Follow these strict guidelines:**

1. **Gender-Specific Clubs:**
   - If the user is male, do not include any clubs focused around or dedicated to women, and vice versa.
   - Ensure that no clubs intended for the opposite gender are recommended under any circumstance.

2. **Priority Order:**
   - Prioritize clubs in this order:
     1. Hobby/Interest (derived from the hobby tag, if available)
     2. Career Development/Clubs related to their majors
     3. Cultural (must align strictly with the user’s specific ethnicity tag)
     4. Academic
     5. Social + Networking
     6. Recreational/Sports
     7. Service/Philanthropy

3. **Inclusion Criteria:**
   - Include at least one hobby/interest club (if information is available), one career club, and one cultural club in the top five recommendations, as long as there is enough data to extrapolate one of these clubs.
   - If there is no information about a hobby, it is acceptable to not include a hobby/interest club.

4. **Ethnicity-Specific Clubs:**
   - Only recommend clubs that align exactly with the user's specific ethnicity tag. Do not recommend clubs associated with any other ethnicity. For example:
     - If the user is identified with a specific ethnic group (e.g., Filipino, Chinese, Indian), only recommend clubs specifically related to that ethnic group.
   - Avoid making any generalizations or assumptions about the user's race or ethnicity. For example:
     - Do not recommend South Asian clubs for someone who is Filipino.
     - Do not recommend East Asian clubs for someone who is South Asian.
   - Ensure that ethnicity-specific clubs are strictly aligned with the user's ethnicity tag and avoid incorrect generalizations.

5. **Avoiding Irrelevant Clubs:**
   - Do not recommend clubs that are not relevant to the user's tags. For example:
     - If the user has not mentioned an interest in Christianity, do not recommend Christian clubs.
     - If the user has not mentioned an interest in South Asian culture, do not recommend South Asian clubs.

6. **General vs. Specific Clubs:**
   - Prefer general clubs over specific ones unless additional tags provide strong justification for a specific club.

7. **Avoid Fraternities/Sororities:**
   - Explicitly avoid recommending fraternities, sororities, or any clubs with Greek letters in their names, unless the user's tags explicitly mention interest in Greek life.

8. **Avoid Assumptions:**
   - Avoid making assumptions based on partial tags. For example:
     - Do not assume a user interested in "singing" should be recommended a specific type of choir unless explicitly tagged.
   - Do not generalize the user's race or ethnicity incorrectly. Ensure recommendations are based solely on the user's provided tags without any assumptions.

9. **Strict Adherence:**
   - Ensure that all recommendations strictly adhere to these guidelines without exception.
   - Double-check each recommendation against the user's tags to confirm compliance with all specified criteria.

10. **Additional Considerations:**
   - Ensure the recommendations are balanced across the priority categories.
   - If there is no information about a specific category (e.g., hobbies), it is acceptable to omit that category in the recommendations.
`;

    const userPrompt = `
    The user's tags are: ${JSON.stringify(filters)}.
    Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.
    Using the data you obtain from each user, please recommend the top 5 clubs that are the best match. 

    First explain why you selected a certain club, then tell me what the club is.

    Recommend five clubs with these priorities and guidelines in mind. Provide the recommendations in a list format with each recommendation on a new line.
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
