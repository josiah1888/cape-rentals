import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

// templateUrl example
import { Home } from './home';
//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

/////////////////////////
// ** Example Components
@Component({
  selector: 'about',
  template: `
    <div>This is the "About" page</div>
  `
})
export class About { }

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [`
    * { padding:0; margin:0; }
    #universal { text-align:center; font-weight:bold; padding:15px 0; }
    nav { background:#158126; min-height:40px; border-bottom:5px #046923 solid; }
    nav a { font-weight:bold; text-decoration:none; color:#fff; padding:20px; display:inline-block; }
    nav a:hover { background:#00AF36; }
    .hero-universal { min-height:500px; display:block; padding:20px; background: url('/assets/logo.png') no-repeat center center; }
    .inner-hero { background: rgba(255, 255, 255, 0.75); border:5px #ccc solid; padding:25px; }
    .router-link-active { background-color: #00AF36; }
    blockquote { border-left:5px #158126 solid; background:#fff; padding:20px 20px 20px 40px; }
    blockquote::before { left: 1em; }
    main { padding:20px 0; }
    pre { font-size:12px; }
    .main-title {
      color: #FFF;
      float: right;
      padding: 10px 20px;
    }
  `],
  template: `
    <script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>
    <script src="https://use.fontawesome.com/512b4e5cc1.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <nav>
      <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./'] ">Home</a>
      <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./houses'] ">All Rentals</a>
      <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./signup'] ">Sign Up</a>
      <h1 class="main-title">Cape Rentals</h1>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    `
})
export class App {
  constructor(public http: Http) { }
}
