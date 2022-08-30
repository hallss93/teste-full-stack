import moment from "moment";
import ResponseAPI from "@/interfaces/Response";
import { IPaginationUsers } from "@/interfaces/Response";
import { Nullable } from "@/interfaces/types";
import { IStateUser, IUser } from "@/store/users/state";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
@Component({
  filters: {
    formatDate(value: string): string {
      return value ? moment(String(value)).format("MM/DD/YYYY hh:mm") : value;
    },
  },
})
export default class Users extends Vue {
  @Action("users/GET_USERS")
  getUsers!: () => ResponseAPI<IPaginationUsers<IUser[]>>;

  @State((state: IStateUser) => state.users.userList)
  userList!: IUser[];

  @State((state: IStateUser) => state.users.count)
  count!: number;

  @Action("users/DELETE")
  deleteOne!: ({ id }: { id: string }) => ResponseAPI<IUser>;

  @Watch("userList")
  watchuserList(): void {
    this.requering = false;
    this.list = this.userList;
  }

  @Watch("search")
  watchSearch(): void {
    this.getList();
  }

  @Watch("count")
  watchCount(value: number): void {
    this.pagination.itemsLength = value;
  }

  list: IUser[] = [];
  dialogDeleteShow = false;
  user: Nullable<IUser> = null;
  search = "";
  size = 5;
  page = 1;
  pagination = {
    itemsLength: this.count,
    page: this.page,
    itemsPerPage: this.size,
  };
  headers = [
    {
      text: "Id",
      align: "center",
      sortable: false,
      value: "id",
    },

    {
      text: "Nome",
      align: "center",
      sortable: false,
      value: "name",
    },

    {
      text: "Telefone",
      align: "center",
      sortable: false,
      value: "phone",
    },

    {
      text: "CPF",
      align: "center",
      sortable: false,
      value: "cpf",
    },

    {
      text: "Ações",
      align: "center",
      sortable: false,
      value: "actions",
    },
  ];
  requering = false;
  dialog = false;
  itemEdit: Nullable<IUser> = null;

  getList(): void {
    this.getUsers();
  }

  openEditMode(item: IUser): void {
    this.$router.push(`user/${item.id}`);
  }

  openDeleteMode(item: IUser): void {
    this.user = item;
    this.dialogDeleteShow = true;
  }

  async deleteUser(): Promise<void> {
    try {
      const { status } = await this.deleteOne({
        id: String(this.user?.id),
      });

      if (status === 200) {
        this.dialogDeleteShow = false;
        this.getList();
      }
    } catch (e) {
      this.dialogDeleteShow = false;
    }
  }

  watchPagination(value: {
    itemsLength: number;
    itemsPerPage: number;
    page: number;
    pageCount: number;
    pageStart: number;
    pageStop: number;
  }): void {
    console.log(value);
    this.page = value.page;
    this.size = value.itemsPerPage;
    this.getList();
  }

  created(): void {
    const query = this.$route.query;
    if (query && query.page) {
      this.page = Number(query.page);
      this.pagination = {
        itemsLength: this.count,
        page: this.page,
        itemsPerPage: this.size * this.page,
      };
    } else {
      this.getList();
    }
  }
}
