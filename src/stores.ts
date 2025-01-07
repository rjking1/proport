import { writable } from 'svelte/store';

// export const page = writable("login");
export const loggedIn = writable("false")
export const permissions = writable()
// export const views = writable("")

let db_local = localStorage.getItem('proport_db')  // can also be test
export const dbName = writable(db_local || 'proport')
dbName.subscribe((value) => localStorage.setItem('proport_db', value))

export const dbN = writable("")  // the full name, ie art25..._test