import { Component } from "@angular/core";
import {EMPTY, Observable} from "rxjs";
import { GenerationConfig } from "../generation-config";
import { Person } from "../person";
import { PersonService } from "../person.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: "app-person-list",
	templateUrl: "./person-list.component.html",
	styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent {

	displayedColumns: string[] = ["id", "firstName", "lastName", "gender", "email"];
	dataSource: Observable<Person[]> = EMPTY;

	constructor(private personService: PersonService, public translate: TranslateService) {

	translate.addLangs(['en', 'fr']);
		translate.setDefaultLang('fr');

		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
	}

	generate(config: GenerationConfig) {
		this.dataSource = this.personService.getPersons(config);
	}
}
