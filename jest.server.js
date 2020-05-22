module.exports = {
	name: 'client',
	displayName: 'client',
	rootDir: './',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/server/**/*.spec.{js,jsx,ts,tsx}'],
	collectCoverageFrom: ['<rootDir>/server/**/*.spec.{js,jsx,ts,tsx}'],
	coverageReporters: ['text'],
};
