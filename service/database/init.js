const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
const glob = require('glob')
const { resolve }  = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

mongoose.Promise = global.Promise

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db, {
    useNewUrlParser: true
  })
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {

    // 增加数据库监听事件
    mongoose.connection.on('disconnected', (err) => {
      console.log('*********数据库断开')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请认为修理...')
      }

    })

    mongoose.connection.on('error', (err) => {
      console.log('*********数据库出错')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请认为修理...')
      }
    })
    //打开链接时
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
  })

}
