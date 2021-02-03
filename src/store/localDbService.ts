import localforage from "localforage"

const localForageService = localforage.createInstance({
  name: "userData",
  version: 1.0,
  storeName: "userDataObj",
})

localForageService.setDriver([
  localforage.INDEXEDDB,
  localforage.WEBSQL,
  localforage.LOCALSTORAGE,
])

export default localForageService
