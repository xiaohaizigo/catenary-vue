 <template>
   <el-dialog v-bind="$attrs" v-on="$listeners"  :visible.sync="formVisible" :modal="false" @open="onOpen"  @close="close" title="添加用户">
     <el-row :gutter="15">
       <el-form ref="添加人员" :model="formData" :rules="rules" size="medium" label-width="100px"
                label-position="left">
         <el-col :span="11">
         </el-col>
         <el-col :span="11">
           <el-form-item label="工号" prop="GongHao">
             <el-input v-model="formData.GongHao" placeholder="请输入工号" :maxlength="15" clearable
                       :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="姓名" prop="XingMing">
             <el-input v-model="formData.XingMing" placeholder="请输入姓名" :maxlength="15" clearable
                       :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="身份证号" prop="ShenFenZH">
             <el-input v-model="formData.ShenFenZH" placeholder="请输入身份证号" :maxlength="16" clearable
                       :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="口令" prop="KouLing">
             <el-input v-model="formData.KouLing" placeholder="请输入口令" clearable show-password
                       :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="手机号" prop="ShouJiHao">
             <el-input v-model="formData.ShouJiHao" placeholder="请输入手机号" :maxlength="11" clearable
                       :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="人员状态" prop="ryzt">
             <el-select v-model="formData.ryzt" placeholder="请选择人员状态" clearable :style="{width: '100%'}">
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
           <el-form-item label="职名" prop="ZhiMing">
             <el-select v-model="formData.ZhiMing" placeholder="请选择职名" clearable :style="{width: '100%'}">
               <el-option v-for="(item, index) in ZhiMingOptions" :key="index" :label="item.label"
                          :value="item.value" :disabled="item.disabled"></el-option>
             </el-select>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="性别" prop="XingBie">
             <el-radio-group v-model="formData.XingBie" size="medium">
               <el-radio v-for="(item, index) in XingBieOptions" :key="index" :label="item.value"
                         :disabled="item.disabled">{{item.label}}</el-radio>
             </el-radio-group>
           </el-form-item>
         </el-col>
         <el-col :span="11">
           <el-form-item label="备注" prop="BeiZhu">
             <el-input v-model="formData.BeiZhu" type="textarea" placeholder="请输入备注"
                       :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
           </el-form-item>
         </el-col>
       </el-form>
     </el-row>
     <div slot="footer">
       <el-button @click="close">取消</el-button>
       <el-button type="primary" @click="handelConfirm">确定</el-button>
     </div>
   </el-dialog>
 </template>
<script>
export default {
  name: 'RenYuanAdd',
  inheritAttrs: false,
  components: {},
  props: ['formVisible'],
  data() {
    return {

      //RenYuanFormVisible: false,
      formData: {
        ry_id: undefined,
        GongHao: undefined,
        XingMing: undefined,
        ZhiMing: undefined,
        KouLing: undefined,
        XingBie: "男",
        ShouJiHao: undefined,
        ShenFenZH: undefined,
        ryzt: undefined,
        bumen:{
          bm_id: undefined,
        },
        BeiZhu: undefined,
      },
      rules: {
        ry_id: [{
          required: true,
          message: '请输入员工编号',
          trigger: 'blur'
        }],
        GongHao: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        XingMing: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        XingBie: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        ShouJiHao: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        ShenFenZH: [{
          required: true,
          message: '请输入身份证号',
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
        BeiZhu: [{
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }],
      },
      ZhiMingOptions: [{
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
      XingBieOptions: [{
        "label": "男",
        "value": "男"
      }, {
        "label": "女",
        "value": "女"
      }],
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
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      this.$emit('goAddPage', false)
    },
    handelConfirm() {
     this.$axios.post("/index/system/renyuan/add"
     ,{
         ry_id: Number(this.formData.ry_id),
         gongHao: this.formData.GongHao,
         xingMing: this.formData.XingMing,
         xingBie: this.formData.XingBie,
         zhiMing: this.formData.ZhiMing,
         shouJiHao: this.formData.ShouJiHao,
         kouLing: this.formData.KouLing,
         shenFenZH: this.formData.ShenFenZH,
         ryzt: this.formData.ryzt,
         beiZhu: this.formData.BeiZhu,
         bumen:{
           bm_id: this.formData.bumen.bm_id
         }
       }).then(resp=>{
       if(resp.data.code===200)
       {
         this.$message({
           message: '用户添加成功',
           type: 'success'
         })
         this.$emit('getRenYuanList');
       }
       else
       {
         this.$message({
           message: '用户添加失败',
           type: 'error'
         })
       }
     }).catch(failResponse=>
     {

     })
    },
  }
}

</script>
<style>
</style>
