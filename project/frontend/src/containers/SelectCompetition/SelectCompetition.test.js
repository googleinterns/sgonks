import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SelectCompetition from "./SelectCompetition";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

configure({ adapter: new Adapter() });

describe("<SelectCompetition />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SelectCompetition />);
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display 'Select a competition...' for its first text paragraph", () => {
    expect(wrapper.find("p").first().text()).toEqual("Select a competition...");
  });

  it("should display 'Or...' for its second text paragraph", () => {
    expect(wrapper.find("p").at(1).text()).toEqual("Or...");
  });

  it("should have a LinkButton which redirects to /createcomp and displays 'Create a competition'", () => {
    expect(
      wrapper.contains(
        <LinkButton to="/createcomp">Create a competition</LinkButton>
      )
    ).toBeTruthy();
  });

  it("should have an unordered list containing CompetitionCard components", () => {
    expect(wrapper.find("ul").contains(<CompetitionCard></CompetitionCard>))
      .toBeTruthy;
  });
});
