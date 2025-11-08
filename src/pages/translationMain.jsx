import { useState } from 'react'
import '../App.css'
import { tokenize } from '../components/tokenizer'

function TranslationMain() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const [tokens, setTokens] = useState([])
  const [translatedTokens, setTranslatedTokens] = useState([])

  const handleTranslate = async () => {
    // Tokenize all text boxes
    setTokens(tokenize(text1))
  }

  return (
    <div className="translation-container">
      <h1>Translation App</h1>
      
      <div className="four-column-layout">
        <div className="column">
          <label>Base Language</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter text..."
            rows={20}
          />
        </div>
        
        <div className="column">
            <label>Tokenized Language 1</label>
            {tokens.map((t, i) => (
                <div key={i} className="token-box-with-button">
                    <textarea
                        value={t}
                        readOnly
                        rows={Math.ceil(t.length / 80) < 2 ? 2 : Math.ceil(t.length / 80)}
                    />
                    <div className="button-spacer"></div>
                </div>
            ))}         
        </div>

       <div className="column">
            <label>Tokenized Language 2</label>
            {tokens.map((t, i) => (
                <div key={i} className="token-box-with-button">
                    <textarea
                        value={translatedTokens[i] || ''}
                        onChange={(e) => {
                            const newTokens = [...translatedTokens]
                            newTokens[i] = e.target.value
                            setTranslatedTokens(newTokens)
                        }}
                        rows={Math.ceil(t.length / 80) < 2 ? 2 : Math.ceil(t.length / 80)}
                    />
                    <button 
                        className="token-button"
                        onClick={() => {
                            // Add your button action here
                            console.log(`Button clicked for token ${i}:`, translatedTokens[i])
                        }}
                    >
                        Translate
                    </button>
                </div>
            ))}         
        </div>
        
        <div className="column">
          <label>Target Language</label>
          <textarea
            value={translatedTokens.join('\n')}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter text..."
            rows={20}
          />
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={handleTranslate}>Tokenize</button>
        <button onClick={() => {
            setText1('')
            setText2('')
            setTokens([])
            setTranslatedTokens([])
        }}>Clear All</button>
      </div>    
    </div>
  )
}

export default TranslationMain
