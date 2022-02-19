import React from 'react';
import { InputNumber } from 'antd';

interface IInputCurrency {
	value: number;
	onChange: (value: number) => void;
}

export const InputCurrency: React.FC<IInputCurrency> = ({
	value,
	onChange,
}) => {
	return (
		<InputNumber
			min={1}
			defaultValue={value}
			value={value}
			controls={false}
			keyboard={false}
			onChange={event => onChange(event)}
		/>
	);
};
