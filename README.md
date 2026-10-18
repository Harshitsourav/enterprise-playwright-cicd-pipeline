# 🛡️ Enterprise Playwright Quality Architecture & CI/CD Pipeline

Production-ready TypeScript Page Object Model (POM) automation framework built for scale, continuous integration, and future autonomous AI agent integration.

---

## 🏛️ Framework Architecture

```
ui-automation-playwright/
├── .github/
│   └── workflows/
│       └── quality-gate.yml         # GitHub Actions CI quality gate
├── src/
│   ├── components/
│   │   └── header.component.ts      # Reusable Header UI component
│   ├── config/
│   │   └── environment.ts           # Centralized environment configs
│   ├── fixtures/
│   │   └── test.fixture.ts          # TestNG/Cucumber style fixture dependency injection
│   ├── pages/
│   │   ├── base.page.ts             # Resilient base page (waits, logs, screenshots)
│   │   ├── login.page.ts            # Login Page Object
│   │   ├── inventory.page.ts        # Inventory Catalog Page Object
│   │   ├── cart.page.ts             # Shopping Cart Page Object
│   │   └── checkout.page.ts         # Checkout Flow Page Object
│   └── utils/
│       ├── api-client.ts            # REST API client wrapper
│       ├── logger.ts                # Structured execution logger
│       └── test-data.ts             # Typed credentials & test fixtures
├── tests/
│   ├── api/
│   │   └── users-api.spec.ts        # Fast REST API validation suite
│   ├── bdd/
│   │   └── checkout-workflow.spec.ts# Gherkin Given-When-Then BDD style scenario
│   └── e2e/
│       ├── auth.spec.ts             # Authentication positive & negative flows
│       ├── inventory.spec.ts        # Sorting, filtering, catalog validation
│       └── checkout.spec.ts         # End-to-end purchasing workflow
├── playwright.config.ts             # CI-hardened Playwright configuration
├── package.json                     # Pipeline scripts & dependencies
└── tsconfig.json                    # Strict TypeScript compiler options
```

---

## 🚀 Key Architectural Highlights

1. **Strict Page Object Model (POM) & Component Pattern**:
   - Encapsulates all DOM locators and page actions.
   - `HeaderComponent` isolates global header logic from page-specific views.

2. **TestNG & Cucumber-Style Fixture Injection**:
   - Using Playwright's `test.extend<CustomFixtures>`, page objects are directly injected into tests without boilerplate instantiation (`new PageObject()`).
   - `authenticatedUser` fixture encapsulates the login prerequisite (analogous to TestNG `@BeforeMethod` and Cucumber `Given User is logged in`).

3. **Gherkin BDD Support (`test.step`)**:
   - Executable BDD scenarios with `Given`, `When`, `Then` steps clearly rendered in HTML reports and CI logs.

4. **Hybrid API + E2E Automation**:
   - Integrated `ApiClient` using Playwright's `APIRequestContext` for lightning-fast API assertions and test state preparation.

5. **AI-Agent Ready**:
   - Semantic locators (`data-test`, `role`, semantic IDs) and typed interfaces make this framework directly accessible to LLM coding agents for plan generation, auto-test authoring, and self-healing.

---

## ⚡ Execution Commands

| Command                 | Action                                              |
| ----------------------- | --------------------------------------------------- |
| `npm run test`          | Run all test suites across all browsers             |
| `npm run test:chromium` | Run test suite on Chromium headless                 |
| `npm run test:headed`   | Run tests with browser window visible               |
| `npm run test:ui`       | Open Playwright interactive UI Test Runner          |
| `npm run test:api`      | Run only the REST API test suite                    |
| `npm run test:e2e`      | Run only the End-to-End browser test suite          |
| `npm run type-check`    | Run TypeScript compiler validation (`tsc --noEmit`) |
| `npm run report`        | Open the generated HTML report                      |

---

## 🔄 CI/CD Quality Gate Workflow

Defined in `.github/workflows/quality-gate.yml`:

- **Triggers**: Pull requests and commits to `main`/`master`.
- **Step 1**: Checkout code & Setup Node 20 with npm caching.
- **Step 2**: Fast static analysis & type validation (`tsc --noEmit`).
- **Step 3**: Playwright binary caching (`~/.cache/ms-playwright`).
- **Step 4**: Parallel headless Chromium execution.
- **Step 5**: Automated artifact upload (`playwright-report`, `trace.zip`) on failure.
