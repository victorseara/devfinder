import type { GithubProfileResponse } from '@/api/github';
import * as exports from '@/api/github';
import { build } from '@jackfranklin/test-data-bot';
import {
  DEFAULT_USERNAME,
  UNEXPECTED_ERROR_MESSAGE,
  parseResponseToGithubProfile,
  useGithubProfile,
} from '../useGithubProfile';

const githubProfileResponseBuilder = build<GithubProfileResponse>({
  fields: {
    login: 'octocat',
    id: 583231,
    node_id: 'MDQ6VXNlcjU4MzIzMQ==',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/octocat',
    html_url: 'https://github.com/octocat',
    followers_url: 'https://api.github.com/users/octocat/followers',
    following_url: 'https://api.github.com/users/octocat/following{/other_user}',
    gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
    organizations_url: 'https://api.github.com/users/octocat/orgs',
    repos_url: 'https://api.github.com/users/octocat/repos',
    events_url: 'https://api.github.com/users/octocat/events{/privacy}',
    received_events_url: 'https://api.github.com/users/octocat/received_events',
    type: 'User',
    site_admin: false,
    name: 'The Octocat',
    company: '@github',
    blog: 'https://github.blog',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 9547,
    following: 9,
    created_at: '2011-01-25T18:44:36Z',
    updated_at: '2023-05-22T11:20:34Z',
  },
});

describe('Test useGithubProfile', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Fetch should be triggered manually by user', () => {
    const { data, isLoading, error } = useGithubProfile();

    const expectedInitialState = { data: null, isLoading: false, error: null };
    const initialState = { data: data.value, isLoading: isLoading.value, error: error.value };

    expect(initialState).toEqual(expectedInitialState);
  });

  test("Should fetch octocat's profile if no username is present", async () => {
    const githubProfileResponse = githubProfileResponseBuilder();
    const spy = vi
      .spyOn(exports, 'getUserByUsername')
      .mockImplementation(() => Promise.resolve(githubProfileResponse));

    const { doFetch } = useGithubProfile();

    await doFetch();

    expect(spy).toHaveBeenCalledWith(DEFAULT_USERNAME);
  });

  test('Should fetch a profile for a given username', async () => {
    const username = 'testusername';
    const githubProfileResponse = githubProfileResponseBuilder({ overrides: { login: username } });

    const spy = vi
      .spyOn(exports, 'getUserByUsername')
      .mockImplementation(() => Promise.resolve(githubProfileResponse));

    const { data, doFetch } = useGithubProfile();

    await doFetch(username);

    expect(spy).toHaveBeenCalledWith(username);
    expect(data.value?.username).toBe(username);
  });

  test('Should parse response to GithubPRofile', async () => {
    const githubProfileResponse = githubProfileResponseBuilder();
    const spy = vi
      .spyOn(exports, 'getUserByUsername')
      .mockImplementation(() => Promise.resolve(githubProfileResponse));

    const { data, doFetch } = useGithubProfile();

    await doFetch();

    const expectedResult = parseResponseToGithubProfile(githubProfileResponse);

    expect(spy).toHaveBeenCalled();
    expect(data.value).toEqual(expectedResult);
  });

  test('Should set error when getUserByUsername thorws an Error instance', async () => {
    const errorMock = new Error('Failure');
    const spy = vi.spyOn(exports, 'getUserByUsername').mockImplementation(() => {
      throw errorMock;
    });

    const { error, doFetch } = useGithubProfile();

    await doFetch();

    expect(spy).toHaveBeenCalledOnce();
    expect(error.value?.message).toBe(errorMock.message);
  });

  test('Should set error when getUserByUsername thorws something different from Error instance', async () => {
    const spy = vi.spyOn(exports, 'getUserByUsername').mockRejectedValueOnce(() => {});

    const { error, doFetch } = useGithubProfile();

    await doFetch();

    expect(spy).toHaveBeenCalledOnce();
    expect(error.value?.message).toBe(UNEXPECTED_ERROR_MESSAGE);
  });
});
