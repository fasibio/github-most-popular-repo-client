import { Box, Heading, Spinner, Text, Tabs, Tab, ResponsiveContext } from 'grommet';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGithubDataLoader } from '../store/github-data';
import { GithubRepoList } from './GithubRepoList';

export const GithubDataShower = () => {
  const { data, load, toggleOnFavoriteList, favoriteIds, favorite } =
    useGithubDataLoader();

  const { t } = useTranslation();
  const size = React.useContext(ResponsiveContext);
  useEffect(() => {
    load();
  }, []);

  if (!data) {
    return (
      <Box direction="row" gap="small" align="center" justify="center" margin={'medium'}>
        <Spinner color={{ dark: 'red', light: 'green' }} />
        <Text size="xxlarge">{t('githubdatashower.loading')}</Text>;
      </Box>
    );
  }
  return (
    <Box
      margin={{ vertical: 'small', horizontal: size !== 'small' ? 'xlarge' : undefined }}
      align={'center'}
    >
      <Heading>{t('githubdatashower.title')}</Heading>
      <Tabs>
        <Tab title={t('githubdatashower.tabs.0.title')}>
          <GithubRepoList
            data={data.items}
            favoriteIds={favoriteIds}
            toggleOnFavoriteList={toggleOnFavoriteList}
          />
        </Tab>
        <Tab title={`${t('githubdatashower.tabs.1.title')} (${favoriteIds.length})`}>
          <GithubRepoList
            data={favorite()}
            favoriteIds={favoriteIds}
            toggleOnFavoriteList={toggleOnFavoriteList}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
