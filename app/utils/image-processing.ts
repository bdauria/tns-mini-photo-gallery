import {Image} from 'ui/image';

declare const android: any;
declare const CGRectMake: any;
declare const CGColorSpaceCreateDeviceGray: any;
declare const CGBitmapInfo: any;
declare const CGImageAlphaInfo: any;
declare const CGBitmapContextCreate: any;
declare const CGBitmapContextCreateImage: any;
declare const UIImage: any;
declare const CGContextDrawImage: any;
declare const CGColorSpaceRelease: any;
declare const CGContextRelease: any;
declare const CFRelease: any;

export function transformToGrayScale(args: { source: Image, destination: Image }): void {
  const sourceImage = args.source.imageSource;
    if (args.source.ios) {
      const rect = CGRectMake(0, 0, sourceImage.width, sourceImage.height);
      const colorSpace = CGColorSpaceCreateDeviceGray();
      const context = CGBitmapContextCreate(
        null, 
        sourceImage.width, 
        sourceImage.height, 
        8, 
        0, 
        colorSpace,
        CGImageAlphaInfo.kCGImageAlphaNone);
      CGContextDrawImage(
        context, 
        rect, 
        sourceImage.ios.CGImage);
      const imageRef = CGBitmapContextCreateImage(context);
      const image = UIImage.imageWithCGImage(imageRef);

      args.destination.ios.image = image;
    }
    else if (args.source.android) {
      args.destination.imageSource = sourceImage;
      var colorMatrix = new android.graphics.ColorMatrix();
      colorMatrix.setSaturation(0);
      var colorFilter = new android.graphics.ColorMatrixColorFilter(colorMatrix);
      args.destination.imageSource.android.setColorFilter(colorFilter);
    }
}
