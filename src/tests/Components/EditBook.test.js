import React from 'react';
import EditBook from '../../components/edit_book';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<EditBook/>', ()=>{
    const id = {
        params: {
            id: 1
        }
    };

    test('it renders successfully', ()=>{
        const editBook = shallow(<EditBook match = { id }/>);
        expect(shallowToJson(editBook)).toMatchSnapshot()
    });
});