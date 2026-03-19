export type EntityType = 'ACADEMIC' | 'SCHOLARSHIP' | 'JOB' | 'GOV' | 'HEALTH' | 'VISA' | 'LEGAL' | 'REAL_ESTATE' | 'FINANCE';
export type RiskLevel = 'SAFE' | 'RISK' | 'CRITICAL';

export interface IntelligenceEngineOutput {
  institution: string;
  silence_type: EntityType;
  submission_date: string; // YYYY-MM-DD
  current_days: number;
  expected_range: {
    min: number;
    max: number;
    confidence: number;
  };
  deviation_sigma: number;
  risk_score: {
    value: number; // 0-100
    label: RiskLevel;
  };
  risk_factors: {
    name: string;
    contribution: number; // 0-100%
  }[];
  recommended_action: {
    primary: string;
    success_prob: number;
  };
  time_to_critical: number | string;
  confidence: number;
  needs_human_review: boolean;
  evidence_sources: string[];
}

export interface ParsedInput {
  originalText: string;
  entityName?: string;
  roleOrSubject?: string;
  type: EntityType;
  date?: Date;
  status: string;
  confidence: number;
}
