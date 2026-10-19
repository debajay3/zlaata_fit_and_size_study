export type SurveyQuestion = {id:number;kind?:string;multi:boolean;options:string[]};
export const NOT_APPLICABLE = 'Not applicable — no listed brands';
export const PRIVATE_ANSWER = 'Not sure / prefer not to say';
export const BAND_OPTIONS = ['28','30','32','34','36','38','40','42'];
export const CUP_OPTIONS = ['AA','A','B','C','D','DD / E','DDD / F'];
export const SIZE_OPTIONS = ['XXS','XS','S','M','L','XL','XXL','Other / not sure'];
export function noListedBrands(answers:Record<string,unknown>){return Array.isArray(answers[1])&&answers[1].includes('I have not shopped from any of the above');}
function record(value:unknown):value is Record<string,unknown>{return value!==null&&typeof value==='object'&&!Array.isArray(value);}
export function validAnswer(q:SurveyQuestion,value:unknown,answers:Record<string,unknown>):boolean{
 const choice=(x:unknown):x is string=>typeof x==='string'&&(q.options.includes(x)&&!x.startsWith('Other')||q.options.some(o=>o.startsWith('Other'))&&/^Other: \S[\s\S]{0,199}$/.test(x));
 if(q.kind==='brandSizes'){
  if(noListedBrands(answers))return value===NOT_APPLICABLE;
  const brands=answers[1];if(!Array.isArray(brands)||!brands.length||!record(value))return false;
  return brands.every(b=>{const key=typeof b==='string'&&b.startsWith('Other')?Object.keys(value).find(k=>k.startsWith('Other')):b;return typeof key==='string'&&SIZE_OPTIONS.includes(value[key] as string);});
 }
 if(q.kind==='bra')return value===PRIVATE_ANSWER||record(value)&&BAND_OPTIONS.includes(value.band as string)&&CUP_OPTIONS.includes(value.cup as string);
 if(q.kind==='text')return typeof value==='string'&&value.trim().length>0&&value.length<=3000;
 if(q.multi){if(!Array.isArray(value)||!value.length||!value.every(choice)||new Set(value).size!==value.length)return false;return value.length===1||!value.some(x=>/^(I have not|I rarely|No specific)/.test(x));}
 return choice(value);
}
export function prepareAnswers(answers:Record<string,unknown>,other:Record<string,string>){const result={...answers};for(const [id,text] of Object.entries(other)){const a=result[id];if(Array.isArray(a))result[id]=a.map(x=>typeof x==='string'&&x.startsWith('Other')?`Other: ${text.trim()}`:x);else if(typeof a==='string'&&a.startsWith('Other'))result[id]=`Other: ${text.trim()}`;}return result;}
