import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import ResultsPage from "./ResultsPage";
import * as itemEndpoint from "../../api/items";
import { MOCK_ITEMS_SEARCH } from "../../_fixtures/items";

const location = {
  location: {
    search: "?search=caja",
  },
};

const mountComponent = (props) => {
  const component = mount(<ResultsPage {...location} {...props} />);

  return component;
};

jest.mock("../../api/items");

describe("<ResultsPage />", () => {
  let component;

  beforeEach(() => {
    act(() => {
      jest.useFakeTimers();
      itemEndpoint.itemsApi.mockImplementation(() =>
        Promise.resolve(MOCK_ITEMS_SEARCH)
      );
    });
  });

  it("renders the component", () => {
    component = mountComponent();

    expect(component.find("ResultsPage")).toBeDefined();
  });

  it("renders only 4 results", () => {
    component = mountComponent();

    expect(component.find("results-card")).toBeDefined();
    expect(component.find("results-card")).toHaveLength(4);
  });

  it("calls the buy action", () => {
    const onProductSelect = jest.fn();
    component = mountComponent();

    component.find("results-card").simulate("click");

    expect(onProductSelect).toHaveBeenCalled();
  });
});
