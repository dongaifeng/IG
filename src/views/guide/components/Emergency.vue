<template>
  <div>
     <!-- 表格 -->
    <ai-table
      :refresh="tableInfo.refresh"
      :init-curpage="tableInfo.initCurpage"
      :data.sync="tableInfo.data"
      :field-list="tableInfo.fieldList"
      :list-type-info="listTypeInfo"
      :handle="tableInfo.handle"
      @handleClick="handleClick"
      @handleEvent="handleEvent"
    >
      <!-- 自定义插槽显示状态 -->
      <template v-slot:col-status="scope">
        <i
          :class="scope.row.status === 1 ? 'el-icon-check' : 'el-icon-close'"
          :style="{color: scope.row.status === 1 ? '#67c23a' : '#f56c6c', fontSize: '20px'}"
        />
      </template>
      <!-- 自定义插槽状态按钮 -->
      <template v-slot:bt-status="scope">
        <el-button
          v-if="scope.data.item.show && (!scope.data.item.ifRender || scope.data.item.ifRender(scope.data.row))"
          v-waves
          size="mini"
          :type="scope.data.row.status - 1 >= 0 ? 'danger' : 'success'"
          :icon="scope.data.item.icon"
          :disabled="scope.data.item.disabled"
          :loading="scope.data.row[scope.data.item.loading]"
          @click="handleClick(scope.data.item.event, scope.data.row)"
        >
          {{ scope.data.row.status - 1 >= 0 ? '停用' : '启用' }}
        </el-button>
      </template>
    </ai-table>
  </div>
</template>

<script>
import aiTable from '@/components/formItem/iTable'
export default {
  components: { aiTable },
  data () {
    return {
      tableInfo: {
        refresh: 1,
        initCurpage: 1,
        data: [],
        fieldList: [
          { label: '账号', value: 'account' },
          { label: '用户名', value: 'name' },
          { label: '所属角色', value: 'role_name', minWidth: 120 },
          { label: '性别', value: 'sex', width: 80, list: 'sexList' },
          { label: '账号类型', value: 'type', width: 100, list: 'accountTypeList' },
          { label: '状态', value: 'status', width: 90, type: 'slot', list: 'statusList' },
          { label: '创建人', value: 'create_user_name' },
          { label: '创建时间', value: 'create_time', minWidth: 180 },
          { label: '更新人', value: 'update_user_name' },
          { label: '更新时间', value: 'update_time', minWidth: 180 }
        ],
        handle: {
          fixed: 'right',
          label: '操作',
          width: '280',
          btList: [
            { label: '启用', type: 'success', icon: 'el-icon-albb-process', event: 'status', loading: 'statusLoading', show: false, slot: true },
            { label: '编辑', type: '', icon: 'el-icon-edit', event: 'update', show: false },
            { label: '删除', type: 'danger', icon: 'el-icon-delete', event: 'delete', show: false }
          ]
        }
      }
    }
  },
  methods: {
    handleClick () {},
    handleEvent () {},
  }
}
</script>