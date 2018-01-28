import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  private _opened = true;
  private window_size = window.innerWidth;
  private _mode = 'over';

  private _toggleSidebar() {
    this._opened = !this._opened;
    // if (this.window_size < 800) {
    //   this._opened = !this._opened;
    // }
  }

  constructor() { }

  ngOnInit() {
    if (this.window_size > 800) {
      this._mode = 'push';
    } else {
      this._mode = 'over';
      this._opened = false;
    }
   }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 800) {
      this._mode = 'push';
      this._opened = true;
    } else {
      this._mode = 'over';
      this._opened = false;
    }
  }

}
