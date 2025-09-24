// Handle search and reset functionality for the navigation search bar

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetBtn');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            // Implement your search logic here
            alert('Searching for: ' + query);
        }
    });

    resetBtn.addEventListener('click', function() {
        searchInput.value = '';
        // Optionally, reset search results here
    });
});
