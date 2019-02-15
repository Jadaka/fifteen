import { cloneDeep } from 'lodash';

import { Rows } from '../modules/Game';

const debugRows = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 15, 11],
  [13, 14, 0, 12],
];

export const getDebugRows = (): Rows => {
  return cloneDeep(debugRows);
}
