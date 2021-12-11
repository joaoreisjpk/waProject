import { TransactionsProvider } from "../context/useQuestions"

function MyApp({ Component, pageProps }) {
  return (
    <TransactionsProvider>
      <Component {...pageProps} />
    </TransactionsProvider>
  )
}

export default MyApp
