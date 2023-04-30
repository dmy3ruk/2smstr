const findCarNumberPlate=require('../src/findCorrectNumb')
describe('find correct Number', () => {
    it('should return an empty string if either argument is not a string', () => {
      const codeWord = 'London';
      const digitString = 12345;
      expect(findCarNumberPlate(codeWord, digitString)).toEqual('');
    });
    it('should return an empty string if the codeWord is empty', () => {
      const codeWord = '';
      const digitString = '123456789';
      expect(findCarNumberPlate(codeWord, digitString)).toEqual('');
    });
  
    it('should return an empty string if the digitString is empty', () => {
      const codeWord = 'Madrid';
      const digitString = '';
      expect(findCarNumberPlate(codeWord, digitString)).toEqual('');
    });
  
    it('should return an empty string if the codeWord contains non-alphabetic characters', () => {
      const codeWord = '1234';
      const digitString = '987654321';
      expect(findCarNumberPlate(codeWord, digitString)).toEqual('');
    });
  });