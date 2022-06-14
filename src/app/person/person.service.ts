import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {map, Observable} from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";

@Injectable({
	providedIn: "root"
})
export class PersonService {

	constructor(private http: HttpClient) {}

	getPersons(config: GenerationConfig): Observable<Person[]> {
		return this.http.get<Person[]>("/assets/data/persons.json")
			.pipe(
				map(
					(values) => PersonService.filterPersons(config, values)
				)
			);
	}

	private static filterPersons(config: GenerationConfig, persons: Person[]){
		let personCollection: Person[] = [];
		for (let person of persons) {
			if (personCollection.length < config.count) {
				if (config.male === true && config.female === false) {
					if (person.gender === 'Male') {
						personCollection.push(person);
					}
				}else if (config.male === false && config.female === true) {
					if (person.gender === 'Female') {
						personCollection.push(person);
					}
				}else if (config.male === true && config.female === true) {
					personCollection.push(person);
				}
			}
		}
		return personCollection;
	}
}
