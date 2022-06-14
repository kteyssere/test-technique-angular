import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { GenerationConfig } from "../generation-config";

@Component({
	selector: "app-person-generator",
	templateUrl: "./person-generator.component.html",
	styleUrls: ["./person-generator.component.scss"]
})
export class PersonGeneratorComponent implements OnInit {

	generator: FormGroup;
	control: FormControl;
	rateControl: FormControl;
	@Output()
	private generateRequest = new EventEmitter<GenerationConfig>();

	constructor(private formBuilder: FormBuilder) {
		this.rateControl = new FormControl("", [Validators.max(1000), Validators.min(0)]);
	}

	ngOnInit() {
		this.generator = this.formBuilder.group({
			count: [1000, [Validators.min(1), Validators.max(1000)]],
			male: [true],
			female: [true]
		}, {validator: this.customValidationFunction});
	}

	customValidationFunction(formGroup: FormGroup): any {
		let maleField = formGroup.controls['male'].value;
		let femaleField = formGroup.controls['female'].value;
		return (maleField === false && femaleField === false) ? { noGenderChoosed: true } : false;
	}

	generate() {
		const value: GenerationConfig = this.generator.value;
		if (this.generator.valid)
			this.generateRequest.emit(value);
	}

}
