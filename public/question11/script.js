document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'selected' class from all buttons
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('selected'));
        
        // Add 'selected' class to the clicked button
        this.classList.add('selected');
        
        // Save the year in local storage
        const year = this.getAttribute('greek-life');
        localStorage.setItem('WantsGreekLife', year );
        
        // Log the saved year for testing purposes
        
    });
});

function skip() {
    location.href = "/question12"
    localStorage.setItem('WantsGreekLife',"none")
}