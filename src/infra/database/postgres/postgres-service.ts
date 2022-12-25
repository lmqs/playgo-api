import { Client, QueryResult } from 'pg';
import { DatabaseClient } from '../../../core/data/adapter/database-client';
import { ENVIRONMENT } from '../../../main/config';

export class PostgresService implements DatabaseClient{

  private static instance: PostgresService;
  private client: Client ;

  constructor() { 
    this.client = new Client({
      host: ENVIRONMENT.database.host,
      user: ENVIRONMENT.database.user,
      database: ENVIRONMENT.database.database,
      password: ENVIRONMENT.database.password,
      port: ENVIRONMENT.database.port,
     });
  }

  static getInstance (): PostgresService {
    if (!PostgresService.instance) PostgresService.instance =  new PostgresService()
    return PostgresService.instance
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async exec(query: string): Promise<QueryResult<any>> {
    try {
      return await this.client.query(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }
 
}
