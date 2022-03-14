import { createEffect, createEvent, createStore, sample } from 'effector';
import {
	getCurrencyWeek,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import {
	$initialSelectedCurrency,
	ConverterPageGate,
} from 'features/currency-conversion/model';

import { graphOfHalfYearFx } from '../buttonGraphOfHalfYear/model';
import { graphOfMonthFx } from '../buttonGraphOfMonth/model';

const createDataGraph = (currenciesOfPeriod: IResponseHistoricalCurrency) => {
	const data = currenciesOfPeriod.data.map(el => {
		const temp = Object.values(el.currencies);
		const currencies = {};
		for (let i = 0; i < temp.length; i++) {
			// @ts-ignore
			currencies[temp[i].code] = temp[i].value;
		}
		return {
			name: el.datetime.slice(0, 10),
			...currencies,
		};
	});
	return data;
};

export const graphOfWeekButtonClicked = createEvent();
export const graphOfWeekFx = createEffect<
	string,
	IResponseHistoricalCurrency,
	Error
>(async currency => await getCurrencyWeek(currency));

const $currenciesHistory = createStore<IResponseHistoricalCurrency>({
	data: [],
})
	.on(graphOfWeekFx.doneData, (_, data) => data)
	.on(graphOfMonthFx.doneData, (_, data) => data)
	.on(graphOfHalfYearFx.doneData, (_, data) => data);

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

// TRABLE
sample({
	clock: $initialSelectedCurrency,
	target: graphOfWeekFx,
});
