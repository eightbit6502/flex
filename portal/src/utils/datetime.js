// src/utils/datetime.js

import { DateTime } from 'luxon';

/**
 * Converts a UTC datetime string to the local time of the user.
 *
 * @param {string} utcDateTimeString - The UTC datetime string from PostgreSQL.
 * @returns {string} - The local datetime string.
 */
export function convertToUserLocalTime(utcDateTimeString) {
  // Parse the UTC datetime string into a Luxon DateTime object
  const utcDateTime = DateTime.fromISO(utcDateTimeString, { zone: 'utc' });

  // Convert the DateTime object to the local time zone of the user
  const localDateTime = utcDateTime.setZone(DateTime.local().zoneName);

  // Return the local datetime string in a desired format
  return localDateTime.toLocaleString(DateTime.DATETIME_MED);
}

/**
 * Returns an object containing today's date and a date 30 days behind today's date.
 *
 * @returns {Object} - An object with 'today' and 'logUntil' properties.
 */
export function getTodayAndUntil() {
	const today = DateTime.local();
	const previous30 = today.minus({ days: 30 });

	return {
	  today: today.toISODate(), // Or use .toLocaleString() if you prefer a different format
	  until: previous30.toISODate() // Or use .toLocaleString() if you prefer a different format
	};
}
