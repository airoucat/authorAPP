import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authDefaultReducer, { persistedReducer } from '@/features/auth.slice'; // 两种reducer根据需求要用哪个
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistRootReducer = combineReducers({
  auth: persistedReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
  whitelist: []
}; // 此处blacklist与whitelist暂时空置，如若省略，会把字reducer的state都持久化到root下
/**
 * ###?
 *  此处会将字reducer的名字作为key，所以把名字例如'auth'拉进黑名单后root下就不会有对应子reducer的state了，
 * 但是子reducer自己会写_persist为key的信息，这个虽说不用自己关注全自动化处理，但为了节省空间考虑选择导入default reducer
 * 但为了方便管理，如若后面有完全不需要的也顺便拉黑名单吧
 */

export const persistedRootReducer = persistReducer(persistConfig, persistRootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
