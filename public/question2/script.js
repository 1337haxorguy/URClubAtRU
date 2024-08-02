document.addEventListener('DOMContentLoaded', function() {
    const selectButton = document.querySelector('.dropdown');
    const frameDiv = document.querySelector('.frame-div');
    const arrowIcon = document.querySelector('.uiwdown-icon');
    const inputField = document.getElementById('myInput');
    const forwardArrow = document.getElementById('forwardArrow');
    const hiddenInput = document.getElementById('hiddenInput');


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
            const major = wrapper.querySelector('.accounting').textContent.trim();
            
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
            inputField.placeholder = "Select";
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
        event.stopPropagation();
        toggleDropdown();
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

    updateReadOnlyState();
});

