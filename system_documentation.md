
# NeuroSymbolic Cognitive Decline Analysis System

## System Overview
This system implements a NeuroSymbolic AI approach to study cognitive decline due to long-term AI usage, based on recent research findings.

### Architecture Components:
1. **Neural Component**: Pattern recognition and feature extraction
2. **Symbolic Component**: Rule-based reasoning and logical inference  
3. **Fuzzy Logic Engine**: Handles uncertainty and partial truth values
4. **Integration Layer**: Combines neural and symbolic outputs

### Configuration (From Excel):
- **Cognitive Indicators**: 10 research-based indicators
- **Usage Patterns**: 10 AI usage patterns
- **Reasoning Rules**: 8 neurosymbolic rules
- **Research Sources**: 6 peer-reviewed studies

### Key Research Sources:
1. MIT Media Lab (2025): "Your Brain on ChatGPT" - EEG studies showing diminished neural activity
2. SBS Swiss Business School (2025): Cognitive offloading and critical thinking decline
3. PMC Studies (2024): Effects of generative AI on cognitive effort
4. Nature (2024): Multimodal deep learning for cognitive decline prediction

### Analysis Capabilities:
- **Risk Assessment**: 5-level risk categorization (minimal to severe)
- **Temporal Analysis**: Tracks changes over time
- **Explainable AI**: Full reasoning trace and explanations
- **Personalized Recommendations**: Based on individual risk profiles

### Validation Results:
The system was tested on three scenarios with different risk profiles:
- **High Risk**: Score 0.674, 6 rules fired, severe recommendations
- **Moderate Risk**: Score 0.200, balanced assessment  
- **Low Risk**: Score 0.101, preventive recommendations

### Technical Implementation:
- **Language**: Python with pandas, numpy
- **Configuration**: Excel-based (no hardcoded parameters)
- **Logic Engine**: Fuzzy logic with temporal reasoning
- **Rule Format**: Natural language with automated parsing
- **Output**: Structured JSON with full traceability

### Files Generated:
1. `neurosymbolic_cognitive_decline_config.xlsx` - System configuration
2. `neurosymbolic_analysis_results.json` - Analysis results
3. `cognitive_indicators_analysis.csv` - Detailed indicator analysis
4. `rules_effectiveness_analysis.csv` - Rule performance metrics
