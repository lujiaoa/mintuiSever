const express = require("express");
const cors = require("cors");
const server = express();
const qs = require('qs')
// 引入连接池
const pool = require('./pool');
const { query } = require("express");

server.use( cors({
  origin:['http://127.0.0.1:8080',"http://localhost:8080" ]
}) )
server.listen(3000, () => {
  console.log("3000端口已起用");
});

server.get('/category',(req,res)=>{
  // res.send("成功显示")
  let sql  = 'SELECT id,category_name FROM xzqa_category';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({message:'查询成功',code:1,result})
  })
})

// /lists路由接口
server.get('/lists',(req,res)=>{
  // 结束客户端传递的URL参数
  // console.log(req.query)
  let cid = req.query.cid;    //文章分类ID
  let page = req.query.page;  // 页码
  let pagesize = 15;    //存储每页现实的记录数
  let offset = (page-1) * pagesize;
  let sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT '+ offset +"," +pagesize;
  pool.query(sql,[cid],(err,results)=>{
    if (err) throw err;
    res.send({message:"查询成功",code:"1",results}) 
  })
})