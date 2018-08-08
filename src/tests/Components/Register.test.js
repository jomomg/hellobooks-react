import React from 'react';
import Register from '../../components/register';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<Register/>', ()=>{
    test('it renders successfully', ()=>{
        const register = shallow(<Register/>);
        expect(shallowToJson(register)).toMatchSnapshot()
    });
});