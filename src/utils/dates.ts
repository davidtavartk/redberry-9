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
