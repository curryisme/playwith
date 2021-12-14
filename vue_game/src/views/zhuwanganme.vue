<template>
  <div class="detail">
    <cpNav />
    <bjImage>
      <img src="../assets/img/public/3.jpeg" alt />
    </bjImage>

    <div class="container clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-if="userData.userType == 1 || userData.userType == 3"
          label="用户资料"
          name="ModifyUserInfo"
        ></el-tab-pane>
        <el-tab-pane
          v-if="userData.userType == 1"
          label="主玩游戏"
          name="zhuwanganme"
        >
          <el-button type="primary" style="margin: 10px 0" @click="addgame"
            >添加游戏</el-button
          >
          <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="gamesIco" label="游戏">
              <template slot-scope="scope">
                <div>
                  <img
                    style="height: 50px; width: 50px; float: left"
                    :src="scope.row.gamesIco"
                  />
                  <div
                    style="
                      float: left;
                      display: inline-block;
                      margin-top: 15px;
                      margin-left: 20px;
                    "
                  >
                    {{ scope.row.gamesName }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pwprice" label="价格/h" width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          v-if="userData.userType == 1"
          label="我要报单"
          name="addbaodan"
        ></el-tab-pane>
        <el-tab-pane
          v-if="userData.userType == 3"
          label="报单管理"
          name="baodanManage"
          >报单管理
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="添加游戏" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="游戏选择 ：" label-width="100px">
          <el-select
            v-model="form.gamestype"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格/小时：" label-width="100px">
          <el-input
            type="number"
            v-model="form.pwprice"
            style="width: 200px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="contrim">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑陪玩游戏信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="游戏选择 ：" label-width="100px">
          <el-select
            v-model="form2.gamestype"
            placeholder="请选择"
            disabled
            style="width: 300px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格/小时：" label-width="100px">
          <el-input
            type="number"
            v-model="form2.pwprice"
            style="width: 200px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="contrim">确 定</el-button>
      </div>
    </el-dialog>
    <quickBtn />
    <foot />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { mapGetters, mapMutations } from "vuex";
import {
  delPwByid,
  addPwGameType,
  getPWbyUserId,
} from "../common/api/user";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "modifyUserInfo",
  data() {
    return {
      activeName: "zhuwanganme",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      options: [
        {
          value: 1,
          label: "LOL",
        },
        {
          value: 2,
          label: "永劫无间",
        },
        {
          value: 3,
          label: "Valorant DOTA2",
        },
        {
          value: 4,
          label: "apex",
        },
        {
          value: 5,
          label: "cod",
        },
        {
          value: 6,
          label: "csgo",
        },
        {
          value: 7,
          label: "overwatch",
        },
        {
          value: 8,
          label: "pubg",
        },
        {
          value: 9,
          label: "Rainbow6",
        },
        {
          value: 10,
          label: "Steam小游戏",
        },
      ],
      form: {
        gamestype: 1,
        pwprice: 0,
      },
      form2: {
        gamestype: 1,
        pwprice: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["userData", "userInfo"]),
  },
  created() {},
  mounted() {
    this.getpwlist();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    addgame() {
      this.dialogFormVisible = true;
    },
    async contrim() {
      if (this.form.pwprice == 0 || this.form.pwprice < 0) {
        this.$Message.warning("请输入正确的价格");
        return;
      }
      let data = {
        ...this.form,
        pwuserid: this.userData.Id,
      };
      let res = await addPwGameType(data);
      if (res.success) {
        this.getpwlist();
        this.$Message.success("提交成功");
        this.dialogFormVisible = false;
        this.form.pwprice = 0;
        this.form.gamestype = 1;
      } else {
        this.$Message.error(res.data);
      }
    },
    async getpwlist() {
      if (!this.userData) return;
      try {
        let res = await getPWbyUserId({ pwuserid: this.userData.Id });
        if (res.success) {
          this.tableData = res.data;
        }
      } catch (error) {}
    },
    handleDelete(index, row) {
      if (!this.userData) return;
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let res = await delPwByid({ peiwanid: row.peiwanid });
            console.log(res);
            if (res.success) {
              this.$Message.success("删除成功");
              this.getpwlist();
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      console.log(row);
    },
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible2 = true;
      this.form2.pwprice = row.pwprice;
      this.form2.gamestype = row.gamestype;
    },
    handleClick(tab, event) {
      this.$router.push(tab.name);
      console.log(tab, event);
    },
  },
  watch: {
    userIntro(val) {
      this.userIntro = val.slice(0, 50);
    },
  },
};
</script>
<style lang='scss' scoped>
.btn-wrap {
  cursor: pointer;
  position: relative;
  width: 101px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 152, 0, 1);
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid rgba(250, 157, 17, 1);
  .filepath {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 201px;
    height: 38px;
    z-index: 9;
    opacity: 0;
  }
}
.detail {
  position: relative;
  width: 100%;
  // background-attachment: fixed;
  // background-image: url("../assets/img/public/bj.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  .container {
    position: relative;
    width: 1200px;
    min-height: 670px;
    margin: 50px auto 0;
    padding: 87px 80px;
    background-color: #fff;
    z-index: 9;

    .user-base-info {
      position: relative;
      padding-bottom: 40px;
      padding-left: 23px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dbdbdb;
      .head {
        position: relative;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-right: 20px;
        z-index: 0;
      }
      .temp {
        position: absolute;
        top: 0;
        width: 66px;
        height: 66px;
        line-height: 66px;
        border-radius: 50%;
        text-align: center;
        z-index: 9;
        font-size: 30px;
        background-color: rgba(153, 153, 153, 0.5);
        .shak {
          animation: show 1s infinite linear;
        }
        @keyframes show {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }

      .upload-wrap {
        position: relative;
        p {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }
      .text {
        cursor: pointer;
        position: relative;
        z-index: 0;
      }
      .btn-wrap {
        cursor: pointer;
        position: relative;
        width: 101px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: rgba(255, 152, 0, 1);
        border-radius: 6px;
        margin-bottom: 10px;
        border: 1px solid rgba(250, 157, 17, 1);
        .filepath {
          cursor: pointer;
          position: absolute;
          left: 0;
          top: 0;
          width: 101px;
          height: 38px;
          z-index: 9;
          opacity: 0;
        }
      }
    }
    .row {
      margin-bottom: 20px;
      padding-left: 23px;
      .star {
        margin-right: 10px;
      }
      .name {
        width: 74px;
        margin-right: 20px;
        .mr {
          margin-right: 4px;
        }
      }
      .nikename {
        width: 332px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 6px;
        border: 1px solid rgba(216, 216, 216, 1);
        font-size: 14px;
      }
      .textarea {
        width: 332px;
        resize: none;
        padding: 10px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid #d8d8d8;
        font-size: 14px;
      }
    }
    .btn {
      width: 333px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      margin: 140px auto 0;
      background: linear-gradient(
        180deg,
        rgba(240, 182, 52, 1) 0%,
        rgba(254, 146, 1, 1) 100%
      );
      border-radius: 25px;
    }
  }
}
.fl {
  float: left;
}
.lr {
  float: right;
}
</style>