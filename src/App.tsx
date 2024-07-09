import "./App.css"
// import { SlideScreen } from "./screens/slides"
// import { list } from "./mocks/slides.mock"
import { FormScreen } from "./screens/form"

function App() {
  return (
    <div>
      {/* <SlideScreen list={list} /> */}
      <FormScreen onSubmit={console.log} />
    </div>
  )
}

export default App
