import React from "react";

interface answerProps {
  id: string;
  answer: string;
}

// fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array: answerProps[]): answerProps[] {
  const newArray = [...array];
  let currentIndex = newArray.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}


// Não encontrei uma função que devolesse todos as Entities traduzidas.
// Poderia ter feito com a dangerouslySetInnerHtml, mas por ser perigoso não
// sei se vocês aprovariam, então pelo menos listei as mais comuns abaixo.
// No final tem a resolução do dangerously comentado
export function handleSpecialCharacters(param: string): string {
  return param?.replace(/&quot;/g, '"')
  .replace(/&#039;/g, "'")
  .replace(/&rsquo;/g, "’")
  .replace(/&aacute;/i, "á")
  .replace(/&acirc;/i, "<")
  .replace(/&agrave;/i, "â")
  .replace(/&atilde;/i, "ã")
  .replace(/&ccedil;/i, "ç")
  .replace(/&eacute;/i, "é")
  .replace(/&ecirc;/i, "ê")
  .replace(/&iacute;/i, "í")
  .replace(/&oacute;/i, "ó")
  .replace(/&ocirc;/i, "ô")
  .replace(/&otilde;/i, "õ")
  .replace(/&ntilde;/i, "ñ")
  .replace(/&uacute;/i, "ú")
  .replace(/&uuml;/i, "ü")
  .replace(/&uoml;/i, "ö")
  .replace(/&deg;/i, "°")
  .replace(/&amp;/i, "&")
  .replace(/&pi;/i, "π")
}

/* export function handleSpecialCharacters(param: string): React.ReactElement {
  return (
    <span dangerouslySetInnerHTML={{__html: param}} />
  )
} */


