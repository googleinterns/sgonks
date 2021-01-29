import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

import HeaderBar from "./components/HeaderBar/HeaderBar";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should always render one HeaderBar element", () => {
    expect(wrapper.find(HeaderBar)).toHaveLength(1);
  });
});
