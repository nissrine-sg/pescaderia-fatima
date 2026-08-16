const products = [
  {
    name: "Dorada",
    type: "Pescado entero",
    description: "Carne fina y delicada, ideal al horno o a la plancha.",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Saumon",
    type: "Lomo y filete",
    description: "Textura suave, cortado al momento según tus preferencias.",
    image: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sardinas",
    type: "Pesca del día",
    description: "Brillantes, carnosas y sabrosas, perfectas a la parrilla.",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Merluza",
    type: "Pescado entero",
    description: "Carne blanca, tierna y ligera para toda la familia.",
    image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Gambas",
    type: "Marisco",
    description: "Seleccionadas con cuidado, firmes y llenas de sabor marino.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Calamar",
    type: "Preparado al momento",
    description: "Limpio y listo para cocinar, tierno a la sartén o a la parrilla.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pescado blanco",
    type: "Filete del día",
    description: "Nuestra selección diaria: suave, ligera y sin espinas.",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85",
  },
];

const availability = [
  ["Dorada", "Fresco", "Entera · Fileteada", "Disponible"],
  ["Salmón", "Fresco / Congelado", "Lomo · Filete", "Disponible"],
  ["Sardinas", "Fresco", "Enteras", "Últimas unidades"],
  ["Gambas", "Fresco / Congelado", "250 g · 500 g · 1 kg", "Disponible"],
  ["Calamar", "Fresco", "Entero · Limpio", "Disponible"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Pescadería Fatima, inicio">
          <span className="brand-mark">F</span>
          <span><strong>PESCADERÍA</strong><small>FATIMA · DEPUIS 2018</small></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#maison">Nosotros</a>
          <a href="#catalogue">Pescadería</a>
          <a href="#disponibilite">Hoy</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#commande">Pedir <span>→</span></a>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-image" role="img" aria-label="Expositor de pescado fresco sobre hielo" />
        <div className="hero-wash" />
        <div className="hero-content">
          <div className="eyebrow light"><span /> Producto fresco cada mañana</div>
          <div className="open-badge"><span className="live-dot"/> Pedidos · Lunes a sábado · <strong>09:00 — 22:00</strong></div>
          <h1>Pescadería Fatima<br/><em>Frescura del Mar</em><br/>Cada Día</h1>
          <p>Pescado fresco, congelado y marisco de calidad superior, seleccionado con exigencia para tu mesa.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#commande">Pedir ahora <span>→</span></a>
            <a className="text-link" href="#catalogue">Descubrir los productos <span>↘</span></a>
          </div>
        </div>
        <div className="hero-note"><strong>01</strong><span>Frescura<br/>sin compromisos</span></div>
        <a className="scroll-cue" href="#maison"><span>↓</span> Explorar</a>
      </section>

      <section className="intro section" id="maison">
        <div className="section-kicker">La casa Fatima</div>
        <div className="intro-grid">
          <h2>Lo mejor del mar,<br/><em>así de simple.</em></h2>
          <div>
            <p className="lead">Cada día elegimos productos de frescura impecable. Del mercado a tu cocina, la calidad guía cada uno de nuestros gestos.</p>
            <a className="inline-link" href="#commande">Hacer un pedido <span>→</span></a>
          </div>
        </div>
        <div className="promise-grid">
          <article><span className="promise-num">01</span><span className="promise-icon">✦</span><h3>Frescura diaria</h3><p>Producto seleccionado cada mañana y conservado en las mejores condiciones.</p></article>
          <article><span className="promise-num">02</span><span className="promise-icon">◇</span><h3>Calidad exigente</h3><p>Elegido por su textura, su origen y su sabor auténtico.</p></article>
          <article><span className="promise-num">03</span><span className="promise-icon">◎</span><h3>Precios justos</h3><p>Calidad premium accesible y precios transparentes según la llegada.</p></article>
          <article><span className="promise-num">04</span><span className="promise-icon">⌁</span><h3>Confianza local</h3><p>Atención cercana, buenos consejos y preparación a tu medida.</p></article>
        </div>
      </section>

      <section className="catalogue section" id="catalogue">
        <div className="catalogue-heading">
          <div><div className="section-kicker">Nuestra selección</div><h2>Del mar<br/><em>a tu mesa.</em></h2></div>
          <p>Una selección de pescados y mariscos elegidos por su frescura, delicadeza y sabor.</p>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card ${index === 0 ? "featured" : ""}`} key={product.name}>
              <div className="product-image"><img src={product.image} alt={product.name} loading={index > 2 ? "lazy" : "eager"}/><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="product-copy"><small>{product.type}</small><h3>{product.name}</h3><p>{product.description}</p><a href="#commande" aria-label={`Pedir ${product.name}`}>Pedir <span>→</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="availability section" id="disponibilite">
        <div className="availability-head">
          <div><div className="section-kicker light">El mostrador de hoy</div><h2>Disponible<br/><em>hoy.</em></h2></div>
          <div className="date-chip"><span className="live-dot"/>Actualizado esta mañana</div>
        </div>
        <div className="availability-table" role="table" aria-label="Productos disponibles hoy">
          <div className="table-row table-header" role="row"><span>Producto</span><span>Conservación</span><span>Preparación</span><span>Estado</span></div>
          {availability.map((row) => <div className="table-row" role="row" key={row[0]}>{row.map((cell, i) => <span key={cell} className={i === 3 ? "status" : ""}>{i === 3 && <i/>}{cell}</span>)}</div>)}
        </div>
        <p className="availability-note">* Disponibilidad orientativa según las llegadas. Confirmación rápida después de tu pedido.</p>
      </section>

      <section className="order section" id="commande">
        <div className="order-copy">
          <div className="section-kicker">Pedido exprés</div>
          <h2>Tu selección,<br/><em>lista con cuidado.</em></h2>
          <p>Rellena el formulario en menos de un minuto. Te contactaremos rápidamente para confirmar disponibilidad, precio y recogida.</p>
          <div className="order-step"><strong>01</strong><span><b>Elige tus productos</b><small>Frescos o congelados, como prefieras</small></span></div>
          <div className="order-step"><strong>02</strong><span><b>Recibe la confirmación</b><small>Disponibilidad y precio según la llegada</small></span></div>
          <div className="order-step"><strong>03</strong><span><b>Recoge tu pedido</b><small>Preparado a la hora acordada</small></span></div>
        </div>
        <form className="order-form" action="https://formsubmit.co/pescaderia.fatima@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Nuevo pedido — Pescadería Fatima" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="form-title"><span>Pedido</span><small>Todos los campos son obligatorios</small></div>
          <label>Tu nombre<input name="Nombre" type="text" placeholder="Ej. María García" required/></label>
          <label>Teléfono<input name="Teléfono" type="tel" placeholder="Ej. +34 600 000 000" required/></label>
          <div className="form-pair">
            <label>Producto<select name="Producto" defaultValue="" required><option value="" disabled>Elegir un producto</option>{products.map(p => <option key={p.name}>{p.name}</option>)}</select></label>
            <label>Cantidad<input name="Cantidad" type="text" placeholder="Ej. 1 kg" required/></label>
          </div>
          <fieldset><legend>Conservación</legend><label className="radio"><input type="radio" name="Conservación" value="Fresco" defaultChecked/><span>Fresco</span></label><label className="radio"><input type="radio" name="Conservación" value="Congelado"/><span>Congelado</span></label></fieldset>
          <button className="button button-blue" type="submit">Enviar el pedido <span>→</span></button>
          <p className="privacy">Al enviar este formulario, aceptas que te contactemos únicamente sobre este pedido.</p>
        </form>
      </section>

      <section className="contact" id="contact">
        <div className="contact-photo" role="img" aria-label="Pescadero preparando pescado fresco"/>
        <div className="contact-panel">
          <div className="section-kicker light">Encuéntranos</div>
          <h2>Hablemos de tu<br/><em>próxima mesa.</em></h2>
          <div className="contact-lines">
            <div><small>Email</small><a href="mailto:vers.nouvellevie@gmail.com">vers.nouvellevie@gmail.com</a></div>
            <div><small>Teléfono</small><a href="tel:+34600000000">+34 600 000 000</a></div>
            <div className="hours-line"><small>Horario de pedidos</small><p>Lunes — Sábado<br/><strong>09:00 — 22:00</strong></p></div>
          </div>
          <a className="button button-outline" href="#commande">Pedir ahora <span>→</span></a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#accueil"><span className="brand-mark">F</span><span><strong>PESCADERÍA</strong><small>FATIMA · PESCADO & MARISCO</small></span></a>
        <p>Frescura del Mar Cada Día.</p>
        <div><span>© 2026 Pescadería Fatima</span><span>Creación: Nissrine Sghir</span></div>
      </footer>
    </main>
  );
}
