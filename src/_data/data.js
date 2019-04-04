const { DateTime } = require("luxon");
module.exports = function () {

  const currentTime = DateTime.local().toFormat('dd MMMM yyyy')

  return { today: currentTime }
}
