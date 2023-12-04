import Dot from "./Dot"

export default function Die(props) {
  const currentBgColor = props.isHeld ? "#59E391" : "white"
  const styles = {
    backgroundColor: currentBgColor
  }
  
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <div className="column">
        <Dot value={props.value} numbers={[2, 3, 4, 5, 6]} currentBgColor={currentBgColor} />
        <Dot value={props.value} numbers={[6]} currentBgColor={currentBgColor} />
        <Dot value={props.value} numbers={[4, 5, 6]} currentBgColor={currentBgColor} />
      </div>
      <div className="column">
        <Dot value={props.value} numbers={[1, 3, 5]} currentBgColor={currentBgColor} />
      </div>
      <div className="column">
        <Dot value={props.value} numbers={[4, 5, 6]} currentBgColor={currentBgColor} />
        <Dot value={props.value} numbers={[6]} currentBgColor={currentBgColor} />
        <Dot value={props.value} numbers={[2, 3, 4, 5, 6]} currentBgColor={currentBgColor} />
      </div>
    </div>
  )   
}