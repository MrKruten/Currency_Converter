import { combine } from 'effector';
import {
	graphOfWeekFx,
	graphOfYearFx,
	graphOfMonthFx,
} from 'features/graph-buttons';
import { getAllCurrenciesFx } from 'features/currency-conversion/model';

export const $loader = combine({
	graphWeek: graphOfWeekFx.pending,
	graphMouth: graphOfMonthFx.pending,
	graphYear: graphOfYearFx.pending,
	getAllCurrencies: getAllCurrenciesFx.pending,
});
