export class DateUtils {
  /**
   * Converts a Date (or ISO string) to "MM/DD/YYYY" format.
   * @param input A Date object or a date string
   * @returns A formatted string like "04/09/2025"
   */
  static toDateString(input: Date | string): string {
    const date = typeof input === "string" ? new Date(input) : input;

    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }

  /**
   * Returns the number of days between two dates.
   */
  static daysBetween(start: Date | string, end: Date | string): number {
    const d1 = typeof start === "string" ? new Date(start) : start;
    const d2 = typeof end === "string" ? new Date(end) : end;

    const diff = Math.abs(d2.getTime() - d1.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Formats a date to "Month Day, Year" (e.g., "April 9, 2025")
   */
  static toLongDate(input: Date | string): string {
    const date = typeof input === "string" ? new Date(input) : input;
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
}
