// ======================= DOMContentLoaded Wrapper =======================
document.addEventListener('DOMContentLoaded', () => {

    // ======================= Login Form Handler =======================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
         loginForm.addEventListener('submit', (e) => {
             e.preventDefault();
             const username = document.getElementById('username').value;
             if (username) {
                 alert(`Login attempt for: ${username}. Simulating successful login...`);
                 // Simulate navigation by changing page location
                 window.location.href = 'index.html'; // Redirect to index.html
             } else {
                 alert('Please enter username and password.');
             }
         });
    }

    // Placeholder handler for '#' links (optional, can be removed if no '#' links remain)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHref = link.getAttribute('href');
            if (targetHref === '#') {
                 e.preventDefault();
                 alert(`Navigating to ${link.textContent.trim()} (Placeholder - Not Implemented)`);
            }
            // Allow normal navigation for .html links
        });
    });


    // ================== Gym Subscription Form Handler ==================
     const gymForm = document.getElementById('gym-subscription-form');
     if (gymForm) {
        handleGymSubscriptionForm(gymForm);
     }

    // ================== Locker Rental Form Handler ===================
     const lockerForm = document.getElementById('locker-rental-form');
     if (lockerForm) {
        handleLockerRentalForm(lockerForm);
     }

     // ================== Student Clubs Handler ========================
     // Ensure the correct ID is used if the outer div ID was changed
     const clubsPage = document.getElementById('student-clubs-page');
     if (clubsPage) {
         handleStudentClubsPage(clubsPage); // Pass the container
     }

}); // End of DOMContentLoaded

// ======================= Function for Gym Subscription Form =======================
function handleGymSubscriptionForm(form) {
    const paymentButton = form.querySelector('#proceed-payment-btn');
    const planRadios = form.querySelectorAll('input[name="gym_plan"]');
    const gymPage = document.getElementById('gym-subscription-page'); // Get page container

    planRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            paymentButton.disabled = !form.querySelector('input[name="gym_plan"]:checked');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedPlan = form.querySelector('input[name="gym_plan"]:checked');
        if (selectedPlan) {
            const planValue = selectedPlan.value;
            const planText = selectedPlan.closest('.plan-option').querySelector('h4').textContent;
            alert(`Proceeding to payment for plan: ${planText} (${planValue})`);
            paymentButton.textContent = 'Processing...';
            paymentButton.disabled = true;
            setTimeout(() => {
                alert('Payment Successful! Subscription Activated.');
                paymentButton.textContent = 'Proceed to Payment';
                if (gymPage) { // Check if gymPage exists before querying inside it
                    const statusElement = gymPage.querySelector('#gym-status .status-value');
                    const expiresElement = gymPage.querySelector('#gym-expires .status-value');
                    if (statusElement) statusElement.textContent = 'Active';
                    if (expiresElement) {
                        const now = new Date(); let expiryDate = new Date();
                        if (planValue.includes('semester')) expiryDate.setMonth(now.getMonth() + 4);
                        else if (planValue.includes('year')) expiryDate.setFullYear(now.getFullYear() + 1);
                        expiresElement.textContent = expiryDate.toISOString().split('T')[0];
                    }
                }
                 selectedPlan.checked = false;
                 paymentButton.disabled = true;
            }, 1500);
        } else { alert('Please select a subscription plan.'); }
    });
}

