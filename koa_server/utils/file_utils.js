// 读取文件的工具方法

// 获取fs
const { error } = require('console');
const fs = require('fs');

module.exports.getFileJsonData = (filePath) => {
    // 根据文件路径，读取文件的内容
    return new Promise((resolve,reject) => {
        fs.readFile(filePath,'utf-8',(error,data) => {
            if(error){
                reject(error);
            }
            else{
                // 不能使用return返回data，因为会返回到fs的readFile方法下
                resolve(data);
            }
        })
    })
}