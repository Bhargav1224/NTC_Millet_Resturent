/*eslint-disable*/
import { renderWithProviders } from './utils-for-tests';
import LoginForm from '../components/LoginForm/index.jsx';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

describe('my function or component', () => {
  test('Should render LoginForm view component', () => {
    render(
      renderWithProviders(
      <Router>
        <LoginForm />
      </Router>)
    )
    expect(screen.getByText(/Create One?/i)).toBeInTheDocument()
  });
});