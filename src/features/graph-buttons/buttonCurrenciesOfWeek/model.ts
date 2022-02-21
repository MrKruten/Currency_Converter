import { createEffect, createEvent, createStore, sample } from 'effector';
import {
	getCurrencyMonth,
	getCurrencyWeek,
	getCurrencyYear,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';

import { $initialSelectedCurrency } from '../../currency-conversion/model';

const createDataGraph = (currenciesOfPeriod: IResponseHistoricalCurrency) => {
	return Object.entries(currenciesOfPeriod.data).map(data => ({
		name: data[0],
		...data[1],
	}));
};

export const graphOfWeekButtonClicked = createEvent();
const graphOfWeekFx = createEffect<string, IResponseHistoricalCurrency, Error>(
	async currency => await getCurrencyWeek(currency)
);

export const graphOfMonthButtonClicked = createEvent();
const graphOfMonthFx = createEffect<string, IResponseHistoricalCurrency, Error>(
	async currency => await getCurrencyMonth(currency)
);

export const graphOfYearButtonClicked = createEvent();
const graphOfYearFx = createEffect<string, IResponseHistoricalCurrency, Error>(
	async currency => await getCurrencyYear(currency)
);

const $currenciesHistory = createStore<IResponseHistoricalCurrency>({
	data: {},
	query: {
		base_currency: 'USD',
		timestamp: 0,
	},
})
	.on(graphOfWeekFx.doneData, (_, data) => data)
	.on(graphOfMonthFx.doneData, (_, data) => data)
	.on(graphOfYearFx.doneData, (_, data) => data);

export const $dataGraph = $currenciesHistory.map(data => createDataGraph(data));

sample({
	clock: graphOfWeekButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfWeekFx,
});

sample({
	clock: graphOfMonthButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfMonthFx,
});

sample({
	clock: graphOfYearButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfYearFx,
});
