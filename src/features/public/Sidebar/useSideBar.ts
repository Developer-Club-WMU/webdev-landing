import { publicSideBarManager } from "@/state/sidebar";

export function useSideBar() {
  function clearOpenKey() {
    publicSideBarManager.setOpenKey("");
  }

  return { clearOpenKey };
}
