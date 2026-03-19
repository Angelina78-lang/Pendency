import { ParsedInput } from './types';
import { ContextInfo, ContextEngine } from './context-engine';
import { TimelineIntelligence } from './timeline-intel';

export interface SilenceAnalysis {
    daysSilent: number;
    sigmaScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    projectedGhostingProbability: number; // 0-1
}

export class SilenceCalculator {

    public static calculate(input: ParsedInput): SilenceAnalysis {
        const context = ContextEngine.analyze(input);
        const timeline = TimelineIntelligence.getExpectedTimeline(context);

        // Calculate Days Silent
        const applyDate = input.date || new Date(); // Fallback to now if no date (shouldn't happen in real app)
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - applyDate.getTime());
        const daysSilent = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate Sigma (Z-Score)
        // Formula: (Current - Mean) / SD
        const sigma = (daysSilent - timeline.averageResponseTime) / timeline.standardDeviation;

        // Calculate Probability (using Sigma)
        let probability = 0.5;
        if (sigma > 3) probability = 0.99; // Almost certainly ghosted
        else if (sigma > 2) probability = 0.95;
        else if (sigma > 1) probability = 0.84;
        else if (sigma < 0) probability = 0.10; // Early

        let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
        if (sigma > 3.0) risk = 'CRITICAL';
        else if (sigma > 2.0) risk = 'HIGH';
        else if (sigma > 1.0) risk = 'MEDIUM';

        return {
            daysSilent,
            sigmaScore: parseFloat(sigma.toFixed(2)),
            riskLevel: risk,
            projectedGhostingProbability: probability
        };
    }
}
