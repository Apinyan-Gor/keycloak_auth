import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// Загружаем .env
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8')
  env.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, v] = trimmed.split('=')
      if (k) process.env[k.trim()] = (v || '').trim()
    }
  })
}

function inferProvider(url) {
  if (!url) return 'sqlite'
  if (url.startsWith('postgres')) return 'postgresql'
  if (url.startsWith('mysql')) return 'mysql'
  if (url.startsWith('file:')) return 'sqlite' // Для SQLite с file:
  return 'sqlite'
}

const schemaPath = path.resolve(process.cwd(), 'prisma', 'schema.prisma')
let schema = fs.readFileSync(schemaPath, 'utf8')
const provider = inferProvider(process.env.DATABASE_URL)
schema = schema.replace(/provider = \".*\"/, `provider = "${provider}"`)
console.log('Updated schema with provider:', provider)
fs.writeFileSync(schemaPath, schema)

// Проверяем skip generate (теперь как boolean)
const skipGenerate = process.env.SKIP_PRISMA_GENERATE == '1' || process.env.SKIP_PRISMA_GENERATE == 'true'
if (skipGenerate) {
  console.log('Skipping prisma generate (SKIP_PRISMA_GENERATE is set)')
} else {
    try {
      console.log('Running prisma generate...')
      // Добавь лог schema и DATABASE_URL перед запуском
      console.log('DATABASE_URL:', process.env.DATABASE_URL)
      console.log('Schema content after update:')
      console.log(schema)  // Покажет полный schema
      execSync(`npx prisma generate --schema ${schemaPath}`, { stdio: 'inherit' })
      console.log('Prisma generate complete')
    } catch (error) {
      console.error('Error during prisma generate:', error.message)
      console.error('Full error:', error)  // Полный stack trace
      console.error('Tip: Set SKIP_PRISMA_GENERATE=1 in .env to skip, or downgrade Node.js to LTS.')
      process.exit(1)
    }
}

// Пушим БД
try {
  console.log('Running prisma db push...')
  execSync('npx prisma db push --accept-data-loss --skip-generate', { stdio: 'inherit' })  // Добавлено --skip-generate
  console.log('Prisma push complete')
} catch (error) {
  console.error('Error during prisma db push:', error.message)
  process.exit(1)
}