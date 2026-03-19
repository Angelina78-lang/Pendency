import { ParsedInput, EntityType } from './types';

export class MultimodalParser {
    private static ACADEMIC_KEYWORDS = ['university', 'college', 'exam', 'transcript', 'semester', 'du', 'ignou', 'aiims'];
    private static GOV_KEYWORDS = ['ministry', 'department', 'rti', 'passport', 'visa', 'mcd', 'dda', 'police'];
    private static JOB_KEYWORDS = ['hiring', 'recruiter', 'application', 'interview', 'offer', 'referral', 'hr', 'sde', 'manager'];

    public static parse(text: string): ParsedInput {
        const lowerText = text.toLowerCase();

        // Determine Type
        let type: EntityType = 'CORPORATE'; // Default
        if (this.ACADEMIC_KEYWORDS.some(k => lowerText.includes(k))) type = 'ACADEMIC';
        else if (this.GOV_KEYWORDS.some(k => lowerText.includes(k))) type = 'GOVERNMENT';

        // Extract Date
        const date = this.extractDate(text);

        return {
            originalText: text,
            type,
            entityName: this.extractEntity(text),
            roleOrSubject: this.extractRole(text),
            date,
            status: 'SILENT',
            confidence: 0.8
        };
    }

    private static extractDate(text: string): Date | undefined {
        const currentYear = new Date().getFullYear();
        // Match day/month/year or day month or month day
        // 12/10/2023, 12 Oct, Oct 12
        const dateMatch = text.match(/(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2})/i);

        if (dateMatch) {
            try {
                let dateStr = dateMatch[0];
                // If year is missing, add current year
                if (!dateStr.match(/\d{4}/)) {
                    dateStr += ` ${currentYear}`;
                }
                const d = new Date(dateStr);
                return isNaN(d.getTime()) ? undefined : d;
            } catch (e) {
                return undefined;
            }
        }
        return undefined;
    }

    private static extractEntity(text: string): string | undefined {
        // 1. Look for "Applied to [Entity]"
        const appliedToMatch = text.match(/applied\s+to\s+([A-Z][a-zA-Z0-9&]+)/i);
        if (appliedToMatch) return appliedToMatch[1];

        // 2. Mock list
        const KNOWN_ENTITIES = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple', 'Netflix', 'TCS', 'Infosys', 'Wipro', 'Delhi University', 'JNU', 'IIT'];
        for (const entity of KNOWN_ENTITIES) {
            if (text.toLowerCase().includes(entity.toLowerCase())) return entity;
        }

        // 3. Simple Capitalized word heuristic
        const words = text.split(' ');
        for (const word of words) {
            if (word[0] === word[0].toUpperCase() && word.length > 2 && !this.JOB_KEYWORDS.includes(word.toLowerCase())) {
                return word.replace(/[^a-zA-Z]/g, '');
            }
        }
        return "Unknown Entity";
    }

    private static extractRole(text: string): string | undefined {
        const roleMatch = text.match(/([a-zA-Z0-9]+)\s+role/i);
        if (roleMatch) return roleMatch[1];

        const roleMatch2 = text.match(/role\s+of\s+([a-zA-Z0-9]+)/i);
        if (roleMatch2) return roleMatch2[1];

        return "Applicant";
    }
}
