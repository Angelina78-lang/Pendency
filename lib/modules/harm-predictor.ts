import { ParsedInput } from './types';
import { SilenceAnalysis } from './silence-calculator';

export interface HarmAnalysis {
    financialLoss: number; // in INR
    timeWastedHours: number;
    skillDegradationRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    missedOpportunities: number;
}

export class HarmPredictor {
    // Assumptions for MVP
    private static AVG_entry_salary = 600000; // 6LPA
    private static AVG_mid_salary = 1800000; // 18LPA
    private static AVG_faang_salary = 3500000; // 35LPA

    public static predict(input: ParsedInput, silence: SilenceAnalysis): HarmAnalysis {
        const salaryBase = this.getSalaryBase(input);
        const dailyLoss = salaryBase / 365;

        const financialLoss = Math.floor(dailyLoss * silence.daysSilent);

        // Skill degradation kicks in after ~60 days of inactivity/waiting
        let skillRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
        if (silence.daysSilent > 90) skillRisk = 'HIGH';
        else if (silence.daysSilent > 45) skillRisk = 'MEDIUM';

        return {
            financialLoss,
            timeWastedHours: silence.daysSilent * 2, // Assuming 2 hrs/day anxiety/checking
            skillDegradationRisk: skillRisk,
            missedOpportunities: Math.floor(silence.daysSilent / 14) // 1 opportunity every 2 weeks lost
        };
    }

    private static getSalaryBase(input: ParsedInput): number {
        const text = input.originalText.toLowerCase();
        if (text.includes('sde') || text.includes('engineer') || text.includes('developer')) {
            if (text.includes('principle') || text.includes('lead')) return 4500000;
            if (text.includes('senior') || text.includes('sde2')) return this.AVG_faang_salary;
            return this.AVG_mid_salary;
        }
        if (text.includes('manager') || text.includes('lead')) return 2500000;
        return this.AVG_entry_salary;
    }
}
