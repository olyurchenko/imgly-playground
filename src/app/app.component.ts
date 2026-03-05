import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

const IMAGE_URL =
  'https://sl-chat-image-production.s3.amazonaws.com/fb769c43-b2b0-466f-bf77-b2bbd58316c5.jpeg';

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
