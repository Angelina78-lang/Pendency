import { ContextInfo } from './context-engine';

export interface TimelineData {
    averageResponseTime: number;
    standardDeviation: number;
    ninetyFifthPercentile: number;
}

export class TimelineIntelligence {
    // Mock Data - In production this comes from DB aggregation
    private static DATASET: Record<string, TimelineData> = {
        'FAANG': { averageResponseTime: 21, standardDeviation: 7, ninetyFifthPercentile: 45 },
        'MNC': { averageResponseTime: 14, standardDeviation: 5, ninetyFifthPercentile: 30 },
        'STARTUP': { averageResponseTime: 7, standardDeviation: 3, ninetyFifthPercentile: 14 },
        'ACADEMIC_EXAM': { averageResponseTime: 60, standardDeviation: 15, ninetyFifthPercentile: 120 },
        'GOV_SERVICE': { averageResponseTime: 90, standardDeviation: 30, ninetyFifthPercentile: 180 },
        'UNKNOWN': { averageResponseTime: 14, standardDeviation: 10, ninetyFifthPercentile: 45 },
    };

    public static getExpectedTimeline(context: ContextInfo): TimelineData {
        return this.DATASET[context.category] || this.DATASET['UNKNOWN'];
    }

    public static isDelayed(daysSinceApplication: number, context: ContextInfo): boolean {
        const data = this.getExpectedTimeline(context);
        // If we exceed average + 1 SD, we consider it "Delayed" / "Silence Starting"
        return daysSinceApplication > (data.averageResponseTime + data.standardDeviation);
    }

    public static isGhosted(daysSinceApplication: number, context: ContextInfo): boolean {
        const data = this.getExpectedTimeline(context);
        // If we exceed 95th percentile, it's likely ghosting
        return daysSinceApplication > data.ninetyFifthPercentile;
    }
}
