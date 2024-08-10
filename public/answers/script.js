document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the recommendations data from localStorage

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
    
        const club1 = parsedClubs.topFive[0] || {};
        const club2 = parsedClubs.topFive[1] || {};
    
        // const insertClubTitle1 = document.querySelector('.insert-club-title-1');
        // const loremIpsumDolor1 = document.querySelector('.lorem-ipsum-dolor-1');
        // const insertClubTitle2 = document.querySelector('.insert-club-title-2');
        // const loremIpsumDolor2 = document.querySelector('.lorem-ipsum-dolor-2');
    
        // if (insertClubTitle1) {
        //     insertClubTitle1.textContent = club1.name || '[Insert club title here]';
        // }
    
        // if (loremIpsumDolor1) {
        //     loremIpsumDolor1.textContent = club1.description || '[Insert club description here]';
        // }
    
        // if (club2.name) {
        //     if (insertClubTitle2) {
        //         insertClubTitle2.textContent = club2.name;
        //     }
    
        //     if (loremIpsumDolor2) {
        //         loremIpsumDolor2.textContent = club2.description;
        //     }
        // } else {
        //     if (insertClubTitle2 && loremIpsumDolor2) {
        //         insertClubTitle2.style.display = 'none';
        //         loremIpsumDolor2.style.display = 'none';
        //     }
    
        //     // Increase font size for the first club
        //     if (insertClubTitle1) {
        //         insertClubTitle1.style.fontSize = '40px';
        //         insertClubTitle1.style.lineHeight = '47px';
        //     }
    
        //     if (loremIpsumDolor1) {
        //         loremIpsumDolor1.style.fontSize = '20px';
        //         loremIpsumDolor1.style.lineHeight = '29px';
        //     }
        // }
    
        // // Log the parsed clubs for debugging
        // console.log('Cultural Clubs:', parsedClubs.cultural);
    
    

    // Function to parse club names starting from the second "1. " occurrence
    function parseClubNames(recommendations) {
        const clubNames = [];
        let startIndex = -1;
        let foundFirst = false;

        // Find the second occurrence of "1. " to start parsing clubs
        recommendations.forEach((item, index) => {
            if (typeof item === 'string' && item.trim().startsWith('1. ')) {
                if (foundFirst) {
                    startIndex = index;
                    return;
                } else {
                    foundFirst = true;
                }
            }
        });

        console.log('Start Index:', startIndex); // Debugging

        // If the second "1. " was found, parse the club names
        if (startIndex !== -1) {
            for (let i = startIndex; i < recommendations.length; i++) {
                const item = recommendations[i].trim();
                if (item && /^\d+\.\s/.test(item)) {
                    // Remove the numbering and trim the name
                    const name = item.replace(/^\d+\.\s*/, '').trim();
                    clubNames.push(name);
                } else if (/^\d+\.\s/.test(item) === false && item.length > 0) {
                    // Stop parsing if we reach a non-club item
                    break;
                }
            }
        }

        return clubNames;
    }

    // Parse the club names
    const clubNames = parseClubNames(recommendations);

    parsedClubs.topFive.forEach((club, index) => {
        const clubTitleElement = document.querySelectorAll('.creative-x')[index];
        if (clubTitleElement) {
            clubTitleElement.textContent = club.name;
        } else {
            console.warn(`Element for club index ${index} not found.`);
        }
    });
});
