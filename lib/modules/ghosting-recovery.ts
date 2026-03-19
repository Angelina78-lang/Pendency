import { ContextInfo } from './context-engine';

export interface RecoveryPlan {
    templates: { subject: string, body: string }[];
    backupAction: string;
}

export class GhostingRecovery {

    public static generatePlan(context: ContextInfo, candidateName: string, companyName: string): RecoveryPlan {
        const templates = [];

        // Template 1: Gentle Politeness
        templates.push({
            subject: `Following up on my application for [Role] - ${candidateName}`,
            body: `Hi [Name],\n\nI hope you're having a great week. I'm writing to perform a polite follow-up on my application for the [Role] position at ${companyName}. I remain very interested in the opportunity.\n\nBest,\n${candidateName}`
        });

        // Template 2: Value Add (The "I updated my portfolio" trick)
        templates.push({
            subject: `Update regarding my application - ${candidateName}`,
            body: `Hi [Name],\n\nSince I applied, I've completed a new project relevant to the [Assumed Stack] at ${companyName}. I thought it might be worth sharing: [Link].\n\nBest,\n${candidateName}`
        });

        return {
            templates,
            backupAction: "Apply to 3 similar companies on LinkedIn immediately using the 'Easy Apply' filter to regain momentum."
        };
    }
}
