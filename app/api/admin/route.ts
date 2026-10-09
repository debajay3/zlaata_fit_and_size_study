import { cookies } from 'next/headers';
import { adminKey } from '../../../lib/storage';
export async function POST(req:Request){const {key}=await req.json() as {key?:string};if(typeof key!=='string'||!adminKey()||key!==adminKey())return Response.json({error:'Incorrect administrator code'},{status:403});(await cookies()).set('survey_admin',key,{httpOnly:true,secure:new URL(req.url).protocol==='https:',sameSite:'strict',path:'/',maxAge:3600});return Response.json({ok:true});}
export async function DELETE(){(await cookies()).delete('survey_admin');return Response.json({ok:true});}
