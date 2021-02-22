
let prefixUser = "/users"

module.exports = [
  
    // user logout
    {
      url: prefixUser + '/login',
      type: 'post',
      response: _ => {
        return {
          code: 20000,
          data: {"accessToken":"admin-token"}
        }
      }
    },
    {
        url: prefixUser +'/info',
        type: 'post',
        response: _ => {
          return {
            code: 20000,
            data: {
              user: {             
                 avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                 email: "admin@test.com",
                 id: 0,
                 introduction: "I am a super administrator",
                 name: "上古神兽",
                 phone: "1234567890",
                 roles: ["admin"],
                 username: "admin",
                 permission: [ '*','usermgt', 'orgadmin'],
              }

            },
            
          }
        }
    }
  ] 


  /***
   * {"code":20000,"data":{"user":{"id":0,"username":"admin","password":"any","name":"Super Admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","introduction":"I am a super administrator","email":"admin@test.com","phone":"1234567890","roles":["admin"]}}}
   */