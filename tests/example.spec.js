// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

// Test Case ID: SHP_01

// Test Case Name: Add multiple items with filters or ordering

// Test Descritpion: This test adds multiple different items and checks their appearence in the shopping cart,
// while navigating we assert text that is suppose to appear.

// Precondition: go to 'https://demowebshop.tricentis.com/'

// Test steps: 
// 1.  Go to the testing page
// 2.  Assert the main title picture
// 3.  Go to the computer section and assert that we have the correct subsection visible
// 4.  Click the subsection
// 5.  Navigate to the 1200 computer
// 6.  Choose the 320 GB HDD
// 7.  Add to the cart, assert the shopping cart in top right has 1 additional item
// 8.  Navigate to Electronics subsection
// 9.  Navigate to Phone section
// 10. Order by price
// 11. Assert that smartphone is last
// 12. Select smartphone
// 13. Add the smartphone to cart
// 14. Assert that it has been added with a notification
// 15. Go to book page
// 16. Filter items by price over 50$
// 17. Assert that 'Computing and Internet' book exists
// 18. Navigate to the book
// 19. Add the book
// 20. Assert that it has been added with a notification
// 21. Go to the Jewelry section
// 22. Filter for Jewelry that is less than 500
// 23. Assert that Black and & White Diamond Heart exists
// 24. Add the Jewelry with a button to the cart
// 25. Assert that a notification appeared
// 26. Close the notification
// 27. Select the "Create your own Jewelry option"
// 28. Assert that pendant was not chosen
// 29. Select gold (0.5 mm)
// 30. Fill in chain length as 67
// 31. Select pendant 'Heart' option
// 32. Add the item to the cart
// 33. Assert that it was added with a notification
// 34. Assert items in the shopping cart

// Test Data: Working page

// Expected results: multiple items are added to the shopping cart successfuly 

// Priority: High

// Severity: High

// Test type: Functional

// Test Environment: Playwright

// Test case owner: Ruslanas 


