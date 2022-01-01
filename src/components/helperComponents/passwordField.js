import React, {useState} from "react";
import InputField from "./inputField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

const PasswordField = ({
  label,
  ...rest
                       }) => {
  const [isVisible, setIsVisible] = useState(false);

  const eyeIcon = () => (
    <IconButton
      aria-label="Toggle password visibility"
      onClick={() => {
        setIsVisible(!isVisible);
      }}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
    >
      {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  );


  return (
    <InputField
      required
      fullWidth
      label={label || 'Password'}
      autoComplete="off"
      type={isVisible ? "text" : "password"}
      endAdornment={eyeIcon()}
      {...rest}
    />
  );
}

export default PasswordField;