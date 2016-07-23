import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FacebookService {
  /* 
  Set the required href attribute on the share button
 */
  setShareButtonAttribute(elementId: string, href: string) {
    let share: Element = document.getElementById(elementId);
    share.setAttribute('data-href', href);
  }
  
  
  
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //   this.house$.subscribe(i => {
  //     if (i && document.getElementById(i.id)) {
  //       this.setupShareButton(i);
  //     }
  //   });
  //   }, 500);
  // }
  
  
  /*
    Run the one-time script to initialize FB Share buttons
  */
  initShareButtons() {
    // let ogTags = [
    //   {property: 'og:url', content: window.location.href.replace('localhost:8080', '0ce0a49c.ngrok.io')},
    //   {property: 'og:type', content: 'website'},
    //   {property: 'og:title', content: 'JBurchard Rental Agency (demo)'},
    //   {property: 'og:description', content: 'Demo rental agency using Angular2 + Typescript + Firebase'},
    //   {property: 'og:image', content: house.imageUrl},
    //   ];
      
    // ogTags.forEach(i => {
    //   let m: Element = document.createElement('meta');
    //   m.setAttribute('property', i.property);
    //   m.setAttribute('content', i.content);
    //   document.head.appendChild(m);
    // });
    
     (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
  