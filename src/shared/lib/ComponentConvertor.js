import React from "react";

export const stringToComponent = innerHtml =>
    !!innerHtml
    ? <div style={{display:"flex"}} dangerouslySetInnerHTML={{__html:innerHtml}} />
    : <div/>