

const Mock = require('mockjs')
const bodyParser = require('body-parser')
 


function registerRoutes(app) {
  let mockLastIndex
  const mocks = require('./index.js')
  console.log("mocks", mocks)
  
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })



  for (const mock of mocksForServer) {
    console.log("register url :", mock.url)
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }

  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}


// for mock server
const responseFake = (url, type, respond) => {

  let prefix = "mock-api/v1"
  return {
    url: new RegExp(`${prefix}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}


module.exports = app => {
  // es6 polyfill
  require('babel-register')

  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
}




