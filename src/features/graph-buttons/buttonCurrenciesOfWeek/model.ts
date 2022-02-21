import { createEffect, createEvent, createStore, sample } from 'effector';
import {
	getCurrencyWeek,
	IResponseCurrency,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';

export const graphOfWeekButtonClicked = createEvent();
const graphOfWeekFx = createEffect<
	void,
	IResponseHistoricalCurrency | IResponseCurrency,
	Error
>(async () => await getCurrencyWeek('USD'));

export const $currenciesOfWeek = createStore<
	IResponseHistoricalCurrency | IResponseCurrency
>({
	data: {},
	query: {
		base_currency: 'USD',
		timestamp: 0,
	},
}).on(graphOfWeekFx.doneData, (_, data) => data);

sample({
	source: graphOfWeekButtonClicked,
	target: graphOfWeekFx,
});

$currenciesOfWeek.watch(el => console.log(el));

$currenciesOfWeek.watch(el => console.log(el));
