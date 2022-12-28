import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";
import {StorageService} from "../services/StorageService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private storageService: StorageService,
              private authService: AuthService,
              private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.storageService.clearUser();
      this.router.navigate(['/']);
    })
  }

}
