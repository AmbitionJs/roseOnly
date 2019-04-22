<template>
  <div class="add-address">
    <el-form label-position="right" label-width="80px" :model="editAddr" ref="editAddr">
      <!-- 收货人 -->
      <el-form-item
        label="收 货 人 "
        prop="receiver"
        :rules="[
          { required: true, message: '请输入收货人', trigger: 'blur' }
        ]"
      >
        <el-input v-model="editAddress.receiver" class="min"></el-input>
      </el-form-item>
      <!-- 手机号码 -->
      <el-form-item label="手机号码" required>
        <el-input v-model="editAddress.cellphone" class="min"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]"
      >
        <el-input v-model="editAddress.email" class="min"></el-input>
      </el-form-item>
      <!-- 省份 -->
      <el-form-item label="省份" required>
        <area-select :level="2" type="text" v-model="select" :data="pcaa"></area-select>
      </el-form-item>
      <!-- 详细地址 -->
      <el-form-item label="地址" required>
        <el-input v-model="editAddress.detail" class="middle"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="submitAddr">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PCAA from "area-data/pcaa";

export default {
  props: ["editAddr", "selected", "isWay"],
  data() {
    return {
      pcaa: PCAA,
      select: [],
      editAddress: {}
    };
  },
  methods: {
    cancel() {
      this.$emit("hide");
    },
    submitAddr() {
      
    }
  },
  mounted() {

  },
  updated() {
    
  }
};
</script>

<style>
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
</style>
