import { createEffect, createStore, sample } from 'effector';
import { getCurrencyToday, IResponseCurrency } from 'shared/api/currency';
import { createGate } from 'effector-react';

// -------------------------- Start fetch data ------------------------------------- //

export const ConverterPageGate = createGate();

export const getAllCurrenciesFx = createEffect<void, IResponseCurrency, Error>(
	async () => await getCurrencyToday('USD')
);

const $currencies = createStore<IResponseCurrency>({
	data: {},
	query: {
		base_currency: 'USD',
		timestamp: 0,
	},
}).on(getAllCurrenciesFx.doneData, (_, currencies) => currencies);

sample({
	clock: ConverterPageGate.open,
	target: getAllCurrenciesFx,
});

export const $currenciesList = $currencies.map(currency => [
	currency.query.base_currency,
	...Object.keys(currency.data),
]);

// ----------------------------------------------------------------------- //
