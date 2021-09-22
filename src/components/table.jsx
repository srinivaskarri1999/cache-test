import { StyledTable } from "./app/styles"

const Table = ({ headers, data }) => {
  const renderHead = headers.map((ele, index) => <th key={index}>{ele}</th>)
  const renderBody = data.map((row, i) => (
    <tr key={i}>
      {row.map((col, j) => (
        <td key={`${i}-${j}`}>{col}</td>
      ))}
    </tr>
  ))
  return (
    <StyledTable>
      <thead>
        <tr>{renderHead}</tr>
      </thead>
      <tbody>{renderBody}</tbody>
    </StyledTable>
  )
}

export default Table
