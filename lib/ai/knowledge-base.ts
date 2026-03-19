import { EntityType } from "../modules/types";

interface Rule {
    min: number;
    max: number;
    source: string;
    confidence: number;
}

export const RULE_DATABASE: Record<string, Record<string, Rule>> = {
    ACADEMIC: {
        "UGC Results": { min: 45, max: 60, source: "UGC Gazette Update", confidence: 0.98 },
        "Transcripts": { min: 15, max: 32, source: "University Ordinance 2025", confidence: 0.95 },
        "Admissions": { min: 7, max: 21, source: "Common App Data", confidence: 0.90 },
        "Degree Certificate": { min: 30, max: 90, source: "Convocation Guidelines", confidence: 0.92 }
    },
    SCHOLARSHIP: {
        "NSP": { min: 120, max: 240, source: "NSP Annual Report", confidence: 0.95 },
        "Post-Matric": { min: 90, max: 180, source: "Social Welfare Dept", confidence: 0.90 },
        "Research Grant": { min: 60, max: 120, source: "UGC/CSIR Guidelines", confidence: 0.88 },
        "Fellowship": { min: 30, max: 60, source: "DST Norms", confidence: 0.90 }
    },
    JOB: {
        "FAANG": { min: 14, max: 42, source: "Levels.fyi H2 2025", confidence: 0.92 },
        "Startup": { min: 3, max: 14, source: "YCombinator Hiring Data", confidence: 0.85 },
        "PSU": { min: 90, max: 180, source: "RTI Repositories", confidence: 0.98 },
        "Government Job": { min: 60, max: 120, source: "UPSC/SSC Gazette", confidence: 0.95 },
        "MNC": { min: 21, max: 45, source: "Industry Standards", confidence: 0.88 },
        // New Job patterns
        "Offer Letter": { min: 7, max: 21, source: "Company HR Policy", confidence: 0.90 },
        "Onboarding Process": { min: 14, max: 30, source: "Industry Best Practices", confidence: 0.87 }
    },
    GOV: {
        "RTI": { min: 0, max: 30, source: "RTI Act 2005 (Deemed Refusal)", confidence: 1.0 },
        "Passport": { min: 15, max: 30, source: "MEA Passport Seva", confidence: 0.97 },
        "Driving License": { min: 30, max: 45, source: "Motor Vehicles Act", confidence: 0.94 },
        "Voter ID": { min: 30, max: 60, source: "ECI Citizen Charter", confidence: 0.92 },
        "Pan Card": { min: 10, max: 20, source: "Income Tax Dept", confidence: 0.96 }
    },
    VISA: {
        "eVisa": { min: 4, max: 21, source: "Immigration Bureau", confidence: 0.96 },
        "H1B": { min: 60, max: 180, source: "USCIS Historical Processing", confidence: 0.92 },
        "Student Visa": { min: 15, max: 60, source: "Embassy Guidelines", confidence: 0.88 },
        "Tourist Visa": { min: 7, max: 14, source: "Travel Advisories", confidence: 0.85 }
    },
    HEALTH: {
        "Medical Report": { min: 1, max: 3, source: "NABH Standards", confidence: 0.92 },
        "Insurance Claim": { min: 15, max: 30, source: "IRDAI Regulations 2024", confidence: 0.95 },
        "Appointment": { min: 0, max: 7, source: "OPD Guidelines", confidence: 0.80 }
    },
    LEGAL: {
        "Court Case Listing": { min: 30, max: 90, source: "Supreme Court Practice", confidence: 0.85 },
        "FIR Copy": { min: 1, max: 3, source: "CrPC Section 154", confidence: 0.98 },
        "Bail Hearing": { min: 1, max: 7, source: "Judicial Precedents", confidence: 0.90 }
    },
    REAL_ESTATE: {
        "Possession": { min: 365, max: 1095, source: "RERA Guidelines", confidence: 0.90 },
        "Registry": { min: 15, max: 45, source: "Registration Act", confidence: 0.92 }
    },
    FINANCE: {
        "Loan Sanction": { min: 7, max: 21, source: "RBI Fair Practice Code", confidence: 0.92 },
        "Credit Card": { min: 7, max: 14, source: "Banking Ombudsman", confidence: 0.94 }
    },
    // GLOBAL Patterns (International & Foreign Campuses)
    GLOBAL_ACADEMIC: {
        "International Admission": { min: 30, max: 90, source: "QS World Rankings Data", confidence: 0.94 },
        "Foreign Campus India": { min: 14, max: 45, source: "UGC Foreign Campus Regulations", confidence: 0.90 }
    },
    GLOBAL_SCHOLARHIP: {
        "Fulbright/Chevening": { min: 90, max: 180, source: "Official Scholarship Timelines", confidence: 0.96 },
        "Erasmus Mundus": { min: 60, max: 120, source: "EU Education Commission", confidence: 0.92 }
    },
    GLOBAL_VISA: {
        "Schengen": { min: 15, max: 45, source: "VFS Global Alerts", confidence: 0.91 },
        "US Student (F1)": { min: 30, max: 60, source: "US Travel Docs", confidence: 0.95 }
    },
    // ULTRA-COMPLEX EDGE CASES (New)
    HIGH_RISK_GOV: {
        "Deemed Refusal": { min: 30, max: 30, source: "RTI Act Section 7(1)", confidence: 1.0 }, // Immediate Penalty
        "Governor Assent": { min: 30, max: 60, source: "Constitution Article 200", confidence: 0.95 },
        "Information Commission": { min: 180, max: 1095, source: "CIC Annual Report (3yr Backlog)", confidence: 0.90 }
    },
    HIGH_RISK_VISA: {
        "221g Admin Processing": { min: 60, max: 180, source: "US DOS FAM Guidelines", confidence: 0.88 },
        "Golden Visa": { min: 7, max: 30, source: "UAE GDRFA", confidence: 0.92 }
    },
    HIGH_RISK_JOB: {
        "Mass Hiring": { min: 30, max: 90, source: "Naukri/LinkedIn Aggregated Data", confidence: 0.85 }, // TCS/Wipro pattern
        "Fake Job": { min: -1, max: -1, source: "User Reports", confidence: 0.99 } // Immediate Flag
    }
};

