<template>
  <div class="submit-order">
    <div class="submit-order-title">
      <h3>填写核对订单信息</h3>
    </div>
    <SubmitOrderAddress />
  </div>
</template>

<script>
import SubmitOrderAddress from '@/components/zjl/SubmitOrderAddress.vue'
export default {
  components: {
    SubmitOrderAddress
  }
}
</script>

<style>
.submit-order {
  width: 40%;
  margin: 0 auto;
}
.submit-order-title {
  text-align: center;
}
</style>
