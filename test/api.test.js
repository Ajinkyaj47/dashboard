let chai = require('chai');
let chaiHttp = require('chai-http');
let mocha = require('mocha');

let expect = chai.expect
chai.use(chaiHttp)

describe("Testing Health api",()=>{
    it("it should return 200 for health check",(done)=>{
        chai.request('http://localhost:1200')
        .get('/health')
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err)=> {
            throw err
        })
    })
    it("it should return 404 for health check",(done)=>{
        chai.request('http://localhost:1200')
        .get('/healths')
        .then((res)=>{
            expect(res).to.have.status(404)
            done()
        })
        .catch((err)=> {
            throw err
        })
    })   
    
})