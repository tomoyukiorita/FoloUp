import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
  return asciiString;
}

export function formatTimestampToDateHHMM(timestamp: string): string {
  const date = new Date(timestamp);

  // Format date to YYYY-MM-DD
  const datePart =
    date.getDate().toString().padStart(2, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getFullYear();

  // Format time to HH:MM
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const timePart = `${hours}:${minutes}`;

  return `${datePart} ${timePart}`;
}

export function testEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function convertSecondstoMMSS(seconds: number) {
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}
