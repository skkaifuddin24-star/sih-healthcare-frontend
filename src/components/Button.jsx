function Button({ children, type = 'button', variant = 'primary', onClick, fullWidth = true }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
    >
      {children}
    </button>
  )
}

export default Button