export const CONTEXT_KEYWORDS: Record<string, EntityType> = {
    "university": "ACADEMIC", "college": "ACADEMIC", "transcript": "ACADEMIC", "btech": "ACADEMIC", "exam": "ACADEMIC", "degree": "ACADEMIC", "results": "ACADEMIC",
    "scholarship": "SCHOLARSHIP", "fellowship": "SCHOLARSHIP", "grant": "SCHOLARSHIP", "stipend": "SCHOLARSHIP", "funding": "SCHOLARSHIP",
    "job": "JOB", "hiring": "JOB", "interview": "JOB", "offer": "JOB", "salary": "JOB", "faang": "JOB", "startup": "JOB", "mnc": "JOB", "psu": "JOB", "recruitment": "JOB",
    "visa": "VISA", "embassy": "VISA", "immigration": "VISA", "permit": "VISA", "consulate": "VISA",
    "rti": "GOV", "government": "GOV", "official": "GOV", "license": "GOV", "voter": "GOV", "id card": "GOV", "pan card": "GOV", "ration": "GOV", "passport": "GOV",
    "medical": "HEALTH", "hospital": "HEALTH", "insurance": "HEALTH", "claim": "HEALTH", "report": "HEALTH", "doctor": "HEALTH", "patient": "HEALTH",
    "court": "LEGAL", "case": "LEGAL", "lawyer": "LEGAL", "bail": "LEGAL", "fir": "LEGAL", "police": "LEGAL", "justice": "LEGAL",
    "flat": "REAL_ESTATE", "apartment": "REAL_ESTATE", "builder": "REAL_ESTATE", "possession": "REAL_ESTATE", "registry": "REAL_ESTATE", "property": "REAL_ESTATE",
    "loan": "FINANCE", "bank": "FINANCE", "credit": "FINANCE", "card": "FINANCE", "emi": "FINANCE", "mortgage": "FINANCE"
};
