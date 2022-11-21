import {
  GithubRepoState,
  MostStarredRepoResult,
  Repo,
  useGithubDataLoader,
} from '../../store/github-data';
import { GithubDataShower } from '../GithubDataShower';
import type { PartialDeep } from 'type-fest';
import { render } from '../../__testhelper__/render';

jest.mock('../../store/github-data', () => ({
  useGithubDataLoader: jest.fn(),
}));
jest.mock('../GithubRepo.tsx', () => {
  return {
    GithubRepo: (props: any) => {
      return <h1 {...props}>GithubRepo</h1>;
    },
  };
});
describe('tests githubdatashower', () => {
  const renderTests: {
    name: string;
    input: {
      data: PartialDeep<MostStarredRepoResult> | undefined;
      load: jest.Mock;
      toggleOnFavoriteList: jest.Mock;
      favoriteIds: number[];
      favorite: jest.Mock;
    };
    want: {
      loadCalled: boolean;
      toggleOnFavoriteListCalled: boolean;
      favoriteCalled: boolean;
    };
  }[] = [
    {
      name: 'data not downloaded yet show loading screen',
      input: {
        data: undefined,
        favorite: jest.fn(),
        favoriteIds: [],
        load: jest.fn(),
        toggleOnFavoriteList: jest.fn(),
      },
      want: {
        loadCalled: true,
        favoriteCalled: false,
        toggleOnFavoriteListCalled: false,
      },
    },
    {
      name: 'data are loaded and have no favorite',
      input: {
        data: {
          items: [
            {
              id: 1,
              name: 'p1 ',
            } as Repo,
            {
              id: 2,
              name: 'p2 ',
            } as Repo,
          ],
        },
        favorite: jest.fn(),
        favoriteIds: [],
        load: jest.fn(),
        toggleOnFavoriteList: jest.fn(),
      },
      want: {
        loadCalled: true,
        favoriteCalled: true,
        toggleOnFavoriteListCalled: false,
      },
    },
    {
      name: 'data are loaded and have one favorite',
      input: {
        data: {
          items: [
            {
              id: 1,
              name: 'p1 ',
            } as Repo,
            {
              id: 2,
              name: 'p2 ',
            } as Repo,
          ],
        },
        favorite: jest.fn(),
        favoriteIds: [2],
        load: jest.fn(),
        toggleOnFavoriteList: jest.fn(),
      },
      want: {
        loadCalled: true,
        favoriteCalled: true,
        toggleOnFavoriteListCalled: false,
      },
    },
  ];
  renderTests.forEach((test) => {
    it(`render snapshot => ${test.name}`, () => {
      (useGithubDataLoader as unknown as jest.Mock<GithubRepoState>).mockReturnValue({
        data: test.input.data as MostStarredRepoResult,
        load: test.input.load,
        favorite: test.input.favorite,
        favoriteIds: test.input.favoriteIds,
        toggleOnFavoriteList: test.input.toggleOnFavoriteList,
      });
      const component = render(<GithubDataShower />);
      expect(component.container).toMatchSnapshot();
      (useGithubDataLoader as unknown as jest.Mock<GithubRepoState>).mockReset();
      if (test.want.loadCalled) {
        expect(test.input.load).toBeCalled();
      } else {
        expect(test.input.load).not.toBeCalled();
      }
      if (test.want.favoriteCalled) {
        expect(test.input.favorite).toBeCalled();
      } else {
        expect(test.input.favorite).not.toBeCalled();
      }
    });
  });
});
