export class DateUtils {
  /**
   * Converts a Date object into a human-friendly string format.
   * Example: "August 1, 2025"
   */
  static toReadableDateString(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
