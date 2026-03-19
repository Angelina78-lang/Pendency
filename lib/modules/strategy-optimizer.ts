import { ContextInfo } from './context-engine';
import { SilenceAnalysis } from './silence-calculator';
import { ActionStep } from './types';

export class StrategyOptimizer {
    public static getStrategy(context: ContextInfo, silence: SilenceAnalysis): ActionStep[] {
        const steps: ActionStep[] = [];
        const { riskLevel, daysSilent } = silence;
        const { category } = context;

        // 1. Initial follow-up
        if (daysSilent > 7 && daysSilent < 14) {
            steps.push({
                title: "Gentle Nudge",
                description: "Send a polite follow-up reiterating interest.",
                priority: "HIGH",
                template: "Hi [Name], just checking on the status of my application for [Role]..."
            });
        }

        // 2. High Risk / Ghosting
        if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') {
            steps.push({
                title: "Pivot Strategy",
                description: "This application is likely dead. Apply to 3 competitors immediately.",
                priority: "CRITICAL"
            });

            if (category === 'FAANG') {
                steps.push({
                    title: "Recruiter Switch",
                    description: "Contact a different recruiter on LinkedIn for the same role.",
                    priority: "HIGH"
                });
            }
        }

        // 3. Negotiation Prep
        if (riskLevel === 'LOW' && daysSilent < 5 && context.category !== 'GOV_SERVICE') {
            steps.push({
                title: "Salary Benchmark",
                description: "Prepare salary data while waiting. You have leverage.",
                priority: "LOW"
            });
        }

        return steps;
    }
}
