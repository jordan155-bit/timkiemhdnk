document.addEventListener("DOMContentLoaded", function() {
    const selectedTags = new Set();
    const filterButton = document.querySelector(".filter-button");
    const filterContent = document.querySelector(".filter-content");
    const searchInput = document.querySelector('.search-input');

    // Hide the filter content initially
    filterContent.style.display = "none";

    // Toggle filter content visibility when the filter button is clicked
    filterButton.addEventListener("click", function() {
        if (filterContent.style.display === "none" || filterContent.style.display === "") {
            filterContent.style.display = "block";
        } else {
            filterContent.style.display = "none";
        }
    });

    // Handle tag button clicks
    document.querySelectorAll('.tag-button').forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            const isTypeCategory = this.closest('.filter-category').querySelector('h4').innerText === 'TYPE';

            if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
                this.classList.remove('active');
            } else {
                if (isTypeCategory) {
                    selectedTags.clear(); // Clear all selected tags in the TYPE category
                }
                selectedTags.add(tag);
                this.classList.add('active');
            }

            filterActivities();
        });
    });

    // Reset button functionality
    document.querySelector('.reset-button').addEventListener('click', function() {
        selectedTags.clear();
        document.querySelectorAll('.tag-button').forEach(button => {
            button.classList.remove('active');
        });
        filterActivities();
    });

    // Filter activities based on selected tags and search query
    function filterActivities() {
        const activities = document.querySelectorAll('.activity');
        const searchQuery = searchInput.value.toLowerCase();

        activities.forEach(activity => {
            const activityTags = activity.getAttribute('data-tags').split(', ');
            const activityName = activity.querySelector('h3').innerText.toLowerCase();

            const matchesTags = [...selectedTags].every(tag => activityTags.includes(tag));
            const matchesSearch = activityName.includes(searchQuery);

            activity.style.display = matchesTags && matchesSearch ? 'block' : 'none';
        });
    }

    // Initially show all activities
    filterActivities();

    // Add event listener to the search bar
    searchInput.addEventListener('input', filterActivities);
});
