import { defineStore } from 'pinia';
import { dbSet, dbGet } from '@/utils/db';
import cookies from '@/utils/cookies';
import Dayjs from 'dayjs';
import {
  login,
  LoginParams,
  LoginUserInfo,
  Permission
} from '@/api/user/login';

export type User = {
  info: LoginUserInfo;
};

const user = dbGet<LoginUserInfo>({ path: 'user', user: true });

export const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    info: {
      name: user.name,
      avatar: user.avatar,
      nick_name: user.nick_name,
      phone: user.phone,
      role: user.role,
      token: user.token,
      token_expire_time: user.token_expire_time,
      uuid: user.uuid
    }
  }),
  getters: {
    permissions(state) {
      let permissions: Permission[] = [];
      state.info.role?.forEach((item) => {
        permissions = [...permissions, ...item.permissions];
      });
      return permissions;
    }
  },
  actions: {
    /**
     * @description 设置用户信息
     *
     * @param {LoginUserInfo} userInfo
     */
    setUserInfo(userInfo: LoginUserInfo) {
      this.info = userInfo;
      // 持久化
      dbSet({ path: 'user', user: true, value: userInfo });
    },

    /**
     * @description 登录
     *
     * @param {LoginParams} params
     * @returns {Promise<UserInfo>}
     */
    async handleLogin(params: LoginParams) {
      const res = await login(params);
      // set cookies
      cookies.set('token', res.token, {
        expires: Dayjs(res.token_expire_time).toDate()
      });
      cookies.set('uuid', res.uuid);
      // setting user info store
      this.setUserInfo(res);
      return res;
    },
    /**
     * @description 登出
     *
     */
    logout() {
      this.info = {
        name: '',
        avatar: '',
        nick_name: '',
        phone: '',
        role: [],
        token: '',
        token_expire_time: '',
        uuid: ''
      };
      dbSet({ path: 'user', user: true, value: this.info });
    }
  }
});
