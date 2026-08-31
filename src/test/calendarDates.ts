const displayedYear = new Date().getFullYear();

export const july = (day: number) => `${displayedYear}/7/${day}`;

export const julyIso = (day: number) =>
  `${displayedYear}-07-${String(day).padStart(2, "0")}`;
