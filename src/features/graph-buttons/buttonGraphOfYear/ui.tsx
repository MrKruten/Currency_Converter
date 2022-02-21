import React from 'react';
import { ButtonGraph } from 'shared/ui/ButtonGraph';

import { graphOfYearButtonClicked } from './model';

export const ButtonGraphOfYear: React.FC = () => {
	return <ButtonGraph onClick={graphOfYearButtonClicked}>1Y</ButtonGraph>;
};
