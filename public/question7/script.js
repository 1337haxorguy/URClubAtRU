document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'selected' class from all buttons
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('selected'));
        
        // Add 'selected' class to the clicked button
        this.classList.add('selected');
        
        // Save the year in local storage
        const year = this.getAttribute('vert');
        localStorage.setItem('verted?', year );
        
        // Log the saved year for testing purposes
        console.log('Verted', year);
        
    });
});

function skip() {
    location.href = "/question8"
    localStorage.setItem('verted?',"none")
}
