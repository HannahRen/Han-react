export default {
    getItem: function (key) {
        let value
        try {
            value = localStorage.getItem(key)
        } catch (ex) {
            // Error during developmemnt
            if (__DEV__) {
                console.error('localStorage.getItem Error, ', ex.message)
            }
        } finally {
            return value
        }
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, value)
        } catch (ex) {
            if (__DEV__) {
                console.error('localStorage.setItem Error, ', ex.message)
            }
        }
    }
}
