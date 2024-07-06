import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { loadClubsData, filterClubs } from './clubFilter.js'; // Adjust the import path as needed

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/clubs.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../data', 'clubs.json'));
});

app.post('/filter-clubs', async (req, res) => {
    const filters = req.body;
    const clubsData = await loadClubsData(path.join(__dirname, '../data', 'clubs.json'));
    const minMatches = 2; // Minimum number of tags that need to match

    const filteredClubs = filterClubs(clubsData, filters, minMatches);
    res.json({ clubs: filteredClubs });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});