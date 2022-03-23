import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const moreDetailsLink = () => screen.getByRole('link', { name: 'More details' });

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeigth = screen.getByTestId(/pokemon-weight/i);
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it(`Testa se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);

    expect(moreDetailsLink()).toBeInTheDocument();
    expect(moreDetailsLink()).toHaveAttribute('href', '/pokemons/25');
  });
  it(`Testa se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);
    expect(moreDetailsLink()).toBeInTheDocument();

    userEvent.click(moreDetailsLink());
    const detailSubtitle = screen.getByRole('heading', { name: 'Summary' });
    expect(detailSubtitle).toBeInTheDocument();
  });
  it(`Teste se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);
    expect(moreDetailsLink()).toBeInTheDocument();

    userEvent.click(moreDetailsLink());
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    expect(moreDetailsLink()).toBeInTheDocument();

    userEvent.click(moreDetailsLink());
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);
    const pokemonImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
