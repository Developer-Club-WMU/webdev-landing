import { PublicSideBarManager } from "./SideBarManager";

/* Defines a sigleton instances that will be used to manage side bar state */

/* State management for the public facing side bar */
export const publicSideBarManager = new PublicSideBarManager();

/* State management for the officer facing side bar */
export const officerSideBarManager = new PublicSideBarManager();

/* State management for the member facing side bar */
export const memberSideBarManager = new PublicSideBarManager();

/* State management for the client facing side bar */
export const clientSideBarManager = new PublicSideBarManager();
