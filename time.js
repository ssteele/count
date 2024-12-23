
export const getDatesForRange = (start, end) => {
  let dates = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    dates.push(new Date(dt.toUTCString()));
  }
  return dates;
};

export const getIsoDates = (dates) => {
  return dates.map(d => {
    d.setUTCHours(0);
    return d.toISOString();
  })
}

export const filterWeekdays = (dates) => {
  const weekdays = [1, 2, 3, 4, 5];
  return dates.filter(d => {
    // console.log('SHS d.getDay():', d.getDay()); // @debug
    return weekdays.includes(d.getDay());
  })
}

export const generateDates = (start, end) => {
  let dates;
  dates = getDatesForRange(start, end);
  dates = filterWeekdays(dates);
  dates = getIsoDates(dates);
  return dates;
}