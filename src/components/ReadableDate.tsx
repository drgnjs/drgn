import React from 'react'
import day from 'dayjs'
import locale from 'dayjs/plugin/localizedFormat'
import relative from 'dayjs/plugin/relativeTime'

day.extend(locale)
day.extend(relative)

const Date = ({ date, format, toNow, toDate, prefix, suffix }: {
  date?: string | Date,
  format?: string,
  toNow?: boolean, // historical
  toDate?: string | Date, // futuristic
  prefix?: string,
  suffix?: string
}) => {
  if (!prefix) prefix = ''
  if (!suffix) suffix = ''

  return <>{prefix + (toNow ? day(date).fromNow() : toDate ? day().to(toDate) : day(date).format(format)) + suffix}</>
}

export default Date