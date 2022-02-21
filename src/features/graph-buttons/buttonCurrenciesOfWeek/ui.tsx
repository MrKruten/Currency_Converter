import React from 'react';
import {
	graphOfMonthButtonClicked,
	graphOfWeekButtonClicked,
	graphOfYearButtonClicked,
} from 'features/graph-buttons/buttonCurrenciesOfWeek/model';

export const ButtonCurrenciesOfWeek: React.FC = () => {
	return (
		<div>
			<button onClick={() => graphOfWeekButtonClicked()}>Click W</button>
			<button onClick={() => graphOfMonthButtonClicked()}>Click M</button>
			<button onClick={() => graphOfYearButtonClicked()}>Click Y</button>
		</div>
	);
};
