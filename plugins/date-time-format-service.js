import moment from 'moment-timezone';
import 'moment/min/locales';

export default ({app, store}, inject) => {
  inject('dt', (value, format = 'datetime') => {
    const timezone = store.state.site.settings?.timezone || moment.tz.guess();
    const dateFormat = store.state.site.settings?.date_format || 'YYYY-MM-DD';
    const timeFormat = store.state.site.settings?.time_format || 24;

    const dateTimeMoment = moment.tz(value, timezone).tz(timezone);

    if (format === 'datetime') {
      return formatDateTime(dateTimeMoment, dateFormat, timeFormat);
    } else if (format === 'date') {
      return formatDate(dateTimeMoment, dateFormat);
    } else if (format === 'time') {
      return formatTime(dateTimeMoment, timeFormat);
    } else {
      return dateTimeMoment.format(format);
    }
  });
}

function formatDateTime(dateTimeMoment, dateFormat, timeFormat, withSeconds = false) {
  return formatDate(dateTimeMoment, dateFormat) + ' ' + formatTime(dateTimeMoment, timeFormat, withSeconds);
}

function formatDate(dateTimeMoment, dateFormat) {
  return dateTimeMoment.format(dateFormat);
}

function formatTime(dateTimeMoment, timeFormat, withSeconds = false) {
  return dateTimeMoment.format(convertTimeFormat(timeFormat, withSeconds));
}

function convertTimeFormat(timeFormat, withSeconds = false) {
  return ((timeFormat == 24) ? 'HH' : 'hh') + ':mm' + (withSeconds ? ':ss' : '') + ((timeFormat == 24) ? '' : ' a');
}
