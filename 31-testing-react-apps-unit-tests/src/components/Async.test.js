import Async from "./Async";

import {render, screen} from "@testing-library/react";

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        // Isso sobrescreve qualquer fetch de qualquer componente renderizado
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: '1', 'title': 'title1'}, {id: '2', title: 'title2'}]
        });

        /*
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            if (url.includes('posts')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => [{id: '1', 'title': 'title1'}, {id: '2', title: 'title2'}]
                });
            }

            if (url.includes('users')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => [{id: '1', user: 'max'}, {id: '2', user: 'juca'}]
                });
            }

            return Promise.reject(new Error('Endpoint não mockado'));
        }); */
        // Método mais profissional, não utilizado pois a aula não segue ele

        render(<Async/>);



        // findAllByRole -> retorna uma promise, por isso estou usando ele
        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    });
});