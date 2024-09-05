document.addEventListener('DOMContentLoaded', function() {
    const selectButton = document.querySelector('.dropdown');
    const frameDiv = document.querySelector('.frame-div');
    const arrowIcon = document.querySelector('.uiwdown-icon');
    const inputField = document.getElementById('myInput');
    const forwardArrow = document.getElementById('forwardArrow');
    const hiddenInput = document.getElementById('hiddenInput');

        const majors = [ 'Accounting',
        'Actuarial Mathematics', 'Aerospace Engineering', 'African, Middle Eastern, and South Asian Languages and Literatures',
        'Africana Studies', 'Agriculture and Food Systems', 'American Studies', 'Animal Science', 'Anthropology, Cultural',
        'Anthropology, Evolutionary', 'Applied Sciences in Engineering', 'Art', 'Art History', 'Asian Studies',
        'Astrophysics', 'Biochemistry', 'Biological Sciences', 'Biomathematics', 'Biomedical Engineering', 'Biotechnology',
        'Business Analytics and Information Technology', 'Cell Biology and Neuroscience', 'Chemical Engineering', 'Chemistry',
        'Chinese', 'Cinema Studies', 'Civil Engineering', 'Classics', 'Cognitive Science', 'Communication', 'Comparative Literature',
        'Computer Science', 'Criminal Justice', 'Dance', 'Data Science', 'Design',  'Digital Filmmaking', 'Ecology, Evolution, and Natural Resources',
        'Economics', 'Electrical and Computer Engineering', 'English', 'Entomology', 'Environmental and Business Economics',
        'Environmental Engineering', 'Environmental Planning', 'Environmental Policy, Institutions, and Behavior',
        'Environmental Sciences', 'Environmental Studies (available as a second major only)', 'European Studies', 'Exercise Science',
        'Finance', 'Food Science', 'French', 'Genetics', 'Geography', 'Geological Sciences', 'German', 'Global Humanities',
        'Health Administration', 'History', 'History/French', 'History/Political Science', 'Human Resource Management',
        'Industrial Engineering', 'Information Technology and Informatics', 'Italian', 'Italian Studies', 'Jewish Studies',
        'Journalism and Media Studies', 'Korean', 'Labor and Employment Relations', 'Labor Studies and Employment Relations',
        'Landscape Architecture', 'Latin American Studies', 'Latino and Caribbean Studies', 'Linguistics',
        'Management and Global Business', 'Marine Sciences', 'Marketing', 'Materials Science and Engineering', 'Mathematics',
        'Mechanical Engineering', 'Medieval Studies', 'Meteorology', 'Microbiology', 'Middle Eastern Studies',
        'Molecular Biology and Biochemistry', 'Music', 'Nursing', 'Nutritional Sciences', 'Pharmacy', 'Philosophy', 'Physics',
        'Planning and Public Policy', 'Plant Biology', 'Political Science', 'Portuguese', 'Psychology', 'Public Health',
        'Public Policy', 'Religion', 'Russian', 'Social Work', 'Sociology', 'Spanish', 'Sport Management',
        'Statistics and Biostatistics', 'Statistics/Mathematics', 'Supply Chain Management', 'Theater Arts',
        'Urban Planning and Design', 'Visual Arts', 'Women\'s, Gender, and Sexuality Studies'
    ];

    const container = document.getElementById('majors-container');
    container.innerHTML = majors.map(major => `
        <div class="frame-wrapper1">
            <div class="Bruh">${major}</div>
            <div class="checkbox">
                <img class="checkmark" alt="Checkmark" src="../assets/img/tabler_check.svg">
            </div>
        </div>
    `).join('');



    // Array to store selected majors
    let selectedMajors = [];

    function updateReadOnlyState() {
        if (frameDiv.classList.contains('hidden')) {
            inputField.setAttribute('readonly', true);
        } else {
            inputField.removeAttribute('readonly');
        }
    }

    document.querySelectorAll('.frame-wrapper1').forEach(wrapper => {
        wrapper.addEventListener('click', (event) => {
            // Prevent the click from toggling the checkbox multiple times
            event.stopPropagation();
            
            const checkbox = wrapper.querySelector('.checkmark');
            const major = wrapper.querySelector('.Bruh').textContent.trim();
            
            if (checkbox) {
                if (checkbox.classList.contains('selected')) {
                    checkbox.classList.remove('selected');
                    wrapper.classList.remove('selected');

                    console.log("selected removed");
                    // Remove major from the array
                    selectedMajors = selectedMajors.filter(item => item !== major);
                } else {
                    checkbox.classList.add('selected');
                    wrapper.classList.add('selected');

                    console.log("selected added");
                    // Add major to the array
                    selectedMajors.push(major);
                }
                console.log("Selected Majors:", selectedMajors);
            }
        });
    });
            
    function toggleDropdown() {
        frameDiv.classList.toggle('hidden');
        arrowIcon.classList.toggle('rotated');
        if (!frameDiv.classList.contains('hidden')) {
            inputField.placeholder = "Search";

            // Show hidden input, focus it, and then hide it again
            hiddenInput.style.visibility = 'visible';
            hiddenInput.focus();
            setTimeout(() => {
                hiddenInput.style.visibility = 'hidden';
                inputField.focus(); // Focus back to original input
            }, 100); // Adjust delay as needed
        } else {
            if (selectedMajors.length > 0) {
                inputField.placeholder = selectedMajors.join(', ');
            } else {
                inputField.placeholder = "Select";
            }
            inputField.value = "";
            }
        updateReadOnlyState();
    }

    // Function to filter items
    function filterFunction() {
        if (inputField.placeholder === 'Search') {
            const filter = inputField.value.toUpperCase();
            const items = frameDiv.getElementsByClassName('frame-wrapper1');
            for (let i = 0; i < items.length; i++) {
                const txtValue = items[i].textContent || items[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    items[i].style.display = "";
                } else {
                    items[i].style.display = "none";
                }
            }
        }
    }

    // Function to save selected majors to local storage
    function saveSelectedMajors() {
        // Create a new array to store the final selection
        let finalSelection = [];
    
        // Add all selected items from the predefined list, ensuring they're not empty
        selectedMajors.forEach(sport => {
            if (sport.trim() !== "") {
                finalSelection.push(sport.trim());
            }
        });
    
        // Save the array to localStorage
        localStorage.setItem('major', JSON.stringify(finalSelection));
        console.log("Majors:", finalSelection);
    }

    // Event listeners
    selectButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from propagating to the document
        
        // Only toggle the dropdown if it is currently hidden
        if (frameDiv.classList.contains('hidden')) {
            toggleDropdown();
        }
    });
    inputField.addEventListener('input', function() {
        filterFunction();
    });

    forwardArrow.addEventListener('click', function() {
        saveSelectedMajors();
    });

    document.addEventListener('click', function(event) {
        if (!selectButton.contains(event.target) && !frameDiv.contains(event.target)) {
            if (!frameDiv.classList.contains('hidden')) {
                toggleDropdown();
            }
        }
    });

    arrowIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown();
    });

    updateReadOnlyState();
});

