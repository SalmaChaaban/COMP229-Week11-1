import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MovieListComponent implements OnInit {

  isLoggedIn = false;
  hasError = false;
  movies = [];

  constructor(private movieService: MovieService, 
              private router: Router, 
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.movieService.getMovieList()
      .subscribe({
        next: data => {
          this.movies = data.movies;
          this.hasError = false;
        },
        error: err => {
          this.hasError = true;
        }
      })
  }

  editMovie(id: string): void {
    this.router.navigate(['/movies/edit' + id]);
  }

  deleteMovie(id: string): void {
    this.movieService.deleteMovie(id)
    .subscribe({
      next: data => {
        this.reloadPage();
      },
      error: err => {
        this.hasError = true;
      }
    })
  }

}
