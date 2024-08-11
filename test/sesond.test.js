let chai  = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');

let expect = chai.expect
chai.use(chaiHttp)

describe('Testing User API',()=>{
    it('should display all active users',(done)=>{
        chai.request('http://localhost:1200')
        .get('/users')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('should display user by id',(done)=>{
        chai.request('http://localhost:1200')
        .get('/user/66b713de137a6fc2aac29c89')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('should display user by role',(done)=>{
        chai.request('http://localhost:1200')
        .get('/users?role=user')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('should display user by city',(done)=>{
        chai.request('http://localhost:1200')
        .get('/users?city=Solapur')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('should display user by city and role',(done)=>{
        chai.request('http://localhost:1200')
        .get('/users?city=Solapur&role=admin')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('should display user by city and role and status',(done)=>{
        chai.request('http://localhost:1200')
        .get('/users?city=Solapur&role=admin&isActive=true')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('add new user into db',(done)=>{
        chai.request('http://localhost:1200')
        .post('/addUser')
        .send({'name':'test','city':'test city','role':'user','isActive':true})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('update user into db',(done)=>{
        chai.request('http://localhost:1200')
        .put('/updateUser')
        .send({'_id':'66b777c0fae4cfefa104b47f','name':'test 11'})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('mark user as active into db',(done)=>{
        chai.request('http://localhost:1200')
        .put('/activateUser')
        .send({'_id':'66b777c0fae4cfefa104b47f'})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('mark user as deActive into db',(done)=>{
        chai.request('http://localhost:1200')
        .put('/deactivateUser')
        .send({'_id':'66b7796693e788eecc7844d2'})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
    it('mark user as deActive into db',(done)=>{
        chai.request('http://localhost:1200')
        .delete('/deleteUser')
        .send({'_id':'66b7796693e788eecc7844d2'})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()

        }).catch((err)=>{
            throw err
        })
    })
})

