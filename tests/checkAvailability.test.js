import { checkAvailability } from "../js/modules/utils";
const arr = [1,2,3];
const val = 1;

it('checking for defference', () =>{
    expect(checkAvailability(arr, val)).toBe(true);
})