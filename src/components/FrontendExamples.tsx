import { forwardRef, useState } from 'react';
import CodeSnippet from './CodeSnippet';

const tabs = ['React', 'Next.js', 'Angular'] as const;
type Tab = typeof tabs[number];

const codeExamples: Record<Tab, { fetch: string; lib: string; fetchTitle: string; libTitle: string }> = {
  React: {
    fetchTitle: 'Fetch API',
    libTitle: 'Axios',
    fetch: `import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Falha ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    lib: `import axios from 'axios';
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
  },
  'Next.js': {
    fetchTitle: 'Server Component',
    libTitle: 'Client Component',
    fetch: `// app/users/page.tsx — Server Component
// Roda no servidor, sem useEffect necessário!

export default async function UsersPage() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'no-store' // dados sempre frescos
  });
  const users = await res.json();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    lib: `'use client';
// components/UserList.tsx — Client Component

import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
  },
  Angular: {
    fetchTitle: 'Service',
    libTitle: 'Component',
    fetch: `// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}`,
    lib: `// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: \`
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }}
      </li>
    </ul>
  \`
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}`,
  },
};

const FrontendExamples = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<Tab>('React');
  const example = codeExamples[activeTab];

  return (
    <section ref={ref} id="frontend" className="py-32 px-6" data-section="frontend">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 04</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Front-end: <span className="gradient-text">Consumo</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Como consumir uma API no front-end usando as ferramentas mais populares do mercado.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                  : 'text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          <CodeSnippet
            code={example.fetch}
            language="tsx"
            title={example.fetchTitle}
            badge={activeTab}
            badgeColor="primary"
          />
          <CodeSnippet
            code={example.lib}
            language="tsx"
            title={example.libTitle}
            badge={activeTab}
            badgeColor="accent"
          />
        </div>
      </div>
    </section>
  );
});

FrontendExamples.displayName = 'FrontendExamples';
export default FrontendExamples;
