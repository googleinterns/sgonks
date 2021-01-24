import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LoginButtonSet from "./LoginButtonSet";

configure({ adapter: new Adapter() });

describe("<LoginButtonSet />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<LoginButtonSet />);
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
