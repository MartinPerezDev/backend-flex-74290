import moment from "moment";

const calculateDays = (newBirthday) => {
  const now = moment();
  const birthDay = moment(newBirthday, "DD-MM-YYYY");

  const days = now.diff(birthDay, "days");

  return days;
}

console.log( calculateDays("14/09/1983") );