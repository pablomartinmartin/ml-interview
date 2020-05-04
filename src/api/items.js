import { MOCK_ITEMS_SEARCH } from '../_fixtures/items';

export function itemsApi() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(MOCK_ITEMS_SEARCH), 1000)
    });
  
    return promise;
  }