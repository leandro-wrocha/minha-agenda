export function translate(word: string) {
  switch (word) {
    case "mon": {
      word = "Segunda"
      break;
    }
    case "tue": {
      word = "Terça"
      break;
    }
    case "wed": {
      word = "Quarta"
      break;
    }
    case "thu": {
      word = "Quinta"
      break;
    }
    case "fri": {
      word = "Sexta"
      break;
    }
    case "sat": {
      word = "Sabádo"
      break;
    }
    case "sun": {
      word = "Domingo"
      break;
    }
    default: {
      word = "errorTranslate"
      break;
    }
  }
  
  return word;
}
