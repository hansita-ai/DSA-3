// BACKEND CONNECTION SNIPPETS
// Backend must be running at http://127.0.0.1:5000

async function runKMPBackend(text, pattern) {
    const response = await fetch("http://127.0.0.1:5000/api/kmp", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text, pattern})
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "KMP request failed");
    return data;
}

async function runZBackend(text, pattern) {
    const response = await fetch("http://127.0.0.1:5000/api/z", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text, pattern})
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Z-Function request failed");
    return data;
}

async function runNeedlemanWunschBackend(sequenceA, sequenceB, match, mismatch, gap) {
    const response = await fetch("http://127.0.0.1:5000/api/needleman-wunsch", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            sequenceA,
            sequenceB,
            match,
            mismatch,
            gap
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Needleman-Wunsch request failed");
    return data;
}
