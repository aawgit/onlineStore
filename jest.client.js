module.exports = {
	name: 'client',
	displayName: 'client',
	rootDir: './',
	testMatch: ['<rootDir>/client/**/*.spec.{js,jsx,ts,tsx}'],
	collectCoverageFrom: ['<rootDir>/client/**/*.spec.{js,jsx,ts,tsx}'],
	coverageReporters: ['text'],
};
