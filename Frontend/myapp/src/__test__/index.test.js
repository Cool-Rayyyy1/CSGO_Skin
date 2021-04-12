import React from 'react';
import renderer from 'react-test-renderer';
import MainPage  from "../pages/index"


it ("snapshot testing for profile screen", () => {
    const tree = renderer.create(
        <MainPage></MainPage>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
