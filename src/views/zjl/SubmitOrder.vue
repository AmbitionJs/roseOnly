<template>
  <div class="submit-order">
    <div class="submit-order-title">
      <h3>填写核对订单信息</h3>
    </div>
    <!-- 收货人信息 -->
    <section class="submit-order-address">
      <div class="title">收货人信息</div>
      <el-radio-group v-model="radio" class="address-list">
        <el-radio :label="item.addressId" v-for="item in address" :key="item.addressId">
          <div class="address">
            <span class="receiver">{{item.receiver}}</span>
            <span class="address">{{item.province + item.city + item.countryArea + item.detail}}</span>
            <span class="telphone">{{item.cellphone}}</span>
          </div>
          <div class="opreate">
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="left"> -->
            <el-button type="primary" icon="el-icon-edit" @click="editAddress(item.addressId)" circle></el-button>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="left"> -->
            <el-button type="danger" icon="el-icon-delete" @click="delAddress(item.addressId)" circle></el-button>
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
            <span>收货人：{{shipAddress.receiver}}</span>
            <span>收货地址：{{shipAddress.addr}}</span>
            <span>联系电话：{{shipAddress.tel}}</span>
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
    <div class="submit-order-footer">
      <el-button type="info" id="submit-order-btn" @click="submitOrder">提交订单</el-button>
      <div id="total-price">总计：￥{{totalPrice}}</div>
    </div>
  </div>
</template>

<script>
import GoodList from "@/components/zjl/goodLists.vue";
import PCAA from "area-data/pcaa";
import { mapState,mapMutations } from "vuex";
import '@/assets/zjl/js/formatDate.js'

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
        countryArea: "",
        detail: ""
      },
      selected: [],
      shipAddress: {
        receiver: '',
        addr: '',
        tel: ''
      }
    };
  },
  methods: {
    ...mapMutations('orders', [
      'addressDatas'
    ]),
    // 编辑地址按钮
    editAddress(id) {
      this.flag = true;
      this.isWay = 1;
      console.log(id)
      let _addr = this.address.filter(item => {
        if(item.addressId == id) return item
      });
      console.log(_addr[0].addressId, _addr[0].province, )
      this.selected = [];
      this.selected.push(_addr[0].province, _addr[0].city, _addr[0].countryArea);
      this.editAddr = JSON.parse(JSON.stringify(_addr[0]));
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
            // 修改完成重新获取地址
            this.getAddress();
            this.flag = false
            this.clearInput();
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
      const userId = localStorage.getItem("userId"),
        token = localStorage.getItem("token");
      this.axios.get("/users/" + userId + "/addresses/list?userToken=" + token)
        .then(res => {
          console.log(res);
          this.address = res.data.data;
          this.addressDatas(res.data.data)
        
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交订单
    submitOrder() {
      console.log(
        JSON.parse(sessionStorage.getItem('submitOrders')),
        localStorage.getItem("token"),
        JSON.parse(sessionStorage.getItem('submitOrders')).orderDetailId,
        JSON.parse(sessionStorage.getItem('submitOrders')).orderDetailNo,
        this.radio,
        this.message,
        new Date(this.deliveryTime).format('yyyy-MM-dd hh:mm:ss')
      );
     
      this.axios.post("/orders/client/submit", {
          userToken: localStorage.getItem("token"),
          orderDetailNo: JSON.parse(sessionStorage.getItem('submitOrders')).orderDetailNo,
          addressId: this.radio,
          payMethod: "在线支付",
          msgBoard: this.message,
          orderDetailArriveDate: new Date(this.deliveryTime).format('yyyy-MM-dd hh:mm:ss')
      })
        .then(res => {
          sessionStorage.setItem('orderInfo', JSON.stringify({
            orderDetailNo: res.data.data.orderDetailNo,
            orderDetailId: res.data.data.orderDetailId,
            totalPrice: res.data.data.orderDetailTotalPrice
          }))
          sessionStorage.removeItem('submitOrders')
          this.$router.push('/person')
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
    },
    
    
  },
  // 请求数据
  created() {
    // 获取地址
    this.getAddress();
    // 商品清单
    // this.goodList = this.submitOrderList.trolleys;
    this.goodList = JSON.parse(sessionStorage.getItem('submitOrders')).trolleys
    // this.address = this.getAddresses
    console.log(this.address)
    if(this.address == []) return;
    this.address.forEach(item => {
      if(item.aDefault == 1) {
        this.radio = item.addressId
      } else {
        this.radio = this.address[0].addressId
      }
    })
    console.log(this.radio)
  },
  computed: {
    // 获取订单商品数据
    ...mapState("orders", ["submitOrderList", 'getAddresses']),
    // 商品清单总计
    totalPrice() {
      // let totalPrice = 0;
      // if(this.goodList != [])
      // {
      //   this.goodList.forEach(item => {
      //     totalPrice += item.goodsNum * item.goods.goodsPrice;
      //   });
      //   return totalPrice;
      // }
      return JSON.parse(sessionStorage.getItem('submitOrders')).orderDetailTotalPrice
    }
  },
  watch: {
    radio(n, o) {
      let addr, a
      if(this.address.length > 0) {
         a = this.address.filter(item => {
          if (item.addressId == this.radio) {
            return item;
          }
        })
      } 
      console.log(a, n, o)
      if(a != null) {
        addr = a[0]
        console.log(addr)
        this.shipAddress = {
          receiver: addr.receiver,
          addr: addr.province + addr.city + addr.countryArea + addr.detail,
          tel: addr.cellphone
        };
      }
    }
  }
};
</script>

<style>
.submit-order {
  width: 900px;
  margin: 0 auto;
  padding: 50px;
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
.submit-order-footer {
  overflow: hidden;
}
</style>
