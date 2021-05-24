/**
 *
 * CreateWalletPage
 *
 */
import { MnemonicGrid } from 'app/components/MnemonicGrid'
import { MnemonicValidation } from 'app/components/MnemonicValidation'
import { Box, Button, CheckBox, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import { Refresh } from 'grommet-icons/icons'
import * as React from 'react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useWalletSlice } from '../../state/wallet'
import { useCreateWalletSlice } from './slice'
import { selectCheckbox, selectMnemonic } from './slice/selectors'

export interface CreateWalletProps {}

export function CreateWalletPage(props: CreateWalletProps) {
  const { t } = useTranslation()
  const [showConfirmation, setConfirmation] = useState(false)
  const size = React.useContext(ResponsiveContext)
  const createWalletActions = useCreateWalletSlice().actions
  const walletActions = useWalletSlice().actions

  const dispatch = useDispatch()

  const mnemonic = useSelector(selectMnemonic)
  const checked = useSelector(selectCheckbox)

  const setChecked = (value: boolean) => dispatch(createWalletActions.setChecked(value))
  const regenerateMnemonic = () => dispatch(createWalletActions.generateMnemonic())
  const openWallet = () => {
    setConfirmation(false)
    dispatch(walletActions.openWalletFromMnemonic(mnemonic.join(' ')))
  }

  // Generate a mnemonic on first mount
  React.useEffect(() => {
    dispatch(createWalletActions.generateMnemonic())

    // Clean-up when leaving this page
    return () => {
      dispatch(createWalletActions.clear())
    }
  }, [createWalletActions, dispatch])

  return (
    <>
      {showConfirmation && (
        <MnemonicValidation
          validMnemonic={mnemonic}
          successHandler={openWallet}
          abortHandler={() => setConfirmation(false)}
        />
      )}
      <Grid gap="small" pad="small" columns={size === 'small' ? ['auto'] : ['2fr', '2fr']}>
        <Box background="background-front">
          <MnemonicGrid mnemonic={mnemonic} />
          <Box margin="xsmall" pad="small" background="background-contrast" style={{ wordSpacing: '14px' }}>
            <strong data-testid="generated-mnemonic">{mnemonic.join(' ')}</strong>
            <Box direction="row" justify="end" margin={{ top: 'medium' }}>
              <Button
                icon={<Refresh />}
                label={t('createWallet.newMnemonic', 'Generate a new mnemonic')}
                style={{ borderRadius: '4px' }}
                primary
                onClick={regenerateMnemonic}
              />
            </Box>
          </Box>
        </Box>
        <Box
          pad={{ left: 'small', vertical: 'small', right: 'small' }}
          background="background-front"
          round="5px"
        >
          <Heading margin="0" level="2">
            {t('createWallet.thisIsYourPhrase', 'This is your mnemonic')}
          </Heading>
          <Box width="100%" justify="evenly" margin={{ vertical: 'small' }}>
            <Text margin="0">
              <Trans i18nKey="createWallet.instruction" t={t}>
                Save your keyphrase <strong>in the right order</strong> in a secure location, you will need it
                to open your wallet.
              </Trans>
            </Text>
          </Box>
          <Box
            pad="xsmall"
            border={{
              color: 'status-warning',
              side: 'left',
              size: '3px',
            }}
            background={{
              color: 'status-warning',
              opacity: 0.2,
            }}
          >
            <Text weight="bold">
              {t(
                'createWallet.doNotShare',
                'Never share your keyphrase, anyone with your keyphrase can access your wallet and your tokens.',
              )}
            </Text>
          </Box>
          <Box pad={{ vertical: 'medium' }}>
            <CheckBox
              label={t('createWallet.confirmSaved', 'I saved my keyphrase')}
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
            />
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button
                type="submit"
                label={t('openWallet.mnemonic.open', 'Open my wallet')}
                style={{ borderRadius: '4px' }}
                primary
                disabled={!checked}
                onClick={() => {
                  setConfirmation(true)
                }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  )
}
