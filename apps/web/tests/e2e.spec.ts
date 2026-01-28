import { test, expect } from '@playwright/test';

test.describe('Digital Library E2E Tests', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Digital Library/);
    await expect(page.locator('text=Digital Library')).toBeVisible();
    await expect(page.locator('text=Browse Categories')).toBeVisible();
  });

  test('should navigate to categories', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Browse Categories');
    await expect(page).toHaveURL(/categories/);
    await expect(page.locator('text=Fiction')).toBeVisible();
  });

  test('should navigate to collection', async ({ page }) => {
    await page.goto('/categories');
    await page.click('text=Fiction');
    await expect(page).toHaveURL(/collection\/fiction/);
  });

  test('should add book to cart', async ({ page }) => {
    await page.goto('/collection/fiction');
    await page.waitForSelector('text=Add to Cart');
    await page.click('text=Add to Cart').first();
    await expect(page).toHaveURL(/cart/);
  });

  test('should navigate to cart', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Cart');
    await expect(page).toHaveURL(/cart/);
  });

  test('should open login page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Log In');
    await expect(page).toHaveURL(/signin/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('should register new user', async ({ page }) => {
    await page.goto('/signin');
    await page.click('text=Register');
    await page.fill('input[label="Username"]', 'testuser');
    await page.fill('input[label="Email"]', 'test@example.com');
    await page.fill('input[label="Password"]', 'password123');
    await page.click('button:has-text("Register")');
    // Assuming success toast or redirect
    await expect(page.locator('text=Registered successfully')).toBeVisible();
  });

  test('should login user', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input[label="Email"]', 'test@example.com');
    await page.fill('input[label="Password"]', 'password123');
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL('/');
  });

  test('should handle login failure', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input[label="Email"]', 'wrong@example.com');
    await page.fill('input[label="Password"]', 'wrongpassword');
    await page.click('button:has-text("Login")');
    // Assuming error message appears
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should add multiple books to cart', async ({ page }) => {
    await page.goto('/collection/fiction');
    await page.waitForSelector('text=Add to Cart');
    const addButtons = await page.locator('text=Add to Cart').all();
    if (addButtons.length > 1) {
      await addButtons[0].click();
      await addButtons[1].click();
    }
    await expect(page).toHaveURL(/cart/);
    // Check if multiple items are in cart
    const cartItems = await page.locator('[data-testid="cart-item"]').all();
    expect(cartItems.length).toBeGreaterThan(1);
  });

  test('should update quantity in cart', async ({ page }) => {
    await page.goto('/collection/fiction');
    await page.waitForSelector('text=Add to Cart');
    await page.click('text=Add to Cart').first();
    await page.waitForURL(/cart/);

    // Find quantity controls and increase
    const plusButton = await page.locator('button').filter({ hasText: '+' }).first();
    await plusButton.click();

    // Check if quantity updated (assuming quantity display)
    const quantityDisplay = await page.locator('text=2').first();
    await expect(quantityDisplay).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/collection/fiction');
    await page.waitForSelector('text=Add to Cart');
    await page.click('text=Add to Cart').first();
    await page.waitForURL(/cart/);

    const removeButton = await page.locator('button').filter({ hasText: 'Remove' }).first();
    await removeButton.click();

    // Cart should be empty
    await expect(page.locator('text=Your Cart is Empty')).toBeVisible();
  });

  test('should navigate through categories', async ({ page }) => {
    await page.goto('/categories');
    await page.click('text=Non-Fiction');
    await expect(page).toHaveURL(/collection\/non-fiction/);

    await page.goto('/categories');
    await page.click('text=Science');
    await expect(page).toHaveURL(/collection\/science/);
  });
});