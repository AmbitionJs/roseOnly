<template>
  <div class="submit-order">
    <div class="submit-order-title">
      <h3>填写核对订单信息</h3>
    </div>
    <!-- 收货人信息 -->
    <section class="submit-order-address">
      <div class="title">收货人信息</div>
      <el-radio-group v-model="radio" class="address-list">
        <el-radio :label="item.aId" v-for="item in address" :key="item.aId">
          <div class="address">
            <span class="receiver">{{item.receiver}}</span>
            <span class="address">{{item.province + item.city + item.countyArea + item.detail}}</span>
            <span class="telphone">{{item.cellphone}}</span>
          </div>
          <div class="opreate">
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="left"> -->
            <el-button type="primary" icon="el-icon-edit" @click="editAddress(item.aId)" circle></el-button>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="left"> -->
            <el-button type="danger" icon="el-icon-delete" @click="delAddress(item.aId)" circle></el-button>
            <!-- </el-tooltip> -->
          </div>
        </el-radio>
      </el-radio-group>
      <el-button @click="addAdddress" class="add-addr el-icon-circle-plus">添加新地址</el-button>
    </section>
    <div class="add-address" v-if="flag">
      <el-form label-position="right" label-width="80px" :model="editAddr" ref="editAddr">
        <!-- 收货人 -->
        <el-form-item label="收 货 人 ">
          <el-input v-model="editAddr.receiver" class="min"></el-input>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" required>
          <el-input v-model="editAddr.cellphone" class="min"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="editAddr.email" class="min"></el-input>
        </el-form-item>
        <!-- 省份 -->
        <el-form-item label="省份" required>
          <area-select :level="2" type="text" v-model="selected" :data="pcaa"></area-select>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item label="地址" required>
          <el-input v-model="editAddr.detail" class="middle"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="submitAddr">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 配送及支付方式 -->
    <section class="submit-order-ways">
      <div class="title">配送及支付方式</div>
      <div class="payWay">
        <span>支付方式：</span>
        <span>在线支付</span>
      </div>
      <div class="sendWay">
        <span>配送方式：</span>
        <span>快递运输</span>
        <span>我们将用最快的速度发货（运输费：￥0.00元）</span>
      </div>
    </section>
    <!-- 商品清单 -->
    <section class="submit-order-goodlist">
      <div class="title">商品清单</div>
      <!-- 生订单表头 -->
      <el-row class="good-list-title">
        <el-col :span="12">
          <div class="grid-content bg-purple delivery-addr">
            <span>收货人：{{getAddr.receiver}}</span>
            <span>收货地址：{{getAddr.addr}}</span>
            <span>联系电话：{{getAddr.tel}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="margin-top:10px;font-size:14px">
            <span>送达日期：</span>
            <el-date-picker v-model="deliveryTime" type="date" placeholder="选择送达时间"></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <!-- 商品清单列表 -->
      <good-list v-for="item in goodList" :key="item.goodsIds" :item="item"/>
    </section>
    <!-- 爱的留言 -->
    <section class="submit-order-message">
      <div class="title">爱的留言</div>
      <el-row class="messages">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <p>
              送礼物前别忘了为收礼人留下你的专属真爱誓言！
              扫码关注，下单后通过语音或文字的形式提交内容，
              收礼人可随时查阅，感受独一无二的专属爱语。
            </p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入200字内容"
              v-model="message"
              maxlength="200"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </section>
    <el-button type="info" id="submit-order-btn" @click="submitOrder">提交订单</el-button>
    <div id="total-price">总计：￥{{totalPrice}}</div>
  </div>
</template>

<script>
import GoodList from "@/components/zjl/goodLists.vue";
import PCAA from "area-data/pcaa";
import { mapState } from "vuex";

export default {
  components: {
    GoodList
  },
  data() {
    return {
      flag: false, // 添加地址框是否显示
      radio: 1, // 默认选中地址
      address: [],
      // editAddr: {}, // 编辑的地址
      isWay: 0, // 0 添加地址add； 1 编辑地址edit
      goodList: [], // 商品清单
      deliveryTime: "", //收货时间
      message: "", // 留言
      pcaa: PCAA, // 省市区数据
      editAddr: {
        // 编辑绑定的地址
        receiver: "",
        cellphone: "",
        email: "",
        province: "",
        city: "",
        countyArea: "",
        detail: ""
      },
      selected: []
    };
  },
  methods: {
    // 编辑地址按钮
    editAddress(id) {
      this.flag = true;
      this.isWay = 1;
      let _addr = this.address[id - 1];
      this.selected = [];
      this.selected.push(_addr.province, _addr.city, _addr.countyArea);
      this.editAddr = JSON.parse(JSON.stringify(_addr));
    },
    // 添加地址按钮
    addAdddress() {
      this.flag = !this.flag;
      this.isWay = 0;
      this.clearInput();
    },
    // 删除地址
    delAddress(id) {
      console.log(id);
      this.$confirm("确认要删除地址？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const userId = sessionStorage.getItem("userId"),
            token = sessionStorage.getItem("token");
          // 发起请求
          this.axios
            .post("/users/{" + userId + "/}addresses/delete", {
              userId: userId,
              userToken: token,
              addressId: id
            })
            .then(res => {
              console.log("删除成功", res);
              // 删除成功重新获取地址
              this.getAddress();
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
        let userId = sessionStorage.getItem("userId"),
          token = sessionStorage.getItem("token"),
          way = "";
        // 给提交地址的省市区 重新赋值
        this.editAddr.province = this.selected[0];
        this.editAddr.city = this.selected[1];
        this.editAddr.countyArea = this.selected[2];
        // 判断是哪一种方式提交
        if (this.isWay == 0) {
          // 添加地址提交
          way = "add";
          console.log("添加地址", way, this.editAddr, this.selected);
        }
        if (this.isWay == 1) {
          // 编辑地址提交
          way = "edit";
          console.log("编辑地址", way, this.editAddr, this.selected);
        }
        // 发起请求，传输数据
        this.axios
          .post("/users/{" + userId + "}/addresses/" + way, {
            userId: userId,
            userToken: token,
            ...this.editAddr
          })
          .then(res => {
            console.log("提交成功", res);
            // 修改完成重新获取地址
            this.getAddress();
          })
          .catch(err => {
            console.log("提交失败", err);
          });
      } else {
        this.errorAlert("请输入完整地址信息");
      }
    },
    // 清空输入框
    clearInput() {
      const _obj = this.editAddr;
      for (let key in _obj) {
        _obj[key] = "";
      }
      this.selected = [];
    },
    // 取消地址编辑按钮
    cancel() {
      this.clearInput();
      this.flag = false;
    },
    // 获取地址数据
    getAddress() {
      const userId = sessionStorage.getItem("userId"),
        token = sessionStorage.getItem("token");
      this.axios
        .get("/users/{" + userId + "}/addresses/list", {
          userId: userId,
          userToken: token
        })
        .then(res => {
          console.log(res);
          this.address = res.data;
        });
    },
    // 提交订单
    submitOrder() {
      console.log(
        sessionStorage.getItem("token"),
        this.submitOrderList.orderDetailId,
        this.submitOrderList.orderDetailNo,
        this.radio,
        this.submitOrderList.trolleyId,
        this.message,
        this.deliveryTime
      );
      this.axios
        .post("/orders/submit", {
          userToken: sessionStorage.getItem("token"),
          orderDetailId: this.submitOrderList.orderDetailId,
          orderDetailNo: this.submitOrderList.orderDetailNo,
          addressId: this.radio,
          trolleyId: this.submitOrderList.trolleyId,
          payMethod: "在线支付",
          msgBoard: this.message,
          orderDetailArriveDate: this.deliveryTime
        })
        .then(res => {
          this.clearInput();
          this.flag = false;
          console.log("提交成功", res);
        })
        .catch(err => {
          console.log("提交失败", err);
        });
    },
    errorAlert(msg) {
      this.$alert(msg, "警告", {
        confirmButtonText: "确定",
        center: true,
        type: "error"
      })
        .then(() => {})
        .catch(() => {});
    }
  },
  // 请求数据
  created() {
    // 获取地址
    this.getAddress();
    // 商品清单
    this.goodList = this.submitOrderList;
  },
  computed: {
    // 获取订单商品数据
    ...mapState("orders", ["submitOrderList"]),
    // 获取选中地址
    getAddr() {
      if (this.address.length == 0) return {};
      let a = this.address.filter(item => {
          if (item.aId == this.radio) {
            return item;
          }
        }),
        addr = a[0];
      return {
        receiver: addr.receiver,
        addr: addr.province + addr.city + addr.countyArea + addr.detail,
        tel: addr.cellphone
      };
    },
    // 商品清单总计
    totalPrice() {
      let totalPrice = 0;
      this.goodList.forEach(item => {
        totalPrice += item.goodsNum * item.goodsPrice;
      });
      return totalPrice;
    }
  }
};
</script>

<style>
.submit-order {
  width: 900px;
  margin: 0 auto;
}
.submit-order-title {
  text-align: center;
}
.title {
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.el-radio-group {
  padding: 10px 0;
  display: block;
}
label.el-radio {
  display: block;
  margin-right: 0;
  line-height: 40px;
}
.address,
.opreate {
  display: inline-block;
}
.opreate {
  float: right;
}

.el-button.is-circle {
  padding: 5px;
}

.sendWay,
.payWay {
  font-size: 13px;
  margin-top: 10px;
}
.sendWay span:last-child {
  font-size: 11px;
  margin-left: 50px;
}
.submit-order-ways {
  padding-bottom: 50px;
}
.submit-order-goodlist {
  padding-bottom: 50px;
}
.good-list-title {
  background: rgb(242, 246, 252);
  padding: 20px;
  text-align: center;
}
.delivery-addr {
  text-align: left;
  font-size: 14px;
}
.delivery-addr span {
  display: block;
}
.submit-order-message {
  border-bottom: 1px solid #eee;
}
.messages {
  padding: 20px;
  height: 200px;
}
.messages p {
  width: 400px;
  font-size: 14px;
}
#submit-order-btn {
  margin-top: 10px;
  float: right;
  margin-bottom: 30px;
}
#total-price {
  float: right;
  margin-right: 30px;
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
}

/* 编辑地址 */
.area-select-wrap {
  line-height: 25px;
}
.area-select-wrap .area-select:first-child {
  margin-left: 0;
}
.area-select.medium {
  height: 40px;
}
.min {
  width: 300px;
}
.middle {
  width: 515px;
}
.add-addr {
  width: 100%;
  height: 40px;
  font-size: 17px;
  margin-bottom: 50px;
}
.el-textarea__inner {
  height: 150px !important;
  resize: none;
}
</style>
