// eslint-disable-next-line import/no-extraneous-dependencies
import {
	combine,
	createApi,
	createEffect,
	createEvent,
	createStore,
	guard,
	sample,
	split,
} from 'effector-logger';
import {
	getCurrencyToday,
	IResponseCurrency,
	IResponseHistoricalCurrency,
} from 'shared/api/currency';
import { createGate } from 'effector-react';

// ------------------------------- Helper ------------------------------------------ //

const numberFixed = (value: number) => +value.toFixed(2);

// -------------------------- Start fetch data ------------------------------------- //

export const ConverterPageGate = createGate();
const $example = createStore('USD');

export const getAllCurrenciesFx = createEffect<
	string,
	IResponseCurrency,
	Error
>(async (currency: string) => await getCurrencyToday(currency));

export const selectClicked = createEvent<string>();
export const $initialSelectedCurrency = createStore('USD').on(
	selectClicked,
	(_, value) => value
);

export const getCurrentCurrencyFx = createEffect<
	string,
	IResponseCurrency,
	Error
>(async (nameCurrency: string) => await getCurrencyToday(nameCurrency));

getCurrentCurrencyFx.doneData.watch(el => console.log('Я запустилься: ', el));

sample({
	source: selectClicked,
	target: getCurrentCurrencyFx,
});

export const $currencies = createStore<IResponseCurrency>({
	data: {},
	query: {
		base_currency: 'USD',
		timestamp: 0,
	},
})
	.on(getAllCurrenciesFx.doneData, (_, currencies) => currencies)
	.on(getCurrentCurrencyFx.doneData, (_, currencies) => currencies);

$currencies.watch(el => console.log('Я тоже: ', el));

sample({
	clock: ConverterPageGate.open,
	source: $example,
	target: getAllCurrenciesFx,
});

export const $currenciesList = combine($currencies, ({ data, query }) => {
	const newData = [...Object.keys(data)].filter(
		currency => currency !== query.base_currency
	);
	return [query.base_currency, ...newData];
});

// ----------------------------------------------------------------------- //

export const fromCurrencyValueChanged = createEvent<number>(); // input left
export const $fromCurrencyValue = createStore<number>(0).on(
	fromCurrencyValueChanged,
	(_, changedValue) => changedValue
);

export const toCurrencyValueChanged = createEvent<number>(); // input right
export const $toCurrencyValue = createStore<number>(0).on(
	toCurrencyValueChanged,
	(_, changedValue) => changedValue
);

// ----------------------------------------------------------------------- //
const $currentCurrencyRate = createStore<number>(1);

export const conversionCurrencySelected = createEvent<string>(); // select click right
export const $conversionCurrencySelect = createStore('RUB').on(
	conversionCurrencySelected,
	(_, value) => value
);

sample({
	clock: conversionCurrencySelected,
	source: $currencies,
	fn: ({ data }, clockSelected) => data[clockSelected],
	target: $currentCurrencyRate,
});

sample({
	clock: $currencies,
	source: $conversionCurrencySelect,
	fn: (clock, { data }) => {
		return data[clock];
	},
	target: $currentCurrencyRate,
});

// clock[0] - текущий курс, clock[1] введенное значение, source - введенное значение
// HE работает если переводить из одной валюты в такую же
sample({
	clock: [$currentCurrencyRate, fromCurrencyValueChanged],
	source: [$currentCurrencyRate, $fromCurrencyValue],
	fn: (clock, source) => {
		console.log('Clock: ', clock, 'Resource: ', source);
		if (clock[0] === source) return numberFixed(clock[0] * clock[1]);
		return numberFixed(clock[0] * source); // работает странно
	},
	target: $toCurrencyValue,
});

sample({
	clock: [$currentCurrencyRate, toCurrencyValueChanged],
	source: [$currentCurrencyRate, $toCurrencyValue],
	fn: (clock, source) => {
		console.log('Clock-2: ', clock, 'Resource-2: ', source);
		return numberFixed(source / clock[0]); // работает странно
	},
	target: $fromCurrencyValue,
});

// ----------- button switch ------------ //

/* export const buttonSwitched = createEvent();
export const $isSwitchedFields = createStore(true).on(
	buttonSwitched,
	(state, _) => !state
);

const $temp = createStore<string>('');

sample({
	clock: buttonSwitched,
	source: $conversionCurrencySelect,
	target: $temp,
});

sample({
	clock: $temp,
	source: $initialSelectedCurrency,
	target: $conversionCurrencySelect,
});

sample({
	clock: $conversionCurrencySelect,
	source: $temp,
	target: $initialSelectedCurrency,
});

sample({
	clock: $initialSelectedCurrency,
	fn: () => {
		console.log('УРААААА');
		return 1;
	},
	target: $fromCurrencyValue,
});

guard({
	clock: $fromCurrencyValue,
	source: [$temp, $initialSelectedCurrency],
	filter: (source, clock) => source[0] !== '',
	target: selectClicked,
});

$fromCurrencyValue.watch(el => console.log('fksdfjsk: ', el)); */
