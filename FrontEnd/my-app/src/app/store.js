// import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {persistReducer, persistStore} from "redux-persist"
import createFilter from "redux-persist-transform-filter"
import storage  from "redux-persist/lib/storage"
//slices
import userSlice from "../features/userSlice"
import chatSlice from "../features/chatSlice"

//saveUserOnlyFilter
const saveUserOnlyFilter=createFilter("user",["user"]);  

// Persit config
const persistConfig = {
    key: "user",
    storage,   //sessionStorage and storage(types of storage)
    whitelist:["user"], //to go inside of the user to save only the user objects install redux-persist-transform-filter
    transforms:[saveUserOnlyFilter],
}

const rootReducer = combineReducers({
    user: userSlice,
    chat:chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware({ serializableCheck: false })]; // Return an array of middleware functions
    },
    devTools: true,
  });
  

export const persistor = persistStore(store)


