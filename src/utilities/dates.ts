export const formatDate = (date: string) => {
  return date
    .split("T")[0]
    .split("-")
    .map((num) => String(Number(num)))
    .join("/");
};

export const compareDates = (dateString: string) => {
  const date = new Date(dateString);

  const isBefore = (compareDate: string) => date < new Date(compareDate);
  const isAfter = (compareDate: string) => date > new Date(compareDate);
  const isWithinRange = (startDate: string, endDate: string) => {
    return !isBefore(startDate) && !isAfter(endDate);
  };

  return { isBefore, isAfter, isWithinRange };
};
