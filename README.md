📌 Project Overview

🧬 DNA and Protein Sequence Alignment using the Needleman–Wunsch Algorithm

This project is a Java-based bioinformatics application that compares two DNA or protein sequences using the Needleman–Wunsch Algorithm.

The algorithm uses Dynamic Programming to find the optimal global alignment between two sequences by considering matches, mismatches, and gaps.

The project also includes a corpus of 100 synthetic DNA sequences that can be loaded from a CSV file and selected for sequence alignment.

Note: The sequence corpus contains synthetic/illustrative data for educational purposes. It does not contain real patient data and is not intended for clinical diagnosis.

🎯 Objectives
Compare two DNA or protein sequences.
Perform optimal global sequence alignment.
Construct a Dynamic Programming matrix.
Calculate the alignment score.
Identify matches, mismatches, and gaps.
Perform traceback to generate the optimal alignment.
Identify conserved regions.
Analyze multiple sequences using the sequence corpus.
Demonstrate the application of Dynamic Programming in bioinformatics.
🧬 Algorithm Used
1. Needleman–Wunsch Algorithm

The Needleman–Wunsch Algorithm is a Dynamic Programming algorithm used for global sequence alignment.

It compares the complete length of two sequences and determines their optimal alignment using a scoring system.

The algorithm considers:

Diagonal → Match or Mismatch
Up → Gap
Left → Gap

The Dynamic Programming matrix is constructed using these possibilities.

📊 Scoring System

The project uses:

Match    = +1
Mismatch = -1
Gap      = -2

These scores are used while constructing the Dynamic Programming matrix.

🔄 Algorithm Workflow
Sequence 1 + Sequence 2
          ↓
   Sequence Selection
          ↓
    Scoring System
          ↓
Dynamic Programming Matrix
          ↓
    Matrix Construction
          ↓
       Traceback
          ↓
  Optimal Global Alignment
          ↓
 Match / Mismatch / Gap
          ↓
    Alignment Score
          ↓
       Final Output
🔙 Traceback

After the Dynamic Programming matrix is completed, traceback starts from the bottom-right cell.

The algorithm moves through the matrix according to the selected scores until it reaches the top-left cell.

This process generates the final optimal alignment.

Example:

Sequence 1 : A C G T
Sequence 2 : A - G T

The aligned sequences can then be compared to identify matching positions and gaps.

🔍 Sequence Comparison
Match

When both sequences contain the same character at an aligned position:

A
A

It is counted as a match.

Mismatch

When the characters are different:

G
T

It is counted as a mismatch.

Gap

When one sequence contains a gap:

ACGT
A-GT

The position represents a gap introduced during alignment.

🧬 Conserved Regions

The project can identify regions where the two aligned sequences contain matching characters.

For example:

Sequence 1 : A C G T
Sequence 2 : A C G T
             | | | |

The matching positions represent conserved regions between the sequences.

📁 Sequence Corpus

The project contains 100 synthetic DNA sequences stored in:

Data/patient_sequences.csv

The dataset contains the following fields:

Patient_ID
Sequence_Type
Sequence

Example:

Patient_ID,Sequence_Type,Sequence
P001,DNA,ACGTACGT
P002,DNA,ACGTTCGT

The P001, P002, etc. identifiers are sample identifiers for the educational dataset.

📊 Sequence Analysis

The Java program loads the sequence corpus from the CSV file.

The workflow is:

CSV Corpus
    ↓
Load 100 Sequences
    ↓
Display Available Samples
    ↓
Select Two Samples
    ↓
Needleman–Wunsch Alignment
    ↓
Calculate Alignment Score
    ↓
Display Optimal Alignment
🧪 Example

Two sequences can be compared using:

Sequence 1 : ACGTACGT
Sequence 2 : ACGTTCGT

Scoring system:

Match    = +1
Mismatch = -1
Gap      = -2

The program constructs the Dynamic Programming matrix and performs traceback to produce the optimal global alignment.

The output displays the aligned sequences and alignment score.

💻 Technologies Used
Java
Dynamic Programming
Needleman–Wunsch Algorithm
2D Arrays
String Processing
CSV File Handling
Visual Studio Code
Git
GitHub
📂 Project Structure
DSA_DNA_Protein_Alignment/
│
├── Data/
│   └── patient_sequences.csv
│
├── NeedlemanWunsch.java
│
└── README.md
▶️ How to Run
Compile
javac NeedlemanWunsch.java
Run
java NeedlemanWunsch

The program loads the corpus and displays the available sequence samples.

The user can select two samples for alignment.

📈 Expected Output

The program displays:

Corpus loading status
Total number of sequences
Available sequence samples
Selected sequences
Optimal global alignment
Match indicators
Alignment score
Scoring system

Example:

Corpus loaded successfully!
Total sequences: 100

Enter first sample number: 1
Enter second sample number: 2

Optimal Global Alignment

Sequence 1 : ACGTACGT
Sequence 2 : ACGTTCGT

Alignment Score: ...

Scoring System:
Match    = 1
Mismatch = -1
Gap      = -2
🚀 Future Scope
Add a graphical user interface.
Visualize the Dynamic Programming matrix.
Support larger sequence datasets.
Add customizable scoring systems.
Improve protein sequence support.
Add automated conserved-region analysis.
Add sequence similarity calculations.
Extend the system for larger-scale sequence analysis.
📚 Learning Outcomes

Through this project, we learned:

Dynamic Programming
Global sequence alignment
Needleman–Wunsch algorithm
2D matrix operations
String processing
Traceback techniques
CSV data handling
Applying DSA concepts to a real-world bioinformatics problem
⚠️ Disclaimer

This project is developed for academic and educational purposes.

The sequence corpus used in this project contains synthetic/illustrative data and does not represent real patient information.

This application is not a medical diagnostic tool.

And the GitHub page will automatically look roughly like the screenshot you showed:
┌─────────────────────────────────────────────┐
│ 📁 Data                                     │
│ 📄 NeedlemanWunsch.java                     │
│ 📄 README.md                                 │
└─────────────────────────────────────────────┘

README

🧬 DNA and Protein Sequence Alignment using
   the Needleman–Wunsch Algorithm

📌 Project Overview
   [your project explanation]

🎯 Objectives
   • Compare sequences
   • Global alignment
   • Dynamic Programming
   ...

🧬 Algorithm Used
   Needleman–Wunsch

📊 Scoring System
   Match +1
   Mismatch -1
   Gap -2
