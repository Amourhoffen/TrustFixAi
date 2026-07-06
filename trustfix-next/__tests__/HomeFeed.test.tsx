import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomeFeed from '../app/page'

// Mock Framer Motion to prevent animation issues in Jest
jest.mock('framer-motion', () => ({
  motion: {
    div: require('react').forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
    section: require('react').forwardRef(({ children, ...props }: any, ref: any) => <section ref={ref} {...props}>{children}</section>),
    h1: require('react').forwardRef(({ children, ...props }: any, ref: any) => <h1 ref={ref} {...props}>{children}</h1>),
    p: require('react').forwardRef(({ children, ...props }: any, ref: any) => <p ref={ref} {...props}>{children}</p>),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('HomeFeed component', () => {
  it('renders the correct heading', () => {
    render(<HomeFeed />)
    const heading = screen.getByText(/Community/i)
    expect(heading).toBeInTheDocument()
  })

  it('displays the correct number of total reports', () => {
    render(<HomeFeed />)
    const stat = screen.getByText('1,204')
    expect(stat).toBeInTheDocument()
  })
})
