import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import moment from "moment";

export const generateWhatsappMessage = (user: any, organizationName: string) => {
  return `https://wa.me/91${user.phoneNumber}?text=` +
    `Thank you ${user?.name} for visiting the Lions eye hospital vision center ${organizationName}!` +
    "%0a" +
    "ID: " +
    user?.intId +
    "%0a" +
    "Delivery Date: " +
    moment(user?.info?.delevery_date).format("DD-MM-YYYY") +
    "%0a" +
    "Glass Type: " +
    user?.info?.glass_type +
    "%0a------------------%0a" +
    "Right Eye:" +
    "%0aSPH: " +
    user?.info?.rSPHu +
    " / " +
    user?.info?.rSPHb +
    "%0aCYL: " +
    user?.info?.rCYLu +
    " / " +
    user?.info?.rCYLb +
    "%0aAXIS: " +
    user?.info?.rAXISu +
    " / " +
    user?.info?.rAXISb +
    "%0aVISION: " +
    user?.info?.rVISIONu +
    " / " +
    user?.info?.rVISIONb +
    "%0a------------------%0a" +
    "Left Eye:" +
    "%0aSPH: " +
    user?.info?.lSPHu +
    " / " +
    user?.info?.lSPHb +
    "%0aCYL: " +
    user?.info?.lCYLu +
    " / " +
    user?.info?.lCYLb +
    "%0aAXIS: " +
    user?.info?.lAXISu +
    " / " +
    user?.info?.lAXISb +
    "%0aVISION: " +
    user?.info?.lVISIONu +
    " / " +
    user?.info?.lVISIONb +
    "%0a------------------%0a" +
    "Advance: ₹" +
    user?.info?.advance +
    "%0aBalance: ₹" +
    user?.info?.balance +
    "%0a------------------%0a" +
    "Please visit again after six month!"
}
