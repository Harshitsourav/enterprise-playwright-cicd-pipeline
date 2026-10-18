/**
 * Reusable structured logger for test execution
 */
export class Logger {
  private static format(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  static info(message: string): void {
    console.log(this.format("INFO", message));
  }

  static step(stepNumber: number | string, message: string): void {
    console.log(this.format(`STEP ${stepNumber}`, message));
  }

  static warn(message: string): void {
    console.warn(this.format("WARN", message));
  }

  static error(message: string, error?: unknown): void {
    console.error(this.format("ERROR", message), error || "");
  }
}
