import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it(`Testa se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favLink);
    const favMessagem = screen.getByText('No favorite pokemon found');
    expect(favMessagem).toBeInTheDocument();
  });
  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(moreDetails);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favLink);

    const favPokemons = screen.getAllByTestId(/pokemon-name/i);
    expect(favPokemons).toHaveLength(1);
  });
});
