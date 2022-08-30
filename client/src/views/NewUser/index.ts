import moment from "moment";
import ResponseAPI from "@/interfaces/Response";
import { Nullable } from "@/interfaces/types";
import { IUser, IStateUser } from "@/store/users/state";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import IValidationRules from "@/interfaces/IValidation";
import IValidable from "@/interfaces/IValidable";
import { isValidCPF } from "../../utils/isValidCPF";

@Component({
  filters: {
    formatDate(value: string): string {
      return value ? moment(String(value)).format("MM/DD/YYYY hh:mm") : value;
    },
    formatName(value: string): string {
      return value;
    },
  },
})
export default class Users extends Vue {
  name = "";
  email = "";
  phone = "";
  id: Nullable<string> = "";
  cpf = "";
  rules: IValidationRules<string> = {
    name: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `Name is required.`;
      },
    ],
    email: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `E-mail is required.`;
      },

      (v: Nullable<string>): boolean | string => {
        return /.+@.+/.test(v || "") || `E-mail is invalid.`;
      },
    ],
    phone: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `Phone is required.`;
      },
    ],
    cpf: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `CPF is required.`;
      },
      (v: Nullable<string>): boolean | string => {
        return isValidCPF(v || "") || `CPF is invalid.`;
      },
    ],
  };

  @Action("users/CREATE")
  create!: ({ user }: { user: IUser }) => ResponseAPI<IUser>;

  @Action("users/UPDATE")
  update!: ({
    user,
    id,
  }: {
    user: IUser;
    id: Nullable<string>;
  }) => ResponseAPI<IUser>;

  @Action("users/GET_USER")
  getUser!: ({ id }: { id: string }) => ResponseAPI<IUser>;

  @State((state: IStateUser) => state.users.user)
  user!: IUser;

  @Watch("user")
  watchUser(user: IUser): void {
    this.name = user.name;
    this.email = user.email;
    this.phone = String(user.phone || "");
    this.cpf = user.cpf;
  }

  async save(): Promise<void> {
    const valid = await (this.$refs.form as IValidable).validate();
    if (valid) {
      if (this.id && this.id !== "") {
        await this.update({
          id: this.id,
          user: {
            name: this.name,
            email: this.email,
            phone: this.phone,
            id: String(this.id),
            cpf: this.cpf,
          },
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } else {
        const { status } = await this.create({
          user: {
            name: this.name,
            email: this.email,
            phone: this.phone,
            cpf: this.cpf,
          },
        });
        if (status === 200) {
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      }
    }
  }

  created(): void {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getUser({ id: this.id });
    }
  }
}
