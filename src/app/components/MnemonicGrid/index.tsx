import { Box, Grid, ResponsiveContext, Text } from 'grommet'
import * as React from 'react'
import { useContext } from 'react'

/**
 *
 * MnemonicGrid
 *
 */
interface WordProp {
  id: number
  word: string
  hidden?: boolean
  higlighted?: boolean
}

let noSelect: React.CSSProperties = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
}

function MnemonicWord(props: WordProp) {
  return (
    <Box
      background={props.higlighted ? 'brand' : 'background-contrast'}
      margin="xsmall"
      direction="row"
      pad="xsmall"
      border={{ side: 'bottom' }}
    >
      <Box pad={{ right: 'small' }}>
        <Text style={noSelect}>{props.id}.</Text>
      </Box>
      <Box>
        <strong>{props.hidden ? '' : props.word}</strong>
      </Box>
    </Box>
  )
}

interface Props {
  // List of words
  mnemonic: string[]

  /** Indexes of hidden words, used for mnemonic validation */
  hiddenWords?: number[]

  /** Highlighted word indexes, used for mnemonic validation */
  highlightedIndex?: number
}

export function MnemonicGrid({ mnemonic, highlightedIndex: hilightedIndex, hiddenWords }: Props) {
  const size = useContext(ResponsiveContext)
  const columns = {
    small: ['1fr', '1fr'],
    medium: ['1fr', '1fr', '1fr'],
    large: ['1fr', '1fr', '1fr', '1fr'],
  }

  const words = mnemonic!.map(word => word.trim()).filter(word => word !== '')

  return (
    <Grid columns={columns[size]} data-testid="mnemonic-grid">
      {words.map((word, index) => (
        <MnemonicWord
          key={index + 1}
          id={index + 1}
          word={word}
          higlighted={index === hilightedIndex}
          hidden={hiddenWords && hiddenWords.indexOf(index) !== -1}
        />
      ))}
    </Grid>
  )
}
