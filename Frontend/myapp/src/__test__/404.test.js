import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundPage  from "../pages/404"


it ("snapshot testing for profile screen", () => {
    const tree = renderer.create(
        <NotFoundPage></NotFoundPage>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
