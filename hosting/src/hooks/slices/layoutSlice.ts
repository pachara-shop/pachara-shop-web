import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface header {
  title?: string;
  subTitle?: string;
}

interface LayoutState {
  header: header;
}

const initialState: LayoutState = {
  header: {
    title: '',
    subTitle: '',
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<header>) => {
      state.header = action.payload;
    },
  },
});

export const { setHeader } = layoutSlice.actions;

export default layoutSlice.reducer;
