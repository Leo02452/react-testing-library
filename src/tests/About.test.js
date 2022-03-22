import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente About', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    const firstParagraph = screen.getByText(/this application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/one can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém uma imagem especifica de uma Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    const favPokemonsLink = screen.getByRole('img', { role: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });

    expect(favPokemonsLink).toBeInTheDocument();
    expect(favPokemonsLink).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
