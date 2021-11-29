export function checkIfStoreOpened(openingHours) {
  if (!openingHours) {
    return { opened: false };
  }
  const now = new Date();
  const todaysDay = getTodaysDay(now.getDay());
  // console.log(todaysDay);
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // check if the store is closed on today's day
  if (!openingHours[todaysDay].opened) {
    return { opened: false };
  }

  // check if the current time is inside the opening time range of the store
  const openingTime = openingHours[todaysDay].times.open;
  const closingTime = openingHours[todaysDay].times.close;
  const storeOpenHours = openingTime.substring(0, 2);
  const storeOpenMinutes = openingTime.substring(3, 5);
  const storeCloseHours = closingTime.substring(0, 2);
  const storeCloseMinutes = closingTime.substring(3, 5);

  if (
    !compareCurrentAndOpeningTime(
      currentHours,
      currentMinutes,
      storeOpenHours,
      storeOpenMinutes
    ) ||
    !compareCurrentAndClosingTime(
      currentHours,
      currentMinutes,
      storeCloseHours,
      storeCloseMinutes
    )
  ) {
    return { opened: false };
  }
  return {
    opened: true,
    todaysOpeningTimes: `${openingTime} - ${closingTime}`,
  };
}

function getTodaysDay(dayCounter) {
  let day = "";
  switch (dayCounter) {
    case 0:
      day = "sunday";
      break;
    case 1:
      day = "monday";
      break;
    case 2:
      day = "tuesday";
      break;
    case 3:
      day = "wednesday";
      break;
    case 4:
      day = "thursday";
      break;
    case 5:
      day = "friday";
      break;
    case 6:
      day = "saturday";
      break;
    default:
      break;
  }
  return day;
}

function compareCurrentAndOpeningTime(
  currentHours,
  currentMinutes,
  storeOpenHours,
  storeOpenMinutes
) {
  // check if the current hour is smaller than the opening hours -> we are before opening time
  if (currentHours < storeOpenHours) {
    return false;
  }
  // now, the currentHours are either bigger or the same as the opening hours
  // therefore, we check if the current hours are bigger. If yes, we return true
  if (currentHours > storeOpenHours) {
    return true;
  }
  // if not, the hours have to be the same. We check the minutes
  if (currentMinutes < storeOpenMinutes) {
    return false;
  }
  // if the minutes are bigger or the same, we return true
  return true;
}

function compareCurrentAndClosingTime(
  currentHours,
  currentMinutes,
  storeCloseHours,
  storeCloseMinutes
) {
  // check if the current hour is bigger than the opening hours -> we are after opening time
  if (currentHours > storeCloseHours) {
    return false;
  }
  // now, the currentHours are either smaller or the same as the opening hours
  // therefore, we check if the current hours are smaller. If yes, we return true
  if (currentHours < storeCloseHours) {
    return true;
  }
  // if not, the hours have to be the same. We check the minutes
  if (currentMinutes > storeCloseMinutes) {
    return false;
  }
  // if the minutes are smaller or the same, we return true
  return true;
}
