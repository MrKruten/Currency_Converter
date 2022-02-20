import React from 'react';
import { IInputCurrency } from 'shared/ui/InputCurrency';
import { ISelectCurrency } from 'shared/ui/SelectCurrency';
import { InputCurrency, SelectCurrency } from 'shared/ui';

interface IInputSelect extends IInputCurrency, ISelectCurrency {}

export const InputSelect: React.FC<IInputSelect> = ({
	value,
	inputChange,
	selectChange,
	currencies,
	selectValue,
}) => {
	return (
		<>
			<InputCurrency value={value} inputChange={inputChange} />
			<SelectCurrency
				currencies={currencies}
				selectChange={selectChange}
				selectValue={selectValue}
			/>
		</>
	);
};
