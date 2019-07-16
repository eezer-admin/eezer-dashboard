import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [
    {
      title: 'Profile',
      url: '#/users/profile'
    },
    // {
    //   title: 'Log out',
    //   //  url: '#/auth/login',
    // }
  ];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.admin);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-user-menu'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => {
        if (title.toLowerCase() === 'log out')
        {
                //Todo:add signout api to backoffice, then remove this line
                this.router.navigate(['auth/login']);
                this.authService.logout('email');

        }
          //Todo: back-office api should have sign-out endpoint!
          // this.authService.logout('email').subscribe(res => {
          //   console.log(res);

          //   this.router.navigate(['auth/login']);
          // });
      }
      );
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
