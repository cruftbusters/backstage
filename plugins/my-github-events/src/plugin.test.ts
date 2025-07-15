import { myGithubEventsPlugin } from './plugin';

describe('my-github-events', () => {
  it('should export plugin', () => {
    expect(myGithubEventsPlugin).toBeDefined();
  });
});
