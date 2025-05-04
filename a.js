document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const rollNumberInput = document.getElementById('rollNumber');
    const submitBtn = document.getElementById('submitBtn');
    const resultContent = document.getElementById('resultContent');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const resultContainer = document.querySelector('.result-container');

    // Function to show loading indicator
    function showLoading() {
        loadingIndicator.classList.remove('hidden');
        resultContent.innerHTML = '';
        errorMessage.classList.add('hidden');
    }

    // Function to hide loading indicator
    function hideLoading() {
        loadingIndicator.classList.add('hidden');
    }

    // Function to show error
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Function to fetch and display schedule
    async function fetchSchedule(rollNo) {
        // Show loading indicator
        showLoading();
        
        try {
            // Create the URL with the roll number
            const url = `http://localhost:5500/proxy?rollno=${encodeURIComponent(rollNo)}`;
            
            // Fetch data from the URL
            const response = await fetch(url);
            
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            // Get the HTML content
            const htmlContent = await response.text();
            // After getting the HTML content
            const modifiedHtml = htmlContent.replace('</head>', 
                '<style>body { background-color: white !important; }</style></head>');

            console.log(modifiedHtml)
            // Display the content
            resultContent.innerHTML = modifiedHtml;
            
            // Apply 3D effect to the result container
            resultContainer.style.transform = 'perspective(1500px) rotateY(0deg)';
            setTimeout(() => {
                resultContainer.style.transform = 'perspective(1500px) rotateY(3deg)';
            }, 100);
            
        } catch (error) {
            // Display error message
            showError(`Error fetching schedule: ${error.message}`);
            console.error('Error:', error);
        } finally {
            // Hide loading indicator
            hideLoading();
        }
    }

    // Event listener for submit button
    submitBtn.addEventListener('click', () => {
        const rollNo = rollNumberInput.value.trim();
        
        // Validate roll number
        if (!rollNo) {
            showError('Please enter a roll number');
            return;
        }
        
        // Fetch schedule with the provided roll number
        fetchSchedule(rollNo);
    });

    // Allow form submission with Enter key
    rollNumberInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitBtn.click();
        }
    });
});
