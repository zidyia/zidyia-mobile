import React from 'react';
import LoginScreen from '../src/screens/login/login.component';

import renderer from 'react-test-renderer';

test('Activities Screen Rendered Correctly',()=>{
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})