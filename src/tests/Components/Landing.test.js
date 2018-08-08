import React from 'react';
import LandingPage from '../../components/landing';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<LandingPage/>', ()=>{
    test('it renders successfully', ()=>{
        const landingPage = shallow(<LandingPage/>);
        expect(shallowToJson(landingPage)).toMatchSnapshot();
    });
});