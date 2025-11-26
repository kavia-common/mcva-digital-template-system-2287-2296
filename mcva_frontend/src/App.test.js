import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders TopNav and Sidebar', () => {
  render(<App />);
  // TopNav brand/title
  expect(screen.getByLabelText(/Top navigation/i)).toBeInTheDocument();
  expect(screen.getByText(/MCVA Templates/i)).toBeInTheDocument();
  // Sidebar sections list (default editor view)
  expect(screen.getByLabelText(/Sections/i)).toBeInTheDocument();
});

test('UI Blocks nav exists and shows gallery when clicked', () => {
  render(<App />);
  const uiBlocksBtn = screen.getByRole('button', { name: /UI Blocks/i });
  expect(uiBlocksBtn).toBeInTheDocument();

  fireEvent.click(uiBlocksBtn);

  // Gallery heading or panel should be present
  expect(screen.getByLabelText(/UI Blocks Gallery Panel/i)).toBeInTheDocument();
  expect(screen.getByText(/UI Blocks/i)).toBeInTheDocument();
});
