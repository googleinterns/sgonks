import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import HeaderBar from "./HeaderBar";
import LoginButtonSet from "../UI/LoginButtonSet/LoginButtonSet";
import SignOutButton from "./SignOutButton/SignOutButton";
import { NavLink } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<HeaderBar />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HeaderBar />);
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render "What is sGonks?" and "Sign in" buttins if not authenticated', () => {
    expect(wrapper.find(LoginButtonSet).exists()).toBeTruthy();
    expect(wrapper.find(SignOutButton).exists()).toBeFalsy();
  });

  it('should render "Select competition" and "Sign out" buttins if authenticated', () => {
    wrapper.setProps({ loggedIn: true });
    expect(wrapper.find(SignOutButton).exists()).toBeTruthy();
    expect(wrapper.find(LoginButtonSet).exists()).toBeFalsy();
    expect(wrapper.find(NavLink).text()).toEqual("Select Competition");
  });

  it('should render inner navigation items if "innerNav" is true', () => {
    wrapper.setProps({ innerNav: true });
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
});
