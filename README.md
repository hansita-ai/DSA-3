# SequenceLab Backend

Backend API for the SequenceLab DNA/Protein sequence analysis project.

It provides three algorithms:

1. KMP pattern matching
2. Z-Function pattern search
3. Needleman-Wunsch global sequence alignment

## 1. Requirements

Install Python 3.10 or newer.

## 2. Open the backend folder

In VS Code, open this folder:

SequenceLab_Backend

## 3. Install dependencies

Open the VS Code terminal and run:

```powershell
python -m pip install -r requirements.txt
```

## 4. Start the backend

Run:

```powershell
python app.py
```

You should see Flask running on:

http://127.0.0.1:5000

Keep this terminal running while using the frontend.

## 5. Test the backend

Open this in your browser:

http://127.0.0.1:5000/api/health

Expected response:

```json
{
  "status": "ok"
}
```

## API endpoints

### KMP

POST:

`http://127.0.0.1:5000/api/kmp`

JSON:

```json
{
  "text": "ABDABABABD",
  "pattern": "ABABD"
}
```

### Z-Function

POST:

`http://127.0.0.1:5000/api/z`

JSON:

```json
{
  "text": "ABDABABABD",
  "pattern": "ABABD"
}
```

### Needleman-Wunsch

POST:

`http://127.0.0.1:5000/api/needleman-wunsch`

JSON:

```json
{
  "sequenceA": "ACGT",
  "sequenceB": "AGT",
  "match": 1,
  "mismatch": -1,
  "gap": -2
}
```

## Connecting the existing frontend

The current frontend performs the algorithms directly inside `script.js`. For example, the existing KMP button calls `demoKMP()` and that function calculates the result in JavaScript.

To make the frontend use this backend instead, replace the calculation inside the three demo functions with `fetch()` calls to:

- `/api/kmp`
- `/api/z`
- `/api/needleman-wunsch`

The backend already has CORS enabled, so the standalone HTML frontend can communicate with the Flask server.

## Important

Do not double-click the HTML and expect the backend to start automatically. Human civilization has not yet achieved that particular miracle.

Start the backend first:

```powershell
python app.py
```

Then open the frontend `index.html`.
