/*eslint-disable*/
import React from 'react'
// import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'

export function renderWithProviders(children) {
    return <Provider store={store}>{children}</Provider>
}