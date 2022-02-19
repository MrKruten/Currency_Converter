export const getDateToday = (): string => {
	const data = new Date().toISOString();
	return data.split('T')[0];
};

export const getDateWeek = (): string => {
	const date = new Date(
		new Date().setDate(new Date().getDate() - 7)
	).toISOString();
	return date.split('T')[0];
};

export const getDateMonth = () => {
	const date = new Date(
		new Date().setMonth(new Date().getMonth() - 1)
	).toISOString();
	return date.split('T')[0];
};

export const getDateYear = () => {
	const date = new Date(
		new Date().setFullYear(new Date().getFullYear() - 1)
	).toISOString();
	return date.split('T')[0];
};
