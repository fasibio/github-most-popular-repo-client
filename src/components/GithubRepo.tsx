import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Text,
} from 'grommet';
import { Book, Bookmark, Star } from 'grommet-icons';
import { useTranslation } from 'react-i18next';
import { Repo } from '../store/github-data';
export interface Props {
  repo: Repo;
  isBookedMarked: boolean;
  onBookmarkClicked: (repo: Repo) => void;
}

export const GithubRepo = ({ repo, onBookmarkClicked, isBookedMarked }: Props) => {
  const { t } = useTranslation();
  return (
    <Card width={{ max: 'large' }}>
      <CardHeader background={'background-front'}>
        <Box margin="small" direction="row" justify={'between'} flex={true}>
          <Box direction="row" gap={'small'}>
            <Book />
            <Anchor
              target={'_blank'}
              href={repo.owner.html_url}
              size="medium"
              label={repo.owner.login}
            />
            <Text size="medium">/</Text>
            <Anchor
              target={'_blank'}
              href={repo.html_url}
              size="medium"
              label={repo.name}
            />
          </Box>

          <Box direction="column" align="center" gap="small">
            <Button
              data-testid="bookmarkbutton"
              alignSelf="end"
              title={t('githubrepo.btnAddToFavoriteToolTip') as string}
              icon={<Bookmark color={isBookedMarked ? 'focus' : undefined} />}
              onClick={() => {
                onBookmarkClicked(repo);
              }}
            />
            <Box direction="row" align="center" gap="xxsmall">
              <Star />
              <Text>{repo.stargazers_count}</Text>
            </Box>
          </Box>
        </Box>
      </CardHeader>
      <CardBody background={'background-back'}>
        <Tabs>
          <Tab title={t('githubrepo.tabs.0.title')}>
            <Box margin={'small'}>
              <Text>{repo.description ?? t('githubrepo.tabs.0.noDescription')}</Text>
            </Box>
          </Tab>
          <Tab
            title={`${t('githubrepo.tabs.1.title')} (${repo.open_issues_count})`}
            onClick={() => {
              window.open(`${repo.html_url}/issues`);
            }}
          />
        </Tabs>
      </CardBody>
    </Card>
  );
};