// ======================= Function for Locker Rental Form =======================
function handleLockerRentalForm(form) {
    const paymentButton = form.querySelector('#proceed-locker-payment-btn');
    const periodSelect = form.querySelector('#rental-period');
    const lockerRadios = form.querySelectorAll('input[name="locker_selection"]');
    const locationFilter = form.querySelector('#locker-location');
    const sizeFilter = form.querySelector('#locker-size');
    const allLockerOptions = form.querySelectorAll('.locker-option');
    const lockerPage = document.getElementById('locker-rental-page'); // Get page container

    function updateButtonAndPeriodState() {
        const selectedLocker = form.querySelector('input[name="locker_selection"]:checked');
        paymentButton.disabled = !selectedLocker;
        periodSelect.disabled = !selectedLocker;
    }

    function filterLockers() {
        const selectedLocation = locationFilter.value;
        const selectedSize = sizeFilter.value;

        allLockerOptions.forEach(locker => {
            const matchesLocation = selectedLocation === 'all' || locker.dataset.location === selectedLocation;
            const matchesSize = selectedSize === 'all' || locker.dataset.size === selectedSize;

            if (matchesLocation && matchesSize) {
                locker.classList.remove('hidden');
            } else {
                locker.classList.add('hidden');
                 // If a hidden locker was selected, unselect it
                 const radio = locker.querySelector('input[type="radio"]');
                 if (radio && radio.checked) {
                     radio.checked = false;
                     updateButtonAndPeriodState(); // Update button state if selection changes
                 }
            }
        });
    }

    // Event listeners for radio buttons
    lockerRadios.forEach(radio => {
        radio.addEventListener('change', updateButtonAndPeriodState);
    });

    // Event listeners for filters
    locationFilter.addEventListener('change', filterLockers);
    sizeFilter.addEventListener('change', filterLockers);

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedLocker = form.querySelector('input[name="locker_selection"]:checked');
        if (selectedLocker) {
            const lockerValue = selectedLocker.value;
            const lockerText = selectedLocker.closest('.locker-option').querySelector('h4').textContent;
            const period = periodSelect.value;
            alert(`Proceeding to payment for ${lockerText} (${lockerValue}) for ${period} period.`);
            paymentButton.textContent = 'Processing...';
            paymentButton.disabled = true;
            periodSelect.disabled = true;
            setTimeout(() => {
                alert('Payment Successful! Locker Rented.');
                paymentButton.textContent = 'Proceed to Payment';
                 if (lockerPage) { // Check if page exists
                    const statusElement = lockerPage.querySelector('#locker-status .status-value');
                    const expiresElement = lockerPage.querySelector('#locker-expires .status-value');
                    if (statusElement) statusElement.textContent = lockerText; // Show rented locker ID
                    if (expiresElement) {
                        // Calculate expiry based on period
                         const now = new Date(); let expiryDate = new Date();
                         if (period === 'semester') expiryDate.setMonth(now.getMonth() + 4);
                         else if (period === 'full_year') expiryDate.setFullYear(now.getFullYear() + 1);
                         expiresElement.textContent = expiryDate.toISOString().split('T')[0];
                    }
                 }
                 selectedLocker.checked = false; // Uncheck after processing
                 paymentButton.disabled = true; // Ensure button stays disabled
                 periodSelect.disabled = true;  // Ensure period stays disabled
                 // Optionally: Hide the rented locker card
                 selectedLocker.closest('.locker-option').classList.add('hidden');
            }, 1500);
        } else {
            alert('Please select a locker.');
        }
    });

    // Initial filter call in case defaults are set
    filterLockers();
    updateButtonAndPeriodState(); // Ensure initial button state is correct
}

// ======================= Function for Student Clubs Page =======================
// Pass the specific page element to scope the queries
function handleStudentClubsPage(pageElement) {
    const searchInput = pageElement.querySelector('#club-search');
    const categoryFilter = pageElement.querySelector('#club-category');
    const allClubCards = pageElement.querySelectorAll('.club-card');
    const clubsContainer = pageElement.querySelector('.clubs-container'); // Needed for event delegation

    function filterClubs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        allClubCards.forEach(card => {
            // Ensure dataset properties exist before accessing them
            const clubName = card.dataset.name ? card.dataset.name.toLowerCase() : '';
            const clubCategory = card.dataset.category ? card.dataset.category : '';

            const nameMatch = clubName.includes(searchTerm);
            const categoryMatch = selectedCategory === 'all' || clubCategory === selectedCategory;

            if (nameMatch && categoryMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden'); // Add hidden class if no match
            }
        });
    }

    // Event listeners for filters
    searchInput.addEventListener('input', filterClubs); // Use 'input' for real-time filtering
    categoryFilter.addEventListener('change', filterClubs);

    // Event listener for "View Details" buttons using event delegation
    clubsContainer.addEventListener('click', (e) => {
        // Check if the clicked element is the details button
        if (e.target.classList.contains('view-club-details-btn')) {
            const button = e.target;
            const clubId = button.dataset.clubId;
            const clubCard = button.closest('.club-card');
            const clubName = clubCard.querySelector('h4').textContent;

            // Simulate showing details (e.g., in an alert or a modal)
            alert(`Viewing details for ${clubName} (ID: ${clubId}).\nIn a real app, this would show more info or navigate to a club-specific page.`);

            // Placeholder for potential 'Join Club' action simulation
            if (confirm(`Do you want to request to join ${clubName}?`)) {
                alert(`Request submitted to join ${clubName}. Waiting for admin approval.`);
                // Here you would typically make an API call to submit the request
            }
        }
    });


    // Initial filter call
    filterClubs();
} // End of handleStudentClubsPage