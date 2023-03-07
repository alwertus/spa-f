#!/bin/bash
clear
#srcPath="$PWD/template"


# CHECK PARAM
if [ -n "$1" ]; then
  component=$1
else
  echo "PARAM 'component_name' NOT EXISTS"
  return 1
fi

targetPath="$PWD/$component"

# CHECK TARGET DIR EXISTS
if [ -d "$targetPath" ]; then
  echo "Каталог $targetPath уже существует"
  return 1
fi

# CREATE DIRS
mkdir "$targetPath"
mkdir "$targetPath/ui"
mkdir "$targetPath/api"
mkdir "$targetPath/model"
mkdir "$targetPath/const"

# index.js
echo "export * from './ui/$component'" >> "$targetPath/index.js"

# ui directory
printf "import React from 'react';
import style from './styles.module.css';
import %sLogic from '../model/logic';

export const %s = () => {
    const data = %sLogic();

    return <div className={style.wrapper}>
        %s
    </div>
}
" "$component" "$component" "$component" "$component" >> "$targetPath/ui/$component.js"

printf ".wrapper {
    border: 1px solid grey;
}
" >> "$targetPath/ui/styles.module.css"

# const directory
printf "export const URL = 'CHANGE_ME'" >> "$targetPath/const/attr.js"

# model directory
printf "import {useEffect, useState} from 'react';
import {getData} from '../api/request';

const %sLogic = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData(setData)
    }, [])

    return data
}

export default %sLogic;
" "$component" "$component" >> "$targetPath/model/logic.js"

# api directory
printf "import {URL} from '../const/attr';

export function getData(setDataHandler) {
    sendGetMsg(URL,
        {},
        setDataHandler,
        (e) => {console.log(e)}
    )
}
" >> "$targetPath/api/request.js"