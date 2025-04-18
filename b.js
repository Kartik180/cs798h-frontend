// calendar-script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize calendar variables
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = new Date();
    let activeSemester = 'all';
    
    // DOM elements
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYearElement = document.getElementById('currentMonthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const semesterButtons = document.querySelectorAll('.semester-btn');
    const selectedDateElement = document.getElementById('selectedDate');
    const eventList = document.getElementById('eventList');
    
    // Add event listeners
    prevMonthButton.addEventListener('click', () => {
        navigateMonth(-1);
    });
    
    nextMonthButton.addEventListener('click', () => {
        navigateMonth(1);
    });
    
    semesterButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeSemester = button.dataset.semester;
            semesterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderCalendar();
        });
    });
    
    // Calendar data - Academic events from IIT Kanpur Calendar 2025
    const academicEvents = [
        // 2024-25-II Semester events
        { date: '2025-01-02', event: 'Administrative Registration - All New PG Students', semester: '2024-25-II', type: 'registration' },
        { date: '2025-01-03', event: 'Administrative Registration - All Continuing Students', semester: '2024-25-II', type: 'registration' },
        { date: '2025-01-05', event: 'Release of FCH', semester: '2024-25-II', type: 'classes' },
        { date: '2025-01-06', event: 'Classes Commence & Academic Registration', semester: '2024-25-II', type: 'classes' },
        { date: '2025-01-06', event: 'Adding a Course (Start)', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-01-10', event: 'Late Registration', semester: '2024-25-II', type: 'registration' },
        { date: '2025-01-13', event: 'Adding a Course (End)', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-02-05', event: 'Dropping/De-registering Modular Courses (1st Half)', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-02-19', event: 'Classes for the Modular Courses (1st half) End', semester: '2024-25-II', type: 'classes' },
        { date: '2025-02-20', event: 'No academic activity', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-02-21', event: 'Mid Semester Examination (Start)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-03-01', event: 'Mid Semester Examination (End)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-03-02', event: 'Make-up Examination for modular courses (1st half)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-03-03', event: 'Classes for Modular Courses (2nd half) Commence', semester: '2024-25-II', type: 'classes' },
        { date: '2025-03-05', event: 'Last date for document submission', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-03-08', event: 'Mid Semester Recess (Start)', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-03-16', event: 'Mid Semester Recess (End)', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-03-20', event: 'Last date for showing Mid-Semester answer scripts', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-03-21', event: 'Last date for Modular Course End Sem Grade Submission (1st half)', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-03-26', event: 'Last date for Dropping/De-registration of Regular Courses and Modular Courses (2nd half)', semester: '2024-25-II', type: 'deadline' },
        { date: '2025-04-01', event: 'Academic Pre-registration DMC Report Submission & HSS/EME Pre-registration (Start)', semester: '2024-25-II', type: 'registration' },
        { date: '2025-04-05', event: 'HSS/EME Pre-registration (End)', semester: '2024-25-II', type: 'registration' },
        { date: '2025-04-09', event: 'Academic Pre-registration (Start)', semester: '2024-25-II', type: 'registration' },
        { date: '2025-04-21', event: 'Academic Pre-registration (End)', semester: '2024-25-II', type: 'registration' },
        { date: '2025-04-23', event: 'Classes End', semester: '2024-25-II', type: 'classes' },
        { date: '2025-04-24', event: 'No academic activity', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-04-25', event: 'No academic activity', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-04-26', event: 'End Semester Examination (Start)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-05-06', event: 'End Semester Examination (End)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-05-08', event: 'End Semester Recess (Start)', semester: '2024-25-II', type: 'holiday' },
        { date: '2025-05-09', event: 'Make-up Examination (Start)', semester: '2024-25-II', type: 'exam' },
        { date: '2025-05-11', event: 'Make-up Examination (End) & Last date for End Semester Grade Submission', semester: '2024-25-II', type: 'exam' },
        { date: '2025-05-12', event: 'Last date for Make-up Grade Submission and Conversion of I Grades', semester: '2024-25-II', type: 'deadline' },
        
        // Summer Term 2025 events
        { date: '2025-05-17', event: 'Registration (Start)', semester: 'summer', type: 'registration' },
        { date: '2025-05-18', event: 'Registration (End)', semester: 'summer', type: 'registration' },
        { date: '2025-05-19', event: 'Submitting Course options online & Release of FCH', semester: 'summer', type: 'registration' },
        { date: '2025-05-20', event: 'Classes Commence', semester: 'summer', type: 'classes' },
        { date: '2025-05-20', event: 'Adding a Course (Start)', semester: 'summer', type: 'deadline' },
        { date: '2025-05-21', event: 'Adding a Course (End)', semester: 'summer', type: 'deadline' },
        { date: '2025-05-23', event: 'Late Registration', semester: 'summer', type: 'registration' },
        { date: '2025-05-26', event: 'Course allotment (Start)', semester: 'summer', type: 'registration' },
        { date: '2025-05-28', event: 'Course allotment (End)', semester: 'summer', type: 'registration' },
        { date: '2025-06-06', event: 'Dropping/De-registering Modular Courses (1st Half)', semester: 'summer', type: 'deadline' },
        { date: '2025-06-13', event: 'Classes for the Modular Courses (1st half) End', semester: 'summer', type: 'classes' },
        { date: '2025-06-15', event: 'No academic activity', semester: 'summer', type: 'holiday' },
        { date: '2025-06-16', event: 'Mid Semester Examination (Start)', semester: 'summer', type: 'exam' },
        { date: '2025-06-17', event: 'Mid Semester Examination (End)', semester: 'summer', type: 'exam' },
        { date: '2025-06-18', event: 'Classes for Modular Courses (2nd half) Commence', semester: 'summer', type: 'classes' },
        { date: '2025-06-21', event: 'Make-up Examination for modular courses (1st half)', semester: 'summer', type: 'exam' },
        { date: '2025-06-24', event: 'Last date for showing Mid-Semester answer scripts', semester: 'summer', type: 'deadline' },
        { date: '2025-06-25', event: 'Last date for Modular Course End Sem Grade Submission (1st half)', semester: 'summer', type: 'deadline' },
        { date: '2025-06-27', event: 'Last date for Dropping/De-registration of Regular Courses and Modular Courses (2nd half)', semester: 'summer', type: 'deadline' },
        { date: '2025-07-11', event: 'Classes End', semester: 'summer', type: 'classes' },
        { date: '2025-07-12', event: 'No academic activity', semester: 'summer', type: 'holiday' },
        { date: '2025-07-13', event: 'No academic activity', semester: 'summer', type: 'holiday' },
        { date: '2025-07-14', event: 'End Semester Examination (Start)', semester: 'summer', type: 'exam' },
        { date: '2025-07-15', event: 'End Semester Examination (End)', semester: 'summer', type: 'exam' },
        { date: '2025-07-18', event: 'Make-up Examination & Last date for End Semester Grade Submission', semester: 'summer', type: 'exam' },
        { date: '2025-07-19', event: 'Last date for Make-up Grade Submission and Conversion of I Grades', semester: 'summer', type: 'deadline' },
        { date: '2025-07-29', event: 'End Semester Recess (End)', semester: '2024-25-II', type: 'holiday' },
        
        // 2025-26-I Semester events
        { date: '2025-07-28', event: 'Fee Payment - All New UG & PG Students', semester: '2025-26-I', type: 'registration' },
        { date: '2025-07-30', event: 'Fee Payment - All Continuing Students & Release of FCH', semester: '2025-26-I', type: 'registration' },
        { date: '2025-07-31', event: 'Academic Registration & Classes Commence', semester: '2025-26-I', type: 'classes' },
        { date: '2025-07-31', event: 'Adding a Course (Start)', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-08-06', event: 'Late Registration & Adding a Course (End)', semester: '2025-26-I', type: 'registration' },
        { date: '2025-08-29', event: 'Dropping/De-registering Modular Courses (1st Half)', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-09-12', event: 'Classes for the Modular Courses (1st half) End', semester: '2025-26-I', type: 'classes' },
        { date: '2025-09-15', event: 'No academic activity', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-09-16', event: 'Mid Semester Examination (Start)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-09-22', event: 'Mid Semester Examination (End)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-09-23', event: 'Classes for Modular Courses (2nd half) Commence', semester: '2025-26-I', type: 'classes' },
        { date: '2025-09-27', event: 'Make-up Examination for modular courses (1st half) (Start) & Mid Semester Recess (Start)', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-09-28', event: 'Make-up Examination for modular courses (1st half) (End)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-10-05', event: 'Mid Semester Recess (End)', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-10-07', event: 'Last date for document submission', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-10-10', event: 'Last date for showing Mid-Semester answer scripts', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-10-14', event: 'Last date for Modular Course End Sem Grade Submission (1st half)', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-10-17', event: 'Last date for Dropping/De-registration of Regular Courses and Modular Courses (2nd half)', semester: '2025-26-I', type: 'deadline' },
        { date: '2025-10-21', event: 'Academic Pre-registration DMC Report Submission', semester: '2025-26-I', type: 'registration' },
        { date: '2025-10-22', event: 'HSS/EME Pre-registration (Start)', semester: '2025-26-I', type: 'registration' },
        { date: '2025-10-26', event: 'HSS/EME Pre-registration (End)', semester: '2025-26-I', type: 'registration' },
        { date: '2025-10-30', event: 'Academic Pre-registration (Start)', semester: '2025-26-I', type: 'registration' },
        { date: '2025-11-11', event: 'Academic Pre-registration (End)', semester: '2025-26-I', type: 'registration' },
        { date: '2025-11-14', event: 'Classes End', semester: '2025-26-I', type: 'classes' },
        { date: '2025-11-15', event: 'No academic activity', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-11-16', event: 'No academic activity', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-11-17', event: 'End Semester Examination (Start)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-11-26', event: 'End Semester Examination (End)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-11-28', event: 'End Semester Recess (Start)', semester: '2025-26-I', type: 'holiday' },
        { date: '2025-11-29', event: 'Make-up Examination (Start)', semester: '2025-26-I', type: 'exam' },
        { date: '2025-12-01', event: 'Make-up Examination (End) & Last date for End Semester Grade Submission', semester: '2025-26-I', type: 'exam' },
        { date: '2025-12-02', event: 'Last date for Make-up Grade Submission and Conversion of I Grades', semester: '2025-26-I', type: 'deadline' }
    ];
    
    // Define weekends and holidays
    function isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
    }
    
    function isHoliday(dateString) {
        // Check if date is in the "No academic activity" days or recess periods
        const holidays = academicEvents.filter(event => 
            event.event.includes('No academic activity') && 
            event.date === dateString
        );
        
        const recess = academicEvents.filter(event => 
            (event.event.includes('Recess') && event.date === dateString) ||
            (isDateInRange(dateString, '2025-03-08', '2025-03-16')) || // Mid Semester Recess 2024-25-II
            (isDateInRange(dateString, '2025-05-08', '2025-07-29')) || // End Semester Recess 2024-25-II
            (isDateInRange(dateString, '2025-09-27', '2025-10-05')) || // Mid Semester Recess 2025-26-I
            (isDateInRange(dateString, '2025-11-28', '2025-12-31'))    // End Semester Recess 2025-26-I
        );
        
        return holidays.length > 0 || recess.length > 0;
    }
    
    function isDateInRange(dateStr, startDateStr, endDateStr) {
        const date = new Date(dateStr);
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        return date >= startDate && date <= endDate;
    }
    
    function isExamDay(dateString) {
        const exams = academicEvents.filter(event => 
            (event.type === 'exam' && event.date === dateString) ||
            // Mid-sem exam ranges
            (isDateInRange(dateString, '2025-02-21', '2025-03-01')) || // 2024-25-II
            (isDateInRange(dateString, '2025-06-16', '2025-06-17')) || // Summer
            (isDateInRange(dateString, '2025-09-16', '2025-09-22')) || // 2025-26-I
            // End-sem exam ranges
            (isDateInRange(dateString, '2025-04-26', '2025-05-06')) || // 2024-25-II
            (isDateInRange(dateString, '2025-07-14', '2025-07-15')) || // Summer
            (isDateInRange(dateString, '2025-11-17', '2025-11-26'))    // 2025-26-I
        );
        
        return exams.length > 0;
    }
    
    // Function to navigate between months
    function navigateMonth(direction) {
        currentMonth += direction;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    }
    
    // Function to get events for a specific date
    function getEventsForDate(dateString) {
        if (activeSemester === 'all') {
            return academicEvents.filter(event => event.date === dateString);
        } else {
            return academicEvents.filter(event => 
                event.date === dateString && 
                event.semester === activeSemester
            );
        }
    }
    
    // Function to format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Function to handle day click
    function handleDayClick(date) {
        selectedDate = date;
        const dateString = formatDate(date);
        
        // Update selected date display
        selectedDateElement.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Clear and update events list
        eventList.innerHTML = '';
        const events = getEventsForDate(dateString);
        
        if (events.length > 0) {
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                eventItem.classList.add(`event-${event.type}`); // Add class based on event type
                
                const eventTitle = document.createElement('div');
                eventTitle.classList.add('event-title');
                eventTitle.textContent = event.event;
                
                const eventCategory = document.createElement('div');
                eventCategory.classList.add('event-semester');
                eventCategory.textContent = `Semester: ${event.semester}`;
                
                eventItem.appendChild(eventTitle);
                eventItem.appendChild(eventCategory);
                eventList.appendChild(eventItem);
            });
        } else {
            const noEvents = document.createElement('div');
            noEvents.classList.add('no-events');
            noEvents.textContent = 'No events for this date';
            eventList.appendChild(noEvents);
        }
    }
    
    // Function to render the calendar
    function renderCalendar() {
        // Update month and year display
        currentMonthYearElement.textContent = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
        
        // Clear calendar
        calendarDays.innerHTML = '';
        
        // Create day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            calendarDays.appendChild(dayHeader);
        });
        
        // Get first day of month and total days in month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Fill in leading empty days
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Fill in days of the month
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = formatDate(date);
            
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Check for events on this day
            const events = getEventsForDate(dateString);
            
            // Add event indicators and classes
            if (events.length > 0) {
                dayElement.classList.add('has-events');
                
                // Add specific class based on event type
                const eventTypes = [...new Set(events.map(e => e.type))];
                eventTypes.forEach(type => {
                    dayElement.classList.add(`has-${type}`);
                });
                
                // Add event indicator
                const indicator = document.createElement('div');
                indicator.classList.add('event-indicator');
                indicator.textContent = events.length;
                dayElement.appendChild(indicator);
            }
            
            // Mark weekend days
            if (isWeekend(date)) {
                dayElement.classList.add('weekend');
            }
            
            // Mark holidays
            if (isHoliday(dateString)) {
                dayElement.classList.add('holiday');
            }
            
            // Mark exam days
            if (isExamDay(dateString)) {
                dayElement.classList.add('exam-day');
            }
            
            // Mark today
            const today = new Date();
            if (day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Mark selected day
            if (day === selectedDate.getDate() && 
                currentMonth === selectedDate.getMonth() && 
                currentYear === selectedDate.getFullYear()) {
                dayElement.classList.add('selected');
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                dayElement.classList.add('selected');
                
                // Handle day click
                handleDayClick(date);
            });
            
            calendarDays.appendChild(dayElement);
        }
        
        // If the selected date is in the current month, show its events
        if (selectedDate.getMonth() === currentMonth && 
            selectedDate.getFullYear() === currentYear) {
            handleDayClick(selectedDate);
        } else {
            // Otherwise, select the first day of the month
            selectedDate = new Date(currentYear, currentMonth, 1);
            handleDayClick(selectedDate);
        }
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Initial selection of today's date
    handleDayClick(new Date());
    
    // Add tooltips for events
    function addEventTooltips() {
        document.querySelectorAll('.has-events').forEach(day => {
            const date = new Date(currentYear, currentMonth, parseInt(day.textContent));
            const dateString = formatDate(date);
            const events = getEventsForDate(dateString);
            
            if (events.length > 0) {
                let tooltipContent = '<div class="tooltip-content">';
                events.forEach(event => {
                    tooltipContent += `<div class="tooltip-event tooltip-${event.type}">${event.event}</div>`;
                });
                tooltipContent += '</div>';
                
                day.setAttribute('title', events.map(e => e.event).join('\n'));
                day.setAttribute('data-tooltip', tooltipContent);
                
                day.addEventListener('mouseenter', (e) => {
                    showTooltip(e, tooltipContent);
                });
                day.addEventListener('mouseleave', hideTooltip);
            }
        });
    }
    
    // Show tooltip function
    function showTooltip(e, content) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    }
    
    // Hide tooltip function
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    // Add event tooltips after calendar is rendered
    addEventTooltips();
    
    // Export functions for potential use in other scripts
    window.calendarFunctions = {
        navigateMonth,
        renderCalendar,
        handleDayClick,
        getEventsForDate
    };
});