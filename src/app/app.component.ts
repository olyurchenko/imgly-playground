import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

const IMAGE_URL =
  `${window.location.origin}/s3-image/5b24ef39-4072-452e-b66a-99d9d008e419.jpg`;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('cesdk_container') containerRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const config: Configuration = {
      license: 'your-license-key',
      baseURL: `https://cdn.img.ly/packages/imgly/cesdk-js/${CreativeEditorSDK.version}/assets`,
      callbacks: {
        onUpload: 'local',
      },
    };

    CreativeEditorSDK.create(this.containerRef.nativeElement, config).then(
      async (instance) => {
        instance.addDefaultAssetSources();
        instance.addDemoAssetSources({ sceneMode: 'Design' });
        await instance.createFromImage(IMAGE_URL);
      }
    );
  }
}
