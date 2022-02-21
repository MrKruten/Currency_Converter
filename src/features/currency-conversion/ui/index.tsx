import React, { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';
import { InputSelect } from 'entities/InputSelect';
import { Button } from 'antd';

import {
	$conversionCurrencySelect,
	$currencies,
	$currenciesList,
	$fromCurrencyValue,
	$initialSelectedCurrency,
	$toCurrencyValue,
	conversionCurrencySelected,
	ConverterPageGate,
	fromCurrencyValueChanged,
	selectClicked,
	toCurrencyValueChanged,
} from '../model';
import { ReactComponent as DoubleArrow } from '../lib/doubleArrow.svg';

import './style.scss';

export const CurrencyConversion = () => {
	useGate(ConverterPageGate);
	const currenciesList = useStore($currenciesList);

	useEffect(() => {
		// Для базовых настроек
		setTimeout(() => {
			fromCurrencyValueChanged(1);
			conversionCurrencySelected('RUB');
		}, 350);
	}, []);

	const fromCurrencyValue = useStore($fromCurrencyValue);
	const toCurrencyValue = useStore($toCurrencyValue);

	const conversionCurrencySelect = useStore($conversionCurrencySelect);
	const initialSelectedCurrency = useStore($initialSelectedCurrency);

	const currencies = useStore($currencies);

	// TODO переписать на Effector
	useEffect(() => {
		if (initialSelectedCurrency !== conversionCurrencySelect) {
			toCurrencyValueChanged(currencies.data[conversionCurrencySelect]);
		}
	}, [currencies]);

	const switchSelect = () => {
		const select = conversionCurrencySelect;
		conversionCurrencySelected(initialSelectedCurrency);
		setTimeout(() => fromCurrencyValueChanged(1), 300);
		selectClicked(select);
	};

	return (
		<div className='currency-conversion'>
			<div className='currency-conversion__field'>
				<InputSelect
					inputChange={fromCurrencyValueChanged}
					currencies={currenciesList}
					selectChange={selectClicked}
					value={fromCurrencyValue}
					selectValue={initialSelectedCurrency}
				/>
			</div>
			<Button
				onClick={switchSelect}
				type='text'
				icon={<DoubleArrow />}
				className='currency-conversion__button'
			/>
			<div className='currency-conversion__field'>
				<InputSelect
					inputChange={toCurrencyValueChanged}
					currencies={currenciesList}
					selectChange={conversionCurrencySelected}
					value={toCurrencyValue}
					selectValue={conversionCurrencySelect}
				/>
			</div>
		</div>
	);
};
