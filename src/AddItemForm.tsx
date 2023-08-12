import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()


    return (
        <div>
                <input
                    placeholder='Please, enter title'
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                    className={error || isTitleLengthTooLong ? 'input-error' : undefined}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
        </div>
    );
};
