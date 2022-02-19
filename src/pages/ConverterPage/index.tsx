import React from 'react';

// eslint-disable-next-line no-restricted-imports
import { SelectCurrency } from '../../shared/ui/Select';

const moch = ['USD', 'RUB', 'EUR', 'FUC'];

const ConverterPage = () => {
	return (
		<div>
			<p>Converter Page</p>
			<SelectCurrency currencies={moch} />
		</div>
	);
};

export default ConverterPage;
