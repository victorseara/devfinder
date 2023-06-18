import type { GithubProfile } from '@/composables';
import FormatUtils from '@/utils/FormatUtils';
import { build } from '@jackfranklin/test-data-bot';
import { mount } from '@vue/test-utils';
import { UserProfile } from '../UserProfile';

const userProfileBuilder = build<GithubProfile>({
  fields: {
    avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
    createdAt: '2011-01-25T18:44:36Z',
    username: 'octocat',
    name: 'The Octocat',
    bio: null,
    repos: 8,
    followers: 9445,
    following: 9,
    location: 'San Francisco',
    twitter: null,
    company: '@github',
    website: 'https://github.blog',
  },
});

describe('UserProfile Test', () => {
  test('Display joined date properly', () => {
    const userProfile = userProfileBuilder();
    const joinedAt = FormatUtils.formatDateToMedium(new Date(userProfile.createdAt));

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    expect(wrapper.text()).contain(joinedAt);
  });

  test("Username must be a formatted link to user's profile on Github", () => {
    const userProfile = userProfileBuilder();

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    const profileUrl = FormatUtils.createProfileUrl(userProfile.username);
    expect(wrapper.get(`a[href="${profileUrl}"]`).text()).contains(userProfile.username);
  });

  test("Website must be a formatted link to user's website", () => {
    const userProfile = userProfileBuilder();

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    const websiteUrl = FormatUtils.createWebsiteUrl(userProfile.website);
    expect(wrapper.get(`a[href="${websiteUrl}"]`).text()).contain(userProfile.website);
  });

  test('Invalid website URL should appear as text', () => {
    const website = 'github.org';
    const userProfile = userProfileBuilder({ overrides: { website } });

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    expect(wrapper.text()).contains(website);
  });

  test("Company must be a formatted link to user's company on GitHub", () => {
    const company = '@github';
    const userProfile = userProfileBuilder({ overrides: { company: company } });

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    const companyName = company.slice(1, company.length);
    const companyProfileUrl = FormatUtils.createProfileUrl(companyName);

    expect(wrapper.get(`a[href="${companyProfileUrl}"]`).text()).contain(company);
  });
  test("If user's name is not present it should display the username", () => {
    const userProfile = userProfileBuilder({ overrides: { name: null } });

    const wrapper = mount(UserProfile, {
      props: { ...userProfile },
    });

    expect(wrapper.get('[data-testid=user-name]').text()).contains(userProfile.username);
  });
});
