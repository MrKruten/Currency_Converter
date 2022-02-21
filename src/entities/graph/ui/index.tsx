import React from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { IResponseHistoricalCurrency } from 'shared/api/currency';
import { useStore } from 'effector-react';

// eslint-disable-next-line no-restricted-imports,import/no-cycle
import { $dataGraph } from '../../../features/graph-buttons/buttonCurrenciesOfWeek/model';
// eslint-disable-next-line no-restricted-imports
import { $conversionCurrencySelect } from '../../../features/currency-conversion/model';

interface DataGraphType {
	name: string;
	currencies: { [key in string]: number };
}

export interface IGraphCurrency {
	data: Array<DataGraphType>;
}

export const GraphCurrency = () => {
	const dataGraph = useStore($dataGraph);
	const wantedValue = useStore($conversionCurrencySelect);
	return (
		<LineChart
			width={600}
			height={300}
			data={dataGraph}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line type='monotone' dataKey={wantedValue} stroke='#8884d8' />
			<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
			<XAxis dataKey='name' />
			<YAxis />
			<Legend />
			<Tooltip />
		</LineChart>
	);
};
