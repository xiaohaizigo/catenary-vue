<template>
  <el-card >
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input
          placeholder="请输入员工工号"
          clearable
          v-model="queryInfo.query"
          @clear="getRenYuanList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleCurrentChange(1)"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="goAddPage(true)" icon="el-icon-plus" style="margin-left: 950px">添加人员</el-button>
      </el-col>
    </el-row>
  <el-table
    :data="RenYuanList.slice((this.queryInfo.pagenum-1)*this.queryInfo.pagesize,this.queryInfo.pagenum*this.queryInfo.pagesize)"
    style="width: 100%">
    <el-table-column
      label="人员编号"
      prop="ry_id">
    </el-table-column>
    <el-table-column
      label="工号"
      prop="gongHao">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="xingMing">
    </el-table-column>
    <el-table-column
      label="职位"
      prop="zhiMing">
    </el-table-column>
    <el-table-column
      label="性别"
      prop="xingBie">
    </el-table-column>
      <el-table-column
        label="部门编号"
        prop="bumen.bm_id"
      v-if="false">
    </el-table-column>
    <el-table-column
      label="手机号码"
      prop="shouJiHao">
    </el-table-column>
    <el-table-column
      label="口令"
      prop="kouLing">
    </el-table-column>
    <el-table-column
      label="身份证号码"
      prop="shenFenZH">
    </el-table-column>
    <el-table-column
      label="人员状态"
      prop="ryzt">
    </el-table-column>
    <el-table-column
      label="部门"
      prop="bumen.bmmc">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="beiZhu">
    </el-table-column>
    <el-table-column label="操作"
      align="center" width="150px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" style="float: left;">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" style="float: right">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=this.queryInfo.pagenum
      :page-sizes="[2, 5, 10, 15]"
      :page-size=this.queryInfo.pagesize
      layout="total, sizes, prev, pager, next, jumper"
      :total=this.total>
    </el-pagination>
    <ren-yuan-add @goAddPage="goAddPage" @getRenYuanList="getRenYuanList" :form-visible="RenYuanFormVisible" ></ren-yuan-add>
    <update-ren-yuan @getRenYuanList="getRenYuanList" @goUpdatePage="goUpdatePage" :add-form-visible="addFormVisible" :row-data="rowData"></update-ren-yuan>
  </el-card>
</template>

<script>
import RenYuanAdd from './conmon/RenYuanAdd'
import UpdateRenYuan from './conmon/updateRenYuan'
export default {
  name: 'RenYuan',
  components: {UpdateRenYuan, RenYuanAdd},
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      RenYuanList: [],
      total: 0,
      RenYuanFormVisible: false,
      addFormVisible: false,
      rowData: {}
    }
  },
  created () {
    this.getRenYuanList();
  },
  methods: {
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.queryInfo.pagesize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pagesize
    },
    goUpdatePage(vi)
    {
      this.addFormVisible=vi;
    },
    goAddPage(vi)
    {
      this.RenYuanFormVisible=vi;
      //this.$alert(vi)
    },
      handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getRenYuanList();
    },
    handleEdit(index, row) {
         this.rowData=row;
         this.goUpdatePage(true);
    },
    handleDelete(index, row) {
      var message=`此操作将删除工号是${row.gongHao}的员工，是否继续？`
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       var url=`/index/system/renyuan/remove/?GongHao=${row.gongHao}`
        this.$axios.get(url).then(resp=>{
          if(resp.data.code===200)
          {
            this.getRenYuanList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          else
          {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    getRenYuanList(){  //添加当前页参数
      this.$axios.post("/index/system/renyuan/getAll",
        {
          query: this.queryInfo.query,
          pagenum: this.queryInfo.pagenum,
          pagesize: this.queryInfo.pagesize
        }
     ).then(resp=>{
          if(resp.data.code===200)
          {
              this.RenYuanList=resp.data.result
              this.total=resp.data.total;
              console.log(this.total)
          }
      })
      .catch()
    },
  }
}
</script>

<style scoped>

</style>
l
