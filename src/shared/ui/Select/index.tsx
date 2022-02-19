import React, { useState } from 'react';
import { Select } from 'antd';

interface ISelectCurrency {
	currencies: Array<string>;
	onChange: any;
}

export const SelectCurrency: React.FC<ISelectCurrency> = ({
	currencies,
	onChange,
}) => {
	const { Option } = Select;
	return (
		<Select
			defaultValue={currencies[0]}
			style={{ width: 120 }}
			onChange={onChange}
		>
			{currencies.map(currency => (
				<Option value={currency} key={currency}>
					{currency}
				</Option>
			))}
		</Select>
	);
};
