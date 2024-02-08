/*eslint-disable*/
import { render, screen } from '@testing-library/react';
import App from '../components/App/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Donot have an account?/i);
  expect(linkElement).toBeInTheDocument();
  // const linkElement1 = screen.getByText(/Forgot Password?/i);
  // expect(linkElement1).toBeInTheDocument();
  // const linkElement2 = screen.getByTestId('title');
  // expect(linkElement2).toBeInTheDocument();
  // const n = screen.getByPlaceholderText('Username');
  // expect(n).not.toBeNull();
});
