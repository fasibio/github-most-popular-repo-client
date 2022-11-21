import { ReactElement } from 'react';
import {
  render as realRender,
  fireEvent,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';

import { Grommet } from 'grommet';

export const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult => {
  return realRender(<Grommet>{ui}</Grommet>, options);
};
