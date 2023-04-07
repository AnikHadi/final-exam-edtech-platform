import { createSelector } from "reselect";

export const selectAuth = (state) => state.auth?.user;

export const selectMemoizedAuth = createSelector(
  selectAuth,

  (auth) => {
    return auth;
  }
);
