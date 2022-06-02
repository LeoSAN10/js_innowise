function checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
      return val == arrVal
    })
  }
const arr = [1,2,3];
const val = 1;

it('checking for defference', () =>{
    expect(checkAvailability(arr, val)).toBe(true);
})