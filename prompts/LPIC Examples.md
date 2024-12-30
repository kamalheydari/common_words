I am preparing for the LPIC-1 Version 5 certification and using the LPIC-1 Version 5 Study Guide. My current focus is on building a strong foundation in Linux system administration, as I have completed the Linux Essentials course. I am using Ubuntu (without any installed packages) as my practice environment.

I would like you to provide 3-5 step-by-step basic examples for beginners including real-world scenarios and real-word packages in html format, without any additional comments or explanations, to help me with the following areas:

Example content:
cat
This command simply outputs its input stream (or the filename you give it). As you saw in the previous section. As with most commands, if you do not give input to it, it will read the data from the keyboard.

One of expected examples:
 <section>
        <h2>Example 1: Combining Multiple Files into One</h2>
        <p>
          <b>Scenario</b>: Imagine you have three text files named file1.txt, file2.txt, and file3.txt containing different parts of a report. You want to
          combine these files into a single report named `full_report.txt`.
        </p>

        <h3>Steps:</h3>

        <h4>1. Create Sample Text Files:</h4>
        <pre><code>echo "Introduction:" &gt; file1.txt
echo "This is the main content of the report." &gt; file2.txt
echo "Conclusion:" &gt; file3.txt</code></pre>
        <h4>2. Combine Files:</h4>
        <pre><code>cat file1.txt file2.txt file3.txt &gt; full_report.txt</code></pre>
        <h3>3. Verify the Combined File:</h3>
        <pre><code>cat full_report.txt</code></pre>
        <h3>Output:</h3>

        <pre><code>Introduction:
This is the main content of the report.
Conclusion:</code></pre>
      </section>