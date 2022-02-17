import React from 'react';
import { Router } from 'pages';
import { withProviders } from 'app/providers';

const App = () => {
	return <Router />;
};

export default withProviders(App);
