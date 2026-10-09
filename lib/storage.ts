import postgres from 'postgres';
import { normalizeAnswers } from './answers';
let sql: ReturnType<typeof postgres> | undefined;
function database(){const url=process.env.DATABASE_URL;if(!url)throw new Error('DATABASE_URL is not configured');return sql??=postgres(url,{max:3,prepare:false});}
export function adminKey(){return process.env.ADMIN_KEY;}
export async function saveResponse(r:{id:string;createdAt:string;answers:Record<string,unknown>;employeeName:string;phoneNumber:string|null}){await database()`INSERT INTO responses(id,created_at,answers,employee_name,phone_number) VALUES (${r.id},${r.createdAt},${database().json(r.answers as postgres.JSONValue)},${r.employeeName},${r.phoneNumber}) ON CONFLICT(id) DO NOTHING`;}
export async function listResponses(){const rows=await database()`SELECT id,created_at,answers,employee_name,phone_number FROM responses ORDER BY created_at DESC`;return rows.map(r=>({...r,answers:normalizeAnswers(r.answers),created_at:new Date(r.created_at).toISOString()}));}
