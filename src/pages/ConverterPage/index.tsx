import React from 'react';
import { Layout, Typography } from 'antd';
import { Converter, Graphic } from 'widgets';
import { useGate } from 'effector-react';
import { ConverterPageGate } from 'features/currency-conversion/model';

const ConverterPage = () => {
	const { Header, Content, Footer } = Layout;
	const { Title } = Typography;

	useGate(ConverterPageGate);

	return (
		<Layout style={{ height: '100vh', display: 'flex' }}>
			<Header style={{ textAlign: 'center', color: 'white' }}>
				Currency converter
			</Header>
			<Content
				style={{
					padding: '0 25px',
					flex: '0 1 100%',
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
					alignItems: 'center',
					textAlign: 'center',
					background: '#001529',
					color: 'white',
				}}
			>
				Bruh & Khaz 2022
			</Footer>
		</Layout>
	);
};

export default ConverterPage;
