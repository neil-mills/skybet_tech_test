import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Accordion from '../components/Accordion';

afterEach(() => {
    cleanup();
});

test('Accordion content is visible on open', () => {
    const {debug, getByTestId} = render(<Accordion isOpen={true} />);
    expect(getByTestId('content')).toBeTruthy();
});
test('Accordion content is hidden on close', () => {
    const {debug, getByTestId, queryByTestId} = render(<Accordion isOpen={false} />);
    expect(queryByTestId('content')).toBeFalsy();
});