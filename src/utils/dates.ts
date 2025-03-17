export const formatGeorgianDate = (dateString: string): string => {
  const date = new Date(dateString);

  const georgianMonths = [
    "იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ",
    "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"
  ];

  const day = date.getDate();
  const month = georgianMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const formatGeorgianDateWithWeekday = (dateString: string): string => {
  const date = new Date(dateString);

  const georgianWeekdays = [
    "კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"
  ];
  const weekday = georgianWeekdays[date.getDay()];

  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = date.getMonth() + 1; // JS months are 0-based
  const year = date.getFullYear();

  return `${weekday} - ${day}/${month}/${year}`;
};
