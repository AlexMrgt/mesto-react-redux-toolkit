import { sliceName } from "./slice";

const getCards = (store) => store[sliceName].cards;

const getIsInitialCardsLoading = (store)=> store[sliceName].initialCardsLoading;
const getIsCardSending = (store) => store[sliceName].sendingCard;

export{
  getCards,

  getIsInitialCardsLoading,
  getIsCardSending,
}
