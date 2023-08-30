import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

type PropsType = {
    callBack: (title: string) => void


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
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const titleMaxLenght = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLenght
    const isAddBtnDisabled: boolean = !title.length || title.length > titleMaxLenght
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div>Title is too long</div>
        : null
    const userMessage = error
        ? <div>Title is required!</div>
        : null
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()
    }
    const newError = () => {
        if (titleMaxLengthWarning) {
            return <div style={{color: 'darkred'}}>Title is too long</div>
        } else if (userMessage) {
            return <div>Title is required!</div>
        } else if (title.length > 0) {
        }
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
                label={newError()}
                placeholder='Please, enter title'
                value={title}
                onChange={setTitleHandler}
                onKeyDown={addTaskOnKeyPressHandler}
                error={!!newError()}

            />
            <Button
                style={buttonStyles}
                size='small'
                variant='contained'
                disabled={isAddBtnDisabled}
                onClick={addTaskHandler}
            >+
            </Button>
            {/*{titleMaxLengthWarning || userMessage}*/}
        </div>
    );
};
