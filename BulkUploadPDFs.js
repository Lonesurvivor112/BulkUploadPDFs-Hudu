const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Look Here V
//Important to Ignore the file popup window, DO NOT CLOSE IT UNTIL ALL FILES HAVE BEEN UPLOADED.! 
//Important that you Change the following sections as stated on the Readme

(async () => {
  // Directory containing PDF files
  const pdfDirectory = 'C:\\Downloads\\renamed_orders'; // Your specified directory

  // Read all .pdf files from the directory
  const pdfFiles = fs.readdirSync(pdfDirectory).filter(file => file.endsWith('.pdf'));
  
  if (pdfFiles.length === 0) {
    console.log('No PDF files found in the directory:', pdfDirectory);
    return;
  }

  console.log(`Found ${pdfFiles.length} PDF files to upload.`);

  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Must be headless: false for manual login
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto('https://yourdomain.hudu.com');

	//Might Need some changing at this point 
	// With Playwright Installed run ~~npx playwright codegen 'your hudu address'~ and identify how your page logs in. 
    // Click the SSO link
    await page.getByRole('link', { name: 'Use Single Sign On (SSO)' }).click();

    // Add a delay for manual SSO login (30 seconds)
    console.log('Please complete the SSO login within 30 seconds...');
    await page.waitForTimeout(30000); // 30-second delay for manual login

    // Navigate to the June 2025 folder
    // Use the Global KB or Upload to a folder !Make sure you copy the FULL PATH!
    await page.goto('https://yourdomain.hudu.com/yourdesiredfolderpath');

    // Loop through each PDF file
    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(pdfDirectory, pdfFile);
      console.log(`Uploading ${pdfFile}...`);

      // Click "New Article"
      await page.getByText('New Article').click();

      // Click "Upload PDF" link in the dropdown
      await page.getByRole('link', { name: ' Upload PDF' }).click();

      // Wait for the upload modal to load
      await page.waitForSelector('text=Drop files here to upload', { state: 'visible' });

      // Click the dropzone
      await page.getByText('Drop files here to upload').click();

      // Upload the PDF file
      const fileInput = await page.locator('input[type="file"]');
      await fileInput.setInputFiles(pdfPath);

      // Click the "Upload PDF" button to complete the upload
      await page.locator('a.button.button--secondary.button--large', { hasText: 'Upload PDF' }).click();

      // Wait for the upload to complete (adjust selector if a success message appears)
      await page.waitForTimeout(2000); // 2 seconds for stability

      // Navigate back to the June 2025 folder
      await page.goto('https://yourdomain.hudu.com/yourdesiredfolderpath');

      console.log(`Successfully uploaded ${pdfFile}`);
    }
  } catch (error) {
    console.error(`Error during upload of ${pdfFile || 'unknown file'}:`, error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Upload process completed.');
  }
})();
