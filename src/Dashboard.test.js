import React from "react";
import { shallow } from 'enzyme';
import Dashboard from "./Dashboard";
import InvestmentChart from "./InvestmentChart";

describe("Dashboard component", () => {
  it("renders without crashing", () => {
    shallow(<Dashboard />);
  });

  it("renders InvestmentChart component when there are investments", () => {
    const investments = [
      { id: 1, symbol: "AAPL", name: "Apple", amount: 1000 },
      { id: 2, symbol: "GOOGL", name: "Google", amount: 2000 },
    ];
    const wrapper = shallow(<Dashboard />);
    wrapper.setState({ investments });
    expect(wrapper.find(InvestmentChart)).toHaveLength(investments.length);
  });

  it("calls handleSearch when search button is clicked", () => {
    const handleSearchMock = jest.fn();
    const wrapper = shallow(<Dashboard />);
    wrapper.instance().handleSearch = handleSearchMock;
    wrapper.update();

    wrapper.find("SearchButton").simulate("click");
    expect(handleSearchMock).toHaveBeenCalled();
  });
});

describe("InvestmentChart component", () => {
  it("renders investment data correctly", () => {
    const investment = { id: 1, symbol: "AAPL", name: "Apple", amount: 1000 };
    const wrapper = shallow(<InvestmentChart investment={investment} />);
    
    expect(wrapper.find(".symbol").text()).toEqual(investment.symbol);
    expect(wrapper.find(".name").text()).toEqual(investment.name);
    expect(wrapper.find(".amount").text()).toEqual(investment.amount.toString());
  });
});
