import { Modules, ContainerRegistrationKeys } from '@medusajs/framework/utils'
import { IApiKeyModuleService } from '@medusajs/framework/types'

export default async function createPublishableKey({ container }: any) {
  const apiKeyModuleService: IApiKeyModuleService = container.resolve(Modules.API_KEY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    const [existing] = await apiKeyModuleService.listApiKeys({
      title: 'Storefront Key',
      type: 'publishable',
    })

    if (existing) {
      logger.info(`PUBLISHABLE_KEY_EXISTS: ${existing.token}`)
      return
    }

    const key = await apiKeyModuleService.createApiKeys({
      title: 'Storefront Key',
      type: 'publishable',
      created_by: 'system',
    })
    logger.info(`PUBLISHABLE_KEY_CREATED: ${key.token}`)
  } catch (err: any) {
    logger.error(`Failed to create publishable key: ${err.message}`)
  }
}
