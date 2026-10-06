import java.util.Scanner;

public class KMP {

    // Function to create the LPS array
    static int[] computeLPS(String pattern) {
        int[] lps = new int[pattern.length()];

        int length = 0;
        int i = 1;

        while (i < pattern.length()) {

            if (pattern.charAt(i) == pattern.charAt(length)) {
                length++;
                lps[i] = length;
                i++;
            } else {

                if (length != 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }

    // KMP pattern searching
    static void KMPSearch(String text, String pattern) {

        int[] lps = computeLPS(pattern);

        int i = 0; // text index
        int j = 0; // pattern index

        boolean found = false;

        while (i < text.length()) {

            if (text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            }

            if (j == pattern.length()) {
                System.out.println("Pattern found at index: " +
                                   (i - j));

                found = true;
                j = lps[j - 1];
            }

            else if (i < text.length() &&
                     text.charAt(i) != pattern.charAt(j)) {

                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        if (!found) {
            System.out.println("Pattern not found.");
        }

        System.out.println();
        System.out.println("LPS Array:");

        for (int value : lps) {
            System.out.print(value + " ");
        }

        System.out.println();
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter text: ");
        String text = sc.nextLine();

        System.out.print("Enter pattern: ");
        String pattern = sc.nextLine();

        KMPSearch(text, pattern);

        sc.close();
    }
}