document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const clubList = document.getElementById('club-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Retrieve form data
        const formData = {
            major: document.getElementById('major-select').value,
            gender: document.getElementById('gender-select').value,
            ethnicity: document.getElementById('ethnicity').value,
            hobby: document.getElementById('hobby').value,
        };

        // Send form data to the server
        const response = await fetch('/filter-clubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // Display the clubs
        clubList.innerHTML = '';
        data.clubs.forEach(club => {
            const clubItem = document.createElement('div');
            clubItem.innerHTML = `<h2>${club.name}</h2><p>${club.description}</p>`;
            clubList.appendChild(clubItem);
        });
    });
});

