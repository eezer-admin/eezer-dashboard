import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService } from '@nebular/auth';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [
    // {
    //   title: 'Profile',
    //   url: '#/users/profile',
    // },
    {
      title: 'Log out',
    }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private router: Router) {

    this.user = {
      name: localStorage.getItem('username'),
      picture: '',
    }
  }

  ngOnInit() {

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-user-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title.toLowerCase() === 'log out')
          this.authService.logout('email');
      });
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
    // this.menuService.navigateHome();
    this.router.navigate(['home']);
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
