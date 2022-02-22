import React from 'react';
import { ThemeSwitcher } from 'entities/switcher-theme';
import { switchChanged } from 'features/change-theme/model';

export const ChangerTheme = () => {
	return <ThemeSwitcher onChange={switchChanged} />;
};
