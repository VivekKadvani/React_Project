const { expect } = require('chai');
const config = require('../../config/config.json');
const { execSync } = require('child_process');
const { userData, Sequelize } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('supertest');

const sequelize = new Sequelize(
  config.test.database,
  config.test.username,
  config.test.password,
  {
    host: config.test.host,
    dialect: config.test.dialect,
  },
);

const headersWithCookie = {
  Cookie: 'metamaskToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub3VuY2UiOjI1LjE5NDQ5NDIwNzQ1MzAzMywiYWNjb3VudEFkZHJlc3MiOiIweDhhODk3NjcyZmUzOTY2Y2QxY2EzYmM1MDdhYTA1NzU5MWQyYjk5MWQiLCJpYXQiOjE2ODU5NTU4NTZ9.OpsOTKPdAp9rIRkY63Azqg_WwFma_JESRnqcY1q8MNY; Path=/'
}
const baseURI = "http://localhost:8000/api";

describe('Back-end Testing', async () => {
  before(async () => {
    execSync(' npx sequelize-cli db:migrate --env test', {
      stdio: 'inherit',
    });
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
  });

  after(async () => {
    execSync(' npx sequelize-cli db:migrate:undo:all --env test', {
      stdio: 'inherit',
    });
  })

  it('Database Entry', async () => {
    response = await request(`${baseURI}`)
    .post(`/register`)
    .send({
        signedMessage: "0x0f698793c26523a7baedeeabc344a0b8d3320d9a07fea103711917a31839e8f0194df088c8370c5a72d219c6f98a34e28ddf1fb9093a131b0c75b42ee5dad4b61c",
        messageObj: {
          nounce: 25.194494207453033,
          accountAddress: "0x8a897672fe3966cd1ca3bc507aa057591d2b991d"
        }
    })
    // console.log(app);
    console.log(response);
  });

});

// describe("API testing.....", async () => {

//   let response;
//   before(async () => {
//     execSync('npx sequelize-cli db:migrate --env test', {
//       stdio: 'inherit',
//     });
//     console.log(true);
//     // await model.sequelize.sync();
//     await sequelize.authenticate()
//   });

//   after(async () => {
//     execSync(' npx sequelize-cli db:migrate:undo:all --env test', {
//       stdio: 'inherit',
//     });
//     await sequelize.close();
//     await sequelize.connectionManager.close();
//   })

//   describe("Registration API testing..", () => {

//     const callAPI = async (APIargs) => {
//       response = await request(`${baseURI}`).post("/register")
//       console.log(response.body);
//     }

//     it("should give argument Error...", async () => {
//       await callAPI({})
//       expect(response.data.error[0].message).to.equal('"signedMessage" is required')
//     })

//     // it("should send cookies... ",async()=>{
//     //     await callAPI({
//     //         signedMessage: "0x0f698793c26523a7baedeeabc344a0b8d3320d9a07fea103711917a31839e8f0194df088c8370c5a72d219c6f98a34e28ddf1fb9093a131b0c75b42ee5dad4b61c",
//     //         messageObj: {
//     //           nounce: 25.194494207453033,
//     //           accountAddress: "0x8a897672fe3966cd1ca3bc507aa057591d2b991d"
//     //         }
//     //     })
//     //     expect(response.status).to.eq(200)
//     //     expect(response.headers['set-cookie']).not.be.eq(undefined)
//     // })
//   })

//   // describe("newvesting API testing..", ()=>{

//   //     // it("should update vesting..", async()=>{
//   //     //     let vestings = await vesting.findAll();
//   //     //     const length = Object.keys(vestings).length
//   //     //     response = await axios.post(`${baseURI}/vestnew/locktoken`,
//   //     //         {
//   //     //             "cliff":1684225414,
//   //     //             "slicePeriod":200,
//   //     //             "endTime": 1684225414,
//   //     //             "networkId":"0x13881",
//   //     //             "tokenAddress":"0xc4Ba81E8c4Ec9d81bd86f1ee13a0a7fFfDb9B907",
//   //     //             "amount":100,
//   //     //             "recieveOnInterval":12,
//   //     //             "beneficiaryAddress": "0x8A897672Fe3966Cd1CA3bC507AA057591d2B991d"
//   //     //         },
//   //     //         {
//   //     //             headers:headersWithCookie
//   //     //         }
//   //     //     )
//   //     //     vestings = await vesting.findAll();
//   //     //     const updatedVestingsLength = Object.keys(vestings).length
//   //     //     expect(response.status).to.equal(200);
//   //     //     expect(updatedVestingsLength).to.be.greaterThan(length)
//   //     // })
//   // })

//   // describe("currentvesting API testing..", ()=>{

//   //     const callAPI = async(URL) =>{
//   //         // response = await axios.get(`${baseURI}/currentvests/${URL}`,{headers:headersWithCookie})
//   //         // console.log(response.data);
//   //     }

//   //     it("should able to give all vesting regarding user and current network..", async()=>{
//   //         await callAPI("list?beneficiaryAddress=0x8A897672Fe3966Cd1CA3bC507AA057591d2B991d&networkId=0x13881")
//   //         expect(response.status).to.be.eq(200)
//   //     })
//   // })
// })