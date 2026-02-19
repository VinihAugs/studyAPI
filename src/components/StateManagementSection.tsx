import { forwardRef, useState } from 'react';
import CodeSnippet from './CodeSnippet';

const tabs = ['Zustand', 'Redux Toolkit', 'Angular/RxJS'] as const;
type Tab = typeof tabs[number];

const codeExamples: Record<Tab, string> = {
  Zustand: `import { create } from 'zustand';

interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const res = await fetch('/api/users');
    const users = await res.json();
    set({ users, loading: false });
  },
}));

// Em qualquer componente:
function UserList() {
  const { users, loading, fetchUsers } = useUserStore();
  useEffect(() => { fetchUsers(); }, []);
  // ...
}`,
  'Redux Toolkit': `import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const res = await fetch('/api/users');
    return res.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;`,
  'Angular/RxJS': `import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe(
      users => this.usersSubject.next(users)
    );
  }

  getUsers() { return this.usersSubject.getValue(); }
}`,
};

const StateManagementSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<Tab>('Zustand');

  return (
    <section ref={ref} id="state" className="py-32 px-6" data-section="state">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 05</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            O <span className="gradient-text">"Cérebro"</span> da Interface
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Gerenciamento de estado global: o armazém central que guarda os dados da API e distribui
            para toda a aplicação sem passar de componente em componente.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass rounded-xl p-6 border border-success/30">
            <h3 className="font-bold text-success mb-3 flex items-center gap-2">
              <span>✅</span> Quando USAR estado global
            </h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Dados do usuário logado (perfil, token)</li>
              <li>• Carrinho de compras (e-commerce)</li>
              <li>• Tema e preferências da aplicação</li>
              <li>• Cache de dados da API compartilhados</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-6 border border-destructive/30">
            <h3 className="font-bold text-destructive mb-3 flex items-center gap-2">
              <span>❌</span> Quando NÃO usar
            </h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Valor de inputs de formulário</li>
              <li>• Estado de modais simples (aberto/fechado)</li>
              <li>• Dados temporários de uma única tela</li>
              <li>• Animações e estados visuais locais</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-accent/20 text-accent border border-accent/40 glow-accent'
                  : 'text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <CodeSnippet
          code={codeExamples[activeTab]}
          language="tsx"
          title={activeTab}
          badge="Store"
          badgeColor="accent"
        />
      </div>
    </section>
  );
});

StateManagementSection.displayName = 'StateManagementSection';
export default StateManagementSection;
