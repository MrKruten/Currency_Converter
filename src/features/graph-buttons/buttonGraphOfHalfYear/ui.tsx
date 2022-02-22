import React from 'react';
import { ButtonGraph } from 'shared/ui';

import { graphOfHalfYearButtonClicked } from './model';

export const ButtonGraphOfHalfYear: React.FC = () => {
	return <ButtonGraph onClick={graphOfHalfYearButtonClicked}>6M</ButtonGraph>;
};
