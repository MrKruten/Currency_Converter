import { createEffect, createEvent, sample } from 'effector';
import {
	getCurrencyHalfYear,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import { $initialSelectedCurrency } from 'features/currency-conversion/model';

export const graphOfHalfYearButtonClicked = createEvent();
export const graphOfHalfYearFx = createEffect<
	string,
	IResponseHistoricalCurrency,
	Error
>(async currency => await getCurrencyHalfYear(currency));

sample({
	clock: graphOfHalfYearButtonClicked,
	source: $initialSelectedCurrency,
	target: graphOfHalfYearFx,
});
