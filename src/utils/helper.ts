import { v4 as uuid } from 'uuid';

export function generateUuid() {
  return uuid();
}

export function generateString() {
  return Math.random().toString(36).slice(2);
}
