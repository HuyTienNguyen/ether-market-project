import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import React from "react";
import './style.scss';

const RButton = (props: ButtonProps) => {
    const { className, ...restProps } = props;
    const classes = classNames(className, 'button');

    return <Button className={classes} {...restProps} />;
};

export default RButton;