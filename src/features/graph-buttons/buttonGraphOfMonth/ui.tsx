import React from 'react';
import { ButtonGraph } from 'shared/ui';
import { graphOfMonthButtonClicked } from 'features/graph-buttons/buttonGraphOfMonth/model';

export const ButtonGraphOfMonth: React.FC = () => {
	return <ButtonGraph onClick={graphOfMonthButtonClicked}>1M</ButtonGraph>;
};
