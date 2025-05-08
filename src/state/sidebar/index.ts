import { SideBarManager } from "./SideBarManager";

/* Defines a sigleton instances that will be used to manage side bar state */

/* State management for the public facing side bar */
export const publicSideBarManager = new SideBarManager();

/* State management for the officer facing side bar */
export const internalSideBarManager = new SideBarManager();
