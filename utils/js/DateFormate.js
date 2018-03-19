const formatTime = date => {
  const year = date.getFullYear()
  const month = monthToString(date.getMonth())
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function monthToString(month) {
  return Array.from(Array(13).keys())[Math.max(Math.min(++month, 12), 0)]
}

const dateFormate = (date, formate) => {
  if(!formate) {
    return '';
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = formatNumber(date.getHours());
  const minute = formatNumber(date.getMinutes());
  const second = formatNumber(date.getSeconds());
  const fullMonth = monthToString(month) < 10 ? ('0' + monthToString(month)) : fullMonth,
    fullDay = day < 10 ? ('0' + day) : day;
  return formate.replace(/yyyy/g, year + '').
    replace(/MM/g, fullMonth + '').
    replace(/dd/g, fullDay + '').
    replace(/HH/g, hour + '').
    replace(/mm/g, minute + '').
    replace(/ss/g, second + '');
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  dateFormate: dateFormate
}
