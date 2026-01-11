import Greeting from './Greeting';

import {render, screen} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

describe('<Greeting />', () => {
    test('renders "Hello World" as a text', () => {
        render(<Greeting/>);

        const helloWorldElement = screen.getByText(/Hello World!/i);
        expect(helloWorldElement).toBeInTheDocument();
    });

    test('renders "good to see you" if the button was NOT clicked', () => {
        render(<Greeting/>);

        const outputElement = screen.getByText(/good to see you/i);
        expect(outputElement).toBeInTheDocument();
    });

    test('renders "Changed!" if the button was clicked', async () => {
        render(<Greeting/>);

        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);

        const outputElement = screen.getByText(/Changed!/i);
        expect(outputElement).toBeInTheDocument();
    });

    test('renders "Changed!" if the button was clicked', async () => {
        render(<Greeting/>);

        const user = userEvent.setup();

        const buttonElement = screen.getByRole('button');
        await user.click(buttonElement);

        const outputElement = screen.getByText(/Changed!/i);
        expect(outputElement).toBeInTheDocument();
    });

    test('does not render "good to see you" if the button was clicked', async () => {
        render(<Greeting/>);

        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);

        const outputElement = screen.queryByText(/good to see you!/i);
        expect(outputElement).toBeNull();
    });
});

