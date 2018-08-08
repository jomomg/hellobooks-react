import React from 'react';
import DeleteDialog from '../../components/dialogs';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<DeleteDialog/>', ()=>{
    test('it renders successfully', ()=>{
        const dialog = shallow(<DeleteDialog/>);
        expect(shallowToJson(dialog)).toMatchSnapshot();
    });
});