import { useEffect, useState } from "react";
import styles from "../styles/modal.module.scss"

export default function Modal({ children }) {


  return (

    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>

  );
};
