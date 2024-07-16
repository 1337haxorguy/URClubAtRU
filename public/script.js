document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const clubList = document.getElementById('club-list');
    const recommendationsDiv = document.getElementById('recommendations');
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loading-message';
    loadingMessage.innerText = 'Please wait...';
    loadingMessage.style.display = 'none'; // Initially hidden
    document.body.appendChild(loadingMessage);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        loadingMessage.style.display = 'block';

        // Collect selected majors
        const selectedMajors = [];
        const majorsList = document.getElementById("selectedMajors").getElementsByTagName("li");
        for (let i = 0; i < majorsList.length; i++) {
            selectedMajors.push(majorsList[i].textContent.trim());
        }
        
        // Retrieve form data
        const formData = {
            major: selectedMajors,
            career: document.getElementById('career-path').value,
            ethnicity: document.getElementById('ethnicity').value,
            sexualOrientation: document.getElementById('sexual-orientation').value,
            gender: document.getElementById('gender-select').value,
            socialPreference: document.getElementById('social-preference').value,
            hobby: document.getElementById('hobby').value,
            sports: document.getElementById('sports').value,
            performingArts: document.getElementById('performing-arts').value,
            recreationalInterests: document.getElementById('recreational-interests').value,
            greekLife: document.getElementById('greek-life').value,
            politicalAffiliation: document.getElementById('political-affiliation').value,
            causes: document.getElementById('causes').value,
            specialHousing: document.getElementById('special-housing').value
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
        loadingMessage.style.display = 'none';

        console.log(data.filteredClubs)

        // Display the clubs
        clubList.innerHTML = '';
        data.filteredClubs.forEach(club => {
            const clubItem = document.createElement('div');
            clubItem.innerHTML = `<h2>${club.name}</h2><p>${club.description}</p>`;
            clubList.appendChild(clubItem);
        });

        // Display the recommendations
        recommendationsDiv.innerHTML = '<h2>Recommendations</h2><ul>';
        data.recommendations.split('\n').forEach(recommendation => {
            recommendationsDiv.innerHTML += `<li>${recommendation}</li>`;
        });
        recommendationsDiv.innerHTML += '</ul>';
        console.log(formData);
    });  
});

function toggleDropdown(dropdownType) {
    const dropdown = document.getElementById(dropdownType);
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
}

function filterFunction(majorsDropdown) {
    var input, filter, div, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById(majorsDropdown);
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/* Add selected major to the list */
function addMajor(event, major) {
    event.preventDefault();
    const ul = document.getElementById("selectedMajors");

    // Check if major already exists in the list
    if (Array.from(ul.getElementsByTagName("li")).some(li => li.textContent.trim() === major)) {
        return; // Prevent adding duplicate majors
    }

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(major));
    li.addEventListener('click', () => {
        li.remove();
        toggleDropdown(); // Close dropdown when removing major from list
    });
    ul.appendChild(li);

    toggleDropdown(); // Close dropdown when adding major to list
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#myInput')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
