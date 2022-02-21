import React from 'react';
import { graphOfWeekButtonClicked } from 'features/graph-buttons/buttonCurrenciesOfWeek/model';

export const ButtonCurrenciesOfWeek: React.FC = () => {
	return (
		<div>
			<button onClick={() => graphOfWeekButtonClicked()}>Click</button>
		</div>
	);
};
