import React from "react";
import Login from "../../components/login";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<Login/>", ()=>{
    const location = {
        state: "/"
    };
    test("it renders successfully", ()=>{
        const login = shallow(<Login location={location}/>);
        expect(shallowToJson(login)).toMatchSnapshot();
    });
});