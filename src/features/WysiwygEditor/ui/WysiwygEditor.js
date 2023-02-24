import style from './WysiwygEditor.module.css';

export const WysiwygEditor = ({text, setText}) => {
    return <div>
        <center><h4>Edit text &rarr; Save changes</h4></center>
        <textarea className={style.editor}
            value={text} onChange={e => setText(e.target.value)}/>

    </div>
}