document.addEventListener('DOMContentLoaded', () => {
    const activityForm = document.getElementById('activityForm');
    const activitiesContainer = document.getElementById('activitiesContainer');
    const noActivitiesMessage = document.getElementById('noActivitiesMessage');

    let activities = JSON.parse(localStorage.getItem('fitnessActivities')) || [];

    // Function to save activities to Local Storage
    function saveActivities() {
        localStorage.setItem('fitnessActivities', JSON.stringify(activities));
    }

    // Function to display activities
    function displayActivities() {
        activitiesContainer.innerHTML = ''; // Clear existing activities

        if (activities.length === 0) {
            noActivitiesMessage.style.display = 'block';
        } else {
            noActivitiesMessage.style.display = 'none';
            activities.forEach((activity, index) => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('activity-card');

                activityCard.innerHTML = `
                    <div class="activity-detail">
                        <p class="activity-type">${activity.type}</p>
                        <p>Duration: ${activity.duration} mins</p>
                    </div>
                    <div class="activity-detail">
                        <p>Calories: ${activity.calories || 'N/A'}</p>
                        <p>Notes: ${activity.notes || 'No notes'}</p>
                    </div>
                    <p class="activity-date">Logged on: ${new Date(activity.date).toLocaleString()}</p>
                    <button data-index="${index}">Delete</button>
                `;
                activitiesContainer.appendChild(activityCard);
            });
        }
    }

    // Handle form submission
    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const activityType = document.getElementById('activityType').value;
        const duration = parseInt(document.getElementById('duration').value);
        const calories = parseInt(document.getElementById('calories').value) || null; // Use null if empty
        const notes = document.getElementById('notes').value.trim();

        if (!activityType || !duration) {
            alert('Please fill in at least the activity type and duration.');
            return;
        }

        const newActivity = {
            id: Date.now(), // Simple unique ID
            type: activityType,
            duration: duration,
            calories: calories,
            notes: notes,
            date: new Date().toISOString()
        };

        activities.push(newActivity);
        saveActivities();
        displayActivities();
        activityForm.reset(); // Clear the form
    });

    // Handle deleting an activity
    activitiesContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
            const indexToDelete = parseInt(e.target.dataset.index);
            if (confirm('Are you sure you want to delete this activity?')) {
                activities.splice(indexToDelete, 1);
                saveActivities();
                displayActivities(); // Re-render the list
            }
        }
    });

    // Initial display of activities when the page loads
    displayActivities();
});
