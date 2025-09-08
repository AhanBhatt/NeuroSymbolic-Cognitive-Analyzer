// NeuroSymbolic Cognitive Decline Analysis System JavaScript

// System data from research
const cognitiveIndicators = [
    {name: "reduced_brain_connectivity", weight: 0.9, category: "neurological", source: "MIT_ChatGPT_2025"},
    {name: "lower_memory_retention", weight: 0.85, category: "neurological", source: "MIT_ChatGPT_2025"},
    {name: "diminished_neural_activity", weight: 0.8, category: "neurological", source: "MIT_ChatGPT_2025"},
    {name: "cognitive_offloading", weight: 0.75, category: "behavioral", source: "Gerlich_2025"},
    {name: "decreased_critical_thinking", weight: 0.9, category: "cognitive", source: "Gerlich_2025"},
    {name: "metacognitive_laziness", weight: 0.7, category: "behavioral", source: "Conversation_2025"},
    {name: "attention_decline", weight: 0.8, category: "cognitive", source: "MIT_ChatGPT_2025"},
    {name: "working_memory_impairment", weight: 0.85, category: "cognitive", source: "Various_2024"},
    {name: "pattern_recognition_degradation", weight: 0.6, category: "cognitive", source: "Various_2024"},
    {name: "executive_function_decline", weight: 0.88, category: "cognitive", source: "Various_2024"}
];

const neurosymbolicRules = [
    {rule_id: "NS001", description: "If cognitive_offloading > 0.7 AND usage_frequency = high THEN cognitive_decline_risk = high", confidence: 0.8},
    {rule_id: "NS002", description: "If neural_activity < 0.3 AND memory_retention < 0.4 THEN severe_decline_risk = true", confidence: 0.9},
    {rule_id: "NS003", description: "If copy_paste_behavior > 0.8 THEN analytical_engagement = low", confidence: 0.7},
    {rule_id: "NS004", description: "If reflection_time < 0.2 AND verification_rate < 0.3 THEN critical_thinking_decline = high", confidence: 0.75},
    {rule_id: "NS005", description: "If ai_dependence > 0.9 THEN cognitive_atrophy_risk = severe", confidence: 0.95},
    {rule_id: "NS006", description: "If engagement_metrics < 0.4 AND temporal_usage > 6_months THEN long_term_decline = probable", confidence: 0.85},
    {rule_id: "NS007", description: "If problem_solving_decline > 0.7 AND executive_function < 0.5 THEN metacognitive_impairment = high", confidence: 0.8},
    {rule_id: "NS008", description: "If attention_span < 0.3 AND task_switching > 0.8 THEN focus_degradation = severe", confidence: 0.75}
];

const testScenarios = {
    high: {
        name: "High Risk User",
        risk_score: 0.674,
        risk_level: "high",
        data: {
            cognitive_offloading: 0.85,
            neural_activity: 0.25,
            memory_retention: 0.35,
            copy_paste_behavior: 0.90,
            analytical_engagement: 0.20,
            reflection_time: 0.10,
            verification_rate: 0.15,
            ai_dependence: 0.95,
            engagement_metrics: 0.25,
            problem_solving_decline: 0.80,
            executive_function: 0.40,
            attention_span: 0.20,
            task_switching: 0.90,
            temporal_usage_months: 12,
            usage_frequency: "high"
        }
    },
    moderate: {
        name: "Moderate Risk User",
        risk_score: 0.200,
        risk_level: "low",
        data: {
            cognitive_offloading: 0.55,
            neural_activity: 0.50,
            memory_retention: 0.60,
            copy_paste_behavior: 0.45,
            analytical_engagement: 0.55,
            reflection_time: 0.40,
            verification_rate: 0.50,
            ai_dependence: 0.60,
            engagement_metrics: 0.50,
            problem_solving_decline: 0.40,
            executive_function: 0.65,
            attention_span: 0.50,
            task_switching: 0.45,
            temporal_usage_months: 6,
            usage_frequency: "medium"
        }
    },
    low: {
        name: "Low Risk User",
        risk_score: 0.101,
        risk_level: "minimal",
        data: {
            cognitive_offloading: 0.30,
            neural_activity: 0.80,
            memory_retention: 0.85,
            copy_paste_behavior: 0.20,
            analytical_engagement: 0.80,
            reflection_time: 0.70,
            verification_rate: 0.80,
            ai_dependence: 0.30,
            engagement_metrics: 0.75,
            problem_solving_decline: 0.20,
            executive_function: 0.85,
            attention_span: 0.80,
            task_switching: 0.25,
            temporal_usage_months: 3,
            usage_frequency: "low"
        }
    }
};

