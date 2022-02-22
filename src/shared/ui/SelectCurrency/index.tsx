import React from 'react';
import { Select } from 'antd';
import './style.scss';

export interface ISelectCurrency {
	currencies: Array<string>;
	selectChange: (value: string) => void;
	selectValue?: string;
}

export const SelectCurrency: React.FC<ISelectCurrency> = ({
	currencies,
	selectChange,
	selectValue,
}) => {
	const { Option } = Select;
	return (
		<Select
			defaultValue={currencies[0]}
			value={selectValue}
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
