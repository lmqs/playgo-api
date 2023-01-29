import 'module-alias/register'
import { PostgresService } from '@/infra/database/postgres/postgres-service'

PostgresService.getInstance().connect().then(
  async () => {
    const { setupApp } = await import('@/main/config/app')
    const { ENVIRONMENT } = await import ('@/main/config')
    const app = await setupApp()
    app.listen(ENVIRONMENT.server.port, () => {
      console.log(`Server running at PORT ${ENVIRONMENT.server.port}!`)
    })
  }
).catch(console.error)
