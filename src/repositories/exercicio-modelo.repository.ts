import {DefaultCrudRepository} from '@loopback/repository';
import {ExercicioModelo, ExercicioModeloRelations} from '../models';
import {DefaultDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ExercicioModeloRepository extends DefaultCrudRepository<
  ExercicioModelo,
  typeof ExercicioModelo.prototype.id,
  ExercicioModeloRelations
> {
  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(ExercicioModelo, dataSource);
  }
}
