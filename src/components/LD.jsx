const LD = ({ options, type }) => {
  const Comp = type || "ul"
  return (
    <Comp>
      {options.map((ele, index) => (
        <li key={index}>{ele}</li>
      ))}
    </Comp>
  )
}

export default LD
