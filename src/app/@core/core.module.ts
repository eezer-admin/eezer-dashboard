import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { NBUserPassAuthProvider } from '../providers/nb-user-pass-auth-provider';

const socialLinks = [
  {
    url: '#',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: '#',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: '#',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service:  NBUserPassAuthProvider, // NbEmailPassAuthProvider
        config: {
          delay: 3000,
          baseEndpoint: 'https://mdcxqhwaz8.execute-api.eu-west-1.amazonaws.com/prod',
          login: {
            endpoint: '/api/login',
            rememberMe: false,
          },
          register: {
            endpoint: '/api/sign-up',
          },
          logout: {
            endpoint: '/api/sign-out',
          },
          requestPass: {
            endpoint: '/api/request-pass',
          },
          resetPass: {
            endpoint: '/api/reset-pass',
          },
        },
      },
    },
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
