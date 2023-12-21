import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  

  dragStart(event: MouseEvent) {
    const div = event.target as HTMLDivElement;
    div.style.position = 'absolute';
    div.style.zIndex = '1000';
  
    const shiftX = event.clientX - div.getBoundingClientRect().left;
    const shiftY = event.clientY - div.getBoundingClientRect().top;
  
    const moveHandler = (e: MouseEvent) => {
      div.style.left = e.pageX - shiftX + 'px';
      div.style.top = e.pageY - shiftY + 'px';
    };
  
    const stopHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', stopHandler);
    };
  
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', stopHandler);
  
    event.preventDefault(); // Evita la selección de texto mientras se arrastra
  }
}
