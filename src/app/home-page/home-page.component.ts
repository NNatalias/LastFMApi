import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongsService} from '../songs.service';
import {Song} from '../interfaces/song.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  pSub: Subscription;
  constructor(public songService: SongsService) {
  }

  ngOnInit(): void {
    this.pSub = this.songService.getTop().subscribe((res: any) => {
      this.songs = res.tracks.track;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}

