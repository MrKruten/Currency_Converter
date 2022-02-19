export const getEnvVar = (key: string) => {
	if (process.env[key] === undefined) {
		console.log(process.env);
		throw new Error(`Env variable ${key} is required`);
	}
	return process.env[key] || '';
};

export const API_URL = getEnvVar('REACT_APP_API_BASE_URL');
export const API_KEY = getEnvVar('REACT_APP_API_INDIVIDUAL_KEY');
