import {Component, ViewChild, ElementRef} from '@angular/core';
import {Image} from 'ui/image';

import {PhotoGalleryComponent} from './photo-gallery.component';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';

import * as imageProcessingModule from './utils/image-processing';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [PhotoGalleryComponent],
  pipes: [TNSFontIconPipe]
})
export class AppComponent {
  @ViewChild(PhotoGalleryComponent) photoGalleryComponent: PhotoGalleryComponent;
  @ViewChild('transformedPicture') transformedPictureRef: ElementRef;

  constructor(private fonticon: TNSFontIconService) {
  }

  transformDisplayedPictureToGrayScale(){
    imageProcessingModule.transformToGrayScale({
      source: this.photoGalleryComponent.displayedPictureView,
      destination: this.transformedPictureView
    });
  }

  private get transformedPictureView(): Image {
    return this.transformedPictureRef.nativeElement;
  }
}
