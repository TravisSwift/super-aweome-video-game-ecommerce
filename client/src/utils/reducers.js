import { useReducer } from "react";
import {
  UPDATE_GAMES,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_PLATFORMS,
  UPDATE_CURRENT_PLATFORM,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GAMES:
      return {
        ...state,
        games: [...action.games],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.game],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.games],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(game => {
          if (action._id === game._id) {
            game.purchaseQuantity = action.purchaseQuantity
          }
          return game
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(game => {
        return game._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_PLATFORMS:
      return {
        ...state,
        platforms: [...action.platforms],
      };

    case UPDATE_CURRENT_PLATFORM:
      return {
        ...state,
        currentPlatform: action.currentPlatform
      }

    default:
      return state;
  }
};

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState)
}