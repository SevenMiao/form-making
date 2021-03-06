// 中粮业务管理平台查询页面制作数据模板
export const data = {
  "list": [{
    "type": "collapse",
    "label": "折叠面板",
    "model": "collapse_key_156714903200085",
    "options": {
      "defaultValue": "0",
      "class": "ctbms-form-wrap__el-form__collapse--title",
      "accordion": true
    },
    "items": [{
      "top": {
        "list": [{
          "type": "form",
          "label": "表单",
          "class": "ctbms-form",
          "options": {
            "labelPosition": "left",
            "size": "small",
            "labelWidth": 80,
            "labelSuffix": ""
          },
          "list": [{
            "type": "input",
            "label": "单行文本",
            "icon": "icon-text",
            "model": "input_key_156714904100075",
            "class": "ctbms-form__el-form-item",
            "required": false,
            "page": {
              "path": ""
            },
            "options": {
              "width": "100%",
              "defaultValue": "",
              "required": false,
              "dataType": "string",
              "placeholder": "请输入内容",
              "disabled": false,
              "operator": "",
              "property": ""
            },
            "id": "156714904100075"
          },
          {
            "type": "button",
            "label": "按钮",
            "icon": "",
            "model": "button_key_156714904800066",
            "class": "ctbms-form__el-form-item",
            "subclass": "ctbms-form__el-button--search",
            "options": {
              "icon": "el-icon-search",
              "type": "primary"
            },
            "id": "156714904800066"
          }],
          "id": "156714903700072",
          "model": "form_key_156714903700072"
        }],
        "tip": "更多查询项"
      },
      "title": "查询选项",
      "list": [{
        "type": "form",
        "label": "表单",
        "class": "ctbms-form",
        "options": {
          "labelPosition": "top",
          "size": "small",
          "labelWidth": "80",
          "labelSuffix": ""
        },
        "list": [{
          "type": "input",
          "label": "单行文本",
          "icon": "icon-text",
          "model": "input_key_156714905700044",
          "class": "ctbms-form__el-form-item",
          "required": false,
          "page": {
            "path": ""
          },
          "options": {
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "placeholder": "请输入内容",
            "disabled": false,
            "operator": "",
            "property": ""
          },
          "id": "156714905700044"
        },
        {
          "type": "select",
          "label": "下拉选择框",
          "icon": "icon-select",
          "model": "select_key_156714906000063",
          "class": "ctbms-form__el-form-item",
          "required": false,
          "options": {
            "defaultValue": "值1",
            "placeholder": "请选择",
            "options": [{
              "label": "选项1",
              "value": "值1"
            },
            {
              "label": "选项2",
              "value": "值2"
            },
            {
              "label": "选项3",
              "value": "值3"
            }],
            "width": "",
            "remote": false,
            "remoteConstant": "",
            "remoteOptions": [{
              "label": "数据库数据1",
              "value": "值1"
            },
            {
              "label": "数据库数据2",
              "value": "值2"
            }],
            "remoteProps": {
              "label": "itemValue",
              "value": "id"
            },
            "disabled": false,
            "property": ""
          },
          "id": "156714906000063"
        }]
      }],
      "name": "1"
    }],
    "id": "156714903200085"
  },
  {
    "type": "list_table",
    "icon": "",
    "label": "表格组件",
    "columnOptions": [],
    "formName": "",
    "fixedLabel": "xx编号",
    "fixedProps": "",
    "operateWidth": "130px",
    "columns": [],
    "options": [],
    "page": {
      "swaggerArray": ""
    },
    "id": "156714907100085",
    "model": "list_table_key_156714907100085"
  }]
};
