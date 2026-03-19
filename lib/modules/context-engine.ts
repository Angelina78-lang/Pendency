import { ParsedInput, EntityType } from './types';

export interface ContextInfo {
    category: 'FAANG' | 'STARTUP' | 'MNC' | 'PSU' | 'ACADEMIC_EXAM' | 'GOV_SERVICE' | 'UNKNOWN';
    expectedResponseDaysIs: [number, number]; // Min, Max
    hiringPattern: string;
}

export class ContextEngine {
    private static FAANG_COMPANIES = ['google', 'amazon', 'facebook', 'meta', 'apple', 'netflix', 'microsoft'];
    private static MNC_COMPANIES = ['tcs', 'infosys', 'wipro', 'accenture', 'deloitte', 'ibm'];
    private static ACADEMIC_TERMS = ['exam', 'semester', 'grade', 'transcript', 'degree'];

    public static analyze(input: ParsedInput): ContextInfo {
        const text = input.originalText.toLowerCase();

        if (input.type === 'ACADEMIC') {
            return {
                category: 'ACADEMIC_EXAM',
                expectedResponseDaysIs: [30, 90], // Academic delays appear long
                hiringPattern: 'Fixed Schedule'
            };
        }

        if (input.type === 'GOVERNMENT') {
            return {
                category: 'GOV_SERVICE',
                expectedResponseDaysIs: [45, 180],
                hiringPattern: 'Highly Bureaucratic'
            };
        }

        // Corporate Logic
        if (this.FAANG_COMPANIES.some(c => text.includes(c))) {
            return {
                category: 'FAANG',
                expectedResponseDaysIs: [14, 45],
                hiringPattern: 'Selective, Multiple Rounds'
            };
        }

        if (this.MNC_COMPANIES.some(c => text.includes(c))) {
            return {
                category: 'MNC',
                expectedResponseDaysIs: [7, 21],
                hiringPattern: 'Volume Hiring, Automated'
            };
        }

        // Default to Startup/Other
        return {
            category: 'STARTUP',
            expectedResponseDaysIs: [3, 14],
            hiringPattern: 'Fast, Agile, Often Ghosting'
        };
    }
}
