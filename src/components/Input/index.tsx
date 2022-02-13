import React from 'react'
import {makeStyles} from "@mui/styles";
import classNames from "classnames";

type IProps = {
    className?: string,
    color: IColor,
    label: string,
    value: string,
    handleChange: () => void,
    helperText?: string,
    helperAction?: () => void,
}

export enum IColor {
    yellow = "yellow",
    purple = "purple",
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",

    },
    label: {
        fontSize: '12px',
        margin: '4px 0',
    },
    helper: {
        fontSize: '12px',
        margin: '4px 0',
        cursor: "pointer",
        textAlign: "right",
    },
    textYellow: {
        color: '#FEE440',
    },
    textPurple: {
        color: '#9B5DE5',
    },
    input: {
        border: "none",
        borderRadius: '13px',
        height: '40px',
        width: '250px',
        padding: '0 10px',
        outline: "none",
    },
    yellow: {
        backgroundColor: '#FFF198',
        color: '#9B5DE5',
    },
    purple: {
        backgroundColor: '#BC95EC',
        color: '#FEE440',
    }

});

const Input: React.FC<IProps> = ({className, color, label, value, handleChange, helperText, helperAction}:IProps) => {
    const classes = useStyles()
    return (
        <div className={classNames(classes.root)}>
            <label className={classNames(classes.label, color === 'yellow' ? classes.textPurple : classes.textYellow)}>{label}</label>
            <input className={classNames(classes.input, classes[color])} value={value} />
            { helperText && (<label className={classNames(classes.helper, color === 'yellow' ? classes.textPurple : classes.textYellow)} onClick={helperAction}>{helperText}</label>)}
        </div>
    )
}

export default Input
