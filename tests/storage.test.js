/**
 * @jest-environment jsdom
 */


import Storage from "../js/modules/localStorage.js"
const key = '1'
const key2 = '2'
const value = '22'
const value2 = '33'
const storage = new Storage

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }

    getLength(){
        const keys = Object.keys(localStorage)
        return keys
    }
  };
  
  global.localStorage = new LocalStorageMock;

it('add to local storage', () =>{
    storage.setItem(key,value)
    const result = storage.getItem(key)
    expect(result).toBe('22');
})

it('remove from local storage', () =>{
    storage.setItem(key,value)
    const result = storage.getItem(key)
    console.log(result)
    storage.removeItem(key)
    const result2 = storage.getItem(key)
    expect(result2).toBe(null);
})