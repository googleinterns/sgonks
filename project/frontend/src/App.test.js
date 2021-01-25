import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

import HeaderBar from "./components/HeaderBar/HeaderBar";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should render one HeaderBar element", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(HeaderBar)).toHaveLength(1);
  });
});
