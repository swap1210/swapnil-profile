import { Timestamp } from '@angular/fire/firestore';

export interface Notification {
	date: Timestamp;
	message: string;
	title: string;
}
