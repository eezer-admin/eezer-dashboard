import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService } from '@nebular/auth';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-nheader',
  styleUrls: ['./nheader.component.scss'],
  templateUrl: './nheader.component.html',
})
export class NHeaderComponent implements OnInit {

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

    this.authService.isAuthenticated().subscribe(res => {
      if (res === true && localStorage.getItem('username'))
        this.lnkTitle = localStorage.getItem('username');
    })

  }

  lnkTitle = 'Log in';

  ngOnInit() {

  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