// Global variables
let currentData = {};
let riskGaugeChart = null;
let rulesChart = null;
let radarChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeTabs();
    initializeSliders();
    setTimeout(() => {
        initializeCharts();
        performAnalysis();
    }, 100);
});

function initializeTabs() {
    console.log('Initializing tabs...');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Found tab buttons:', tabBtns.length);
    console.log('Found tab contents:', tabContents.length);

    tabBtns.forEach((btn, index) => {
        console.log(`Setting up tab ${index}:`, btn.dataset.tab);
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.dataset.tab;
            console.log('Tab clicked:', tabId);
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Activated tab:', tabId);
            } else {
                console.error('Target content not found:', tabId);
            }
        });
    });
}

function initializeSliders() {
    console.log('Initializing sliders...');
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(slider.id + '_val');
        
        if (valueDisplay) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                valueDisplay.textContent = value;
                currentData[slider.id] = parseFloat(value);
                performAnalysis();
            });
            
            // Initialize current data
            currentData[slider.id] = parseFloat(slider.value);
            valueDisplay.textContent = slider.value;
        }
    });

    // Initialize usage frequency
    const usageFrequency = document.getElementById('usage_frequency');
    if (usageFrequency) {
        usageFrequency.addEventListener('change', (e) => {
            currentData.usage_frequency = e.target.value;
            performAnalysis();
        });
        currentData.usage_frequency = usageFrequency.value;
    }
}

function loadScenario(scenarioType) {
    console.log('Loading scenario:', scenarioType);
    const scenario = testScenarios[scenarioType];
    if (!scenario) {
        console.error('Scenario not found:', scenarioType);
        return;
    }

    // Update all sliders and displays
    Object.entries(scenario.data).forEach(([key, value]) => {
        if (key === 'usage_frequency') {
            const select = document.getElementById('usage_frequency');
            if (select) {
                select.value = value;
                currentData[key] = value;
            }
        } else {
            const slider = document.getElementById(key);
            const display = document.getElementById(key + '_val');
            
            if (slider && display) {
                slider.value = value;
                display.textContent = value;
                currentData[key] = parseFloat(value);
            }
        }
    });

    // Trigger analysis update
    performAnalysis();
}

function performAnalysis() {
    const results = runNeuroSymbolicAnalysis(currentData);
    updateResults(results);
}

function runNeuroSymbolicAnalysis(data) {
    // Neural Network Component - Pattern Recognition
    const neuralScore = calculateNeuralScore(data);
    
    // Symbolic Component - Rule-based Reasoning
    const symbolicResults = evaluateSymbolicRules(data);
    
    // Fusion - Combine neural and symbolic outputs
    const riskScore = (neuralScore * 0.6) + (symbolicResults.riskScore * 0.4);
    const riskLevel = determineRiskLevel(riskScore);
    
    return {
        riskScore: riskScore,
        riskLevel: riskLevel,
        neuralScore: neuralScore,
        symbolicResults: symbolicResults,
        topFactors: identifyTopFactors(data),
        recommendations: generateRecommendations(riskScore, symbolicResults.firedRules)
    };
}

function calculateNeuralScore(data) {
    const weights = {
        cognitive_offloading: 0.12,
        neural_activity: -0.15, // Negative because lower is worse
        memory_retention: -0.13,
        copy_paste_behavior: 0.10,
        analytical_engagement: -0.11,
        reflection_time: -0.09,
        verification_rate: -0.08,
        ai_dependence: 0.14,
        engagement_metrics: -0.10,
        problem_solving_decline: 0.13,
        executive_function: -0.12,
        attention_span: -0.11,
        task_switching: 0.08,
        temporal_usage_months: 0.005
    };

    let score = 0.5; // Base score
    
    Object.entries(weights).forEach(([key, weight]) => {
        if (data[key] !== undefined) {
            score += data[key] * weight;
        }
    });

    // Usage frequency multiplier
    const usageMultiplier = {
        'low': 0.8,
        'medium': 1.0,
        'high': 1.2
    };
    
    score *= usageMultiplier[data.usage_frequency] || 1.0;
    
    return Math.max(0, Math.min(1, score));
}

