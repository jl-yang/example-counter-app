import { Counter } from "../models/Counter";
import { render, screen } from "@testing-library/react";
import CounterTable from "./CounterTable";

describe('Test counter table', () => {
  it('should render the table', () => {
    const testCounters: Counter[] = [
      {
        username: 'test-user1',
        count: 10
      },
      {
        username: 'test-user2',
        count: 5
      },
    ]

    render(<CounterTable counters={testCounters} />)

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const counterRows = screen.getAllByRole('row');
    expect(counterRows.length).toBe(3);

    expect(counterRows[0].querySelectorAll('th')[0].textContent).toBe('Username');
    expect(counterRows[1].querySelectorAll('td')[0].textContent).toBe('test-user1');
    expect(counterRows[2].querySelectorAll('td')[0].textContent).toBe('test-user2');
  });

  it('should render the table in descending order of count', () => {
    const testCounters: Counter[] = [
      {
        username: 'test-user1',
        count: 10
      },
      {
        username: 'test-user2',
        count: 15
      },
    ]

    render(<CounterTable counters={testCounters} />)

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const counterRows = screen.getAllByRole('row');
    expect(counterRows.length).toBe(3);

    expect(counterRows[0].querySelectorAll('th')[0].textContent).toBe('Username');
    expect(counterRows[1].querySelectorAll('td')[0].textContent).toBe('test-user2');
    expect(counterRows[2].querySelectorAll('td')[0].textContent).toBe('test-user1');
  });
})