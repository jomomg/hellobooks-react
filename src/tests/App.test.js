import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme';

test('sanity', ()=> {
    expect(1).toBe(1);
});

describe('<App/>', ()=> {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('it renders routes', ()=> {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('Switch')).toExist();
        expect(wrapper.find('Route')).toExist();
        expect(wrapper.find('PrivateRoute')).toExist();
    });
});


