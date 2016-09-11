import {Component, ViewChild, ElementRef} from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {Image} from 'ui/image';
import {GC} from 'utils/utils';

import {ImageSource} from 'image-source';
import * as imageSource from 'image-source';
import * as camera from 'camera';

@Component({
  selector: 'pg-photo-gallery',
  templateUrl: 'photo-gallery.component.html',
  styleUrls: ['photo-gallery.component.css'],
  pipes: [TNSFontIconPipe]
})
export class PhotoGalleryComponent {
  @ViewChild('displayedPicture') displayedPictureRef: ElementRef;

  pictures: Array<ImageSource> = new Array<ImageSource>();

  constructor(private fonticon: TNSFontIconService){
  }

  get picturePlaceholderPath(): string {
    return '~/images/placeholder-img.jpg'
  };

  takePicture(): void {
    camera.takePicture({ 
      width: 400, height: 400, keepAspectRatio: true 
    })
    .then((picture) => {
      this.display(picture);
      this.pictures.unshift(picture);
      GC();
    });
  }

  display(picture: ImageSource) {
    this.displayedPictureView.imageSource = picture;
  }

  get deleteButtonVisibility(): string {
    return this.noPicturesTaken? 'collapsed': 'visible'
  }

  private get noPicturesTaken(): boolean {
    return this.pictures.length == 0;
  }

  deleteDisplayedPicture() {
    let pictureIndex = this.pictures.indexOf(this.displayedPictureView.imageSource);
    this.pictures.splice(pictureIndex, 1);
    if (this.noPicturesTaken) {
      this.concealPicture();
    }
    else this.displayClosestPictureFrom(pictureIndex);
  }

  concealPicture(): void {
    this.displayedPictureView.imageSource = 
      imageSource.fromFile(this.picturePlaceholderPath);
  }

  private displayClosestPictureFrom(pictureIndex: number): void {
    let pictureToDisplay = this.pictures[pictureIndex];
    if (this.pictures[pictureIndex] === undefined) {
      pictureToDisplay = this.pictures[pictureIndex - 1];
    }
    this.display(pictureToDisplay);
  }

  get displayedPictureView(): Image {
    return this.displayedPictureRef.nativeElement;
  }

}
