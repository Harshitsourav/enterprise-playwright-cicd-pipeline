import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../utils/logger";

/**
 * BasePage provides reusable interaction wrappers, resilient waiting,
 * and diagnostic logging across all Page Objects.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a relative or absolute URL
   */
  async navigate(path: string = ""): Promise<void> {
    Logger.info(`Navigating to: ${path || "/"}`);
    await this.page.goto(path);
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Resilient click with logging and auto-waiting
   */
  async click(locator: Locator, description: string): Promise<void> {
    Logger.info(`Clicking: ${description}`);
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  /**
   * Resilient fill with logging
   */
  async fill(
    locator: Locator,
    text: string,
    description: string,
  ): Promise<void> {
    Logger.info(
      `Filling ${description} with: "${text.length > 20 ? text.substring(0, 20) + "..." : text}"`,
    );
    await locator.waitFor({ state: "visible" });
    await locator.fill(text);
  }

  /**
   * Get trimmed text content of an element
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: "visible" });
    const text = await locator.innerText();
    return text.trim();
  }

  /**
   * Verify if locator is currently visible
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: "visible", timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Take screenshot for debugging/reporting
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    const fileName = `${name.replace(/\s+/g, "_")}_${Date.now()}.png`;
    Logger.info(`Capturing screenshot: ${fileName}`);
    return await this.page.screenshot({ path: `test-results/${fileName}` });
  }

  /**
   * Get current page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Get current page Title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
