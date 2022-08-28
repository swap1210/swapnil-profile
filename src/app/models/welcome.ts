import { Timestamp } from '@angular/fire/firestore';

export interface Welcome {
	date?: Timestamp;
	message: string;
	title: string;
}
