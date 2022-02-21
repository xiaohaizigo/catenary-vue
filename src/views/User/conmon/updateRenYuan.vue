<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="addFormVisible" :modal="false" @open="onOpen" @close="close" title="修改用户信息">
    <el-row :gutter="15">
      <el-form ref="修改人员信息" :model="formData" :rules="rules" size="medium" label-width="100px"
               label-position="top">

        <el-col :span="11">
          <el-form-item label="工号" prop="gongHao">
            <el-input v-model="formData.gongHao" placeholder="请输入工号" :maxlength="15" :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="姓名" prop="xingMing">
            <el-input v-model="formData.xingMing" placeholder="请输入姓名" :maxlength="15" :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号" prop="shenFenZH">
            <el-input v-model="formData.shenFenZH" placeholder="请输入身份证号" :maxlength="16"
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="口令" prop="kouLing">
            <el-input v-model="formData.kouLing" placeholder="请输入口令" show-password :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号" prop="shouJiHao">
            <el-input v-model="formData.shouJiHao" placeholder="请输入手机号" :maxlength="11"
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人员状态" prop="ryzt">
            <el-select v-model="formData.ryzt" placeholder="请选择人员状态" :style="{width: '100%'}">
              <el-option v-for="(item, index) in ryztOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="部门" prop="bm_id">
            <el-select v-model="formData.bumen.bm_id" placeholder="请选择部门" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in bm_idOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="职名" prop="zhiMing">
            <el-select v-model="formData.zhiMing" placeholder="请选择职名" :style="{width: '100%'}">
              <el-option v-for="(item, index) in zhiMingOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="性别" prop="xingBie">
            <el-radio-group v-model="formData.xingBie" size="medium">
              <el-radio v-for="(item, index) in xingBieOptions" :key="index" :label="item.value"
                        :disabled="item.disabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="备注" prop="beiZhu">
            <el-input v-model="formData.beiZhu" type="textarea" placeholder="请输入备注" show-word-limit
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" style="left: -420px;position: relative">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'updateRenYuan',
  inheritAttrs: false,
  components: {},
  props: {
    addFormVisible:{
      type: Boolean,
      required: true
    },
    rowData:{
      type:Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        ry_id: undefined,
        gongHao: undefined,
        xingMing: undefined,
        shenFenZH: undefined,
        kouLing: undefined,
        shouJiHao: undefined,
        ryzt: undefined,
        bumen:{
        bm_id: undefined
        },
        zhiMing: undefined,
        xingBie: "男",
        beiZhu: undefined,
      },
      rules: {
        ry_id: [{
          required: false,
          message: '请输入员工编号',
          trigger: 'blur'
        }],
        gongHao: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        xingMing: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        shenFenZH: [{
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        }],
        kouLing: [{
          required: true,
          message: '请输入口令',
          trigger: 'blur'
        }],
        shouJiHao: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        ryzt: [{
          required: true,
          message: '请选择人员状态',
          trigger: 'change'
        }],
        bm_id: [{
          required: false,
          message: '请选择部门',
          trigger: 'change'
        }],
        zhiMing: [{
          required: true,
          message: '请选择职名',
          trigger: 'change'
        }],
        xingBie: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        beiZhu: [{
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }],
      },
      ryztOptions: [{
        "label": "在岗",
        "value": "在岗"
      }, {
        "label": "非在岗",
        "value": "非在岗"
      }, {
        "label": "不在册",
        "value": "不在册"
      }],
      bm_idOptions: [{
        "label": "技术科",
        "value": "001"
      }, {
        "label": "工区",
        "value": "002"
      }, {
        "label": "车间",
        "value": "003"
      }],
      zhiMingOptions: [{
        "label": "技术员",
        "value": "技术员"
      }, {
        "label": "检查员",
        "value": "检查员"
      }, {
        "label": "车间主任",
        "value": "车间主任"
      }, {
        "label": "车间员工",
        "value": "车间员工"
      }, {
        "label": "工区员工",
        "value": "工区员工"
      }, {
        "label": "工区主任",
        "value": "工区主任"
      }],
      xingBieOptions: [{
        "label": "男",
        "value": "男"
      }, {
        "label": "女",
        "value": "女"
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
        this.formData.ry_id=this.$props.rowData.ry_id,
        this.formData.gongHao= this.$props.rowData.gongHao,
        this.formData.xingMing= this.$props.rowData.xingMing,
        this.formData.shenFenZH= this.$props.rowData.shenFenZH,
        this.formData.kouLing= this.$props.rowData.kouLing,
        this.formData.shouJiHao=this.$props.rowData.shouJiHao,
        this.formData.ryzt=this.$props.rowData.ryzt,
        this.formData.bumen.bm_id=this.$props.rowData.bumen.bm_id,
        this.formData.zhiMing=this.$props.rowData.zhiMing,
        this.formData.xingBie=this.$props.rowData.xingBie,
        this.formData.beiZhu=this.$props.rowData.beiZhu

    },
    onClose() {
      this.$refs['修改人员信息'].resetFields()
    },
    close() {
     // this.$alert(this.$props.rowData);
      this.$emit('goUpdatePage', false)
    },
    handelConfirm() {
      this.$axios.post("/index/system/renyuan/modify",this.formData).then(resp=>{
        this.$confirm('此操作将修改该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(resp.data.code===200)
          {
            this.$message({
              message:'用户信息修改成功',
              type:'success'
            });
            this.close();
            this.$emit('getRenYuanList')
          }
          else
          {
            this.$message({
              message:'用户信息修改失败',
              type: 'error'
            })
          }
        }).catch(failResponse=>{

        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });

    },
  }
}

</script>
<style>
</style>
