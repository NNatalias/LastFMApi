import { Component, OnInit } from '@angular/core';
import {SongsService} from '../songs.service';
import {Song} from '../interfaces/song.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  songs: Song[] = [];
  searchForm: FormGroup;
  constructor(public songService: SongsService) { }

  searchSong(): any {
    this.songService.searchSong(this.searchForm.value.searchStr).subscribe((res: any) => {
      console.log(res);
      this.songs = res.results.trackmatches.track;
    }); }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('', [
        Validators.required ]) });
  }

}
