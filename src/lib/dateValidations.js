import HabitTracker from '@/models/HabitTracker.model';
import { DateTime } from 'luxon';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const validateDates = async (start_date) => {
  console.log(`validate : ${start_date}`);
  // Ensure start_date is a DateTime object (in user's time zone)
  let startDate = DateTime.fromISO(start_date, { zone: userTimeZone });
  // Check if start_date is valid
  if (!startDate.isValid) {
    console.log('start date is invalid.');
    return {
      is_active: false,
      is_start_date_valid: false,
      errorResp: 'start date is invalid',
    };
  }

  // Get today's date in the user's time zone
  const today = DateTime.now().setZone(userTimeZone).startOf('day'); // startOf('day') ensures comparing only date part
  console.log(startDate, today)
  // Compare start date with today
  if (startDate < today) {
    console.log('start date is before today.');
    return {
      is_active: false,
      is_start_date_valid: false,

      errorResp: 'start date cannot be in the past',
    };
  }
  if (startDate > today) {
    console.log('start date is after today.');
    return {
      is_active: false,
      is_start_date_valid: true,
      errorResp: null,
      today,
      startDate
    };
  }

  console.log('start date is today.');
  return {
    is_active: true,
    is_start_date_valid: true,
    is_tracker_date_valid: false,
    errorResp: null,
  };
};

const validateHabitTrackerDates = async (get_recent_habit_tracker_logged_at) => {
  console.log(`validate : ${get_recent_habit_tracker_logged_at}`);
  // Ensure start_date is a DateTime object (in user's time zone)
  let recentHabitTrackerDate = DateTime.fromISO(get_recent_habit_tracker_logged_at, {zone : userTimeZone});
  const today = DateTime.now().setZone(userTimeZone).startOf('day');
  console.log(recentHabitTrackerDate, today)
  if(recentHabitTrackerDate > today) {
    console.log(`cannot add more tracker until ${recentHabitTrackerDate}`)
    return {
      is_valid : false,
      recentHabitTrackerDate,
      today
    }
  }
  // return startDate;
  return {
    is_valid: true,
    recentHabitTrackerDate,
    today
  }
}
//need 3 inputs here: habit_tracker_status, isHabitValid, get_recent_habit_tracker
const calculateHabitStrengthInTracker = (habit_tracker_status, isHabitValid, get_recent_habit_tracker) => {
  let new_habit_tracker_strength;
  let new_expected_habit_tracker_strength;

  // if previous tracker does not exist, then strengths will be initial from habit. 
  if (!get_recent_habit_tracker) {
    switch (habit_tracker_status) {
      case 'Completed':
        console.log(`no previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number((isHabitValid.initial_habit_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        new_expected_habit_tracker_strength = Number((isHabitValid.initial_habit_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        break;
      case 'Missed':
        console.log(`no previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number(isHabitValid.initial_habit_strength);
        new_expected_habit_tracker_strength = Number((isHabitValid.initial_habit_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        break;

      case 'Pending':
        console.log(`no previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number(isHabitValid.initial_habit_strength);
        break;
      default:
        throw new Error('invalid habit tracker status');
    }

  } else {
    // previous tracker exist, strengths can be calculated with previous habits now
    switch (habit_tracker_status) {
      case 'Completed':
        console.log(`previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number((get_recent_habit_tracker.habit_tracker_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        new_expected_habit_tracker_strength = Number((get_recent_habit_tracker.expected_habit_tracker_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        break;
      case 'Missed':
        console.log(`previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number(get_recent_habit_tracker.habit_tracker_strength).toFixed(2);
        new_expected_habit_tracker_strength = Number((get_recent_habit_tracker.expected_habit_tracker_strength * isHabitValid.initial_growth_rate_multiplier)).toFixed(2);
        break;
      case 'Pending':
        console.log(`previous tracker found, tracker - status : ${habit_tracker_status}`)
        new_habit_tracker_strength = Number(get_recent_habit_tracker.habit_tracker_strength).toFixed(2);
        new_expected_habit_tracker_strength = Number(get_recent_habit_tracker.habit_tracker_strength).toFixed(2);
        break;
      default:
        throw new Error('invalid habit tracker status');
    }
  }

  return { new_habit_tracker_strength, new_expected_habit_tracker_strength };
}

const getDateRanges = () => {
  const now = new Date();

  // Start of Today (Local Time)
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));

  // End of Today (Local Time)
  const endOfToday = new Date(now.setHours(23, 59, 59, 999));

  // Start of Yesterday (Local Time)
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  // End of Yesterday (Local Time)
  const endOfYesterday = new Date(startOfYesterday);
  endOfYesterday.setHours(23, 59, 59, 999);

  return {
    startOfToday,
    endOfToday,
    startOfYesterday,
    endOfYesterday,
  };
};


export { validateDates, validateHabitTrackerDates, calculateHabitStrengthInTracker, getDateRanges };
