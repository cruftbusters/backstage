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
import { MyOpenshiftControllerComponent } from '../MyOpenshiftControllerComponent';

export const LandingComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to my-github-events!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader>
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <MyOpenshiftControllerComponent />
        </Grid>
        <Grid item>
          <EntityQueryComponent />
        </Grid>
        <Grid item>
          <TodoComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
