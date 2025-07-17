import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { TodoComponent } from '../TodoComponent';
import { EntityQueryComponent } from '../EntityQueryComponent';

export const LandingComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to my-github-events!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TodoComponent />
        </Grid>
        <Grid item>
          <EntityQueryComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
