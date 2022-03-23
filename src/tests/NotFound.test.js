import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('Testa se página contém um h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');

    const notFoundTitle = screen
      .getByRole('heading', { name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/claudio');

    const notFoundImage = screen.getAllByRole('img');

    expect(notFoundImage[1]).toBeInTheDocument();
    expect(notFoundImage[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
