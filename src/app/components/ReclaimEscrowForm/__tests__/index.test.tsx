import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { Provider } from 'react-redux'
import { configureAppStore } from 'store/configureStore'

import { ReclaimEscrowForm } from '..'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

const renderComponent = (store, address: string, maxAmount: string, shares: string) =>
  render(
    <Provider store={store}>
      <ReclaimEscrowForm address={address} maxAmount={maxAmount} shares={shares} />
    </Provider>,
  )

describe('<ReclaimEscrowForm />', () => {
  let store: ReturnType<typeof configureAppStore>

  beforeEach(() => {
    store = configureAppStore()
    jest.resetAllMocks()
  })

  it('should match snapshot', () => {
    const component = renderComponent(store, 'dummy-address', '1000', '1000')
    expect(component.container.firstChild).toMatchSnapshot()
  })

  it('should error without an open wallet', () => {
    renderComponent(store, 'dummy-address', '1000', '1000')

    userEvent.type(screen.getByTestId('amount-form-field'), '1000')
    userEvent.click(screen.getByRole('button', { name: 'account.reclaimEscrow.reclaim' }))

    expect(screen.getByText('errors.noOpenWallet')).toBeInTheDocument()
  })

  it('should display the number of shares', () => {
    renderComponent(store, 'dummy-address', '1000', '1000')

    expect(screen.queryByTestId('numberOfShares')).toBeNull()
    userEvent.type(screen.getByTestId('amount-form-field'), '500')
    expect(screen.getByTestId('numberOfShares')).toBeInTheDocument()
  })

  it('should submit the transaction', () => {
    const spy = jest.spyOn(store, 'dispatch')
    renderComponent(store, 'dummy-address', '2000', '1000')

    userEvent.type(screen.getByTestId('amount-form-field'), '500')
    userEvent.click(screen.getByRole('button', { name: 'account.reclaimEscrow.reclaim' }))

    expect(spy).toHaveBeenCalledWith({
      payload: {
        amount: 500,
        shares: 250,
        type: 'reclaimEscrow',
        validator: 'dummy-address',
      },
      type: 'transaction/reclaimEscrow',
    })
  })
})
