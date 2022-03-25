import { configureStore } from '@reduxjs/toolkit'
import tickerReducer from './components/calculator/reducers/tickerSelectReducer'

export default configureStore({
  reducer: {
    tickerSelect: tickerReducer
  },
})