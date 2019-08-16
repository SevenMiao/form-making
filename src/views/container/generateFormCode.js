function getElFormItemCode(item) {
  let re = "";
  switch (item.type) {
    case "input":
      re = `          <el-form-item label=${item.label} class="${item.class}">
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} placeholder="${item.options.placeholder}"/>
    </el-form-item>`;
      break;
    case "textarea":
      re = `          <el-form-item label=${item.label} class="${item.class}">
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} :autosize="{ minRows: ${item.options.minRows} }" placeholder="${item.options.placeholder}" type="textarea"/>
    </el-form-item>`;
      break;
    case "radio":
      re = `          <el-form-item label=${item.label} class="${item.class}">
      <el-radio-group
          v-model="model.${item.model}"
          :disabled="${item.options.disabled}"
         
        >
        <el-radio 
          style="{display: ${item.options.inline ? "inline-block" : "block"}}"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
        >
          {{ itemSub.${item.options.remote ? item.options.remoteProps.label : "label"} }}
        </el-radio>
      </el-radio-group>
    </el-form-item>`;
      break;
    case "checkbox":
      re = `          <el-form-item label=${item.label} class="${item.class}">
      <el-checkbox-group
          v-model="model.${item.model}"
          :disabled="${item.options.disabled}"
         
        >
        <el-checkbox 
          style="{display: ${item.options.inline ? "inline-block" : "block"}}"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
        >
          {{ itemSub.${item.options.remote ? item.options.remoteProps.label : "label"} }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>`;
      break;
    case "select":
      re = `          <el-form-item label=${item.label} class="${item.class}">
      <el-select v-model="model.${item.model}"        >
        <el-option
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.label : "label"}"
          :value="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
        />
      </el-select>
    </el-form-item>`;
      break;
    default: break;
  }
  return re;
};
export default function(data, formConfig) {
  let items = "";
  data.list.forEach((v, index) => {
    items += index === data.list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}" class="${formConfig.class}">
${items}
        </el-form>`
};
