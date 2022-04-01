export class Product {
  constructor(data) {
    const { id, name, image, parcelamento, price } = data;
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.parcelamento = parcelamento;
  }
  createProduct() {
    if (this.id == 0) {
      let newProduct = ``;
      newProduct = `<div>aaaaaaaaa</div>`;
      return newProduct;
    }
    let newProduct = ``;
    newProduct = `<div class="protuct"    id="${this.id}">
              <figure>
                <a >
                  <img src="${this.image}" alt="${this.name}" />
                </a>
              </figure>
                <div class="bottom-prod">
                  <h3 itemprop="name">${this.name}</h3>
                  <div class="inner-box">
                    <p class="price">
                      <strong>R$${this.price}</strong>
                     
                      <span class="parcelas">até ${this.parcelamento[0]}x de R$${this.parcelamento[1]}</span>
                    </p>
                  </div>
                 
                    <button
                      data-id="${this.id}"
                      class="btn-buy-product"
                      title="Comprar"
                    >
                      Comprar
                    </button>
                  
                </div>
              
            </div>`;

    return newProduct;
  }
}
