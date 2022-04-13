<template>
  <el-card :style="{ padding: '0px', maxWidth: width + 'rem' }" class="card">
    <div v-loading="!isReady">
      <img :src="data.thumbnail" alt="thumbnail loading ..." />
      <div v-if="false" class="image-overlay">
        <div
          class="triangle-right-corner"
          :style="`border-left-width: ${triangleHeight * 1.2}rem; border-top-width: ${triangleHeight}rem;`"
          @click="openLinkInNewTab"
        />
        <el-tooltip class="item" :content="`View ${data.type}`" placement="left">
          <img
            class="triangle-icon"
            :style="`height: ${triangleHeight * 0.25}rem;top: ${triangleHeight * 0.15}rem;right: ${triangleHeight * 0.15}rem`"
            :src="typeIcon"
            @click="openLinkInNewTab"
          />
        </el-tooltip>
      </div>
      <div v-if="showCardDetails" class="details">
        <p>
          <b>{{ data.type }}</b>
        </p>
        <el-tooltip :content="data.title" placement="top">
          <p class="title">
            {{ data.title }}
          </p>
        </el-tooltip>
        <el-button @click.prevent="openLinkInNewTab"> View {{ data.type }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'GalleryCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 3,
    },
    height: {
      type: Number,
      default: 3,
    },
    showCardDetails: {
      type: Boolean,
    },
  },
  data() {
    return {
      ro: null,
      triangleSize: 4,
    }
  },
  computed: {
    isReady() {
      return this.data.title && this.data.thumbnail && this.data.link
    },
    imageHeight() {
      return this.showCardDetails ? this.height * 0.525 : this.height
    },
    imageWidth() {
      return this.width - 2 * this.marginDetails
    },
    triangleHeight() {
      return this.height * 0.237
    },
    marginDetails() {
      return this.height * 0.076
    },
    typeIcon() {
      return undefined
    },
  },
  methods: {
    openLinkInNewTab() {
      const link = document.createElement('a')
      link.href = this.data.link
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
  },
}
</script>

<style scoped>
.card {
  position: relative;
}
.details {
  text-align: left;
}

.title {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p.bold {
  font-weight: bold;
}

.image-overlay {
  position: absolute;
  top: 0;
  right: 0;
}

.triangle-icon {
  position: absolute;
}

.triangle-right-corner {
  width: 0;
  height: 0;
  border-left: solid transparent;
  border-top: solid #8300bf;
}
</style>
