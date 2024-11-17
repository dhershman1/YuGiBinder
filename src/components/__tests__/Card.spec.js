import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from '../Cards/Card.vue'

describe('Card.vue', () => {
  it('renders goToLink when passed', () => {
    const wrapper = mount(Card, {
      props: {
        hasActions: true,
        goToLink: 'https://example.com'
      }
    })
    const link = wrapper.find('a[href="https://example.com"]')
    expect(link.exists()).toBe(true)
  })

  it('renders docLink when passed', () => {
    const wrapper = mount(Card, {
      props: {
        hasActions: true,
        docLink: 'https://docs.example.com'
      }
    })
    const link = wrapper.find('a[href="https://docs.example.com"]')
    expect(link.exists()).toBe(true)
  })

  it('renders default icon when no icon prop is passed', () => {
    const wrapper = mount(Card, {
      props: {
        hasActions: true,
        docLink: 'https://docs.example.com'
      }
    })
    const icon = wrapper.findComponent({
      name: 'vue-feather'
    })

    expect(icon.props('type')).toBe('book-open')
  })

  it('renders custom icon when icon prop is passed', () => {
    const wrapper = mount(Card, {
      props: {
        hasActions: true,
        goToLink: 'https://example.com',
        icon: 'book-open'
      }
    })
    const icon = wrapper.findComponent({ name: 'vue-feather' })

    expect(icon.props('type')).toBe('book-open')
  })

  it('renders slots content', () => {
    const wrapper = mount(Card, {
      props: {
        hasActions: true
      },
      slots: {
        main: '<div class="main-content">Main Content</div>',
        text: '<div class="text-content">Text Content</div>',
        tags: '<div class="tags-content">Tags Content</div>'
      }
    })
    expect(wrapper.find('.main-content').exists()).toBe(true)
    expect(wrapper.find('.text-content').exists()).toBe(true)
    expect(wrapper.find('.tags-content').exists()).toBe(true)
  })
})
