<template>
  <div class="my">
    <view>会员信息： {{ memberStore.profile }}</view>
    <button
      @tap="memberStore.setProfile({ nickname: '南国旧少', token: '123456' })"
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button
      @tap="memberStore.clearProfile()"
      size="mini"
      plain
      type="warn"
    >
      清理用户信息
    </button>
    <button
      @tap="getData"
      size="mini"
      plain
      type="warn"
    >
      测试请求
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import {http} from '@/utils/http'

const memberStore = useMemberStore()
console.log('memberStore', memberStore)

// 测试请求
const getData = async () => {
  const res = await http<string[]>({
    method: 'GET',
    url: '/home/banner',
  })
  console.log('请求成功', res.result)
}
</script>

<style scoped></style>
