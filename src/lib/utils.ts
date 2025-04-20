
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  try {
    // If date is a string, convert it to a Date object
    const dateObject = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObject.getTime())) {
      return "Invalid date";
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObject);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

export function generateId(): string {
  return uuidv4();
}
