<template>
  <div>
    <el-button type="text" size="medium" icon="el-icon-delete" @click="test">测试</el-button>
    <el-button type="text" size="medium" icon="el-icon-delete" @click="setSwaggerJson">预设swaggerJson</el-button>
    <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
    <el-button type="text" size="medium" icon="el-icon-files" @click="handleImportTempalte">获取模板</el-button>
    <el-button type="text" size="medium" icon="el-icon-upload2" @click="handleImport">导入JSON</el-button>
    <el-button
      v-if="system_project.name==='common'"
      type="text"
      size="medium"
      icon="el-icon-view"
      @click="handlePreview"
    >预览</el-button>
    <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleExport">生成JSON</el-button>
    <el-button
      v-if="system_project.name!=='common'"
      type="text"
      size="medium"
      icon="el-icon-document"
      @click="handleGenerateProjectCode"
    >生成项目代码</el-button>
    <el-button
      v-if="system_project.name==='common'"
      type="text"
      size="medium"
      icon="el-icon-document"
      @click="handleGenerateHtmlCode"
    >生成html代码</el-button>
    <my-dialog :title="page.title" :visible.sync="page.visible">
      <template v-if="['生成html代码', '生成项目代码'].includes(page.title)">
        <el-button size="mini" type="primary" @click="handleCopy(page.aceShowContent, true)">复制</el-button>
        <!-- 生成html代码 -->
        <ace v-model="page.aceShowContent"></ace>
        <!-- 生成项目代码 -->
      </template>
      <template v-else-if="page.title === '导入JSON'">
        <!-- 导入JSON -->
        <div style="display: flex;flex-direction: row;">
          <div style="width: 50%;">
            <div style="display: flex;flex-direction: row;">
              <el-button size="mini" @click="handlePasteJson">粘贴</el-button>
              <el-button type="mini" @click="handleFormat">JSON格式化</el-button>
              <el-upload
                ref="upload"
                action
                :show-file-list="false"
                :before-upload="beforeUpLoad"
                style="margin: auto 8px;"
              >
                <el-button size="small" type="primary">选取文件</el-button>
              </el-upload>
              <el-button type="primary" size="mini" @click="handleSelectOk">确 定</el-button>
            </div>
            <el-input v-model="importData" :autosize="{minRows: 3}" type="textarea"></el-input>
          </div>
          <div>
            <p style="position: absolute;top: 50px;">预览</p>
            <vue-json-pretty
              :data="jsonOfImportData"
              :highlightMouseoverNode="true"
              :highlightSelectedNode="true"
              :selectOnClickNode="true"
              selectableType="single"
              v-model="page.jsonData"
            ></vue-json-pretty>
          </div>
        </div>
      </template>
      <template v-else-if="page.title === '导出JSON'">
        <!-- 导出JSON -->
        <el-button size="mini" type="primary" @click="saveAs(data)">下载</el-button>
        <el-button size="mini" type="primary" @click="handleCopy(data)">复制全部</el-button>
        <el-button
          size="mini"
          type="primary"
          :disabled="!page.jsonData"
          @click="handleCopy(page.jsonData.replace('root.', ''))"
        >复制选择节点</el-button>
        {{ page.jsonData }}
        <vue-json-pretty
          :data="data"
          :highlightMouseoverNode="true"
          :highlightSelectedNode="true"
          :selectOnClickNode="true"
          :showDoubleQuotes="false"
          selectableType="single"
          v-model="page.jsonData"
        ></vue-json-pretty>
      </template>
      <template v-else-if="page.title === 'swaggerArray'">
        <div style="display: flex; flex-direction: row;">
          <div style="width: 50%;">
            <el-input
              v-model="swagger"
              :autosize="{minRows: 8}"
              type="textarea"
            ></el-input>
          </div>
          <div>
            <span v-show="system_project.name === 'cofco' && system_project.page === 'list'">提示：请注意将id与deptCode选上</span>
            <vue-json-pretty
              v-model="data.swaggerArray"
              :data="JSON.parse(swagger || '{}')"
              :highlightMouseoverNode="true"
              :deep="1"
              :showSelectController="true"
              selectableType="multiple"
              :pathSelectable="columnsSelectable"
            />
            <!-- <el-button @click="hangdleSwaggerArrayEmpty">清空</el-button> -->
            <el-button type="primary" @click="hangdleSwaggerArray">保存</el-button>
          </div>
        </div>
      </template>
      <!-- 预览 -->
      <template v-else>
        <preview-form :data="data" :form-config="formConfig" />
      </template>
    </my-dialog>
  </div>
</template>
<script>
import { get } from "lodash";
import VueJsonPretty from "vue-json-pretty"
import { mapGetters } from "vuex";

import { MyDialog } from "@/components/index.js";
import PreviewForm from "@/views/container/components/PreviewForm.vue";

import generateHtmlCode from "@/views/container/config/common/generateHtmlCode.js";
import { jsonFormat, getPath } from "@/utils/helper";
import { downFile } from "@/utils/file";

