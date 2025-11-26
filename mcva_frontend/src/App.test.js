import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TopNav and Sidebar', () => {
  render(<App />);
  // TopNav brand/title
  expect(screen.getByLabelText(/Top navigation/i)).toBeInTheDocument();
  expect(screen.getByText(/MCVA Templates/i)).toBeInTheDocument();
  // Sidebar sections list
  expect(screen.getByLabelText(/Sections/i)).toBeInTheDocument();
});
