import React from "react";
import Notifier from "../../components/notifier";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<Notifier/>", ()=>{
    test("it renders successfully", ()=>{
        const notifier = shallow(<Notifier/>);
        expect(shallowToJson(notifier)).toMatchSnapshot();
    });
});