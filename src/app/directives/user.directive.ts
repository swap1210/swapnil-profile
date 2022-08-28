import {
	Directive,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	Input,
} from '@angular/core';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Directive({ selector: '[appUser]' })
export class UserDirective implements OnInit {
	constructor(
		private templateRef: TemplateRef<any>,
		private authService: AuthService,
		private viewContainer: ViewContainerRef
	) {}

	ngOnInit() {
		this.authService.user$.subscribe({
			next: (ur) => {
				if (!!ur && ur.role > Role.Visitor) {
					this.viewContainer.createEmbeddedView(this.templateRef);
				} else {
					this.viewContainer.clear();
				}
			},
		});
	}
}
