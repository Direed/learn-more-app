import React from 'react';
import {makeStyles} from "@mui/styles";
import classNames from "classnames";

type IProps = {
    className?: string,
    color: IColor,
    type?: string,
    text: string,
    handleClick: () => void,
}

export enum IColor {
    yellow = "yellow",
    purple = "purple",
}

export enum IType {
    yellow = "yellow",
    purple = "purple",
}

const useStyles = makeStyles({
    root: {
        width: '140px',
        height: '35px',
        borderRadius: '39px',
        cursor: 'pointer',
        verticalAlign: "middle",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: '18px',
        fontFamily: 'Roboto',
        fontStyle: "normal",
        textTransform: "capitalize",
    },
    yellow: {
        backgroundColor: '#FEE440',
        color: '#9B5DE5',
    },
    purple: {
        backgroundColor: '#9B5DE5',
        color: '#FEE440',
    }
});

const Button: React.FC<IProps> = ({className, color, type, text, handleClick}: IProps) => {
    const classes = useStyles();
    return (
        <div className={classNames(classes.root, classes[color], className && className)} onClick={handleClick}>
            {text}
        </div>
    )
}

export default Button;
