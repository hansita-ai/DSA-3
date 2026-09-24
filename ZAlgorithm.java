import java.util.Scanner;

public class ZAlgorithm {

    // Function to construct the Z-array
    static int[] calculateZ(String str) {

        int n = str.length();
        int[] z = new int[n];

        int left = 0;
        int right = 0;

        for (int i = 1; i < n; i++) {

            if (i <= right) {
                z[i] = Math.min(right - i + 1, z[i - left]);
            }

            while (i + z[i] < n &&
                   str.charAt(z[i]) == str.charAt(i + z[i])) {

                z[i]++;
            }

            if (i + z[i] - 1 > right) {
                left = i;
                right = i + z[i] - 1;
            }
        }

        return z;
    }

    // Search pattern in text using Z-algorithm
    static void search(String text, String pattern) {

        String combined = pattern + "$" + text;

        int[] z = calculateZ(combined);

        boolean found = false;

        System.out.println();
        System.out.println("Combined String: " + combined);
        System.out.println();

        System.out.println("Z Array:");
        for (int value : z) {
            System.out.print(value + " ");
        }

        System.out.println();
        System.out.println();

        for (int i = 0; i < z.length; i++) {

            if (z[i] == pattern.length()) {

                int position = i - pattern.length() - 1;

                System.out.println(
                    "Pattern found at index: " + position
                );

                found = true;
            }
        }

        if (!found) {
            System.out.println("Pattern not found.");
        }
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter text: ");
        String text = sc.nextLine();

        System.out.print("Enter pattern: ");
        String pattern = sc.nextLine();

        search(text, pattern);

        sc.close();
    }
}