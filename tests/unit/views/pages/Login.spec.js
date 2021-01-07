import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Login from '@/views/pages/login'

Vue.use(BootstrapVue)

describe('login.vue', () => {
  it('has a name', () => {
    expect(Login.name).toMatch('Login')
  })
  it('is Vue instance', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('is login', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.is(Login)).toBe(true)
  })
  it('should render correct content', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('h1').text()).toMatch('Login')
  })
  test('renders correctly', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.element).toMatchSnapshot()
  })
})
