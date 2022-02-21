import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './style.scss';

export const Loader = () => {
	return (
		<div className='loader'>
			<Spin
				indicator={<LoadingOutlined style={{ fontSize: 78 }} spin size={78} />}
			/>
		</div>
	);
};
