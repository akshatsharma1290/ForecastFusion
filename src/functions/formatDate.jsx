export const simplifyDateFormat = (dateString, format) => {
  const date = new Date(dateString);

  const todayDate = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  const day = date.toLocaleDateString("en-us", { weekday: "long" });

  if (format === "simplified") {
    return `${todayDate} ${month}, ${year}`;
  } else if (format === "day") {
    return day;
  } else if (format === "dateandmonth") {
    return `${month}, ${todayDate}`;
  }
};

export const extractTime = (dateString) => {
  let date = new Date(dateString);
  return date.getHours();
};
