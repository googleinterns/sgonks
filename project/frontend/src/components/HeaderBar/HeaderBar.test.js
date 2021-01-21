import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import HeaderBar from "./HeaderBar";
import LoginButtonSet from "../UI/LoginButtonSet/LoginButtonSet";

configure({ adapter: new Adapter() });

describe("<HeaderBar />", () => {
  it('should render "What is sGonks?" and "Sign in" buttins if not authenticated', () => {
    const wrapper = shallow(<HeaderBar />);
    expect(wrapper.find(LoginButtonSet)).tohaveLength(1);
  });
});
