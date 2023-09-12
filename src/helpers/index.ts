import { DATE_FORMAT } from '@/constants';
import moment from 'moment';

export const isEmptyText = (str?: string) => !str || str.trim() === '';

export const dateFormat = (date: any, format: string = DATE_FORMAT) => {
  return moment(date).format(format);
};
