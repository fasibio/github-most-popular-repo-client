import { Box, Button, Header, Menu, ResponsiveContext, Text } from 'grommet';
import { Moon, Paint, Sun } from 'grommet-icons';
import React from 'react';

import { useThemeing, useThemeMode } from '../store/themeing';

export const AppHeader = () => {
  return (
    <Header
      height={'50px'}
      width={'100%'}
      background="brand"
      justify={'end'}
      flex={false}
    >
      <ThemeingNav />
    </Header>
  );
};

export const ThemeingNav = () => {
  const { themes, setSelectedTheme, selectedTheme } = useThemeing();
  const size = React.useContext(ResponsiveContext);
  const { dark, setMode } = useThemeMode();
  return (
    <Box direction="row" height={'50px'} justify="end">
      <Button
        hoverIndicator
        onClick={() => setMode(!dark)}
        icon={dark ? <Sun /> : <Moon />}
      />
      <Box height="50px" justify="center" align="center" pad="small">
        <Menu
          dropBackground={'brand'}
          dropProps={{ align: { top: 'top', right: 'right' } }}
          items={themes.map((theme) => {
            return {
              label: (
                <Box
                  align="center"
                  gap="small"
                  margin={'small'}
                  justify="center"
                  alignSelf="center"
                >
                  {theme.name}
                </Box>
              ),
              onClick: () => {
                setSelectedTheme(theme);
              },
              active: selectedTheme.name === theme.name,
            };
          })}
        >
          <Box
            align="end"
            gap={'small'}
            margin={{ right: 'small' }}
            justify="center"
            direction="row"
          >
            <Paint />
            {size !== 'small' && <Text>{selectedTheme.name}</Text>}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};
