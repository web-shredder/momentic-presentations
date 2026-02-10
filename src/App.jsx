import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TheLandscape from './pages/TheLandscape'
import DiscoveryToLaunch from './pages/DiscoveryToLaunch'

const LandingPage = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f1117',
    color: '#fff',
    fontFamily: '"IBM Plex Sans", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  }

  const contentStyle = {
    maxWidth: '1000px',
    textAlign: 'center',
  }

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  }

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '3rem',
    fontWeight: '400',
  }

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
  }

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }

  const cardHoverStyle = {
    ...cardStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: '#FE2516',
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(254, 37, 22, 0.1)',
  }

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0',
  }

  const cardDescriptionStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: '0',
  }

  const [hoveredCard, setHoveredCard] = React.useState(null)

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Momentic</h1>
        <p style={subtitleStyle}>Northshore Chamber of Commerce &middot; February 2026</p>

        <div style={cardsContainerStyle}>
          <Link
            to="/landscape"
            style={hoveredCard === 'landscape' ? cardHoverStyle : cardStyle}
            onMouseEnter={() => setHoveredCard('landscape')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={cardTitleStyle}>Building an impactful website</h2>
            <p style={cardDescriptionStyle}>Why your website matters more than ever, and what to do about it</p>
          </Link>

          <Link
            to="/discovery"
            style={hoveredCard === 'discovery' ? cardHoverStyle : cardStyle}
            onMouseEnter={() => setHoveredCard('discovery')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={cardTitleStyle}>From discovery to launch</h2>
            <p style={cardDescriptionStyle}>The Momentic method, from first research call to a launched website</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landscape" element={<TheLandscape />} />
      <Route path="/discovery" element={<DiscoveryToLaunch />} />
    </Routes>
  )
}
