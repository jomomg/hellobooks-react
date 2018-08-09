import React from "react";
import BookPage from "../../components/admin";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<BookPage/>", ()=>{
    test("it renders successfully", ()=>{
        const books = shallow(<BookPage/>);
        expect(shallowToJson(books)).toMatchSnapshot();
    });
});