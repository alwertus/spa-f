import React from 'react';
import style from './MultirowTextInput.module.css';

export const MultirowTextInput = ({text, setText}) => {

    return <div className={style.wrapper}>
        <textarea className={style.textarea}
                  autoFocus={true}
                  rows={6}
                  defaultValue={text}
                  onBlur={event => {setText(event.target.value)}}
                  onChange={event => {setText(event.target.value)}}
        />
    </div>
}