test('addMultipleItems', async ({ page }) => {
  // Go to the testing page
  await page.goto('https://demowebshop.tricentis.com/');
  
  // Assert the main title picture
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  
  // Go to the computer section and assert that we have the correct subsection visible
  await page.getByRole('link', { name: 'Computers' }).first().click();
  
  // Click the subsection
  await page.getByRole('link', { name: 'Desktops' }).nth(1).click();
  
  // Navigate to the 1200 computer
  for (const someElement of await page.locator('div.product-item').all()){
	//> div.details > div.add-info > div.prices > span
	const priceLocator = someElement.locator('div.details div.add-info div.prices span');
	let str = await priceLocator.textContent();
	let num = Number(str);
	
	if (num > 900){
		someElement.click();
		break;
	}
  }
  
  // Choose the 320 GB HDD
  await page.getByText('320 GB').click();
  
  // Add to the cart, assert the shopping cart in top right has 1 additional item
  await page.locator('#add-to-cart-button-16').click();
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart')
  await expect(page.locator('#topcartlink')).toContainText('Shopping cart (1)');

  // Navigate to Electronics subsection
  await page.getByRole('link', { name: 'Electronics' }).first().click();
  
  // Navigate to Phone section
  await page.getByRole('link', { name: 'Cell phones' }).nth(1).click();

  // Order by price
  await page.locator('#products-orderby').selectOption('https://demowebshop.tricentis.com/cell-phones?orderby=10');
  await page.goto('https://demowebshop.tricentis.com/cell-phones?orderby=10');
  
  // Assert that smartphone is last
  await expect(page.locator('.product-grid > div:nth-child(3)')).toContainText('Smartphone');
  
  // Select smartphone
  await page.getByRole('link', { name: 'Smartphone', exact: true }).click();
  
  // Add the smartphone to cart
  await page.locator('#add-to-cart-button-43').click();
  
  // Assert that it has been added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart')
  
  // Go to book page
  await page.getByRole('link', { name: 'Books' }).first().click();

  // Filter items by price over 50$
  await page.getByRole('link', { name: 'Under' }).click();
  
  // Assert that 'Computing and Internet' book exists
  await expect(page.locator('body')).toContainText('Computing and Internet');

  // Navigate to the book
  await page.getByRole('link', { name: 'Picture of Computing and' }).click();;
  
  // Add the book
  await page.locator('#add-to-cart-button-13').click();
  
  // Assert that it has been added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart');
  
  // Go to the Jewelry section
  await page.getByRole('link', { name: 'Jewelry' }).first().click();
  
  // Filter for Jewelry that is less than 500
  await page.getByRole('link', { name: '- 500.00' }).click();
  
  // Assert that Black and & White Diamond Heart exists
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  
  // Add the Jewelry with a button to the cart
  await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
  
  // Assert that a notification appeared
  await expect(page.getByRole('paragraph')).toContainText('The product has been added to your shopping cart');
  
  // Close the notification
  await page.getByTitle('Close').click();
  
  // Select the "Create your own Jewelry option"
  await page.getByRole('link', { name: 'Create Your Own Jewelry', exact: true }).click();
  
  // Assert that pendant was not chosen
  await expect(page.getByRole('radio', { name: 'None' })).toBeChecked();
  
  // Select gold (0.5 mm)
  await expect(page.locator('#product_attribute_71_9_15')).toHaveValue('45');
  
  // Fill in chain length as 67
  await page.locator('#product_attribute_71_10_16').click();
  await page.locator('#product_attribute_71_10_16').fill('67');
  
  // Select pendant 'Heart' option
  await page.getByRole('radio', { name: 'Heart' }).check();
  
  // Add the item to the cart
  await page.locator('#add-to-cart-button-71').click();
  
  // Assert that it was added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart');
  
  
  // assert items in the shopping cart
  await expect(page.locator('#topcartlink')).toContainText('Shopping cart (5)');
  
  await page.getByRole('link', { name: 'Shopping cart (5)' }).click();
  
  await expect(page.locator('body')).toContainText('Processor: 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]RAM: 2 GBHDD: 320 GBOS: UbuntuSoftware: Microsoft Office [+50.00]');
  await expect(page.locator('body')).toContainText('Smartphone');
  await expect(page.locator('body')).toContainText('Computing and Internet');
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  await expect(page.locator('body')).toContainText('Material: Gold (0,5 mm)Length: 67Pendant: Heart');
  
  await page.getByRole('row', { name: 'Picture of Build your own' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Picture of Computing and' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Picture of Create Your Own' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Update shopping cart' }).click();
  
  
  await expect(page.locator('body')).not.toContainText('Processor: 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]RAM: 2 GBHDD: 320 GBOS: UbuntuSoftware: Microsoft Office [+50.00]');
  await expect(page.locator('body')).toContainText('Smartphone');
  await expect(page.locator('body')).not.toContainText('Computing and Internet');
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  await expect(page.locator('body')).not.toContainText('Material: Gold (0,5 mm)Length: 67Pendant: Heart');
});


test('testPagination', async ({ page }) => { 
	await page.setViewportSize({ width: 1920, height: 1080 });
	await page.goto('https://demoqa.com/');
	
	await page.locator('a[href="/elements"]').click();
	
	await page.locator('a[href="/webtables"]').click();

	for (let i = 0; i < 8;i++){
		await page.locator('#addNewRecordButton').click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await page.getByRole('textbox', { name: 'First Name' }).click();
		await page.getByRole('textbox', { name: 'First Name' }).fill('randomname' + i);
		await page.getByRole('textbox', { name: 'Last Name' }).click();
		await page.getByRole('textbox', { name: 'Last Name' }).fill('randomLastName');
		await page.getByRole('textbox', { name: 'name@example.com' }).click();
		await page.getByRole('textbox', { name: 'name@example.com' }).fill('someEmail@gmail.com');
		await page.getByRole('textbox', { name: 'Age' }).click();
		await page.getByRole('textbox', { name: 'Age' }).fill('20');
		await page.getByRole('textbox', { name: 'Salary' }).click();
		await page.getByRole('textbox', { name: 'Salary' }).fill('100');
		await page.getByRole('textbox', { name: 'Department' }).click();
		await page.getByRole('textbox', { name: 'Department' }).fill('None');
		await page.getByRole('button', { name: 'Submit' }).click();
	}
	
	await expect(page.getByRole('strong')).toContainText('1 of 2');
	
	await page.getByRole('button', { name: 'Next' }).click();
	
	await expect(page.getByRole('strong')).toContainText('2 of 2');
	
	await page.locator('#delete-record-11').click();
	
	await expect(page.getByRole('strong')).toContainText('1 of 1');
})

test('testProgressBar', async ({ page }) => { 
	await page.setViewportSize({ width: 1920, height: 1080 });
	await page.goto('https://demoqa.com/progress-bar');
	
	await page.locator('button#startStopButton').click();
	
	await expect(page.locator('div.progress-bar')).toContainText('100%', { timeout: 20_000 });
	
	await page.locator('button#resetButton').click();
	
	await expect(page.locator('div.progress-bar')).toContainText('0%');
})

test('testDynamicProperties', async ({ page }) => { 
	await page.setViewportSize({ width: 1920, height: 1080 });
	await page.goto('https://demoqa.com/dynamic-properties');
	
	await expect(page.locator('button#enableAfter')).not.toBeEnabled();
	await expect(page.locator('button#colorChange')).not.toHaveClass('mt-4 text-danger btn btn-primary');
	await expect(page.locator('button#visibleAfter')).toBeHidden();
	
	
	await expect(page.locator('button#enableAfter')).toBeEnabled({ timeout: 6_000 });
	await expect(page.locator('button#colorChange')).toHaveClass('mt-4 text-danger btn btn-primary');
	await expect(page.locator('button#visibleAfter')).toBeVisible();
})

test('getJsonFile', async ({ page }) => { 
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Resolve path to file in same directory as this test file
  const filePath = path.join(__dirname, 'testFile.json');

  // Read file
  const fileContent = await fs.readFile(filePath, 'utf-8');

  // Parse JSON
  const jsonData = JSON.parse(fileContent);

  console.log('Parsed JSON:', jsonData);

  // Example assertion (adjust depending on your JSON structure)
  expect(jsonData).toBeDefined();
  
  
  
  
  
  // Go to the testing page
  await page.goto('https://demowebshop.tricentis.com/');
  
  await page.locator('a[href="/login"]').click();
  
  await page.locator('#Email').fill(jsonData.gmail);
  
  await page.locator('#Password').fill(jsonData.password);
  
  await page.locator('.login-button').click();
  
  // Assert the main title picture
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  
  const qty = await page.locator('.cart-qty').textContent();
  
  if (qty[1] > 0 ){
	await page.locator('.cart-qty').click();
	  
	// Locate all cart rows and check their remove checkbox
	const cartRows = page.locator('tr.cart-item-row');
	
	const count = await cartRows.count();
	
	for (let i = 0; i < count; i++) {
		const checkbox = cartRows.nth(i).locator('input[name="removefromcart"]');
		await checkbox.check(); 
	}
	await page.locator('.update-cart-button').click();
	expect(page.locator('.cart-qty')).toContainText("(0)");
  }
  
  // Go to the computer section and assert that we have the correct subsection visible
  await page.getByRole('link', { name: 'Computers' }).first().click();
  
  // Click the subsection
  await page.getByRole('link', { name: 'Desktops' }).nth(1).click();
  
  // Navigate to the 1200 computer
  for (const someElement of await page.locator('div.product-item').all()){
	//> div.details > div.add-info > div.prices > span
	const priceLocator = someElement.locator('div.details div.add-info div.prices span');
	let str = await priceLocator.textContent();
	let num = Number(str);
	
	if (num > 900){
		someElement.click();
		break;
	}
  }
  
  // Choose the 320 GB HDD
  await page.locator('#product_attribute_16_3_6_18').click();
  
  // Add to the cart, assert the shopping cart in top right has 1 additional item
  await page.locator('#add-to-cart-button-16').click();
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart')
  await expect(page.locator('#topcartlink')).toContainText('Shopping cart (1)');

  // Navigate to Electronics subsection
  await page.getByRole('link', { name: 'Electronics' }).first().click();
  
  // Navigate to Phone section
  await page.getByRole('link', { name: 'Cell phones' }).nth(1).click();

  // Order by price
  await page.locator('#products-orderby').selectOption('https://demowebshop.tricentis.com/cell-phones?orderby=10');
  await page.goto('https://demowebshop.tricentis.com/cell-phones?orderby=10');
  
  // Assert that smartphone is last
  await expect(page.locator('.product-grid > div:nth-child(3)')).toContainText('Smartphone');
  
  // Select smartphone
  await page.getByRole('link', { name: 'Smartphone', exact: true }).click();
  
  // Add the smartphone to cart
  await page.locator('#add-to-cart-button-43').click();
  
  // Assert that it has been added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart')
  
  // Go to book page
  await page.getByRole('link', { name: 'Books' }).first().click();

  // Filter items by price over 50$
  await page.getByRole('link', { name: 'Under' }).click();
  
  // Assert that 'Computing and Internet' book exists
  await expect(page.locator('body')).toContainText('Computing and Internet');

  // Navigate to the book
  await page.getByRole('link', { name: 'Picture of Computing and' }).click();;
  
  // Add the book
  await page.locator('#add-to-cart-button-13').click();
  
  // Assert that it has been added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart');
  
  // Go to the Jewelry section
  await page.getByRole('link', { name: 'Jewelry' }).first().click();
  
  // Filter for Jewelry that is less than 500
  await page.getByRole('link', { name: '- 500.00' }).click();
  
  // Assert that Black and & White Diamond Heart exists
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  
  // Add the Jewelry with a button to the cart
  await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
  
  // Assert that a notification appeared
  await expect(page.getByRole('paragraph')).toContainText('The product has been added to your shopping cart');
  
  // Close the notification
  await page.getByTitle('Close').click();
  
  // Select the "Create your own Jewelry option"
  await page.getByRole('link', { name: 'Create Your Own Jewelry', exact: true }).click();
  
  // Assert that pendant was not chosen
  await expect(page.getByRole('radio', { name: 'None' })).toBeChecked();
  
  // Select gold (0.5 mm)
  await expect(page.locator('#product_attribute_71_9_15')).toHaveValue('45');
  
  // Fill in chain length as 67
  await page.locator('#product_attribute_71_10_16').click();
  await page.locator('#product_attribute_71_10_16').fill('67');
  
  // Select pendant 'Heart' option
  await page.getByRole('radio', { name: 'Heart' }).check();
  
  // Add the item to the cart
  await page.locator('#add-to-cart-button-71').click();
  
  // Assert that it was added with a notification
  await expect(page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart');
  
  
  // assert items in the shopping cart
  await expect(page.locator('#topcartlink')).toContainText('Shopping cart (5)');
  
  await page.getByRole('link', { name: 'Shopping cart (5)' }).click();
  
  await expect(page.locator('body')).toContainText('Processor: 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]RAM: 2 GBHDD: 320 GBOS: UbuntuSoftware: Microsoft Office [+50.00]');
  await expect(page.locator('body')).toContainText('Smartphone');
  await expect(page.locator('body')).toContainText('Computing and Internet');
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  await expect(page.locator('body')).toContainText('Material: Gold (0,5 mm)Length: 67Pendant: Heart');
  
  await page.getByRole('row', { name: 'Picture of Build your own' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Picture of Computing and' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Picture of Create Your Own' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Update shopping cart' }).click();
  
  
  await expect(page.locator('body')).not.toContainText('Processor: 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]RAM: 2 GBHDD: 320 GBOS: UbuntuSoftware: Microsoft Office [+50.00]');
  await expect(page.locator('body')).toContainText('Smartphone');
  await expect(page.locator('body')).not.toContainText('Computing and Internet');
  await expect(page.locator('body')).toContainText('Black & White Diamond Heart');
  await expect(page.locator('body')).not.toContainText('Material: Gold (0,5 mm)Length: 67Pendant: Heart');
});