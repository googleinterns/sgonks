import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LoginButtonSet from "./LoginButtonSet";

import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

configure({ adapter: new Adapter() });

describe("<LoginButtonSet />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <AuthContext>
          <LoginButtonSet />
        </AuthContext>
      </BrowserRouter>
    );
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
