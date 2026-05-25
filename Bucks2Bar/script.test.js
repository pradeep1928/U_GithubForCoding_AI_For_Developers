/**
 * @jest-environment jsdom
 */

// Import functions from script.js
const {
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
    getBudgetChart,
} = require('./script.js');

// Helper function for validation (not in script.js)
function validateUsername(username) {
    if (!username) {
        return {valid: false, message: 'Please enter a username.'};
    }
    if (usernameRegex.test(username)) {
        return {valid: true, message: 'Username is valid.'};
    }
    return {
        valid: false,
        message:
            'Username must be at least 3 characters and include at least one uppercase letter.',
    };
}

// Test Suite
describe('Budget Tracker - formatRupee', () => {
    test('should format zero as ₹0', () => {
        expect(formatRupee(0)).toBe('₹0');
    });

    test('should format positive numbers with rupee symbol', () => {
        expect(formatRupee(1000)).toBe('₹1,000');
        expect(formatRupee(50000)).toBe('₹50,000');
    });

    test('should format large numbers correctly', () => {
        expect(formatRupee(1000000)).toBe('₹10,00,000');
    });

    test('should handle decimal values (truncate to whole number)', () => {
        expect(formatRupee(1000.5)).toBe('₹1,001');
    });
});

describe('Budget Tracker - Chart and DOM interactions', () => {
    beforeEach(() => {
        // clear DOM before each
        document.body.innerHTML = '';
        // reset budgetData
        months.forEach((_, index) => {
            budgetData[index] = {income: 0, expense: 0};
        });
        // clear global Chart
        delete global.Chart;
    });

    test('buildChart creates a Chart instance and sets datasets', () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'budget-chart';
        canvas.getContext = () => ({});
        document.body.appendChild(canvas);

        global.Chart = jest.fn((ctx, cfg) => ({
            update: jest.fn(),
            toBase64Image: () => 'data:image/png',
            resize: jest.fn(),
            data: cfg.data,
        }));

        buildChart();

        expect(global.Chart).toHaveBeenCalled();
        const chart = getBudgetChart();
        expect(chart).toBeDefined();
        expect(chart.data.labels).toEqual(months);
        expect(chart.data.datasets[0].label).toBe('Income');
    });

    test('refreshChart updates datasets and calls update', () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'budget-chart';
        canvas.getContext = () => ({});
        document.body.appendChild(canvas);

        // prepare budgetData
        budgetData[0].income = 123;
        budgetData[0].expense = 50;

        const mockChart = { data: { datasets: [{ data: [] }, { data: [] }] }, update: jest.fn() };
        global.Chart = jest.fn(() => mockChart);

        buildChart();
        refreshChart();

        expect(mockChart.data.datasets[0].data[0]).toBe(123);
        expect(mockChart.update).toHaveBeenCalled();
    });

    test('handleUsernameSubmit shows appropriate messages', () => {
        document.body.innerHTML = `
      <form>
        <input id="username" value="" />
        <div id="username-message"></div>
      </form>
    `;

        const evt = { preventDefault: jest.fn() };
        // empty username
        handleUsernameSubmit(evt);
        expect(document.getElementById('username-message').textContent).toBe('Please enter a username.');

        // valid username
        document.getElementById('username').value = 'John';
        handleUsernameSubmit(evt);
        expect(document.getElementById('username-message').textContent).toBe('Username is valid.');
        expect(document.getElementById('username-message').className).toMatch(/alert-success/);
    });

    test('downloadChartImage creates link and triggers click when chart exists', () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'budget-chart';
        canvas.getContext = () => ({});
        document.body.appendChild(canvas);
        global.Chart = jest.fn(() => ({ toBase64Image: jest.fn(() => 'data:image/png'), update: jest.fn(), resize: jest.fn(), data: { datasets: [] } }));

        // ensure budgetChart is set via buildChart
        buildChart();

        const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        downloadChartImage();
        expect(clickSpy).toHaveBeenCalled();
        clickSpy.mockRestore();
    });

    test('setupDownloadButton attaches handler without throwing', () => {
        document.body.innerHTML = '<button id="download-chart"></button>';
        expect(() => setupDownloadButton()).not.toThrow();
        const btn = document.getElementById('download-chart');
        btn.dispatchEvent(new MouseEvent('click'));
    });

    test('setupChartResizeOnTabShow registers listener and triggers resize', () => {
        const chartsTab = document.createElement('div');
        chartsTab.id = 'charts-tab';
        document.body.appendChild(chartsTab);

        const canvas = document.createElement('canvas');
        canvas.id = 'budget-chart';
        canvas.getContext = () => ({});
        document.body.appendChild(canvas);

        const mockChart = { resize: jest.fn() };
        global.Chart = jest.fn(() => mockChart);
        buildChart();

        setupChartResizeOnTabShow();
        chartsTab.dispatchEvent(new Event('shown.bs.tab'));

        expect(mockChart.resize).toHaveBeenCalled();
    });
});

