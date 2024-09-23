import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref()

    // 保存会员信息
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息
    const clearProfile = () => {
      profile.value = null
    }

    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // 持久化
  {
    // 网页端配置
    // persist: true,
    // 使用uni app 中数据存储方法
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        },
      },
    },
  },
)
