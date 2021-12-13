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
  .replace(/&aacute;/, "á")
  .replace(/&acirc;/, "<")
  .replace(/&agrave;/, "â")
  .replace(/&atilde;/, "ã")
  .replace(/&ccedil;/, "ç")
  .replace(/&eacute;/, "é")
  .replace(/&ecirc;/, "ê")
  .replace(/&iacute;/, "í")
  .replace(/&iacute;/, "ó")
  .replace(/&ocirc;/, "ô")
  .replace(/&otilde;/, "õ")
  .replace(/&uacute;/, "ú")
  .replace(/&uuml;/, "ü")
  .replace(/&deg;/, "°")
  .replace(/&amp;/, "&")
}

/* export function handleSpecialCharacters(param: string): React.ReactElement {
  return (
    <span dangerouslySetInnerHTML={{__html: param}} />
  )
} */


