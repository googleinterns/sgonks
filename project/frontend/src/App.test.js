import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import { Route } from "react-router-dom";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";

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

  // it("should enable routing to SelectCompetition if user is logged in", () => {
  //   // Cache original functionality
  //   const realUseState = React.useState;

  //   // Stub the initial state
  //   const stubInitialState = { signedIn: true };

  //   // Mock useState before rendering your component
  //   jest
  //     .spyOn(React, "useState")
  //     .mockImplementationOnce(() => realUseState(stubInitialState));

  //   expect(
  //     wrapper.contains(
  //       <Route path="/compselect" component={SelectCompetition}></Route>
  //     )
  //   ).toBeTruthy();
  // });
});
