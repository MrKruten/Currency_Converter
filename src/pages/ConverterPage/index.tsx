import React from 'react';
import { useGate, useStore } from 'effector-react';
import { Layout, Typography } from 'antd';
import { Converter, Graphic } from 'widgets';
import { ConverterPageGate } from 'features/currency-conversion';
import { Loader } from 'shared/ui';
import {
	$conversionCurrencySelect,
	$initialSelectedCurrency,
} from 'features/currency-conversion/model';

import { $loader } from './model';

const ConverterPage = () => {
	const { Header, Content, Footer } = Layout;
	const { Title } = Typography;

	useGate(ConverterPageGate);

	const isLoading = useStore($loader);
	const basedCurrency = useStore($initialSelectedCurrency);
	const wantedCurrency = useStore($conversionCurrencySelect);

	return (
		<Layout
			style={{
				minHeight: '100%',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'white',
			}}
		>
			<Header style={{ textAlign: 'center', background: '#3AE17D' }}>
				<Title style={{ color: 'white', fontSize: 28, marginTop: 10 }}>
					Currency converter
				</Title>
			</Header>
			<Content
				style={{
					marginTop: 30,
					padding: '0 25px',
					flex: '1 1 auto',
					height: '100%',
				}}
			>
				<div
					className='converter-currency'
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Converter />
				</div>
				<Title level={4} style={{ marginTop: 20, textAlign: 'center' }}>
					Dynamics of the {basedCurrency} exchange rate by {wantedCurrency}, for
					1 {basedCurrency}
				</Title>
				<div
					className='graph-currency'
					style={{ display: 'flex', justifyContent: 'center', marginTop: 45 }}
				>
					<Graphic />
				</div>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
					background: '#32BF58',
					color: 'white',
					position: 'absolute',
					bottom: 0,
					width: '100%',
				}}
			>
				Bruh & Khaz 2022
			</Footer>
			{(isLoading.graphWeek ||
				isLoading.graphMouth ||
				isLoading.graphYear ||
				isLoading.getAllCurrencies) && <Loader />}
		</Layout>
	);
};

export default ConverterPage;
