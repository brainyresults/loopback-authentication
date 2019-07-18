import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './default.datasource.json';

export class DefaultDataSource extends juggler.DataSource {
  static dataSourceName = 'default';

  constructor(
    @inject('datasources.config.default', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
