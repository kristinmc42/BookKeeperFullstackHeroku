import React from 'react';

const ConvertDescriptionToHTML:({description}:{description:string}) => JSX.Element = ({description}:{description:string}) => {
    let domParser = new DOMParser();

    const doc: Document = domParser.parseFromString(description, "text/html");
    console.log(doc);

    const newDescription = doc.body.innerText;
    return <p>Description: {newDescription}</p>
  };

export default ConvertDescriptionToHTML;