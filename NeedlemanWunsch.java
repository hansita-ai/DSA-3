import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class NeedlemanWunsch {

    static class PatientSample {
        String patientId;
        String sequenceType;
        String sequence;

        PatientSample(String patientId, String sequenceType, String sequence) {
            this.patientId = patientId;
            this.sequenceType = sequenceType;
            this.sequence = sequence;
        }
    }

    // Read corpus data from CSV
    public static List<PatientSample> readCorpus(String filePath) {

        List<PatientSample> samples = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

            String line;

            // Skip header
            br.readLine();

            while ((line = br.readLine()) != null) {

                String[] parts = line.split(",");

                if (parts.length == 3) {

                    String patientId = parts[0].trim();
                    String sequenceType = parts[1].trim();
                    String sequence = parts[2].trim().toUpperCase();

                    samples.add(
                        new PatientSample(
                            patientId,
                            sequenceType,
                            sequence
                        )
                    );
                }
            }

        } catch (IOException e) {

            System.out.println("Error reading corpus file.");
            System.out.println(e.getMessage());
        }

        return samples;
    }

    // Needleman-Wunsch algorithm
    public static void alignSequences(
            String seq1,
            String seq2,
            int match,
            int mismatch,
            int gap) {

        int m = seq1.length();
        int n = seq2.length();

        int[][] dp = new int[m + 1][n + 1];

        // Initialize first row
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j * gap;
        }

        // Initialize first column
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i * gap;
        }

        // Fill DP matrix
        for (int i = 1; i <= m; i++) {

            for (int j = 1; j <= n; j++) {

                int diagonal;

                if (seq1.charAt(i - 1) == seq2.charAt(j - 1)) {
                    diagonal = dp[i - 1][j - 1] + match;
                } else {
                    diagonal = dp[i - 1][j - 1] + mismatch;
                }

                int up = dp[i - 1][j] + gap;
                int left = dp[i][j - 1] + gap;

                dp[i][j] = Math.max(
                    diagonal,
                    Math.max(up, left)
                );
            }
        }

        // Traceback
        StringBuilder alignedSeq1 = new StringBuilder();
        StringBuilder alignedSeq2 = new StringBuilder();

        int i = m;
        int j = n;

        while (i > 0 || j > 0) {

            if (i > 0 && j > 0) {

                int score;

                if (seq1.charAt(i - 1) == seq2.charAt(j - 1)) {
                    score = match;
                } else {
                    score = mismatch;
                }

                if (dp[i][j] == dp[i - 1][j - 1] + score) {

                    alignedSeq1.append(seq1.charAt(i - 1));
                    alignedSeq2.append(seq2.charAt(j - 1));

                    i--;
                    j--;

                    continue;
                }
            }

            if (i > 0 && dp[i][j] == dp[i - 1][j] + gap) {

                alignedSeq1.append(seq1.charAt(i - 1));
                alignedSeq2.append('-');

                i--;

            } else if (j > 0 && dp[i][j] == dp[i][j - 1] + gap) {

                alignedSeq1.append('-');
                alignedSeq2.append(seq2.charAt(j - 1));

                j--;
            }
        }

        alignedSeq1.reverse();
        alignedSeq2.reverse();

        // Display result
        System.out.println();
        System.out.println("========== NEEDLEMAN-WUNSCH ALIGNMENT ==========");

        System.out.println("Sequence 1 : " + seq1);
        System.out.println("Sequence 2 : " + seq2);

        System.out.println();
        System.out.println("Optimal Global Alignment:");

        System.out.println(alignedSeq1);
        System.out.println(alignedSeq2);

        System.out.print("             ");

        for (int k = 0; k < alignedSeq1.length(); k++) {

            if (alignedSeq1.charAt(k) == alignedSeq2.charAt(k)) {
                System.out.print("|");
            } else {
                System.out.print(" ");
            }
        }

        System.out.println();

        System.out.println();
        System.out.println("Alignment Score: " + dp[m][n]);

        System.out.println();
        System.out.println("Scoring System:");
        System.out.println("Match    = " + match);
        System.out.println("Mismatch = " + mismatch);
        System.out.println("Gap      = " + gap);
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Corpus file location
        String filePath = "Data/patient_sequences.csv";

        System.out.println("==============================================");
        System.out.println(" DNA & PROTEIN SEQUENCE ALIGNMENT");
        System.out.println(" Needleman-Wunsch Algorithm");
        System.out.println("==============================================");

        // Read corpus
        List<PatientSample> samples = readCorpus(filePath);

        if (samples.isEmpty()) {

            System.out.println("No corpus data found.");
            System.out.println("Check Data/patient_sequences.csv");

            sc.close();
            return;
        }

        System.out.println();
        System.out.println("Corpus loaded successfully!");
        System.out.println("Total sequences: " + samples.size());

        System.out.println();
        System.out.println("Available Patient Samples:");

        for (int k = 0; k < samples.size(); k++) {

            System.out.println(
                (k + 1) + ". " +
                samples.get(k).patientId +
                " - " +
                samples.get(k).sequence
            );
        }

        System.out.println();

        System.out.print("Enter first sample number: ");
        int first = sc.nextInt();

        System.out.print("Enter second sample number: ");
        int second = sc.nextInt();

        if (first < 1 || first > samples.size()
                || second < 1 || second > samples.size()) {

            System.out.println("Invalid sample number.");

            sc.close();
            return;
        }

        PatientSample sample1 = samples.get(first - 1);
        PatientSample sample2 = samples.get(second - 1);

        System.out.println();
        System.out.println("Selected Samples:");

        System.out.println(
            sample1.patientId +
            " : " +
            sample1.sequence
        );

        System.out.println(
            sample2.patientId +
            " : " +
            sample2.sequence
        );

        // Scoring values
        int match = 1;
        int mismatch = -1;
        int gap = -2;

        // Perform alignment
        alignSequences(
            sample1.sequence,
            sample2.sequence,
            match,
            mismatch,
            gap
        );

        sc.close();
    }
}