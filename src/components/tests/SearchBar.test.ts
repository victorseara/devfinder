import { mount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';

describe('Test SearchBar', () => {
  test('User can submit a query', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    });

    const searchTerm = 'test';

    await wrapper.find('input').setValue(searchTerm);
    expect(wrapper.props('modelValue')).toBe(searchTerm);

    await wrapper.find('button').trigger('submit');
    expect(wrapper.emitted()).toHaveProperty('submit');
  });

  test('Display loading indicator while searching', () => {
    const wrapper = mount(SearchBar, {
      props: {
        isLoading: true,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    });

    expect(wrapper.get('[data-testid=searchbar-isLoading]').isVisible()).toBeTruthy();
  });

  test('Display error message', () => {
    const wrapper = mount(SearchBar, {
      props: {
        error: 'No results',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    });

    expect(wrapper.get('[data-testid=searchbar-error]').isVisible()).toBeTruthy();
  });
});
