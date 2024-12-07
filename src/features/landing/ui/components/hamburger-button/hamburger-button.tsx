import React from "react";
import styles from "./hamburger-button.module.scss";
import classNames from "classnames";

type HamburgerButtonProps = {
    open: boolean;
};

function HamburgerButton({ open }: HamburgerButtonProps) {
    return (
        <div className={classNames(styles.hamburgerButton)}>
            <label htmlFor="check">
                <input type="checkbox" id="check" checked={open} />
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

export default HamburgerButton;
