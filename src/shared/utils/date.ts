// utils/date.ts
/**
 * Formats a date into a full date string (e.g., "Monday, January 1, 2024")
 * @param date - The date to format. Defaults to current date if not provided
 * @returns Formatted date string
 */
const formattedDate = (date: Date = new Date()): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Gets the short day name of the week (e.g., "Mon")
 * @param date - The date to get the day from
 * @returns Short day name
 */
const day = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

/**
 * Formats a date into a short month and day format (e.g., "Jan 1")
 * @param date - The date to format
 * @returns Formatted month and day string
 */
const formattedDay = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Formats a date into a time string (e.g., "2:30 PM")
 * @param date - The date to format
 * @returns Formatted time string
 */
const time = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export { formattedDate, time, formattedDay, day };
