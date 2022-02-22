import React from 'react';
import { Switch } from 'antd';

interface ISwitcher {
	checked: React.ReactNode;
	unchecked: React.ReactNode;
	onChange: (checked: boolean) => void;
}

export const Switcher: React.FC<ISwitcher> = ({
	checked,
	unchecked,
	onChange,
}) => {
	return (
		<Switch
			checkedChildren={checked}
			unCheckedChildren={unchecked}
			onChange={onChange}
		/>
	);
};
