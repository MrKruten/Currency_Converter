import { createEffect, createEvent, createStore, sample } from 'effector';
import {
	getCurrencyWeek,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import {
	$initialSelectedCurrency,
	ConverterPageGate,
} from 'features/currency-conversion/model';

import { graphOfYearFx } from '../buttonGraphOfYear/model';
import { graphOfMonthFx } from '../buttonGraphOfMonth/model';

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
	clock: ConverterPageGate.open,
	source: $initialSelectedCurrency,
	target: graphOfWeekFx,
});

sample({
	clock: graphOfWeekButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfWeekFx,
});
