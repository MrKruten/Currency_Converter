import React from 'react';
import { Select } from 'antd';

export interface ISelectCurrency {
	currencies: Array<string>;
	selectChange: (value: string) => void;
}

export const SelectCurrency: React.FC<ISelectCurrency> = ({
	currencies,
	selectChange,
}) => {
	const { Option } = Select;
	return (
		<Select
			defaultValue={currencies[0]}
			style={{ width: 120 }}
			onChange={event => selectChange(event)}
		>
			{currencies.map(currency => (
				<Option value={currency} key={currency}>
					{currency}
				</Option>
			))}
		</Select>
	);
};
