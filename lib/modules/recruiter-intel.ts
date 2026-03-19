import { ContextInfo } from './context-engine';

export interface RecruiterInfo {
    name: string;
    score: number;
    recommendedChannel: 'LinkedIn' | 'Email' | 'Twitter';
}

export class RecruiterIntelligence {
    // Mock Database of recruiters
    private static RECRUITERS = [
        { name: "Priya @ Google", company: "google", score: 85, channel: "LinkedIn" },
        { name: "Rohan @ Google", company: "google", score: 20, channel: "Email" },
        { name: "Sarah @ Amazon", company: "amazon", score: 92, channel: "Email" },
        { name: "HR Generic @ TCS", company: "tcs", score: 10, channel: "Portal" }
    ];

    public static findRecruiters(companyName: string): RecruiterInfo[] {
        const lowerComp = companyName.toLowerCase();

        // Filter mock DB
        const matches = this.RECRUITERS.filter(r => lowerComp.includes(r.company));

        if (matches.length === 0) return [];

        // Sort by score (responsiveness)
        return matches.sort((a, b) => b.score - a.score).map(r => ({
            name: r.name,
            score: r.score,
            recommendedChannel: r.channel as any
        }));
    }
}
