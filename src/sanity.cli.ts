import { defineCliConfig } from 'sanity/cli'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: process.env.SANITY_STUDIO_HOST || '',
})
