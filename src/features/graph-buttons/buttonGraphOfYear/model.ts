import { createEffect, createEvent, sample } from 'effector';
import {
	getCurrencyYear,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import { $initialSelectedCurrency } from 'features/currency-conversion/model';

export const graphOfYearButtonClicked = createEvent();
export const graphOfYearFx = createEffect<
	string,
	IResponseHistoricalCurrency,
	Error
>(async currency => await getCurrencyYear(currency));

sample({
	clock: graphOfYearButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfYearFx,
});