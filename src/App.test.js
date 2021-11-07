import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sudoku solver header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Sudoku Solver/);
  expect(headerElement).toBeInTheDocument();
});
