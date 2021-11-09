import {
  Inject,
  NgModule,
  PLATFORM_ID,
  ModuleWithProviders,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PixelConfiguration } from './pixel.types';
import { PixelService } from './pixel.service';

@NgModule({
  imports: [],
})
export class PixelModule {
  private static config: PixelConfiguration | null = null;

  constructor(
    private pixel: PixelService,
    @Inject(PLATFORM_ID) platformId: Record<string, string>
  ) {
    if (!PixelModule.config) {
      throw Error('Informe o `pixelId` no método `forRoot()`');
    }
    if (PixelModule.config.enabled && isPlatformBrowser(platformId)) {
      this.pixel.initialize();
    }
  }

  static forRoot(config: PixelConfiguration): ModuleWithProviders<PixelModule> {
    this.config = config;
    this.verifyPixelId(config.pixelId);

    return {
      ngModule: PixelModule,
      providers: [PixelService, { provide: 'config', useValue: config }],
    };
  }

  private static verifyPixelId(pixelId: string): void {
    /**
     * Tem que verificar primeiro se todos os Pixel IDs
     * seguem o mesmo formato de 14 dígitos
     */
    if (!!pixelId === false || pixelId.length < 15 || pixelId.length > 15) {
      throw Error(
        'Facebook Pixel ID inválido. Você realmente informou o Pixel ID para o método forRoot()?'
      );
    }
  }
}
