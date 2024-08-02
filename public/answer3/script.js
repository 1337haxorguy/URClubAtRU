document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the recommendations data from localStorage
    const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

    // Function to parse recommendations
    function parseRecommendations(recommendations) {
        const parsedClubs = [];
        for (let i = 0; i < recommendations.length; i += 3) {
            parsedClubs.push({
                name: recommendations[i].replace(/^\d+\.\s*\*\*|\*\*\s*$/g, '').trim(),
                description: recommendations[i + 1]?.trim() || "No description available.",
                reasons: recommendations[i + 2]?.trim() || "No specific reasons provided."
            });
        }
        return parsedClubs;
    }

    // Parse the recommendations
    const parsedClubs = parseRecommendations(recommendations);

    // Get the first recommendation
    const topClub = parsedClubs[1];

    // Update the HTML with the club information
    if (topClub) {
        const insertClubTitle = document.querySelector('.insert-club-title');
        const loremIpsumDolor = document.querySelector('.lorem-ipsum-dolor');

        if (insertClubTitle) {
            insertClubTitle.textContent = topClub.name;
        }

        if (loremIpsumDolor) {
            loremIpsumDolor.textContent = topClub.description;
        }
    }
});
