import { useState, Fragment } from 'react'
import { Question, Answer, Heading, Button, Wrapper } from './styles'
import { data } from '../constants'

const App = () => {
  const [select, setSelect] = useState('co-1')
  const [ans, setAns] = useState(null)
  const cos = Object.keys(data).map((ele) => (
    <Button key={ele} onClick={() => setSelect(ele)}>
      {ele}
    </Button>
  ))

  const handleChange = (index) => () => {
    if (ans === index) {
      setAns(null)
      return
    }
    setAns(index)
  }

  // new comment added here wow
  // another new line added here

  const res = data[select].map((ele, index) => (
    <Fragment key={index}>
      <Question onClick={handleChange(index)}>
        {index + 1}) {ele.question}
      </Question>
      {index === ans ? <Answer>{ele.answer}</Answer> : null}
    </Fragment>
  ))
  return (
    <Wrapper>
      <Heading>
        <h1>{select.toUpperCase()}</h1>
        {cos}
      </Heading>
      {res}
    </Wrapper>
  )
}

export default App
