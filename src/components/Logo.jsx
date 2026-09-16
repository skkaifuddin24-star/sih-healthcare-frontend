function Logo({ size = 64 }) {
  return (
    <div className="app-logo" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" fill="#2563EB" />
        <path
          d="M32 46c-1 0-2-.3-2.8-1C22 39 18 34.4 18 28.8 18 23.8 21.9 20 26.7 20c2.6 0 5 1.2 6.3 3.1C34.3 21.2 36.7 20 39.3 20 44.1 20 48 23.8 48 28.8 48 34.4 44 39 36.8 45c-.8.7-1.8 1-2.8 1z"
          fill="#FFFFFF"
          opacity="0.95"
        />
        <path
          d="M20 32h6l3-6 4 10 3-6h8"
          stroke="#0F766E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default Logo
