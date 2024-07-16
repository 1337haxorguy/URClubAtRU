import { getRecommendations } from "./gpt.js";
import { filterClubs } from "./clubFilter.js";
import { loadClubsData } from "./clubFilter.js";

async function main() {
    const filePath = './data/clubs.json';
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

    const prompt = `Here is a list of clubs and their descriptions: ${JSON.stringify(filteredClubs)}.\n\nThe user's tags are: ${JSON.stringify(filters)}.\n\nBased on the user's tags, please recommend the top 5 clubs that are the best match for them. Please select the most general clubs based on the given information`;
    const recommendations = await getRecommendations(prompt);

    console.log(recommendations);
}

main()