import postgres from 'postgres';
import { isDeepStrictEqual } from 'node:util';
import { normalizeAnswers } from './answers';
let sql: ReturnType<typeof postgres> | undefined;
function database(){const url=process.env.DATABASE_URL;if(!url)throw new Error('DATABASE_URL is not configured');return sql??=postgres(url,{max:3,prepare:false,connect_timeout:15,idle_timeout:20});}
export function adminKey(){return process.env.ADMIN_KEY;}
export async function saveResponse(r:{id:string;createdAt:string;answers:Record<string,unknown>;employeeName:string;phoneNumber:string|null}){
 const db=database();
 const inserted=await db`INSERT INTO responses(id,created_at,answers,employee_name,phone_number) VALUES (${r.id},${r.createdAt},${db.json(r.answers as postgres.JSONValue)},${r.employeeName},${r.phoneNumber}) ON CONFLICT(id) DO NOTHING RETURNING id`;
 if(inserted.length)return;
 const [existing]=await db`SELECT answers,employee_name,phone_number FROM responses WHERE id=${r.id}`;
 const sameAnswers=existing&&isDeepStrictEqual(normalizeAnswers(existing.answers),r.answers);
 if(!existing||existing.employee_name!==r.employeeName||existing.phone_number!==r.phoneNumber||!sameAnswers)throw Object.assign(new Error('Response ID already belongs to a different response'),{code:'RESPONSE_ID_CONFLICT'});
}
export async function listResponses(){const rows=await database()`SELECT id,created_at,answers,employee_name,phone_number FROM responses ORDER BY created_at DESC`;return rows.map(r=>({...r,answers:normalizeAnswers(r.answers),created_at:new Date(r.created_at).toISOString()}));}
