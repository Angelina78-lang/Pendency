import { ContextInfo } from './context-engine';
import { SilenceAnalysis } from './silence-calculator';

export interface NegotiationStrategy {
    estimatedRange: [number, number]; // LPA
    leverageScore: number; // 0-10
    advice: string;
}

export class SalaryNegotiation {
    public static calculateLeverage(context: ContextInfo, silence: SilenceAnalysis, role: string): NegotiationStrategy {
        let leverage = 5; // Neutral start

        // Context Logic
        if (context.category === 'FAANG') leverage += 2; // High demand skills usually
        if (context.category === 'STARTUP') leverage -= 1; // Budget constraints

        // Silence Logic
        // If they return after a LONG silence, they might have failed with candidate A
        if (silence.daysSilent > 21) leverage += 2;

        // If silence is HUGE, they might be disorganized, so leverage is high but risk is high
        if (silence.daysSilent > 45) leverage += 1;

        // Role Logic
        if (role.toLowerCase().includes('lead') || role.toLowerCase().includes('senior')) leverage += 1;

        // Cap
        leverage = Math.min(10, Math.max(0, leverage));

        // Range Estimation (Mock)
        let base = 12; // 12LPA
        if (context.category === 'FAANG') base = 35;
        if (context.category === 'MNC') base = 8;

        return {
            estimatedRange: [base, base * 1.4],
            leverageScore: leverage,
            advice: this.getAdvice(leverage)
        };
    }

    private static getAdvice(score: number): string {
        if (score >= 8) return "Strong position. They likely lost their top choice. Push for top of band.";
        if (score >= 5) return "Neutral position. Standard negotiation tactics apply.";
        return "Weak position. Focus on securing the offer first.";
    }
}
