// Native fetch in Node 18+

async function testApi() {
    try {
        console.log("Testing API...");
        const response = await fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: "Delhi University transcript application submitted 45 days ago",
                context: "ACADEMIC"
            })
        });

        const status = response.status;
        console.log(`Status: ${status}`);

        const text = await response.text();
        console.log("Response Body:", text);

    } catch (error) {
        console.error("Error:", error);
    }
}

testApi();
