module.exports = {
	name: 'server',
	displayName: 'server',
	rootDir: './',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/server/**/*.spec.{js,jsx,ts,tsx}'],
	collectCoverageFrom: ['<rootDir>/server/**/*.spec.{js,jsx,ts,tsx}'],
	coverageReporters: ['text'],
};
