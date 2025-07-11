import './Styles/Button.css';
function Button(props) {
  return <button className="btns" onClick={props.onClick}>{props.label}</button>;
}


export default Button;