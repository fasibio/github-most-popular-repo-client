import { GithubRepo } from '../GithubRepo';
import { render } from '../../__testhelper__/render';
import { Owner, Repo } from '../../store/github-data';
import type { PartialDeep } from 'type-fest';

describe('tests githubrepo card component', () => {
  const renderTests: {
    name: string;
    input: {
      repo: PartialDeep<Repo>;
      isBookedMarked: boolean;
    };
  }[] = [
    {
      name: 'fullsetTest',
      input: {
        repo: {
          id: 12344,
          html_url: 'repo html_url',
          name: 'repo name',
          stargazers_count: 160,
          description: 'test Description',
          open_issues_count: 2,
          owner: {
            html_url: 'owner html_url',
            login: 'login',
          },
        },
        isBookedMarked: true,
      },
    },
    {
      name: 'fullsetTest not bookmarked',
      input: {
        repo: {
          id: 12344,
          html_url: 'repo html_url',
          name: 'repo name',
          stargazers_count: 160,
          description: 'test Description',
          open_issues_count: 2,
          owner: {
            html_url: 'owner html_url',
            login: 'login',
          },
        },
        isBookedMarked: false,
      },
    },
    {
      name: 'fullsetTest no description',
      input: {
        repo: {
          id: 12344,
          html_url: 'repo html_url',
          name: 'repo name',
          stargazers_count: 160,
          description: undefined,
          open_issues_count: 2,
          owner: {
            html_url: 'owner html_url',
            login: 'login',
          },
        },
        isBookedMarked: true,
      },
    },
  ];
  renderTests.forEach((test) => {
    it(`tests render componen ==> ${test.name}`, () => {
      const component = render(
        <GithubRepo
          onBookmarkClicked={() => {}}
          isBookedMarked={test.input.isBookedMarked}
          repo={test.input.repo as Repo}
        />,
      );
      expect(component.container).toMatchSnapshot();
    });
  });

  it('tests click on Bookmarkbutton will be triggered', async () => {
    const mockData = {
      id: 12344,
      html_url: 'repo html_url',
      name: 'repo name',
      stargazers_count: 160,
      description: 'test Description',
      open_issues_count: 2,
      owner: {
        html_url: 'owner html_url',
        login: 'login',
      },
    };
    const onBookmarkClickedMock = jest.fn();
    const component = render(
      <GithubRepo
        onBookmarkClicked={onBookmarkClickedMock}
        isBookedMarked={true}
        repo={mockData as Repo}
      />,
    );
    const button = await component.findByTestId('bookmarkbutton');
    button.click();
    expect(onBookmarkClickedMock).toBeCalledWith(mockData);
  });
});
