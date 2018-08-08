import React from 'react';
import TopNav from '../../components/navbar';
import { mount } from 'enzyme';
import { BrowserRouter as R } from 'react-router-dom';
import { shallowToJson } from 'enzyme-to-json';
import Auth from '../../utils/authentication';

describe('<TopNav/>', ()=>{
    const nav = mount(<R><TopNav title="my nav" history={[]}/></R>);

    test('it renders successfully', ()=>{
        Auth.authenticate();
        expect(shallowToJson(nav)).toMatchSnapshot();
    });
});