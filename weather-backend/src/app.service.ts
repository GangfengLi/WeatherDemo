import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getWeatherByCode(code: number): Promise<any> {
    // https://api.weatherapi.com/v1/forecast.json?key=c2fb019239d04ac9a3d214548222107&q=94404&days=10&aqi=no&alerts=no
    const requestUrl = this.config.get('requestUrl');
    const key = this.config.get('key');
    const url =
      requestUrl + '?key=' + key + '&q=' + code + '&days=10&aqi=no&alerts=no';

    const response = await lastValueFrom(this.httpService.get(url));
    if (response.status && response.status == HttpStatus.OK) {
      return response.data;
    } else {
      console.log(
        'failed to execute http request with code:{}',
        response.status,
      );
      return null;
    }
  }
}
