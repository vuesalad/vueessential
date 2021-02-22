<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      name:{{ name }}
    </div>
    <div class="dashboard-text">
      roles:<span
        v-for="role in roles"
        :key="role"
      >{{ role }}</span>
    </div>
     <el-button icon="el-icon-refresh"  @click="changeName">改变名称</el-button>
  </div>
</template>

<script lang="ts">
/***
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';

@Component({
  name: 'Dashboard',
})
export default class extends Vue {
  private myName = UserModule.name;

  private myRoles = UserModule.roles;

  get name() {
    return this.myName;
  }

  get roles() {
    return this.myRoles;
  }
}
 */
</script>

<script>

import { UserModule } from '@/store/modules/user';

export default {
  name: 'Dashboard',

  computed:{
    name: () => {return UserModule.name} ,
    roles: () => {return UserModule.roles}
  },
  methods: {
    changeName() {
      console.log('inside change name of dashboard')
      UserModule.ChangeName('远古神兽')
    },

  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
