<template>
  <el-card :style="{ padding: '0px', maxWidth: width + 'rem' }" class="card">
    <div v-loading="!isReady">
      <img :src="entry.thumbnail" alt="thumbnail loading ..." />
      <div v-if="false" class="image-overlay">
        <div
          class="triangle-right-corner"
          :style="`border-left-width: ${triangleHeight * 1.2}rem; border-top-width: ${triangleHeight}rem;`"
          @click="openLinkInNewTab"
        />
        <el-tooltip class="item" :content="`View ${entry.type}`" placement="left">
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
          <b>{{ entry.type }}</b>
        </p>
        <el-tooltip :content="entry.title" placement="top">
          <p class="title">
            {{ entry.title }}
          </p>
        </el-tooltip>
        <el-button @click.prevent="openLinkInNewTab"> View {{ entry.type }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from "vue";
import { Card, Button, Tooltip, Loading } from "element-ui";

Vue.use(Card)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Loading)

export default {
  name: 'GalleryCard',
  props: {
    entry: {
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
      return this.entry.title && this.entry.thumbnail && this.entry.link
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
      link.href = this.entry.link
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
