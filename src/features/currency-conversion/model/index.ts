// eslint-disable-next-line import/no-extraneous-dependencies
import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector-logger';
import {
	getCurrencyToday,
	IResponseCurrency,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import { createGate } from 'effector-react';

// -------------------------- Start fetch data ------------------------------------- //

export const ConverterPageGate = createGate();
const $example = createStore('USD');

export const getAllCurrenciesFx = createEffect<
	string,
	IResponseCurrency,
	Error
>(async (currency: string) => await getCurrencyToday(currency));

export const selectClicked = createEvent<string>();

export const getCurrentCurrencyFx = createEffect<
	string,
	IResponseCurrency,
	Error
>(async (nameCurrency: string) => await getCurrencyToday(nameCurrency));

sample({
	source: selectClicked,
	target: getCurrentCurrencyFx,
});

export const $currencies = createStore<IResponseCurrency>({
	data: {},
	query: {
		base_currency: 'USD',
		timestamp: 0,
	},
})
	.on(getAllCurrenciesFx.doneData, (_, currencies) => currencies)
	.on(getCurrentCurrencyFx.doneData, (_, currencies) => currencies);

sample({
	clock: ConverterPageGate.open,
	source: $example,
	target: getAllCurrenciesFx,
});

export const $currenciesList = combine($currencies, currencies => {
	const newData = [...Object.keys(currencies.data)].filter(
		el => el !== currencies.query.base_currency
	);
	return [currencies.query.base_currency, ...newData];
});

// ----------------------------------------------------------------------- //
