const App = {
    init: function() {
        this.renderCharts();
        this.loadMockData();
    },

    // 1. Navigation Logic
    navigate: function(pageId, element) {
        // Clear active status on all pages and links
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.sidebar-menu a').forEach(i => i.classList.remove('active'));

        // Show the requested page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Set the active link
        if (element) {
             element.classList.add('active');
        } else {
            // Find and activate the link by data-page attribute if navigation was internal (like a button click)
            const correspondingLink = document.querySelector(`.sidebar-item[data-page="${pageId}"]`);
            if (correspondingLink) {
                 correspondingLink.classList.add('active');
            }
        }
        
        // Close sidebar on mobile after click
        document.getElementById('sidebar').classList.remove('open');
    },

    toggleSidebar: function() {
        document.getElementById('sidebar').classList.toggle('open');
    },

    setTheme: function(theme) {
        document.body.className = theme + '-mode';
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('btn-' + theme).classList.add('active');
    },

    // 2. Mock Data Rendering (Simplified for the new dashboard structure)
    loadMockData: function() {
        // This function will primarily handle initializing the dashboard elements if needed
        
        // This chart setup is part of the premium feel, so it's kept.
        this.renderCharts(); 
    },

    // 3. Chart.js Setup (Kept for the Dashboard Overview)
    renderCharts: function() {
        const ctx = document.getElementById('attendanceChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [{
                        label: 'Present Employees',
                        data: [1200, 1230, 1150, 1240, 1210, 800],
                        borderColor: '#2563eb',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(37, 99, 235, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: false } }
                }
            });
        }
    }
};
