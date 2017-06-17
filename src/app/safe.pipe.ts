import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from "@angular/platform-browser";


@Pipe({  name: 'safe'})
export class SafePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer){} 
	transform(url: any) {
		url = url.replace("watch?v=", "embed/");//with out this , the video will not show

		
    return  this.sanitizer.bypassSecurityTrustResourceUrl( url );
  }

}
