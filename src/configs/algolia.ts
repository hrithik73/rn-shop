import algoliasearch from 'algoliasearch/lite';

export const ALGOLIA_API_KEY = '9e73edb952a3313b863fb7c9c1e8da05';
export const ALGOLIA_APP_ID = '919V98QSPE';
export const ALGOLIA_INDEX_NAME = 'dev_rnshop';

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
