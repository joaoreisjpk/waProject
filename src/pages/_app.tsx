import { CssBaseline } from "@mui/material"
import { QuestionsProvider } from "../context/useQuestions"

function MyApp({ Component, pageProps }) {
  return (
    <QuestionsProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </QuestionsProvider>
  )
}

export default MyApp
