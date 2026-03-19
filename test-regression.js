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
    console.log("🧪 STARTING REGRESSION TESTS...\n");

    const tests = [
        {
            name: "LOWERCASE EXTRACTION",
            query: "applied to google sde 30 days ago",
            context: "JOB",
            expected: "Institution: Google"
        },
        {
            name: "COMPLEX DATE 'FOR'",
            query: "visa stuck for 300 days",
            context: "VISA",
            expected: "Days: ~300"
        }
    ];

    for (const t of tests) {
        console.log(`--- TEST: ${t.name} ---`);
        console.log(`🔎 Query: "${t.query}"`);

        const res = await queryAI(t.query, t.context);

        if (res.error) {
            console.log("❌ ERROR:", res.error);
            continue;
        }

        console.log(`📊 AI Analysis:`);
        console.log(`   • Institution: ${res.institution}`);
        console.log(`   • Days Silent: ${res.current_days}`);
        console.log("\n");
    }
}

runTests();
