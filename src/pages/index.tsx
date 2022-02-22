import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ConverterPage = lazy(() => import('./ConverterPage'));

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<ConverterPage />} />
			<Route path='*' element={<ConverterPage />} />
		</Routes>
	);
};
