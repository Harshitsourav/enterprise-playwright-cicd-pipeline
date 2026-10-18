import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Page Object for SauceDemo Login Page
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.navigate("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username, "Username Input");
    await this.fill(this.passwordInput, password, "Password Input");
    await this.click(this.loginButton, "Login Button");
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
