const BACKEND_URL = "http://127.0.0.1:5000";

// ==================== NAVIGATION ====================

function openAnalyzer() {
    document.getElementById("analyzer").scrollIntoView({
        behavior: "smooth"
    });
}


// ==================== SELECT ALGORITHM ====================

function selectAlgorithm(algorithm, button) {
    document.querySelectorAll(".algorithm-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    button.classList.add("active");

    ["kmpPanel", "zPanel", "nwPanel"].forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    const title = document.getElementById("algorithmTitle");

    if (algorithm === "kmp") {
        document.getElementById("kmpPanel").classList.remove("hidden");
        title.textContent = "KMP PATTERN MATCHING";
    }

    if (algorithm === "z") {
        document.getElementById("zPanel").classList.remove("hidden");
        title.textContent = "Z-FUNCTION PATTERN SEARCH";
    }

    if (algorithm === "nw") {
        document.getElementById("nwPanel").classList.remove("hidden");
        title.textContent = "NEEDLEMAN–WUNSCH GLOBAL ALIGNMENT";
    }

    resetResult();
}


// ==================== RESET RESULT ====================

function resetResult() {
    document.getElementById("resultBox").innerHTML = `
        <div class="empty-result">
            <div class="empty-icon">⌬</div>
            <h3>Ready for analysis</h3>
            <p>Your algorithm output will appear here.</p>
        </div>
    `;
}


// ==================== KMP BACKEND ====================

async function demoKMP() {

    const text = document.getElementById("kmpText").value.trim().toUpperCase();
    const pattern = document.getElementById("kmpPattern").value.trim().toUpperCase();
    const resultBox = document.getElementById("resultBox");

    if (!text || !pattern) {
        alert("Please enter both sequence and pattern.");
        return;
    }

    resultBox.innerHTML = `
        <div class="empty-result">
            <h3>Analyzing...</h3>
            <p>Connecting to KMP backend.</p>
        </div>
    `;

    try {

        const response = await fetch(`${BACKEND_URL}/api/kmp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                pattern: pattern
            })
        });

        const data = await response.json();

        resultBox.innerHTML = `
            <div class="result-title">
                <h3>KMP Pattern Search</h3>
                <span class="badge">${data.matches} MATCHES</span>
            </div>

            <div style="font-family:DM Mono;color:#b7f6e4;line-height:2">

                <p>
                    <b style="color:#55e9b8">TEXT:</b>
                    ${data.text}
                </p>

                <p>
                    <b style="color:#55e9b8">PATTERN:</b>
                    ${data.pattern}
                </p>

                <p>
                    <b style="color:#55e9b8">MATCH POSITIONS:</b>
                    ${data.positions.length
                        ? data.positions.join(", ")
                        : "No match found"}
                </p>

                <p>
                    <b style="color:#55e9b8">LPS ARRAY:</b>
                    ${data.lps.join(", ")}
                </p>

                <p style="margin-top:15px;color:#71857e">
                    KMP analysis completed using the backend.
                </p>

            </div>
        `;

    } catch (error) {

        resultBox.innerHTML = `
            <div class="empty-result">
                <h3>Backend Connection Error</h3>
                <p>Make sure the Flask backend is running.</p>
            </div>
        `;

        console.error(error);
    }
}


// ==================== Z-FUNCTION BACKEND ====================

async function demoZFunction() {

    const text = document.getElementById("zText").value.trim().toUpperCase();
    const pattern = document.getElementById("zPattern").value.trim().toUpperCase();
    const resultBox = document.getElementById("resultBox");

    if (!text || !pattern) {
        alert("Please enter both sequence and pattern.");
        return;
    }

    resultBox.innerHTML = `
        <div class="empty-result">
            <h3>Analyzing...</h3>
            <p>Connecting to Z-Function backend.</p>
        </div>
    `;

    try {

        const response = await fetch(`${BACKEND_URL}/api/z`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                pattern: pattern
            })
        });

        const data = await response.json();

        resultBox.innerHTML = `
            <div class="result-title">
                <h3>Z-Function Pattern Search</h3>
                <span class="badge">${data.matches} MATCHES</span>
            </div>

            <div style="font-family:DM Mono;color:#b7f6e4;line-height:2">

                <p>
                    <b style="color:#55e9b8">TEXT:</b>
                    ${data.text}
                </p>

                <p>
                    <b style="color:#55e9b8">PATTERN:</b>
                    ${data.pattern}
                </p>

                <p>
                    <b style="color:#55e9b8">MATCH POSITIONS:</b>
                    ${data.positions.length
                        ? data.positions.join(", ")
                        : "No match found"}
                </p>

                <p>
                    <b style="color:#55e9b8">Z ARRAY:</b>
                    ${data.z_array.join(", ")}
                </p>

                <p style="margin-top:15px;color:#71857e">
                    Z-Function analysis completed using the backend.
                </p>

            </div>
        `;

    } catch (error) {

        resultBox.innerHTML = `
            <div class="empty-result">
                <h3>Backend Connection Error</h3>
                <p>Make sure the Flask backend is running.</p>
            </div>
        `;

        console.error(error);
    }
}


// ==================== NEEDLEMAN-WUNSCH BACKEND ====================

async function demoNeedlemanWunsch() {

    const sequenceA =
        document.getElementById("sequenceA").value.trim().toUpperCase();

    const sequenceB =
        document.getElementById("sequenceB").value.trim().toUpperCase();

    const match =
        Number(document.getElementById("matchScore").value);

    const mismatch =
        Number(document.getElementById("mismatchScore").value);

    const gap =
        Number(document.getElementById("gapScore").value);

    const resultBox = document.getElementById("resultBox");

    if (!sequenceA || !sequenceB) {
        alert("Please enter both sequences.");
        return;
    }

    resultBox.innerHTML = `
        <div class="empty-result">
            <h3>Analyzing...</h3>
            <p>Connecting to Needleman–Wunsch backend.</p>
        </div>
    `;

    try {

        const response = await fetch(
            `${BACKEND_URL}/api/needleman-wunsch`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sequenceA: sequenceA,
                    sequenceB: sequenceB,
                    match: match,
                    mismatch: mismatch,
                    gap: gap
                })
            }
        );

        const data = await response.json();

        resultBox.innerHTML = `
            <div class="result-title">
                <h3>Needleman–Wunsch Global Alignment</h3>
                <span class="badge">SCORE ${data.score}</span>
            </div>

            <div style="font-family:DM Mono;line-height:2;color:#bff7e7">

                <div style="
                    font-size:25px;
                    color:#54edb8;
                    margin-bottom:20px;
                ">
                    Alignment Score: ${data.score}
                </div>

                <p>
                    <b>Sequence A:</b>
                </p>

                <pre>${data.alignment_a}</pre>

                <p>
                    <b>Match Line:</b>
                </p>

                <pre style="color:#4de6b2">
${data.match_line}
                </pre>

                <p>
                    <b>Sequence B:</b>
                </p>

                <pre>${data.alignment_b}</pre>

                <p style="margin-top:12px;color:#6f837d;font-size:12px">
                    Match: ${data.match}
                    &nbsp;&nbsp;
                    Mismatch: ${data.mismatch}
                    &nbsp;&nbsp;
                    Gap: ${data.gap}
                </p>

            </div>
        `;

    } catch (error) {

        resultBox.innerHTML = `
            <div class="empty-result">
                <h3>Backend Connection Error</h3>
                <p>Make sure the Flask backend is running.</p>
            </div>
        `;

        console.error(error);
    }
}


// ==================== RESET ANALYZER ====================

function resetAnalyzer() {

    document.getElementById("kmpText").value =
        "ATGCGATGACCTAGATG";

    document.getElementById("kmpPattern").value =
        "ATG";

    document.getElementById("zText").value =
        "ATGCGATGACCTAGATG";

    document.getElementById("zPattern").value =
        "ATG";

    document.getElementById("sequenceA").value =
        "ACGT";

    document.getElementById("sequenceB").value =
        "AGT";

    document.getElementById("matchScore").value = 1;
    document.getElementById("mismatchScore").value = -1;
    document.getElementById("gapScore").value = -2;

    resetResult();
}