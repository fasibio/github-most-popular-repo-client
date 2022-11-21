import { List } from 'grommet';
import styled from 'styled-components';
import { Repo } from '../store/github-data';
import { GithubRepo } from './GithubRepo';

interface Test<ListItemType = Repo> {
  children: any; // @TODO
}
const ListBox = styled(List)<Test>``;

export interface Props {
  data: Repo[] | undefined;
  favoriteIds: number[];
  toggleOnFavoriteList: (repo: Repo) => void;
}

export const GithubRepoList = ({ data, favoriteIds, toggleOnFavoriteList }: Props) => {
  return (
    <ListBox border={false} data={data} primaryKey={'id'}>
      {(d: Repo) => (
        <GithubRepo
          data-testid={`GithubRepo`}
          key={d.id}
          repo={d}
          isBookedMarked={favoriteIds.includes(d.id)}
          onBookmarkClicked={toggleOnFavoriteList}
        />
      )}
    </ListBox>
  );
};
