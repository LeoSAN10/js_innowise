class Storage{
    setItem(key, value){
        localStorage.setItem(key, value)
    };

    removeItem(key){
        localStorage.removeItem(key)
    }

    getItem(key){
        return localStorage.getItem(key)
    }

    getAllItems(){
        const keys = Object.keys(localStorage)
        return keys
    }

    getStorageLength(){
        return localStorage.length
    }
}

export default Storage; 