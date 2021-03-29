import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-language-picker');
  expect(component.exists()).toBe(true);
});

test('does not throw warinig with expected props', () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test('renders non-zero language icons', () => {
  const wrapper = setup();
  const components = findByTestAttr(wrapper, 'language-icon');
  expect(components.length).toBeGreaterThan(0);
});

test('calls setLanguage Prop uppon click', () => {
  const wrapper = setup();
  const components = findByTestAttr(wrapper, 'language-icon');

  const firstIcon = components.first();
  firstIcon.simulate('click');
  expect(mockSetLanguage).toHaveBeenCalled();
});
