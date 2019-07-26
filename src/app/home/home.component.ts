import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home',
  template: `
    <ngx-home-layout>
      <router-outlet>
          <ngx-index></ngx-index>
      </router-outlet>
    </ngx-home-layout>
  `,
})
export class HomeComponent {
}
