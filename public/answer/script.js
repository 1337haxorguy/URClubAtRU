let parsedClubs;

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the recommendations data from localStorage
    const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

    // Function to parse recommendations
    function parseRecommendations(recommendations) {
        const parsedClubs = {
            cultural: [],
            career: [],
            hobby: [],
            other: [],
            topFive: []
        };

        let currentCategory = null;

        recommendations.forEach((item, i) => {
            item = item.trim();

            // Check for category headers
            if (item.endsWith('CLUBS')) {
                currentCategory = item.replace(' CLUBS', '').toLowerCase();
            } else if (item === 'TOP FIVE') {
                currentCategory = 'topFive';
            } else if (/^\d+\./.test(item)) {
                const clubName = item.replace(/^\d+\.\s*\**|\**\s*$/g, '').trim();
                const clubDescription = recommendations[i + 1]?.replace('- **Description:**', '').trim() || "No description available.";
                const reasonsWhy = recommendations[i + 2]?.replace('- **Reasons Why:**', '').trim() || "No specific reasons provided.";

                const club = {
                    name: clubName,
                    description: clubDescription,
                    reasons: reasonsWhy
                };

                if (currentCategory && parsedClubs[currentCategory]) {
                    parsedClubs[currentCategory].push(club);
                }
            }
        });

        return parsedClubs;
    }

    // Parse the recommendations
    const parsedClubs = parseRecommendations(recommendations);

    // Log the parsed clubs for debugging
    console.log('Cultural Clubs:', parsedClubs.cultural);

    function nextButton() {
        // Navigate to the first non-empty club category in priority order
    
        // Check for non-empty Cultural clubs first
        if (parsedClubs.cultural.length > 0 
            && !parsedClubs.cultural[0].name.toLowerCase().includes('none')
            && !parsedClubs.cultural[0].name.toLowerCase().includes('no')

            && !parsedClubs.cultural[0].name.toLowerCase().includes('unfortunately')) {
                location.href = '/answer1'; // Go to Cultural Clubs
    
        // If Cultural is empty, check Career Clubs
        } else if (parsedClubs.career.length > 0 
            && !parsedClubs.career[0].name.toLowerCase().includes('none')
            && !parsedClubs.career[0].name.toLowerCase().includes('no')

            && !parsedClubs.career[0].name.toLowerCase().includes('unfortunately')) {
                location.href = '/answer2'; // Go to Career Clubs
    
        // If both Cultural and Career are empty, check Hobby Clubs
        } else if (parsedClubs.hobby.length > 0 
            && !parsedClubs.hobby[0].name.toLowerCase().includes('none')
            && !parsedClubs.hobby[0].name.toLowerCase().includes('no')

            && !parsedClubs.hobby[0].name.toLowerCase().includes('unfortunately')) {
                location.href = '/answer3'; // Go to Hobby Clubs
    
        // If Cultural, Career, and Hobby are empty, check Other Clubs
        } else if (parsedClubs.other.length > 0 
            && !parsedClubs.other[0].name.toLowerCase().includes('none')
            && !parsedClubs.other[0].name.toLowerCase().includes('no')
            && !parsedClubs.other[0].name.toLowerCase().includes('unfortunately')) {
                location.href = '/answer4'; // Go to Other Clubs
    
        // If all are empty, go to final results or handle differently
        } else {
            location.href = '/answers'; // Final results or other logic
        }
    }
        

    
    document.getElementById('see-my-results').addEventListener('click', nextButton);


});

