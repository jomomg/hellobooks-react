import React from "react";
import AdminPage from "../../components/admin";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<AdminPage/>", ()=>{
    test("it renders successfully", ()=>{
        const adminPage = shallow(<AdminPage/>);
        expect(shallowToJson(adminPage)).toMatchSnapshot();
    });
});