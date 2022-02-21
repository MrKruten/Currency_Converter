// eslint-disable-next-line import/no-extraneous-dependencies
import {
	combine,
	createEffect,
	createEvent,
	createStore,
	guard,
	sample,
} from 'effector-logger';
import { getCurrencyToday, IResponseCurrency } from 'shared/api/currency';
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
	fn: ({ data }, clockSelected) =>
		clockSelected === 'USD' ? 1 : data[clockSelected],
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

sample({
	clock: fromCurrencyValueChanged,
	source: $currentCurrencyRate,
	fn: (clock, source) => {
		return numberFixed(clock * source);
	},
	target: $toCurrencyValue,
});

sample({
	clock: toCurrencyValueChanged,
	source: $currentCurrencyRate,
	fn: (clock, source) => {
		return numberFixed(source / clock);
	},
	target: $fromCurrencyValue,
});

sample({
	clock: $currentCurrencyRate,
	source: $fromCurrencyValue,
	fn: (clock, source) => {
		return numberFixed(clock * source);
	},
	target: $toCurrencyValue,
});

// ----------- button switch ------------ //
export const switchButton = createEvent();
const $temp = createStore('');
const $one = createStore(1);
sample({
	clock: switchButton,
	source: $initialSelectedCurrency,
	target: $temp,
});

sample({
	clock: switchButton,
	source: $one,
	target: $fromCurrencyValue,
});

guard({
	clock: $temp,
	source: $conversionCurrencySelect,
	filter: (source, clock) => clock !== '',
	target: $initialSelectedCurrency,
});

guard({
	clock: $initialSelectedCurrency,
	source: $temp,
	filter: (source, clock) => clock !== '',
	target: $conversionCurrencySelect,
});

sample({
	clock: $conversionCurrencySelect,
	fn: () => '',
	target: $temp,
});

sample({
	clock: $conversionCurrencySelect,
	source: $initialSelectedCurrency,
	target: selectClicked,
});
