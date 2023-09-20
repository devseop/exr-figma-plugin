import { useState } from 'react';
import { QuoteProps } from '../../shared';
import { requestQuotes } from '../api';

export default function useRandomQuotes() {
  const [quotesData, setQuotesData] = useState<QuoteProps[] | null>(null);

  const getQuotes = async () => {
    if (quotesData) {
      console.log(quotesData);
      return quotesData;
    }

    const apiQuotes = await requestQuotes();
    setQuotesData(apiQuotes);
    return apiQuotes;
  };

  const getRandomQuote = async () => {
    const quotes = await getQuotes();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return quote;
  };

  return getRandomQuote;
}
