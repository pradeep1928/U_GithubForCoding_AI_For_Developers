const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const budgetData = months.map(() => ({income: 0, expense: 0}));
let budgetChart = null;
const usernameRegex = /(?=.*[A-Z]).{3,}/;

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

function formatRupee(value) {
    return currencyFormatter.format(value);
}

function updateTotals() {
    const totalIncome = budgetData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = budgetData.reduce(
        (sum, item) => sum + item.expense,
        0,
    );

    document.getElementById('total-income').textContent =
        formatRupee(totalIncome);
    document.getElementById('total-expense').textContent =
        formatRupee(totalExpense);
}

function refreshChart() {
    if (
        !budgetChart ||
        !budgetChart.data ||
        !Array.isArray(budgetChart.data.datasets) ||
        budgetChart.data.datasets.length < 2
    ) {
        return;
    }

    budgetChart.data.datasets[0].data = budgetData.map((item) => item.income);
    budgetChart.data.datasets[1].data = budgetData.map((item) => item.expense);
    if (typeof budgetChart.update === 'function') {
        budgetChart.update();
    }
}

function handleInputChange(event) {
    const input = event.target;
    const month = input.dataset.month;
    const type = input.dataset.type;
    const value = Number(input.value) || 0;
    const index = months.indexOf(month);

    if (index === -1 || !['income', 'expense'].includes(type)) {
        return;
    }

    budgetData[index][type] = value;
    updateTotals();
    refreshChart();
}

function initializeInputs() {
    const inputs = document.querySelectorAll('input[data-month][data-type]');
    inputs.forEach((input) => {
        input.addEventListener('input', handleInputChange);
    });
}

function handleUsernameSubmit(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const messageEl = document.getElementById('username-message');
    const username = usernameInput.value.trim();
    let message =
        'Username must be at least 3 characters and include at least one uppercase letter.';
    let alertClass = 'alert-danger';

    if (!username) {
        message = 'Please enter a username.';
    } else if (usernameRegex.test(username)) {
        message = 'Username is valid.';
        alertClass = 'alert-success';
    }

    messageEl.textContent = message;
    messageEl.className = `alert ${alertClass} mt-3`;
}

function setupUsernameForm() {
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', handleUsernameSubmit);
}

function buildChart() {
    const ctx = document.getElementById('budget-chart').getContext('2d');
    budgetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: budgetData.map((item) => item.income),
                    backgroundColor: 'rgba(25, 135, 84, 0.85)',
                    borderRadius: 8,
                    maxBarThickness: 36,
                },
                {
                    label: 'Expense',
                    data: budgetData.map((item) => item.expense),
                    backgroundColor: 'rgba(220, 53, 69, 0.85)',
                    borderRadius: 8,
                    maxBarThickness: 36,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label(context) {
                            return `${context.dataset.label}: ${formatRupee(context.parsed.y)}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback(value) {
                            return formatRupee(value);
                        },
                    },
                },
            },
        },
    });
}

function setupChartResizeOnTabShow() {
    const chartsTab = document.querySelector('#charts-tab');
    if (!chartsTab) {
        return;
    }

    chartsTab.addEventListener('shown.bs.tab', () => {
        if (budgetChart) {
            budgetChart.resize();
        }
    });
}

function downloadChartImage() {
    if (!budgetChart) {
        return;
    }

    const link = document.createElement('a');
    link.href = budgetChart.toBase64Image('image/png', 1);
    link.download = 'income-expense-chart.png';
    link.click();
}

function setupDownloadButton() {
    const button = document.getElementById('download-chart');
    if (!button) {
        return;
    }

    button.addEventListener('click', downloadChartImage);
}

function init() {
    initializeInputs();
    updateTotals();
    buildChart();
    setupChartResizeOnTabShow();
    setupDownloadButton();
    setupUsernameForm();
}

function getBudgetChart() {
    return budgetChart;
}

document.addEventListener('DOMContentLoaded', init);

// Exports for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatRupee,
        updateTotals,
        handleInputChange,
        budgetData,
        months,
        usernameRegex,
        handleUsernameSubmit,
        setupUsernameForm,
        buildChart,
        refreshChart,
        setupChartResizeOnTabShow,
        downloadChartImage,
        setupDownloadButton,
        initializeInputs,
        // expose for tests (may be null in real runtime)
        budgetChart,
        getBudgetChart,
    };
}
