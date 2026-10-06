from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# -------------------------
# KMP STRING MATCHING
# -------------------------
def compute_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1

    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    return lps


def kmp_search(text, pattern):
    if not pattern:
        return []

    lps = compute_lps(pattern)
    positions = []
    i = 0
    j = 0

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1

            if j == len(pattern):
                positions.append(i - j)
                j = lps[j - 1]
        elif j:
            j = lps[j - 1]
        else:
            i += 1

    return positions


# -------------------------
# Z-FUNCTION
# -------------------------
def calculate_z_array(s):
    z = [0] * len(s)
    left = 0
    right = 0

    for i in range(1, len(s)):
        if i <= right:
            z[i] = min(right - i + 1, z[i - left])

        while i + z[i] < len(s) and s[z[i]] == s[i + z[i]]:
            z[i] += 1

        if i + z[i] - 1 > right:
            left = i
            right = i + z[i] - 1

    return z


def z_search(text, pattern):
    if not pattern:
        return [], []

    separator = "$"
    # Use a separator that does not occur in either input.
    for candidate in ["$", "#", "|", "@", "%"]:
        if candidate not in text and candidate not in pattern:
            separator = candidate
            break

    combined = pattern + separator + text
    z = calculate_z_array(combined)
    positions = []

    for i in range(len(pattern) + 1, len(z)):
        if z[i] >= len(pattern):
            positions.append(i - len(pattern) - 1)

    return positions, z


# -------------------------
# NEEDLEMAN-WUNSCH
# -------------------------
def needleman_wunsch(sequence_a, sequence_b, match, mismatch, gap):
    rows = len(sequence_a) + 1
    cols = len(sequence_b) + 1

    matrix = [[0] * cols for _ in range(rows)]

    for i in range(1, rows):
        matrix[i][0] = matrix[i - 1][0] + gap

    for j in range(1, cols):
        matrix[0][j] = matrix[0][j - 1] + gap

    for i in range(1, rows):
        for j in range(1, cols):
            diagonal = matrix[i - 1][j - 1] + (
                match if sequence_a[i - 1] == sequence_b[j - 1] else mismatch
            )
            up = matrix[i - 1][j] + gap
            left = matrix[i][j - 1] + gap

            matrix[i][j] = max(diagonal, up, left)

    i = len(sequence_a)
    j = len(sequence_b)
    aligned_a = []
    aligned_b = []

    while i > 0 or j > 0:
        if (
            i > 0
            and j > 0
            and matrix[i][j]
            == matrix[i - 1][j - 1]
            + (match if sequence_a[i - 1] == sequence_b[j - 1] else mismatch)
        ):
            aligned_a.append(sequence_a[i - 1])
            aligned_b.append(sequence_b[j - 1])
            i -= 1
            j -= 1
        elif i > 0 and matrix[i][j] == matrix[i - 1][j] + gap:
            aligned_a.append(sequence_a[i - 1])
            aligned_b.append("-")
            i -= 1
        else:
            aligned_a.append("-")
            aligned_b.append(sequence_b[j - 1])
            j -= 1

    aligned_a.reverse()
    aligned_b.reverse()

    alignment_a = "".join(aligned_a)
    alignment_b = "".join(aligned_b)

    match_line = "".join(
        "|" if a == b else (" " if a == "-" or b == "-" else ".")
        for a, b in zip(alignment_a, alignment_b)
    )

    return {
        "score": matrix[-1][-1],
        "alignment_a": alignment_a,
        "match_line": match_line,
        "alignment_b": alignment_b,
        "matrix": matrix,
        "match": match,
        "mismatch": mismatch,
        "gap": gap,
    }


# -------------------------
# ROUTES
# -------------------------
@app.get("/")
def home():
    return jsonify({
        "message": "SequenceLab Backend is running",
        "endpoints": [
            "POST /api/kmp",
            "POST /api/z",
            "POST /api/needleman-wunsch"
        ]
    })


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/kmp")
def api_kmp():
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip().upper()
    pattern = str(data.get("pattern", "")).strip().upper()

    if not text or not pattern:
        return jsonify({"error": "Both text and pattern are required."}), 400

    positions = kmp_search(text, pattern)

    return jsonify({
        "algorithm": "KMP",
        "text": text,
        "pattern": pattern,
        "positions": positions,
        "matches": len(positions),
        "lps": compute_lps(pattern)
    })


@app.post("/api/z")
def api_z():
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip().upper()
    pattern = str(data.get("pattern", "")).strip().upper()

    if not text or not pattern:
        return jsonify({"error": "Both text and pattern are required."}), 400

    positions, z = z_search(text, pattern)

    separator = "$"
    for candidate in ["$", "#", "|", "@", "%"]:
        if candidate not in text and candidate not in pattern:
            separator = candidate
            break

    return jsonify({
        "algorithm": "Z-Function",
        "text": text,
        "pattern": pattern,
        "combined": pattern + separator + text,
        "z_array": z,
        "positions": positions,
        "matches": len(positions)
    })


@app.post("/api/needleman-wunsch")
def api_needleman_wunsch():
    data = request.get_json(silent=True) or {}

    sequence_a = str(data.get("sequenceA", "")).strip().upper()
    sequence_b = str(data.get("sequenceB", "")).strip().upper()

    try:
        match = int(data.get("match", 1))
        mismatch = int(data.get("mismatch", -1))
        gap = int(data.get("gap", -2))
    except (TypeError, ValueError):
        return jsonify({"error": "Scoring values must be integers."}), 400

    if not sequence_a or not sequence_b:
        return jsonify({"error": "Both sequences are required."}), 400

    result = needleman_wunsch(
        sequence_a, sequence_b, match, mismatch, gap
    )

    return jsonify({
        "algorithm": "Needleman-Wunsch",
        "sequenceA": sequence_a,
        "sequenceB": sequence_b,
        **result
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
