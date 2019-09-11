function getElFormItemCode(item) {
  let re = "";
  const require = item.required ? "prop=\"" + item.model + "\"" : "";
  switch (item.type) {
    case "input":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} placeholder="${item.options.placeholder}"/>
      </el-form-item>`;
      break;
    case "textarea":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} :autosize="{ minRows: ${item.options.minRows} }" placeholder="${item.options.placeholder}" type="textarea"/>
    </el-form-item>`;
      break;
    case "radio":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
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
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
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
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
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
    case "date":
      if (item.options.type.indexOf("range") !== -1) {
        const defaultTime = item.options.type === "daterange" ? ":default-time=\"['00:00:00', '23:59:59']\"" : "";
        re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <el-date-picker v-model="model.${item.model}" type="${item.options.type}" ${defaultTime} format="${item.options.format}" value-format="${item.options.format}" start-placeholder="${item.options.startPlaceholder}" end-placeholder="${item.options.endPlaceholder}" />
      </el-form-item>`;
      } else {
        re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <el-date-picker v-model="model.${item.model}" type="${item.options.type}" format="${item.options.format}" value-format="${item.options.format}" placeholder=${item.options.placeholder} />
      </el-form-item>`;
      }
      break;
    case "grid":
      let subItems = "";
      item.columns.forEach((col, index) => {
        let subItem = "";
        // 仅一层栅格布局
        col.list.forEach(v => {
          subItem += `${getElFormItemCode(v)}`;
        });
        subItems += item.generateCode ? `<el-col :span="${col.span ? col.span : 0}">
        ${subItem}
        </el-col>` : subItem;
      });
      re = item.generateCode ? `<el-row
        :gutter="${item.options.gutter}"
        type="flex"
        justify="${item.options.justify}"
        align="${item.options.align}"
      >
      ${subItems}
      </el-row>` : subItems;
      break;
    case "dialog":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-input
        v-model="model.${item.model}"
        placeholder="${item.options.placeholder}"
        :disabled="true"
        class="${item.subClass}"
        />
        <el-button
          type="primary"
          style="margin-left:2px"
          icon="el-icon-more"
          circle
          size="mini"
        />
        <!-- TODO:需要替换成弹窗组件 -->
    </el-form-item>`;
      break;
    case "span_readonly":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <span class="${item.subClass}">{{ model.${item.model} }}</span>
  </el-form-item>
    `;
      break;
    case "placeholder":
      re = `<el-form-item class="${item.class}"/>`;
      break;
    case "form":
      re = getElFormCode(item);
      break;
    case "collapse":
      let items = "";
      item.items.forEach(v => {
        let subItems = `<el-collapse-item title="${v.title}" name="${v.name}">`;
        if (v.top.list.length) {
          subItems += "<template slot='title'>";
          v.top.list.forEach(vv => {
            subItems += getElFormItemCode(vv);
          });
          subItems += "</template>";
        }
        v.list.forEach(vv => {
          subItems += getElFormItemCode(vv);
        });
        subItems += "</el-collapse-item>";
        items += subItems;
      });
      re = `<el-collapse v-model="page.${item.model}" class="${item.options.class}">
      ${items}
      </el-collapse>
      `
      break;
    case "button":
      re = `<el-form-item class="${item.class}">
        <el-button type="${item.options.type}" icon="${item.options.icon}">${item.label}</el-button>
  </el-form-item>`
      break;
    // case "list_table":
    //   re = `<list-table
    //   :table-data="tableData"
    //   :column-options="columnOptions"
    //   :loading="page.loading"
    //   :total="page.total"
    //   :is-first-page="page.isFirstPage"
    //   form-name="${item.formName}"
    //   fixed-label="${item.fixedLabel}"
    //   operate-width="130px"
    // >
    //   <template slot-scope="scope" slot="fixedColumn">
    //     <a class="ctbms-list__id-link">{{ scope.row.${item.fixedProps} }}</a>
    //   </template>
    //   <template slot-scope="scope" slot="operate">
    //   <!-- TODO: -->
    //   </template>
    // </list-table>`
    //   break;
    default: break;
  }
  return re;
};
function getElFormCode(item) {
  let items = "";
  item.list.forEach((v, index) => {
    items += index === item.list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form ref="model" :model="model" :rules="page.rules" label-position="${item.options.labelPosition}" label-width="${item.options.labelWidth}px" size="${item.options.size}" label-suffix="${item.options.labelSuffix}" class="${item.class}">
${items}
        </el-form>`
}
export function getFormCode(list, formConfig) {
  let items = "";
  list.forEach((v, index) => {
    items += index === list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form ref="model" :model="model" :rules="page.rules" label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}" class="${formConfig.class}">
${items}
        </el-form>`
};
export function getListCode(list) {
  let items = "";
  list.forEach((v, index) => {
    items += index === list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return items;
};