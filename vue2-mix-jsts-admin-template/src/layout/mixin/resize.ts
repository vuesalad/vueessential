import { Component, Vue, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { DeviceType } from '@/store';

const WIDTH = 992; // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin',
})
export default class ResizeMixIn extends Vue {
  private isMobile = ResizeMixIn.isMobile();

  private myAppModule = AppModule;

  get device() {
    return this.myAppModule.device;
  }

  get sidebar() {
    return this.myAppModule.sidebar;
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      this.myAppModule.CloseSideBar(false);
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  mounted() {
    if (this.isMobile) {
      this.myAppModule.ToggleDevice(DeviceType.Mobile);
      this.myAppModule.CloseSideBar(true);
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private static isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const { isMobile } = this;
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
      if (isMobile) {
        AppModule.CloseSideBar(true);
      }
    }
  }
}
