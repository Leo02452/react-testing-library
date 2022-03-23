import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const moreDetailsLink = () => screen.queryByRole('link', { name: 'More details' });

describe('Testa o componente PokemonDetails', () => {
  it(`Testa se
  as informações detalhadas do Pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);

    expect(moreDetailsLink()).toBeInTheDocument();
    userEvent.click(moreDetailsLink());

    const detailTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(detailTitle).toBeInTheDocument();
    expect(moreDetailsLink()).not.toBeInTheDocument();

    const detailSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(detailSummary).toBeInTheDocument();

    const summaryP = screen.getByText(/this intelligent Pokémon roasts hard berries/i);
    expect(summaryP).toBeInTheDocument();
  });
  it(`Testa se
  existe na página uma seção com os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    expect(moreDetailsLink()).toBeInTheDocument();
    userEvent.click(moreDetailsLink());

    const locationsTitle = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(locationsTitle).toBeInTheDocument();

    const locationsName = screen.getAllByText(/kanto/i);
    expect(locationsName).toHaveLength(2);
    expect(locationsName[0]).toHaveTextContent('Kanto Viridian Forest');

    const pokemonLocations = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pokemonLocations).toHaveLength(2);
    expect(pokemonLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocations[0]).toHaveAttribute('alt', 'Pikachu location');
  });
  it(`Testa se
  o usuário pode favoritar um pokémon através da página de detalhes`, () => {
    renderWithRouter(<App />);
    expect(moreDetailsLink()).toBeInTheDocument();

    userEvent.click(moreDetailsLink());
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);
    const favPokemon = screen.queryByAltText('Pikachu is marked as favorite');
    expect(favPokemon).toBeInTheDocument();

    userEvent.click(favCheckbox);
    expect(favPokemon).not.toBeInTheDocument();
  });
});
