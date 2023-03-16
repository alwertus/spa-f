#!/bin/bash
clear

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

# index.js
echo "export * from './ui/$component'" >> "$targetPath/index.js"

# ui directory
printf "import React from 'react';
import style from './%s.module.css';

export const %s = () => {

    return <div className={style.wrapper}>
        %s
    </div>
}
" "$component" "$component" "$component" >> "$targetPath/ui/$component.js"

printf ".wrapper {
    border: 1px solid grey;
}
" >> "$targetPath/ui/$component.module.css"