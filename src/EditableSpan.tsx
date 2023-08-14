import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editHandler = () => {
        setEdit(!edit)
        if(edit){
            updateTitle()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTitle = () => {
        props.callBack(newTitle)
    }
    return (
        edit
            ? <input value={newTitle} autoFocus onBlur={editHandler} onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

