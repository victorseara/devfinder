import { build } from '@jackfranklin/test-data-bot';
import { GET_USER_BY_USERNAME_URL, getUserByUsername, type GithubProfileResponse } from '../github';

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

function getResponseMock<T>(data: T, overrides?: Partial<Response>): Promise<Response> {
  return Promise.resolve({
    ...new Response(),
    json: () => Promise.resolve(data),
    ...overrides,
  });
}

describe('Test getUserByUsername', () => {
  test('Should fetch user profile by a given username ', async () => {
    const username = 'testusername';
    const githubProfileResponse = githubProfileResponseBuilder({ overrides: { login: username } });

    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => getResponseMock(githubProfileResponse, { ok: true }));

    await getUserByUsername(username);

    const fetchUrl = `${GET_USER_BY_USERNAME_URL}/${username}`;
    expect(fetchSpy).toHaveBeenCalledWith(fetchUrl);
  });

  test('Should throw if fetch fails', async () => {
    const username = 'testusername';

    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => getResponseMock(null, { ok: false }));

    await expect(() => getUserByUsername(username)).rejects.toThrow();
    expect(fetchSpy).toHaveBeenCalledOnce();
  });
});
