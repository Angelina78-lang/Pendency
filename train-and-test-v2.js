// Native fetch in Node 18+
async function queryAI(text) {
    try {
        const response = await fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text, context: "CORPORATE" }) // Context is optional now as we auto-detect
        });
        return await response.json();
    } catch (e) { return { error: e.message }; }
}

async function runTests() {
    console.log("🧪 STARTING PENDENCY AI DIVERSITY TRAINING AUDIT...\n");

    const tests = [
        { cat: "ACADEMIC", query: "Degree Certificate not received after 4 months of convocation", expected: "ACADEMIC / ~120 days" },
        { cat: "SCHOLARSHIP", query: "NSP Scholarship pending for 6 months verified by institute", expected: "SCHOLARSHIP / ~180 days" },
        { cat: "JOB", query: "Offered at Google L4, background check pending for 3 weeks", expected: "JOB / ~21 days" },
        { cat: "GOV", query: "Passport police verification stuck for 2 months", expected: "GOV / ~60 days / Passport" },
        { cat: "VISA", query: "US Student VISA rejected twice, now stuck in admin processing for 90 days", expected: "VISA / ~90 days / Student" },
        { cat: "HEALTH", query: "Insurance Claim for surgery denied, appealed 40 days ago", expected: "HEALTH / ~40 days / Insurance" },
        { cat: "LEGAL", query: "FIR copy not provided by police station for 7 days", expected: "LEGAL / ~7 days / FIR" },
        { cat: "REAL_ESTATE", query: "Builder possession delayed by 2 years RERA complaint filed", expected: "REAL_ESTATE / ~730 days / Possession" },
        { cat: "FINANCE", query: "Home Loan sanction letter pending from SBI for 25 days", expected: "FINANCE / ~25 days / Loan" },

        // Edge Cases
        { cat: "MIXED", query: "My university job credentials stuck for visa processing", expected: "VISA (Priority) or JOB?" },
        { cat: "VAGUE", query: "submitted 10 days ago", expected: "Unknown / ~10 days" }
    ];

    let passed = 0;

    for (const t of tests) {
        console.log(`--- TEST: ${t.cat} ---`);
        console.log(`🔎 Query: "${t.query}"`);

        const res = await queryAI(t.query);

        if (res.error) {
            console.log("❌ ERROR:", res.error);
            continue;
        }

        console.log(`📊 AI Analysis:`);
        console.log(`   • Institution: ${res.institution} (${res.silence_type})`);
        console.log(`   • Days Silent: ${res.current_days}`);
        console.log(`   • Norm: ${res.expected_range.min}-${res.expected_range.max} days`);
        console.log(`   • Risk: ${res.risk_score.label} (${res.deviation_sigma}σ)`);
        console.log(`   • Action: "${res.recommended_action.primary}"`);
        console.log("\n");
        passed++;
    }

    console.log(`✅ COMPLETED: ${passed}/${tests.length} Scenarios Run.`);
}

runTests();
