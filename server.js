const puppeteer = require('puppeteer');
const fs = require('fs/promises'); // Import the 'fs/promises' module for file operations

async function fetchNITHResult() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('http://results.nith.ac.in/scheme22/studentresult/result.asp');

        // Fill in the Roll Number and submit the form
        await page.type('input[name="RollNumber"]', '22bme102'); // Replace with the actual roll number
        await page.click('input[type="submit"]');

        // Wait for the page to load after form submission (you may need to adjust the wait time)
        await page.waitForTimeout(3000);

        // Capture the HTML content after form submission
        const resultHtml = await page.content();

        // Save the HTML content to a file named 'result.html'
        await fs.writeFile('result.html', resultHtml);

        console.log('NITH Result HTML saved to result.html');
    } catch (error) {
        console.error('Error fetching NITH result:', error.message);
    } finally {
        await browser.close();
    }
}

// Call the fetchNITHResult function to initiate the request
fetchNITHResult();
