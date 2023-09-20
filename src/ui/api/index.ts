import { QuoteProps } from '../../shared';

const apiUrl = 'https://type.fit/api/quotes';

export const requestQuotes = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data as QuoteProps[];
};
