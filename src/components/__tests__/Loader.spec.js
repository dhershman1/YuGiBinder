import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Loader from '../Loader.vue'

describe('Loader.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(Loader)
    expect(wrapper.props().style).toBe('wave')
    expect(wrapper.props().size).toBe('medium')
  })

  it('renders with small size', () => {
    const wrapper = mount(Loader, {
      props: { size: 'small' }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('24px')
    expect(svg.attributes('height')).toBe('30px')
  })

  it('renders with large size', () => {
    const wrapper = mount(Loader, {
      props: { size: 'large' }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('96px')
    expect(svg.attributes('height')).toBe('120px')
  })

  it('renders with wave style', () => {
    const wrapper = mount(Loader, {
      props: { style: 'wave' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.findAll('rect').length).toBe(3)
  })

  it('renders with vertical style', () => {
    const wrapper = mount(Loader, {
      props: { style: 'vertical' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.findAll('rect').length).toBe(3)
  })

  it('validates size prop', () => {
    const validator = Loader.props.size.validator
    expect(validator('small')).toBe(true)
    expect(validator('medium')).toBe(true)
    expect(validator('large')).toBe(true)
    expect(validator('extra-large')).toBe(false)
  })
})
