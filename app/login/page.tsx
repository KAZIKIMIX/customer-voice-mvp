'use client'
import { FormEvent, useState } from 'react'
import { createClient } from '../../lib/supabase-browser'
export default function Login(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [role,setRole]=useState('respondent'); const [message,setMessage]=useState('')
 async function signUp(e:FormEvent){e.preventDefault(); const s=createClient(); const {error}=await s.auth.signUp({email,password,options:{data:{role}}}); setMessage(error?error.message:'登録しました。確認メールが届く設定の場合はメールを確認してください。')}
 async function signIn(){const s=createClient(); const {error}=await s.auth.signInWithPassword({email,password}); if(error)setMessage(error.message); else location.href=role==='requester'?'/requester':'/respondent'}
 return <main className="shell"><h1>ログイン / 新規登録</h1><div className="card"><form onSubmit={signUp}><label>利用方法</label><select value={role} onChange={e=>setRole(e.target.value)}><option value="requester">調査を依頼する</option><option value="respondent">回答して謝礼を得る</option></select><label>メール</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/><label>パスワード</label><input type="password" minLength={6} required value={password} onChange={e=>setPassword(e.target.value)}/><div className="actions"><button className="primary">新規登録</button><button type="button" onClick={signIn}>ログイン</button></div></form>{message&&<p>{message}</p>}</div></main>}
