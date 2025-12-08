const App = {
    init: function() {
        this.renderCharts();
        this.loadMockData();
        this.setupEventListeners();
    },

    // 1. Navigation Logic (Used primarily for theme toggle and sidebar open/close)
    navigate: function(pageId, element) {
        // Simple internal page change (used for placeholder sections like Attendance/Directory)
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        document.querySelectorAll('.sidebar-menu a').forEach(i => i.classList.remove('active'));
        if(element) element.classList.add('active');
        
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

    // 2. Mock Data Rendering (Simulating Backend)
    loadMockData: function() {
        const activityData = [
            { user: "Sarah Connor", action: "Requested Leave", time: "2 mins ago", status: "pending" },
            { user: "John Wick", action: "Completed Task", time: "1 hour ago", status: "success" },
            { user: "Tony Stark", action: "Updated Profile", time: "3 hours ago", status: "success" }
        ];

        const tableBody = document.querySelector('#activity-table tbody');
        if(tableBody) {
            tableBody.innerHTML = activityData.map(item => `
                <tr>
                    <td><b>${item.user}</b></td>
                    <td>${item.action}</td>
                    <td>${item.time}</td>
                    <td><span class="status-badge status-${item.status}">${item.status}</span></td>
                </tr>
            `).join('');
        }
        
        // Populate Employee Grid
        const grid = document.getElementById('employee-grid');
        if(grid) {
            grid.innerHTML = [1,2,3,4].map(i => `
                <div class="card" style="text-align:center">
                    <div class="user-avatar" style="width:60px; height:60px; margin:0 auto 10px; font-size:20px">U${i}</div>
                    <h4 style="margin:5px 0">Employee ${i}</h4>
                    <p style="margin:0; color:#64748b; font-size:13px">Developer</p>
                </div>
            `).join('');
        }
    },

    // 3. Chart.js Setup
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
    },

    setupEventListeners: function() {
        // Any extra listeners
    }
};
