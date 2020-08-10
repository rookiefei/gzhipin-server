const mongoose =  require('mongoose')
const md5 = require('blueimp-md5')  // MD5加密函数
mongoose.connect('mongodb://localhost:27017/gzhipin_test', { useNewUrlParser: true })
const conn = mongoose.connection
conn.on('connected', function () {
  console.log('数据库连接成功')
})
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})

const UserModel = mongoose.model('user', userSchema)

function testSave() {
  const userModel =  new UserModel({username: 'Tome', password: md5('123'), type: 'dashen'})
  userModel.save(function(error, user) {
    console.log('save()', error, user)
  })
}
testSave()

function testFind() {
  UserModel.find(function(error, users) {
    console.log('find()', error, users)
  })
  UserModel.findOne({_id: '5f2e17a2f5f14a2da08fb06a'}, function(error, user) {
    console.log('findOne', error, user)
  })
}

testFind()