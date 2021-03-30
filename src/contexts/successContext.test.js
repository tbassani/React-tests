import React from 'react';
import { shallow, mount } from 'enzyme';

import successContext from './successContext';

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div></div>;
};

test('useSuccess throws an error when not wrapped in SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useSuccess must be used within a SuccessProvider');
});

test('useSuccess does not throw an error when wrapped in SuccessProvider', () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow('useSuccess must be used within a SuccessProvider');
});
