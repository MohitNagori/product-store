import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AppDrawer } from '../components';

describe('Testing AppDrawer component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<AppDrawer />);
    expect(toJson(wrapper)).toMatchSnapshot();
 });
});