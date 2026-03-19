import { ContextInfo } from './context-engine';

export interface InstitutionHealth {
    score: number; // 0-100
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    verdict: string;
}

export class CompanyHealthScore {
    public static calculate(context: ContextInfo, avgResponseTime: number): InstitutionHealth {
        // Base score starts at 100
        let score = 100;

        // Penalize for long response times
        // Thresholds depend on context
        const [minExpected, maxExpected] = context.expectedResponseDaysIs;

        if (avgResponseTime > maxExpected) {
            const diff = avgResponseTime - maxExpected;
            score -= (diff * 2); // 2 points per day overdue
        }

        // Hiring pattern penalties
        if (context.hiringPattern.includes('Ghosting')) score -= 20;
        if (context.hiringPattern.includes('Bureaucratic')) score -= 10;

        // Clamp
        score = Math.max(0, Math.min(100, score));

        return {
            score,
            grade: this.getGrade(score),
            verdict: this.getVerdict(score)
        };
    }

    private static getGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
        if (score >= 95) return 'A+';
        if (score >= 85) return 'A';
        if (score >= 70) return 'B';
        if (score >= 50) return 'C';
        if (score >= 35) return 'D';
        return 'F';
    }

    private static getVerdict(score: number): string {
        if (score >= 85) return "Highly Responsive & Professional";
        if (score >= 70) return "Average Response Time";
        if (score >= 50) return "Delayed - Follow-up Recommended";
        return "Severe Ghosting Risk - Avoid";
    }
}
