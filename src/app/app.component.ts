import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./spotify/shared/components/nav-bar/nav-bar.component";
import { SidebarComponent } from './spotify/shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavBarComponent, RouterLink, RouterLinkActive, SidebarComponent]
})
export class AppComponent {
  title = 'SpotiApp';
}
