<template>
    <div
      :class="{'item-container': !item.elItem || !item.elItem.exist, 'item-active': system_select && item && system_select.id === item.id && (!item.elItem || !item.elItem.exist)}"
      style="margin-bottom:2px;"
      @click.stop="handleSelectItem(item)"
      >
    <div v-if="system_select && item && system_select.id === item.id && (!item.elItem || !item.elItem.exist)" :class="{'item-view-drag': true}">
      <i class="iconfont icon-drag item-drag"></i>
    </div>
    <div class="item-view">
      <template v-if="item.type === 'input'">
        <el-input
          v-model="item.self.defaultValue"
          :placeholder="item.self.placeholder"
          :disabled="item.self.disabled"
        />
      </template>
      <template v-else-if="item.type === 'textarea'">
        <el-input
          v-model="item.self.defaultValue"
          :placeholder="item.self.placeholder"
          :disabled="item.self.disabled"
          :autosize="{ minRows: item.self.minRows }"
          type="textarea"
        />
      </template>
      <template v-if="item.type == 'radio'">
        <el-radio-group
          v-model="showModel"
          :disabled="item.self.disabled"
        >
          <el-radio
            :style="{display: item.self.inline ? 'inline-block' : 'block'}"
            :label="itemSub.value"
            v-for="(itemSub, index) in (item.self.remote ? item.self.remoteOptions : item.self.options)"
            :key="index"
          >
            <template v-if="item.self.remote">{{itemSub.label}}</template>
            <template v-else>{{ itemSub.label }}</template>
          </el-radio>
        </el-radio-group>
      </template>

      <template v-if="item.type == 'checkbox'">
        <el-checkbox-group
          v-model="showModel"
          :disabled="item.self.disabled"
        >
          <el-checkbox
            :style="{display: item.self.inline ? 'inline-block' : 'block'}"
            :label="itemSub.value"
            v-for="(itemSub, index) in (item.self.remote ? item.self.remoteOptions : item.self.options)"
            :key="index"
          >
            <template v-if="item.self.remote">{{itemSub.label}}</template>
            <template v-else>{{ itemSub.label }}</template>
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-if="item.type == 'select'">
        <el-select v-model="showModel" :placeholder="item.self.placeholder">
          <el-option
            v-for="(itemSub, index) in (item.self.remote ? item.self.remoteOptions : item.self.options)"
            :key="index"
            :label="itemSub.label"
            :value="itemSub.value"
          />
        </el-select>
      </template>
      <template v-if="item.type === 'date'">
        <el-date-picker
          v-model="showModel"
          :type="item.self.type"
          :format="item.self.format"
          :value-format="item.self.format"
          :placeholder="item.self.placeholder"
        />
      </template>
      <template v-if="item.type === 'dialog'">
        <el-input
          v-model="item.self.defaultValue"
          :placeholder="item.self.placeholder"
          :disabled="true"
          :class="item.self.class"
          style="width: calc(100% - 35px)"
        />
        <el-button type="primary" style="margin-left:2px" icon="el-icon-more" circle size="mini" />
      </template>
      <template v-if="item.type === 'span_readonly'">
        <span :class="item.elItem.class">{{ item.self.defaultValue }}</span>
      </template>
      <template v-if="item.type === 'button'">
        <el-button :type="item.self.type" :icon="item.self.icon">{{ item.self.label }}</el-button>
      </template>
      <template v-if="item.type === 'kpmg_file'">
        <el-button type="primary">点击上传</el-button>
      </template>
      <template v-if="item.type === 'upload'">
        <el-upload
          :action="item.self.action"
          :multiple="item.multiple"
          :file-list="fileList"
          >
          <el-button size="small" type="primary">{{ item.self.slot.btnTitle }}</el-button>
          <div slot="tip" class="el-upload__tip">{{ item.self.slot.tip }}</div>
        </el-upload>
      </template>
      <template v-if="item.type === 'link'">
        <el-link :type="item.self.elType" :disabled="item.self.disabled" :underline="item.self.underline" :icon="item.self.icon">{{ item.self.label }}</el-link>
      </template>
      <template v-if="item.type === 'input_number'">
        <el-input-number v-model="showModel" :disabled="item.self.disabled" :placeholder="item.self.placeholder" :size="item.self.size"></el-input-number>
      </template>
      <template v-if="item.type === 'switch'">
        <el-switch
          v-model="showModel"
          :disabled="item.self.disabled"
          :width="Number(item.self.width)"
          :active-text="item.self['active-text']"
          :inactive-text="item.self['inactive-text']"
          :active-color="item.self['active-color']"
          :inactive-color="item.self['inactive-color']">
        </el-switch>
      </template>
      <template v-if="item.type === 'tag'">
        <el-tag
          :key="index"
          v-for="(sub, index) in item.self.options"
          :closable="item.self.closable"
          :type="item.self.elType"
          :size="item.self.size"
          :effect="item.self.effect"
          >
          {{ sub }}
        </el-tag>
        <template v-if="item.self.canAddNew">
          <el-button class="button-new-tag" size="small">{{ item.self.canAddNewTitle }}</el-button>
        </template>
      </template>
      <template v-if="item.type === 'divider'">
        <el-divider :direction="item.self.direction" :content-position="item.self['content-position']">{{ item.self.label }}</el-divider>
      </template>
    </div>
    <div v-if="system_select && item && system_select.id === item.id" class="item-view-action">
      <i class="iconfont icon-clone" title="复制" @click.stop="handleClone"></i>
      <i class="iconfont icon-delete" title="删除" @click.stop="handleDelete"></i>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { handleClone, handleDelete, handleSelectItem } from "./helper";
export default {
  name: "FormViewItem",
  props: ["data", "item", "index"],
  data: function() {
    return {
      showModel: "",
      fileList: []
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["system_select"])
  },
  methods: {
    handleSelectItem: function(item) {
      handleSelectItem(item || this.data[this.index]);
    },
    handleDelete: function() {
      handleDelete(this.data, this.index);
    },
    handleClone: function() {
      handleClone(this.data, this.index);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/style/selectedItem/item.styl';
</style>
