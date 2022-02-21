import React from 'react';
import { GraphCurrency } from 'entities/graph/ui';
import {
	ButtonGraphOfMonth,
	ButtonGraphOfWeek,
	ButtonGraphOfYear,
} from 'features/graph-buttons';
import './style.scss';

export const Graphic = () => {
	return (
		<div className='graph'>
			<div className='graph__currencies'>
				<GraphCurrency />
				<div className='graph__area'>
					<ButtonGraphOfWeek />
					<ButtonGraphOfMonth />
					<ButtonGraphOfYear />
				</div>
			</div>
		</div>
	);
};
