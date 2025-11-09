import { useState } from 'react'
import '../App.css'
import languageCodes from '../data/languageCodes'
import { tokenize } from '../components/tokenizer'
import { ClipboardCopy } from 'lucide-react'

function TranslationMain() {
  const charPerLine = 50

  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const [tokens, setTokens] = useState([])
  const [translatedTokens, setTranslatedTokens] = useState([])

  const [copied, setCopied] = useState(false)

  const [fromLanguage, setFromLanguage] = useState('en')
  const [toLanguage, setToLanguage] = useState('en')

  //tokenizes the 
  const handleTranslate = async (inputText) => {
    // Tokenize all text boxes
    const textToTokenize = inputText !== undefined ? inputText : text1
    setTokens(tokenize(textToTokenize))
  }

  const handleRemoveToken = (index) => {
    setTokens(tokens.filter((_, i) => i !== index))
    setTranslatedTokens(translatedTokens.filter((_, i) => i !== index))
  }

  const handleAddToken = () => {
    setTokens([...tokens, ''])
    setTranslatedTokens([...translatedTokens, ''])
    console.log(languageCodes)
  }

  const handleCopy = (text, setCopied) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="translation-container">
      <h1>Translation App</h1>
      <div className='language-selector'>
        <select 
          className='from-language-select'
          onChange={(e) => setFromLanguage(e.target.value)}
          
        >
          {Object.entries(languageCodes).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>

        <p> → </p>

        <select 
          className='to-language-select'
          onChange={(e) => setToLanguage(e.target.value)}
        >
          {Object.entries(languageCodes).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      
      <div className="four-column-layout">
        <div className="column">
          <label>{languageCodes[fromLanguage]}</label>
          <textarea
            value={text1}
            onChange={(e) => {
              const newText = e.target.value
              setText1(newText)
              
              if(newText.trim() === '') {
                setTokens([])
                setTranslatedTokens([])
              } else {
                handleTranslate(newText)
              }
            }}
            placeholder="Enter text..."
            rows={20}
          />
        </div>
        
        <div className="column">
            <label>Tokenized {languageCodes[fromLanguage]}</label>
            {tokens.map((t, i) => (
                <div key={i} className="token-box-with-button">
                    <button 
                        className="delete-button"
                        onClick={() => {
                            handleRemoveToken(i)
                        }}
                    >
                        -
                    </button>
                    <textarea
                        value={t}
                        rows={Math.ceil(t.length / charPerLine) < 2 ? 2 : Math.ceil(t.length / charPerLine)}
                        onChange={(e) => {
                            const newTokens = [...tokens]
                            newTokens[i] = e.target.value
                            setTokens(newTokens)
                        }}
                    />
                </div>
            ))}         
        </div>

       <div className="column">
            <label>Tokenized {languageCodes[toLanguage]}</label>
            {tokens.map((t, i) => (
              <div key={i} className="token-box-with-button">
                  <button 
                      className="translate-button"
                      onClick={() => {
                          // Add your button action here
                          console.log(`Button clicked for token ${i}:`, translatedTokens[i])
                      }}
                  >
                      Translate
                  </button>
                  <textarea
                      value={translatedTokens[i] || ''}
                      onChange={(e) => {
                          const newTokens = [...translatedTokens]
                          newTokens[i] = e.target.value
                          setTranslatedTokens(newTokens)
                      }}
                      rows={Math.ceil(t.length / charPerLine) < 2 ? 2 : Math.ceil(t.length / charPerLine)}
                  />
              </div>
            ))}         
        </div>
        
        <div className="column">
          <div className='clipboard-wrapper'>
            <label>{languageCodes[toLanguage]}</label>
            <textarea
              value={translatedTokens.join('\n')}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Translated text will populate here..."
              rows={20}
            />
            <button 
              className='clipboard-button'
              onClick={() => handleCopy(translatedTokens.join('\n'), setCopied)}
            >
              <ClipboardCopy size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={handleAddToken}>Add Row</button>
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
