document.addEventListener('DOMContentLoaded', () => {
    // Update the current date in the welcome message
    const messageBox = document.querySelector('.message-box p');
    const currentDate = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    messageBox.textContent = `Current date: ${formattedDate}`;
    
    // Add 3D hover effects to buttons
    const buttons = document.querySelectorAll('.nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'perspective(800px) rotateY(0deg) translateY(-5px)';
            button.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'perspective(800px) rotateY(-5deg)';
            button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
    });
});


// main.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar-list a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
    // Activate the first link on load
    const homeLink = document.querySelector('.sidebar-list a[href="a.html"]');
    if (homeLink) homeLink.classList.add('active');
  
    // Sidebar toggle logic
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const layoutEl      = document.querySelector('.layout');
    sidebarToggle.addEventListener('click', () => {
      layoutEl.classList.toggle('collapsed');
    });
  });
  