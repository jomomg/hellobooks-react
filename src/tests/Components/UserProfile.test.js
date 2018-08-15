import React from "react";
import UserProfilePage from "../../components/user_profile";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<UserProfilePage/>", ()=>{
    test("it renders successfully", ()=>{
        const profile = shallow(<UserProfilePage/>);
        expect(shallowToJson(profile)).toMatchSnapshot();
    });
});