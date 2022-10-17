const dayjs = require("dayjs");

const dateFormat = (d, format) => {
  return dayjs(d).format(format);
};

exports.readableDate = (dateObj) => {
  return dayjs(dateObj).format("ddd, D MMMM YYYY");
};

exports.formatDate = (dateObj, format) => {
  return dateFormat(dateObj, format);
};

exports.htmlDateString = (dateObj) => {
  return dateFormat(dateObj, "YYYY-MM-DD");
};

exports.isFutureDate = (dateObj) => {
  return dayjs(dateObj).isAfter(dayjs());
};

exports.orphanWrap = (str) => {
  if (str) {
    let splitSpace = str.split(" ");
    let after = "";
    if (splitSpace.length > 2) {
      after += " ";

      let lastWord = splitSpace.pop();
      let secondLastWord = splitSpace.pop();

      after += `${secondLastWord}&nbsp;${lastWord}`;
    }

    return splitSpace.join(" ") + after;
  } else {
    return str;
  }
};
