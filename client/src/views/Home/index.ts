import { Component, Vue } from "vue-property-decorator";
import Navigation from "../../components/Navigation/index.vue";
import { State } from "vuex-class";
import { IStateUser } from "@/store/users/state";

@Component({
  components: {
    Navigation,
  },
})
export default class Home extends Vue {
  @State((state: IStateUser) => state.users.loading) loading!: boolean;
}
