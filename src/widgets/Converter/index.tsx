import React from 'react';
import { CurrencyConversion } from 'features/currency-conversion';

import './style.scss';

export const Converter: React.FC = () => {
	return (
		<div className='converter'>
			<div className='converter__wrapper'>
				<CurrencyConversion />
			</div>
		</div>
	);
};
