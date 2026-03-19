// Native fetch in Node 18+
async function queryAI(text, context) {
    try {
        const response = await fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text, context: context })
        });
        return await response.json();
    } catch (e) { return { error: e.message }; }
}

async function runTests() {
    console.log("🧪 STARTING PENDENCY AI ACCURACY AUDIT...\n");

    const tests = [
        {
            name: "✅ Normal Academic Case",
            query: "Delhi University transcript submitted 20 days ago",
            context: "ACADEMIC",
            expected: "SAFE (Within 15-30 day norm)"
        },
        {
            name: "⚠️ Critical Academic Delay",
            query: "Delhi University transcript submitted 100 days ago",
            context: "ACADEMIC",
            expected: "CRITICAL (>3 Sigma deviation)"
        },
        {
            name: "💼 Standard Job Application",
            query: "Applied to Amazon SDE 3 weeks ago", // ~21 days
            context: "JOB",
            expected: "SAFE/RISK (Norm 14-42 days)"
        },
        {
            name: "🛂 Visa Outlier",
            query: "H1B Visa application stuck for 300 days",
            context: "VISA",
            expected: "CRITICAL (Norm 60-180 days)"
        }
    ];

    for (const t of tests) {
        console.log(`--- TEST: ${t.name} ---`);
        console.log(`📝 Description: ${t.expected}`);
        console.log(`🔎 Query: "${t.query}"`);

        const res = await queryAI(t.query, t.context);

        if (res.error) {
            console.log("❌ ERROR:", res.error);
            continue;
        }

        console.log(`📊 AI Analysis:`);
        console.log(`   • Institution: ${res.institution} (${res.silence_type})`);
        console.log(`   • Days Silent: ${res.current_days}`);
        console.log(`   • Norm: ${res.expected_range.min}-${res.expected_range.max} days`);
        console.log(`   • Deviation: ${res.deviation_sigma}σ`);
        console.log(`   • Risk: ${res.risk_score.label} (${res.risk_score.value}/100)`);
        console.log(`   • Action: "${res.recommended_action.primary}"`);
        console.log("\n");
    }
}

runTests();
