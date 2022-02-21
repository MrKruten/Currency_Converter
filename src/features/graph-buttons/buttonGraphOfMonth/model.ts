import { createEffect, createEvent, sample } from 'effector';
import {
	getCurrencyMonth,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import { $initialSelectedCurrency } from 'features/currency-conversion/model';

export const graphOfMonthButtonClicked = createEvent();
export const graphOfMonthFx = createEffect<
	string,
	IResponseHistoricalCurrency,
	Error
>(async currency => await getCurrencyMonth(currency));

sample({
	clock: graphOfMonthButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfMonthFx,
});