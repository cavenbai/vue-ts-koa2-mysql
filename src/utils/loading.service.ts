
import Loading from '@/components/common/loading.vue'
import Vue from 'vue'

export class LoadingService {
  static show() {
    const Instance = new Vue({
      render(h) {
        return h(Loading, {})
      },
      methods: {
        remove() {
          setTimeout(() => {
            this.destroy();
          }, 300);
        },
        destroy() {
          this.$destroy();
          document.body.removeChild(this.$el);
        }
      }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal: any = Instance.$children[0];

    modal.remove = () => {
      modal.$parent.remove()
    }

    return modal
  }

  remove(modal) {
    modal.visible = false;
    modal.$parent.remove();
  }
}
