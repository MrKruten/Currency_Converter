import React from 'react';
import { ButtonGraph } from 'shared/ui/ButtonGraph';
import { graphOfWeekButtonClicked } from 'features/graph-buttons/buttonGraphOfWeek/model';

export const ButtonGraphOfWeek: React.FC = () => {
	return <ButtonGraph onClick={graphOfWeekButtonClicked}>1W</ButtonGraph>;
};
