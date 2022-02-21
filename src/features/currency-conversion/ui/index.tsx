import React, { useEffect, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { InputSelect } from 'entities/InputSelect';
import { Button } from 'antd';

import {
	$currencies,
	$currenciesList,
	ConverterPageGate,
	selectClicked,
} from '../model';

const SwitchIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			fill='currentColor'
		>
			<path d='M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z' />
		</svg>
	);
};

export const CurrencyConversion = () => {
	useGate(ConverterPageGate);
	const currenciesList = useStore($currenciesList);
	const currencies = useStore($currencies);

	const [basedValue, setBasedValue] = useState(1);
	const [basedSelect, setBasedSelect] = useState(currenciesList[0]);
	const [wantedValue, setWantedValue] = useState<number>(1);
	const [wantedSelect, setWantedSelect] = useState(currenciesList[0]);

	useEffect(() => {
		if (basedSelect !== wantedSelect) {
			setWantedValue(currencies.data[wantedSelect]);
		}
	}, [currencies]);

	const multiply = (value: number, currency: string): number => {
		return basedSelect === wantedSelect
			? basedValue
			: value * currencies.data[currency];
	};

	const divide = (value: number, currency: string): number => {
		return basedSelect === wantedSelect
			? basedValue
			: value / currencies.data[currency];
	};

	const basedValueChange = (value: number) => {
		setBasedValue(value);
		let newValue = 0;
		if (basedSelect !== wantedSelect) {
			newValue = multiply(value, wantedSelect);
		} else {
			newValue = value;
		}
		setWantedValue(newValue);
	};

	const basedSelectChange = (currency: string) => {
		setBasedValue(1);
		setBasedSelect(currency);
		selectClicked(currency);
	};

	const wantedValueChange = (value: number) => {
		setWantedValue(value);
		let newValue = 0;
		if (basedSelect !== wantedSelect) {
			newValue = divide(value, wantedSelect);
		} else {
			newValue = value;
		}
		setBasedValue(newValue);
	};

	const wantedSelectChange = (currency: string) => {
		setWantedSelect(currency);
		setBasedValue(1);
		if (basedSelect !== currency) {
			setWantedValue(currencies.data[currency]);
		} else {
			setWantedValue(1);
		}
	};

	const switchSelect = () => {
		const select = wantedSelect;
		setWantedSelect(basedSelect);
		setBasedSelect(select);
		setBasedValue(1);
		selectClicked(select);
	};

	return (
		<>
			<InputSelect
				value={basedValue}
				inputChange={basedValueChange}
				currencies={currenciesList}
				selectChange={basedSelectChange}
				selectValue={basedSelect}
			/>
			<Button
				onClick={() => switchSelect()}
				type='text'
				icon={<SwitchIcon />}
			/>
			<InputSelect
				value={wantedValue}
				inputChange={wantedValueChange}
				currencies={currenciesList}
				selectChange={wantedSelectChange}
				selectValue={wantedSelect}
			/>
		</>
	);
};
