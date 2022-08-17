import type { LoginUserInfo, Role } from '../../src/api/user/login';

const adminRole: Role = {
  name: 'admin',
  uuid: 'admin',
  permissions: [
    {
      name: '首页',
      path: 'Dashboard',
      uuid: 'dashboard'
    },
    {
      name: '首页看板',
      path: 'Dashboard_index',
      uuid: 'Dashboard_index'
    },
    {
      name: '网格',
      path: 'Grid',
      uuid: 'Grid'
    },
    {
      name: '网格数据看板',
      path: 'Grid_dashboard',
      uuid: 'Grid_dashboard'
    },
    {
      name: '网格表格',
      path: 'Grid_table',
      uuid: 'Grid_table'
    }
  ]
};

const guestRole: Role = {
  name: 'guest',
  uuid: 'guest',
  permissions: [
    {
      name: '首页看板',
      path: 'Dashboard',
      uuid: 'Dashboard'
    }
  ]
};

const userMockData: LoginUserInfo = {
  uuid: '123',
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  phone: '13800138000',
  name: '张三',
  nick_name: '张三',
  role: [adminRole],
  token: 'token123'
};

export default [
  {
    url: '/api/v1/manage/user/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: userMockData
      };
    }
  }
];
