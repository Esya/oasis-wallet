import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { Provider } from 'react-redux'
import { configureAppStore } from 'store/configureStore'
import { ThemeProvider } from 'styles/theme/ThemeProvider'

import { FromPrivateKey } from '..'

const renderPage = (store: any) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <FromPrivateKey />
      </ThemeProvider>
    </Provider>,
  )

describe('<FromPrivateKey  />', () => {
  let store: ReturnType<typeof configureAppStore>

  beforeEach(() => {
    store = configureAppStore()
  })

  it('should match snapshot', () => {
    const page = renderPage(store)
    expect(page.container.firstChild).toMatchSnapshot()
  })

  it('should display an error on invalid private key', () => {
    renderPage(store)
    const textbox = screen.getByPlaceholderText('openWallet.privateKeyForm.enterPrivateKeyHere')
    const button = screen.getByRole('button', { name: 'openWallet.import' })
    userEvent.type(textbox, 'hello')
    userEvent.click(button)
    const errorElem = screen.getByText('openWallet.privateKeyForm.error')
    expect(errorElem).toBeInTheDocument()

    // A valid phrase should remove the error
    userEvent.clear(textbox)
    userEvent.type(
      textbox,
      'X0jlpvskP1q8E6rHxWRJr7yTvpCuOPEKBGW8gtuVTxfnViTI0s2fBizgMxNzo75Q7w7MxdJXtOLeqDoFUGxxMg==',
    )
    userEvent.click(button)
    expect(errorElem).not.toBeInTheDocument()
  })

  it('should allow multiline private keys with envelope', async () => {
    renderPage(store)
    const textbox = screen.getByPlaceholderText('openWallet.privateKeyForm.enterPrivateKeyHere')
    const button = screen.getByRole('button', { name: 'openWallet.import' })
    userEvent.type(
      textbox,
      `
      -----BEGIN ED25519 PRIVATE KEY-----
      ZqtrV0QtEY/JemfTPbOl9hgk3UxHXfZO42G4sG+XKHThZTM+GvRiqsAgc7magKNN
      4MEkyO0pi7lJeunILQKiZA==
      -----END ED25519 PRIVATE KEY-----`,
    )
    userEvent.click(button)
    const errorElem = screen.queryByText(/Invalid private key/)
    expect(errorElem).not.toBeInTheDocument()
  })
})
