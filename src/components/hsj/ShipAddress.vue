<template>
  <div class="shipAddress">
    <!-- 显示基本信息 -->
    <p v-if="info.length==0">您还没有地址，去添加吧！</p>
    <el-card class="box-card" v-for="item in info" :key="item.addressId">
      <div slot="header" class="clearfix">
        <span>{{ item.receiver }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="item.aDefault=1" @click="setDefaultAddr(item.addressId)">设为常用地址</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="editAddress(item.addressId)"
        >编辑</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="delAddr(item.addressId)"
        >删除</el-button>
      </div>
      <div class="content">
        <span class="name">{{ item.receiver }} 收</span>
        <div class="address">
          <span class="province">{{ item.province }}</span>
          <span class="city">{{ item.city }}</span>
          <span class="area">{{ item.countryArea }}</span>
          <span class="detailAddress">{{ item.detail }}</span>
        </div>
        <span class="tel">{{ item.cellphone }}</span>
        <!-- <div class="delAddr" @click="delAddr(item.addressId)">
          <i class="el-icon-delete"></i>
        </div> -->
      </div>
    </el-card>
    <!-- 显示修改基本信息的模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" required v-if="dialogFormVisible">
      <el-form :model="editAddr">
        <el-form-item label="收货人" :label-width="formLabelWidth" required>
          <el-input v-model="editAddr.receiver" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" required>
          <el-input v-model="editAddr.cellphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth" required>
          <el-input v-model="editAddr.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth" required>
          <area-select :level="2" type="text" v-model="selected" :data="pcaa"></area-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" required>
          <el-input v-model="editAddr.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设为常用地址">
          <el-checkbox-group v-model="isDefault">
            <el-checkbox label="设为常用地址" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="submitAddr">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加新地址 -->
    <div class="addNewAddress">
      <el-row>
        <el-col :span="24">
          <div class="addNewButton">
            <el-button type="text" @click="addAddressBtn">添加新地址</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PCAA from "area-data/pcaa";

export default {
  data() {
    return {
      info: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editAddr: {
        // 编辑绑定的地址
        receiver: "",
        cellphone: "",
        email: "",
        province: "",
        city: "",
        countryArea: "",
        detail: ""
      },
      isWay: 0,
      selected:[],
      pcaa: PCAA,
      isDefault: ''
    };
  },
  methods: {
    // 获取用户所有地址
    getAllAddr() {
      const userId = localStorage.getItem('userId'),
        token = localStorage.getItem('token')
      this.axios.get("/users/" + userId + "/addresses/list?userToken=" + token)
        .then(res => {
          console.log(res);
          // this.addressDatas(res.data.data)
          if(res.data.data && res.data.data != null) {
            this.info = res.data.data
          } else {
            this.info = []
          }
          console.log(this.info)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editAddress(id) {
      console.log(id)
      this.dialogFormVisible = true
      this.isWay = 1;
      let _addr = this.info.filter(item => {
        if(item.addressId == id) return item
      });
      console.log(_addr[0].addressId, _addr[0].province, )
      this.selected = [];
      this.selected.push(_addr[0].province, _addr[0].city, _addr[0].countryArea);
      console.log(this.selected)
      this.editAddr = JSON.parse(JSON.stringify(_addr[0]));
    },
    // 提交地址
    submitAddr() {
      let isEmpty = null;
      for (let key in this.editAddr) {
        if (this.editAddr[key] == "") {
          isEmpty = true;
        } else {
          isEmpty = false;
        }
      }
      if (isEmpty == false && this.selected.length > 0) {
        // 获取用户id 和 身份信息token
        let userId = localStorage.getItem("userId"),
          token = localStorage.getItem("token"),
          way = "";
        // 给提交地址的省市区 重新赋值
        this.editAddr.province = this.selected[0];
        this.editAddr.city = this.selected[1];
        this.editAddr.countryArea = this.selected[2];
        // 判断是哪一种方式提交
        if (this.isWay == 0) {
          // 添加地址提交
          way = "add";
          console.log(userId,"添加地址", way, this.editAddr, this.selected);
        }
        if (this.isWay == 1) {
          // 编辑地址提交
          way = "edit";
          console.log("编辑地址", way, this.editAddr, this.selected);
        }
        // 发起请求，传输数据

        this.axios.post("/users/" + userId + "/addresses/" + way, {
          userId: userId,
          userToken: token,
          ...this.editAddr
        })
          .then(res => {
            console.log("提交成功", res);
            this.clearInput()
            this.dialogFormVisible = false
            // 修改完成重新获取地址
            this.getAllAddr();
          })
          .catch(err => {
            console.log("提交失败", err);
          });
      } else {
        this.errorAlert("请输入完整地址信息");
      }
    },
    addAddressBtn() {
      this.clearInput()
      this.dialogFormVisible = true
      this.isWay = 0;
      console.log(this.selected)
    },
    delAddr(id) {
      console.log(id)
      this.$confirm("确认要删除地址？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const userId = localStorage.getItem("userId"),
            token = localStorage.getItem("token");
          // 发起请求
          this.axios.post("/users/" + userId + "/addresses/delete", {
            userId: userId,
            userToken: token,
            addressId: id
          })
            .then(res => {
              console.log("删除成功", res);
              // 删除成功重新获取地址
              this.getAllAddr();
            })
            .catch(err => {
              console.log("删除失败", err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 清空输入框
    clearInput() {
      this.selected = [];
      const _obj = this.editAddr;
      for (let key in _obj) {
        _obj[key] = "";
      }
    },
    cancelEdit() {
      this.clearInput()
      this.dialogFormVisible = false
      console.log(this.selected)
    },
    errorAlert(msg) {
      this.$alert(msg, "警告", {
        confirmButtonText: "确定",
        center: true,
        type: "error"
      })
        .then(() => {})
        .catch(() => {});
    },
    // 设为常用地址
    setDefaultAddr(id) {
      console.log(id)
      const userId = localStorage.getItem('userId')/* ,
        token = localStorage.getItem('token') */
      this.axios.post('/users/'+ userId +'/addresses/default', {
        userId: userId,
        // userToken: token,
        addressId: id
      }).then(res => {
        console.log(res)
        this.getAllAddr()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getAllAddr()
  }
};
</script>


<style>
.box-card {
  margin-bottom: 20px;
  position: relative;
}
.addNewButton {
    border: 1px dashed #000;
    margin-top: 10px;
}
.addNewButton button {
    width: 100%;
    height: 100%;
    display: block;
}
.area-select-wrap {
  line-height: 25px;
}
.area-select-wrap .area-select:first-child {
  margin-left: 0;
}
.area-select.medium {
  height: 40px;
}
.delAddr {
    height: 109px;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100px;
    text-align: center;
    line-height: 109px;
    cursor: pointer;
}
.delAddr:hover {
  background: rgba(238, 235, 235, 0.644);
}
</style>

