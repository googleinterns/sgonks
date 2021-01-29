import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LandingPage from "./LandingPage";
import LoginButtonSet from "../../components/UI/LoginButtonSet/LoginButtonSet";

configure({ adapter: new Adapter() });

describe("<LandingPage />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should have a h1 header which displays 'Who's the next trendsetter?'", () => {
    expect(wrapper.find("h1").text()).toEqual("Who's the next trendsetter?");
  });

  it("should have a h3 header which displays the brief description of the game", () => {
    expect(wrapper.find("h3").text()).toEqual(
      "Something something a description of what the game does, what benefits it has. Something something ..."
    );
  });

  it("should contain a LoginButtonSet", () => {
    expect(wrapper.find(LoginButtonSet).exists()).toBeTruthy();
  });

  //   it("should contain an illustration image", () => {
  //     expect(wrapper.find("img").exists()).toBeTruthy();
  //   });
});
