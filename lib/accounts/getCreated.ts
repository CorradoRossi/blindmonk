import { getIsomorphicEnhancedResolver } from '@blitzjs/core';
import * as resolverModule from 'app/_resolvers/accounts/queries/getCreated';
export * from 'app/_resolvers/accounts/queries/getCreated';
export default getIsomorphicEnhancedResolver(
  resolverModule,
  'app/_resolvers/accounts/queries/getCreated',
  'getCreated',
  'query',
  undefined,
  {
    warmApiEndpoints: false
  }
);
