import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Socials from '../Socials.vue'

describe('Socials.vue', () => {
  it('renders the correct number of social links', () => {
    const wrapper = mount(Socials)
    const links = wrapper.findAll('a')
    expect(links.length).toBe(4)
  })

  it('renders the Twitter link correctly', () => {
    const wrapper = mount(Socials)
    const twitterLink = wrapper.find('a[href="https://twitter.com/sirdugs"]')
    expect(twitterLink.exists()).toBe(true)
    expect(twitterLink.attributes('aria-label')).toBe('My Twitter Profile')
  })

  it('renders the Github link correctly', () => {
    const wrapper = mount(Socials)
    const githubLink = wrapper.find('a[href="https://github.com/dhershman1"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('aria-label')).toBe('My Github Profile')
  })

  it('renders the LinkedIn link correctly', () => {
    const wrapper = mount(Socials)
    const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/dustin-hershman/"]')
    expect(linkedinLink.exists()).toBe(true)
    expect(linkedinLink.attributes('aria-label')).toBe('My LinkedIn Profile')
  })

  it('renders the BlueSky link correctly', () => {
    const wrapper = mount(Socials)
    const blueSkyLink = wrapper.find('a[href="https://bsky.app/profile/dhershman.bsky.social"]')
    expect(blueSkyLink.exists()).toBe(true)
    expect(blueSkyLink.attributes('aria-label')).toBe('My BlueSky Profile')
  })
})
