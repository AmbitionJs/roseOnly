<template>
  <el-dialog title="申请退换" :visible.sync="isApply" width="600px">
    <el-form>
      <div>
        <span>订单编号：</span>
        <span>{{orderDetailNo}}</span>
      </div>
      <el-radio-group v-model="radio" style="margin:20px 0;">
        <el-radio :label="0">退货</el-radio>
        <el-radio :label="1">换货</el-radio>
      </el-radio-group>
      <el-form-item label>
        <el-input type="textarea" :rows="2" placeholder="请输入退换原因" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelApply">取 消</el-button>
      <el-button type="primary" @click="confirmApply">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['isApply'],
  data() {
    return {
      orderDetailNo: '',
      textarea: '',
      radio: 0
    };
  },
  created() {
    console.log(this.applyObj)
    if(this.applyObj) {
      this.orderDetailNo = this.applyObj.orderDetailNo
    }
  },
  methods: {
    confirmApply() {
      const token = localStorage.getItem('token')
      console.log(token, this.orderDetailNo, this.radio, this.textarea)
      this.axios.post('/orders/client/' + this.orderDetailNo + '/petition', {
        userToken: token,
        identify: this.radio,
        apply: this.textarea
      })
      .then(res => {
        console.log(res)
        this.$emit('cancelApply')
      })
      .catch(err => {
        console.log(err)
      })
    },
    cancelApply() {
      this.$emit('cancelApply')
    }
  },
  watch: {
    applyObj(n, o) {
      this.orderDetailNo = n.orderDetailNo
    },
    radio(n, o) {
      console.log(n)
    }
  },
  computed: {
    ...mapState('orders', ['applyObj'])
  }
};
</script>

<style>
</style>
