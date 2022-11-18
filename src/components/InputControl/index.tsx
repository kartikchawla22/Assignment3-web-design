import React from "react";
import { InputControlType } from "../../utils/types";

import styles from "./index.module.scss";

const InputControl = ({ label, rest, onChange, placeholder }: InputControlType) => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input type="text" onChange={onChange} placeholder={placeholder} {...rest} />
    </div>
  );
}

export default InputControl;
