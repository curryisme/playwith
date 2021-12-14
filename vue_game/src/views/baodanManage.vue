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
        </el-tab-pane>
        <el-tab-pane
          v-if="userData.userType == 1"
          label="我要报单"
          name="addbaodan"
        >
          <el-button type="primary" style="margin: 10px 0" @click="addgame"
            >添加报单</el-button
          >
        </el-tab-pane>
        <el-tab-pane
          v-if="userData.userType == 3"
          label="报单管理"
          name="baodanManage"
        >
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label" style="color: #2728a0"
                ><i class="el-icon-date"></i> 未审核</span
              >
              <el-table :data="tableData1" border stripe style="width: 100%">
                <el-table-column prop="pworderxm" sortable label="陪玩项目">
                </el-table-column>
                <el-table-column
                  prop="pworderlaobanUsername"
                  sortable
                  label="老板名称"
                >
                </el-table-column>
                <el-table-column prop="userName" sortable label="陪玩名称">
                </el-table-column>
                <el-table-column prop="pworderprice" sortable label="单价时长">
                  <template slot-scope="scope">
                    <p>单价：{{ scope.row.pworderprice }}￥</p>
                    <p>时长：{{ scope.row.pworderduration }}h</p>
                  </template>
                </el-table-column>
                <el-table-column prop="pwordertime" sortable label="陪玩时间">
                </el-table-column>
                <el-table-column
                  prop="pwordercreatetime"
                  sortable
                  label="报单时间"
                >
                </el-table-column>
                <el-table-column label="操作" width="155px">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handlePass(scope.$index, scope.row)"
                      >通过</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleNoPass(scope.$index, scope.row)"
                      >不通过</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已通过">
              <span slot="label"><i class="el-icon-success"></i> 已通过</span>
              <el-table :data="tableData2" border stripe style="width: 100%">
                <el-table-column prop="pworderxm" sortable label="陪玩项目">
                </el-table-column>
                <el-table-column
                  prop="pworderlaobanUsername"
                  sortable
                  label="老板名称"
                >
                </el-table-column>
                <el-table-column prop="userName" sortable label="陪玩名称">
                </el-table-column>
                <el-table-column prop="pworderprice" sortable label="单价时长">
                  <template slot-scope="scope">
                    <p>单价：{{ scope.row.pworderprice }}￥</p>
                    <p>时长：{{ scope.row.pworderduration }}h</p>
                  </template>
                </el-table-column>
                <el-table-column prop="pwordertime" sortable label="陪玩时间">
                </el-table-column>
                <el-table-column
                  prop="pwordercreatetime"
                  sortable
                  label="报单时间"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未通过">
              <span slot="label" style="color: #b04e4e"
                ><i class="el-icon-error"></i> 未通过</span
              >
              <el-table :data="tableData3" border stripe style="width: 100%">
                <el-table-column prop="pworderxm" sortable label="陪玩项目">
                </el-table-column>
                <el-table-column
                  prop="pworderlaobanUsername"
                  sortable
                  label="老板名称"
                >
                </el-table-column>
                <el-table-column prop="userName" sortable label="陪玩名称">
                </el-table-column>
                <el-table-column prop="pworderprice" sortable label="单价时长">
                  <template slot-scope="scope">
                    <p>单价：{{ scope.row.pworderprice }}￥</p>
                    <p>时长：{{ scope.row.pworderduration }}h</p>
                  </template>
                </el-table-column>
                <el-table-column prop="pwordertime" sortable label="陪玩时间">
                </el-table-column>
                <el-table-column
                  prop="pwordercreatetime"
                  sortable
                  label="报单时间"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="添加报单" width="70%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择老板 ：" label-width="120px">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="form.pworderlaobanUsername"
            :fetch-suggestions="querySearch"
            placeholder="选择下单用户"
            style="width: 100%"
            @select="handleSelect"
          >
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.userName }}</div>
              <span class="addr">用户id：{{ item.Id }}</span>
              <span class="addr" style="margin-left: 10px"
                >邮箱：{{
                  item.userEmail == "" || item.userEmail == null
                    ? "暂无"
                    : item.userEmail
                }}</span
              >
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="项目类型 ：" label-width="120px">
          <el-select
            v-model="form.pworderxm"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="陪玩日期：" label-width="120px">
          <el-date-picker
            v-model="form.pwordertime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="单价/小时：" label-width="120px">
          <el-input
            type="number"
            v-model="form.pworderprice"
            style="width: 100%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="陪玩时长：" label-width="120px">
          <el-input
            type="number"
            v-model="form.pworderduration"
            style="width: 100%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加备注：" label-width="120px">
          <el-input
            type="textarea"
            v-model="form.pwinfo"
            style="width: 100%"
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
  passBaodan,
  getAllBaodan,
  getAllBaoban,
  delPwByid,
  addBaodan,
  getPWbyUserId,
} from "../common/api/user";
import axios from "axios";
import { config } from "../common/config";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "modifyUserInfo",
  data() {
    return {
      activeName: "baodanManage",
      dialogFormVisible: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
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
        pworderlaobanid: "",
        pwordertime: "",
        pworderprice: 0,
        pworderduration: 0,
        pworderxm: "",
        pworderlaobanUsername: "",
        pwinfo: "",
      },
      form2: {
        gamestype: 1,
        pwprice: 0,
      },
      restaurants: [],
      state: "",
    };
  },
  computed: {
    ...mapGetters(["userData", "userInfo"]),
  },
  created() {},
  async mounted() {
    this.restaurants = await this.loadAll();
    this.getpwlist();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    handlePass(index, row) {
      this.$confirm("是否确定通过该条订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            pworderflag: 1,
            pworderid: row.pworderid,
          };
          let res = await passBaodan(data);
          if (res.success) {
            this.$message({
              message: "操作成功",
            });
            this.getpwlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作失败",
          });
        });
    },
    handleNoPass(index, row) {
      this.$confirm("是否确定不通过该条订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            pworderflag: 2,
            pworderid: row.pworderid,
          };
          let res = await passBaodan(data);
          if (res.success) {
            this.$message({
              message: "操作成功",
            });
            this.getpwlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作失败",
          });
        });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      console.log(restaurants, "--", queryString);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.userName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async loadAll() {
      let res = await getAllBaoban();
      console.log(res);
      if (res.success) {
        return res.data;
      }
      return [];
    },
    handleSelect(item) {
      console.log(item);
      this.form.pworderlaobanid = item.Id;
      this.form.pworderlaobanUsername = item.userName;
    },
    handleIconClick(ev) {
      console.log(ev);
      this.form.pworderlaobanid = ev.Id;
    },
    addgame() {
      this.dialogFormVisible = true;
    },
    async contrim() {
      // form: {
      //   pworderlaobanid: "",
      //   pworderprice: 0,
      //   pworderduration: 0,
      //   pworderxm: "",
      //   pworderlaobanUsername: "",
      //   pwinfo: "",
      // },
      if (this.form.pworderlaobanid == "") {
        this.$Message.warning("请选择老板");
        return;
      }
      if (this.form.pworderxm == "") {
        this.$Message.warning("请选择的项目类型");
        return;
      }
      if (this.form.pwordertime == null || this.form.pwordertime == "") {
        this.$Message.warning("请选择日期");
        return;
      }
      if (this.form.pworderprice == 0 || this.form.pworderprice < 0) {
        this.$Message.warning("请输入正确的价格");
        return;
      }
      if (this.form.pworderduration == 0 || this.form.pworderduration < 0) {
        this.$Message.warning("请输入正确的陪玩时长");
        return;
      }

      let data = {
        ...this.form,
        pworderpwid: this.userData.Id,
      };
      console.log(data);
      let res = await addBaodan(data);
      if (res.success) {
        this.getpwlist();
        this.$Message.success("提交成功");
        this.dialogFormVisible = false;
        this.form = {
          pworderlaobanid: "",
          pworderprice: 0,
          pworderduration: 0,
          pworderxm: "",
          pworderlaobanUsername: "",
          pwinfo: "",
        };
      } else {
        this.$Message.error(res.data);
      }
    },
    async getpwlist() {
      if (!this.userData) return;
      try {
        let res = await getAllBaodan({ pwuserid: this.userData.Id });
        if (res.success) {
          console.log(res, "aaaww");
          this.tableData1 = res.data.filter((item) => item.pworderflag === 0);
          this.tableData2 = res.data.filter((item) => item.pworderflag === 1);
          this.tableData3 = res.data.filter((item) => item.pworderflag === 2);
          console.log(this.tableData1, "ssssssssssss");
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
<style lang="stylus" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>