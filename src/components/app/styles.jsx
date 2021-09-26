import styled from "styled-components"

export const Answer = styled.div`
  margin: 0px 15px;
`

export const Wrapper = styled.div`
  margin: 120px 0px;
`

export const Button = styled.div`
  margin: 5px;
  padding: 5px;
  display: inline-block;
  background: skyblue;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`

export const Question = styled(Answer)`
  color: red;
  margin-bottom: 5px;
  margin-top: 35px;
  font-weight: bold;
  font-style: italic;
  cursor: pointer;
`

export const Heading = styled.div`
  text-align: center;
`

export const StyledTable = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid black;
    padding: 5px;
  }
`
