import { useEffect, useMemo, useState } from 'react';
import './App.css';
import supplies from './data/supplies.json';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Unique categories for the dropdown (computed once)
  const categories = useMemo(() => {
    const set = new Set(supplies.map((s) => s.category));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Combined filter: search (case-insensitive) + category
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return supplies.filter((item) => {
      const matchesSearch = q === '' || item.name.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Medical Supply Catalog</h1>
        <p>{filtered.length} of {supplies.length} items</p>
      </header>

      <section className="controls">
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search supplies by name"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <p className="empty">No supplies match your filters.</p>
      ) : (
        <section className="grid">
          {filtered.map((item) => (
            <article className="card" key={item.name}>
              <img src={item.imageUrl} alt={item.name} loading="lazy" />
              <div className="card-body">
                <h2>{item.name}</h2>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default App;