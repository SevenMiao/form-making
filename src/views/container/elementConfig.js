const remoteOptions = [
  {
    label: "数据库数据1",
    value: "值1"
  },
  {
    label: "数据库数据2",
    value: "值2"
  }
];
const remoteProps = {
  label: "itemValue",
  value: "id"
};
export const basicElement = [{
  type: "input",
  label: "单行文本",
  icon: "icon-input",
  model: "",
  options: {
    width: "100%",
    defaultValue: "",
    required: false,
    dataType: "string",
    placeholder: "请输入内容",
    disabled: false
  }
},
{
  type: "textarea",
  label: "多行文本",
  icon: "icon-diy-com-textarea",
  model: "",
  options: {
    width: "100%",
    defaultValue: "",
    required: false,
    disabled: false,
    placeholder: "请输入内容",
    minRows: 3
  }
},
{
  type: "radio",
  label: "单选框组",
  icon: "icon-radio-active",
  model: "",
  options: {
    inline: true,
    defaultValue: "值1",
    options: [
      {
        value: "值1",
        label: "选项1"
      },
      {
        value: "值2",
        label: "选项2"
      },
      {
        value: "值3",
        label: "选项3"
      }
    ],
    required: false,
    width: "",
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    disabled: false
  }
},
{
  type: "checkbox",
  label: "多选框组",
  icon: "icon-check-box",
  model: "",
  options: {
    inline: false,
    defaultValue: "值1",
    options: [
      {
        label: "选项1",
        value: "值1"
      },
      {
        label: "选项2",
        value: "值2"
      },
      {
        label: "选项3",
        value: "值3"
      }
    ],
    required: false,
    width: "",
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    disabled: false
  }
}];
