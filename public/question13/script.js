document.addEventListener('DOMContentLoaded', function() {
    const selectButton = document.querySelector('.dropdown');
    const frameDiv = document.querySelector('.frame-div');
    const arrowIcon = document.querySelector('.uiwdown-icon');
    const inputField = document.getElementById('myInput');
    const forwardArrow = document.getElementById('forwardArrow');
    const skipButton = document.getElementById('skip');
    const dropdowns = document.querySelectorAll('.frame-wrapper1');
    const otherInput = document.getElementById('Other'); // "Other" input field
    const otherWrapper = otherInput.parentElement; // Parent element of "Other" input
    const hiddenInput = document.getElementById('hiddenInput');


    // Array to store selected minors
    let selectedMinors = [];

    // Function to toggle readonly state based on placeholder
    function updateReadOnlyState() {
        if (inputField.placeholder === 'Select') {
            inputField.setAttribute('readonly', true);
        } else {
            inputField.removeAttribute('readonly');
        }
    }

    dropdowns.forEach(wrapper => {
        wrapper.addEventListener('click', (event) => {
            // Prevent the click from toggling the checkbox multiple times
            event.stopPropagation();

            const checkbox = wrapper.querySelector('.checkmark');
            const major = wrapper.querySelector('.accounting').textContent.trim();

            if (checkbox) {
                if (checkbox.classList.contains('selected')) {
                    checkbox.classList.remove('selected');
                    wrapper.classList.remove('selected');

                    // Remove major from the array
                    selectedMinors = selectedMinors.filter(item => item !== major);
                } else {
                    checkbox.classList.add('selected');
                    wrapper.classList.add('selected');

                    // Add major to the array
                    selectedMinors.push(major);
                }
                console.log("Causes Passionate About:", selectedMinors);
            }
        });
    });

    // Function to toggle dropdown visibility
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
                // Always show the "Other" box regardless of the filter
                if (txtValue.toUpperCase().indexOf(filter) > -1 || items[i].querySelector('#Other')) {
                    items[i].style.display = "";
                } else {
                    items[i].style.display = "none";
                }
            }
        }
    }

    // Function to save selected minors to local storage
    function saveSelectedMinors() {
        // Create a new array to store the final selection
        let finalSelection = [];
    
        // Add all selected items from the predefined list, ensuring they're not empty
        selectedMinors.forEach(sport => {
            if (sport.trim() !== "") {
                finalSelection.push(sport.trim());
            }
        });
    
        // Check if the "Other" input field was selected
        const isOtherSelected = otherWrapper.querySelector('.checkmark') && otherWrapper.querySelector('.checkmark').classList.contains('selected');
        
        // Add "Other" value to the finalSelection array only if it's not empty and if the "Other" input is selected
        const otherValue = otherInput.value.trim();
        if (isOtherSelected && otherValue !== "") {
            finalSelection.push(otherValue);
        }
    
        // Save the array to localStorage
        localStorage.setItem('causesPassionateAbout', JSON.stringify(finalSelection));
        console.log("Causes:", finalSelection);
    }

    // Event listeners
    selectButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from propagating to the document
        toggleDropdown();
    });

    inputField.addEventListener('input', function() {
        filterFunction();
    });

    forwardArrow.addEventListener('click', function() {
        saveSelectedMinors();
        // You can also redirect to the next page here if needed
        // location.href = '/question1';
    });

    // Initial check to ensure read-only state is set correctly
    updateReadOnlyState();

    function hideSkipButton() {
        skipButton.classList.add('hidden');
    }

    function showSkipButton() {
        skipButton.classList.remove('hidden');
    }
});

function skip() {
    location.href = "/loading"
    localStorage.setItem('causesPassionateAbout',"none")
}