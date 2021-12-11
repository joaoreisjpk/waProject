interface answerProps {
  id: string;
  answer: string;
}

export function shuffle(array: answerProps[]): answerProps[] {
  const newArray = [...array];
  let currentIndex = newArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}
