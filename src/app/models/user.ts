import { Role } from './role';

export class User {
	//role- to decide feature accesibility of user
	//info- [Optional] for individual user profile data to be fetched from database
	constructor(public role: Role, public info?: any) {}
}
