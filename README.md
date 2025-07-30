# To Upload **Multiple PDF's** At Once for Hudu
I have Submit an Official Hudu Feature request here > 
---
## The issue with Hudu Docuementation & Uploading PDF's to the KB
- You can only upload one at a time, making it a time consuming and endless clicking process. (Its really not the worst thing in the world)

For the mean time, this has solved when we would like to upload a mass amount of PDF's for example 20. When I need to upload PDFs that I would like to be able to search for within the KB. For example keeping track of our receipts.
Included in an additional feature request HERE > (Ill get it soon) The addition of OCR to Hudu's KB could be super useful.

## System Requirements: 
- [ ] Node.js -  (https://nodejs.org/en/download/)
- [ ] Playwright - "npm install playwright"
- [ ] Access to the Hudu site with permissions
- [ ] Directory of PDF Files Located on your computer such as C:\%username%\Downloads\MyPDFFiles
- [ ] Hudu Login Page - https://yourdomain.hudu.com
- [ ] Hudu Folder URL - https://yourdomain.hudu.com/kba?folder=225

## 1. What This Script Does
- Uses a playwright script in order to upload a number of PDF's in a Folder to Hudu Documentation
- Fairly Simple and easy way to upload multiple PDF's to Hudu Documentation

2. What You need to do for it to work
- Pay attention to the following options we MUST change.
- Unfortunantely due to differences or Hudu version, Playwright could use some editing on your end
- I have the script setup for SSO, but it can easily be modified for your main login page, just have it wait 15-30 seconds for you to login and then let it continue.

Change Line 11 "Directory that will contain your PDF Files"
```javascript 
  (async () => {
  // Directory containing PDF files
  const pdfDirectory = 'C:\\Downloads\\renamed_orders'; // Your specified directory
```
Change Line 29 "To Your correct Hudu Login Page"
  ```javascript
  try {
    // Navigate to the login page
    await page.goto('https://yourdomain.hudu.com');
```
Change Line 42
```javascript
    // Navigate to the June 2025 folder
    // Use the Global KB or Upload to a folder !Make sure you copy the FULL PATH!
    await page.goto('https://yourdomain.hudu.com/yourdesiredfolderpath');
```
Change Line 72
```javascript
  // Navigate back to the June 2025 folder
      await page.goto('https://yourdomain.hudu.com/yourdesiredfolderpath');
```
For Non SSO Compatiability - CHANGE Lines 27-39: (With Playwright Installed run ~~npx playwright codegen 'your hudu address'~ and identify how your page logs in.) 
### LINES 27-39
 ```javascript
 try {
    // Navigate to the login page
    await page.goto('https://yourdomain.hudu.com');
  
	//Might Need some changing at this point 
	// With Playwright Installed run ~~npx playwright codegen 'your hudu address'~ and identify how your page logs in. 
  //Click the SSO link
    > await page.getByRole('link', { name: 'Use Single Sign On (SSO)' }).click();

    // Add a delay for manual SSO login (30 seconds)
    > console.log('Please complete the SSO login within 30 seconds...'); //just change the text or timeout if you want shorter.
    await page.waitForTimeout(30000); // 30-second delay for manual login
```

    