export default {
  name: "FormAction",
  components: {
    MyDialog,
    PreviewForm,
    VueJsonPretty
  },
  props: ["data", "formConfig"],
  data: function() {
    return {
      page: {
        jsonData: "",
        showJsonFormat: false,
        aceShowContent: "",
        title: "",
        visible: false
      },
      swagger: "",
      importData: ""
    }
  },
  computed: {
    ...mapGetters(["system_project"]),
    jsonOfImportData: function() {
      if (!this.importData) {
        return {};
      }
      return JSON.parse(this.importData.replace(/\s/g, ""));
    }
  },
  methods: {
    /**
    * 清空item
    */
    handleEmpty: function() {
      this.data.list = [];
      this.$store.commit("SET_SELECT", {});
    },
    /**
     * 生成html测试代码
     */
    handleGenerateHtmlCode: function() {
      this.page.aceShowContent = generateHtmlCode(this.data, this.formConfig)
      this.page.title = "生成html代码";
      this.page.visible = true;
    },
    /**
     * 生成项目代码
     */
    handleGenerateProjectCode: function() {
      this.page.title = "生成项目代码";
      this.page.visible = true;
      import(`@/views/container/config/${this.system_project.name}/code/getCode.js`)
        .then(myModule => {
          let myFun = this.system_project.page + "Fun";
          myFun = myModule.default[myFun];
          this.page.aceShowContent = myFun(this.data.list, this.formConfig);
        });
    },
    /**
     * 预览
     */
    handlePreview: function() {
      this.page.title = "预览";
      this.page.visible = true;
    },
    /**
     * 导入JSON
     */
    handleImport: function() {
      this.page.title = "导入JSON";
      this.page.visible = true;
    },
    /**
     * 导出JSON
     */
    handleExport: function() {
      this.page.title = "导出JSON";
      this.page.visible = true;
    },
    /**
     * 下载文件
     */
    saveAs: function() {
      downFile(jsonFormat(JSON.stringify(this.data), false), "text/javascript", "hello.js");
    },
    /**
     * 粘贴数据
     */
    handlePasteJson: function() {
      try {
        navigator.clipboard.readText()
          .then(text => {
            this.importData = text;
            this.$message({
              type: "success",
              showClose: "true",
              message: "粘贴成功"
            });
          })
          .catch(err => {
            this.$message({
              type: "error",
              showClose: "true",
              message: "粘贴失败:" + err
            });
          });
      } catch (e) {
        this.$message({
          type: "error",
          showClose: "true",
          message: "粘贴失败,该浏览器不支持，ctrl+v或右键粘贴：" + e
        });
      };
    },
    /**
     * 复制数据
     */
    handleCopy: function(data, isAce = false) {
      let input = "";
      if (isAce) {
        input = document.getElementsByClassName("ace_text-input")[0];
      } else {
        if (Object.prototype.toString.call(data) !== "[object Object]") {
          const arrObject = {
            [data]: get(this.data, data)
          };
          input = document.getElementById("copyInput");
          input.value = jsonFormat(JSON.stringify(arrObject), false);
        } else {
          input = document.getElementById("copyInput");
          input.value = jsonFormat(JSON.stringify(data), false);
        }
      }
      input.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        type: "success",
        showClose: "true",
        message: "复制成功"
      });
      this.page.visible = false
    },
    /**
     * 导入JSON确定
     */
    handleSelectOk: function() {
      if (this.importData) {
        this.data.list = JSON.parse(this.importData).list;
        this.data.swaggerArray = JSON.parse(this.importData).swaggerArray;
        this.page.visible = false;
      }
    },
    /**
     * 获取json模板
     */
    handleImportTempalte: function() {
      import(`./../config/${this.system_project.name}/${this.system_project.page}.js`)
        .then(v => {
          Object.assign(this.data, JSON.parse(JSON.stringify(v.data)))
        })
        .catch(v => {
          this.$alert("获取模板失败，请检查模板是否存在", "提示", { type: "error" });
          console.error("获取模板失败:" + v)
        })
    },
    /**
     * json格式化
     */
    handleFormat() {
      this.importData = jsonFormat(this.importData);
    },
    /**
     * 读取上传数据json
     */
    beforeUpLoad: function(file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        this.importData = JSON.stringify(eval("(" + reader.result + ")"));
      }
      return false;
    },
    test: function() {
      console.log(getPath(this.data.list))
    },
    /**
     * 预设SwaggerJson
     */
    setSwaggerJson: function() {
      this.data.swaggerArray = this.data.swaggerArray.map(v => "root." + v);
      this.page.title = "swaggerArray";
      this.page.visible = true;
    },
    /**
     * 叶子节点才能选中
     */
    columnsSelectable(itemPath, itemData) {
      if (typeof itemData === "object") {
        return false
      } else {
        return true;
      }
    },
    /**
     * 去掉root.
     */
    hangdleSwaggerArray: function() {
      this.data.swaggerArray = this.data.swaggerArray.map(v => v.substr(5));
      this.page.visible = false;
    }
    // /**
    //  * 清空swaggerArray
    //  */
    // hangdleSwaggerArrayEmpty: function() {
    //   this.data.swaggerArray = [];
    // }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus"></style>
