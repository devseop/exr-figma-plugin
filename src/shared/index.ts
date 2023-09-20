export type QuoteProps = {
  author: string | null;
  text: string;
};

export type PluginAcion = 'generateRandomQuote';

export type PluginMessagePayload = {
  type: PluginAcion;
  randomQuote: QuoteProps;
};

export type PlugInCallbackFunction<T = void> = (
  payload: PluginMessagePayload,
) => T;
