import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterModule ],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorNumber = '401';

  activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.errorNumber = data['errorNumber'];
    });
  }

  logout() {
    localStorage.clear();
  }
}
