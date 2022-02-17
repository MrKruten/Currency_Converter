import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

export const withRouter = (component: () => React.ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spin delay={500} size='large' />}>
				{component()}
			</Suspense>
		</BrowserRouter>
	);
};
