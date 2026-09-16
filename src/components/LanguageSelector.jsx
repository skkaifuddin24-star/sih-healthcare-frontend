function LanguageSelector({ languages, selectedLanguage, onSelectLanguage }) {
  return (
    <div className="language-selector-grid">
      {languages.map((lang) => {
        const isSelected = selectedLanguage === lang.value

        return (
          <button
            key={lang.value}
            type="button"
            className={`language-option-card ${
              isSelected ? 'language-selected' : ''
            }`}
            onClick={() => onSelectLanguage(lang.value)}
            aria-pressed={isSelected}
          >
            <div className="language-option-text">
              <span className="language-native-name">{lang.nativeName}</span>
              <span className="language-english-name">{lang.label}</span>
            </div>
            {isSelected && (
              <span className="language-check-badge" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSelector
