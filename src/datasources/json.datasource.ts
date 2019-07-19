import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './json.datasource.json';

export class JsonDataSource extends juggler.DataSource {
  static dataSourceName = 'JSON';

  constructor(
    @inject('datasources.config.JSON', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
