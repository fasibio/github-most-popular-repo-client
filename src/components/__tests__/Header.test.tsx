import { AppHeader } from '../Header';
import { render } from '../../__testhelper__/render';

describe('tests header component', () => {
  it('component render snapshot', () => {
    const component = render(<AppHeader />);
    expect(component).toMatchSnapshot();
  });
});
