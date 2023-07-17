import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // update file path to match your actual file structure
import wishlistReducer from "../features/wishlistSlice"; // update file path to match your actual file structure
import wishlisttvReducer from "../features/tvwishlistSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["user"], // add any state fields that you want to exclude from being persisted
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};
const wishlistTvPersistConfig = {
  key: "wishlist_tv",
  storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const wishlistTvPersistedReducer = persistReducer(
  wishlistTvPersistConfig,
  wishlisttvReducer
);
const wishlistPersistedReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

const rootReducer = combineReducers({
  user: userPersistedReducer,
  wishlist: wishlistPersistedReducer,
  wishlist_tv: wishlistTvPersistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/userSlice"; // update file path to match your actual file structure
// import wishlistReducer from "../features/wishlistSlice"; // update file path to match your actual file structure
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userReducer, // update key to match your actual slice name and reducer
//   wishlist: wishlistReducer, // update key to match your actual slice name and reducer
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
