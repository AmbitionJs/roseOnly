<template>
  <div class="add-address">
    <el-form label-position="right" label-width="80px" :model="address">
      <el-form-item label="收 货 人 ">
        <el-input v-model="address.receiver"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="address.telphone"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select v-model="province" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="city" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="countyArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="address.detail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['flag'],
  data() {
    return {
      address: {
        receiver: "",
        telphone: "",
        detail: ""
      },
      value: "",
      province: "",
      city: "",
      countyArea: "",
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    };
  },
  methods: {
    cancel() {
      this.$emit('flag')
    }
  }
};
</script>

<style>
</style>
