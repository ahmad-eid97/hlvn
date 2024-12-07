import React from "react";
import {Button} from "@components/form";
import classNames from "classnames";
import {ButtonProps} from "antd";

type IconButtonProps = ButtonProps;

function IconButton(props: IconButtonProps) {
    return <Button {...props} className={classNames("!min-w-10 w-10 h-10 flex-shrink-0 !p-0 flex items-center justify-center !bg-transparent", props.className)}/>;
}

export default IconButton;
