(async () => {
  // YOUR CODE STARTS
  const { chromium, errors } = require("playwright");
  const readline = require("readline-sync");

  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const email = readline.question("What is your Netflix email?");
    const password = readline.question("What is your Netflix password?");

    const page = await browser.newPage();
    await page.goto("https://www.netflix.com/login");

    await page.fill('input[name="userLoginId"]', email);
    await page.fill('input[name="password"]', password);

    const signInButton = await page.locator('button[type="submit"]').first();
    await signInButton.click();

    try {
      const signInError = await page.waitForSelector(
        ".ui-message-error, .inputError",
        {
          timeout: 10000,
        }
      );

      const errorMessage = await signInError.innerText();

      console.log("Error signing in:\n", errorMessage);
    } catch (error) {
      if (error instanceof errors.TimeoutError)
        console.log("No error found signing in...");
      else console.log(error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    browser.close();
  }
  // YOUR CODE ENDS
})();
