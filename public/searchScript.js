/* Toggle the dropdown menu */
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/* Filter the dropdown options based on search input */
function filterFunction() {
  var input, filter, div, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
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

/* Close the dropdown if the user clicks outside of it */
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

document.addEventListener('DOMContentLoaded', () => {
  /* Prevent dropdown from closing when clicking inside the dropdown content */
  document.getElementById("myDropdown").addEventListener('click', function(event) {
      event.stopPropagation();
  });

  /* Form submission handler */
  document.getElementById("majorForm").addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Collect selected majors
      const selectedMajors = [];
      const majorsList = document.getElementById("selectedMajors").getElementsByTagName("li");
      for (let i = 0; i < majorsList.length; i++) {
          selectedMajors.push(majorsList[i].textContent.trim());
      }
      
      // Create JSON object
      const formData = {
          selectedMajors: selectedMajors
      };

      // Convert object to JSON string
      const jsonData = JSON.stringify(formData, null, 2);
      
      // Log JSON data (you can modify this to send the JSON data to a server, save it, etc.)
      console.log(jsonData);
  });
});
