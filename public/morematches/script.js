document.addEventListener('DOMContentLoaded', function() {
    // Retrieve filtered clubs from local storage
    const filteredClubs = JSON.parse(localStorage.getItem('filteredClubs')) || [];

    // Get the container where we'll add the club list
    const frameParent = document.querySelector('.frame-parent');

    // Clear existing content
    frameParent.innerHTML = '';

    // Function to create a club element
    function createClubElement(club) {
        const clubElement = document.createElement('div');
        clubElement.className = 'frame-group';
        clubElement.innerHTML = `
            <div class="club-title-lorem-ipsum-blah-wrapper">
                <div class="club-title-lorem">${club.name}</div>
            </div>
            <div class="lorem-ipsum-dolor-sit-amet-co-wrapper">
                <div class="lorem-ipsum-dolor">${club.description}</div>
            </div>
        `;
        return clubElement;
    }

    // Populate the list with clubs
    filteredClubs.forEach(club => {
        const clubElement = createClubElement(club);
        frameParent.appendChild(clubElement);
    });

    // Make the list scrollable if there are more than 5 clubs
    if (filteredClubs.length > 5) {
        frameParent.style.overflowY = 'scroll';
        frameParent.style.maxHeight = '521px'; // Match the height in the CSS
    }
});