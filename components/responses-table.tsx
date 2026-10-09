'use client';
import { Download } from 'lucide-react';
import data from '../lib/questions.json';
import { formatAnswer } from '../lib/response-export';
type Row={id:string;created_at:string;employee_name:string|null;phone_number:string|null;answers:Record<string,unknown>};
export default function ResponsesTable({rows,onExport}:{rows:Row[];onExport:()=>void}){
 return <article className="responseList"><div className="responseToolbar"><div><h3>Employee responses</h3><p className="note">{rows.length} {rows.length===1?'response':'responses'} · Scroll horizontally to view every answer.</p></div><button className="primary" disabled={!rows.length} onClick={onExport}><Download size={16}/>Export CSV</button></div>{!rows.length?<p className="note">No submitted responses yet.</p>:<div className="tableScroll responsesScroll" tabIndex={0} role="region" aria-label="Employee survey responses"><table className="responsesTable"><caption className="screenReaderOnly">Submitted employee surveys, including identification and all 27 answers</caption><thead><tr><th scope="col">Employee name</th><th scope="col">Phone number</th><th scope="col">Submitted</th>{data.questions.map(q=><th scope="col" key={q.id}>{q.id}. {q.title}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.id}><th scope="row">{r.employee_name||'Not collected'}</th><td>{r.phone_number||'—'}</td><td>{new Date(r.created_at).toLocaleString()}</td>{data.questions.map(q=><td key={q.id}>{formatAnswer(r.answers[q.id])||'—'}</td>)}</tr>)}</tbody></table></div>}</article>;
}
