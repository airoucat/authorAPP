import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import cookie from 'react-cookies';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { type UserInfo, type AuthState } from '../system/interface/user.interface';

const initialState: UserInfo = {
  _id: '000000000000000000000000',
  username: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      const { token, expiresIn } = action.payload;
      const option = {
        path: '/',
        domain: 'localhost',
        expires: new Date(Number(expiresIn) * 1000),
        httpOnly: false
      };
      cookie.save('token', token, option);
      return {
        ...state
      };
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['token', 'expiresIn']
}; // 确保whitelist与blacklist都设置好了当前reducer的所有state
/**
 * ###? 关于persistConfig的whitelist与blacklist
 * 除非whitelist被注释，否则没有写进whitelist的都不会持久化
 * 如果blacklist被注释，以whitelist情况为准
 * 二者优先级以blacklist为先
 */

export const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
/**
 * ###? ###!
 * 实装'redux-persist'时曾遇到一个问题，就是根据文档与各路教程编写完代码确认好几次均无配置问题，但是页面就是不渲染组件，一片空白，
 * 查看许久发现是导出与导入的问题
 * 在此处导出有两种：
 * 一种为普通导出：export const persistedReducer = ...
 * 一种为默认导出：export default authSlice.reducer;
 *
 * 另一方面我在store.js中的导入为：
 * import persistedReducer from '@/features/auth.slice';
 *
 * 这种写法并不会如预期导出这里的persistedReducer，而是会导出authSlice.reducer并重命名为persistedReducer
 *
 * 幸亏使用的是ts，鼠标移动到import语句的persistedReducer会发现类型是Reducer<AuthState>而非Reducer<AuthState & PersistPartial, AnyAction>
 * 更新:
 * 发现export const store = configureStore({
 *  reducer:...
 * })
 * reducer这里不能直接给没有经过persistReducer()方法转化的reducer，之前就是犯的这个错误，
 * 如果store.js里引入default reducer，可以用combineReducers()方法伙同其它reducer包一层再转换
 * 如果引入的是default reducer，则会忽略掉reducer内部的持久化设置，也不会向storage里写东西，这里正好合用
 * 那么既然这样这里是不是就可以把持久化相关删掉呢，
 * 暂时认为不可，一来作为例子供编写其它reducer时参考甚至直接复制改写，二来保持reducer写法统一
 */