function evaluateSymbolicRules(data) {
    const firedRules = [];
    let symbolicRiskScore = 0;

    // Rule NS001
    if (data.cognitive_offloading > 0.7 && data.usage_frequency === 'high') {
        firedRules.push({...neurosymbolicRules[0], activation: 0.8});
        symbolicRiskScore += 0.15;
    }

    // Rule NS002
    if (data.neural_activity < 0.3 && data.memory_retention < 0.4) {
        firedRules.push({...neurosymbolicRules[1], activation: 0.9});
        symbolicRiskScore += 0.20;
    }

    // Rule NS003
    if (data.copy_paste_behavior > 0.8) {
        firedRules.push({...neurosymbolicRules[2], activation: 0.7});
        symbolicRiskScore += 0.10;
    }

    // Rule NS004
    if (data.reflection_time < 0.2 && data.verification_rate < 0.3) {
        firedRules.push({...neurosymbolicRules[3], activation: 0.75});
        symbolicRiskScore += 0.12;
    }

    // Rule NS005
    if (data.ai_dependence > 0.9) {
        firedRules.push({...neurosymbolicRules[4], activation: 0.95});
        symbolicRiskScore += 0.25;
    }

    // Rule NS006
    if (data.engagement_metrics < 0.4 && data.temporal_usage_months > 6) {
        firedRules.push({...neurosymbolicRules[5], activation: 0.85});
        symbolicRiskScore += 0.15;
    }

    // Rule NS007
    if (data.problem_solving_decline > 0.7 && data.executive_function < 0.5) {
        firedRules.push({...neurosymbolicRules[6], activation: 0.8});
        symbolicRiskScore += 0.18;
    }

    // Rule NS008
    if (data.attention_span < 0.3 && data.task_switching > 0.8) {
        firedRules.push({...neurosymbolicRules[7], activation: 0.75});
        symbolicRiskScore += 0.14;
    }

    return {
        firedRules: firedRules,
        riskScore: Math.min(1, symbolicRiskScore)
    };
}

function determineRiskLevel(score) {
    if (score < 0.2) return 'minimal';
    if (score < 0.4) return 'low';
    if (score < 0.6) return 'moderate';
    if (score < 0.8) return 'high';
    return 'severe';
}

function identifyTopFactors(data) {
    const factors = [
        {name: 'AI Dependence', value: data.ai_dependence, risk: data.ai_dependence > 0.7},
        {name: 'Cognitive Offloading', value: data.cognitive_offloading, risk: data.cognitive_offloading > 0.6},
        {name: 'Neural Activity', value: 1 - data.neural_activity, risk: data.neural_activity < 0.4},
        {name: 'Memory Retention', value: 1 - data.memory_retention, risk: data.memory_retention < 0.5},
        {name: 'Problem Solving Decline', value: data.problem_solving_decline, risk: data.problem_solving_decline > 0.6}
    ];

    return factors
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
}

function generateRecommendations(riskScore, firedRules) {
    const recommendations = [];

    if (riskScore > 0.6) {
        recommendations.push("Consider reducing AI dependency through scheduled offline work sessions");
        recommendations.push("Practice manual problem-solving exercises to maintain cognitive flexibility");
    }
    
    if (firedRules.some(rule => rule.rule_id === 'NS005')) {
        recommendations.push("Implement AI-free days to prevent cognitive atrophy");
    }
    
    if (firedRules.some(rule => rule.rule_id === 'NS002')) {
        recommendations.push("Engage in activities that promote neural activity and memory retention");
    }
    
    if (firedRules.some(rule => rule.rule_id === 'NS004')) {
        recommendations.push("Increase reflection time and verification practices when using AI");
    }

    if (recommendations.length === 0) {
        recommendations.push("Maintain current balanced approach to AI usage");
        recommendations.push("Continue monitoring cognitive indicators regularly");
    }

    return recommendations;
}

