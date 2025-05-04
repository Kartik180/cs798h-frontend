document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const courseCardsContainer = document.getElementById('course-cards');
    const courseDetailSection = document.getElementById('course-detail');
    const coursesContainer = document.getElementById('courses-container');
    const courseTitle = document.getElementById('course-title');
    const courseInstructor = document.getElementById('course-instructor');
    const courseDescription = document.getElementById('course-description');
    const resourcesList = document.getElementById('resources-list');
    const backBtn = document.getElementById('back-btn');
    
    // Modals
    const addCourseBtn = document.getElementById('add-course-btn');
    const addCourseModal = document.getElementById('add-course-modal');
    const addResourceBtn = document.getElementById('add-resource-btn');
    const addResourceModal = document.getElementById('add-resource-modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Forms
    const addCourseForm = document.getElementById('add-course-form');
    const addResourceForm = document.getElementById('add-resource-form');
    const courseIdInput = document.getElementById('courseId');
    
    // Current course ID (for adding resources)
    let currentCourseId = null;
    
    // Fetch all courses when the page loads
    fetchCourses();
    
    // Event Listeners
    addCourseBtn.addEventListener('click', () => {
        addCourseModal.style.display = 'block';
    });
    
    addResourceBtn.addEventListener('click', () => {
        courseIdInput.value = currentCourseId;
        addResourceModal.style.display = 'block';
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addCourseModal.style.display = 'none';
            addResourceModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === addCourseModal) {
            addCourseModal.style.display = 'none';
        }
        if (e.target === addResourceModal) {
            addResourceModal.style.display = 'none';
        }
    });
    
    backBtn.addEventListener('click', () => {
        courseDetailSection.classList.add('hidden');
        coursesContainer.classList.remove('hidden');
    });
    
    // Form submissions
    addCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const courseData = {
            title: document.getElementById('title').value,
            instructor: document.getElementById('instructor').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('imageUrl').value || 'https://via.placeholder.com/300x160?text=Course'
        };
        
        try {
            const response = await fetch('http://localhost:5500/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });
            
            if (response.ok) {
                addCourseModal.style.display = 'none';
                addCourseForm.reset();
                fetchCourses();
            } else {
                const error = await response.json();
                alert('Error adding course: ' + error.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });
    
    addResourceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const resourceData = {
            title: document.getElementById('resource-title').value,
            description: document.getElementById('resource-description').value,
            url: document.getElementById('resource-url').value,
            type: document.getElementById('resource-type').value
        };
        
        try {
            const response = await fetch(`https://cs798-backend.onrender.com/api/courses/${currentCourseId}/resources`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resourceData)
            });
            
            if (response.ok) {
                addResourceModal.style.display = 'none';
                addResourceForm.reset();
                fetchCourseDetails(currentCourseId);
            } else {
                const error = await response.json();
                alert('Error adding resource: ' + error.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });
    
    // Functions
    async function fetchCourses() {
        try {
            const response = await fetch(`https://cs798-backend.onrender.com/api/courses`);
            const courses = await response.json();
            renderCourseCards(courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
            courseCardsContainer.innerHTML = `
                <div class="error-message">
                    <p>Error loading courses. Please try again later.</p>
                </div>
            `;
        }
    }
    
    function renderCourseCards(courses) {
        courseCardsContainer.innerHTML = '';
        
        if (courses.length === 0) {
            courseCardsContainer.innerHTML = `
                <div class="message-box">
                    <p>No courses available. Add your first course!</p>
                </div>
            `;
            return;
        }
        
        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.addEventListener('click', () => {
                fetchCourseDetails(course._id);
            });
            
            card.innerHTML = `
                <img src="${course.imageUrl}" alt="${course.title}" class="course-image">
                <div class="course-info">
                    <div class="course-title">${course.title}</div>
                    <div class="course-instructor">${course.instructor}</div>
                    <div class="course-description">${course.description || 'No description available'}</div>
                </div>
            `;
            
            courseCardsContainer.appendChild(card);
        });
    }
    
    async function fetchCourseDetails(courseId) {
        try {
            const response = await fetch(`https://cs798-backend.onrender.com/api/courses/${courseId}`);
            const course = await response.json();
            
            // Store current course ID
            currentCourseId = course._id;
            
            // Update course details
            courseTitle.textContent = course.title;
            courseInstructor.textContent = `Instructor: ${course.instructor}`;
            courseDescription.textContent = course.description || 'No description available';
            
            // Render resources
            renderResources(course.resources || []);
            
            // Show course detail section
            coursesContainer.classList.add('hidden');
            courseDetailSection.classList.remove('hidden');
            
            // Apply 3D effect
            courseDetailSection.style.transform = 'perspective(1000px) rotateX(0deg)';
            setTimeout(() => {
                courseDetailSection.style.transform = 'perspective(1000px) rotateX(3deg)';
            }, 100);
            
        } catch (err) {
            console.error('Error fetching course details:', err);
            alert('Error loading course details. Please try again.');
        }
    }
    
    function renderResources(resources) {
        resourcesList.innerHTML = '';
        
        if (resources.length === 0) {
            resourcesList.innerHTML = `
                <div class="message-box">
                    <p>No resources available for this course yet.</p>
                </div>
            `;
            return;
        }
        
        resources.forEach(resource => {
            const resourceEl = document.createElement('div');
            resourceEl.className = 'resource-item';
            
            resourceEl.innerHTML = `
                <div class="resource-title">${resource.title}</div>
                <div class="resource-type">${resource.type}</div>
                <div class="resource-description">${resource.description || 'No description'}</div>
                <a href="${resource.url}" target="_blank" class="resource-link">Access Resource</a>
            `;
            
            resourcesList.appendChild(resourceEl);
        });
    }
});
