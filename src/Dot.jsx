export default function Dot(props) {
  const styles = {
    backgroundColor: props.numbers.includes(props.value) ? "black" : props.currentBgColor
  }
  
  return (
    <span className="dot" style={styles}></span>
  )
}