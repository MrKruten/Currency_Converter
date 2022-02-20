import React from 'react';
import { CurrencyConversion } from 'features/currency-conversion';
import { GraphCurrency } from 'entities/graph/ui';

const ConverterPage = () => {
	return (
		<div>
			<p>Converter Page</p>
			<CurrencyConversion />
			<GraphCurrency />
		</div>
	);
};

export default ConverterPage;
