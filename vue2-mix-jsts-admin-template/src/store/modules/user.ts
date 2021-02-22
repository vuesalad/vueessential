import {
  VuexModule, Module, Action, Mutation, getModule,
} from 'vuex-module-decorators';
import { login, logout, getUserInfo } from '@/api/users';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import store, { UserState } from '@/store';

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || ''

  public name = ''

  public avatar = ''

  public introduction = ''

  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    console.log('inside Action login');
    let { username } = userInfo;
    const { password } = userInfo;

    username = username.trim();

    const { data } = await login({ username, password });

    console.log('after real Action login');
    setToken(data.accessToken);
    this.SET_TOKEN(data.accessToken);
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN('');
    this.SET_ROLES([]);
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!');
    }
    const { data } = await getUserInfo({ /* Your params here */ });
    if (!data) {
      throw Error('Verification failed, please Login again.');
    }
    const {
      roles, name, avatar, introduction,
    } = data.user;
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!');
    }
    this.SET_ROLES(roles);
    this.SET_NAME(name);
    this.SET_AVATAR(avatar);
    this.SET_INTRODUCTION(introduction);
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!');
    }
    await logout();
    removeToken();
    this.SET_TOKEN('');
    this.SET_ROLES([]);
  }

  @Action
  public ChangeName(name: string) {
    this.SET_NAME(name);
  }
}

export const UserModule = getModule(User);
export default null; // to avoid elint check error
