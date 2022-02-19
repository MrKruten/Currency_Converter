import React from 'react';
import { Select } from 'antd';

interface ISelectCurrency {
	currencies: Array<string>;
}

export const SelectCurrency: React.FC<ISelectCurrency> = ({ currencies }) => {
	const { Option } = Select;
	return (
		<Select
			defaultValue={currencies[0]}
			style={{ width: 120 }}
			onChange={e => console.log(e)}
		>
			{currencies.map(currency => (
				<Option value={currency} key={currency}>
					{currency}
				</Option>
			))}
		</Select>
	);
};
