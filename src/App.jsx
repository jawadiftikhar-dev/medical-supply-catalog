import { useEffect, useMemo, useState } from 'react';
import './App.css';
import supplies from './data/supplies.json';
import Modal from './Modal';
import { readWishlist, writeWishlist } from './wishlist';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState(() => readWishlist());

  const categories = useMemo(() => {
    const set = new Set(supplies.map((s) => s.category));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return supplies.filter((item) => {
      const matchesSearch = q === '' || item.name.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // Persist wishlist whenever it changes
  useEffect(() => {
    writeWishlist(wishlist);
  }, [wishlist]);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (selectedProduct) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [selectedProduct]);

  const toggleWishlist = (name) => {
    setWishlist((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const removeFromWishlist = (name, e) => {
    e.stopPropagation(); // don't open the modal
    setWishlist((prev) => prev.filter((n) => n !== name));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Medical Supply Catalog</h1>
        <p>
          {filtered.length} of {supplies.length} items · {wishlist.length} wishlisted
        </p>
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
          {filtered.map((item) => {
            const saved = wishlist.includes(item.name);
            return (
              <div className="card-wrapper" key={item.name}>
                <button
                  type="button"
                  className="card"
                  onClick={() => setSelectedProduct(item)}
                  aria-label={`View details for ${item.name}`}
                >
                  <img src={item.imageUrl} alt={item.name} loading="lazy" />
                  <div className="card-body">
                    <h2>{item.name}</h2>
                    <p className="price">${item.price.toFixed(2)}</p>
                  </div>
                </button>

                <button
                  type="button"
                  className={`heart-btn${saved ? ' heart-btn--active' : ''}`}
                  onClick={(e) => removeFromWishlist(item.name, e)}
                  aria-label={saved ? `Remove ${item.name} from wishlist` : `${item.name} is not in wishlist`}
                  aria-pressed={saved}
                  disabled={!saved}
                >
                  {saved ? '♥' : '♡'}
                </button>
              </div>
            );
          })}
        </section>
      )}

      <Modal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.name) : false}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
}

export default App;