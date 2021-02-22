import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// From user module
export interface UserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}

// From app module
export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

export interface RootState {
  app: AppState;
  user: UserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
