import TopWiki from './TopWiki';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import mockResponse from './mockResponse.json';

jest.mock('axios');

test('100 Articles rendered by default', async () => {
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponse });

  render(<TopWiki />);

  await waitFor(() => {
    const articleCards = screen.getAllByTestId('article-card');
    expect(articleCards).toHaveLength(100);
  });
});

test('Displays no articles found when results are empty', async () => {
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });

  render(<TopWiki />);

  await waitFor(() => {
    expect(screen.getByText('No Articles Found')).toBeInTheDocument();
  });
});

//todo
//Hits country endpoint when country is selected in Autocomplete
//number of articles changes when opening Select and changing num of results value
//articles change when changing date value
