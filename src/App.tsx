import { Grommet } from 'grommet';
import { useThemeing, useThemeMode } from './store/themeing';
import { resources } from './config/location';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppHeader } from './components/Header';
import { GithubDataShower } from './components/GithubDataShower';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  const { selectedTheme } = useThemeing();
  const { getMainBackground } = useThemeMode();

  return (
    <Grommet theme={selectedTheme.theme} full background={getMainBackground()}>
      <AppHeader />
      <GithubDataShower />
    </Grommet>
  );
}

export default App;
