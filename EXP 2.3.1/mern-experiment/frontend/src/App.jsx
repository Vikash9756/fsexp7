import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold mb-0 h1" href="/">MERN React Store</a>
        </div>
      </nav>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
