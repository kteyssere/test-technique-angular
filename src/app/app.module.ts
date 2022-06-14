import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LOCALE_ID, NgModule} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		MatButtonModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		{ provide: LOCALE_ID, useValue: window.navigator.language }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
