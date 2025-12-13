const App = {
    init: function() {
        this.renderCharts();
    },

    // 1. Navigation Logic
    navigate: function(pageId, element) {
        // Find and deactivate the currently active sidebar item
        const activeLink = document.querySelector('.sidebar-menu a.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        
        // Deactivate all page content sections
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));

        // Activate the requested page content
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Activate the corresponding sidebar link
        if (element) {
             element.classList.add('active');
        } else {
            // Fallback for internal navigation (e.g., from a quick action or button on the page)
            const correspondingLink = document.querySelector(`.sidebar-item[data-page="${pageId}"]`);
            if (correspondingLink) {
                 correspondingLink.classList.add('active');
            }
        }
        
        // Close sidebar on mobile after click
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
             sidebar.classList.remove('open');
        }
    },

    // 2. Mobile Sidebar Toggle
    toggleSidebar: function() {
        document.getElementById('sidebar').classList.toggle('open');
    },

    // 3. Theme Toggle
    setTheme: function(theme) {
        document.body.className = theme + '-mode';
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('btn-' + theme).classList.add('active');
    },

    // 4. Chart.js Setup (Donut Chart for Dashboard)
    renderCharts: function() {
        const ctx = document.getElementById('attendanceDonutChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Present', 'Absent', 'On Leave'],
                    datasets: [{
                        data: [90, 5, 5], // Mock data: 90% Present, 5% Absent, 5% On Leave
                        backgroundColor: [
                            '#10b981', // Primary Teal
                            '#ef4444', // Danger Red
                            '#3b82f6'  // Secondary Blue
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += context.parsed + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    // Disable animation on initial load to make it quick
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
        }
    }
};
