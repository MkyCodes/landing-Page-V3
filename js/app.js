/**
 * Define Global Variables
 */
const navMenu = document.getElementById('main-nav-list'); // Navigation list element
const pageSections = document.querySelectorAll('section'); // All section elements
const navLinks = document.querySelectorAll('.nav-links a'); // All nav links

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * Creates the navigation items dynamically based on sections.
 * Adds them to the navbar.
 */
const generateNavMenu = () => {
    if (!navMenu) return; // Prevents errors if navMenu is null

    let navHTML = ''; // This will hold the dynamically created list items
    pageSections.forEach(section => {
        const sectionId = section.id; // The ID of the section
        const sectionLabel = section.dataset.nav; // The label for the section from data-nav attribute

        // Create a new list item with an anchor for each section
        navHTML += `<li><a class="nav-link" href="#${sectionId}">${sectionLabel}</a></li>`;
    });
    navMenu.innerHTML = navHTML; // Insert the generated list items into the <ul>
};

/**
 * Calculates the offset for each section to determine visibility.
 */
const getSectionOffset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

/**
 * Removes the active class and styling from a section and nav link.
 */
const deactivateSection = (section) => {
    section.classList.remove('active-section');
    section.style.cssText = "background-color: rgba(255,255,255,.1);";
    
    // Remove active class from corresponding nav link
    const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
    if (correspondingLink) {
        correspondingLink.classList.remove('active-link');
    }
};

/**
 * Adds the active class and styling to a section and nav link.
 */
const activateSection = (condition, section) => {
    if (condition) {
        section.classList.add('active-section');
        section.style.cssText = "background-color: rgba(255,255,0,.3);";
        
        // Add active class to corresponding nav link
        const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('active-link');
        }
    }
};

/**
 * Controls the activation of sections when in the viewport.
 */
const monitorSectionActivation = () => {
    pageSections.forEach(section => {
        const sectionOffset = getSectionOffset(section);
        const isInViewport = sectionOffset < 150 && sectionOffset >= -150;

        deactivateSection(section);
        activateSection(isInViewport, section);
    });
};

/**
 * Scroll to the respective section when a nav link is clicked.
 */
const enableSmoothScrolling = () => {
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Close the navigation menu when clicked (for mobile)
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
};

/**
 * Begin Events
 */
document.addEventListener('DOMContentLoaded', function() {
    generateNavMenu(); // Dynamically generate the navigation menu
    enableSmoothScrolling(); // Enable smooth scrolling on nav links
    window.addEventListener('scroll', monitorSectionActivation); // Monitor sections visibility
});
