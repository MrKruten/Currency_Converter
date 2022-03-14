import { API_KEY, API_URL } from 'shared/config';

import {
	getDateHalfYear,
	getDateMonth,
	getDateToday,
	getDateWeek,
} from '../lib/date.helper';

export interface IResponseCurrency {
	meta: { last_updated_at: string };
	data: { [key in string]: { code: string; value: number } };
}

export type IRangeCurrency = {
	datetime: string;
	currencies: { [key in string]: { code: string; value: number } };
};

export interface IResponseHistoricalCurrency {
	data: Array<IRangeCurrency>;
}

const getCurrencyLatest = async (
	currency: string
): Promise<IResponseCurrency> => {
	const url = `${API_URL}latest?apikey=${API_KEY}&base_currency=${currency}`;
	const response = await fetch(url);
	return await response.json();
};

const getCurrencyHistorical = async (
	currency: string,
	dateFrom: string,
	dateTo: string
): Promise<IResponseHistoricalCurrency> => {
	const url = `${API_URL}range?apikey=${API_KEY}&base_currency=${currency}&datetime_start=${dateFrom}&datetime_end=${dateTo}&accuracy=day`;
	const response = await fetch(url);
	return await response.json();
};

export const getCurrencyToday = async (currency: string) =>
	await getCurrencyLatest(currency);

export const getCurrencyWeek = async (currency: string) => {
	const dateTo = getDateToday();
	const dateFrom = getDateWeek();
	return await getCurrencyHistorical(currency, dateFrom, dateTo);
};

export const getCurrencyMonth = async (currency: string) => {
	const dateTo = getDateToday();
	const dateFrom = getDateMonth();
	return await getCurrencyHistorical(currency, dateFrom, dateTo);
};

export const getCurrencyHalfYear = async (currency: string) => {
	const dateTo = getDateToday();
	const dateFrom = getDateHalfYear();
	return await getCurrencyHistorical(currency, dateFrom, dateTo);
};
