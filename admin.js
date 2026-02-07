// Admin Dashboard JavaScript

// Sample data - In production, this would come from your database API
const dashboardData = {
    totalUsers: 1247,
    signupsToday: 23,
    signupsYesterday: 18,
    revenueMonth: 42385,
    activeUsers: 487,
    premiumUsers: 284,
    totalMatches: 3421,
    signupsLast30Days: [12, 15, 18, 14, 22, 19, 25, 28, 23, 31, 27, 35, 29, 38, 33, 42, 38, 45, 41, 48, 44, 52, 47, 55, 51, 58, 54, 61, 57, 23],
    revenueBreakdown: {
        premium: 28476,
        plus: 13909,
        boosts: 0,
        gifts: 0
    }
};

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSignupsChart();
    initializeRevenueChart();
    animateStats();
});

// Signups Chart
let signupsChart;
function initializeSignupsChart() {
    const ctx = document.getElementById('signupsChart');
    if (!ctx) return;
    
    const labels = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    signupsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Signups',
                data: dashboardData.signupsLast30Days,
                borderColor: '#d4866f',
                backgroundColor: 'rgba(212, 134, 111, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#d4866f',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2d2420',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#d4866f',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' signups';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        color: '#9a8d83',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#e3ddd6',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#9a8d83',
                        maxRotation: 0,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Revenue Chart
let revenueChart;
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    revenueChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Premium Subscriptions', 'Plus Subscriptions', 'Profile Boosts', 'Virtual Gifts'],
            datasets: [{
                data: [
                    dashboardData.revenueBreakdown.premium,
                    dashboardData.revenueBreakdown.plus,
                    dashboardData.revenueBreakdown.boosts || 0,
                    dashboardData.revenueBreakdown.gifts || 0
                ],
                backgroundColor: [
                    '#d4866f',
                    '#6f9d86',
                    '#e8c547',
                    '#b87158'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 13,
                            family: "'DM Sans', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#2d2420',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#d4866f',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return context.label + ': R' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Update signups chart when filter changes
function updateSignupsChart(days) {
    // In production, fetch new data from API
    console.log('Updating chart for last', days, 'days');
    
    // For demo, just update the labels
    const labels = [];
    const today = new Date();
    const numDays = parseInt(days);
    
    for (let i = numDays - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    signupsChart.data.labels = labels;
    signupsChart.update();
}

// Animate stats on page load
function animateStats() {
    const stats = [
        { id: 'totalUsers', value: dashboardData.totalUsers },
        { id: 'signupsToday', value: dashboardData.signupsToday },
        { id: 'activeUsers', value: dashboardData.activeUsers },
        { id: 'premiumUsers', value: dashboardData.premiumUsers },
        { id: 'totalMatches', value: dashboardData.totalMatches }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;
        
        const duration = 1500;
        const start = 0;
        const end = stat.value;
        const startTime = Date.now();
        
        function update() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    });
    
    // Animate revenue with currency
    const revenueElement = document.getElementById('revenueMonth');
    if (revenueElement) {
        const duration = 1500;
        const start = 0;
        const end = dashboardData.revenueMonth;
        const startTime = Date.now();
        
        function update() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            revenueElement.textContent = 'R ' + current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
}

// Refresh data function
function refreshData() {
    // In production, this would fetch fresh data from your API
    console.log('Refreshing data...');
    
    // Show loading state
    const btn = document.querySelector('.btn-refresh');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation: spin 1s linear infinite;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Refreshing...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update random values for demo
        dashboardData.signupsToday += Math.floor(Math.random() * 5);
        dashboardData.activeUsers += Math.floor(Math.random() * 10);
        
        // Update UI
        document.getElementById('signupsToday').textContent = dashboardData.signupsToday;
        document.getElementById('activeUsers').textContent = dashboardData.activeUsers;
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Show success message
        showNotification('Data refreshed successfully!', 'success');
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#6f9d86' : '#d4866f'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export data function (for Export Data button)
function exportData() {
    // In production, this would generate and download a CSV/Excel file
    console.log('Exporting data...');
    
    const csvContent = `Name,Email,Location,Age,Membership,Signup Date
Sarah M.,sarah.m@email.com,Cape Town,28,Premium,2026-02-07
John D.,john.d@email.com,Johannesburg,32,Free,2026-02-07
Maya R.,maya.r@email.com,Pretoria,26,Plus,2026-02-07`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genuine-users-export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

// Add click handlers for action buttons
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const action = btn.querySelector('span').textContent;
            
            switch(action) {
                case 'Export Data':
                    exportData();
                    break;
                case 'Add New User':
                    showNotification('Add User modal would open here', 'info');
                    break;
                case 'Send Newsletter':
                    showNotification('Newsletter composer would open here', 'info');
                    break;
                case 'View Reports':
                    showNotification('Reports page would open here', 'info');
                    break;
            }
        });
    });
});

// Real-time updates simulation (in production, use WebSockets)
setInterval(() => {
    // Randomly update active users count
    if (Math.random() > 0.7) {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        dashboardData.activeUsers += change;
        document.getElementById('activeUsers').textContent = dashboardData.activeUsers;
    }
}, 30000); // Every 30 seconds

// Console info for developers
console.log('%cGenuine Admin Dashboard', 'color: #d4866f; font-size: 24px; font-weight: bold;');
console.log('%cConnected and ready!', 'color: #6f9d86; font-size: 14px;');
console.log('Dashboard data:', dashboardData);