function updateResults(results) {
    // Update risk score and level
    const riskScoreElement = document.getElementById('riskScore');
    const riskLevelElement = document.getElementById('riskLevel');
    
    if (riskScoreElement) {
        riskScoreElement.textContent = results.riskScore.toFixed(3);
    }
    
    if (riskLevelElement) {
        riskLevelElement.textContent = results.riskLevel.charAt(0).toUpperCase() + results.riskLevel.slice(1);
        riskLevelElement.className = `risk-level ${results.riskLevel}`;
    }

    // Update component scores
    const neuralScoreElement = document.getElementById('neuralScore');
    const rulesFiredElement = document.getElementById('rulesFired');
    
    if (neuralScoreElement) {
        neuralScoreElement.textContent = results.neuralScore.toFixed(2);
    }
    
    if (rulesFiredElement) {
        rulesFiredElement.textContent = results.symbolicResults.firedRules.length;
    }

    // Update top factors
    const factorsContainer = document.getElementById('topFactors');
    if (factorsContainer) {
        factorsContainer.innerHTML = results.topFactors.map(factor => 
            `<div class="factor-item">${factor.name}: ${(factor.value * 100).toFixed(1)}%</div>`
        ).join('');
    }

    // Update recommendations
    const recommendationsContainer = document.getElementById('recommendationsList');
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = results.recommendations.map(rec => 
            `<div class="recommendation-item">${rec}</div>`
        ).join('');
    }

    // Update charts
    if (riskGaugeChart) updateRiskGauge(results.riskScore, results.riskLevel);
    if (rulesChart) updateRulesChart(results.symbolicResults.firedRules);
    if (radarChart) updateRadarChart(currentData);
}

function initializeCharts() {
    console.log('Initializing charts...');
    
    // Initialize Risk Gauge
    const riskGaugeCtx = document.getElementById('riskGauge');
    if (riskGaugeCtx) {
        riskGaugeChart = new Chart(riskGaugeCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [0.5, 0.5],
                    backgroundColor: ['#1FB8CD', '#f5f5f5'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Initialize Rules Chart
    const rulesChartCtx = document.getElementById('rulesChart');
    if (rulesChartCtx) {
        rulesChart = new Chart(rulesChartCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Rule Activation',
                    data: [],
                    backgroundColor: '#FFC185'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    // Initialize Radar Chart
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Neural Activity',
                    'Memory Retention',
                    'Attention Span',
                    'Executive Function',
                    'Analytical Engagement',
                    'Reflection Time',
                    'Verification Rate'
                ],
                datasets: [{
                    label: 'Current Profile',
                    data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }
}

function updateRiskGauge(score, level) {
    if (!riskGaugeChart) return;
    
    const colors = {
        minimal: '#1FB8CD',
        low: '#1FB8CD',
        moderate: '#D2BA4C',
        high: '#DB4545',
        severe: '#B4413C'
    };

    riskGaugeChart.data.datasets[0].data = [score, 1 - score];
    riskGaugeChart.data.datasets[0].backgroundColor = [colors[level], '#f5f5f5'];
    riskGaugeChart.update();
}

function updateRulesChart(firedRules) {
    if (!rulesChart) return;
    
    const labels = firedRules.map(rule => rule.rule_id);
    const data = firedRules.map(rule => rule.activation);

    rulesChart.data.labels = labels;
    rulesChart.data.datasets[0].data = data;
    rulesChart.update();
}

function updateRadarChart(data) {
    if (!radarChart) return;
    
    const radarData = [
        data.neural_activity || 0.5,
        data.memory_retention || 0.5,
        data.attention_span || 0.5,
        data.executive_function || 0.5,
        data.analytical_engagement || 0.5,
        data.reflection_time || 0.5,
        data.verification_rate || 0.5
    ];

    radarChart.data.datasets[0].data = radarData;
    radarChart.update();
}

// Make loadScenario available globally for the preset buttons
window.loadScenario = loadScenario;