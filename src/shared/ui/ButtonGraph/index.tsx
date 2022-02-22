import React from 'react';
import { Button } from 'antd';
import './style.scss';

interface IButtonGraph {
	onClick: () => void;
}

export const ButtonGraph: React.FC<IButtonGraph> = ({ onClick, children }) => {
	return (
		<Button
			type='primary'
			size='small'
			style={{ background: '#3AE17D', borderColor: '#32BF58' }}
			onClick={onClick}
			className='button-graph'
		>
			{children}
		</Button>
	);
};
