document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'selected' class from all buttons
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('selected'));
        
        // Add 'selected' class to the clicked button
        this.classList.add('selected');
        
        // Save the year in local storage
        const year = this.getAttribute('data-year');
        localStorage.setItem('userYear', JSON.stringify({ year }));
        
        // Log the saved year for testing purposes
        console.log('Saved year:', year);
        
    });
});
