import { API_KEY, API_URL } from 'shared/config';

export const getCurrencyToday = async (currency: string) => {
	const response = await fetch(
		`${API_URL}latest?apikey=${API_KEY}&base_currency=${currency}`
	);
	return await response.json();
};