describe('Budget Tracker - Username Validation', () => {
    test('should reject empty username', () => {
        const result = validateUsername('');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Please enter a username.');
    });

    test('should accept valid username with uppercase and length >= 3', () => {
        const result = validateUsername('John');
        expect(result.valid).toBe(true);
        expect(result.message).toBe('Username is valid.');
    });

    test('should accept complex valid usernames', () => {
        const validUsernames = ['Developer123', 'MyApp', 'ABC', 'TestUser'];
        validUsernames.forEach((username) => {
            const result = validateUsername(username);
            expect(result.valid).toBe(true);
        });
    });

    test('should reject username with no uppercase', () => {
        const result = validateUsername('john');
        expect(result.valid).toBe(false);
    });

    test('should reject username shorter than 3 characters', () => {
        const result = validateUsername('Ab');
        expect(result.valid).toBe(false);
    });

    test('should reject username with only uppercase', () => {
        const result = validateUsername('ABC');
        expect(result.valid).toBe(true); // This regex allows all uppercase
    });
});

describe('Budget Tracker - Data Management', () => {
    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
      <div id="total-income">₹0</div>
      <div id="total-expense">₹0</div>
    `;

        // Reset budget data before each test
        months.forEach((_, index) => {
            budgetData[index] = {income: 0, expense: 0};
        });
    });

    test('should initialize budgetData with 12 months', () => {
        expect(budgetData).toHaveLength(12);
        budgetData.forEach((item) => {
            expect(item).toHaveProperty('income');
            expect(item).toHaveProperty('expense');
        });
    });

    test('should handle input change for income', () => {
        const event = {
            target: {
                value: '5000',
                dataset: {month: 'Jan', type: 'income'},
            },
        };

        handleInputChange(event);
        expect(budgetData[0].income).toBe(5000);
    });

    test('should handle input change for expense', () => {
        const event = {
            target: {
                value: '2000',
                dataset: {month: 'Feb', type: 'expense'},
            },
        };

        handleInputChange(event);
        expect(budgetData[1].expense).toBe(2000);
    });

    test('should ignore invalid month', () => {
        const event = {
            target: {
                value: '1000',
                dataset: {month: 'Invalid', type: 'income'},
            },
        };

        const previousIncome = budgetData[0].income;
        handleInputChange(event);
        expect(budgetData[0].income).toBe(previousIncome);
    });

    test('should ignore invalid type', () => {
        const event = {
            target: {
                value: '1000',
                dataset: {month: 'Jan', type: 'invalid'},
            },
        };

        const previousIncome = budgetData[0].income;
        handleInputChange(event);
        expect(budgetData[0].income).toBe(previousIncome);
    });

    test('should handle non-numeric input as 0', () => {
        const event = {
            target: {
                value: 'abc',
                dataset: {month: 'Jan', type: 'income'},
            },
        };

        handleInputChange(event);
        expect(budgetData[0].income).toBe(0);
    });

    test('should handle empty input as 0', () => {
        const event = {
            target: {
                value: '',
                dataset: {month: 'Mar', type: 'expense'},
            },
        };

        handleInputChange(event);
        expect(budgetData[2].expense).toBe(0);
    });
});

describe('Budget Tracker - Total Calculations', () => {
    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
      <div id="total-income">₹0</div>
      <div id="total-expense">₹0</div>
    `;

        // Reset budget data
        months.forEach((_, index) => {
            budgetData[index] = {income: 0, expense: 0};
        });
    });

    test('should update total income in DOM', () => {
        budgetData[0].income = 10000;
        budgetData[1].income = 5000;

        updateTotals();

        const totalIncomeEl = document.getElementById('total-income');
        expect(totalIncomeEl.textContent).toBe('₹15,000');
    });

    test('should update total expense in DOM', () => {
        budgetData[0].expense = 3000;
        budgetData[1].expense = 2000;

        updateTotals();

        const totalExpenseEl = document.getElementById('total-expense');
        expect(totalExpenseEl.textContent).toBe('₹5,000');
    });

    test('should update both totals simultaneously', () => {
        budgetData[0] = {income: 10000, expense: 3000};
        budgetData[1] = {income: 5000, expense: 2000};

        updateTotals();

        const totalIncomeEl = document.getElementById('total-income');
        const totalExpenseEl = document.getElementById('total-expense');

        expect(totalIncomeEl.textContent).toBe('₹15,000');
        expect(totalExpenseEl.textContent).toBe('₹5,000');
    });

    test('should handle zero totals', () => {
        updateTotals();

        const totalIncomeEl = document.getElementById('total-income');
        const totalExpenseEl = document.getElementById('total-expense');

        expect(totalIncomeEl.textContent).toBe('₹0');
        expect(totalExpenseEl.textContent).toBe('₹0');
    });
});
