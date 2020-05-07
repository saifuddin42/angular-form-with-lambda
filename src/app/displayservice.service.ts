/* Project Members: Neel Naravnkar, Saifuddin Telia, Vishwajeet Paradkar
 * 
 * This file is the typescript component file for the display 
 * service that we use in survey list page.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  name: string;
  age: number;
}


@Injectable()
export class DisplayService {

 // configUrl = 'assets/testing.json';

  constructor(private httpClient: HttpClient) {

   }

   public getNews(){
    console.log("insidegeNews");
    return this.httpClient.get('https://ffpktcedbf.execute-api.us-east-1.amazonaws.com/Prod/survey');
  }

  /*getConfig() {
    console.log("Did I reach here???");
    return this.httpClient.get(this.configUrl);
  }*/

}
