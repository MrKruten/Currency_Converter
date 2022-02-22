import { combine } from 'effector';
import {
	graphOfWeekFx,
	graphOfHalfYearFx,
	graphOfMonthFx,
} from 'features/graph-buttons';
import { getAllCurrenciesFx } from 'features/currency-conversion/model';

export const $loader = combine({
	graphWeek: graphOfWeekFx.pending,
	graphMouth: graphOfMonthFx.pending,
	graphYear: graphOfHalfYearFx.pending,
	getAllCurrencies: getAllCurrenciesFx.pending,
});
