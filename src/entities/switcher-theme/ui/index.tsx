import React from 'react';
import { Switcher } from 'shared/ui';
import './style.scss';

interface ISwitcherTheme {
	onChange: (checked: boolean) => void;
}

export const ThemeSwitcher: React.FC<ISwitcherTheme> = ({ onChange }) => {
	return (
		<Switcher
			checked={<span style={{ fontSize: 16 }}>🌜</span>}
			unchecked={<span style={{ fontSize: 16 }}>🌞</span>}
			onChange={onChange}
		/>
	);
};
