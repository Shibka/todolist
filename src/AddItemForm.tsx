import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

type PropsType = {
    callBack: (title: string)=> void


}
export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callBack(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const titleMaxLenght = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLenght
    const isAddBtnDisabled: boolean = !title.length || title.length > titleMaxLenght
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'darkred'}}>Title is too long</div>
        : null
    const userMessage = error
        ? <div style={{color: 'darkred'}}>Title is required!</div>
        : null
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()
    }

    const buttonStyles = {
            maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
        }

    return (
        <div>
                <TextField
                    size='small'
                    id="outlined-basic"
                    label="Outlined"
                    variant='outlined'
                    placeholder='Please, enter title'
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                    error={error}
                />
                <Button
                    style={buttonStyles}
                    size='small'
                    variant='contained'
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}
                >+
                </Button>
                {titleMaxLengthWarning || userMessage}
        </div>
    );
};
