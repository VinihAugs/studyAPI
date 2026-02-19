import { forwardRef, useState } from 'react';
import CodeSnippet from './CodeSnippet';

const tabs = ['Node.js / Express', 'Python / FastAPI', 'Java / Spring Boot'] as const;
type Tab = typeof tabs[number];

const codeExamples: Record<Tab, string> = {
  'Node.js / Express': `const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' }
];

// GET — Listar todos os usuários
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST — Criar novo usuário
app.post('/api/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// DELETE — Remover usuário
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => console.log('API rodando na porta 3000'));`,
  'Python / FastAPI': `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

users_db = [
    {"id": 1, "name": "Ana", "email": "ana@email.com"}
]

@app.get("/api/users")
def get_users():
    return users_db

@app.post("/api/users", status_code=201)
def create_user(user: User):
    new_user = {"id": len(users_db) + 1, **user.dict()}
    users_db.append(new_user)
    return new_user

@app.delete("/api/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    global users_db
    users_db = [u for u in users_db if u["id"] != user_id]`,
  'Java / Spring Boot': `@RestController
@RequestMapping("/api/users")
public class UserController {

    private List<User> users = new ArrayList<>(List.of(
        new User(1L, "Ana", "ana@email.com")
    ));

    @GetMapping
    public List<User> getUsers() {
        return users;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        user.setId(System.currentTimeMillis());
        users.add(user);
        return user;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        users.removeIf(u -> u.getId().equals(id));
    }
}`,
};

const BackendExamples = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<Tab>('Node.js / Express');

  return (
    <section ref={ref} id="backend" className="py-32 px-6" data-section="backend">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 06</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Back-end: <span className="gradient-text">A Construção</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            O outro lado da moeda — como criar a rota <code className="text-primary font-mono text-sm">/api/users</code> que
            o front-end acabou de consumir.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="flex gap-2 mb-8 justify-center flex-wrap">
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

        <CodeSnippet
          code={codeExamples[activeTab]}
          language="tsx"
          title={activeTab}
          badge="API Route"
          badgeColor="primary"
        />
      </div>
    </section>
  );
});

BackendExamples.displayName = 'BackendExamples';
export default BackendExamples;
