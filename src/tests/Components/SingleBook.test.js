import React from "react";
import SingleBookPage from "../../components/single_book";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<SingleBookPage/>", ()=>{
    const id = {
        params: {
            id: 1
        }
    };
    test("it renders successfully", ()=>{
        const single = shallow(<SingleBookPage match={id}/>);
        expect(shallowToJson(single)).toMatchSnapshot();
    });
});