import type { CommunityName } from "@prisma/client";

export class TextUtils {
  static resolveClubTextColor(value: CommunityName): string {
    switch (value) {
      case "AI":
        return "text-ai";
      case "WEB":
        return "text-web";
      case "APPS":
        return "text-app";
      case "GAMES":
        return "text-games";
      case "SYSTEMS":
        return "text-systems";
      case "HACKATHON":
        return "text-hackathon";
      default:
        return "";
    }
  }
  static resolvePostfixCommunityColor(value: CommunityName): string {
    switch (value) {
      case "AI":
        return "-ai";
      case "WEB":
        return "-web";
      case "APPS":
        return "-app";
      case "GAMES":
        return "-games";
      case "SYSTEMS":
        return "-systems";
      case "HACKATHON":
        return "-hackathon";
      default:
        return "";
    }
  }
}
