import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
global.localStorage = localStorageMock;

const sessionStorageMock = {
	storage: {},
	setItem: function (field, value) {
		this.storage.field = value;
	},
	getItem: function (field) {
		return this.storage.field;
	},
	removeItem: function (field) {
		delete this.storage.field;
	},
};
global.sessionStorage = sessionStorageMock;
