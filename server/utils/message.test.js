var expect = require('expect');
//const request = require('supertest');

var{generateMessage} = require('./message');

describe('generateMessage', () =>{
  it('should generate correct message object', () => {
var from = 'Greg';
var text = 'What should we do?';
//Challenge
 //store res in variable
    //request(app)
    var message = generateMessage(from,text) //.then(res)

      expect(message.text).toBe(text);
      expect(message.from).toBe(from);
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, text});

 // assert text match
 // assert createdAt is number

  })
});
