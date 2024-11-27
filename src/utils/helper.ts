import { v4 as uuid } from 'uuid';

export function generateUuid() {
  return uuid();
}

export function generateString() {
  return Math.random().toString(36).slice(2);
}

export function daysAgoDate(days: number) {
  const hours = days * 24;
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
}
