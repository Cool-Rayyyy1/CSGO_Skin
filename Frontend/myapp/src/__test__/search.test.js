import React from 'react';
import renderer from 'react-test-renderer';
import Search  from "../pages/search"


it ("snapshot testing for search screen", () => {
    const tree = renderer.create(
        <Search></Search>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
