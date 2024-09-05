// document.addEventListener('DOMContentLoaded', function() {
//     // Retrieve the recommendations data from localStorage
//     const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

//     // Function to parse recommendations
//     function parseRecommendations(recommendations) {
//         const parsedClubs = [];
//         for (let i = 0; i < recommendations.length; i += 3) {
//             parsedClubs.push({
//                 name: recommendations[i].replace(/^\d+\.\s*\**|\**\s*$/g, '').trim(),
//                 description: recommendations[i + 1]?.trim() || "No description available.",
//                 reasons: recommendations[i + 2]?.trim() || "No specific reasons provided."
//             });
//         }
//         return parsedClubs;
//     }

//     // Parse the recommendations
//     const parsedClubs = parseRecommendations(recommendations);

//     // Get the first recommendation
//     const topClub = parsedClubs[0];

//     // Update the HTML with the club information
//     if (topClub) {
//         const insertClubTitle = document.querySelector('.insert-club-title');
//         const loremIpsumDolor = document.querySelector('.lorem-ipsum-dolor');

//         if (insertClubTitle) {
//             insertClubTitle.textContent = topClub.name;
//         }

//         if (loremIpsumDolor) {
//             loremIpsumDolor.textContent = topClub.description;
//         }
//     }
// });
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

    const club1 = parsedClubs.hobby[0] || {};
    const club2 = parsedClubs.hobby[1] || {};

    const insertClubTitle1 = document.querySelector('.insert-club-title-1');
    const loremIpsumDolor1 = document.querySelector('.lorem-ipsum-dolor-1');
    const insertClubTitle2 = document.querySelector('.insert-club-title-2');
    const loremIpsumDolor2 = document.querySelector('.lorem-ipsum-dolor-2');

    if (insertClubTitle1) {
        insertClubTitle1.textContent = club1.name || '[Insert club title here]';
    }

    if (loremIpsumDolor1) {
        loremIpsumDolor1.textContent = club1.description || '[Insert club description here]';
    }

    if (club2.name) {
        if (insertClubTitle2) {
            insertClubTitle2.textContent = club2.name;
        }

        if (loremIpsumDolor2) {
            loremIpsumDolor2.textContent = club2.description;
        }
    } else {
        if (insertClubTitle2 && loremIpsumDolor2) {
            insertClubTitle2.style.display = 'none';
            loremIpsumDolor2.style.display = 'none';
        }

        // Increase font size for the first club
        if (insertClubTitle1) {
            insertClubTitle1.style.fontSize = '40px';
            insertClubTitle1.style.lineHeight = '47px';
        }

        if (loremIpsumDolor1) {
            loremIpsumDolor1.style.fontSize = '20px';
            loremIpsumDolor1.style.lineHeight = '29px';
        }
    }

    // Log the parsed clubs for debugging
    console.log('Cultural Clubs:', parsedClubs.cultural);

    function nextButton() {
        // Navigate to the first non-empty club category in priority order
    
        // Check for non-empty Cultural clubs first
         if (parsedClubs.other.length > 0 
            && !parsedClubs.other[0].name.toLowerCase().includes('none')
            && !/\bno\b/.test(parsedClubs.other[0].name.toLowerCase())
            && !parsedClubs.other[0].name.toLowerCase().includes('unfortunately')) {
                location.href = '/answer4'; // Go to Other Clubs
    
        // If all are empty, go to final results or handle differently
        } else {
            location.href = '/answers'; // Final results or other logic
        }
    }

    
    document.getElementById('next').addEventListener('click', nextButton);

});
