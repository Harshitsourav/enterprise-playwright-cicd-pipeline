import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Page Object for SauceDemo Checkout Flows (Step 1, Step 2, and Completion)
 */
export class CheckoutPage extends BasePage {
  // Step 1: Customer Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step 2: Overview
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  // Step 3: Complete
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.summarySubtotal = page.locator(".summary_subtotal_label");
    this.summaryTax = page.locator(".summary_tax_label");
    this.summaryTotal = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator(".complete-header");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.fill(this.firstNameInput, firstName, "First Name");
    await this.fill(this.lastNameInput, lastName, "Last Name");
    await this.fill(this.postalCodeInput, postalCode, "Postal Code");
    await this.click(this.continueButton, "Continue Button");
  }

  async finishCheckout(): Promise<void> {
    await this.click(this.finishButton, "Finish Button");
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
