import React from 'react';
import { useGate, useStore } from 'effector-react';
import { Layout, Typography } from 'antd';
import { Converter, Graphic } from 'widgets';
import { ConverterPageGate } from 'features/currency-conversion';
import { Loader } from 'shared/ui';

import { $loader } from './model';

const ConverterPage = () => {
	const { Header, Content, Footer } = Layout;
	const { Title } = Typography;

	useGate(ConverterPageGate);

	const isLoading = useStore($loader);

	return (
		<Layout
			style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
		>
			<Header style={{ textAlign: 'center', color: 'white' }}>
				Currency converter
			</Header>
			<Content
				style={{
					padding: '0 25px',
					flex: '1 1 auto',
					height: '100%',
				}}
			>
				<Title style={{ textAlign: 'center', marginTop: 7 }}>
					Converter Page
				</Title>
				<div
					className='converter-currency'
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Converter />
				</div>
				<div
					className='graph-currency'
					style={{ display: 'flex', justifyContent: 'center', marginTop: 45 }}
				>
					<Graphic />
				</div>
			</Content>
			<Footer
				style={{
					marginTop: 15,
					alignItems: 'center',
					textAlign: 'center',
					background: '#001529',
					color: 'white',
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
