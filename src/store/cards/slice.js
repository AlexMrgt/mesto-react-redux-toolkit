import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const sliceName = 'cards';

const loadCards = createAsyncThunk(
  `${sliceName}/loadCards`,
  async (_, { extra: { mestoApi } }) => {
    return await mestoApi.getCardList();
  }
);

const sendCard = createAsyncThunk(
  `${sliceName}/sendCard`,
  async (data, { extra: { mestoApi } }) => {
    return await mestoApi.addCard(data);
  }
);

const deleteCard = createAsyncThunk(
  `${sliceName}/deleteCard`,
  async (id, { extra: { mestoApi } }) => {
    await mestoApi.deleteCard(id);
    return id;
  }
)

const changeLikeCardStatus = createAsyncThunk(
  `${sliceName}/changeLikeCardStatus`,
  async ({ id, isLiked }, { extra: { mestoApi } }) => {
    const updatedCard = await mestoApi.changeLikeStatus(id, isLiked);
    return { id, updatedCard };
  }
)

const initialState = {
  cards: [],

  initialCardsLoading: false,
  loadingError: '',

  sendingCard: false,
  sendingCardError: '',

  deletingCard: false,
  deldeteCardError: '',

  changeingLikeStatus: false,
  changeingLikeStatusError: '',
}

const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {


  },
  extraReducers: {
    [loadCards.pending]: (state) => {
      state.initialCardsLoading = true
    },
    [loadCards.fulfilled]: (state, action) => {
      state.initialCardsLoading = false;
      state.cards = action.payload.data.reverse();
    },
    [loadCards.rejected]: (state) => {
      state.initialCardsLoading = false
    },

    [sendCard.pending]: (state) => {
      state.sendingCard = true;
      state.sendingCardError = '';
    },
    [sendCard.fulfilled]: (state, action) => {
      state.sendingCard = false;
      state.cards.unshift(action.payload.data)
    },
    [sendCard.rejected]: (state, action) => {
      state.sendingCard = false;
      state.sendingCardError = action.error;
    },

    [deleteCard.pending]: (state) => {
      state.deletingCard = true;
      state.deldeteCardError = '';
    },
    [deleteCard.fulfilled]: (state, action) => {
      state.deletingCard = false;
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    [deleteCard.rejected]: (state, action) => {
      state.deletingCard = false;
      state.deldeteCardError = action.error;
    },

    [changeLikeCardStatus.pending]: (state) => {
      state.changeingLikeStatus = true;
      state.changeingLikeStatusError = '';
    },
    [changeLikeCardStatus.fulfilled]: (state, action) => {
      state.changeingLikeStatus = false;
      state.cards = state.cards.map((c) =>
        c._id === action.payload.id
          ? action.payload.updatedCard.data
          : c
      );
    },
    [changeLikeCardStatus.rejected]: (state, action) => {
      state.changeingLikeStatus = false;
      state.changeingLikeStatusError = action.error;
    },
  }
})

const { reducer } = cardSlice;

export default reducer;

export {
  sliceName,

  loadCards,
  sendCard,
  deleteCard,
  changeLikeCardStatus,
}
