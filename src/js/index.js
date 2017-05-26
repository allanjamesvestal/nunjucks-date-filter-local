/**
 * nunjucks-date-filter-local
 * Fork from https://github.com/piwi/nunjucks-date-filter
 *
 * Copyright (c) 2015 Pierre Cassat
 * Licensed under the Apache 2.0 license.
 */

import moment from 'moment';
import nlib from 'nunjucks/src/lib';

// default default format (ISO 8601)
let dateFilterDefaultFormat = null;

// a date filter for Nunjucks
// usage: {{ my_date | date(format) }}
// see: <http://momentjs.com/docs/>
export default function dateFilter(date, format, ...args) {
  let result;
  const errs = [];
  // const args = [];
  let obj;
  // Array.prototype.push.apply(args, arguments);

  try {
    obj = moment(date);
  } catch (err) {
    errs.push(err);
  }

  if (obj) {
    try {
      if (obj[format] && nlib.isFunction(obj[format])) {
        // result = obj[format].apply(obj, args.slice(2));
        result = obj[format](obj, ...args.slice(2));
      } else if (dateFilterDefaultFormat !== null) {
        result = obj.format(format || dateFilterDefaultFormat);
      } else {
        result = obj.format(format);
      }
    } catch (err) {
      errs.push(err);
    }
  }

  if (errs.length) {
    return errs.join('\n');
  }

  return result;
}


// set default format for date
export const setDefaultFormat = (format) => {
  dateFilterDefaultFormat = format;
};


// install the filter to nunjucks environment
export const install = (env, customName) => {
  (env).addFilter(customName || 'date', dateFilter);
};

