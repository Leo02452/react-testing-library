import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const nextButton = () => screen.getByRole('button', { name: 'Próximo pokémon' });

describe('Testa o componente Pokedex', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it(`Testa se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    expect(nextButton()).toBeInTheDocument();
    userEvent.click(nextButton());
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemons).toHaveLength(1);

    expect(nextButton()).toBeInTheDocument();
    userEvent.click(nextButton());

    expect(pokemons).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId(/pokemon-type-button/i);
    const numberOfButtons = 7;
    expect(buttons).toHaveLength(numberOfButtons);

    const eletricType = screen.getAllByRole('button', { name: 'Electric' });
    expect(eletricType).toHaveLength(1);
    const fireType = screen.getAllByRole('button', { name: 'Fire' });
    expect(fireType).toHaveLength(1);
    const bugType = screen.getAllByRole('button', { name: 'Bug' });
    expect(bugType).toHaveLength(1);
    const poisonType = screen.getAllByRole('button', { name: 'Poison' });
    expect(poisonType).toHaveLength(1);
    const psychicType = screen.getAllByRole('button', { name: 'Psychic' });
    expect(psychicType).toHaveLength(1);
    const normalType = screen.getAllByRole('button', { name: 'Normal' });
    expect(normalType).toHaveLength(1);
    const dragonType = screen.getAllByRole('button', { name: 'Dragon' });
    expect(dragonType).toHaveLength(1);

    userEvent.click(fireType[0]);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Fire');

    expect(nextButton()).toBeInTheDocument();

    userEvent.click(nextButton());
    expect(pokemonType).toHaveTextContent('Fire');

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    const firstPokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(firstPokemon[0]).toHaveTextContent('Pikachu');
  });
});
