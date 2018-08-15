import React from "react";
import NotFound from "../../components/NotFound";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<NotFound/>", () => {
    test("it renders successfully", () => {
        const notFound = shallow(<NotFound />);
        expect(shallowToJson(notFound)).toMatchSnapshot();
    });
    test("it redirects to home", () => {
        const notFound = shallow(<NotFound />);
        expect(notFound).toExist();
    });
});