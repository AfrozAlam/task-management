export const dateObjectToString = (dateObject) => {
  const date = new Date(dateObject);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const dateString = `${month}/${day}/${year}`;
  return dateString;
}

