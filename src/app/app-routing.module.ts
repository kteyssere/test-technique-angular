import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
	{
		path: "personnes",
		loadChildren: () => import("./person/person.module").then(m => m.PersonModule)
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: "personnes"
	},
	{
		path:"apropos",
		component: AboutComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
}

