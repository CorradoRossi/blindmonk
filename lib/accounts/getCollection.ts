import { getIsomorphicEnhancedResolver } from '@blitzjs/core';
import * as resolverModule from 'app/_resolvers/accounts/queries/getCollection';
export * from 'app/_resolvers/accounts/queries/getCollection';
export default getIsomorphicEnhancedResolver(
  resolverModule,
  'app/_resolvers/accounts/queries/getCollection',
  'getCollection',
  'query',
  undefined,
  {
    warmApiEndpoints: false
  }
);
