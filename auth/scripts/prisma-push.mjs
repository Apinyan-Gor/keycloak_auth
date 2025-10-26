import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8')
  env.split('\n').forEach(line => {
    const [k,v] = line.split('=')
    if (k) process.env[k.trim()] = (v||'').trim()
  })
}

function inferProvider(url) {
  if (!url) return 'sqlite'
  if (url.startsWith('postgres')) return 'postgresql'
  if (url.startsWith('mysql')) return 'mysql'
  if (url.startsWith('sqlite')) return 'sqlite'
  return 'sqlite'
}

const schemaPath = path.resolve(process.cwd(), 'prisma', 'schema.prisma')
let schema = fs.readFileSync(schemaPath, 'utf8')
const provider = inferProvider(process.env.DATABASE_URL)
schema = schema.replace(/provider = \".*\"/, `provider = "${provider}"`)
fs.writeFileSync(schemaPath, schema)

console.log('Updated prisma provider to', provider)

console.log('Running prisma generate...')
execSync('npx prisma generate', { stdio: 'inherit' })
console.log('Running prisma db push...')
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
console.log('Prisma push complete')
