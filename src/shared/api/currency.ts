import { API_KEY, API_URL } from 'shared/config';

import {
	getDateMonth,
	getDateToday,
	getDateWeek,
	getDateYear,
} from '../lib/date.helper';

export interface IResponseCurrency {
	query: IQuery;
	data: any;
}

export interface IQuery {
	base_currency: string;
	timestamp: number;
}

const getCurrency = async (
	currency: string,
	dateFrom?: string,
	dateTo?: string
): Promise<IResponseCurrency> => {
	const url = dateFrom
		? `${API_URL}historical?apikey=${API_KEY}&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`
		: `${API_URL}latest?apikey=${API_KEY}&base_currency=${currency}`;
	const response = await fetch(url);
	return await response.json();
};

export const getCurrencyToday = async (currency: string) =>
	await getCurrency(currency);

export const getCurrencyWeek = async (currency: string) => {
	const dateFrom = getDateToday();
	const dateTo = getDateWeek();
	return await getCurrency(currency, dateFrom, dateTo);
};

export const getCurrencyMonth = async (currency: string) => {
	const dateFrom = getDateToday();
	const dateTo = getDateMonth();
	return await getCurrency(currency, dateFrom, dateTo);
};

export const getCurrencyYear = async (currency: string) => {
	const dateFrom = getDateToday();
	const dateTo = getDateYear();
	return await getCurrency(currency, dateFrom, dateTo);
};
